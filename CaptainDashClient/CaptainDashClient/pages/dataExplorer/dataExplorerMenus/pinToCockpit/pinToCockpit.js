/*-------------------------------
-- Author : [S.H]
-- Creation date : 11/02/2013
------------------------------*/

(function () {
    "use strict";
    var selectedGroup;
    var listGroupsDashboard;
    var isNewGroup;
    var isNewDashboard;
    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(DataExplorerHelper.DataExplorerMenusTitles.pinToDashboard, DataExplorerHelper.DataExplorerMenusSubTitles[DataExplorerHelper.DataExplorerMenusTitles.pinToDashboard].parameters, false);
            slct_pinToCockpit_dashboard.onclick = _bindDataDashboards;
            btn_pinToCockpit_dashboardBack.onclick = _bindDataDashboards;
            btn_pinToCockpit_groupBack.onclick = _bindDataGroups;
            btn_pinToCockpit_pin.focus();
            div_pinToCockpitMenu_content.onkeydown = _onEnterKeyDown;
            btn_pinToCockpit_pin.onclick = _pinToCockpit;

            div_pinToCockpit_item1X1.onclick = _item1X1Click;
            div_pinToCockpit_item2X1.onclick = _item2X1Click;
            div_pinToCockpit_item3X1.onclick = _item3X1Click;
            div_pinToCockpit_item1X2.onclick = _item1X2Click;

            txt_pinToCockpit_name.value = DataExplorer.getTitleExploration();
            txt_pinToCockpit_name.onkeydown = function () { lbl_pinToCockpit_nameError.innerText = ''; };
            txt_pinToCockpit_newGroup.onkeydown = function () { lbl_pinToCockpit_groupError.innerText = ''; };
            listGroupsDashboard = [];
        });
    }

    /* ------------------------------------------------------
    -- Author: [S.Z]
    -- Name: onEnterKeyPressed
    -- Description: Pin to cockpit on press Enter Key
    -- Params: Event
    -- Return:
    -------------------------------------------------------*/
    function _onEnterKeyDown(e) {
        if (e.keyCode == 13) {
            _pinToCockpit();
            return false;
        }
    }

    /* ------------------------------------------------------
     -- Author: [S.H]
     -- Name: _bindDataDashboards
     -- Description: binding of list dashboards
     -- Params: No one
     -- Return: No one
     ------------------------------------------------------*/
    function _bindDataDashboards() {
        RightMenu.rightMenuLoading(true);
        CDHelper.requireScriptJS(Scripts.dashboardService);
        CDHelper.requireScriptJS(Scripts.cockpitHelper);
        CDHelper.showSelectBox(slct_pinToCockpit_group, txt_pinToCockpit_newGroup, btn_pinToCockpit_groupBack);
        DashboardsServices.getAllDashboards(function (dashboards)
        {
            if (dashboards.length > 0) {
                dashboards.unshift({ title: CDHelper.txtNewDashboard, id: CDHelper.keyNewDashboard });
                var type = "selectBox";
                var hashedListDashboards = CDHelper.toHashTable(dashboards);
                CDHelper.showSelectBox(slct_pinToCockpit_dashboard, txt_pinToCockpit_newDashboard, btn_pinToCockpit_dashboardBack);
                isNewDashboard = false;

                    var flyoutDashboardClick = function (idDashboard) {
                        if (hashedListDashboards[idDashboard].id == CDHelper.keyNewDashboard) {
                            lbl_pinToCockpit_dashboardError.innerText = '';
                            lbl_pinToCockpit_groupError.innerText = '';
                            CDHelper.showInputBox(slct_pinToCockpit_dashboard, txt_pinToCockpit_newDashboard, btn_pinToCockpit_dashboardBack);
                            isNewDashboard = true;
                            CDHelper.showInputBox(slct_pinToCockpit_group, txt_pinToCockpit_newGroup, btn_pinToCockpit_groupBack);
                            isNewGroup = true;
                        }
                        else {
                            slct_pinToCockpit_dashboard.querySelector(".div_titleItem_select").innerText = hashedListDashboards[idDashboard].title;
                            slct_pinToCockpit_dashboard.dataSrc = idDashboard;
                            _bindDataGroups();
                        }
                    };
                    // capitalise first letter dashboard
                    for (var count = 0; count < dashboards.length; count++) {
                        dashboards[count].title = CDHelper.capitaliseOnlyFirstLetter(dashboards[count].title)
                    }
               Popup.showSelectBox(slct_pinToCockpit_dashboard, dashboards, flyoutDashboardClick, CDHelper.position.center, type);
            }

            else {
                CDHelper.showInputBox(slct_pinToCockpit_dashboard, txt_pinToCockpit_newDashboard, btn_pinToCockpit_dashboardBack);
                isNewDashboard = true;
                CDHelper.showInputBox(slct_pinToCockpit_group, txt_pinToCockpit_newGroup, btn_pinToCockpit_groupBack);
                isNewGroup = true;
            }
        },function () {           
            Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
        })

        RightMenu.rightMenuLoading(false);
    }


    /* ------------------------------------------------------
      -- Author: [S.H]
      -- Name: _bindDataGroups
      -- Description: bind all groups
      -- Params: No one
      -- Return: No one
      ------------------------------------------------------*/
    function _bindDataGroups() {
        var listGroups;
        if (isNewDashboard) {
            slct_pinToCockpit_dashboard.dataSrc = "";
            listGroups = []
        }
         
        else if (isNewDashboard == false && slct_pinToCockpit_dashboard.dataSrc != '') {
           listGroups = DashboardsHelper.getGroupsDashboard(slct_pinToCockpit_dashboard.dataSrc).slice();
        }
            slct_pinToCockpit_group.querySelector(".div_titleItem_select").innerText = "";
            slct_pinToCockpit_group.dataSrc = "";

            if (listGroups && listGroups.length > 0) {
                listGroupsDashboard = listGroups;
                listGroups.unshift({ title: CDHelper.textNewGroup, id: CDHelper.keyNewGroup });
                var hashedListGroups = CDHelper.toHashTable(listGroups);

                // capitalise first letter group
                for (var count = 0; count < listGroups.length; count++) {
                    listGroups[count].title = CDHelper.capitaliseOnlyFirstLetter(listGroups[count].title)
                }
                slct_pinToCockpit_group.onclick = function () {
                    _slctPinGroup_click(hashedListGroups, listGroups);
                };

                CDHelper.showSelectBox(slct_pinToCockpit_group, txt_pinToCockpit_newGroup, btn_pinToCockpit_groupBack);
                isNewGroup = false;
                if (hashedListGroups[slct_pinToCockpit_group.dataSrc]) {
                    slct_pinToCockpit_group.querySelector(".div_titleItem_select").innerText = hashedListGroups[slct_pinToCockpit_group.dataSrc].title;
                    slct_pinToCockpit_group.dataSrc = hashedListGroups[slct_pinToCockpit_group.dataSrc].id;
                }
            }
            else {
                CDHelper.showInputBox(slct_pinToCockpit_group, txt_pinToCockpit_newGroup, btn_pinToCockpit_groupBack);
                isNewGroup = true;
            }
        
    }

    function _slctPinGroup_click(hashedListGroups, listGroups) {
        var type = "selectBox";
        var flyoutGroupClick = function (idGroup) {
            if (hashedListGroups[idGroup].id == CDHelper.keyNewGroup) {
                CDHelper.showInputBox(slct_pinToCockpit_group, txt_pinToCockpit_newGroup, btn_pinToCockpit_groupBack);
                isNewGroup = true;
            }
            else {
                slct_pinToCockpit_group.querySelector(".div_titleItem_select").innerText = hashedListGroups[idGroup].title;
                slct_pinToCockpit_group.dataSrc = idGroup;
            }
        };

        Popup.showSelectBox(slct_pinToCockpit_group, listGroups, flyoutGroupClick, CDHelper.position.center, type);
    }

    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: _pinToCockpit
   -- Description: check all inputs values and pin exploration to cockpit
   -- Params: No one
   -- Return: No one
   ------------------------------------------------------*/

    function _pinToCockpit() {
        var explorationToPin;
        lbl_pinToCockpit_nameError.innerText = '';
        lbl_pinToCockpit_dashboardError.innerText = '';
        lbl_pinToCockpit_groupError.innerText = '';

            if (_isValidFields())
            {
                if (isNewDashboard) 
                    _addNewDashboard();
                else 
                    _callbackAddGroup();
            }
            else
                return;           
        }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _isValidFields
    -- Description: check if all inputs values is valid or no
    -- Params: No one
    -- Return:boolean
    ------------------------------------------------------*/
    function _isValidFields() {
        if (txt_pinToCockpit_name.value == '') {
            lbl_pinToCockpit_nameError.innerText = MessagesHelper.TXT_NAME_PIN_TO_DASHBOARD;
            return false;
        }
       else if (isNewDashboard && txt_pinToCockpit_newDashboard.value == '') {
            lbl_pinToCockpit_dashboardError.innerText = MessagesHelper.TXT_DASHBOARD_NAME;
            return false;
        }
       else if (!isNewDashboard && slct_pinToCockpit_dashboard.dataSrc == '') {
            lbl_pinToCockpit_dashboardError.innerText = MessagesHelper.TXT_CHOOSE_DASHBOARD;
            return false;
        }
       else if (isNewGroup && txt_pinToCockpit_newGroup.value == '') {
            lbl_pinToCockpit_groupError.innerText = MessagesHelper.TXT_NAME_GROUP;
            return false;
        }
       else if (!isNewGroup && slct_pinToCockpit_group.dataSrc == '') {
            lbl_pinToCockpit_groupError.innerText = MessagesHelper.TXT_CHOOSE_GROUP;
            return false;
        }
        else
            return true;
    }
         
    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _addNewDashboard
    -- Description: Launch add dashboard service
    -- Params: No one
    -- Return:No one
    ------------------------------------------------------*/
    function _addNewDashboard() {
        var dashboardTitle = CDHelper.trim(txt_pinToCockpit_newDashboard.value);
        CDHelper.requireScriptJS(Scripts.dashboardHelper);
        if (DashboardsHelper.isValidDashboardTitle(dashboardTitle, lbl_pinToCockpit_dashboardError)) {
            var dashboardToSend = {
                dashboard: {
                    title: dashboardTitle,
                    description: ""
                }
            }
            // Succeed
            var _addDashboardSucceed = function (dashboard) {
                _callbackAddGroup(dashboard.id);
            };
            // Failed
            var _addDashboardFailed = function (error) {
                Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
            };
            // Launch add dashboard service
            DashboardsServices.addDashboard(dashboardToSend, _addDashboardSucceed, _addDashboardFailed);
        }
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _callbackAddGroup
    -- Description: Check if there is a new group (launch add new group service) and pin exploration
        if there is no a new group -> pin exploration
    -- Params: dashboard id
    -- Return: No one
    ------------------------------------------------------*/
    function _callbackAddGroup(dashboardId) {
        //Check existance label
        if (_isLabelExist(txt_pinToCockpit_newGroup.value.toUpperCase())) {
            lbl_pinToCockpit_groupError.innerText = MessagesHelper.TXT_GROUP_ALREADY_EXIST;
        }
        else
        {
            if (isNewGroup) {
                //label doesn't exist (Create new group)
                if (!dashboardId) {
                    dashboardId = slct_pinToCockpit_dashboard.dataSrc;
                }
                // Group name doesn't exist (add new group and pin exploration)      
                _addNewGroup(dashboardId).then(function (groupId) {
                    selectedGroup = groupId;
                    DataExplorerServices.pinExploration(new PinToCockpitHelper.ExplorationToPin(selectedGroup), function () { _pinExplorationSucceed(txt_pinToCockpit_name.value) }, _pinExplorationFailed);
                }, function (error) {
                    Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
                });
            }
            else {
                RightMenu.rightMenuLoading(true);
                DataExplorerController.exploration.setName(txt_pinToCockpit_name.value);
                DataExplorerServices.pinExploration(new PinToCockpitHelper.ExplorationToPin(slct_pinToCockpit_group.dataSrc), function () { _pinExplorationSucceed(txt_pinToCockpit_name.value) }, _pinExplorationFailed);
            }
        }
  }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _addNewGroup
    -- Description: launch add new group service
    -- Params: dashbord id
    -- Return: completed (group id) or error
    ------------------------------------------------------*/
    function _addNewGroup(dashboardId) {
            var groupTitle = CDHelper.trim(txt_pinToCockpit_newGroup.value);
            var newGroup = {
                group: {
                    title: groupTitle
                }
            }
            return new WinJS.Promise(function (c, e, p) {
                DashboardsServices.addGroupDashboard(dashboardId, newGroup, _addNewGroupSucceed, _addNewGroupFailed);

                function _addNewGroupSucceed(group) {
                    c(group.id);
                }

                function _addNewGroupFailed(error) {
                    e(error);
                }
            });
        }


    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _pinExplorationSucceed
    -- Description: Succeed callback pinExploration
    -- Params: 
    -- Return:
    -------------------------------------------------------*/
    function _pinExplorationSucceed(nameExploration) {
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);
        DataExplorer.initialiseTitleExploration(nameExploration);
    }


    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: _pinExplorationFailed
   -- Description: failed callback pinExploration
   -- Params: 
   -- Return:
   -------------------------------------------------------*/
    function _pinExplorationFailed(error) {
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }


    /* ------------------------------------------------------
      -- Author: [S.H]
      -- Name: _isLabelExist
      -- Description: check existance of label group
      -- Params: new label
      -- Return: return true if label exist or return false 
      ------------------------------------------------------*/
    function _isLabelExist(label) {
        if (listGroupsDashboard.length > 0) {
            for (var i = 0; i < listGroupsDashboard.length; i++) {
                if (listGroupsDashboard[i].title.toUpperCase() == label) {
                    return true;
                }
            }
        }
        return false;
    }

    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: _item1X1Click
   -- Description: Handle the click on item1X1
   -- Params: No one
   -- Return: No one
   ------------------------------------------------------*/
    function _item1X1Click() {
        if (div_pinToCockpit_item2X1.style.backgroundImage == CockpitHelper._pathImageItemMinusBtn || div_pinToCockpit_item1X2.style.backgroundImage == CockpitHelper._pathImageItemMinusBtn) {
            _updateItemColor(div_pinToCockpit_item1X2, CockpitHelper._colorPurple, CockpitHelper._pathImageItemPlusBtn);
            _updateItemColor(div_pinToCockpit_item2X1, CockpitHelper._colorPurple, CockpitHelper._pathImageItemPlusBtn);
            _updateItemColor(div_pinToCockpit_item3X1, CockpitHelper._colorPurple, CockpitHelper._pathImageItemPlusBtn);

            _updateSeparators(CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight);
            txt_pinToCockpit_blockNbr.innerText = CockpitHelper._1Block;
        }
    }


    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: _item1X2Click
   -- Description: Handle the click on item1X2
   -- Params: No one
   -- Return: No one
   ------------------------------------------------------*/
    function _item1X2Click() {
        if (div_pinToCockpit_item1X2.style.backgroundImage == CockpitHelper._pathImageItemPlusBtn) {
            _updateItemColor(div_pinToCockpit_item1X2, CockpitHelper._colorOrange, CockpitHelper._pathImageItemMinusBtn);
            _updateItemColor(div_pinToCockpit_item2X1, CockpitHelper._colorPurple, CockpitHelper._pathImageItemPlusBtn);
            _updateItemColor(div_pinToCockpit_item3X1, CockpitHelper._colorPurple, CockpitHelper._pathImageItemPlusBtn);

            _updateSeparators(CockpitHelper._pathVerticalSeparatorImg, CockpitHelper._colorOrange, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight);
            txt_pinToCockpit_blockNbr.innerText = CockpitHelper._2HorizontalBlock;
        }
        else if (div_pinToCockpit_item1X2.style.backgroundImage == CockpitHelper._pathImageItemMinusBtn) {
            _updateItemColor(div_pinToCockpit_item1X2, CockpitHelper._colorPurple, CockpitHelper._pathImageItemPlusBtn);
            _updateSeparators(CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight);
            txt_pinToCockpit_blockNbr.innerText = CockpitHelper._1Block;
        }
    }

    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: _item2X1Click
   -- Description: Handle the click on item2X1
   -- Params: No one
   -- Return: No one
   ------------------------------------------------------*/
    function _item2X1Click() {
        if (div_pinToCockpit_item2X1.style.backgroundImage == CockpitHelper._pathImageItemPlusBtn) {
            _updateItemColor(div_pinToCockpit_item2X1, CockpitHelper._colorOrange, CockpitHelper._pathImageItemMinusBtn);
            _updateSeparators(CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgHorizontalSeparator, CockpitHelper._colorOrange, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight);
            txt_pinToCockpit_blockNbr.innerText = CockpitHelper._2VerticalBlock;
        }
        else
            if (div_pinToCockpit_item2X1.style.backgroundImage == CockpitHelper._pathImageItemMinusBtn) {
                if (div_pinToCockpit_item3X1.style.backgroundImage == CockpitHelper._pathImageItemMinusBtn) {
                    _updateItemColor(div_pinToCockpit_item3X1, CockpitHelper._colorPurple, CockpitHelper._pathImageItemPlusBtn);
                    _updateSeparators(CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgHorizontalSeparator, CockpitHelper._colorOrange, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight);
                    txt_pinToCockpit_blockNbr.innerText = CockpitHelper._2VerticalBlock;
                }
                else {
                    _updateItemColor(div_pinToCockpit_item2X1, CockpitHelper._colorPurple, CockpitHelper._pathImageItemPlusBtn);
                    _updateSeparators(CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight);
                    txt_pinToCockpit_blockNbr.innerText = CockpitHelper._1Block;
                }
            }
        _updateItemColor(div_pinToCockpit_item1X2, CockpitHelper._colorPurple, CockpitHelper._pathImageItemPlusBtn);
        div_pinToCockpit_verticalSeparator1X1.style.backgroundColor = CockpitHelper._colorPurpleLight;
    }

    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: _item3X1Click
   -- Description: Handle the click on item3X1
   -- Params: No one
   -- Return: No one
   ------------------------------------------------------*/
    function _item3X1Click() {
        if (div_pinToCockpit_item3X1.style.backgroundImage == CockpitHelper._pathImageItemPlusBtn) {
            _updateItemColor(div_pinToCockpit_item2X1, CockpitHelper._colorOrange, CockpitHelper._pathImageItemMinusBtn);
            _updateItemColor(div_pinToCockpit_item3X1, CockpitHelper._colorOrange, CockpitHelper._pathImageItemMinusBtn);

            _updateSeparators(CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgHorizontalSeparator, CockpitHelper._colorOrange, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgHorizontalSeparator, CockpitHelper._colorOrange);
            txt_pinToCockpit_blockNbr.innerText = CockpitHelper._3VerticalBlock;
        }
        else if (div_pinToCockpit_item3X1.style.backgroundImage == CockpitHelper._pathImageItemMinusBtn) {
            _updateItemColor(div_pinToCockpit_item3X1, CockpitHelper._colorPurple, CockpitHelper._pathImageItemPlusBtn);

            _updateSeparators(CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgHorizontalSeparator, CockpitHelper._colorOrange, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight, CockpitHelper._pathImgNone, CockpitHelper._colorPurpleLight);
            txt_pinToCockpit_blockNbr.innerText = CockpitHelper._2VerticalBlock;
        }
        _updateItemColor(div_pinToCockpit_item1X2, CockpitHelper._colorPurple, CockpitHelper._pathImageItemPlusBtn);
        div_pinToCockpit_verticalSeparator1X1.style.backgroundColor = CockpitHelper._colorPurpleLight;

    }


    /* ------------------------------------------------------
       -- Author: [S.H]
       -- Name: _updateItemColor
       -- Description: update color of selected item
       -- Params: the selected item, background color(border color), item image
       -- Return: No one
       ------------------------------------------------------*/
    function _updateItemColor(selectedItem, color, image) {
        selectedItem.style.backgroundColor = color;
        selectedItem.style.borderColor = color;
        selectedItem.style.backgroundImage = image;
    }


    /* ------------------------------------------------------
       -- Author: [S.H]
       -- Name: _updateSeparators
       -- Description: update colors of items separators
       -- Params: all separators properties
       -- Return: No one
       ------------------------------------------------------*/
    function _updateSeparators(verticalSeparatorImg, verticalSeparatorColor, horizontalSeparatorImg1X1, horizontalSeparatorColor1X1, horizontalSeparatorImg1X2, horizontalSeparatorColor1X2, horizontalSeparatorImg2X1, horizontalSeparatorColor2X1) {

        div_pinToCockpit_verticalSeparator1X1.style.backgroundImage = verticalSeparatorImg;
        div_pinToCockpit_verticalSeparator1X1.style.backgroundColor = verticalSeparatorColor;

        div_pinToCockpit_horizontalSeparator1X1.style.backgroundImage = horizontalSeparatorImg1X1;
        div_pinToCockpit_horizontalSeparator1X1.style.backgroundColor = horizontalSeparatorColor1X1;

        div_pinToCockpit_horizontalSeparator1X2.style.backgroundImage = horizontalSeparatorImg1X2;
        div_pinToCockpit_horizontalSeparator1X2.style.backgroundColor = horizontalSeparatorColor1X2;

        div_pinToCockpit_horizontalSeparator2X1.style.backgroundImage = horizontalSeparatorImg2X1;
        div_pinToCockpit_horizontalSeparator2X1.style.backgroundColor = horizontalSeparatorColor2X1;

    }

    WinJS.UI.Pages.define(Pages.pinToCockpit, {
        ready: ready,
    });

})();
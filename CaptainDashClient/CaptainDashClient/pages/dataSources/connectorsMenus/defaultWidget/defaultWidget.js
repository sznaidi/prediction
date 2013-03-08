//[S.Z] creation date : 13/02/2013

var DefaultWidget = WinJS.Class.define(

    // The constructor function.
    function () {
    },

    // The set of instance members.
    {
    },

    // The set of static members.
    {

        divSourceName: "",
        isNewGroup: false,
        isNewDashboard: false,
        dashboards: "",
        _SLCT_DASHBOARD: "slctDashboard",
        _DEFAULT_WIDGET: "defaultWidget",
        _SLCT_GROUP: "slctGroup",
        _DAHSBOARD_LABEL: "dashboardLabel",
        _GROUP_LABEL: "groupLabel",
        _DAHSBOARD_LABEL_TXT: WinJS.Resources.getString("DefaultWidget_dashboard").value,
        _GROUP_LABEL_TXT: WinJS.Resources.getString("DefaultWidget_group").value,
        _TEXT_NEW_GROUP : WinJS.Resources.getString("DefaultWidget_newGroup").value,
        _KEY_NEW_GROUP: "addGroup",
        _TEXT_NEW_DASHBOARD: WinJS.Resources.getString("DefaultWidget_newDashboard").value,
        _KEY_NEW_DASHBOARD: "addDashboard",
        _SLCT_BOX: "selectBox",
        _DIV_TITLE_ITEM_SELECT: "div_titleItem_select",
        _DIV_ARROW_ITEM_SELECT: "div_arrowItem_select",
        _INPUT_ADD_DASHBOARD: "inputAddDashboard",
        _INPUT_ADD_GROUP: "inputAddGroup",
        _BTN_RIGHT_MENU_BACK: "btn_rightMenu_back",
        _ADD_DASHBOARD_DIV: "addDashboardDiv",
        _ADD_GROUP_DIV: "addDashboardDiv",
        _ERROR_DASHBOARD_DIV: "errorDashboardDiv",
        _ERROR_GROUP_DIV: "errorGroupDiv",


        /* ------------------------------------------------------
        -- Name: showDefaultWidget
        -- Description: show default widget
        -- Params:divSourceName
        -- Return:
        -------------------------------------------------------*/
        showDefaultWidget: function (divSourceName, dashboards) {
            return new WinJS.Promise(function (complete, error, progress) {
                DefaultWidget.dashboards = dashboards;
                DefaultWidget._createDefaultWidget(divSourceName).then(function () {
                    (function(sourceName){
                        DefaultWidget._bindDataDashboards(dashboards, sourceName);
                        sourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._BTN_RIGHT_MENU_BACK).onclick = function () { DefaultWidget._bindDataDashboards(dashboards, sourceName); };
                        sourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._BTN_RIGHT_MENU_BACK).onclick = function () { DefaultWidget._bindDataGroups(sourceName); };
                        complete();
                    })(divSourceName);
                });
            });
            },



        /* ------------------------------------------------------
        -- Name: hideDefaultWidget
        -- Description: hide default widget
        -- Params:divSourceName
        -- Return:
        -------------------------------------------------------*/
        hideDefaultWidget: function (divSourceName) {
            return new WinJS.Promise(function (complete, error, progress) {
                var divDefaultWidget = divSourceName.querySelector("." + DefaultWidget._DEFAULT_WIDGET);
                if (divDefaultWidget) {
                    divSourceName.removeChild(divSourceName.querySelector("." + DefaultWidget._DEFAULT_WIDGET));
                    if (divSourceName.querySelector("." + DefaultWidget._DEFAULT_WIDGET)) {
                        DefaultWidget.hideDefaultWidget(divSourceName);
                    }
                    else {
                        RightMenu.rightMenuLoading(false);
                        complete();
                    }
                }
                else {
                    complete();
                }
            });
        },

        /* ------------------------------------------------------
        -- Name: _createDefaultWidget
        -- Description: create default widget
        -- Params:divSourceName
        -- Return:
        -------------------------------------------------------*/
        _createDefaultWidget: function (divSourceName) {
            return new WinJS.Promise(function (complete, error, progress) {
                DefaultWidget.divSourceName = divSourceName;
                if (divSourceName.querySelector("." + DefaultWidget._DEFAULT_WIDGET)) {
                    complete();
                }
                else {
                    //create default widget div
                    var divDefaultWidget = document.createElement('div');
                    divDefaultWidget.className = DefaultWidget._DEFAULT_WIDGET;
                    divDefaultWidget.style.display = "-ms-grid";

                    //create dashboard label
                    var dashboardLabel = document.createElement('div');
                    dashboardLabel.className = DefaultWidget._DAHSBOARD_LABEL;
                    dashboardLabel.innerHTML = DefaultWidget._DAHSBOARD_LABEL_TXT;
                    divDefaultWidget.appendChild(dashboardLabel);

                    //create fly out dashboard
                    var dashboardSelect = document.createElement('div');
                    dashboardSelect.className = DefaultWidget._SLCT_DASHBOARD;

                    //create div add new dashboard
                    var addDashboardDiv = document.createElement('div');
                    addDashboardDiv.className = DefaultWidget._ADD_DASHBOARD_DIV;
                    addDashboardDiv.style.display = "none";

                    // create input add dashboard
                    var dashboardInput = document.createElement('input');
                    dashboardInput.className = DefaultWidget._INPUT_ADD_DASHBOARD;
                    dashboardInput.type = "text";
                    dashboardInput.maxLength = "29";
                    addDashboardDiv.appendChild(dashboardInput);

                    // create back button add dashboard
                    var dashboardBackBtn = document.createElement('div');
                    dashboardBackBtn.className = DefaultWidget._BTN_RIGHT_MENU_BACK;
                    dashboardBackBtn.style.msGridColumn = "3";
                    dashboardBackBtn.style.msGridRow = "1";
                    dashboardBackBtn.style.marginTop = "7px";
                    addDashboardDiv.appendChild(dashboardBackBtn);


                    dashboardSelect.appendChild(addDashboardDiv);

                    // create div select box dashboard
                    var dashboardDiv = document.createElement('div');
                    dashboardDiv.className = DefaultWidget._SLCT_BOX;
                    dashboardDiv.style.display = "none";

                    // create div select title item dashboard 
                    var dashboardDivItem = document.createElement('div');
                    dashboardDivItem.className = DefaultWidget._DIV_TITLE_ITEM_SELECT;
                    dashboardDiv.appendChild(dashboardDivItem);

                    // create div select arrow item dashboard
                    var dashboardDivArrow = document.createElement('div');
                    dashboardDivArrow.className = DefaultWidget._DIV_ARROW_ITEM_SELECT;
                    dashboardDiv.appendChild(dashboardDivArrow);

                    dashboardSelect.appendChild(dashboardDiv);

                    divDefaultWidget.appendChild(dashboardSelect);
                    //create dashboard error
                    var errorDashboardDiv= document.createElement('div');
                    errorDashboardDiv.className = DefaultWidget._ERROR_DASHBOARD_DIV;
                    divDefaultWidget.appendChild(errorDashboardDiv);

                    //create group label
                    var groupLabel = document.createElement('div');
                    groupLabel.className = DefaultWidget._GROUP_LABEL;
                    groupLabel.innerHTML = DefaultWidget._GROUP_LABEL_TXT;
                    divDefaultWidget.appendChild(groupLabel);

                    //create fly out group
                    var groupSelect = document.createElement('div');
                    groupSelect.className = DefaultWidget._SLCT_GROUP;

                    //create div add new group
                    var addGroupDiv = document.createElement('div');
                    addGroupDiv.className = DefaultWidget._ADD_GROUP_DIV;
                    addGroupDiv.style.display = "none";

                    // create input add group
                    var groupInput = document.createElement('input');
                    groupInput.className = DefaultWidget._INPUT_ADD_GROUP;
                    groupInput.type = "text";
                    groupInput.maxLength = "30";
                    addGroupDiv.appendChild(groupInput);

                    // create back button add group
                    var groupBackBtn = document.createElement('div');
                    groupBackBtn.className = DefaultWidget._BTN_RIGHT_MENU_BACK;
                    groupBackBtn.style.msGridColumn = "3";
                    groupBackBtn.style.msGridRow = "1";
                    groupBackBtn.style.marginTop = "7px";
                    addGroupDiv.appendChild(groupBackBtn);

                    groupSelect.appendChild(addGroupDiv);

                    // create div select box group
                    var groupDiv = document.createElement('div');
                    groupDiv.className = DefaultWidget._SLCT_BOX;

                    // create div select title item group
                    var groupDivItem = document.createElement('div');
                    groupDivItem.className = DefaultWidget._DIV_TITLE_ITEM_SELECT;
                    groupDiv.appendChild(groupDivItem);

                    // create div select arrow item group
                    var groupDivArrow = document.createElement('div');
                    groupDivArrow.className = DefaultWidget._DIV_ARROW_ITEM_SELECT;
                    groupDiv.appendChild(groupDivArrow);

                    groupSelect.appendChild(groupDiv);

                    divDefaultWidget.appendChild(groupSelect);


                    //create group error
                    var errorGroupDiv = document.createElement('div');
                    errorGroupDiv.className = DefaultWidget._ERROR_GROUP_DIV;
                    divDefaultWidget.appendChild(errorGroupDiv);
                    divSourceName.appendChild(divDefaultWidget);

                    complete();
                }
            });
        },

        /* ------------------------------------------------------
       -- Name: _bindDataDashboards
       -- Description: bind data dashboards
       -- Params: dashboards
       -- Return:
       -------------------------------------------------------*/
        _bindDataDashboards: function (dashboards, sourceName) {
            var listDashboards = dashboards.slice();
            DefaultWidget.divSourceName = sourceName;
            if (listDashboards && listDashboards.length > 0) {
                
                DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._DIV_TITLE_ITEM_SELECT).innerText = "";
                DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._SLCT_BOX).dataSrc = "";
                listDashboards.unshift({ title: DefaultWidget._TEXT_NEW_DASHBOARD, id: DefaultWidget._KEY_NEW_DASHBOARD });
                var hashedListDashboards = CDHelper.toHashTable(listDashboards);
                (function (divSourceName) {
                    divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._SLCT_BOX).onclick = function () {
                        DefaultWidget.divSourceName = divSourceName;
                        DefaultWidget._slctDashboard_click(hashedListDashboards, listDashboards);
                    };
                })(DefaultWidget.divSourceName);
                DefaultWidget._showSelectDashboard();
                DefaultWidget._showSelectGroup();
            }
            else {
                DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._INPUT_ADD_DASHBOARD).style.msGridColumnSpan = "3";
                DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._BTN_RIGHT_MENU_BACK).style.display = "none";
                DefaultWidget._showTextDashboard();
                DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._INPUT_ADD_DASHBOARD).placeholder = DefaultWidget._TEXT_NEW_DASHBOARD;

                DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._INPUT_ADD_GROUP).style.msGridColumnSpan = "3";
                DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._BTN_RIGHT_MENU_BACK).style.display = "none";
                DefaultWidget._showTextGroup();
                DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._INPUT_ADD_GROUP).placeholder = DefaultWidget._TEXT_NEW_GROUP;
            }
        },

        /* ------------------------------------------------------
        -- Name: _getDashboardSucceed
        -- Description: get dashboard succeed
        -- Params:
        -- Return:
        -------------------------------------------------------*/
        _bindDataGroups: function (sourceName) {
            DefaultWidget.divSourceName = sourceName;
            var idDashboard = DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._SLCT_BOX).dataSrc;
            var listGroups = DefaultWidget._getGroupsDashboard(idDashboard, DefaultWidget.dashboards) ? DefaultWidget._getGroupsDashboard(idDashboard, DefaultWidget.dashboards).slice() : [];
            if (listGroups && listGroups.length > 0) {
                    // capitalise first letter dashboard
                    for (var count = 0; count < listGroups.length; count++) {
                        listGroups[count].title = CDHelper.capitaliseOnlyFirstLetter(listGroups[count].title)
                    }
                    DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._DIV_TITLE_ITEM_SELECT).innerText = "";
                    DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._SLCT_BOX).dataSrc = "";

                    listGroups.unshift({ title: DefaultWidget._TEXT_NEW_GROUP, id: DefaultWidget._KEY_NEW_GROUP });
                    var hashedListGroups = CDHelper.toHashTable(listGroups);
                    DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._SLCT_BOX).onclick = function () {
                        DefaultWidget._slctGroup_click(hashedListGroups, listGroups);
                    };
                    DefaultWidget._showSelectGroup();
                }
                else {
                    DefaultWidget._showTextGroup();
                    DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._INPUT_ADD_GROUP).placeholder = DefaultWidget._TEXT_NEW_GROUP;
                }
        },

        /* ------------------------------------------------------
          -- Name: _slctDashboard_click
          -- Description: hashedListDashboards, listDashboards
          -- Params: hashedListDashboards, listDashboards
          -- Return:
          -------------------------------------------------------*/
        _slctDashboard_click: function (hashedListDashboards, listDashboards) {
            var selectBoxClickCallback = function (idDashboard) {
                if (hashedListDashboards[idDashboard].id == DefaultWidget._KEY_NEW_DASHBOARD) {
                    DefaultWidget._showTextDashboard();
                    DefaultWidget._showTextGroup();
                    
                } else {
                    DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._DIV_TITLE_ITEM_SELECT).innerText = hashedListDashboards[idDashboard].title;
                    DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._SLCT_BOX).dataSrc = idDashboard;
                    DefaultWidget._bindDataGroups(DefaultWidget.divSourceName); 
                }
            };

            Popup.showSelectBox(DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._SLCT_BOX), listDashboards, selectBoxClickCallback, CDHelper.position.center, DefaultWidget._SLCT_BOX);
        },

        /* ------------------------------------------------------
           -- Name: _slctGroup_click
           -- Description: handle click select group
           -- Params: hashedListGroups, listGroups
           -- Return:
           -------------------------------------------------------*/
        _slctGroup_click: function (hashedListGroups, listGroups) {
            var selectBoxClickCallback = function (idGroup) {
                if (hashedListGroups[idGroup].id == DefaultWidget._KEY_NEW_GROUP) {
                    DefaultWidget._showTextGroup();
                   
                } else {
                    DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._DIV_TITLE_ITEM_SELECT).innerText = hashedListGroups[idGroup].title;
                    DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._SLCT_BOX).dataSrc = idGroup;
                }
            };

            Popup.showSelectBox(DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._SLCT_BOX), listGroups, selectBoxClickCallback, CDHelper.position.center, DefaultWidget._SLCT_BOX);
        },

        /* -----------------------------------------------------
       -- Name: _showSelectDashboard
       -- Description: show list dashboards
       -- Params:
       -- Return:
       -------------------------------------------------------*/
        _showSelectDashboard: function () {
            DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._SLCT_BOX).style.display = "-ms-grid";
            DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._ADD_DASHBOARD_DIV).style.display = "none";
        },

        /* -----------------------------------------------------
        -- Name: _showSelectGroup
        -- Description: show list groups
        -- Params:
        -- Return:
        -------------------------------------------------------*/
        _showSelectGroup: function() {
            DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._SLCT_BOX).style.display = "-ms-grid";
            DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._ADD_GROUP_DIV).style.display = "none";
        },


        /* ------------------------------------------------------
       -- Name: _showTextGroup
       -- Description: show text to add new group
       -- Params:
       -- Return:
       -------------------------------------------------------*/
        _showTextGroup: function () {
            DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("input[type=text]").value = "";
            DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._SLCT_BOX).style.display = "none";
            DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._ADD_GROUP_DIV).style.display = "-ms-grid";
            DefaultWidget.isNewGroup = true;
        },

        /* ------------------------------------------------------
        -- Name: _showTextDashboard
        -- Description: show text to add new dashboard
        -- Params:
        -- Return:
        -------------------------------------------------------*/
        _showTextDashboard: function () {
            DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("input[type=text]").value = "";
            DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._SLCT_BOX).style.display = "none";
            DefaultWidget.divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._ADD_DASHBOARD_DIV).style.display = "-ms-grid";
            DefaultWidget.isNewDashboard = true;
        },

        /* ------------------------------------------------------
       -- Name: getGroupsDashboard
       -- Description: return list of groups of dashboard choosen
       -- Params: idDashboard, listDashboards
       -- Return: list groups
       -------------------------------------------------------*/
        _getGroupsDashboard: function (idDashboard, listDashboards) {
            if (listDashboards) {
                for (var count = 0; count < listDashboards.length; count++) {
                    if (listDashboards[count].id == idDashboard) {
                        return (listDashboards[count].groups) ? listDashboards[count].groups : [];
                    }
                }
            }
        }

        
    }
);


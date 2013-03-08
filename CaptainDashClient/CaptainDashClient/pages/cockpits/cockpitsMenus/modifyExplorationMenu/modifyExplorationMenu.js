/*-------------------------------
-- Author : [M.C]
-- Creation date : 30/01/2013
------------------------------*/

(function () {
    "use strict";

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(CockpitHelper.CockpitsMenusTitles.modifyTile, CockpitHelper.CockpitsMenusSubTitles[CockpitHelper.CockpitsMenusTitles.modifyTile].parameters, false);

            if (elements && elements.tile)
                ModifyExplorationHelper.currentTile = elements.tile;
            txt_modifyExploration_Title.focus();
            txt_modifyExploration_Title.onkeydown = function (e) {
                if (e.keyCode == 13) {
                    _validateParam();
                    return false;
                }
            };

            var listDashboards = CDHelper.toHashTable(DashboardsHelper.listDashboards);
            // set default values
            slct_modifyExploration_dashboard.querySelector(".div_titleItem_select").innerText = listDashboards[ModifyExplorationHelper.currentTile.idDashboard].title;
            slct_modifyExploration_dashboard.dataSrc = ModifyExplorationHelper.currentTile.idDashboard;
            _bindDataGroups();

            btn_modifyExploration.onclick = _validateParam;
            slct_modifyExploration_dashboard.onclick = function () { _bindDataDashboards(listDashboards); };
            btn_modifyExploration_groupBack.onclick = function () { _bindDataGroups(true) };

            txt_modifyExploration_Title.value = ModifyExplorationHelper.currentTile.name;
            ModifyExplorationHelper.currentTile.lastIdDashboard = ModifyExplorationHelper.currentTile.idDashboard;
            ModifyExplorationHelper.currentTile.lastGroup = new jQuery.extend(true, {}, ModifyExplorationHelper.currentTile.group);
            ModifyExplorationHelper.tileDimension;


            item1X1.onclick = _item1X1Click;

            item2X1.onclick = _item2X1Click;

            item3X1.onclick = _item3X1Click;

            item1X2.onclick = _item1X2Click;

            item2X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
            item3X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
            item1X2.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
        });
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _bindDataDashboards
-- Description: update dashboardlist select element 
-- Params:No one
-- Return: No one
------------------------------------------------------*/
    function _bindDataDashboards(hashedListDashboards) {
        var type = "selectBox";
        // capitalise first letter dashboard
        for (var count = 0; count < DashboardsHelper.listDashboards.length; count++) {
            DashboardsHelper.listDashboards[count].title = CDHelper.capitaliseOnlyFirstLetter(DashboardsHelper.listDashboards[count].title)
        }
        var selectBoxClickCallback = function (idDashboard) {
            slct_modifyExploration_dashboard.querySelector(".div_titleItem_select").innerText = hashedListDashboards[idDashboard].title
            slct_modifyExploration_dashboard.dataSrc = idDashboard;
            _bindDataGroups();
        };

        Popup.showSelectBox(slct_modifyExploration_dashboard, DashboardsHelper.listDashboards, selectBoxClickCallback, CDHelper.position.center, type);
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _bindDataGroups
-- Description: update group list select element 
-- Params:needInitialisation
-- Return: No one
------------------------------------------------------*/
    function _bindDataGroups(resetGroup) {
        ModifyExplorationHelper.currentTile.idDashboard = slct_modifyExploration_dashboard.dataSrc;
        if (resetGroup) {
            ModifyExplorationHelper.currentTile.nameGroup = null;
            ModifyExplorationHelper.currentTile.group.key = null;
        }

        var listGroups = DashboardsHelper.getGroupsDashboard(ModifyExplorationHelper.currentTile.idDashboard).slice();
        slct_modifyExploration_group.querySelector(".div_titleItem_select").innerText = "";
        slct_modifyExploration_group.dataSrc = "";

        if (listGroups && listGroups.length > 0) {
            // capitalise first letter group
            for (var count = 0; count < listGroups.length; count++) {
                listGroups[count].title = CDHelper.capitaliseOnlyFirstLetter(listGroups[count].title)
            }
            listGroups.unshift({ title: CDHelper.textNewGroup, id: CDHelper.keyNewGroup });
            var hashedListGroups = CDHelper.toHashTable(listGroups);
            slct_modifyExploration_group.onclick = function () {
                _slctModifyExplorationGroup_click(hashedListGroups, listGroups);
            };

            if (ModifyExplorationHelper.currentTile.nameGroup) {
                _showTextGroup();
            }
            else {
                _showSelectGroup();
            }

            if (hashedListGroups[ModifyExplorationHelper.currentTile.group.key]) {
                slct_modifyExploration_group.querySelector(".div_titleItem_select").innerText = hashedListGroups[ModifyExplorationHelper.currentTile.group.key].title;
                slct_modifyExploration_group.dataSrc = hashedListGroups[ModifyExplorationHelper.currentTile.group.key].id;
            }
            else {
                txt_modifyExploration_group.value = (ModifyExplorationHelper.currentTile.nameGroup) ? ModifyExplorationHelper.currentTile.nameGroup : '';
            }
        }
        else
            _showTextGroup();
    }

    function _slctModifyExplorationGroup_click(hashedListGroups, listGroups) {
        var type = "selectBox";
        var selectBoxClickCallback = function (idGroup) {
            if (hashedListGroups[idGroup].id == CDHelper.keyNewGroup) {
                _showTextGroup();
            }
            else {
                slct_modifyExploration_group.querySelector(".div_titleItem_select").innerText = hashedListGroups[idGroup].title;
                slct_modifyExploration_group.dataSrc = idGroup;
                ModifyExplorationHelper.currentTile.group.label = hashedListGroups[idGroup].title;
                ModifyExplorationHelper.currentTile.group.key = hashedListGroups[idGroup].id;
            }
        };

        Popup.showSelectBox(slct_modifyExploration_group, listGroups, selectBoxClickCallback, CDHelper.position.center, type);
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _showTextGroup
-- Description:  show input element for add group 
-- Params: No one
-- Return: No one
------------------------------------------------------*/
    function _showTextGroup() {
        div_selectGroupContainer.style.display = "none";
        div_newGroupContainer.style.display = "block";
        btn_modifyExploration_groupBack.style.display = "block";
        txt_modifyExploration_group.style.display = "block";
        txt_modifyExploration_group.value = (ModifyExplorationHelper.currentTile.nameGroup) ? ModifyExplorationHelper.currentTile.nameGroup : '';

    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _showSelectGroup
-- Description:  show select element for add group 
-- Params: No one
-- Return: No one
------------------------------------------------------*/
    function _showSelectGroup() {
        div_selectGroupContainer.style.display = "block";
        div_newGroupContainer.style.display = "none";
        btn_modifyExploration_groupBack.style.display = "none";
        txt_modifyExploration_group.style.display = "none";
        txt_modifyExploration_group.value = '';
    }

    /* ------------------------------------------------------
   -- Author: [M.C]
   -- Name: _validateParam
   -- Description: tests if the parameters are valid
   -- Params: No one
   -- Return: No one
   ------------------------------------------------------*/
    function _validateParam() {
        //if input texte for name group is not hidden and this input is not empty and input title  kpi is not empty ,so added a group
        if ((txt_modifyExploration_group.style.display != 'none') && (txt_modifyExploration_group.value.trim() != '') && (txt_modifyExploration_Title.value.trim() != '')) {
            _addGroupDashboard();
        }
        else if (txt_modifyExploration_Title.value.trim() != '') {
            ModifyExplorationHelper.currentTile.group.key = slct_modifyExploration_group.dataSrc;
            ModifyExplorationHelper.currentTile.group.label = slct_modifyExploration_group.querySelector(".div_titleItem_select").innerText;
            _modifyExploration();
        }
        else {
            //todo error
        }
    }

    /* ------------------------------------------------------
   -- Author: [M.C]
   -- Name: _addGroupDashboard
   -- Description: call service add group
   -- Params: No one
   -- Return: No one
   ------------------------------------------------------*/
    function _addGroupDashboard() {
        var groupTitle = CDHelper.trim(txt_modifyExploration_group.value);
        var newGroup = {
            group: {
                title: groupTitle
            }
        }
        RightMenu.rightMenuLoading(true);
        DashboardsServices.addGroupDashboard(ModifyExplorationHelper.currentTile.idDashboard, newGroup, _addGroupDashboardSucceed, _addGroupDashboardFailed);
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _addGroupDashboardSucceed
-- Description: call service add group succeed
-- Params: No one
-- Return: No one
------------------------------------------------------*/
    function _addGroupDashboardSucceed(group) {
        RightMenu.rightMenuLoading(false);
        ModifyExplorationHelper.currentTile.group.key = group.id;
        ModifyExplorationHelper.currentTile.group.label = group.title;
        _modifyExploration();
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _addGroupDashboardFailed
-- Description: call service add group failed
-- Params: No one
-- Return: No one
------------------------------------------------------*/
    function _addGroupDashboardFailed() {
        RightMenu.rightMenuLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _modifyKpi
-- Description:  call service to modify kpi
-- Params: No one
-- Return: No one
------------------------------------------------------*/
    function _modifyExploration() {
        ModifyExplorationHelper.currentTile.idDashboard = slct_modifyExploration_dashboard.dataSrc;
        ModifyExplorationHelper.currentTile.name = CDHelper.trim(txt_modifyExploration_Title.value);
 
        var explorationToSend = {
            tile: {
                id: ModifyExplorationHelper.currentTile.id,
                group_id: ModifyExplorationHelper.currentTile.group.key,
                name: ModifyExplorationHelper.currentTile.name,
            }
        }
        RightMenu.rightMenuLoading(true);
        CockpitsServices.updateTile(explorationToSend, _modifyTileSucceed, _modifyTileFailed);
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _modifyTileSucceed
-- Description: succed call service to modify kpi,if dashbor is not changed,tile is updated in ui else the tile is removed from last dashboard and we navigate to new dashboard 
-- Params: No one
-- Return: No one
------------------------------------------------------*/
    function _modifyTileSucceed() {
        RightMenu.rightMenuLoading(false);
        Cockpits.updateKpi(ModifyExplorationHelper.currentTile);
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _modifyTileFailed
-- Description: failed call service 
-- Params: No one
-- Return: No one
------------------------------------------------------*/
    function _modifyTileFailed(error) {
        RightMenu.rightMenuLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
        lv_cockpits.winControl.selection.clear();
        div_cockpits_bottomAppBar.winControl.hide();
        RightMenu.showHideRightMenu(false);
    }

    function _item1X1Click() {
        if (item2X1.style.backgroundColor == ModifyExplorationHelper._colorOrange || item1X2.style.backgroundColor == ModifyExplorationHelper._colorOrange) {
            item2X1.style.backgroundColor = ModifyExplorationHelper._colorPurple;
            item2X1.style.borderColor = ModifyExplorationHelper._colorPurple;
            item3X1.style.backgroundColor = ModifyExplorationHelper._colorPurple;
            item3X1.style.borderColor = ModifyExplorationHelper._colorPurple;
            item2X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
            item3X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
            item1X2.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
            SeparatorVertical1X1.style.backgroundColor = ModifyExplorationHelper._colorPurpleLight;
            item1X2.style.backgroundColor = ModifyExplorationHelper._colorPurple;
            item1X2.style.borderColor = ModifyExplorationHelper._colorPurple;
            nbrBlock.innerText = CockpitHelper._1Block;
            ModifyExplorationHelper.tileDimension = 1;
            _separatorOneBlock();
        }
    }

    function _item2X1Click() {
        if (item2X1.style.backgroundImage == ModifyExplorationHelper._pathImageItemBtnAddWidgetMenu) {
            item2X1.style.backgroundColor = ModifyExplorationHelper._colorOrange;
            item2X1.style.borderColor = ModifyExplorationHelper._colorOrange;
            nbrBlock.innerText = CockpitHelper._2VerticalBlock;
            ModifyExplorationHelper.tileDimension = 2;
            item2X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnRemoveWidgetMenu;
            item3X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
            _separatorTwoBlocks();
        }
        else if (item2X1.style.backgroundImage == ModifyExplorationHelper._pathImageItemRemoveWidgetMenu) {
            if (item3X1.style.backgroundColor == ModifyExplorationHelper._colorOrange) {
                item3X1.style.backgroundColor = ModifyExplorationHelper._colorPurple;
                item3X1.style.borderColor = ModifyExplorationHelper._colorPurple;
                nbrBlock.innerText = CockpitHelper._2VerticalBlock;
                ModifyExplorationHelper.tileDimension = 2;
                item2X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnRemoveWidgetMenu;
                item3X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
                _separatorTwoBlocks();
            }
            else {
                item2X1.style.backgroundColor = ModifyExplorationHelper._colorPurple;
                item2X1.style.borderColor = ModifyExplorationHelper._colorPurple;
                item3X1.style.backgroundColor = ModifyExplorationHelper._colorPurple;
                item3X1.style.borderColor = ModifyExplorationHelper._colorPurple;
                nbrBlock.innerText = CockpitHelper._1Block;
                ModifyExplorationHelper.tileDimension = 1;
                item2X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
                item3X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
                _separatorOneBlock();
            }
        }
        item1X2.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
        SeparatorVertical1X1.style.backgroundColor = ModifyExplorationHelper._colorPurpleLight;
        item1X2.style.backgroundColor = ModifyExplorationHelper._colorPurple;
        item1X2.style.borderColor = ModifyExplorationHelper._colorPurple;
    }

    function _item3X1Click() {
        if (item3X1.style.backgroundImage == ModifyExplorationHelper._pathImageItemBtnAddWidgetMenu) {
            item2X1.style.backgroundColor = ModifyExplorationHelper._colorOrange;
            item2X1.style.borderColor = ModifyExplorationHelper._colorOrange;
            item3X1.style.backgroundColor = ModifyExplorationHelper._colorOrange;
            item3X1.style.borderColor = ModifyExplorationHelper._colorOrange;
            nbrBlock.innerText = CockpitHelper._3VerticalBlock;
            ModifyExplorationHelper.tileDimension = 3;
            item2X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnRemoveWidgetMenu;
            item3X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnRemoveWidgetMenu;
            _separatorThreeBlocks();
        }
        else if (item3X1.style.backgroundImage == ModifyExplorationHelper._pathImageItemRemoveWidgetMenu) {
            item3X1.style.backgroundColor = ModifyExplorationHelper._colorPurple;
            item3X1.style.borderColor = ModifyExplorationHelper._colorPurple;
            nbrBlock.innerText = CockpitHelper._2VerticalBlock;
            ModifyExplorationHelper.tileDimension = 2;
            item2X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnRemoveWidgetMenu;
            item3X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
            _separatorTwoBlocks();
        }
        item1X2.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
        SeparatorVertical1X1.style.backgroundColor = ModifyExplorationHelper._colorPurpleLight;
        item1X2.style.backgroundColor = ModifyExplorationHelper._colorPurple;
        item1X2.style.borderColor = ModifyExplorationHelper._colorPurple;
    }

    function _item1X2Click() {
        if (item1X2.style.backgroundImage == ModifyExplorationHelper._pathImageItemBtnAddWidgetMenu) {
            item1X2.style.backgroundColor = ModifyExplorationHelper._colorOrange;
            item1X2.style.borderColor = ModifyExplorationHelper._colorOrange;
            item2X1.style.backgroundColor = ModifyExplorationHelper._colorPurple;
            item2X1.style.borderColor = ModifyExplorationHelper._colorPurple;
            item3X1.style.backgroundColor = ModifyExplorationHelper._colorPurple;
            item3X1.style.borderColor = ModifyExplorationHelper._colorPurple;
            nbrBlock.innerText = CockpitHelper._2HorizontalBlock;
            ModifyExplorationHelper.tileDimension = 4;
            item1X2.style.backgroundImage = ModifyExplorationHelper._pathImgBtnRemoveWidgetMenu;
            item2X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
            item3X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
            _separatorTwoBloksHorizontal();
        }
        else if (item1X2.style.backgroundImage == ModifyExplorationHelper._pathImageItemRemoveWidgetMenu) {
            item1X2.style.backgroundColor = ModifyExplorationHelper._colorPurple;
            item1X2.style.borderColor = ModifyExplorationHelper._colorPurple;
            nbrBlock.innerText = CockpitHelper._1Block;
            ModifyExplorationHelper.tileDimension = 1;
            item1X2.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
            item2X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
            item3X1.style.backgroundImage = ModifyExplorationHelper._pathImgBtnAddWidgetMenu;
            _separatorOneBlock();
        }
    }

    function _separatorOneBlock() {
        separator1X1.style.backgroundImage = ModifyExplorationHelper._pathImgNone;
        separator1X2.style.backgroundImage = ModifyExplorationHelper._pathImgNone;
        separator1X1.style.backgroundColor = ModifyExplorationHelper._colorPurpleLight;
        separator1X2.style.backgroundColor = ModifyExplorationHelper._colorPurpleLight;
        SeparatorVertical1X1.style.backgroundImage = ModifyExplorationHelper._pathImgNone;
        SeparatorVertical1X1.style.backgroundColor = ModifyExplorationHelper._colorPurpleLight;
    }

    function _separatorTwoBlocks() {
        separator1X1.style.backgroundImage = ModifyExplorationHelper._pathImgItemSeparator;
        separator1X2.style.backgroundImage = ModifyExplorationHelper._pathImgNone;
        separator1X1.style.backgroundColor = ModifyExplorationHelper._colorOrange;
        separator1X2.style.backgroundColor = ModifyExplorationHelper._colorPurpleLight;
        SeparatorVertical1X1.style.backgroundImage = ModifyExplorationHelper._pathImgNone;
        SeparatorVertical1X1.style.backgroundColor = ModifyExplorationHelper._colorPurpleLight;

    }

    function _separatorThreeBlocks() {
        separator1X1.style.backgroundImage = ModifyExplorationHelper._pathImgItemSeparator;
        separator1X2.style.backgroundImage = ModifyExplorationHelper._pathImgItemSeparator;
        separator1X1.style.backgroundColor = ModifyExplorationHelper._colorOrange;
        separator1X2.style.backgroundColor = ModifyExplorationHelper._colorOrange;
        SeparatorVertical1X1.style.backgroundImage = ModifyExplorationHelper._pathImgNone;
        SeparatorVertical1X1.style.backgroundColor = ModifyExplorationHelper._colorPurpleLight;

    }

    function _separatorTwoBloksHorizontal() {
        separator1X1.style.backgroundImage = ModifyExplorationHelper._pathImgNone;
        separator1X2.style.backgroundImage = ModifyExplorationHelper._pathImgNone;
        separator1X1.style.backgroundColor = ModifyExplorationHelper._colorPurpleLight;
        separator1X2.style.backgroundColor = ModifyExplorationHelper._colorPurpleLight;
        SeparatorVertical1X1.style.backgroundImage = ModifyExplorationHelper._pathImgItemSeparatorVertical;
        SeparatorVertical1X1.style.backgroundColor = ModifyExplorationHelper._colorOrange;
    }

    WinJS.UI.Pages.define(Pages.modifyExploration, {
        ready: ready,
    });

})();
/*-------------------------------
-- Author : [M.C]
-- Creation date : 30/01/2013
------------------------------*/

(function () {
    "use strict";
    var isNewGroup;
    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(CockpitHelper.CockpitsMenusTitles.modifyTile, '', false);

            if (elements && elements.tile)
                ModifyKpiHelper.currentTile = elements.tile;

            var listDashboards = CDHelper.toHashTable(DashboardsHelper.listDashboards);
            // set default values
            slct_modifyKpi_dashboard.querySelector(".div_titleItem_select").innerText = listDashboards[ModifyKpiHelper.currentTile.idDashboard].title;
            slct_modifyKpi_dashboard.dataSrc = ModifyKpiHelper.currentTile.idDashboard;
            _bindDataGroups();
            btn_modifyKpi_modifyKpi.focus();
            modifyKpiResumeStep.onkeydown = function (e) {
                if (e.keyCode == 13) {
                    _validateParam();
                    return false;
                }
            };

            lbl_modifyKpi_advanced.onclick = _showAdvancedStep;
            btn_modifyKpi_modifyKpi.onclick = _validateParam;
            slct_modifyKpi_dashboard.onclick = function () { _bindDataDashboards(listDashboards); };
            btn_modifyKpi_groupBack.onclick = function () { _bindDataGroups(true) };

            CDHelper.getMetricLabelFromCode(ModifyKpiHelper.currentTile.measure, ModifyKpiHelper.currentTile.connectorId, _getMetricLabelFromCodeSucceed, _getMetricLabelFromCodeFailed);
            //ToDo: fill resume when service return dimensions, compare and calculation
            lbl_modifyKpi_connector.innerText = ConnectorsTemplate.Connector.getConnectorLabel(ModifyKpiHelper.currentTile.connectorType);
            lbl_modifyKpi_account.innerText = ModifyKpiHelper.currentTile.label;
            lbl_modifyKpi_metric.innerText = (ModifyKpiHelper.currentTile.mesure) ? ModifyKpiHelper.currentTile.mesure : '--';
            lbl_modifyKpi_filter.innerText = (ModifyKpiHelper.currentTile.dimensions) ? ModifyKpiHelper.currentTile.dimensions : '--';
            lbl_modifyKpi_frequency.innerText = CockpitHelper.getLabelFromCode(ModifyKpiHelper.currentTile.frequency, CockpitHelper.EnumPeriods);
            //lbl_modifyKpi_compareTo.innerText = CockpitHelper.returnCompareType(/*ModifyKpiHelper.currentTile.compareTo*/ -1, parseInt(ModifyKpiHelper.currentTile.frequency), CockpitHelper.EnumCompareTo);
            //lbl_modifyKpi_calculation.innerText = CockpitHelper.getLabelFromCode(/*ModifyKpiHelper.currentTile.calculation*/ 1, CockpitHelper.EnumCalculations[1]);
            txt_modifyKpi_kpiTitle.value = ModifyKpiHelper.currentTile.label;
            _updateToogleButtonState(ModifyKpiHelper.currentTile.on_desktop);
            //save id dashboard and group for selected tile
            ModifyKpiHelper.currentTile.lastIdDashboard = ModifyKpiHelper.currentTile.idDashboard;
            ModifyKpiHelper.currentTile.lastGroup = new jQuery.extend(true, {}, ModifyKpiHelper.currentTile.group);
        });
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _validateParam
    -- Description: tests if the parameters are valid
    -- Params: No one
    -- Return: No one
    ------------------------------------------------------*/
    function _validateParam() {
        // input name is not empty
        if (txt_modifyKpi_kpiTitle.value.trim() != '')
        {
            lbl_modifyKpi_titleError.innerText = '';
            if (isNewGroup){
                if (txt_modifyKpi_group.value.trim() != '') {
                    _addGroupDashboard();
                }
                else
                    // the input of group name is empty
                    lbl_modifyKpi_groupError.innerText = MessagesHelper.TXT_CHOOSE_GROUP;
            }

            else {
                if (slct_modifyKpi_group.dataSrc != '') {
                    lbl_modifyKpi_groupError.innerText = '';
                    ModifyKpiHelper.currentTile.group.key = slct_modifyKpi_group.dataSrc;
                    ModifyKpiHelper.currentTile.group.label = slct_modifyKpi_group.querySelector(".div_titleItem_select").innerText;
                    _modifyKpi();
                }
                else
                    lbl_modifyKpi_groupError.innerText = MessagesHelper.TXT_CHOOSE_GROUP;
            }
        }
        else
            // input name (kpi label) is empty
            lbl_modifyKpi_titleError.innerText = MessagesHelper.TXT_KPI_NAME;
    }



    function _getMetricLabelFromCodeSucceed(metric) {
        lbl_modifyKpi_metric.innerText = metric.name;
    }

    function _getMetricLabelFromCodeFailed(error) {
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }


    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _updateToogleButtonState
    -- Description: update state of toogle button
    -- Params: isDispalyInDesktop
    -- Return: No one
    ------------------------------------------------------*/
    function _updateToogleButtonState(isDispalyInDesktop) {
        displayInTileToogle.winControl.checked = isDispalyInDesktop;
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _bindDataDashboards
-- Description: update dashboardlist select element 
-- Params:No one
-- Return: No one
------------------------------------------------------*/
    function _bindDataDashboards(hashedListDashboards) {
        // capitalise first letter dashboard
        for (var count = 0; count < DashboardsHelper.listDashboards.length; count++) {
            DashboardsHelper.listDashboards[count].title = CDHelper.capitaliseOnlyFirstLetter(DashboardsHelper.listDashboards[count].title)
        }
        var type = "selectBox";
        var selectBoxClickCallback = function (idDashboard) {
            slct_modifyKpi_dashboard.querySelector(".div_titleItem_select").innerText = hashedListDashboards[idDashboard].title
            slct_modifyKpi_dashboard.dataSrc = idDashboard;
            _bindDataGroups();
        };

        Popup.showSelectBox(slct_modifyKpi_dashboard, DashboardsHelper.listDashboards, selectBoxClickCallback, CDHelper.position.center, type);

    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _bindDataGroups
-- Description: update group list select element 
-- Params:needInitialisation
-- Return: No one
------------------------------------------------------*/
    function _bindDataGroups(resetGroup) {
        ModifyKpiHelper.currentTile.idDashboard = slct_modifyKpi_dashboard.dataSrc;
        if (resetGroup) {
            ModifyKpiHelper.currentTile.nameGroup = null;
            ModifyKpiHelper.currentTile.group.key = null;
        }
        //slct_modifyKpi_group.innerHTML = '';
        var listGroups = DashboardsHelper.getGroupsDashboard(ModifyKpiHelper.currentTile.idDashboard).slice();
        slct_modifyKpi_group.querySelector(".div_titleItem_select").innerText = "";
        slct_modifyKpi_group.dataSrc = "";

        if (listGroups && listGroups.length > 0) {
            // capitalise first letter group
            for (var count = 0; count < listGroups.length; count++) {
                listGroups[count].title = CDHelper.capitaliseOnlyFirstLetter(listGroups[count].title)
            }
            listGroups.unshift({ title: CDHelper.textNewGroup, id: CDHelper.keyNewGroup });
            var hashedListGroups = CDHelper.toHashTable(listGroups);
            slct_modifyKpi_group.onclick = function () {
                _slctModifyKpiGroup_click(hashedListGroups, listGroups);
            };

            if (ModifyKpiHelper.currentTile.nameGroup) {
                _showTextGroup();
            }
            else {
                 _showSelectGroup();
            }

            if (hashedListGroups[ModifyKpiHelper.currentTile.group.key]) {
                slct_modifyKpi_group.querySelector(".div_titleItem_select").innerText = hashedListGroups[ModifyKpiHelper.currentTile.group.key].title;
                slct_modifyKpi_group.dataSrc = hashedListGroups[ModifyKpiHelper.currentTile.group.key].id;
            }
            else {
                txt_modifyKpi_group.value = (ModifyKpiHelper.currentTile.nameGroup) ? ModifyKpiHelper.currentTile.nameGroup : '';
            }
        }
        else
            _showTextGroup();
    }

    function _slctModifyKpiGroup_click(hashedListGroups, listGroups) {
        var type = "selectBox";
        var selectBoxClickCallback = function (idGroup) {
            if (hashedListGroups[idGroup].id == CDHelper.keyNewGroup) {
                _showTextGroup();
            }
            else {
                slct_modifyKpi_group.querySelector(".div_titleItem_select").innerText = hashedListGroups[idGroup].title;
                slct_modifyKpi_group.dataSrc = idGroup;
                ModifyKpiHelper.currentTile.group.label = hashedListGroups[idGroup].title;
                ModifyKpiHelper.currentTile.group.key = hashedListGroups[idGroup].id;
            }
        };

        Popup.showSelectBox(slct_modifyKpi_group, listGroups, selectBoxClickCallback, CDHelper.position.center, type);
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
        btn_modifyKpi_groupBack.style.display = "block";
        txt_modifyKpi_group.style.display = "block";
        txt_modifyKpi_group.value = (ModifyKpiHelper.currentTile.nameGroup) ? ModifyKpiHelper.currentTile.nameGroup : '';
        isNewGroup = true;
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
        btn_modifyKpi_groupBack.style.display = "none";
        txt_modifyKpi_group.style.display = "none";
        txt_modifyKpi_group.value = '';
        isNewGroup = false;
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _updateCurrentKPI
-- Description:  update kpi object
-- Params: No one
-- Return: No one
------------------------------------------------------*/
    function _updateCurrentKPI(){
        ModifyKpiHelper.currentTile.label = CDHelper.capitaliseOnlyFirstLetter(CDHelper.trim(txt_modifyKpi_kpiTitle.value).toLowerCase());
        ModifyKpiHelper.currentTile.on_desktop = displayInTileToogle.winControl.checked;
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _modifyKpi
-- Description:  call service to modify kpi
-- Params: No one
-- Return: No one
------------------------------------------------------*/
    function _modifyKpi() {
        _updateCurrentKPI();
        var kpiToSend = {
            tile: {
                id: ModifyKpiHelper.currentTile.id,
                group_id: ModifyKpiHelper.currentTile.group.key,
                name: ModifyKpiHelper.currentTile.label,
                frequency: ModifyKpiHelper.currentTile.frequency,
                dimensions: ModifyKpiHelper.currentTile.dimensions,
                on_desktop: ModifyKpiHelper.currentTile.on_desktop,
            }
        }
        RightMenu.rightMenuLoading(true);
        CockpitsServices.updateTile(kpiToSend, _modifyTileSucceed, _modifyTileFailed);
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
        Cockpits.updateKpi(ModifyKpiHelper.currentTile);
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _modifyTileFailed
-- Description: failed call service 
-- Params: No one
-- Return: No one
------------------------------------------------------*/
    function _modifyTileFailed(error) {
        //ToDo
        RightMenu.rightMenuLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
        lv_cockpits.winControl.selection.clear();
        div_cockpits_bottomAppBar.winControl.hide();
        RightMenu.showHideRightMenu(false);
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _addGroupDashboard
    -- Description: call service add group
    -- Params: No one
    -- Return: No one
    ------------------------------------------------------*/
    function _addGroupDashboard() {
        var groupTitle = CDHelper.trim(txt_modifyKpi_group.value);
        var newGroup = {
            group: {
                title: groupTitle
            }
        }
        RightMenu.rightMenuLoading(true);
        DashboardsServices.addGroupDashboard(ModifyKpiHelper.currentTile.idDashboard, newGroup, _addGroupDashboardSucceed, _addGroupDashboardFailed);
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _addGroupDashboardSucceed
-- Description: call service add group succeed
-- Params: No one
-- Return: No one
------------------------------------------------------*/
    function _addGroupDashboardSucceed(group) {
        //TODO
        RightMenu.rightMenuLoading(false);
        ModifyKpiHelper.currentTile.group.key = group.id;
        ModifyKpiHelper.currentTile.group.label = group.title;
        _modifyKpi();
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
-- Name: _showAdvancedStep
-- Description:save change in resume page and show advenced step page
-- Params: No one
-- Return: No one
------------------------------------------------------*/
    function _showAdvancedStep() {
        ModifyKpiHelper.currentTile.idDashboard = slct_modifyKpi_dashboard.dataSrc;

        if ((txt_modifyKpi_group.style.display != 'none') && (txt_modifyKpi_group.value.trim() != '')) {
            ModifyKpiHelper.currentTile.nameGroup = txt_modifyKpi_group.value;
            ModifyKpiHelper.currentTile.group.key = null;//todo
        }
        else {
            ModifyKpiHelper.currentTile.group.key = slct_modifyKpi_group.dataSrc;
            ModifyKpiHelper.currentTile.group.label = slct_modifyKpi_group.querySelector(".div_titleItem_select").innerText;
        }
        ModifyKpiHelper.currentTile.label = txt_modifyKpi_kpiTitle.value;
        ModifyKpiHelper.currentTile.on_desktop = displayInTileToogle.winControl.checked;
        RightMenu.showRightMenu(Pages.modifyKpiAdvancedStep, null);
    }

    WinJS.UI.Pages.define(Pages.modifyKpiResumeStep, {
        ready: ready,
    });

})();
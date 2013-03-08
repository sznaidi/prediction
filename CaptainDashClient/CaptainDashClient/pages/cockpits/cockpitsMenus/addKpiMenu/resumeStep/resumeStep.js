/* -------------------------------
-- Author : [A.A]
-- Creation date : 28/01/2013
-------------------------------*/

(function () {
    "use strict";

    var _TEXT_NEW_GROUP = "Add a new group";
    var _KEY_NEW_GROUP = "addGroup";

    var isNewGroup;

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(CockpitHelper.CockpitsMenusTitles.addTile, '', true);
            btn_rightMenu_back.onclick = _showPreviousStep;

            var listDashboards = CDHelper.toHashTable(DashboardsHelper.listDashboards);
            // set default values
            slct_addKpi_dashboard.querySelector(".div_titleItem_select").innerText = listDashboards[currentKpi.idDashboard].title;
            slct_addKpi_dashboard.dataSrc = currentKpi.idDashboard;
            _bindDataGroups();
            btn_addKpi_addKpi.focus();
            addKpiResumeStep.onkeydown = function (e) {
                if (e.keyCode == 13) {
                    _verifGroup();
                    return false;
                }
            };
            lbl_addKpi_advanced.onclick = _showAdvancedStep;
            btn_addKpi_addKpi.onclick = _verifGroup;

            slct_addKpi_dashboard.onclick = function () { _bindDataDashboards(listDashboards); };
            btn_addKpi_groupBack.onclick = _bindDataGroups;

            lbl_addKpi_connector.innerText = ConnectorsTemplate.Connector.getConnectorLabel(currentKpi.connectorType);
            lbl_addKpi_account.innerText = currentKpi.connectorTitle;
            lbl_addKpi_metric.innerText = currentKpi.measure;
            lbl_addKpi_filter.innerText = (currentKpi.dimensions != '') ? currentKpi.dimensions : '--';
            lbl_addKpi_frequency.innerText = CockpitHelper.getLabelFromCode(currentKpi.frequency, CockpitHelper.EnumPeriods);
            lbl_addKpi_compareTo.innerText = CockpitHelper.returnCompareType(currentKpi.compareTo, parseInt(currentKpi.frequency), CockpitHelper.EnumCompareTo);
            lbl_addKpi_calculation.innerText = CockpitHelper.getLabelFromCode(currentKpi.calculation, CockpitHelper.EnumCalculations[1]);

            txt_addKpi_kpiTitle.innerText = currentKpi.title + " " + currentKpi.measure;
        });
    } 

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _bindDataDashboards
    -- Description: select dashboard
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _bindDataDashboards(hashedListDashboards) {
        var type = "selectBox";
        // capitalise first letter dashboard
        for (var count = 0; count < DashboardsHelper.listDashboards.length; count++) {
            DashboardsHelper.listDashboards[count].title = CDHelper.capitaliseOnlyFirstLetter(DashboardsHelper.listDashboards[count].title)
        }
        var selectBoxClickCallback = function (idDashboard) {
            slct_addKpi_dashboard.querySelector(".div_titleItem_select").innerText = hashedListDashboards[idDashboard].title
            slct_addKpi_dashboard.dataSrc = idDashboard;
            _bindDataGroups();
        };

        Popup.showSelectBox(slct_addKpi_dashboard, DashboardsHelper.listDashboards, selectBoxClickCallback, CDHelper.position.center, type);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _bindDataGroups
    -- Description: select group
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _bindDataGroups() {
        currentKpi.idDashboard = slct_addKpi_dashboard.dataSrc;
        var listGroups = DashboardsHelper.getGroupsDashboard(currentKpi.idDashboard).slice();
        slct_addKpi_group.querySelector(".div_titleItem_select").innerText = "";
        slct_addKpi_group.dataSrc = "";

        if (listGroups && listGroups.length > 0) {
            // capitalise first letter group
            for (var count = 0; count < listGroups.length; count++) {
                listGroups[count].title = CDHelper.capitaliseOnlyFirstLetter(listGroups[count].title)
            }
            listGroups.unshift({ title: _TEXT_NEW_GROUP, id: _KEY_NEW_GROUP });
            var hashedListGroups = CDHelper.toHashTable(listGroups);
            slct_addKpi_group.onclick = function () {
                _slctAddKpiGroup_click(hashedListGroups, listGroups);
            };
            _showSelectGroup();
            if (hashedListGroups[currentKpi.kpi.tile.group_id]) {
                slct_addKpi_group.querySelector(".div_titleItem_select").innerText = hashedListGroups[currentKpi.kpi.tile.group_id].title;
                slct_addKpi_group.dataSrc = hashedListGroups[currentKpi.kpi.tile.group_id].id;
            }
        }
        else {
            currentKpi.group = '';
            _showTextGroup();
        }
    }

    function _slctAddKpiGroup_click(hashedListGroups, listGroups) {
        var type = "selectBox";
        var selectBoxClickCallback = function (idGroup) {
            if (hashedListGroups[idGroup].id == _KEY_NEW_GROUP) {
                _showTextGroup();
            }
            else {
                slct_addKpi_group.querySelector(".div_titleItem_select").innerText = hashedListGroups[idGroup].title;
                slct_addKpi_group.dataSrc = idGroup;
                currentKpi.group = hashedListGroups[idGroup].title;
            }
        };

        Popup.showSelectBox(slct_addKpi_group, listGroups, selectBoxClickCallback, CDHelper.position.center, type);
    }
    
    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showTextGroup
    -- Description: show text to add new group
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showTextGroup() {
        div_selectGroupContainer.style.display = "none";
        div_newGroupContainer.style.display = "block";
        btn_addKpi_groupBack.style.display = "block";
        txt_addKpi_group.value = '';
        isNewGroup = true;
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showSelectGroup
    -- Description: show list groups
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showSelectGroup() {
        div_selectGroupContainer.style.display = "block";
        div_newGroupContainer.style.display = "none";
        btn_addKpi_groupBack.style.display = "none";
        txt_addKpi_group.value = '';
        isNewGroup = false;
    }

    /* ------------------------------------------------------
   -- Author: [A.A]
   -- Name: _verifGroup
   -- Description: verify group where to add kpi
   -- Params:
   -- Return:
   -------------------------------------------------------*/
    function _verifGroup() {
        lbl_addKpi_groupError.innerText = '';
        lbl_addKpi_titleError.innerText = '';

        if (txt_addKpi_kpiTitle.value != '') {
            if (isNewGroup)
                _addGroupDashboard();
            else if (slct_addKpi_group.dataSrc != '')
                _addKpi(slct_addKpi_group.dataSrc)
            else
                lbl_addKpi_groupError.innerText = MessagesHelper.TXT_CHOOSE_GROUP;
        }
        else
            lbl_addKpi_titleError.innerText = MessagesHelper.TXT_KPI_NAME;
    }

    /* ------------------------------------------------------
   -- Author: [A.A]
   -- Name: _addKpi
   -- Description: add Kpi
   -- Params: idGroup
   -- Return:
   -------------------------------------------------------*/
    function _addKpi(idGroup) {
        RightMenu.rightMenuLoading(true);
        currentKpi.kpi.tile.name = CDHelper.capitaliseOnlyFirstLetter(CDHelper.trim(txt_addKpi_kpiTitle.value).toLowerCase());
        currentKpi.kpi.tile.group_id = idGroup;
        currentKpi.kpi.tile.connector_id = currentKpi.connectorId;
        currentKpi.kpi.tile.on_desktop = tgl_addKpi_displayInTile.winControl.checked;
        CockpitsServices.addTile(currentKpi.kpi, _addTileSucceed, _addTileFailed);     
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _addTileSucceed
    -- Description: add Tile succeed
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _addTileSucceed(tile) {
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);

        if (currentKpi.idDashboard == CockpitHelper.currentDashboard.id) {
            Cockpits.insertNewKpi(tile);
        }
        else {
            WinJS.Navigation.navigate(Pages.cockpits, { "title": DashboardsHelper.getDashboardById(currentKpi.idDashboard).title, "idDashboard": currentKpi.idDashboard, "idGroup": currentKpi.kpi.tile.group_id });
        }
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _addTileFailed
    -- Description: add Tile failed
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _addTileFailed(error) {
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _addGroupDashboard
    -- Description: add Group
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _addGroupDashboard() {
        var groupTitle = CDHelper.trim(txt_addKpi_group.value);
        
        if (groupTitle != '') {
            var newGroup = {
                    group: {
                        title: groupTitle
                    }
            }
            RightMenu.rightMenuLoading(true);
            DashboardsServices.addGroupDashboard(slct_addKpi_dashboard.dataSrc, newGroup, _addGroupDashboardSucceed, _addGroupDashboardFailed);
        }
        else
            lbl_addKpi_groupError.innerText = MessagesHelper.TXT_CHOOSE_GROUP;
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _addGroupDashboardSucceed
    -- Description: add Group succeed
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _addGroupDashboardSucceed(group) {
        RightMenu.rightMenuLoading(false);
        _addKpi(group.id);
        currentKpi.group = group.title;
        DashboardsHelper.addGroupDashboard(slct_addKpi_dashboard.dataSrc, group);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _addGroupDashboardFailed
    -- Description: add Group failed
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _addGroupDashboardFailed() {
        RightMenu.rightMenuLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showAdvancedStep
    -- Description: Navigate to advanced step
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showAdvancedStep() {
        currentKpi.title = txt_addKpi_kpiTitle.value;
        if (isNewGroup)
            currentKpi.group = txt_addKpi_group.value;
        RightMenu.showRightMenu(Pages.addKpiAdvancedStep, null);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showPreviousStep
    -- Description: Navigate to metrics step
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showPreviousStep() {
        RightMenu.showRightMenu(Pages.addKpiMetricsStep, currentKpi.metrics);
    }

    WinJS.UI.Pages.define(Pages.addKpiResumeStep, {
        ready: ready,
    });

})();
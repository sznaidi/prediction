/*-------------------------------
-- Author : [A.A]
-- Creation date : 25/12/2012
------------------------------*/

(function () {
    "use strict";

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].nameSource, true);
            btn_rightMenu_back.onclick = _showPreviousStep;
            fsSourceNameStep.onkeydown = _onEnterKeyPressed;
            
            lbl_fsSourceName_sourceName.innerText = CDHelper.capitaliseOnlyFirstLetter(fsConnectorModelToSend.connector.payload.name.toLowerCase()); 
            txt_fsSourceName_sourceName.value = CDHelper.capitaliseOnlyFirstLetter(fsConnectorModelToSend.connector.payload.name.toLowerCase());
            txt_fsSourceName_sourceName.focus();
            btn_fsSourceName_connect.onclick = _addFsConnector;
            _showDefaultWidget();

        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _addFsConnector
    -- Description: Add Foursquare connector
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _addFsConnector() {
        if (!_isFsProfilExist(fsConnectorModelToSend.connector.payload.id)) {
            var connectorLabel = CDHelper.trim(txt_fsSourceName_sourceName.value);
            if (DataSourcesHelper.isValidNameSource(ConnectorsTemplate.ConnectorType.Foursquare, connectorLabel, lbl_fsSourceName_error)) {
                fsConnectorModelToSend.connector.payload.name = connectorLabel; //TODO     

                CDHelper.requireScriptJS(Scripts.defaultWidget);
                var selectGroup = div_fsSourceName.querySelector("." + DefaultWidget._SLCT_GROUP);
                if (selectGroup) {
                    if (selectGroup.length > 0) {
                        var groupId = selectGroup.options[selectGroup.selectedIndex].value;
                        if (groupId) {
                            fsConnectorModelToSend.connector.group_id = groupId;
                        }
                    }
                }
                RightMenu.rightMenuLoading(true);
                ConnectorsServices.addConnector(fsConnectorModelToSend, _addFsConnectorSucceed, _addFsConnectorFailed);
            }
        }
        else
            lbl_fsSourceName_error.innerHTML = MessagesHelper.FS_PROFILE_USED;
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _addFsConnectorSucceed
    -- Description: Succeed callback add Foursquare connector
    -- Params: connector
    -- Return:
    -------------------------------------------------------*/
    function _addFsConnectorSucceed(connector) {
        RightMenu.rightMenuLoading(false);
        DataSources.addConnector(ConnectorsTemplate.ConnectorType.Foursquare, connector);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _addFsConnectorFailed
    -- Description: Failed callback add Foursquare connector
    -- Params: error
    -- Return:
    -------------------------------------------------------*/
    function _addFsConnectorFailed(error) {
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);
        DataSourcesHelper.manageAddConnectorsErrors(error);
    }

    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: _isFbProfilExist
   -- Description: test if the venue id exist
   -- Params: venue id
   -- Return: true if exist, false if not
   -------------------------------------------------------*/
    function _isFsProfilExist(venueId) {
        if (DataSourcesHelper.listConnectors) {
            for (var count = 0; count < DataSourcesHelper.listConnectors[ConnectorsTemplate.ConnectorType.Foursquare].length; count++) {
                if (DataSourcesHelper.listConnectors[ConnectorsTemplate.ConnectorType.Foursquare][count].service_id == venueId)
                    return true;
            }
        }
        return false;
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: onEnterKeyPressed
    -- Description: Add Foursquare connector on press Enter Key
    -- Params: Event
    -- Return:
    -------------------------------------------------------*/
    function _onEnterKeyPressed(e) {
        if (e.keyCode == 13) {
            fsSourceNameStep.blur();
            _addFsConnector();
            return false;
        }
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showPreviousStep
    -- Description: Navigate to previous page
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showPreviousStep() {
        RightMenu.showRightMenu(Pages.addFsMenuSearchResultStep, null);
    }

    /* ------------------------------------------------------
    -- Author: [S.Z]
    -- Name: _showDefaultWidget
    -- Description: show Default Widget
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showDefaultWidget() {
        CDHelper.requireScriptJS(Scripts.dashboardService);
        RightMenu.rightMenuLoading(true);
        DashboardsServices.getAllDashboards(_getDashboardsSucceed, _getDashboardsFailed);
    }

    /* ------------------------------------------------------
        -- Name: _getDashboardsSucceed
        -- Author: [S.Z]
        -- Description: get dashboards succeed
        -- Params: No one
        -- Return: No one
        -------------------------------------------------------*/
    function _getDashboardsSucceed(dashboards) {
        RightMenu.rightMenuLoading(false);
        CDHelper.requireScriptJS(Scripts.dashboardHelper);
        var _listDashboards = DashboardsHelper.filterDashboards(dashboards);

        if (_listDashboards.length > 0) {

            checkbox_dfltWidget_input.disabled = false;
            checkbox_dfltWidget_input.onclick = function () {
                var divSourceName = document.getElementById("div_fsSourceName");
                if (checkbox_dfltWidget_input.checked) {
                    CDHelper.requireScriptJS(Scripts.defaultWidget);
                    DefaultWidget.showDefaultWidget(divSourceName, _listDashboards);
                } else {
                    DefaultWidget.hideDefaultWidget(divSourceName);
                }
            }
        } 
    }

    /* ------------------------------------------------------
   -- Name: _getDashboardsFailed
   -- Description: get dashboards failed
   -- Params:
   -- Return:
   -------------------------------------------------------*/
    function _getDashboardsFailed(error) {
        RightMenu.rightMenuLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }
    

    WinJS.UI.Pages.define(Pages.addFsMenuSourceNameStep, {
        ready: ready,
    });

})();
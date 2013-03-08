/*-------------------------------
-- Author : [A.A]
-- Creation date : 21/12/2012
------------------------------*/

(function () {
    "use strict";

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].nameSource, true);
            btn_rightMenu_back.onclick = function () {
                _showPreviousPage(elements.previous);
            };

            btn_twSourceName_connect.onclick = _addTwConnector;
            twSourceNameStep.onkeydown = _onEnterKeyPressed;
            lbl_twSourceName_sourceName.innerText = CDHelper.capitaliseOnlyFirstLetter(elements.accountLabel.toLowerCase());
            txt_twSourceName_sourceName.innerText = CDHelper.capitaliseOnlyFirstLetter(elements.accountLabel.toLowerCase())
            txt_twSourceName_sourceName.focus();
            _showDefaultWidget();
        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: onEnterKeyPressed
    -- Description: Add Twitter connector on press Enter Key
    -- Params: Event
    -- Return:
    -------------------------------------------------------*/
    function _onEnterKeyPressed(e) { 
        if (e.keyCode == 13) {
            twSourceNameStep.blur();
            _addTwConnector();
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
    function _showPreviousPage(page) {
        RightMenu.showRightMenu(page, null);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _addTwConnector
    -- Description: Add Twitter connector
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _addTwConnector() {
        var connectorLabel = CDHelper.trim(txt_twSourceName_sourceName.value);
        if (DataSourcesHelper.isValidNameSource(ConnectorsTemplate.ConnectorType.Twitter, connectorLabel, lbl_twSourceName_error))

            // add group_id to connector
            CDHelper.requireScriptJS(Scripts.defaultWidget);
            var selectGroup = div_twSourceName.querySelector("." + DefaultWidget._SLCT_GROUP);
            if (selectGroup) {
                if (selectGroup.length > 0) {
                    var groupId = selectGroup.options[selectGroup.selectedIndex].value;
                    if (groupId) {
                        connectorModelToSend.connector.group_id = groupId;
                    }
                }
            }
            RightMenu.rightMenuLoading(true);
            ConnectorsServices.addConnector(connectorModelToSend, _addTwConnectorSucceed, _addTwConnectorFailed);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _addTwConnectorSucceed
    -- Description: Succeed callback add Twitter connector
    -- Params: connector
    -- Return:
    -------------------------------------------------------*/
    function _addTwConnectorSucceed(connector) {
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);
        DataSources.addConnector(ConnectorsTemplate.ConnectorType.Twitter, connector);
    }
    
    /* ------------------------------------------------------
   -- Author: [A.A]
   -- Name: _addTwConnectorFailed
   -- Description: Failed callback add Twitter connector
   -- Params: error
   -- Return:
   -------------------------------------------------------*/
    function _addTwConnectorFailed(error) {
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);
        DataSourcesHelper.manageAddConnectorsErrors(error);
    }

    /* ------------------------------------------------------
   -- Author: [S.Z]
   -- Name: _showDefaultWidget
   -- Description: show Default Widget
   -- Params:
   -- Return:
   -------------------------------------------------------*/
    function _showDefaultWidget() {
        RightMenu.rightMenuLoading(true);
        CDHelper.requireScriptJS(Scripts.dashboardService);
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

                var divSourceName = document.getElementById("div_twSourceName");
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


    WinJS.UI.Pages.define(Pages.addTwMenuSourceNameStep, {
        ready: ready,
    });

})();
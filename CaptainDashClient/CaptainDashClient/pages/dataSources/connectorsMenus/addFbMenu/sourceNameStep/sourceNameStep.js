/*-------------------------------
-- Author : [S.H]
-- Creation date : 24/12/2012
------------------------------*/
(function () {
    "use strict";
    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].nameSource, true);
            lbl_fbSourceName_titleImput.innerHTML = CDHelper.capitaliseOnlyFirstLetter(fbconnectorModelToSend.connector.payload.name.toLowerCase());
            txt_fbSourceNameTxt_input.value = CDHelper.capitaliseOnlyFirstLetter(fbconnectorModelToSend.connector.payload.name.toLowerCase());
            txt_fbSourceNameTxt_input.focus();
            btn_rightMenu_back.onclick = _showPreviousPage;
            btn_fbSourceName_connect.onclick = _addFbConnector;
            txt_fbSourceNameTxt_input.onkeydown = _onEnterKeyPressed;
            _showDefaultWidget();
        });
    }

    /*  ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _onEnterKeyPressed
    -- Description: It runs when we press on Enter Key
    -- Params: Event
    -- Return: No one
    -------------------------------------------------------*/
    function _onEnterKeyPressed(e) {
        if (e.keyCode == 13) {
            txt_fbSourceNameTxt_input.blur();
            _addFbConnector();
            return false;
        }
    }

    /*  ------------------------------------------------------
   -- Author: [S.H]
   -- Name: _addFbConnector
   -- Description: add Facebook connector(onEnterKeyPressed or connect btn event handled)
   -- Params: No one
   -- Return: No one
   -------------------------------------------------------*/
    function _addFbConnector() {
        var connectorLabel;
        //test if profil exist
        if (!_isFbProfilExist(fbconnectorModelToSend.connector.payload.id))
        {
            connectorLabel = CDHelper.trim(txt_fbSourceNameTxt_input.value);
            //check connector label validity 
            if (DataSourcesHelper.isValidNameSource(ConnectorsTemplate.ConnectorType.Facebook, connectorLabel, lbl_fbSourceName_error)) {
                fbconnectorModelToSend.connector.payload.name = connectorLabel; //TODO

                // add group_id to connector
                CDHelper.requireScriptJS(Scripts.defaultWidget);
                var selectGroup = div_fbSourceName.querySelector("." + DefaultWidget._SLCT_GROUP);
                if (selectGroup) {
                    if (selectGroup.length > 0) {
                        var groupId = selectGroup.options[selectGroup.selectedIndex].value;
                        if (groupId) {
                            fbconnectorModelToSend.connector.group_id = groupId;
                        }
                    }
                }
                
                RightMenu.rightMenuLoading(true);
                ConnectorsServices.addConnector(fbconnectorModelToSend, _addFbConnectorSucceed, _addFbConnectorFailed);
            }
        }
        else {
            if (fbconnectorModelToSend.connector.public) {
                lbl_fbSourceName_error.innerHTML = MessagesHelper.TXT_PROFIL_EXIST;
            }

            else {
                lbl_fbSourceName_error.innerHTML = MessagesHelper.FB_INSIGHT_PROFIL_EXIST;
            }
        }
    }
    
    /*  ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _addFbConnectorSucceed
    -- Description: Callback succeed (add fb connector)
    -- Params: L'object connector
    -- Return: No one
    -------------------------------------------------------*/
    function _addFbConnectorSucceed(connector) {
        RightMenu.rightMenuLoading(false);
        DataSources.addConnector(ConnectorsTemplate.ConnectorType.Facebook, connector);
        ////RightMenu.showHideRightMenu(false);
        ////DataSourcesHelper.addConnector(ConnectorsTemplate.ConnectorType.Facebook, connector);
        ////DataSources.showConnector(connector);
    }

    /*------------------------------------------------------
    -- Author: [S.H]
    -- Name: _addFbConnectorFailed
    -- Description: Callback failed (add fb connector)
    -- Params: Error
    -- Return: No one
    -------------------------------------------------------*/
    function _addFbConnectorFailed(error) {
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);
        DataSourcesHelper.manageAddConnectorsErrors(error);
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _isFbProfilExist
    -- Description: test if the id of a selected page exist
    -- Params: id of selected page
    -- Return: true if exist, false if not
    -------------------------------------------------------*/
    function _isFbProfilExist(selectedPageId) {
        if (DataSourcesHelper.listConnectors) {
            for (var count = 0; count < DataSourcesHelper.listConnectors[ConnectorsTemplate.ConnectorType.Facebook].length; count++) {
                if (DataSourcesHelper.listConnectors[ConnectorsTemplate.ConnectorType.Facebook][count].service_id == selectedPageId)
                    return true;
            }
        }
        return false;
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _showPreviousPage
    -- Description: Navigate to previous page (fb serach resul step)
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _showPreviousPage() {
       RightMenu.showRightMenu(Pages.fbSearchResultStep);
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
                var divSourceName = document.getElementById("div_fbSourceName");
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
    -- Author: [S.Z]
   -- Name: _getDashboardsFailed
   -- Description: get dashboards failed
   -- Params:
   -- Return:
   -------------------------------------------------------*/
    function _getDashboardsFailed(error) {
        RightMenu.rightMenuLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    WinJS.UI.Pages.define(Pages.fbSourceNameStep, {
        ready: ready,
    });

})();
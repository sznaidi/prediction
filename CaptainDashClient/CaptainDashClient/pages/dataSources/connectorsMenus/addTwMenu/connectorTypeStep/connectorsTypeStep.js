/*-------------------------------
-- Author : HK
-- Creation date : 30/01/2013
------------------------------*/

var connectorModelToSend;

(function () {
    "use strict";
    /*---------------------------------------------------------
   -- Author: HK
   -- Name: ready
   -- Description: This function is called whenever a user navigates to this page. 
      It populates the page elements with the app's data.
   -- Params: userInfo object (credentials)
   -- Return: none
   ----------------------------------------------------------*/
    var _ownerPayload;
    var _indexCredentials;

    function ready(userInfo) {
        WinJS.UI.processAll().then(function (e) {
            
            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].connectorType, true);
            btn_rightMenu_back.onclick = _showPreviousPage;

            if (userInfo && userInfo.data) {
                _ownerPayload = userInfo.data;
            }

            //Create Twitter ConnectorModel
            if (!connectorModelToSend) {
                connectorModelToSend = new ConnectorsTemplate.ConnectorModelToSend(ConnectorsTemplate.ConnectorType.Twitter);
                RightMenu.addToObjectsToBeDeleted(connectorModelToSend);
            }

            //Get crendentials infos (in case of direct navigation)
            if (userInfo)
                _initTwConnectorInfo(userInfo.indexCredential);

            _bindDataTwConnectorTypes();
            CDHelper.showHideLoading(false);
        });
    }

    /*---------------------------------------------------------
    -- Author: HK
    -- Name: _initTwConnectorInfo
    -- Description: init Twitter connector
    -- Params: userInfo : credentials 
    -- Return: none
    ----------------------------------------------------------*/
    function _initTwConnectorInfo(indexCredentials) {
        var credentials = Credentials.getCredentialByIndex(ConnectorsTemplate.ConnectorType.Twitter, indexCredentials);
        connectorModelToSend.connector.credential_id = credentials.id;
        _indexCredentials = indexCredentials;
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _bindDataTwConnectorTypes
    -- Description: Bind list Tw connector Types with data
    -- Params: none
    -- Return: none
    -------------------------------------------------------*/
    function _bindDataTwConnectorTypes() {
        WinJS.UI.setOptions(lv_twConnectorType.winControl, {
            itemDataSource: new WinJS.Binding.List(AddTwMenuHelper.twConnectorsTypes).dataSource,
            oniteminvoked: _lvTwConnectorTypeItemInvoked
        });
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _lvTwConnectorTypeItemInvoked
    -- Description: handle the click on on a twitter connector type
    -- Params: e = event
    -- Return: none
    -------------------------------------------------------*/
    function _lvTwConnectorTypeItemInvoked(e) {
        var selectedTwConnectorType = AddTwMenuHelper.twConnectorsTypes[e.detail.itemIndex];

        if (selectedTwConnectorType) {
            // is owned type
            if (!selectedTwConnectorType.isPublic) {
                connectorModelToSend.connector.public = !_ownerPayload.protected;
                connectorModelToSend.connector.payload = _ownerPayload;
                RightMenu.showRightMenu(Pages.addSourceNameStep, { accountLabel: _ownerPayload.screen_name, previous: Pages.addTwMenuConnectorTypeStep, connectorType: ConnectorsTemplate.ConnectorType.Twitter });
            }
            //other account
            else {
                RightMenu.showRightMenu(Pages.addTwMenuAccountStep, { indexCredentials: _indexCredentials });
            }
        }
    }


   /* ------------------------------------------------------
   -- Author: HK
   -- Name: _showPreviousPage
   -- Description: Navigate to previous page (credentials menu)
   -- Params: none
   -- Return: none
   -------------------------------------------------------*/
    function _showPreviousPage() {
        RightMenu.showRightMenu(Pages.credentialsMenu, ConnectorsTemplate.ConnectorType.Twitter);
    }

    WinJS.UI.Pages.define(Pages.addTwMenuConnectorTypeStep, {
        ready: ready,
    });

})();
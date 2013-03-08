/*-------------------------------
-- Author : [S.H]
-- Creation date : 20/12/2012
------------------------------*/
var fbconnectorModelToSend;
var fbPages;
(function () {
    "use strict";
    /*---------------------------------------------------------
   -- Author: [S.H]
   -- Name: ready
   -- Description: This function is called whenever a user navigates to this page. 
      It populates the page elements with the app's data.
   -- Params: userInfo object (credentials + insight pages)
   -- Return: no one
   ----------------------------------------------------------*/
    function ready(userInfo) {
        WinJS.UI.processAll().then(function (e) {
            if (!fbconnectorModelToSend) {
                fbconnectorModelToSend = new ConnectorsTemplate.ConnectorModelToSend();
                RightMenu.addToObjectsToBeDeleted(fbconnectorModelToSend);
            }
            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].connectorType, true);
            btn_rightMenu_back.onclick = _showPreviousPage;
            if (userInfo) {
                _initFbConnectorInfo(userInfo);
            }
            _bindDataFbConnectorTypes();
            CDHelper.showHideLoading(false);
        });
    }

    /*---------------------------------------------------------
    -- Author: [S.H]
    -- Name: _initFbConnectorInfo
    -- Description: init Facebook connector
    -- Params: userInfo : userInfo object (credentials + insight pages)
    -- Return: no one
    ----------------------------------------------------------*/
    function _initFbConnectorInfo(userInfo) {
        fbconnectorModelToSend.connector.credential_id  = Credentials.getCredentialByIndex(ConnectorsTemplate.ConnectorType.Facebook, userInfo.indexCredential).id;
        fbconnectorModelToSend.type = ConnectorsTemplate.ConnectorType.Facebook;
        fbPages = new AddFbMenuHelper.fbPages();
        fbPages.insightPages = userInfo.data;
        RightMenu.addToObjectsToBeDeleted(fbconnectorModelToSend);
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _bindDataFbConnectorTypes
    -- Description: Bind list Fb connector Types with data
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _bindDataFbConnectorTypes() {
        WinJS.UI.setOptions(lv_fbConnectorType.winControl, {
            itemDataSource: new WinJS.Binding.List(AddFbMenuHelper.fbConnectorsTypes).dataSource,
            oniteminvoked: _lvFbConnectorTypeItemInvoked
        });
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _lvFbConnectorTypeItemInvoked
    -- Description: handle the click on on a facebook connector type
    -- Params: l'event
    -- Return: No one
    -------------------------------------------------------*/
    function _lvFbConnectorTypeItemInvoked(e) {
        var selectedFbConnectorType;
        if (e) {
            selectedFbConnectorType = AddFbMenuHelper.fbConnectorsTypes[e.detail.itemIndex];
        }

        if (selectedFbConnectorType) {
            // is fan page
            if (selectedFbConnectorType.isPublic) {
                fbconnectorModelToSend.connector.public = true;
                RightMenu.showRightMenu(Pages.fbSearchStep, null);
            }
            else
                //Is insight
                _showInsights();
        }
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _showInsights
    -- Description: Show facebook insight page
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _showInsights() {
        fbconnectorModelToSend.connector.public = false;
        if (fbPages.insightPages)
            RightMenu.showRightMenu(Pages.fbSearchResultStep, null);
    }


   /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: _showPreviousPage
   -- Description: Navigate to previous page (credentials menu)
   -- Params: No one
   -- Return: No one
   -------------------------------------------------------*/
    function _showPreviousPage() {
        RightMenu.showRightMenu(Pages.credentialsMenu, ConnectorsTemplate.ConnectorType.Facebook);
    }

    WinJS.UI.Pages.define(Pages.fbConnectorsTypeStep, {
        ready: ready,
    });

})();
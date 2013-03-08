/*-------------------------------
-- Author : [A.A]
-- Creation date : 25/12/2012
------------------------------*/
var fsConnectorModelToSend;
var fsVenues;
(function () {
    "use strict";
    function ready(userInfo) {
        WinJS.UI.processAll().then(function (e) {
            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].venueType, true);
            if (!fsConnectorModelToSend) {
                fsConnectorModelToSend = new ConnectorsTemplate.ConnectorModelToSend();
                RightMenu.addToObjectsToBeDeleted(fsConnectorModelToSend);
            }
            btn_rightMenu_back.onclick = _showPreviousPage;
            if (userInfo) {
                _initFsConnectorInfo(userInfo);
            }
            _bindDataVenueType();
            CDHelper.showHideLoading(false);
        });
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _bindDataVenueType
    -- Description: Bind list Foursquare venue type
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _bindDataVenueType() {
        WinJS.UI.setOptions(lv_venueType.winControl, {
            itemDataSource: new WinJS.Binding.List(AddFsMenuHelper.listVenueType).dataSource,
            oniteminvoked: _lvVenueTypeItemInvoked
        });
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _lvVenueTypeItemInvoked
    -- Description: Evt on click on list Foursquare venue type
    -- Params: Evt
    -- Return:
    -------------------------------------------------------*/
    function _lvVenueTypeItemInvoked(e) {
        var selectedFsConnectorType = AddFsMenuHelper.listVenueType[e.detail.itemIndex];

        if (selectedFsConnectorType.isPublic) {
            fsConnectorModelToSend.connector.public = true;
            fsVenues.venue = '';
            fsVenues.near = '';
            RightMenu.showRightMenu(Pages.addFsMenuSearchStep, null);
        }
        else if (fsVenues.privateVenues.length) {
            fsConnectorModelToSend.connector.public = false;
            RightMenu.showRightMenu(Pages.addFsMenuSearchResultStep, null);
        }
        else
            fsVenueTypeError.innerText = MessagesHelper.TXT_NO_MANAGED_VENUE;
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showPreviousPage
    -- Description: Navigate to previous page
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showPreviousPage() {
        RightMenu.showRightMenu(Pages.credentialsMenu, ConnectorsTemplate.ConnectorType.Foursquare);
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _initFsConnectorInfo
    -- Description: init Foursquare connector
    -- Params: userInfo : userInfo object (credentials + private venues)
    -- Return:
    -------------------------------------------------------*/
    function _initFsConnectorInfo(userInfo) {
        fsConnectorModelToSend.connector.credential_id = Credentials.getCredentialByIndex(ConnectorsTemplate.ConnectorType.Foursquare, userInfo.indexCredential).id;
        fsConnectorModelToSend.type = ConnectorsTemplate.ConnectorType.Foursquare;
        fsVenues = new AddFsMenuHelper.fsVenues();
        if (userInfo.data.length) {
            fsVenues.privateVenues = userInfo.data;
        }
        RightMenu.addToObjectsToBeDeleted(fsVenues);
    }

    WinJS.UI.Pages.define(Pages.addFsMenuVenueTypeStep, {
        ready: ready,
    });

})();
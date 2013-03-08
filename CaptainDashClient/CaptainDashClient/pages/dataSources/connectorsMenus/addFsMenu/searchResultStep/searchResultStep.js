/*-------------------------------
-- Author : [A.A]
-- Creation date : 25/12/2012
------------------------------*/

(function () {
    "use strict";

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {

            if (fsConnectorModelToSend.connector.public) {
                RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].searchResult, true);
                _bindDataVenues(fsVenues.publicVenues);
            }
            else {
                RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].yourVenueResult, true);
                _bindDataVenues(fsVenues.privateVenues);
            }

            btn_rightMenu_back.onclick = _showPreviousStep;

        });
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _bindDataVenues
    -- Description: Bind list venues
    -- Params: list venues
    -- Return:
    -------------------------------------------------------*/
    function _bindDataVenues(venues) {
        for (var count = 0; count < venues.length; count++) {
            venues[count].name = CDHelper.capitaliseOnlyFirstLetter(venues[count].name);
        };
        var modelVenues = [];
        for (var i = 0; i < venues.length; i++) {
            var venue = _generateVenueModel(venues[i]);
            modelVenues.push(venue);
        }

        WinJS.UI.setOptions(lv_venues.winControl, {
            itemDataSource: new WinJS.Binding.List(modelVenues).dataSource,
            oniteminvoked: _lvVenuesItemInvoked
        });
    }
    
    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _generateVenueModel
    -- Description: generate model venue for listview
    -- Params: venue
    -- Return: formated model venue
    -------------------------------------------------------*/
    function _generateVenueModel(venue) {
        var NO_ADDRESS_FOUND = WinJS.Resources.getString("addFsMenuSearchResultStep_noAdressFound").value;
        var NO_IMG_BACKGROUND_COLOR = '#fff';
        var IMG_BACKGROUND_COLOR = 'transparent';
        return {
            name: venue.name,
            address: (venue.location.address) ? venue.location.address : NO_ADDRESS_FOUND,
            bgColor: (venue.categories[0] && venue.categories[0].icon && venue.categories[0].icon.prefix && venue.categories[0].icon.suffix) ? IMG_BACKGROUND_COLOR : NO_IMG_BACKGROUND_COLOR,
            bgImg: (venue.categories[0] && venue.categories[0].icon) ? 'url(' + venue.categories[0].icon.prefix + 'bg_32' + venue.categories[0].icon.suffix + ')' : '',
        }
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _lvVenuesItemInvoked
    -- Description: on select a venue
    -- Params: Event
    -- Return:
    -------------------------------------------------------*/
    function _lvVenuesItemInvoked(e) {
        var venues = []
        if (fsConnectorModelToSend.connector.public)
            venues = fsVenues.publicVenues;
        else 
            venues = fsVenues.privateVenues;
            
        fsConnectorModelToSend.connector.payload = venues[e.detail.itemIndex];
        RightMenu.showRightMenu(Pages.addSourceNameStep, { accountLabel: venues[e.detail.itemIndex].name, previous: Pages.addFsMenuSearchResultStep, connectorType: ConnectorsTemplate.ConnectorType.Foursquare });
    }


    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showPreviousStep
    -- Description: Navigate to previous page
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showPreviousStep() {
        if (fsConnectorModelToSend.connector.public)
            RightMenu.showRightMenu(Pages.addFsMenuSearchStep, null);
        else
            RightMenu.showRightMenu(Pages.addFsMenuVenueTypeStep, null);
    }

    WinJS.UI.Pages.define(Pages.addFsMenuSearchResultStep, {
        ready: ready,
    });

})();
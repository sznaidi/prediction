/*-------------------------------
-- Author : [A.A]
-- Creation date : 25/12/2012
------------------------------*/

(function () {
    "use strict";

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].search, true);
            btn_rightMenu_back.onclick = _showPreviousStep;
            btn_fsSearch_Next.onclick = _showSearchResultPage;
            btn_fsSearch_Next.focus();
            fsSearchStep.onkeydown = _onEnterKeyPressed;
            if (fsVenues.venue != '' && fsVenues.near != '') {
                txt_search_venue.value = fsVenues.venue;
                txt_search_near.value = fsVenues.near;
            }
        });
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: onEnterKeyPressed
    -- Description: Show search result on press Enter Key
    -- Params: Event
    -- Return:
    -------------------------------------------------------*/
    function _onEnterKeyPressed(e) {
        if (e.keyCode == 13) {
            fsSearchStep.blur();
            fsSearchStep.focus();
            _showSearchResultPage();
            return false;
        }
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showPreviousStep
    -- Description: Navigate to previous page
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showPreviousStep() {
        RightMenu.showRightMenu(Pages.addFsMenuVenueTypeStep, null);
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _isValidSearch
    -- Description: Verify input texts
    -- Params:
    -- Return: True if valid, False if not
    -------------------------------------------------------*/
    function _isValidSearch() {
        if (txt_search_venue.value && txt_search_near.value)
            return true
        else
            fsSearchError.innerText = MessagesHelper.TXT_INVALID_SEARCH;
        return false;
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showSearchResultPage
    -- Description: Run search venue
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showSearchResultPage() {
        if (_isValidSearch()) {
            RightMenu.rightMenuLoading(true);
            FoursquareApi.searchVenues(txt_search_venue.value, txt_search_near.value, _searchVenuesSucceed, _searchVenuesFailed);
        }
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _searchVenuesSucceed
    -- Description: Callback succeed search venue
    -- Params: list venues
    -- Return:
    -------------------------------------------------------*/
    function _searchVenuesSucceed(venues) {
        RightMenu.rightMenuLoading(false);
        
        if (venues.length) {
            fsVenues.publicVenues = venues;
            fsVenues.venue = txt_search_venue.value;
            fsVenues.near = txt_search_near.value;
            RightMenu.showRightMenu(Pages.addFsMenuSearchResultStep, null);
        }
        else
            fsSearchError.innerText = MessagesHelper.TXT_NO_SEARCH_RESULT;
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _searchVenuesFailed
    -- Description: Callback failed search venue
    -- Params: error
    -- Return:
    -------------------------------------------------------*/
    function _searchVenuesFailed(error) {
        RightMenu.rightMenuLoading(false);
        fsSearchError.innerText = MessagesHelper.TXT_INVALID_SEARCH;
    }

    WinJS.UI.Pages.define(Pages.addFsMenuSearchStep, {
        ready: ready,
    });

})();
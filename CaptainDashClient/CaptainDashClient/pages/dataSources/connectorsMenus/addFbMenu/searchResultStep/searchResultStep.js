/*-------------------------------
-- Author : [S.H]
-- Creation date : 24/12/2012
------------------------------*/
(function () {
    "use strict";
    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].searchResult, true);
            btn_rightMenu_back.onclick = _showPreviousPage;
            if (fbconnectorModelToSend.connector.public) {
                _bindDataFbPages(fbPages.fanPages);
            }
            else {
                _bindDataFbPages(fbPages.insightPages);
            }
        });
    }

    /*  ------------------------------------------------------
   -- Author: [S.Z]
   -- Name: _bindDataFbPages
   -- Description: Bind list facebook page
   -- Params: pages
   -- Return:
   -------------------------------------------------------*/
    function _bindDataFbPages(pages) {
        for (var count = 0; count < pages.length; count++) {
            pages[count].name = CDHelper.capitaliseOnlyFirstLetter(pages[count].name);
        };
        WinJS.UI.setOptions(lv_searchResults.winControl, {
            itemDataSource: new WinJS.Binding.List(pages).dataSource,
            oniteminvoked: lvSearchResultsItemInvoked,
            itemTemplate: template_lvSearchResults
        });
    }
    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: lvSearchResultsItemInvoked
    -- Description: handle the click on a facebook fan page
    -- Params: L'event
    -- Return: No one
    -------------------------------------------------------*/
    function lvSearchResultsItemInvoked(e) {
        e.detail.itemPromise.then(function (page) {         
            fbconnectorModelToSend.connector.payload = page.data;
            //sourceNameLabel = page.data.name, previous: Pages.fbSearchResultStep
            RightMenu.showRightMenu(Pages.addSourceNameStep, { accountLabel: page.data.name, previous: Pages.fbSearchResultStep, connectorType: ConnectorsTemplate.ConnectorType.Facebook });
        })
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _showPreviousPage
    -- Description: Navigate to previous page 
       (if it's a fan page go back to "serach page" else go to "fb connectors types page")
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _showPreviousPage() {
        if (fbconnectorModelToSend.connector.public)
            RightMenu.showRightMenu(Pages.fbSearchStep, null);
        else
            RightMenu.showRightMenu(Pages.fbConnectorsTypeStep, null);
    }


    WinJS.UI.Pages.define(Pages.fbSearchResultStep, {
        ready: ready,
    });

})();
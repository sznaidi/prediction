/*-------------------------------
-- Author : [A.A]
-- Creation date : 25/12/2012
------------------------------*/

(function () {
    "use strict";
    var _indexCredentials;//pass index cred
    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].searchResult, true);
            if (elements) {
                _indexCredentials = elements.indexCredentials;
            }

            _bindDataUsers();
            btn_rightMenu_back.onclick = _showPreviousStep;
        });
    }

    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: _bindDataUsers
    -- Description: Bind list users
    -- Params: list users
    -- Return: none
    -------------------------------------------------------*/
    function _bindDataUsers() {
        for (var count = 0; count < AddTwMenuHelper._twUsersSearch.length; count++) {
            AddTwMenuHelper._twUsersSearch[count].name = CDHelper.capitaliseOnlyFirstLetter(AddTwMenuHelper._twUsersSearch[count].name);
        };
        WinJS.UI.setOptions(lv_users.winControl, {
            itemDataSource: new WinJS.Binding.List(AddTwMenuHelper._twUsersSearch).dataSource,
            oniteminvoked: _lvUsers_itemInvoked,
            itemTemplate: template_lvUsers
        });
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _lvUsers_itemInvoked
    -- Description: on select a venue
    -- Params: Event
    -- Return:
    -------------------------------------------------------*/
    function _lvUsers_itemInvoked(e) {
        var selectedUser = AddTwMenuHelper._twUsersSearch[e.detail.itemIndex];
        var credentials = Credentials.getCredentialByIndex(ConnectorsTemplate.ConnectorType.Twitter, _indexCredentials);

        if (!AddTwMenuHelper.isNotValidAccount(selectedUser, credentials)) {
            connectorModelToSend.connector.payload = selectedUser;
            connectorModelToSend.connector.public = !selectedUser.protected;
            RightMenu.showRightMenu(Pages.addSourceNameStep, { accountLabel: selectedUser.screen_name, previous: Pages.addTwMenuSearchResultStep, connectorType: ConnectorsTemplate.ConnectorType.Twitter });
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
        RightMenu.showRightMenu(Pages.addTwMenuAccountStep, null);
    }

    WinJS.UI.Pages.define(Pages.addTwMenuSearchResultStep, {
        ready: ready,
    });

})();
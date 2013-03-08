/*-------------------------------
-- Author : [A.A]
-- Creation date : 21/12/2012
------------------------------*/

var connectorModelToSend;

(function () {
    "use strict";
    var _accountLabel;
    var _indexCredentials;

    function ready(userInfo) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].account, true);

            if (userInfo) {
                _indexCredentials = userInfo.indexCredentials;
                _accountLabel = '';
            }

            var credentials = Credentials.getCredentialByIndex(ConnectorsTemplate.ConnectorType.Twitter, _indexCredentials);
            btn_rightMenu_back.onclick = _showPreviousPage;
            btn_twAccount_Next.onclick = function () { _searchTwAccounts(credentials); };
            btn_twAccount_Next.focus();
            twAccountStep.onkeydown = _onEnterKeyPressed;

            //Set accountLabel (in case of previous navigation)
            txt_twAccount_username.value = _accountLabel;
            
        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: onEnterKeyPressed
    -- Description: Set Twitter account on press Enter Key
    -- Params: Event
    -- Return:
    -------------------------------------------------------*/
    function _onEnterKeyPressed(e) {
        if (e.keyCode == 13) {
            txt_twAccount_username.blur();
            var credentials = Credentials.getCredentialByIndex(ConnectorsTemplate.ConnectorType.Twitter, _indexCredentials);
            _searchTwAccounts(credentials);
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
    function _showPreviousPage() {
        RightMenu.showRightMenu(Pages.addTwMenuConnectorTypeStep, null);
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _searchTwAccounts
    -- Description: search user matching search
    -- Params: credentials of authenticated user
    -- Return: none
    -------------------------------------------------------*/
    function _searchTwAccounts(credentials) {
        if (txt_twAccount_username.value) {
            RightMenu.rightMenuLoading(true);
            lbl_twAccount_error.innerText = '';
            _accountLabel = txt_twAccount_username.value;
            TwitterApi.searchUsers(credentials, txt_twAccount_username.value, searchUsersSucceed, searchUsersFailed);
        }
        else
            lbl_twAccount_error.innerText = MessagesHelper.TW_ACCOUNT_USERNAME;
    }

    function searchUsersSucceed(listUsers) {
        RightMenu.rightMenuLoading(false);
        if (listUsers.length > 0) {
            AddTwMenuHelper._twUsersSearch = listUsers;
            RightMenu.showRightMenu(Pages.addTwMenuSearchResultStep, { indexCredentials: _indexCredentials });
        }
        else {
            lbl_twAccount_error.innerText = MessagesHelper.TXT_NO_SEARCH_RESULT;
        }
    }

    function searchUsersFailed(error) {
        RightMenu.rightMenuLoading(false);
        lbl_twAccount_error.innerText = MessagesHelper.TXT_NO_SEARCH_RESULT;
    }

    WinJS.UI.Pages.define(Pages.addTwMenuAccountStep, {
        ready: ready,
    });

})();
/*------------------------------
-- Author : [S.H]
-- Creation date : 24/12/2012
------------------------------*/
(function () {

    var _twConnectorsTypes = [
            { label:  WinJS.Resources.getString("AddTwMenuHelper_ownAccount").value, isPublic: false },
            { label: WinJS.Resources.getString("AddTwMenuHelper_otherAccount").value, isPublic: true },
    ];

    var _twUsersSearch = [];

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _isTwAccountExist
    -- Description: test if Twitter account id exist
    -- Params: account id
    -- Return: true if exist, false if not
    Note:
        * HK: moved from account step to helper
    -------------------------------------------------------*/
    function isTwAccountExist(accountId) {
        if (DataSourcesHelper.listConnectors) {
            for (var count = 0; count < DataSourcesHelper.listConnectors[ConnectorsTemplate.ConnectorType.Twitter].length; count++) {
                if (DataSourcesHelper.listConnectors[ConnectorsTemplate.ConnectorType.Twitter][count].service_id == accountId)
                    return true;
            }
        }
        return false;
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _screenNameExistInTwSucceed
    -- Description: Succeed callback verify account existance
    -- Params: account
    -- Return:
    Note: 
        * HK: moved from account step to helper
    -------------------------------------------------------*/
    function isNotValidAccount(accountInfo, credentials) {
        if (!accountInfo.protected || '@' + accountInfo.screen_name.toLowerCase() == credentials.handle.toLowerCase()) {
            if (!isTwAccountExist(accountInfo.id_str)) {
                return false;
            }
            else {
                Messages.showOkMessage('', MessagesHelper.TW_ACCOUNT_EXIST);
                return true;
            }
        }
        else {
            Messages.showOkMessage('', MessagesHelper.TW_NO_ACCESS);
            return true;
        }
    }

     WinJS.Namespace.define("AddTwMenuHelper", {
         twConnectorsTypes: { get: function () { return _twConnectorsTypes; } },
         twUsersSearch: { get: function () { return _twUsersSearch; }, get: function (value) { _twUsersSearch = value; } },
         isNotValidAccount: isNotValidAccount,
         isTwAccountExist: isTwAccountExist
     });


})();

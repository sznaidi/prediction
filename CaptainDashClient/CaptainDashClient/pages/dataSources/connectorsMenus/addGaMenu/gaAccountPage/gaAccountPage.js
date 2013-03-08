//[MC] Creation date : 24/12/2012

var gaConnectorInfo;

(function () {
    "use strict";

    function ready(userInfo) {
     WinJS.UI.processAll().then(function (e) {
            
            if (!gaConnectorInfo) {
                gaConnectorInfo = new AddGaMenuHelper.gaConnectorInfo();
                RightMenu.addToObjectsToBeDeleted(gaConnectorInfo);
            }
            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].account, true);

            btn_rightMenu_back.onclick = _showPreviousPage;

            if (userInfo)
                _initGaConnectorInfo(userInfo);
            _bindDataAccount();
            CDHelper.showHideLoading(false);

        });
    }

    // Description: bind data in listview Account
    // Input: 
    // Output:
    function _bindDataAccount() {
        DataSourcesHelper.sortConnectors(gaConnectorInfo.accounts, DataSourcesHelper.SortMethod.Alphabetic);
        for (var count = 0; count < gaConnectorInfo.accounts.length; count++) {
            gaConnectorInfo.accounts[count].name = CDHelper.capitaliseOnlyFirstLetter(gaConnectorInfo.accounts[count].name);
        };
        WinJS.UI.setOptions(lv_googleAccount.winControl, {
            itemDataSource: new WinJS.Binding.List(gaConnectorInfo.accounts).dataSource,
            oniteminvoked: _lvGoogleAccountIteminvoked
        });
    }

    // Description: event click in list view account
    // Input:
    // Output:
    function _lvGoogleAccountIteminvoked(e) {
        gaConnectorInfo.selectedAccount = new jQuery.extend(true, {}, gaConnectorInfo.accounts[e.detail.itemIndex]);
        RightMenu.showRightMenu(Pages.addGaMenuWebProperties);
    }

    // Description: Succeed callback from Google Analytic broker
    // Input: User infos
    // Output:
    function _initGaConnectorInfo(userInfo) {
        gaConnectorInfo.connectorModelToSend.connector.credential_id = Credentials.getCredentialByIndex(ConnectorsTemplate.ConnectorType.GoogleAnalytics, userInfo.indexCredential).id;
        gaConnectorInfo.accessToken = Credentials.getCredentialByIndex(ConnectorsTemplate.ConnectorType.GoogleAnalytics, userInfo.indexCredential).access_token;
        gaConnectorInfo.connectorModelToSend.connector.public = false;
        gaConnectorInfo.accounts = userInfo.data.slice();
    }

    // Description: navigate to previous page
    // Input:
    // Output:
    function _showPreviousPage() {
        RightMenu.showRightMenu(Pages.credentialsMenu, ConnectorsTemplate.ConnectorType.GoogleAnalytics);
    }

    WinJS.UI.Pages.define(Pages.addGaMenuAccount, {
        ready: ready,
    });

})();
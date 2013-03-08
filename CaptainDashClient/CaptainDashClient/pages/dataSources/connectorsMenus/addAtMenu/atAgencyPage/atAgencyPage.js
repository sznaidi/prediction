//[MC] Creation date : 24/12/2012
var atConnectorInfo = new AtMenuHelper.atConnectorInfo();
(function () {
    "use strict";
    
    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            var credentials = Credentials.getCredentialByIndex(ConnectorsTemplate.ConnectorType.Atlas, elements.indexCredential);

            RightMenu.rightMenuLoading(true);
            AtlasApi.getAgencies(credentials.id, function (agencies) {
                RightMenu.rightMenuLoading(false);
                if (!agencies.d) {
                    lbl_atAccount_Token.innerText = MessagesHelper.AT_CREDENTIALS;
                } else {
                    RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].agency, true);
                    btn_rightMenu_back.onclick = _showPreviousPage;

                    atConnectorInfo.agencies = agencies.d;
                    _bindAtlasAgencyList();
                }
            }, function(error) {
                Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
                RightMenu.rightMenuLoading(false);
            });           
        });
    }

    function _bindAtlasAgencyList() {
        // capitalise first letter of agencies list
        for (var count = 0; count < atConnectorInfo.agencies.length; count++) {
            atConnectorInfo.agencies[count].name = CDHelper.capitaliseOnlyFirstLetter(atConnectorInfo.agencies[count].name);
        };
        WinJS.UI.setOptions(lv_agencies.winControl, {
            itemDataSource: new WinJS.Binding.List(atConnectorInfo.agencies).dataSource,
            oniteminvoked: _lvAgenciesIteminvoked
        });
    }

    // Description: navigate to previous page
    // Input:
    // Output:
    function _showPreviousPage() {
        RightMenu.showRightMenu(Pages.addAtMenuAccount, null);
    }

    // Description: list view agency click event
    // Input:
    // Output:
    function _lvAgenciesIteminvoked(e) {
        var selectedAgency = atConnectorInfo.agencies[e.detail.itemIndex];
        if (selectedAgency) 
           _getClientGuids(selectedAgency);
    }

    // Description: 
    // Input:
    // Output:
    function _getNbUsedClients() {
        var nbUsedClients = 0;
        for (var i = 0; i < atConnectorInfo.clients.length; i++) {
            if (DataSourcesHelper.isConnectorIdExist(ConnectorsTemplate.ConnectorType.Atlas, atConnectorInfo.clients[i].Id)) {
                atConnectorInfo.clients.splice(i, 1);
                nbUsedClients++;
            }
        }
        return nbUsedClients;
    }

    // Description: get list clients
    // Input:
    // Output:
    function _getClientGuids(selectedAgency) {
        var credentialId = selectedAgency.id;
        var agencyId = selectedAgency.Id;
        RightMenu.rightMenuLoading(true);
        AtlasApi.getClientGuids(credentialId, agencyId,
             function (clients) {
                 atConnectorInfo.clients = clients.d;

                 if (_getNbUsedClients()) {
                     divAddAtlasConnectorMenuText.innerText = MessagesHelper.ALL_CLIENT_GUID_EXIST;
                 }
                 else if (atConnectorInfo.clients.length == 0) {
                     divAddAtlasConnectorMenuText.innerText = MessagesHelper.NO_CLIENTS_GUID;
                 }
                 else {
                     var count = atConnectorInfo.clients.length;
                     if (count > 0) {
                         for (var i = 0; i < count; i++) {
                             atConnectorInfo.clients[i].radioId = "radio_" + atConnectorInfo.clients[i].Id;
                             atConnectorInfo.clients[i].radioBackgroundImg = AtMenuHelper.NOT_SELCTED_IMG;
                         }

                         atConnectorInfo.selectedClients = [];
                         RightMenu.showRightMenu(Pages.addAtMenuClient);
                     }
                 }

                 RightMenu.rightMenuLoading(false);
             },
             function (err) {
                 Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
                 RightMenu.rightMenuLoading(false);
             }
             );
    }
    WinJS.UI.Pages.define(Pages.addAtMenuAgency, {
        ready: ready,
    });

})();
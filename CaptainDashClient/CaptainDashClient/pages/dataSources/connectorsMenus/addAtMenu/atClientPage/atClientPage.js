//[MC] Creation date : 24/12/2012

(function () {
    "use strict";
 
    var _ITEM_HEIGHT = 70;
    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {

            btn_rightMenu_back.onclick = _showPreviousPage;

            btn_atClient_Next.onclick = _btnNextClick;

            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].client, true);

            _lvClients_Resize(atConnectorInfo.clients.length);
            _bindAtlasClientList();
           
        });
    }
    function _bindAtlasClientList() {
        // capitalise first letter of agencies list
        for (var count = 0; count < atConnectorInfo.clients.length; count++) {
            atConnectorInfo.clients[count].name = CDHelper.capitaliseOnlyFirstLetter(atConnectorInfo.clients[count].name);
        };
        WinJS.UI.setOptions(lvAtlasClients.winControl, {
            itemDataSource: new WinJS.Binding.List(atConnectorInfo.clients).dataSource,
            oniteminvoked: _lvAtlasClientsIteminvoked
        });
    }

    // Description:resizes the height of the listview
    // Input:listCredentialsLength = the new length of listview
    // Output:
    function _lvClients_Resize(listCredentialsLength) {
        if (lvAtlasClients && lvAtlasClients.style) {
            lvAtlasClients.style.height = (_ITEM_HEIGHT * listCredentialsLength) + "px";
        }
    }

    // Description: navigate to previous page
    // Input:
    // Output:
    function _showPreviousPage() {
        RightMenu.showRightMenu(Pages.addAtMenuAgency, null);
    }

    // Description: event click in list view client
    // Input:
    // Output:
    function _lvAtlasClientsIteminvoked(e) {
        var index = e.detail.itemIndex;
            e.detail.itemPromise.then(function (item) {
                _toogleSelectRadio(item.data, index);
            });
    }

    // Description: add or remove from list client selected
    // Input: currentSelectedClient:object, index:int
    // Output:
    function _toogleSelectRadio(currentSelectedClient, index) {
        var element = lvAtlasClients.winControl.elementFromIndex(index);
        if (!currentSelectedClient.isSelected) {
            currentSelectedClient.isSelected = true;
            currentSelectedClient.radioBackgroundImg = AtMenuHelper.SELCTED_IMG;
            element.querySelector('.radioItem').style.backgroundImage = AtMenuHelper.SELCTED_IMG;
            atConnectorInfo.selectedClients[currentSelectedClient.id] = currentSelectedClient;
        }
        else {
            currentSelectedClient.isSelected = false;
            currentSelectedClient.radioBackgroundImg = AtMenuHelper.NOT_SELCTED_IMG;
            element.querySelector('.radioItem').style.backgroundImage = AtMenuHelper.NOT_SELCTED_IMG;

            delete atConnectorInfo.selectedClients[currentSelectedClient.id];

        }
    }

    // Description: navigate to source name page
    // Input:
    // Output:
    function _btnNextClick() {
        WinJS.Resources.processAll();
        for (var el in atConnectorInfo.selectedClients) {
            // previous: Pages.addAtMenuClient
            RightMenu.showRightMenu(Pages.addSourceNameStep, { previous: Pages.addAtMenuClient, connectorType: ConnectorsTemplate.ConnectorType.Atlas });
            break;
        }
    }


    WinJS.UI.Pages.define(Pages.addAtMenuClient, {
        ready: ready,
    });

})();
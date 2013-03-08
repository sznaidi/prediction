/*-------------------------------
-- Author : [A.A]
-- Creation date : 05/02/2013
------------------------------*/

var graphInfo = new AddSerieHelper.graphInfo();

(function () {
    "use strict";

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {

            RightMenu.setHeader(DataExplorerHelper.DataExplorerMenusTitles.addSerie, DataExplorerHelper.DataExplorerMenusSubTitles[DataExplorerHelper.DataExplorerMenusTitles.addSerie].source, false);
            _bindDataTypeConnector();

        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _bindDataTypeConnector
    -- Description: Binding list connectors
    -- Params: None
    -- Return: None
    ------------------------------------------------------*/
    function _bindDataTypeConnector() {
        WinJS.UI.setOptions(lvTypeConnector.winControl, {
            itemDataSource: new WinJS.Binding.List(DataSourcesHelper.listConnectorsType).dataSource,
            oniteminvoked: _lvTypeConnectorItemInvoked
        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _lvTypeConnectorItemInvoked
    -- Description: click on list connectors
    -- Params: Evt click
    -- Return: No one
    ------------------------------------------------------*/
    function _lvTypeConnectorItemInvoked(e) {
        var typeConnector = DataSourcesHelper.listConnectorsType[e.detail.itemIndex].type;
        var listDoneConnectors = DataSourcesHelper.getDoneConnectors(typeConnector);

        if (listDoneConnectors.length > 0) {
            graphInfo.connectorType = typeConnector;
            RightMenu.showRightMenu(Pages.addSerieConnectorsStep, listDoneConnectors);
        }
        else
            Messages.showCancelMessage('Title', 'Message');
    }

    WinJS.UI.Pages.define(Pages.addSerieConnectorsTypeStep, {
        ready: ready,
    });

})();
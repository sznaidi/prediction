/*-------------------------------
-- Author : [A.A]
-- Creation date : 05/02/2013
------------------------------*/

(function () {
    "use strict";

    function ready() {
        WinJS.UI.processAll().then(function (e) {

            RightMenu.setHeader(DataExplorerHelper.DataExplorerMenusTitles.addSerie, DataExplorerHelper.DataExplorerMenusSubTitles[DataExplorerHelper.DataExplorerMenusTitles.addSerie].item, true);
            btn_rightMenu_back.onclick = _showPreviousPage;
            _bindDataMetrics(graphInfo.metrics);

        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _bindDataMetrics
    -- Description: Binding list metrics
    -- Params: No one
    -- Return: No one
    ------------------------------------------------------*/
    function _bindDataMetrics(metrics) {
        WinJS.UI.setOptions(lvMetrics.winControl, {
            itemDataSource: new WinJS.Binding.List(metrics).dataSource,
            oniteminvoked: _lvMetricsItemInvoked
        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _lvMetricsItemInvoked
    -- Description: click on list metrics
    -- Params: Evt click
    -- Return: No one
    ------------------------------------------------------*/
    function _lvMetricsItemInvoked(e) {
        var currentItem = e.detail;
        graphInfo.metric = currentItem.itemPromise._value.data.name;
        graphInfo.graphToSend.graph.measure = currentItem.itemPromise._value.data.id;
        RightMenu.showRightMenu(Pages.addSerieResumeStep, null);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showPreviousPage
    -- Description: navigate to connectors step
    -- Params: No one
    -- Return: No one
    ------------------------------------------------------*/
    function _showPreviousPage() {
        var listDoneConnectors = DataSourcesHelper.getDoneConnectors(graphInfo.connectorType);
        if (listDoneConnectors.length > 0)
            RightMenu.showRightMenu(Pages.addSerieConnectorsStep, listDoneConnectors);
    }

    WinJS.UI.Pages.define(Pages.addSerieMetricsStep, {
        ready: ready,
    });

})();
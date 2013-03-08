/*-------------------------------
-- Author : [A.A]
-- Creation date : 05/02/2013
------------------------------*/

(function () {
    "use strict";

    function ready(connectors) {
        WinJS.UI.processAll().then(function (e) {

            RightMenu.setHeader(DataExplorerHelper.DataExplorerMenusTitles.addSerie, DataExplorerHelper.DataExplorerMenusSubTitles[DataExplorerHelper.DataExplorerMenusTitles.addSerie].account, true);
            btn_rightMenu_back.onclick = _showPreviousPage;
            // sort connectors by alphabetic method
            DataSourcesHelper.sortConnectors(connectors, DataSourcesHelper.SortMethod.Alphabetic);
            _bindDataConnectors(connectors);
        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _bindDataConnectors
    -- Description: Binding list connectors
    -- Params: No one
    -- Return: No one
    ------------------------------------------------------*/
    function _bindDataConnectors(connectors) {
        for (var count = 0; count < connectors.length; count++) {
            connectors[count].title = CDHelper.capitaliseOnlyFirstLetter(connectors[count].title)
        }
        WinJS.UI.setOptions(lvConnectors.winControl, {
            itemDataSource: new WinJS.Binding.List(connectors).dataSource,
            oniteminvoked: _lvConnectorsItemInvoked
        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _lvConnectorsItemInvoked
    -- Description: click on list connectors
    -- Params: Evt click
    -- Return: No one
    ------------------------------------------------------*/
    function _lvConnectorsItemInvoked(e) {
        var currentItem = e.detail.itemPromise._value.data;
        graphInfo.graphToSend.graph.connector_id = currentItem.id;
        graphInfo.account = currentItem.title;
        graphInfo.fullConnectorType = currentItem.thrift_type;
        _getMetrics();
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _getMetrics
    -- Description: get list metrics of selected connector
    -- Params: connector type
    -- Return: No one
    ------------------------------------------------------*/
    function _getMetrics() {
        RightMenu.rightMenuLoading(true);
        CDHelper.getListMetrics(graphInfo.fullConnectorType, _getMetricsSucceed, _getMetricsfailed);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _getMetricsSucceed
    -- Description: Succeed callback get metrics
    -- Params: list metrics
    -- Return:
    -------------------------------------------------------*/
    function _getMetricsSucceed(filtredListMetrics) {
        RightMenu.rightMenuLoading(false);
        graphInfo.metrics = filtredListMetrics;
        RightMenu.showRightMenu(Pages.addSerieMetricsStep, null);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _getMetricsfailed
    -- Description: Failed callback get metrics
    -- Params: error
    -- Return:
    -------------------------------------------------------*/
    function _getMetricsfailed(error) {
        RightMenu.rightMenuLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showPreviousPage
    -- Description: navigate to connectors type page
    -- Params: No one
    -- Return: No one
    ------------------------------------------------------*/
    function _showPreviousPage() {
        RightMenu.showRightMenu(Pages.addSerieConnectorsTypeStep, null);
    }

    WinJS.UI.Pages.define(Pages.addSerieConnectorsStep, {
        ready: ready,
    });

})();
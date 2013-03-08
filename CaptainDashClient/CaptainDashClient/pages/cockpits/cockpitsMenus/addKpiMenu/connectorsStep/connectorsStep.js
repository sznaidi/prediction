/*-------------------------------
-- Author : [A.A]
-- Creation date : 28/01/2013
------------------------------*/

var currentKpi;
var listAllMetrics;
(function () {
    "use strict";

    function ready(connectors) {
        WinJS.UI.processAll().then(function (e) {

            RightMenu.setHeader(CockpitHelper.CockpitsMenusTitles.addTile, CockpitHelper.CockpitsMenusSubTitles[CockpitHelper.CockpitsMenusTitles.addTile].account, true);
            btn_rightMenu_back.onclick = _showPreviousPage;

            currentKpi = new AddKpiHelper.kpiInfo();
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
        };
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
        currentKpi.connectorType = currentItem.type;
        currentKpi.idDashboard = CockpitHelper.currentDashboard.id;
        currentKpi.connectorTitle = currentItem.title;
        currentKpi.connectorId = currentItem.id;
        currentKpi.fullConnectorType = currentItem.thrift_type;
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
        CDHelper.getListMetrics(currentKpi.fullConnectorType, _getMetricsSucceed, _getMetricsfailed);
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
        currentKpi.metrics = filtredListMetrics;
        RightMenu.showRightMenu(Pages.addKpiMetricsStep, null);
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
        //listAllMetrics = [];
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
        RightMenu.showRightMenu(Pages.connectorsTypeMenu, null);
    }

    WinJS.UI.Pages.define(Pages.connectorsStep, {
        ready: ready,
    });

})();
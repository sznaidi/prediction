/*-------------------------------
-- Author : [A.A]
-- Creation date : 28/01/2013
------------------------------*/

(function () {
    "use strict";

    function ready() {
        WinJS.UI.processAll().then(function (e) {
            RightMenu.setHeader(CockpitHelper.CockpitsMenusTitles.addTile, CockpitHelper.CockpitsMenusSubTitles[CockpitHelper.CockpitsMenusTitles.addTile].item, true);
            btn_rightMenu_back.onclick = _showPreviousPage;
            _bindDataMetrics(currentKpi.metrics);

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
        var mesure = (currentKpi.measure) ? currentKpi.measure.toLowerCase() : '';
        currentKpi.measure = currentItem.itemPromise._value.data.name;
        currentKpi.kpi.tile.measure = currentItem.itemPromise._value.data.id;
        currentKpi.idDashboard = CockpitHelper.currentDashboard.id;
        currentKpi.title = currentKpi.connectorTitle + " " + mesure;
        currentKpi.group = '';
        RightMenu.showRightMenu(Pages.addKpiResumeStep, null);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showPreviousPage
    -- Description: navigate to connectors step
    -- Params: No one
    -- Return: No one
    ------------------------------------------------------*/
    function _showPreviousPage() {
        var listDoneConnectors = DataSourcesHelper.getDoneConnectors(currentKpi.connectorType);
        if (listDoneConnectors.length > 0)
            RightMenu.showRightMenu(Pages.connectorsStep, listDoneConnectors);
    }

    WinJS.UI.Pages.define(Pages.addKpiMetricsStep, {
        ready: ready,
    });

})();
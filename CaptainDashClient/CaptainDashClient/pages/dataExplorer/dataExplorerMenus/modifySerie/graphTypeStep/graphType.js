/*-------------------------------
-- Author : [A.A]
-- Creation date : 14/02/2013
------------------------------*/

(function () {
    "use strict";

    var currentGraph;

    function ready(graph) {
        WinJS.UI.processAll().then(function (e) {

            RightMenu.setHeader(DataExplorerHelper.DataExplorerMenusTitles.modifySerie, DataExplorerHelper.DataExplorerMenusSubTitles[DataExplorerHelper.DataExplorerMenusTitles.modifySerie].visualization, true);
            btn_rightMenu_back.onclick = _showPreviousPage;

            currentGraph = graph;

            _bindListChartType();

        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _bindListChartType
    -- Description: bind list chart type
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _bindListChartType() {
        WinJS.UI.setOptions(lvChartType.winControl, {
            itemDataSource: new WinJS.Binding.List(ChartHelper.ListChartTypeVertical).dataSource,
            oniteminvoked: _lvChartTypeItemInvoked
        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _lvChartTypeItemInvoked
    -- Description: click on list chart type
    -- Params: Evt click
    -- Return:
    ------------------------------------------------------*/
    function _lvChartTypeItemInvoked(e) {
        currentGraph.type = e.detail.itemPromise._value.data.type;
        RightMenu.showRightMenu(Pages.modifySerieResumeStep, currentGraph);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showPreviousPage
    -- Description: navigate to connectors step
    -- Params: No one
    -- Return: No one
    ------------------------------------------------------*/
    function _showPreviousPage() {
        RightMenu.showRightMenu(Pages.modifySerieResumeStep, currentGraph);
    }

    WinJS.UI.Pages.define(Pages.modifySerieGraphTypeStep, {
        ready: ready,
    });

})();
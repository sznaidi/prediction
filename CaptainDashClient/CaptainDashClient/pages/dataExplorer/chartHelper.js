/* ---------------------------------
-- Author : [A.A]
-- Creation date : 05/02/2013
---------------------------------*/

(function () {
    "use strict";

    var lbl_varticalBar = WinJS.Resources.getString("ChartHelper_lbl_varticalBar").value;
    var lbl_Line = WinJS.Resources.getString("ChartHelper_lbl_Line").value;
    var lbl_scatterPlot = WinJS.Resources.getString("ChartHelper_lbl_scatterPlot").value;

    var _ChartType = {
        Bar: 'Bar',
        Line: 'Line',
        Dot: 'Scatter',
        Arealine: 'Arealine'
    };

    var _ChartTypeLabel = {
        'Bar': lbl_varticalBar,
        'Line': lbl_Line,
        'Dot': lbl_scatterPlot
    };

    var _SerieStatus = {
        sleep: 1,
        wakeUp: 0
    };

    var _ChartMode = {
        Normal: 'normal',
        Stacked: 'stacked'
    }

    var _ChartTypeImg = {
        Bar: "/pages/dataExplorer/dataExplorerMenus/images/bars.png",
        Line: "/pages/dataExplorer/dataExplorerMenus/images/lines.png",
        Dot: "/pages/dataExplorer/dataExplorerMenus/images/dots.png"
    };

    var _listChartTypeVertical = [
        { type: _ChartType.Bar, label: _ChartTypeLabel.Bar, image: _ChartTypeImg.Bar },
        { type: _ChartType.Line, label: _ChartTypeLabel.Line, image: _ChartTypeImg.Line },
        { type: _ChartType.Dot, label: _ChartTypeLabel.Dot, image: _ChartTypeImg.Dot },
    ];


    WinJS.Namespace.define("ChartHelper", {
        ChartType: { get: function () { return _ChartType; } },
        SerieStatus: { get: function () { return _SerieStatus; } },
        ChartMode: { get: function () { return _ChartMode; } },
        ListChartTypeVertical: { get: function () { return _listChartTypeVertical; } },
        COLOR_SELCTED_SERIE: '#E3DFCB',
    
    });

})();

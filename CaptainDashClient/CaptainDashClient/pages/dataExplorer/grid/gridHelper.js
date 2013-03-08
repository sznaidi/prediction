(function () {
    "use strict";

    var objDataGrid;
    var _activeColor;
    var enumColorRow = { firstColor: '#f1eedc', secondColor: '#faf8ea' };
    var msGridVariableColumns;
    var _gridWidth;
    var _DATE_COLUMN_WIDTH_PX = "140px";
    var _DATE_COLUMN_WIDTH = 140;
    var _SCROLL_WIDTH = 20;
    var _NB_PIXEL_PER_CARACTER = 20;
    var _NB_PIXEL_ONE_CARACTER = 30;
    var _LBL_DATE_HEADER_GRID = WinJS.Resources.getString("GridHelper_date").value;

    WinJS.Namespace.define("GridHelper", {
        gridWidth: { get: function () { return _gridWidth; }, set: function (val) { _gridWidth = val; } },
        objDataGrid: { get: function () { return objDataGrid; }, set: function (val) { objDataGrid = val; } },
        enumColorRow: { get: function () { return enumColorRow; } },
        activeColor: { get: function () { return _activeColor; }, set: function (val) { _activeColor = val; } },
        msGridVariableColumns : { get: function () { return msGridVariableColumns; }, set: function (val) { msGridVariableColumns = val; } },
        DATE_COLUMN_WIDTH_Px: { get: function () { return _DATE_COLUMN_WIDTH_PX; } },
        DATE_COLUMN_WIDTH: { get: function () { return _DATE_COLUMN_WIDTH; } },
        SCROLL_WIDTH: { get: function () { return _SCROLL_WIDTH; } },
        NB_PIXEL_PER_CARACTER: { get: function () { return _NB_PIXEL_PER_CARACTER; } },
        NB_PIXEL_ONE_CARACTER: { get: function () { return _NB_PIXEL_ONE_CARACTER; } },
        LBL_DATE_HEADER_GRID: { get: function () { return _LBL_DATE_HEADER_GRID; } },
    });
})();
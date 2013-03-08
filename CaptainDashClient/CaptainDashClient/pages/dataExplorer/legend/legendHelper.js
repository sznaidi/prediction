/*-------------------------------
-- Author : [M.C]
-- Creation date : 12/02/2013
------------------------------*/
(function () {
    var main = WinJS.Resources.getString("LegendHelper_main").value;
    var secondary = WinJS.Resources.getString("LegendHelper_secondary").value;
    var _enumYaxis = { 'Main': main, 'Secondary': secondary };

    WinJS.Namespace.define("LegendHelper", {
        enumYaxis: { get: function () { return _enumYaxis; } },
    });

})();
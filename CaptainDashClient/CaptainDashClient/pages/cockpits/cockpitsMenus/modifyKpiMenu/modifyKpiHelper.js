(function () {

    var _currentTile;

    WinJS.Namespace.define("ModifyKpiHelper", {
        currentTile: { get: function () { return _currentTile; }, set: function (value) { _currentTile = value; } }
    }); 

})();
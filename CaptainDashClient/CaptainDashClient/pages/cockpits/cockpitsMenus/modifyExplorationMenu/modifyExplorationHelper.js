(function () {

    var _currentTile;

    WinJS.Namespace.define("ModifyExplorationHelper", {
        currentTile: { get: function () { return _currentTile; }, set: function (value) { _currentTile = value; } },
        _pathImgBtnAddWidgetMenu: "url(/pages/cockpits/images/addModifyTile/btn+widgetMenu.png)",
        _pathImgBtnRemoveWidgetMenu: "url(/pages/cockpits/images/addModifyTile/btn-widgetMenu.png)",
        _pathImgItemSeparator: "url(/pages/cockpits/images/addModifyTile/itemSeparator.png)",
        _pathImgItemSeparatorVertical: "url(/pages/cockpits/images/addModifyTile/itemSeparatorVertical.png)",
        _pathImageItemBtnAddWidgetMenu: "url(\"/pages/cockpits/images/addModifyTile/btn+widgetMenu.png\")",
        _pathImageItemRemoveWidgetMenu: "url(\"/pages/cockpits/images/addModifyTile/btn-widgetMenu.png\")",

        _pathImgNone: "url()",
        _colorOrange: "rgb(236, 113, 90)",
        _colorPurple: "rgb(75, 61, 93)",
        _colorPurpleLight: "#403351",
    });

})();
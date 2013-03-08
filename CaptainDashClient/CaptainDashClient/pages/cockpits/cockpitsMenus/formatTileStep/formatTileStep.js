/* -------------------------------
-- Author : [M.C]
-- Creation date : 30/01/2013
-------------------------------*/

(function () {
    "use strict";

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            
            RightMenu.setHeader(CockpitHelper.CockpitsMenusTitles.addTile, CockpitHelper.CockpitsMenusSubTitles[CockpitHelper.CockpitsMenusTitles.addTile].formatTile, false);
            _bindingLvFormatTiles();
        });
    } 


    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _bindingLvFormatTiles
    -- Description: binding formatTile listView
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _bindingLvFormatTiles() {
        WinJS.UI.setOptions(lv_FormatTiles.winControl, {
            itemDataSource: CockpitHelper.formatTiles.dataSource,
            oniteminvoked: _lv_FormatTiles_itemInvoked,
        });
    }


    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _lv_FormatTiles_itemInvoked
    -- Description: click event
    -- Params:event
    -- Return:
    -------------------------------------------------------*/
    function _lv_FormatTiles_itemInvoked(e) {
        var item = lv_FormatTiles.winControl.itemDataSource.itemFromIndex(e.detail.itemIndex)._value.data
        RightMenu.showRightMenu(Pages.typeTileStep, { "typeTiles": CockpitHelper.typeTiles[item.key] });
    }

    WinJS.UI.Pages.define(Pages.formatTileStep, {
        ready: ready,
    });

})();
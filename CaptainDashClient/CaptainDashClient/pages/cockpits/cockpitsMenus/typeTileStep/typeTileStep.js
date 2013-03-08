
/* -------------------------------
-- Author : [M.C]
-- Creation date : 30/01/2013
-------------------------------*/
(function () {
    "use strict";
    var cuurentListTypeTiles;
    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            
            RightMenu.setHeader(CockpitHelper.CockpitsMenusTitles.addTile, CockpitHelper.CockpitsMenusSubTitles[CockpitHelper.CockpitsMenusTitles.addTile].typeTile, true);
            if (elements && elements.typeTiles)
                cuurentListTypeTiles = elements.typeTiles;
            _bindingLvTypeTiles();
            btn_rightMenu_back.onclick = _showFormatTileStep;
        });
    } 


    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _bindingLvTypeTiles
    -- Description: binding typeTile listView
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _bindingLvTypeTiles() {
        var typeTileBinding = new WinJS.Binding.List(cuurentListTypeTiles);
        WinJS.UI.setOptions(lv_TypeTiles.winControl, {
            itemDataSource: typeTileBinding.dataSource,
            oniteminvoked: _lv_typeTiles_itemInvoked,
        });
    }


    /* ------------------------------------------------------
     -- Author: [M.C]
     -- Name: _lv_typeTiles_itemInvoked
     -- Description: click event
     -- Params:event
     -- Return:
     -------------------------------------------------------*/
    function _lv_typeTiles_itemInvoked(e) {
        RightMenu.showRightMenu(Pages.connectorsTypeMenu, null);
    }


    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _showFormatTileStep
    -- Description: back bouton click
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showFormatTileStep() {
        RightMenu.showRightMenu(Pages.formatTileStep, null);
    }

    WinJS.UI.Pages.define(Pages.typeTileStep, {
        ready: ready,
    });

})();
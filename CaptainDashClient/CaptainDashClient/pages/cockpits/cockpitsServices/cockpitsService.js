/*-------------------------------
-- Author : [M.C]
-- Creation date : 28/01/2013
------------------------------*/

(function () {
    "use strict";

    var _COCKPITS_BASE_URL_SERVICES = CdServicesHelper.baseUrlServices + CdServicesHelper.cockpitsUrl;

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: addTile
    -- Description: Saves a tile object to db
    -- Params: tileToSend = the tile object to save, succeed = success calback, failed = fail callback
    -- Return: The new tile
    -------------------------------------------------------*/
    function addTile(tileToSend, succeed, failed) {
        var params = JSON.stringify(tileToSend);
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Post, _COCKPITS_BASE_URL_SERVICES, params, CdServicesHelper.headers, _succeed, failed);
        request.launchService();
        function _succeed(tile) {
            succeed(JSON.parse(tile.responseText).tile);
        }
    }
    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: removeTiles
    -- Description: 
    --      removes tile with given id from db
    -- Params: tileId = tile id to delete, succeed = success calback, failed = fail callback
    -- Return: removed tile
    -------------------------------------------------------*/
    function removeTiles(tileId, succeed, failed) {
        var urlTileToRemove = _COCKPITS_BASE_URL_SERVICES + "/" + tileId;
        var params = null;
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Delete, urlTileToRemove, params, CdServicesHelper.headers, succeed, failed);
        request.launchService();
    }
   
    /*  ------------------------------------------------------
  -- Author: [M.C]
  -- Name: updateTile
  -- Description: update a tile object in db
  -- Params: tileToSend = the tile object to update, succeed = success calback, failed = fail callback
  -- Return: The updated tile
  -------------------------------------------------------*/
    function updateTile(tileToSend, succeed, failed) {
        var url = _COCKPITS_BASE_URL_SERVICES + "/" + tileToSend.tile.id;
        var params = JSON.stringify(tileToSend);
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Put, url, params, CdServicesHelper.headers, succeed, failed);
        request.launchService();
    }

    function getDynamicTileKpi(succeed, failed) {
        var url = _COCKPITS_BASE_URL_SERVICES + CdServicesHelper.dynamicTileUrl;
    
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Get, url, null, CdServicesHelper.headers, function (result) {
            succeed(JSON.parse(result.response).tiles);
        },
            failed);
        request.launchService();
    }
   
    WinJS.Namespace.define("CockpitsServices", {
        addTile: addTile,
        updateTile: updateTile,
        removeTiles: removeTiles,
        getDynamicTileKpi: getDynamicTileKpi,
    });
})();

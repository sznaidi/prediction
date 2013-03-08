/*-------------------------------
-- Author : [A.A]
-- Creation date : 21/01/2013
------------------------------*/

(function () {
    "use strict";

    var _DATAEXPLORER_BASE_URL_SERVICES = CdServicesHelper.baseUrlServices + CdServicesHelper.explorationsUrl;
    var _DATAEXPLORER_PIN_EXPLORATION_URL_SERVICES = CdServicesHelper.baseUrlServices + CdServicesHelper.explorationPinnedUrl;

    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: getSerieData
    -- Description: Get data for given exploration
    -- Params: succeed = success calback, failed = fail callback
    -- Return: data
    -------------------------------------------------------*/
    function getSerieData(explorationToSend, succeed, failed) {
        var params = "?"
        params += "graph[measure]=" + explorationToSend.graph.measure;
        params += "&graph[connector_id]=" + explorationToSend.graph.connector_id;
        params += "&graph[frequency]=" + explorationToSend.graph.frequency;
        //params += "&graph[dimensions]=" + explorationToSend.graph.dimensions;

        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Get, _DATAEXPLORER_BASE_URL_SERVICES + params, null, CdServicesHelper.headers,
            function (result) {
                succeed(JSON.parse(result.response));
            },
            function (error) {
                failed(error);
            });
        request.launchService();
    }

    function pinExploration(explorationProperties, succeed, failed) {
        var params = JSON.stringify(explorationProperties);       
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Post, _DATAEXPLORER_PIN_EXPLORATION_URL_SERVICES, params, CdServicesHelper.headers, succeed, failed);
        request.launchService();
    }

    WinJS.Namespace.define("DataExplorerServices", {
        getSerieData: getSerieData,
        pinExploration: pinExploration
    });
})();

// [HK] Creation date: 17/12/2012

(function () {
    "use strict";

    var _CONNECTORS_BASE_URL_SERVICES = CdServicesHelper.baseUrlServices + CdServicesHelper.connectorsUrl;

    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: getAllConnectors
    -- Description: 
    --   Get all connector for the current logged user
    -- Params: user= the logged user, succeed = success calback, failed = fail callback
    -- Return: list of connectors
    -------------------------------------------------------*/
    function getAllConnectors(typeConnector, succeed, failed) {
        var params = JSON.stringify({ "type": typeConnector });
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Get, _CONNECTORS_BASE_URL_SERVICES, params, CdServicesHelper.headers, function (result) {
            var listConnectors = JSON.parse(result.response);
            succeed(listConnectors.connectors);
        },
            failed);
        request.launchService();
    }

    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: addConnector
    -- Description: 
    --   saves a connector object to db
    -- Params: connector = the connector object to save, succeed = success calback, failed = fail callback
    -- Return: list of connectors
    -------------------------------------------------------*/
    function addConnector(connectorToSend, succeed, failed) {
        ///connector.dashboard_id = "50dc22648a8e497891000001"; TODO
        var params = JSON.stringify(connectorToSend);
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Post, _CONNECTORS_BASE_URL_SERVICES, params, CdServicesHelper.headers, _succeed, failed);
        request.launchService();
        function _succeed(connector)
        {
            succeed(JSON.parse(connector.responseText).connector);
        }
    }

    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: removeConnector
    -- Description: 
    --   removes connector with given id from db
    -- Params: connector = connector id to delete, succeed = success calback, failed = fail callback
    -- Return: list of connectors
    -------------------------------------------------------*/
    function removeConnector(connectorId, succeed, failed) {
        var urlConnectorToRemove = _CONNECTORS_BASE_URL_SERVICES + "/" + connectorId;
        var params = null;
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Delete, urlConnectorToRemove, params, CdServicesHelper.headers, succeed, failed);
        request.launchService();
    }
    
    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: getMetrics
    -- Description: 
    --   get metrics of the given connector id
    -- Params: 
            succeed = success calback, 
            failed = fail callback
    -- Return: list of connectors filtred by type and status
    -------------------------------------------------------*/
    function getMetrics(succeed, failed) {
        var urlConnectorMetrics = _CONNECTORS_BASE_URL_SERVICES + CdServicesHelper.metricsUrl;
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Get, urlConnectorMetrics, null, CdServicesHelper.headers, _succeed, failed);
        request.launchService();
        function _succeed(metrics) {
            succeed(JSON.parse(metrics.responseText));
        }
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: getDimensions
    -- Description:get dimensions of the given connector id
    -- Params: connectorId = the id of connector to get its metrics,succeed = success calback, failed = fail callback
    -- Return: list of dimensions
    -------------------------------------------------------*/
    function getDimensions(connectorId, succeed, failed) {
        var urlConnectorDimensions = _CONNECTORS_BASE_URL_SERVICES + "/" + connectorId + CdServicesHelper.describeUrl;
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Get, urlConnectorDimensions, null, CdServicesHelper.headers, _succeed, failed);
        request.launchService();
        function _succeed(dimensions) {
            succeed(JSON.parse(dimensions.responseText).dimensions);
        }
    }

    WinJS.Namespace.define("ConnectorsServices", {
        getAllConnectors: getAllConnectors,
        addConnector: addConnector,
        removeConnector: removeConnector,
        getMetrics: getMetrics,
        getDimensions: getDimensions
    });
})();

/* -------------------------------
-- Author : [A.A]
-- Creation date : 06/02/2013
-------------------------------*/

(function () {

    var graphInfo = function () {
        this.graphToSend = new GraphTemplate.GraphModelToSend();
        this.connectorType = '';
        this.account = '';
        this.metrics = [];
        this.metric = '';
        this.type = '';
        this.yAxis = false;
        this.fullConnectorType = '';
    };

    WinJS.Namespace.define("AddSerieHelper", {
        graphInfo: graphInfo,
    });

})();
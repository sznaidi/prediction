/* -------------------------------
-- Author : [A.A]
-- Creation date : 28/01/2013
-------------------------------*/

(function () {

    var tile = function () {
        this.group_id = '';//string
        this.name = '';//string
        this.x = 0;//0.1.2
        this.y = 0;//0.3.7
        this.w = 1;//1.2.3
        this.h = 1;//1.2.3
        this.frequency = 3;//1 => YEARLY . 2 => MONTHLY . 3 => DAILY
        this.measure = 3;//metric
        //this.dimensions = '';
        this.connector_id = '';
        this.on_desktop = false;
    };

    var kpiToSend = function () {
        this.type = 'numeric';
        this.tile = new tile();
    };

    var kpiInfo = function () {
        this.kpi = new kpiToSend();
        this.connectorType = '';
        this.metrics = [];
        this.idDashboard;
        this.group;
        this.connectorTitle;
        this.connectorId;
        this.compareTo = -1;
        this.calculation = 1;
        this.dimensions = '';
        this.frequency = 3;
        this.measure = '';
        this.title = '';
        this.fullConnectorType = '';
    };

    WinJS.Namespace.define("AddKpiHelper", {
        kpiInfo: kpiInfo,
    });

})();

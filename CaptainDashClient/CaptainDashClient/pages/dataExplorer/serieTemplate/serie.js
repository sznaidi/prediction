/* ---------------------------------
-- Author : [A.A]
-- Creation date : 05/02/2013
---------------------------------*/

(function () {
    
    var graph = function () {
        this.measure = '';
        this.connector_id = '';
        this.frequency = '';
        this.dimensions = [];
    }
    //Graph object to send
    var GraphModelToSend = function () {
        this.graph = new graph();
    };

    //Super Class
    var Graph = WinJS.Class.define(

        // The constructor function.
        function (type, connectorId, measure, yAxis, title, source, account, measureCode, date) {
            this.type = type;//chart type
            this.connector_id = connectorId;//connector id
            this.measureLabel = measure;//metric label
            this.measure = measureCode;//metric code
            this.yAxis = yAxis;//true if 2nd axe; false if not
            this.title = title;
            this.source = source;
            this.account = account;
            this.date = date;
        },

        // The set of instance members.
        {
            id: '',
            type: ChartHelper.ChartType.Bar,
            connector_id: '',
            measureLabel:'',
            measure: '',
            color: '',
            yAxis: false,
            status: ChartHelper.SerieStatus.wakeUp,
            dimensions: [],
            data: [],
            date: [],
            setYAxis: function (yAxis) {
                this.yAxis = yAxis;
            },

            setStatus: function (status) {
                this.status = status;
            },

            setDates: function (dates) {
                this.dates = dates;
            },

            setData: function (data) {
                this.data = data;
            },

            setDate: function (date) {
                this.date = date;
            },

            setColor: function (color) {
                this.color = color;
            },

            setFilters: function (dimensions) {
                this.dimensions = dimensions;
            },

            setId: function (metric) {
                var filter = "";
                if (this.dimensions.length) {
                    for (var index = 0; index < this.dimensions.length; index++) {
                        filter += this.dimensions[index][0] + "_" + this.dimensions[index][1] + "_";
                    }
                }
                this.id = this.connector_id + "_" + metric + "_" + filter;
            },

            getSerieId: function (connectorId, metric, filters) {
                var filter = "";
                if (filters.length) {
                    for (var index = 0; index < filters.length; index++) {
                        filter += filters[index][0] + "_" + filters[index][1] + "_";
                    }
                }
                return connectorId + "_" + metric + "_" + filter;
            }

        },

        // The set of static members.
        {}
    );

    WinJS.Namespace.define("GraphTemplate",
    {
        Graph: Graph,
        GraphModelToSend: GraphModelToSend,
    });
})();
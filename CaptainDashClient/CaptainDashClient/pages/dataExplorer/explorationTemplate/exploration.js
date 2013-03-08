/* ---------------------------------
-- Author : [A.A]
-- Creation date : 05/02/2013
---------------------------------*/

(function () {

    //Super Class
    var Exploration = WinJS.Class.define(
        // The constructor function.
        function (name) {
            this.name = name;
            this.graphs_attributes = [];
        },

        // The set of instance members.
        {
            id:'',//from service
            name: '',
            frequency: CDHelper.AggregationType.Daily,
            //interval: 5,
            end_date: CDHelper.getYesterdayDate(),
            start_date: CDHelper.getDefaultStartDateFromFrequency(CDHelper.getYesterdayDate(), CDHelper.AggregationType.Daily),
            graphs_attributes: [],
            mode: ChartHelper.ChartMode.Normal,
            timestamps: [],

            getName : function()
            {
                return this.name;
            },

            setName: function (name) {
                this.name = name;
            },

            setMode: function (mode) {
                this.mode = mode;
            },

            setGraphs: function (graphs) {
                this.graphs_attributes = graphs;
            },

            getGraphs: function () {
                return this.graphs_attributes;
            },

            setId:function(idExploration)
            {
                this.id=idExploration;
            },

            addGraph: function (graph) {
                this.graphs_attributes.push(graph);
            },

            deleteAllGraphs: function () {
                this.graphs_attributes = [];
            },

            deleteGraph: function (idGraph) {
                for (count = 0; count < this.graphs_attributes.length; count++) {
                    if (this.graphs_attributes[count].id == idGraph)
                        this.graphs_attributes.splice(count, 1);
                }
            },

            setStartDate: function (date) {
                this.start_date = date;
            },

            getStartDate: function () {
                return this.start_date.getTime();
            },

            setEndDate: function (date) {
                this.end_date = date;
            },

            getEndDate: function () {
                return this.end_date.getTime();
            },

            setFrequency: function (frequency) {
                this.frequency = frequency;
            },

            getFrequency: function () {
                return this.frequency;
            },

            setTimeStamps: function (startDate, endDate) {

                this.resetTimeStamps();
                var interval;

                switch (parseInt(this.getFrequency())) {

                    case CDHelper.AggregationType.Daily: {

                        if (startDate & endDate)
                            interval = CDHelper.getDaysInterval(endDate, startDate);
                        else
                            interval = CDHelper.DAYLY_INTERVAL;

                        for (var count = 0; count < interval; count++) {
                            var date;
                            if (startDate & endDate)
                                date = new Date(endDate);
                            else
                                date = new Date();

                            date = new Date((date.getUTCMonth() + 1) + "/" + date.getUTCDate() + "/" + date.getUTCFullYear());
                            this.timestamps.push(date.getTime(date.setUTCDate(date.getUTCDate() - count)));

                            if (count == 0)
                                this.setEndDate(date);

                            if (count == interval - 1) {
                                var dateStart = new Date(date.setUTCDate(date.getUTCDate()));
                                this.setStartDate(dateStart);
                            }
                        }
                        this.timestamps.reverse();
                        break;
                    }

                    case CDHelper.AggregationType.Monthly: {

                        if (startDate & endDate)
                            interval = CDHelper.getMonthsInterval(endDate, startDate) + 1;
                        else
                            interval = CDHelper.MONTHLY_INTERVAL;

                        for (var count = 0; count < interval; count++) {
                            var date;
                            if (startDate & endDate)
                                date = new Date(endDate);
                            else
                                date = new Date();

                            date = new Date((date.getUTCMonth() + 1) + "/" + date.getUTCDate() + "/" + date.getUTCFullYear());
                            this.timestamps.push(date.getTime(date.setUTCMonth(date.getUTCMonth() - count)));

                            if (count == 0)
                                this.setEndDate(date);

                            if (count == interval - 1) {
                                var dateStart = new Date(date.setUTCMonth(date.getUTCMonth()));
                                this.setStartDate(dateStart);
                            }
                        }
                        this.timestamps.reverse();
                        break;
                    }

                    case CDHelper.AggregationType.Yearly: {

                        if (startDate & endDate)
                            interval = (endDate.getUTCFullYear() - startDate.getUTCFullYear()) + 1;
                        else
                            interval = CDHelper.YEARLY_INTERVAL;

                        for (var count = 0; count < interval; count++) {
                            var date;
                            if (startDate & endDate)
                                date = new Date(endDate);
                            else
                                date = new Date();

                            date = new Date((date.getUTCMonth() + 1) + "/" + date.getUTCDate() + "/" + date.getUTCFullYear());
                            this.timestamps.push(date.getTime(date.setUTCFullYear(date.getUTCFullYear() - count)));

                            if (count == 0) 
                                this.setEndDate(date);

                            if (count == interval - 1) {
                                var dateStart = new Date(date.setUTCFullYear(date.getUTCFullYear()));
                                this.setStartDate(dateStart);
                            }
                        }
                        this.timestamps.reverse();
                        break;
                    }
                }
            },

            getTimeStamps: function () {
                return this.timestamps;
            },

            resetTimeStamps: function () {
                this.timestamps = [];
            },

            getGraphsAttributes: function (){
                return this.graphs_attributes;
            },

            getGraphFromId: function (idGraph) {
                for (var count = 0; count < this.graphs_attributes.length; count++) {
                    if (idGraph == this.graphs_attributes[count].id)
                        return this.graphs_attributes[count];
                }
                return false;
            },

            isExistGraph: function (idGraph) {
                for (count = 0; count < this.graphs_attributes.length; count++) {
                    if (this.graphs_attributes[count].id == idGraph)
                        return true;
                }
                return false;
            },

            canMakeYAxis: function () {
                var nbrGraphInMainAxis = 0;
                for (count = 0; count < this.graphs_attributes.length; count++) {
                    if (this.graphs_attributes[count].yAxis == false)
                    {
                        nbrGraphInMainAxis++;
                        if (nbrGraphInMainAxis == 2)
                            return true;
                    }
                }
                return false;
            }
        },

        // The set of static members.
        {}
    );

    WinJS.Namespace.define("ExplorationTemplate",
    {
        Exploration: Exploration
    });
})();
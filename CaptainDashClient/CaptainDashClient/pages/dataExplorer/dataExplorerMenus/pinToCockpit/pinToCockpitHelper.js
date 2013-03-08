/* -------------------------------
-- Author : [S.H]
-- Creation date : 13/02/2013
-------------------------------*/

(function () {

    var ExplorationToPin = function (selectedGroup) {
        this.group_id = selectedGroup;
        this.exploration = new _formatExploration();
    };


    var _formatExploration = function () {
        this.name = DataExplorerController.exploration.getName();
        this.frequency = DataExplorerController.exploration.getFrequency();
        this.interval = CDHelper.getIntervalFromFrequency(this.frequency);
        this.graphs_attributes = _formatGraphAttributes();
            ////_formatGraphAttributes(DataExplorerController.exploration.graphs_attributes);
    };

    function _formatGraphAttributes() {
        var series = DataExplorerController.exploration.getGraphs();
        var allGraphsAttributes = [];
        var graphsAttributes;
        for (var i = 0; i < series.length; i++) {
            graphsAttributes = new graphsAttributesToSend(series[i]);
            //graph.setId();
            allGraphsAttributes.push(graphsAttributes);

        }
        return allGraphsAttributes;
    }

    var graphsAttributesToSend = function (serie) {
        this.connector_id = serie.connector_id;
        //this.frequency = DataExplorerController.exploration.getFrequency();
        this.measure = serie.measure;
        this.type = serie.type;
        this.color = serie.color;
        this.dimensions = serie.dimensions;
        this.name = serie.title;
    };



    WinJS.Namespace.define("PinToCockpitHelper", {
        ExplorationToPin: ExplorationToPin,
    });

})();
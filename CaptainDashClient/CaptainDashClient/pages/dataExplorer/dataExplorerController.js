/*-------------------------------
-- Author : [S.H]
-- Creation date : 06/02/2013
------------------------------*/
(function () {
    "use strict";
    var exploration;

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: isEmptyExploration
    -- Description: ckeck if exploration is empty or no
    -- Params: no one
    -- Return: true if is empty else return false
    -------------------------------------------------------*/
    function isEmptyExploration() {
        if (exploration)
            return false;
        else
            return true;
    }

    /*------------------------------------------------------
-- Author: [M.C]
-- Name: reverseExplorationMode
-- Description: reverse the current exploartion mode
-- Params:cdd3 object
-- Return: return new mode
-------------------------------------------------------*/
    function reverseExplorationMode(viewObject, containerId) {
        exploration.mode = D3jsAccess.reverseExplorationMode(viewObject, containerId);
        D3jsAccess.displayExploration(viewObject, containerId, exploration);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: createNewExploration
    -- Description: creation new exploration
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function createNewExploration() {
        exploration = new ExplorationTemplate.Exploration(DataExplorerHelper.NEW_EXPLORATION);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: deleteExploration
    -- Description: delete exploration
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function deleteExploration() {
        DataExplorerController.exploration.deleteAllGraphs();
        DataExplorerController.exploration = null;
        predictInt = 15;
        canPredict = false;//time range
    }

    /* ------------------------------------------------------
 -- Author: [M.C]
 -- Name: deleteSerie
 -- Description: delete serie and update liste legend
 -- Params: idSerie
 -- Return: no one
 -------------------------------------------------------*/
    function deleteSerie(idSerie) {
        var nbreSeriesInFirstAxe = 0;

        D3jsAccess.deleteSerie(idSerie, DataExplorer.viewObjectExplorer);
        for (var count = 0; count < exploration.graphs_attributes.length; count++) {
            if (exploration.graphs_attributes[count].id == idSerie)
                exploration.graphs_attributes.splice(count, 1);
           else if (!exploration.graphs_attributes[count].yAxis)
                nbreSeriesInFirstAxe++;
        }
        if (exploration.graphs_attributes.length) {
            if (!nbreSeriesInFirstAxe) {
                for (var count = 0; count < exploration.graphs_attributes.length; count++) {
                    exploration.graphs_attributes[count].yAxis = false;
                }
            }
            DataExplorer.updateGraphsView();
        }
        else 
            exploration = null;

    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: sleepSerie
-- Description: hide /show serie and update liste legend
-- Params: idSerie
-- Return: no one
-------------------------------------------------------*/
    function sleepSerie(idSerie) {
        var nbreSleepedSeries = 0;
        var nbreSleepedSeriesInFirstAxe = 0;
        var nbreSeriesInFirstAxe = 0;
        var indiceOfSelectedChart;
        
        var deactivateSecondAxis = false;

        for (var count = 0; count < exploration.graphs_attributes.length; count++) {
            if (exploration.graphs_attributes[count].status) {
                nbreSleepedSeries++;
                nbreSleepedSeriesInFirstAxe = (!exploration.graphs_attributes[count].yAxis) ? ++nbreSleepedSeriesInFirstAxe : nbreSleepedSeriesInFirstAxe;
            }
            else if (exploration.graphs_attributes[count].id == idSerie && !exploration.graphs_attributes[count].yAxis) {
                deactivateSecondAxis = true;
            }
            nbreSeriesInFirstAxe = (!exploration.graphs_attributes[count].yAxis) ? ++nbreSeriesInFirstAxe : nbreSeriesInFirstAxe;
        }

        for (var count = 0; count < exploration.graphs_attributes.length; count++) {
            if ((nbreSleepedSeriesInFirstAxe == nbreSeriesInFirstAxe - 1) && deactivateSecondAxis)
                exploration.graphs_attributes[count].yAxis = false;

            if (exploration.graphs_attributes[count].id == idSerie) {
                if (!exploration.graphs_attributes[count].status)
                    exploration.graphs_attributes[count].status = ChartHelper.SerieStatus.sleep;
                else
                    exploration.graphs_attributes[count].status = ChartHelper.SerieStatus.wakeUp;
                indiceOfSelectedChart = count;
            }
        }
        if ((nbreSleepedSeriesInFirstAxe == nbreSeriesInFirstAxe - 1) && deactivateSecondAxis && (exploration.graphs_attributes[indiceOfSelectedChart].status == ChartHelper.SerieStatus.sleep)) {

            DataExplorer.viewObjectExplorer = D3jsAccess.drawExploration(DataExplorerHelper.idContainerSvgExplorer, exploration, false);
          //  DataExplorer.viewObjectExplorer._sysecondaxis = false;
            D3jsAccess.displayExploration(DataExplorer.viewObjectExplorer, DataExplorerHelper.idContainerSvgExplorer, exploration);
        }
        else  {
            D3jsAccess.hideShowSerie(idSerie, exploration.graphs_attributes[indiceOfSelectedChart].status, DataExplorer.viewObjectExplorer);
        }
      
        Grid.drawGrid(DataExplorerController.buildDataGrid());
        buildAllLegend();
    }
    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: buildAllLegend
-- Description: create the list of legend
-- Params: no one
-- Return: no one
-------------------------------------------------------*/
    function buildAllLegend() {
        Legend.deleteAllLegend();

        var nbreVariableSleeped = 0;
        var canSleep = true;

        if (exploration) {
            for (var count = 0; count < exploration.graphs_attributes.length ; count++) {
                if (exploration.graphs_attributes[count].status)
                    nbreVariableSleeped++;
            }

            if (exploration.graphs_attributes.length - 1 <= nbreVariableSleeped)
                canSleep = false;

            for (var count = 0; count < exploration.graphs_attributes.length ; count++) {
                var serie = exploration.graphs_attributes[count];
                Legend.addLegend(serie, canSleep);

                if (serie.status)
                    D3jsAccess.getpicto(serie.type, ChartHelper.COLOR_SELCTED_SERIE);
                else
                    D3jsAccess.getpicto(serie.type, serie.color);
            }

            Legend.addBtnNewSerie();
        }
    }

    function buildDataGrid() {
        var dataGridobj = new Object();
        dataGridobj.values = new Array();
        dataGridobj.titles = new Array();
        dataGridobj.pictosGrid = new Array();
        var DataSeriesObj = function () {
            this.id;
            this.date;
            this.variables = new Array();
        }

        if (exploration) {
            for (var count = 0; count < exploration.graphs_attributes.length; count++) {
                dataGridobj.titles.push(exploration.graphs_attributes[count].title);
                if (exploration.graphs_attributes[count].status) {
                    dataGridobj.pictosGrid.push('picto_' + exploration.graphs_attributes[count].type.toLocaleLowerCase() + '_' + ChartHelper.COLOR_SELCTED_SERIE.replace('#', ''));
                }
                else {
                    dataGridobj.pictosGrid.push('picto_' + exploration.graphs_attributes[count].type.toLocaleLowerCase() + '_' + CDHelper.convertColorToHex(exploration.graphs_attributes[count].color).replace('#', ''));
                }
            }
            for (var subCount = exploration.timestamps.length-1; subCount >= 0; subCount--) {
                var dataSeries = new DataSeriesObj();
                dataSeries.id = subCount;
                dataSeries.date = new Date(exploration.timestamps[subCount]);

                for (var count = 0; count < exploration.graphs_attributes.length; count++) {
                    var val = exploration.graphs_attributes[count].data[subCount];
                    if (val == 0) { }
                    else if (val) {
                        dataSeries.variables.push(val);
                    }
                    else { dataSeries.variables.push(""); }
                }
                if (dataSeries.variables.length)
                    dataGridobj.values.push(dataSeries);
            }
        }
        return dataGridobj;
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: getGraphData
    -- Description: get graph data
    -- Params: graphInfo to send
    -- Return:
    -------------------------------------------------------*/
    function getGraphData(graphInfo, _getGraphDataSucceed, _getGraphDataFailed) {
        DataExplorerServices.getSerieData(graphInfo, _getGraphDataSucceed, _getGraphDataFailed);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: getExplorationData
    -- Description: get exploration data
    -- Params: exploration; callback
    -- Return:
    -------------------------------------------------------*/
    function getExplorationData(exploration, updateUI) {
        var graphsCount = exploration.graphs_attributes.length;
        var cptNbrGraphs = graphsCount;

        for (var count = 0; count < graphsCount; count++) {
            var graphToSend = new GraphTemplate.GraphModelToSend();
            graphToSend.graph.connector_id = exploration.graphs_attributes[count].connector_id;
            graphToSend.graph.dimensions = exploration.graphs_attributes[count].dimensions;
            graphToSend.graph.measure = exploration.graphs_attributes[count].measure;
            graphToSend.graph.frequency = exploration.getFrequency();

            (function (currentIndex) {
                // Launch service to get data foreach graph(serie)
                getGraphData(graphToSend, function (serie) { _getGraphDataSucceed(serie, exploration.graphs_attributes[currentIndex].id); }, function (error) { _getGraphDataFailed(error, exploration.graphs_attributes[currentIndex].id); });
            })(count);
        }

        // Service succeed
        function _getGraphDataSucceed(serie, idGraph) {
            for (var count = 0; count < graphsCount; count++) {
                    if (exploration.graphs_attributes[count].id == idGraph) {//GraphTemplate.Graph.prototype.getSerieId(serie.series[0].prefix, serie.series[0].measure, serie.series[0].filters)) {
                        exploration.graphs_attributes[count].data = serie.data[0];
                        exploration.graphs_attributes[count].date = serie.timestamps;
                        break;
                    }
            }

            _tryRedraw();
        }

        // Service failed
        function _getGraphDataFailed(error, idGraph) {
            for (var count = 0; count < graphsCount; count++) {
                if (exploration.graphs_attributes[count].id == idGraph) {
                    exploration.graphs_attributes[count].data = [];
                    exploration.graphs_attributes[count].date = [];
                }
            }
            _tryRedraw();
        }

        function _tryRedraw() {
            cptNbrGraphs--;
            if (cptNbrGraphs == 0) {
                formatGraphsData(exploration);
                updateUI();
            }
        }
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: formatGraphsData
    -- Description: format graphs (add 0 to each null data)
    -- Params: exploration
    -- Return:
    -------------------------------------------------------*/
    function formatGraphsData(exploration) {
        for (var nbrSeries = 0; nbrSeries < exploration.graphs_attributes.length; nbrSeries++) {
            var formattedData = []
            for (var count = 0; count < exploration.timestamps.length; count++) {
                formattedData.push(0);
            }

            for (var countFormatted = 0; countFormatted < exploration.timestamps.length; countFormatted++) {

                for (var count = 0; count < exploration.graphs_attributes[nbrSeries].date.length; count++) {
                    var formattedDate = new Date(exploration.timestamps[countFormatted]);
                    var serverDate = new Date(exploration.graphs_attributes[nbrSeries].date[count]);
                    var tempData = exploration.graphs_attributes[nbrSeries].data[count]+'';

                    switch (parseInt(exploration.getFrequency())) {

                        case CDHelper.AggregationType.Daily: {
                            if ((formattedDate.getUTCDate() == serverDate.getUTCDate()) && (formattedDate.getUTCMonth() == serverDate.getUTCMonth()) && (formattedDate.getUTCFullYear() == serverDate.getUTCFullYear())) {
                                formattedData[countFormatted] = (tempData.split('.').length == 2) ? parseFloat(tempData).toFixed(2) : tempData;
                            }
                            break;
                        }

                        case CDHelper.AggregationType.Monthly: {
                            if ((formattedDate.getUTCMonth() == serverDate.getUTCMonth()) && (formattedDate.getUTCFullYear() == serverDate.getUTCFullYear())) {
                                formattedData[countFormatted] = (tempData.split('.').length == 2) ? parseFloat(tempData).toFixed(2) : tempData;
                            }
                            break;
                        }

                        case CDHelper.AggregationType.Yearly: {
                            if (formattedDate.getUTCFullYear() == serverDate.getUTCFullYear()) {
                                formattedData[countFormatted] = (tempData.split('.').length == 2) ? parseFloat(tempData).toFixed(2) : tempData;
                            }
                            break;
                        }
                    }

                }

            }

            exploration.graphs_attributes[nbrSeries].data = formattedData;
            exploration.graphs_attributes[nbrSeries].date = exploration.timestamps;
        }
    }



    /* ------------------------------------------------------
-- Author: [M.C]
-- Name:darwExplorationTile
-- Description: draw exploration tile in explorer page
-- Params: tile object
-- Return: no one
-------------------------------------------------------*/
    function darwExplorationTile(currentTile) {
        var connector;
        for (var count = 0; count < currentTile.graphs_attributes.length; count++) {
            currentTile.graphs_attributes[count].title = (currentTile.graphs_attributes[count].name) ? currentTile.graphs_attributes[count].name : '';
            currentTile.graphs_attributes[count].yAxis = currentTile.graphs_attributes[count].second_axis;
            connector = DataSourcesHelper.getConnectorById(currentTile.graphs_attributes[count].connector_id);
            if (connector) {
                currentTile.graphs_attributes[count].source = connector.type;
                currentTile.graphs_attributes[count].account = connector.description;
            }
        }
        createNewExploration();
        exploration.setFrequency(currentTile.frequency);
        exploration.setGraphs(currentTile.graphs_attributes);
        exploration.setTimeStamps();
        exploration.setName(currentTile.name);
    }

    /* ------------------------------------------------------
 -- Author: [M.C]
 -- Name:drawNumericTile
 -- Description: draw numeric tile in explorer page
 -- Params: tile object
 -- Return: no one
 -------------------------------------------------------*/
    function drawNumericTile(currentTile) {
        var graphToSend = { graph: {} };

        currentTile.type = ChartHelper.ChartType.Bar;
        graphToSend.graph.connector_id = currentTile.connectorId;
        graphToSend.graph.frequency = currentTile.frequency;
        graphToSend.graph.measure = currentTile.measure;
        graphToSend.graph.dimensions = currentTile.dimensions;

            DataExplorerController.getGraphData(graphToSend,
            function (series) {
                var connector  = DataSourcesHelper.getConnectorById(currentTile.connectorId);
                var graph = new GraphTemplate.Graph(currentTile.type, currentTile.connectorId, series.series[0].measure, currentTile.yAxis, currentTile.label, connector.type, connector.title, currentTile.measure);
                graph.setStatus(ChartHelper.SerieStatus.wakeUp);
                graph.setData(series.data[0]);
                graph.setDate(series.timestamps);
                graph.setFilters(series.series[0].filters);
                graph.setId(currentTile.measure);
              //  graph.title =  currentTile.label;
                //connector = DataSourcesHelper.getConnectorById(currentTile.connectorId);
                //if (connector) {
                //    graph.source = connector.type;
                //    graph.account = connector.description;
                //}
                createNewExploration();
                exploration.setFrequency(graphToSend.graph.frequency);
                exploration.setTimeStamps();
                exploration.addGraph(graph);
                formatGraphsData(exploration);
                exploration.setName(currentTile.label);
                DataExplorer.goToExplorer();
            }.bind(this), function (err) {
                Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
            }
            );

    }

    function isActiveSecondAxe() {
        for (var count = 0; count < exploration.graphs_attributes.length; count++) {
            if (exploration.graphs_attributes[count].yAxis)
                return true;
        }
        return false;
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: updateExploration
    -- Description: update exploration after delete connector
    -- Params: connectorId
    -- Return:
    -------------------------------------------------------*/
    function updateExploration(connectorId) {
        if (!isEmptyExploration()) {
            var tryDeleteGraph = function () {
                for (var count = 0; count < exploration.graphs_attributes.length; count++) {
                    if (exploration.graphs_attributes[count].connector_id == connectorId) {
                        exploration.deleteGraph(exploration.graphs_attributes[count].id);
                        tryDeleteGraph();
                    }
                }
            }
            tryDeleteGraph();
            if (exploration.graphs_attributes.length == 0)
                deleteExploration();
        }
    }


    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: changeDatesInterval
    -- Description: set dates to change
    -- Params: start date, end date
    -- Return:
    -------------------------------------------------------*/
    ////function changeDatesInterval(startDate, endDate, updateUI) {

    ////    var graphsCount = exploration.graphs_attributes.length;
    ////    var cptNbrGraphs = graphsCount;

    ////    for (var count = 0; count < graphsCount; count++) {
    ////        var graphToSend = new GraphTemplate.GraphModelToSend();
    ////        graphToSend.graph.connector_id = exploration.graphs_attributes[count].connectorId;
    ////        graphToSend.graph.dimensions = exploration.graphs_attributes[count].filters;
    ////        graphToSend.graph.measure = exploration.graphs_attributes[count].measure;
    ////        graphToSend.graph.frequency = exploration.getFrequency();

    ////        DataExplorerServices.getSerieData(graphToSend, _getGraphDataSucceed, function (error) { _getGraphDataFailed(error, exploration.graphs_attributes[count].id) });
    ////    }

    ////    function _getGraphDataSucceed(serie) {
    ////        for (var count = 0; count < graphsCount; count++) {
    ////            if (exploration.graphs_attributes[count].id == DataExplorerHelper.getSerieId(serie.series[0])){
    ////                exploration.graphs_attributes[count].data = serie.data[0];
    ////                exploration.graphs_attributes[count].date = serie.timestamps;}
    ////        }
    ////        _tryRedraw(serie.timestamps);
    ////    }

    ////    function _getGraphDataFailed(error, idGraph) {
    ////        for (var count = 0; count < graphsCount; count++) {
    ////            if (exploration.graphs_attributes[count].id == idGraph){
    ////                exploration.graphs_attributes[count].data = [];
    ////                exploration.graphs_attributes[count].date = [];}
    ////        }
    ////        _tryRedraw(serie.timestamps);
    ////    }

    ////    function _tryRedraw(timeStamps) {
    ////        cptNbrGraphs--;
    ////        if (cptNbrGraphs == 0)
    ////        {
    ////            exploration.setTimeStamps(timeStamps);
    ////                exploration.setStartDate(startDate);
    ////                exploration.setEndDate(endDate);

    ////                updateUI();
    ////            }
    ////    }

    ////}

    WinJS.Namespace.define("DataExplorerController", {
        isEmptyExploration: { get: function () { return isEmptyExploration(); } },//todo isEmptyExploration,
        deleteSerie: deleteSerie,
        sleepSerie: sleepSerie,
        getGraphData: getGraphData,
        //changeDatesInterval: changeDatesInterval,
        exploration: { get: function () { return exploration; }, set: function (val) { return exploration = val; } },
        buildAllLegend: buildAllLegend,
        buildDataGrid: buildDataGrid,
        getExplorationData: getExplorationData,
        reverseExplorationMode: reverseExplorationMode,
        createNewExploration: createNewExploration,
        deleteExploration: deleteExploration,
        darwExplorationTile: darwExplorationTile,
        drawNumericTile: drawNumericTile,
        formatGraphsData: formatGraphsData,
        isActiveSecondAxe: isActiveSecondAxe,
        updateExploration: updateExploration
    })
})();
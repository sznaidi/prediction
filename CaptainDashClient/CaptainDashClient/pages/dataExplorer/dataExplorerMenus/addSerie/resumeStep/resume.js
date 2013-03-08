/*-------------------------------
-- Author : [A.A]
-- Creation date : 05/02/2013
------------------------------*/

(function () {
    "use strict";
    
    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(DataExplorerHelper.DataExplorerMenusTitles.addSerie, '', true);
            btn_rightMenu_back.onclick = _showPreviousStep;

            lbl_addSerie_connector.innerText = ConnectorsTemplate.Connector.getConnectorLabel(graphInfo.connectorType);
            lbl_addSerie_account.innerText = graphInfo.account;
            lbl_addSerie_metric.innerText = graphInfo.metric;

            if (DataExplorerController.isEmptyExploration)
                tgl_addSerie_axis.winControl.disabled = true;

            _bindListChartType();
        });
    }

   /* ------------------------------------------------------
   -- Author: [A.A]
   -- Name: _bindListChartType
   -- Description: bind list chart type
   -- Params:
   -- Return:
   -------------------------------------------------------*/
    function _bindListChartType() {
        WinJS.UI.setOptions(lvChartType.winControl, {
            itemDataSource: new WinJS.Binding.List(ChartHelper.ListChartTypeVertical).dataSource,
            oniteminvoked: _lvChartTypeItemInvoked
        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _lvChartTypeItemInvoked
    -- Description: click on list chart type
    -- Params: Evt click
    -- Return:
    ------------------------------------------------------*/
    function _lvChartTypeItemInvoked(e) {
        var currentItem = e.detail.itemPromise._value.data;
        _addSerie(currentItem.type);
    }

    /* ------------------------------------------------------
   -- Author: [A.A]
   -- Name: _addSerie
   -- Description: add Graph
   -- Params:
   -- Return:
   -------------------------------------------------------*/
    function _addSerie(chartType) {
        graphInfo.type = chartType;
        graphInfo.yAxis = tgl_addSerie_axis.winControl.checked;

        if (DataExplorerController.isEmptyExploration)
            graphInfo.graphToSend.graph.frequency = CDHelper.AggregationType.Daily;
        else
            graphInfo.graphToSend.graph.frequency = DataExplorerController.exploration.getFrequency();

        RightMenu.rightMenuLoading(true);
        DataExplorerController.getGraphData(graphInfo.graphToSend, _getSerieDataSucceed, _getSerieDataFailed);
    }

    /* ------------------------------------------------------
        -- Author: A.A]
        -- Name: _getSerieDataSucceed
        -- Description:
        -- Params:
        -- Return:
        -------------------------------------------------------*/
    function _getSerieDataSucceed(series) {
        
        var graph = new GraphTemplate.Graph(graphInfo.type, graphInfo.graphToSend.graph.connector_id, series.series[0].measure, graphInfo.yAxis, graphInfo.metric, graphInfo.connectorType, graphInfo.account, graphInfo.graphToSend.graph.measure);
        graph.setStatus(ChartHelper.SerieStatus.wakeUp);
        graph.setData(series.data[0]);
        graph.setDate(series.timestamps);
        graph.setFilters(series.series[0].filters);
        graph.setId(graphInfo.graphToSend.graph.measure);

        //var tabFullDate = [];
        //var tabId = [];
        //var tabDate = [];
        //var tabDay = [];
        //var tabYear = [];
        //var tabMonth = [];
        //var tabQuarter = [];
        //var tabHalf = [];

        //for (var x = 1; x <= series.timestamps.length; x++) {
        //    var date = new Date(series.timestamps[x - 1]);
        //    tabFullDate.push(date.getDate() + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getFullYear());
        //    tabId.push(x);
        //    tabDate.push(date.getDate());
        //    switch (date.getDay()) {
        //        case (1): {
        //            tabDay.push("Monday");
        //            break;
        //        }
        //        case (2): {
        //            tabDay.push("Tuesday");
        //            break;
        //        }
        //        case (3): {
        //            tabDay.push("Wednesday");
        //            break;
        //        }
        //        case (4): {
        //            tabDay.push("Thursday");
        //            break;
        //        }
        //        case (5): {
        //            tabDay.push("Friday");
        //            break;
        //        }
        //        case (6): {
        //            tabDay.push("Saturday");
        //            break;
        //        }
        //        case (0): {
        //            tabDay.push("Sunday");
        //            break;
        //        }
        //    }

        //    switch (date.getMonth()) {
        //        case (0): {
        //            tabMonth.push("January");
        //            tabQuarter.push(1);
        //            tabHalf.push(1);
        //            break;
        //        }
        //        case (1): {
        //            tabMonth.push("February");
        //            tabQuarter.push(1);
        //            tabHalf.push(1);
        //            break;
        //        }
        //        case (2): {
        //            tabMonth.push("March");
        //            tabQuarter.push(1);
        //            tabHalf.push(1);
        //            break;
        //        }
        //        case (3): {
        //            tabMonth.push("April");
        //            tabQuarter.push(2);
        //            tabHalf.push(1);
        //            break;
        //        }
        //        case (4): {
        //            tabMonth.push("May");
        //            tabQuarter.push(2);
        //            tabHalf.push(1);
        //            break;
        //        }
        //        case (5): {
        //            tabMonth.push("June");
        //            tabQuarter.push(2);
        //            tabHalf.push(1);
        //            break;
        //        }
        //        case (6): {
        //            tabMonth.push("July");
        //            tabQuarter.push(3);
        //            tabHalf.push(2);
        //            break;
        //        }
        //        case (7): {
        //            tabMonth.push("August");
        //            tabQuarter.push(3);
        //            tabHalf.push(2);
        //            break;
        //        }
        //        case (8): {
        //            tabMonth.push("September");
        //            tabQuarter.push(3);
        //            tabHalf.push(2);
        //            break;
        //        }
        //        case (9): {
        //            tabMonth.push("October");
        //            tabQuarter.push(4);
        //            tabHalf.push(2);
        //            break;
        //        }
        //        case (10): {
        //            tabMonth.push("November");
        //            tabQuarter.push(4);
        //            tabHalf.push(2);
        //            break;
        //        }
        //        case (11): {
        //            tabMonth.push("December");
        //            tabQuarter.push(4);
        //            tabHalf.push(2);
        //            break;
        //        }
        //    }

        //    tabYear.push(date.getFullYear());
            
        //}
        //tabFullDate.reverse();
        //tabId.reverse();
        //tabDate.reverse();
        //tabDay.reverse();
        //tabYear.reverse();
        //tabQuarter.reverse();
        //tabHalf.reverse();



     

            //var str = "sep=;\n";
            //var data = series.data[0];
            
            //var nbValue = series.data[0].length;
            
            //str += "date; value;";
            //for (var i = 0; i < nbValue; i++) {
            //    str += "\n" + tabFullDate[i] + ";" + data[i] + ";";
            //}

            //var picker = new  Windows.Storage.Pickers.FileSavePicker();

            //picker.fileTypeChoices.insert("CSV file", [".csv"]);
            //picker.defaultFileExtension = ".csv";
            //picker.suggestedFileName = "Metric Data";

            //picker.pickSaveFileAsync()
            //.then(function (file) {
            //    if (file != null) {
            //        file.openAsync(Windows.Storage.FileAccessMode.readWrite)
            //        .then(function (streamWriter) {
            //            var outputStream = streamWriter.getOutputStreamAt(0);
            //            var writer = Windows.Storage.Streams.DataWriter(outputStream);

            //            writer.writeString(str);

            //            writer.storeAsync()
            //                .then(function () {
            //                    // new version   return writer.CommitAsync
            //                    return writer.flushAsync();
            //                })
            //                .then(function () {
            //                    writer.close();
            //                });
            //        })
            //        .then(null, function (error) {
            //            var y = 0;
            //        });
            //    }
            //});

        


        if (DataExplorerController.isEmptyExploration) {
            DataExplorerController.createNewExploration();
            DataExplorerController.exploration.setTimeStamps();
        }
        if (!DataExplorerController.exploration.isExistGraph(graph.id)) {
            
            DataExplorerController.exploration.addGraph(graph);

            DataExplorerController.formatGraphsData(DataExplorerController.exploration);

            DataExplorer.updateGraphsView();
        }
        else
            Messages.showCancelMessage(MessagesHelper.MSG_SERIES_TITLE, MessagesHelper.MSG_SERIES_EXIST);

        RightMenu.rightMenuLoading(false);       
    }

    /* ------------------------------------------------------
    -- Author: A.A]
    -- Name: _getSerieDataFailed
    -- Description:
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _getSerieDataFailed(error) {
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showPreviousStep
    -- Description: Navigate to metrics step
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showPreviousStep() {
        RightMenu.showRightMenu(Pages.addSerieMetricsStep, null);
    }

    WinJS.UI.Pages.define(Pages.addSerieResumeStep, {
        ready: ready,
    });

})();
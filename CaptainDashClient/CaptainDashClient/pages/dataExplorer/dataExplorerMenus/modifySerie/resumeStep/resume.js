/* -------------------------------
-- Author : [A.A]
-- Creation date : 28/01/2013
-------------------------------*/

(function () {
    "use strict";

    var currentGraph;

    function ready(graph) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(DataExplorerHelper.DataExplorerMenusTitles.modifySerie, DataExplorerHelper.DataExplorerMenusSubTitles[DataExplorerHelper.DataExplorerMenusTitles.modifySerie].parameters, false);
            lbl_modifySerie_visualization.onclick = _showVisualizationStep;
            modifySerieResumeStep.focus();
            modifySerieResumeStep.onkeydown = function (e) {
                if (e.keyCode == 13) {
                    _modifyGraph();
                    return false;
                }
            };

            currentGraph = graph;

            lbl_modifySerie_connectorType.innerText = ConnectorsTemplate.Connector.getConnectorLabel(currentGraph.source);

            slct_modifySerie_account.querySelector(".div_titleItem_select").innerText = currentGraph.account;
            slct_modifySerie_account.dataSrc = currentGraph.connectorId;
            slct_modifySerie_account.onclick = _bindListAccounts;
            if (currentGraph.measureLabel) {
                slct_modifySerie_metric.querySelector(".div_titleItem_select").innerText = currentGraph.measureLabel;
            }
            else {
                CDHelper.getMetricLabelFromCode(currentGraph.measure, currentGraph.connector_id, function (metric) {
                    slct_modifySerie_metric.querySelector(".div_titleItem_select").innerText = metric.name;
                }, function () { });
            }
            slct_modifySerie_metric.dataSrc = currentGraph.measureCode;
            slct_modifySerie_metric.onclick = function () { _bindListMetrics(currentGraph.connector_id, true)
            };

            if (currentGraph.status) {
                imgPicto.className = 'picto_' + currentGraph.type.toLocaleLowerCase() + '_' + ChartHelper.COLOR_SELCTED_SERIE.replace('#', '');
                D3jsAccess.getpicto(currentGraph.type, ChartHelper.COLOR_SELCTED_SERIE);
            }
            else {
                imgPicto.className = 'picto_' + currentGraph.type.toLocaleLowerCase() + '_' + CDHelper.convertColorToHex(currentGraph.color).replace('#', '');
                D3jsAccess.getpicto(currentGraph.type, currentGraph.color);
            }

            if (currentGraph.yAxis)
                tgl_modifySerie_yAxis.winControl.checked = true;
            else if (!DataExplorerController.exploration.canMakeYAxis())
                tgl_modifySerie_yAxis.winControl.disabled = true;


            txt_modifySerie_title.value = currentGraph.title;
            btn_modifySerie_apply.onclick = _modifyGraph;
        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _modifyGraph
    -- Description: modify graph
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _modifyGraph() {
        if (txt_modifySerie_title.value == '') {
            lbl_modifySerie_titleError.innerText = MessagesHelper.MSG_MODIFY_SERIE_EMPTY;
            return;
        }

        //if (DataExplorerController.exploration.getGraphFromId(currentGraph.id) && (currentGraph.id != currentGraph.tmpGraphId)) {
        //    lbl_modifySerie_titleError.innerText = MessagesHelper.MSG_DUPLICATED_CHART_NAME;
        //    return;
        //}

        currentGraph.yAxis = tgl_modifySerie_yAxis.winControl.checked;
        currentGraph.title = txt_modifySerie_title.value;

        var graphToSend = new GraphTemplate.GraphModelToSend();
        graphToSend.graph.connector_id = currentGraph.connector_id;
        graphToSend.graph.dimensions = currentGraph.dimensions;
        graphToSend.graph.measure = currentGraph.measure;
        graphToSend.graph.frequency = DataExplorerController.exploration.getFrequency();

        RightMenu.rightMenuLoading(true);
        DataExplorerController.getGraphData(graphToSend, _getSerieDataSucceed, _getSerieDataFailed);
    }

    /* ------------------------------------------------------
        -- Author: [A.A]
        -- Name: _getSerieDataSucceed
        -- Description:
        -- Params:
        -- Return:
        -------------------------------------------------------*/
    function _getSerieDataSucceed(series) {
        var graphsCount = DataExplorerController.exploration.graphs_attributes.length;

        for (var count = 0; count < graphsCount; count++) {
            if (DataExplorerController.exploration.graphs_attributes[count].id == currentGraph.tmpGraphId) {
                DataExplorerController.exploration.graphs_attributes[count].data = series.data[0];
                DataExplorerController.exploration.graphs_attributes[count].date = series.timestamps;
                break;
            }
        }

        DataExplorerController.formatGraphsData(DataExplorerController.exploration);

        if (isPredicted)
            canPredict = true;

        DataExplorer.updateGraphsView();

        RightMenu.rightMenuLoading(false);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
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
    -- Name: _bindListAccounts
    -- Description: modify account
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _bindListAccounts() {
        var type = "selectBox";
        var listAccounts = DataSourcesHelper.getDoneConnectors(currentGraph.source);
        // sort connectors by alphabetic method
        DataSourcesHelper.sortConnectors(listAccounts, DataSourcesHelper.SortMethod.Alphabetic);
        var selectBoxClickCallback = function (idAccount) {
            for (var count = 0; count < listAccounts.length; count++) {
                if (listAccounts[count].id == idAccount) {
                    slct_modifySerie_account.querySelector(".div_titleItem_select").innerText = listAccounts[count].title;
                    currentGraph.account = listAccounts[count].title;
                    slct_modifySerie_account.dataSrc = idAccount;
                    currentGraph.connectorId = idAccount;
                    currentGraph.id = GraphTemplate.Graph.prototype.getSerieId(currentGraph.connectorId, currentGraph.measure, currentGraph.dimensions);
                    _bindListMetrics(idAccount, false);
                    return;
                }
            }
        };

        Popup.showSelectBox(slct_modifySerie_account, listAccounts, selectBoxClickCallback, CDHelper.position.center, type);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _bindListMetrics
    -- Description: modify metric
    -- Params: connectorId, True if want to show popup
    -- Return: No one
    -------------------------------------------------------*/
    function _bindListMetrics(idAccount, showFlyout) {
        var connectorType = DataSourcesHelper.getConnectorById(idAccount).thrift_type;
        RightMenu.rightMenuLoading(true);
        CDHelper.getListMetrics(connectorType, _getMetricsSucceed, _getMetricsfailed);

        function _bindDataMetrics(idMetric, listMetrics) {
            for (var count = 0; count < listMetrics.length; count++) {
                if (listMetrics[count].id == idMetric) {
                    slct_modifySerie_metric.querySelector(".div_titleItem_select").innerText = listMetrics[count].name;
                    currentGraph.measure = listMetrics[count].name;
                    slct_modifySerie_metric.dataSrc = idMetric;
                    currentGraph.measureCode = idMetric;
                    currentGraph.id = GraphTemplate.Graph.prototype.getSerieId(currentGraph.connector_id, currentGraph.measureCode, currentGraph.dimensions);
                    return;
                }
            }
        }

        function _getMetricsSucceed(filtredListMetrics) {
            if (showFlyout) {
                var type = "selectBox";
                var selectBoxClickCallback = function (idMetric) { _bindDataMetrics(idMetric, filtredListMetrics) };
                Popup.showSelectBox(slct_modifySerie_metric, filtredListMetrics, selectBoxClickCallback, CDHelper.position.center, type);
            }
            else
                _bindDataMetrics(0, filtredListMetrics);

            RightMenu.rightMenuLoading(false);
        }

        function _getMetricsfailed() {
            RightMenu.rightMenuLoading(false);
            Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
        }

    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showVisualizationStep
    -- Description: Navigate to visualization step
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showVisualizationStep() {
        RightMenu.showRightMenu(Pages.modifySerieGraphTypeStep, currentGraph);
    }

    WinJS.UI.Pages.define(Pages.modifySerieResumeStep, {
        ready: ready,
    });

})();
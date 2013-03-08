/*-------------------------------
-- Author : [A.A]
-- Creation date : 05/02/2013
------------------------------*/

(function () {
    var addSerie = WinJS.Resources.getString("DataExplorerHelper_addSerie").value;
    var timeRange = WinJS.Resources.getString("DataExplorerHelper_timeRange").value;
    var pinToDashboard = WinJS.Resources.getString("DataExplorerHelper_pinToDashboard").value;
    var modifySerie = WinJS.Resources.getString("DataExplorerHelper_modifySerie").value;
   
    var source = WinJS.Resources.getString("DataExplorerHelper_source").value;
    var account = WinJS.Resources.getString("DataExplorerHelper_account").value;
    var item = WinJS.Resources.getString("DataExplorerHelper_item").value;
    var parameters = WinJS.Resources.getString("DataExplorerHelper_parameters").value;
    var advanced = WinJS.Resources.getString("DataExplorerHelper_advanced").value;
    var visualization = WinJS.Resources.getString("DataExplorerHelper_visualization").value;
    var _NEW_EXPLORATION = WinJS.Resources.getString("DataExplorerHelper_NEW_EXPLORATION").value;
    var daily = WinJS.Resources.getString("DataExplorerHelper_daily").value;
    var monthly = WinJS.Resources.getString("DataExplorerHelper_monthly").value;
    var yearly = WinJS.Resources.getString("DataExplorerHelper_yearly").value;

    var _DataExplorerMenusTitles = { 'addSerie': addSerie, 'timeRange': timeRange, 'pinToDashboard': pinToDashboard, 'modifySerie': modifySerie };

    var _DataExplorerMenusSubTitles = [];
    _DataExplorerMenusSubTitles[_DataExplorerMenusTitles.addSerie] = { 'source': source, 'account': account,'item': item };
    _DataExplorerMenusSubTitles[_DataExplorerMenusTitles.pinToDashboard] = { 'parameters': parameters };
    _DataExplorerMenusSubTitles[_DataExplorerMenusTitles.modifySerie] = { 'parameters': parameters, 'advanced': advanced, 'visualization': visualization };

    var _enumStacked = { stacked: 'stack', normal: 'normal' };
    var _enumState = { value: 'value', dragEnd: 'dragend' };
   
    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: getListFrequencysFlyout
    -- Description: get list for frequency flyout
    -- Params: currentFrequency
    -- Return: list for frequency flyout
    -------------------------------------------------------*/
    function getListFrequencysFlyout(currentFrequency) {
        var listFrequencys = [];
        switch (parseInt(currentFrequency)) {
            case CDHelper.AggregationType.Daily: {
                listFrequencys.push({ id: CDHelper.AggregationType.Monthly, title: monthly });
                listFrequencys.push({ id: CDHelper.AggregationType.Yearly, title: yearly });
                break;
            }
            case CDHelper.AggregationType.Monthly: {
                listFrequencys.push({ id: CDHelper.AggregationType.Daily, title: daily });
                listFrequencys.push({ id: CDHelper.AggregationType.Yearly, title: yearly });
                break;
            }
            case CDHelper.AggregationType.Yearly: {
                listFrequencys.push({ id: CDHelper.AggregationType.Daily, title: daily });
                listFrequencys.push({ id: CDHelper.AggregationType.Monthly, title: monthly });
                break;
            }
        }
        return listFrequencys;
    }

    WinJS.Namespace.define("DataExplorerHelper", {
        DataExplorerMenusTitles: { get: function () { return _DataExplorerMenusTitles; } },
        DataExplorerMenusSubTitles: { get: function () { return _DataExplorerMenusSubTitles; } },
        enumStacked: { get: function () { return _enumStacked; } },
        enumState: { get: function () { return _enumState; } },
        getListFrequencysFlyout: getListFrequencysFlyout,
        NEW_EXPLORATION: { get: function () { return _NEW_EXPLORATION; } },
        idContainerSvgExplorer: { get: function () { return 'container'; } },
        idContainerSmallSvgExplorer: { get: function () { return 'smallChart'; } },
    });
    
})();
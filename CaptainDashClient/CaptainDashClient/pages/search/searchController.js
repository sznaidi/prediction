(function () {
    "use strict";

    var searchQuery = "";
    var _listWidgets = [];
    var _listConnectors = [];
    var _listDashboards = [];

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: getAllDashboards
    -- Description: Launch get all dashboards service
    -- Params: None
    -- Return: None
    ------------------------------------------------------*/
    function launchSearch(_getDashboardPromiseSucceed, _getDashboardPromiseFailed) {
        var getDashboardPromise = [];
        _listWidgets = [];
        _listConnectors = [];

        _listDashboards = DashboardsHelper.listDashboards.slice();

        //fill connector list with connectors matching search
        _filterListConnectors();
        
        //promise get all widgets
        for (var dashboardsIterator = 0; dashboardsIterator < _listDashboards.length; dashboardsIterator++) {
            getDashboardPromise.push(_getDashboard(_listDashboards[dashboardsIterator].id));
        }

        WinJS.Promise.join(getDashboardPromise).done(_getDashboardPromiseSucceed, _getDashboardPromiseFailed);
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _getDashboard
    -- Description: Launch get full dashboard data
    -- Params: idDashboard
    -- Return: None
    ------------------------------------------------------*/
    function _getDashboard(idDashboard) {
        return new WinJS.Promise(function (c, e, p) {
            (function (c, e) {
                DashboardsServices.getDashboard(idDashboard, function (dashboard) { _getDashboardSucceed(dashboard, c) }, function (error) { _getDashboardFailed(error, e); });
            })(c, e);
        });
    }

    /* ------------------------------------------------------
     -- Author: HK
     -- Name: _getDashboardSucceed
     -- Description: callback get full dashboard succeed 
     -- Params: full dashboard
     -- Return: None
     ------------------------------------------------------*/
    function _getDashboardSucceed(dashboard, complete) {
        if (dashboard.groups.length > 0) {
            CockpitHelper.hashedGroupList = CDHelper.toHashTable(dashboard.groups);
            var listItem = CockpitHelper.getListItemFromDashboard(dashboard, true);
            _listWidgets = _listWidgets.concat(listItem);
        }

        complete();
    }

    /* ------------------------------------------------------
     -- Author: HK
     -- Name: _getDashboardFailed
     -- Description: callback get full dashboard failed
     -- Params: 
            * Error: the handled error
            * e: the error function to call
     -- Return: e(error)
     ------------------------------------------------------*/
    function _getDashboardFailed(error, e) {
        e(error);
    }
    
    function _filterListConnectors() {
        for (var indexType = 0; indexType < DataSourcesHelper.listConnectorsType.length; indexType++) {
            var currentType = DataSourcesHelper.listConnectorsType[indexType].type;
            var currentTypeList = DataSourcesHelper.listConnectors[currentType];
            for (var connectorIterator = 0; connectorIterator < currentTypeList.length; connectorIterator++) {
                var currentTitle = currentTypeList[connectorIterator].title.toLowerCase();
                if (currentTitle.indexOf(SearchController.searchQuery.toLowerCase()) != -1) {
                    SearchController.listConnectors.push(currentTypeList[connectorIterator]);
                }
            }
        }
    }

    WinJS.Namespace.define("SearchController", {
        searchQuery: { get: function () { return searchQuery; }, set: function (query) { searchQuery = query; } },
        listConnectors: { get: function () { return _listConnectors; }, set: function (list) { _listConnectors = list; } },
        listWidgets: { get: function () { return _listWidgets; } },
        launchSearch: launchSearch,
    })
})();
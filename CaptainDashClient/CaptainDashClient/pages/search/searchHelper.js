(function () {
    "use strict";

    //default cell dimension
    var _CELL_TILE_WIDTH_SOURCES = 300;
    var _CELL_TILE_HEIGHT_SOURCES = 150;
    var _CELL_TILE_WIDTH = 10;
    var _CELL_TILE_HEIGHT = 10;

    //enum of search page filters
    var filters = {
        widgets: "widgets",
        sources: "sources",
        none: "none",
    };

    //enum of filters status color 
    var filterStatusColor = {
        enabled: "#EC715A",
        disabled: "#C7C2B0"
    }

    var sourceStatus = {
        inProgress: "Pending",
        done: "Active",
        invalidCredentials: "Invalid Credentials",
        noData: "No Data",
        failed: "Build Failed",
        partialData: "Partial Data",
        paused: "Paused",
    };

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: getResultsHeader
    -- Description: format the header text
    -- Params: none
    -- Return: the header text
    -------------------------------------------------------*/
    function getResultsHeader(result) {
        var resultFor = WinJS.Resources.getString("searchHelper_resultFor").value;
        if(result)
            return resultFor + SearchController.searchQuery + "'";
        else
            return MessagesHelper.MSG_SEARCH_NOT_FOUND + " '" + SearchController.searchQuery + "' "
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: getListViewGroupInfo
    -- Description: sets the group info to use with LV
    -- Params: filter
    -- Return: group info object
    -------------------------------------------------------*/
    function getListViewGroupInfo(filter) {
        if (filter != SearchHelper.filters.sources) {
            return {
                enableCellSpanning: true,
                cellWidth: SearchHelper.cellTileWidth,
                cellHeight: SearchHelper.cellTileHeight
            };
        }
        else {
            return {
                enableCellSpanning: false,
                cellWidth: SearchHelper.cellTileWidthSources,
                cellHeight: SearchHelper.cellTileHeightSources
            };
        }
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: getItemDatasourceByFilter
    -- Description: set the binding list switch filter
    -- Params: filter to use
    -- Return: the binding list 
    -------------------------------------------------------*/
    function getItemDatasourceByFilter(filter) {
        var listBinding;

        switch (filter) {
            case filters.widgets:
                listBinding = new WinJS.Binding.List(SearchController.listWidgets);
                break;
            case filters.sources:
                var formattedList = DataSourcesHelper.formatConnectors(SearchController.listConnectors, true);
                listBinding = new WinJS.Binding.List(formattedList);
                break;
            default:
                listBinding = new WinJS.Binding.List();
                break;
        }

        return listBinding;
    }

    WinJS.Namespace.define("SearchHelper", {
        filters: { get: function () { return filters; } },
        cellTileHeight: { get: function () { return _CELL_TILE_HEIGHT; } },
        cellTileWidth: { get: function () { return _CELL_TILE_WIDTH; } },
        cellTileHeightSources: { get: function () { return _CELL_TILE_HEIGHT_SOURCES; } },
        cellTileWidthSources: { get: function () { return _CELL_TILE_WIDTH_SOURCES; } },
        filterStatusColor: { get: function () { return filterStatusColor; } },
        sourceStatus: { get: function () { return sourceStatus; } },
        getResultsHeader: getResultsHeader,
        getListViewGroupInfo: getListViewGroupInfo,
        getItemDatasourceByFilter: getItemDatasourceByFilter,

    })
})();
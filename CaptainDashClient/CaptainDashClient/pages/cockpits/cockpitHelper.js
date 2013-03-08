/*-------------------------------
-- Author : [S.H]
-- Creation date : 28/01/2013
------------------------------*/

(function () {
    var KpiBackgroundImg = {
        AT: "url('/pages/cockpits/images/kpiAt.png')",
        AT_H: "url('/pages/cockpits/images/kpiAtH.png')",
        FB: "url('/pages/cockpits/images/kpiFb.png')",
        FB_H: "url('/pages/cockpits/images/kpiFbH.png')",
        FS: "url('/pages/cockpits/images/kpiFs.png')",
        FS_H: "url('/pages/cockpits/images/kpiFsH.png')",
        GA: "url('/pages/cockpits/images/kpiGa.png')",
        GA_H: "url('/pages/cockpits/images/kpiGaH.png')",
        TW: "url('/pages/cockpits/images/kpiTw.png')",
        TW_H: "url('/pages/cockpits/images/kpiTwH.png')"
    }

    var hashedGroupList;
    var _TILE_WIDTH = "300";
    var _TILE_HEIGHT = "150";
    var _WIDTH_KPI_SNAP = "280px";
    var _HEIGHT_KPI_SNAP = "130px";
    var _NO_DATA_YET = WinJS.Resources.getString("CockpitHelper_NO_DATA_YET").value;
    var frequencyYearly = WinJS.Resources.getString("CockpitHelper_yearly").value;
    var frequencyMonthly = WinJS.Resources.getString("CockpitHelper_monthly").value;
    var frequencyDaily = WinJS.Resources.getString("CockpitHelper_daily").value;
    var newWidget = WinJS.Resources.getString("CockpitHelper_addTile").value;
    var modifyWidget = WinJS.Resources.getString("CockpitHelper_modifyTile").value;
    var advanced = WinJS.Resources.getString("CockpitHelper_advanced").value;
    var parameters = WinJS.Resources.getString("CockpitHelper_parameters").value;
    var source = WinJS.Resources.getString("CockpitHelper_source").value;
    var account = WinJS.Resources.getString("CockpitHelper_account").value;
    var item = WinJS.Resources.getString("CockpitHelper_item").value;
    var formatTile = WinJS.Resources.getString("CockpitHelper_formatTile").value;
    var typeTile = WinJS.Resources.getString("CockpitHelper_typeTile").value;
    var number = WinJS.Resources.getString("CockpitHelper_lblNumber").value;
    var kPI = WinJS.Resources.getString("CockpitHelper_lblKPI").value;
    var byValue = WinJS.Resources.getString("CockpitHelper_byValue").value;
    var byPercentege = WinJS.Resources.getString("CockpitHelper_byPercentege").value;

    var nothingThanks = WinJS.Resources.getString("CockpitHelper_nothingThanks").value;
    var dayBefore = WinJS.Resources.getString("CockpitHelper_dayBefore").value;
    var sameDayOneMonthAgo = WinJS.Resources.getString("CockpitHelper_sameDayOneMonthAgo").value;
    var sameDayOneYearAgo = WinJS.Resources.getString("CockpitHelper_sameDayOneYearAgo").value;
    var previousMonth = WinJS.Resources.getString("CockpitHelper_previousMonth").value;
    var someMonthPreviousYear = WinJS.Resources.getString("CockpitHelper_someMonthPreviousYear").value;
    var previousYear = WinJS.Resources.getString("CockpitHelper_previousYear").value;

    var TileType = { Numerique: "numeric", Comparaison: "comparaison", Exploration: "exploration" };
    
    var _frequencyArr = [{ id: 1, title: frequencyYearly }, { id: 2, title: frequencyMonthly }, { id: 3, title: frequencyDaily }, ]

    var _currentDashboard; 
    var _CockpitsMenusTitles = { 'addTile': newWidget, 'modifyTile': modifyWidget };
   
    var _CockpitsMenusSubTitles = [];
    _CockpitsMenusSubTitles[_CockpitsMenusTitles.addTile] = { 'source': source, 'account': account, 'item': item, 'advanced': advanced, 'formatTile': formatTile, 'typeTile': typeTile };
    _CockpitsMenusSubTitles[_CockpitsMenusTitles.modifyTile] = { 'advanced': advanced, 'parameters': parameters };

    var _formatTiles = new WinJS.Binding.List([
        { key: "numberId", label: number, image_url: "pages/cockpits/images/numberIcon.png" }]);

    var _typeTiles =[];
    _typeTiles["numberId"] = [{ key: "kpiId", label: kPI }];

    var _EnumCompareTo = [[{ label: nothingThanks, Code: -1 }, { label: dayBefore, Code: 0 }, { label: sameDayOneMonthAgo, Code: 1 }, { label: sameDayOneYearAgo, Code: 2 }], [{ label: nothingThanks, Code: -1 }, { label: previousMonth, Code: 0 }, { label: someMonthPreviousYear, Code: 1 }], [{ label: nothingThanks, Code: -1 }, { label: previousYear, Code: 0 }]];
    var _EnumPeriods = [{ label: frequencyDaily, Code: 3 }, { label: frequencyMonthly, Code: 2 }, { label: frequencyYearly, Code: 1 }];
    var _EnumCalculations = [[{ label: byValue, Code: 1 }], [{ label: byValue, Code: 1 }, { label: byPercentege, Code: 2 }]];


    function getLabelFromCode(code, array) {
        var label;
        for (var iterator = 0; iterator < array.length; iterator++) {
            if (code == array[iterator].Code) {
                label = array[iterator].label;
                return label;
            }
        }

        return '';
    }

    function returnCompareType(code, levelFrequency, list) {
        var listCompareType = [];
        if (list)
            listCompareType = list[levelFrequency - 1];
        for (var count = 0; count < listCompareType.length; count++) {
            if (listCompareType[count].Code == code)
                return listCompareType[count].label;
        }

        return '';
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: fillCockpits
-- Description: Fill dashbord
-- Params: dashboard
-- Return:
-------------------------------------------------------*/
    function fillCockpits(dashboard) {
        _currentDashboard = dashboard;
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: removeTileFromCurrentDashboard
-- Description: remove tile from current dashboard
-- Params: tileId
-- Return:
-------------------------------------------------------*/
    function removeTileFromCurrentDashboard(tileId) {
        for (var tilesCount = 0; tilesCount < _currentDashboard.tiles.length; tilesCount++) {
            if (_currentDashboard.tiles[tilesCount].id == tileId) {
                _currentDashboard.tiles.splice(tilesCount, 1);
                return;
            }
        }
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: addTileToCurrentDashboard
-- Description: add tile to current dashboard
-- Params: tile object
-- Return:
-------------------------------------------------------*/
    function addTileToCurrentDashboard(tile) {
        _currentDashboard.tiles.push(tile);
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: modifyTileInCurrentDashboard
-- Description: update tile in current dashboard
-- Params: tile object
-- Return:
-------------------------------------------------------*/
    function modifyTileInCurrentDashboard(tile) {
        for (var tilesCount = 0; tilesCount < _currentDashboard.tiles.length; tilesCount++) {
            if (_currentDashboard.tiles[tilesCount].id == tile.id) {//todo verify if same object
                _currentDashboard.tiles[tilesCount].name = tile.name;
                _currentDashboard.tiles[tilesCount].x = tile.x;
                _currentDashboard.tiles[tilesCount].y = tile.y;
                _currentDashboard.tiles[tilesCount].w = tile.w;
                _currentDashboard.tiles[tilesCount].h = tile.h;
                _currentDashboard.tiles[tilesCount].frequency = tile.frequency;
                _currentDashboard.tiles[tilesCount].measure = tile.measure;
                _currentDashboard.tiles[tilesCount].dimensions = tile.dimensions;
                return;
            }
        }
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: addGroupToCurrentDashboard
-- Description: add group to current dashboard
-- Params: group object
-- Return:
-------------------------------------------------------*/
    function addGroupToCurrentDashboard(group) {
        _currentDashboard.groups.push(group);
    }

    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: calculTileSize
   -- Description: Format the with and height of tile to pixel
   -- Params: width and height
   -- Return: return thne object of size
   -------------------------------------------------------*/
    function calculTileSize(width, height) {
        var size;

        switch (width + " | " + height) {
            case ("1 | 2"):
                {
                    size = { width: _TILE_WIDTH + "px", height: (_TILE_HEIGHT * 2) + "px" };
                    break;
                }
            case ("1 | 3"):
                {
                    size = {width: _TILE_WIDTH + "px", height: (_TILE_HEIGHT * 3) + "px" };
                    break;
                }
            case ("2 | 1"):
                {
                    size = {width: (_TILE_WIDTH * 2) + "px", height: _TILE_HEIGHT + "px" };
                    break;
                }
            case ("2 | 2"):
                {
                    size = {width: (_TILE_WIDTH * 2) + "px", height: (_TILE_HEIGHT * 2) + "px" };
                    break;
                }      

            default:
                {
                    size = { width: (_TILE_WIDTH - 10) + "px", height: _TILE_HEIGHT + "px" };
                    break;
                }
          }
        
      return size;
    }
   
    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: formatDate
    -- Description: returns the appropriate format according to the frequency
    -- Params: frequency and date that will be formatted
    -- Return: return a formatted date
    -------------------------------------------------------*/
    function formatDate(frequency, date) {
        var formattedDate;
        var month = new Date(date).getMonth();
        var year = new Date(date).getFullYear();
        var day = new Date(date).getDate();
        switch (parseInt(frequency)) {
            case 1:
                formattedDate = year;
                break;
            case 2:
                formattedDate = CDHelper.month[month] + year;
                break;
            case 3:
                formattedDate = CDHelper.month[month] + day + ", " + year;
                break;
            default:
                break;         
        }
        return formattedDate;
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: getTileValueSize
    -- Description: Return the size of value will be displayed in the tile
    -- Params: the length of value
    -- Return: the size of value
    -------------------------------------------------------*/
    function getTileValueSize(length) {
        var sizes = [];
        sizes[0] = "39.99px";
        sizes[1] = "39.99px";
        sizes[2] = "39.99px";
        sizes[3] = "39.99px";
        sizes[4] = "39.99px";
        sizes[5] = "39.99px";
        sizes[6] = "39.99px";
        sizes[7] = "39.99px";
        sizes[8] = "39.99px";
        sizes[9] = "39.99px";
        sizes[10] = "32pt";
        sizes[11] = "29pt";
        sizes[12] = "27pt";
        sizes[13] = "25pt";
        sizes[14] = "24pt";
        sizes[15] = "23pt";
        sizes[16] = "22pt";
        sizes[17] = "21pt";
        sizes[18] = "20pt";

        return sizes[length] ? sizes[length] : "16pt";
    }


    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: formatValue
   -- Description: format the kpi value
   -- Params: value
   -- Return: formatted falue
   -------------------------------------------------------*/
    function formatKpiValue(kpiValue) {
        var formattedkpiValue;

        if (kpiValue < 1000) {
            formattedkpiValue = _roundNumber(kpiValue, 2);
        }

        else {
            formattedkpiValue = CDHelper.addCommas(_roundNumber(parseFloat(kpiValue), 2));
        }

        return formattedkpiValue;
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _roundNumber
    -- Description: Round a number to the nearest integer
    -- Params: a number, precision 
    -- Return: It return a rounded number
    -------------------------------------------------------*/
    function _roundNumber(originalNumber, decimalsPrecision) {
        var roundedNumber = Math.round(originalNumber * Math.pow(10, decimalsPrecision)) / Math.pow(10, decimalsPrecision);
        return parseFloat(roundedNumber);
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: toHashTable
    -- Description: 
            * transforms a given array to a hash table indexed by object.id
            * the array must contain objects that involve an id attribute
    -- Params: array
    -- Return: hash array
    -------------------------------------------------------*/
    function toHashTable(array) {
        var hashedList = [];

        for (var indexArray = 0; indexArray < array.length; indexArray++) {
            hashedList[array[indexArray].id] = array[indexArray];
        }

        return hashedList;
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: getListItemFromDashboard
    -- Description: 
            * format list items switch type
    -- Params: 
            * dashboard : the current dashboard 
            * is required for search purpose
    -- Return: hash array
    -------------------------------------------------------*/
    function getListItemFromDashboard(dashboard, forSearch) {
        var listItem = [];

        dashboard.tiles.forEach(function (tile) {
            var tempTile = {};
            CDHelper.requireScriptJS(Scripts.searchController);

            if (!forSearch || (forSearch && tile.name && tile.name.toLowerCase().indexOf(SearchController.searchQuery.toLowerCase()) != -1)) {
                if (tile.type == CockpitHelper.TileType.Numerique) {
                    tempTile = cloneNumericTile(tile);
                    tempTile.group = DashboardsHelper.getHeaderProperties(CockpitHelper.hashedGroupList[tile.group_id].id, CockpitHelper.hashedGroupList[tile.group_id].title);
                    listItem.push(tempTile);
                }
                else if (tile.type == CockpitHelper.TileType.Exploration) {
                    tempTile = new ExplorationTemplate.Exploration(tile.name);
                    tempTile.setId(tile.id);
                    tempTile.widgetType = tile.type;
                    tempTile.position = tile.position;
                    tempTile.setFrequency(tile.exploration.frequency);
                    tempTile.setGraphs(tile.exploration.graphs.series);
                    tempTile.group = DashboardsHelper.getHeaderProperties(CockpitHelper.hashedGroupList[tile.group_id].id, CockpitHelper.hashedGroupList[tile.group_id].title);
                    listItem.push(tempTile);
                }
            }
        });

        return listItem;
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: cloneNumericTile
    -- Description: 
            * create a numeric item from tile
    -- Params: 
            * tile : the tile to format 
    -- Return: the numeric item
    -------------------------------------------------------*/
    function cloneNumericTile(tile) {
        var tempNumericTile = {};
        var connector = DataSourcesHelper.getConnectorById(tile.connector_id);
        tempNumericTile.id = tile.id;
        tempNumericTile.label = tile.name;
        tempNumericTile.value = tile.value;
        tempNumericTile.connectorId = tile.connector_id;
        tempNumericTile.connectorType = connector.thrift_type
        tempNumericTile.connectorName = connector.title;
        tempNumericTile.frequency = tile.frequency;
        tempNumericTile.widgetType = tile.type;
        tempNumericTile.date = tile.date;
        tempNumericTile.width = tile.width;
        tempNumericTile.spotlighted_at = tile.spotlighted_at;
        tempNumericTile.height = tile.height;
        tempNumericTile.measure = tile.measure;
        tempNumericTile.position = tile.position;
        tempNumericTile.dimensions = tile.dimensions;

        return tempNumericTile;
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name:_getKpiBackgroundImg
    -- Description: get background image of Kpi tile
    -- Params: connector type, boolean(is highlighted or no)
    -- Return: return background image
    -------------------------------------------------------*/
    function getKpiBackgroundImg(typeConnector, spotlighted_at) {
        if (!spotlighted_at) {
            switch (typeConnector) {
                case CDHelper.ConnectorType.Atlas: {
                    return CockpitHelper.KpiBackgroundImg.AT;
                    break;
                }

                case CDHelper.ConnectorType.FacebookFanpage: {
                    return CockpitHelper.KpiBackgroundImg.FB;
                    break;
                }

                case CDHelper.ConnectorType.FacebookInsights: {
                    return CockpitHelper.KpiBackgroundImg.FB;
                    break;
                }

                case CDHelper.ConnectorType.FoursquarePrivate: {
                    return CockpitHelper.KpiBackgroundImg.FS;
                    break;
                }
                    
                case CDHelper.ConnectorType.FoursquarePublic: {
                    return CockpitHelper.KpiBackgroundImg.FS;
                    break;
                }

                case CDHelper.ConnectorType.GoogleAnalytics: {
                    return CockpitHelper.KpiBackgroundImg.GA;
                    break;
                }

                case CDHelper.ConnectorType.Twitter: {
                    return CockpitHelper.KpiBackgroundImg.TW;
                    break;
                }

                default: {
                    return CockpitHelper.KpiBackgroundImg.PATH_NO_IMG;
                    break;
                }
            }
        }
        else {
            switch (typeConnector) {
                case CDHelper.ConnectorType.Atlas: {
                    return CockpitHelper.KpiBackgroundImg.AT_H;
                    break;
                }

                case CDHelper.ConnectorType.FacebookFanpage: {
                    return CockpitHelper.KpiBackgroundImg.FB_H;
                    break;
                }

                case (CDHelper.ConnectorType.FoursquarePrivate || CDHelper.ConnectorType.FoursquarePublice): {
                    return CockpitHelper.KpiBackgroundImg.FS_H;
                    break;
                }
                case CDHelper.ConnectorType.GoogleAnalytics: {
                    return CockpitHelper.KpiBackgroundImg.GA_H;
                    break;
    }

                case CDHelper.ConnectorType.Twitter: {
                    return CockpitHelper.KpiBackgroundImg.TW_H;
                    break;
                }
                default: {
                    return CockpitHelper.KpiBackgroundImg.PATH_NO_IMG;
                    break;
                }
            }
        }
    }

    WinJS.Namespace.define("CockpitHelper", {
        fillCockpits: fillCockpits,
        modifyTileInCurrentDashboard: modifyTileInCurrentDashboard,
        addTileToCurrentDashboard: addTileToCurrentDashboard,
        removeTileFromCurrentDashboard:removeTileFromCurrentDashboard,
        addGroupToCurrentDashboard:addGroupToCurrentDashboard,
        currentDashboard: { get: function () { return _currentDashboard; } },
        CockpitsMenusTitles: { get: function () { return _CockpitsMenusTitles; } },
        CockpitsMenusSubTitles: { get: function () { return _CockpitsMenusSubTitles; } },
        formatTiles: { get: function () { return _formatTiles; } },
        typeTiles: { get: function () { return _typeTiles; } },
        getLabelFromCode: getLabelFromCode,
        returnCompareType: returnCompareType,
        EnumCompareTo: { get: function () { return _EnumCompareTo; } },
        EnumPeriods: { get: function () { return _EnumPeriods; } },
        EnumCalculations: { get: function () { return _EnumCalculations; } },
        calculTileSize: calculTileSize,
        TileType: TileType,
        formatDate: formatDate,
        KpiBackgroundImg: KpiBackgroundImg,
        widthKpiSnap: _WIDTH_KPI_SNAP,
        heightKpiSnap: _HEIGHT_KPI_SNAP,
        getTileValueSize: getTileValueSize,
        toHashTable: toHashTable,
        _pathImgHorizontalSeparator: "url(\"/images/rightMenu/horizontalSeparator.png\")",
        _pathVerticalSeparatorImg: "url(\"/images/rightMenu/verticalSeparator.png\")",
        _pathImageItemPlusBtn: "url(\"/images/rightMenu/plusButton.png\")",
        _pathImageItemMinusBtn: "url(\"/images/rightMenu/minusButton.png\")",
        _pathImgNone: "url()",
        _colorOrange: "rgb(236, 113, 90)",
        _colorPurple: "rgb(75, 61, 93)",
        _colorPurpleLight: "#403351",
        _1Block:{ get: function () { return WinJS.Resources.getString("CockpitHelper_oneBlock").value; } }, 
        _2HorizontalBlock:{ get: function () { return WinJS.Resources.getString("CockpitHelper_twoHorizentalBlock").value; } }, 
        _2VerticalBlock:{ get: function () { return WinJS.Resources.getString("CockpitHelper_twoVerticalBlock").value; } }, 
        _3VerticalBlock: { get: function () { return WinJS.Resources.getString("CockpitHelper_threeVerticalBlock").value; } },
        formatKpiValue: formatKpiValue,
        noData: _NO_DATA_YET,
        frequency: { get: function () { return _frequencyArr; } },
        hashedGroupList: { get: function () { return hashedGroupList; }, set: function (value) { hashedGroupList = value; } },
        getListItemFromDashboard: getListItemFromDashboard,
        cloneNumericTile: cloneNumericTile,
        getKpiBackgroundImg: getKpiBackgroundImg,
    });
})();

(function () {
    "use strict";

    /*------------------------------------------------------
-- Author: [M.C]
-- Name: getpicto
-- Description: get picto colred
-- Params:serieType, color
-- Return:picto
-------------------------------------------------------*/
    function getpicto(serieType, color) {
        cd.utils.getpicto(serieType, color);
    }

    /*------------------------------------------------------
-- Author: [M.C]
-- Name: hideShowSerie
-- Description: sleep wakeup serie 
-- Params:idSerie, state, viewObject
-- Return:no one
-------------------------------------------------------*/
    function hideShowSerie(idSerie, state, viewObject) {
        viewObject.disableid(idSerie, state);
    }

    /*------------------------------------------------------
-- Author: [M.C]
-- Name: deleteSerie
-- Description: delete serie 
-- Params:idSerie, viewObject
-- Return: no one
-------------------------------------------------------*/
    function deleteSerie(idSerie, viewObject) {
        viewObject.removeid(idSerie);
    }

    /*------------------------------------------------------
-- Author: [M.C]
-- Name: _createD3jsSerie
-- Description: create serie object 
-- Params: serie
-- Return:serie object
-------------------------------------------------------*/
    function _createD3jsSerie(serie/*, colors*/) {
        if (serie.type == ChartHelper.ChartType.Arealine)//uncomment next (enable Arealine chart type)
            serie.type = ChartHelper.ChartType.Line;
        var serie = { 'ids': [serie.id], 'metric': serie.title, 'type': serie.type, 'timestamps': serie.date, 'data': [serie.data],/* 'colors': colors,*/ 'secondaxis': (serie.yAxis) };
        return serie;
    }
    
    /*------------------------------------------------------
-- Author: [M.C]
-- Name: _buildExploartion
-- Description: add series to cdd3 object 
-- Params:explorationObject, viewObject
-- Return:no one
-------------------------------------------------------*/
    function _buildExploartion(explorationObject, viewObject) {
        for (var count = 0 ; count < explorationObject.graphs_attributes.length;count++) {
            var serie = explorationObject.graphs_attributes[count];
            
                var d3jsSerie = _createD3jsSerie(serie /*, _arrayColor*/);
                viewObject.addserie(d3jsSerie);
                viewObject.state.setcolor(serie.id, serie.color);//todo serie.color??
        }
    }

    /*------------------------------------------------------
-- Author: [M.C]
-- Name: addSerie
-- Description: add serie to cdd3 object 
-- Params:idSerie, serie, viewObject, containerId
-- Return:no one
-------------------------------------------------------*/
    function addSerie(idSerie, serie, viewObject, containerId) {
        var d3jsSerie = _createD3jsSerie( serie /*, _arrayColor*/);
        viewObject.addserie(d3jsSerie);
        viewObject.state.setcolor(idSerie, serie.color);
        displayExploration(viewObject, containerId);
    }

    /*------------------------------------------------------
-- Author: [M.C]
-- Name: displayExploration
-- Description: display exploration in svg
-- Params:containerId, viewObject
-- Return:no one
-------------------------------------------------------*/
    function displayExploration(viewObject, containerId,explorationObject) {
        var selection = d3.select('#' + containerId);
        viewObject.resize(false);
        viewObject.display(selection);
        _disableSleepedSeries(explorationObject, viewObject, selection);
        if (explorationObject.mode == DataExplorerHelper.enumStacked.stacked) {//todo
            viewObject._mode = DataExplorerHelper.enumStacked.stacked;
            viewObject.mode(DataExplorerHelper.enumStacked.stacked);
            viewObject.display(selection);//todo a voir avec pierre
        }
        
    }

    /*------------------------------------------------------
-- Author: [M.C]
-- Name: _disableSecondAxe
-- Description: diable second axe
-- Params:containerId, viewObject
-- Return:no one
-------------------------------------------------------*/
    function _disableSecondAxe(viewObject) {
        viewObject._sysecondaxis = false;
    }

    /*------------------------------------------------------
-- Author: [M.C]
-- Name: _disableSleepedSeries
-- Description: diable sleeped serie
-- Params:section, viewObject,explorationObject
-- Return:no one
-------------------------------------------------------*/
    function _disableSleepedSeries(explorationObject, viewObject, selection) {
        for (var count = 0 ; count < explorationObject.graphs_attributes.length; count++) {
            var serie = explorationObject.graphs_attributes[count];
            if (serie.status) {
                viewObject.disableidWithOutDraw(serie.id, serie.status);
            }
        }
        _disableSecondAxe(viewObject);
        viewObject.display(selection);
    }

    /*------------------------------------------------------
-- Author: [M.C]
-- Name: drawExploration
-- Description: draw chart in svg
-- Params:containerId, explorationObject, isSmallExploration, isOverHight
-- Return:cdd3 object
-------------------------------------------------------*/
    function drawExploration(containerId, explorationObject, isSmallExploration) {
        var viewObject = _createView();
        viewObject.state._w8 = true;
        var _arrayColor = new Array();

        try {
            _arrayColor = D3jsAccessHelper.getArrayOfColor(explorationObject, viewObject);  //todo
            //viewObject.color(_arrayColor);
           _buildExploartion(explorationObject, viewObject)
            //initialise ui
            if (isSmallExploration)
                _initializeSmallExploration(viewObject)
            else
                _initialiseFullExploration(viewObject);
            if (!isSmallExploration && DataExplorerController.isActiveSecondAxe())
                viewObject._margin.right = 30 + 15 * D3jsAccessHelper.getMaxLengthValuePerVariable(explorationObject);
            //fixe aggregation format for bottom axe
            viewObject.timeformat(D3jsAccessHelper.enumAggregation[explorationObject.frequency]);
           // displayExploration(viewObject, containerId, explorationObject);
        }
        catch (e) {//todo 
        }
        return viewObject;
    }

    /*------------------------------------------------------
-- Author: [M.C]
-- Name: _initialiseFullExploration
-- Description: initialise full exploration param
-- Params:cdd3 object
-- Return: no one
-------------------------------------------------------*/
    function _initialiseFullExploration(viewObject) {
        viewObject._cnum = 0;
        viewObject.showLegend(false);
        viewObject._useZoom = false;
        viewObject._useXZoom = false;
        viewObject._useYZoom = false;
        viewObject._useScroll = false;
        viewObject._useXScroll = false;
        viewObject._useYScroll = false;
        viewObject.showTooltip(false);
        viewObject.showValueviewer(true);
        viewObject._vvover = true;
        viewObject._vv._background = true;
        //manage event onover in svg and update details  (picto and value )
        viewObject.state.event(function (e) {
            if (e.event == DataExplorerHelper.enumState.value) {
                DataExplorer.showHideTooltipsContainer(false, e.date);
                DataExplorer.createTooltips(e.values);
                _showPicto(e.values)
            }
            else if (e.event == DataExplorerHelper.enumState.dragEnd) {
                 DataExplorer.clearTooltipsContainer();
                 DataExplorer.showHideTooltipsContainer(true);
            }
        });

        viewObject._margin.top = 20;
        viewObject._margin.right = 10;
        viewObject._margin.bottom = 90;
        viewObject._margin.left = 40;
        viewObject._margin.xaxis = 50;
        viewObject._margin.yaxis = 30;

    }

    function _showPicto(values) {
        for (var count in values) {
            var elem = values[count];
            getpicto(elem.type.toLocaleLowerCase(), CDHelper.convertColorToHex(elem.color));
        }
    }

    /*------------------------------------------------------
-- Author: [M.C]
-- Name: _initializeSmallExploration
-- Description: initialise Small exploration param
-- Params:cdd3 object
-- Return: no one
-------------------------------------------------------*/
    function _initializeSmallExploration(viewObject) {
        viewObject._showLegend = false;
        viewObject._showTimeline = false;
        viewObject._showXAxis = true;
        viewObject._showXLabels = false;
        viewObject._showYTick = true;
        viewObject._showYAxis = true;
        viewObject._showTooltip = false;
        viewObject._autoYAdjust = false;
        //viewObject._useZoom = false;
        //viewObject._useXZoom = false;
        //viewObject._useYZoom = false;
        //viewObject._useScroll = false;
        //viewObject._useXScroll = false;
        //viewObject._useYScroll = false;
        viewObject._margin = { top: 0, right: 0, bottom: 0, left: 0, interx: 0, intery: 0, space: 2 };
        viewObject._margin.yaxis = 10;
      
    }

    /*------------------------------------------------------
-- Author: [M.C]
-- Name: isStackedMode
-- Description: return if drawed series can be stacked
-- Params:cdd3 object
-- Return: boolean
-------------------------------------------------------*/
    function isStackedMode(viewObject) {
        if (viewObject) {
            viewObject._mode = DataExplorerHelper.enumStacked.normal;
            return viewObject.state.stackable();
        }
    }

    /*------------------------------------------------------
-- Author: [M.C]
-- Name: reverseExplorationMode
-- Description: reverse the current exploartion mode
-- Params:cdd3 object
-- Return: return new mode
-------------------------------------------------------*/
    function reverseExplorationMode(viewObject, containerId) {
        if (viewObject.state.stackable() && viewObject._style == DataExplorerHelper.enumStacked.normal) {
            //set mode to stacked
            viewObject.mode(DataExplorerHelper.enumStacked.stacked);
            return DataExplorerHelper.enumStacked.stacked;
        }
        else {
            //set mode to no satcked
            viewObject.mode(DataExplorerHelper.enumStacked.normal);
            return DataExplorerHelper.enumStacked.normal;
        }
    }

    /*------------------------------------------------------
-- Author: [M.C]
-- Name: getAllowedChartTypes
-- Description: get type of serie we can draw it
-- Params: no one
-- Return: array of allowed chart type
-------------------------------------------------------*/
    function getAllowedChartTypes() {
        return viewObject.state.allowed();
    }

    /*------------------------------------------------------
 -- Author: [M.C]
 -- Name: deleteSvgObject
 -- Description: reset cdd3 object
 -- Params:cdd3 object
 -- Return: cdd3 object
 -------------------------------------------------------*/
    function deleteSvgObject(viewObject) {
        delete [viewObject];  
    }

    /*------------------------------------------------------
  -- Author: [M.C]
  -- Name: _createView
  -- Description: create cdd3 object
  -- Params: no one
  -- Return: cdd3 object
  -------------------------------------------------------*/
    function _createView() {
        var newView = new View();
        return newView;
    }

    WinJS.Namespace.define("D3jsAccess", {
        isStackedMode: isStackedMode,
        reverseExplorationMode: reverseExplorationMode,
        drawExploration: drawExploration,
        deleteSerie: deleteSerie,
        addSerie: addSerie,
        hideShowSerie: hideShowSerie,
        getAllowedChartTypes: getAllowedChartTypes,
        deleteSvgObject: deleteSvgObject,
        displayExploration:displayExploration,
        getpicto:getpicto
    });

})();

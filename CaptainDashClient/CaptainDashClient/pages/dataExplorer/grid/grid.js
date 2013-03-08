

(function () {
    "use strict";

    //	--------------------------------------------------------------------------
    //	FUNCTION: CreateHeaderGrid
    //	-------------------------------------------------------------------------
    //	Return: 
    //	------------------------------------------------------------------------
    var CreateHeaderGrid = function () {
        
        var listWidthHeader;
        GridHelper.activeColor = GridHelper.enumColorRow.firstColor;
        div_dataExplorer_gridHeader.innerHTML = "";

        var container_headerGrid = document.createElement("div");
        container_headerGrid.className = 'container_headerGrid';

        container_headerGrid.style.msGridColumns = GridHelper.DATE_COLUMN_WIDTH_Px+' ' + GridHelper.msGridVariableColumns;
        var div_dateHeadergrid = document.createElement("div");
        div_dateHeadergrid.className = 'div_dateHeadergrid';
        div_dateHeadergrid.innerText = GridHelper.LBL_DATE_HEADER_GRID;
        container_headerGrid.appendChild(div_dateHeadergrid);
        listWidthHeader = GridHelper.msGridVariableColumns.split(' ');

        for (var count = 0; count < GridHelper.objDataGrid.titles.length; count++) {
            var toultipContainer = document.createElement("span");

            toultipContainer.innerText = GridHelper.objDataGrid.titles[count];

            toultipContainer.className = 'toultipContainer';
            var div_columnHeadergrid = document.createElement("div");
            div_columnHeadergrid.className = 'div_columnHeadergrid';

            div_columnHeadergrid.style.msGridColumn = count + 2;

            if (GridHelper.objDataGrid.pictosGrid[count]) {
                var picto = document.createElement('div');
                picto.style.marginLeft = (parseInt(listWidthHeader[count].substring(0, listWidthHeader[count].length - 2)) / 2 - 20) + "px";
                picto.className = GridHelper.objDataGrid.pictosGrid[count];
                div_columnHeadergrid.appendChild(picto);
                div_columnHeadergrid.appendChild(toultipContainer);
            }
            //needed for map
            //else {
            //    div_columnHeadergrid.innerText = GridHelper.objDataGrid.ListColoumn[count];
            //}

            container_headerGrid.appendChild(div_columnHeadergrid);
        }
        div_dataExplorer_gridHeader.appendChild(container_headerGrid);
        WinJS.UI.processAll();
        
    }

    //	--------------------------------------------------------------------------
    //	FUNCTION: RenderItemGrid
    //	-------------------------------------------------------------------------
    //	Return: 
    //	------------------------------------------------------------------------
    var RenderItemGrid = function (dataObject) {
        var listColumStyle = "";
        var container_bodyGrid = document.createElement("div");
        container_bodyGrid.className = 'container_bodyGrid';

        container_bodyGrid.style.msGridColumns = GridHelper.DATE_COLUMN_WIDTH_Px +' '+ GridHelper.msGridVariableColumns;
        if (GridHelper.activeColor == GridHelper.enumColorRow.secondColor)
            GridHelper.activeColor = GridHelper.enumColorRow.firstColor;
        else
            GridHelper.activeColor = GridHelper.enumColorRow.secondColor;
        container_bodyGrid.style.backgroundColor = GridHelper.activeColor;
        var div_dateBodygrid = document.createElement("div");
        div_dateBodygrid.className = 'div_dateBodygrid';
    
        var formattedDate = CockpitHelper.formatDate(DataExplorerController.exploration.getFrequency(), dataObject.date);
        if (formattedDate)
            div_dateBodygrid.innerText = formattedDate;
        else
            div_dateBodygrid.innerText = "";

        container_bodyGrid.appendChild(div_dateBodygrid);

        for (var count = 0; count < dataObject.variables.length; count++) {
            var div_columnBodygrid = document.createElement("div");
            div_columnBodygrid.className = 'div_columnBodygrid';
            var originalValue = dataObject.variables[count];
            var valueToShow = CDHelper.addCommas(originalValue);
            div_columnBodygrid.innerText = valueToShow;
            div_columnBodygrid.style.msGridColumn = count + 2;

            container_bodyGrid.appendChild(div_columnBodygrid);
        }
   
        return container_bodyGrid;
    }


    //	--------------------------------------------------------------------------
    //	FUNCTION: drawGrid
    //	-------------------------------------------------------------------------
    //	Return: 
    //	------------------------------------------------------------------------
    var drawGrid = function (obj) {
        GridHelper.objDataGrid = obj;
      var listMaxValuePerVariable = getMaxLengthValuePerVariable();
      var columnsLength = 0;
      var gridLength = GridHelper.DATE_COLUMN_WIDTH + GridHelper.SCROLL_WIDTH;
      GridHelper.msGridVariableColumns = "";
      for (var count = 0; count < listMaxValuePerVariable.length; count++) {
          var varLength = getPxLength(listMaxValuePerVariable[count]);
            columnsLength = columnsLength + varLength;
            GridHelper.msGridVariableColumns = GridHelper.msGridVariableColumns + varLength + "px ";
        }
      GridHelper.gridWidth = gridLength + columnsLength;
      div_dataExplorer_contentPage.style.msGridColumns = "63.1% calc(137.5px + 3.25%) 300px 120px " + GridHelper.gridWidth + "px 10px";
       CreateHeaderGrid();
        UpdateGridLv(div_dataExplorer_gridContent.winControl, Windows.UI.ViewManagement.ApplicationView.value);
    }

    //	-----------------------------------------------------------------------
    //	FUNCTION: UpdateGridLv
    //	-----------------------------------------------------------------------
    //	Return: 
    //	-----------------------------------------------------------------------
    var UpdateGridLv = function (lv, layout) {
        if (layout === Windows.UI.ViewManagement.ApplicationViewState.fullScreenPortrait || layout === Windows.UI.ViewManagement.ApplicationViewState.filled
            || layout === Windows.UI.ViewManagement.ApplicationViewState.fullScreenLandscape) {
            var gridDataSource = new WinJS.Binding.List(GridHelper.objDataGrid.values);
            WinJS.UI.setOptions(lv, {
                itemDataSource: gridDataSource.dataSource,
                itemTemplate: MyRenderer,
                oniteminvoked: function (e) {
                    e.stopPropagation();
                }
            });
        }
    }

    //	--------------------------------------------------------------------------
    //	FUNCTION: MyRenderer
    //	-------------------------------------------------------------------------
    //	Return: 
    //	------------------------------------------------------------------------
    var MyRenderer = function (getIndex, key, dataObject, itemID) {
        return RenderItemGrid(getIndex._value.data);
    }

    //return for each variable to draw the max value length
    var getMaxLengthValuePerVariable = function () {
        var listMaxLength = new Array();
        var maxValue;
        for (var nbVar = 0; nbVar < GridHelper.objDataGrid.titles.length; nbVar++) {
            listMaxLength[nbVar] = 0;
            for (var nbVal = 0; nbVal < GridHelper.objDataGrid.values.length; nbVal++) {
                if (GridHelper.objDataGrid.values[nbVal].variables[nbVar]) {
                    maxValue = GridHelper.objDataGrid.values[nbVal].variables[nbVar].toString().length;
                    if (listMaxLength[nbVar] < maxValue)
                        listMaxLength[nbVar] = maxValue;
                }
            }
        }
        return listMaxLength;
    }

    //return the number of pixel per caracter
    var getPxLength = function (value) {
        if (value != null && value > 0) {
            if (value == 1) { // un seul chiffre
                return GridHelper.NB_PIXEL_ONE_CARACTER;
            }
            else {
                return value * GridHelper.NB_PIXEL_PER_CARACTER;
            }
        }
        return value;
    }

    WinJS.Namespace.define('Grid', {
        drawGrid: drawGrid,
    });
})();



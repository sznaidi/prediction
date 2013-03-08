
(function () {

    var _enumAggregation = { 3: 'day', 2: 'month', 1: 'year' };
    /*------------------------------------------------------
-- Author: [M.C]
-- Name: getArrayOfColor
-- Description: get list color of drawed chart
-- Params:explorationObject
-- Return:array of color
-------------------------------------------------------*/
    function getArrayOfColor(explorationObject, viewObject) {
        var arrayColor = [];
        for (var count = 0; count < explorationObject.graphs_attributes.length ; count++) {
            if (!explorationObject.graphs_attributes[count].status) {
                if (!explorationObject.graphs_attributes[count].color) {
                    explorationObject.graphs_attributes[count].color = CDHelper.convertColorToHex(viewObject.state.getcolor());
                }
                else {
                    explorationObject.graphs_attributes[count].color = CDHelper.convertColorToHex(explorationObject.graphs_attributes[count].color);
                }
                arrayColor.push(explorationObject.graphs_attributes[count].color);
            }
        }
        return arrayColor;
    }

    function getMaxLengthValuePerVariable(explorationObject) {
        var maxValue = 0;
        var tempMaxValue;
        for (var nbVar = 0; nbVar < explorationObject.graphs_attributes.length; nbVar++) {

            if (explorationObject.graphs_attributes[nbVar].yAxis) {
                for (var nbVal = 0; nbVal < explorationObject.graphs_attributes[nbVar].data.length; nbVal++) {
                    var tab = explorationObject.graphs_attributes[nbVar].data[nbVar].toString().split('.');
                    tempMaxValue = (tab[1]) ? tab[0].toString().length + 2 : tab[0].toString().length;
                    if (tempMaxValue > maxValue)
                        maxValue = tempMaxValue;
                }
            }
        }
        return maxValue;
    }

    WinJS.Namespace.define("D3jsAccessHelper", {
        getArrayOfColor: getArrayOfColor,
        getMaxLengthValuePerVariable: getMaxLengthValuePerVariable,
        enumAggregation: { get: function () { return _enumAggregation; } },
    });

})();
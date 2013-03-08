/*-------------------------------
-- Author : [A.A]
-- Creation date : 29/01/2013
------------------------------*/

(function () {
    "use strict";

    var tmpGeogFilter;
    var geogCode;
    var tmpDimensionFilter;
    var mediumCode;

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(CockpitHelper.CockpitsMenusTitles.addTile, '', true);
            btn_rightMenu_back.onclick = _showPreviousStep;
            btn_addKpiAdvanced_apply.onclick = _applyAdvancedConfig;

            tmpGeogFilter = '';
            geogCode = '';
            tmpDimensionFilter = '';
            mediumCode = '';
            var listFrequency = CDHelper.toHashTable(CockpitHelper.frequency);

            //if (currentKpi.connectorType == ConnectorsTemplate.ConnectorType.GoogleAnalytics)//todo
            //    _getDimensions();

            //It executes when we change by medium drop down list 
            slct_addKpiAdvanced_medium.onchange = function () {
                CDHelper.displayHideDiv(div_addKpiAdvanced_containerMedium, false);
                if (slct_addKpiAdvanced_medium.selectedIndex != 0) {
                    CDHelper.displayHideDiv(div_addKpiAdvanced_containerMedium, true);
                    lbl_addKpiAdvanced_medium.innerText = slct_addKpiAdvanced_medium.options[slct_addKpiAdvanced_medium.selectedIndex].value;
                    mediumCode = slct_addKpiAdvanced_medium.options[slct_addKpiAdvanced_medium.selectedIndex].value;
                    tmpDimensionFilter = slct_addKpiAdvanced_medium.options[slct_addKpiAdvanced_medium.selectedIndex].value;
                }
                else {
                    tmpDimensionFilter = '';
                    mediumCode = '';
                }
            }
            //It executes when we delete a filter from container
            btn_addKpiAdvanced_deleteMedium.onclick = function () {
                CDHelper.displayHideDiv(div_addKpiAdvanced_containerMedium, false);
                slct_addKpiAdvanced_medium.options[0].selected = true;
                tmpDimensionFilter = '';
                lbl_addKpiAdvanced_medium.innerText = '';
                mediumCode = '';
            }

            //It executes when we change by geography drop down list 
            slct_addKpiAdvanced_geoFilter.onchange = function () {
                CDHelper.displayHideDiv(div_addKpiAdvanced_containerGeo, false);
                if (slct_addKpiAdvanced_geoFilter.selectedIndex != 0) {
                    CDHelper.displayHideDiv(div_addKpiAdvanced_containerGeo, true);
                    lbl_addKpiAdvanced_geoFilter.innerText = slct_addKpiAdvanced_geoFilter.options[slct_addKpiAdvanced_geoFilter.selectedIndex].innerText;
                    geogCode = slct_addKpiAdvanced_geoFilter.options[slct_addKpiAdvanced_geoFilter.selectedIndex].value;
                    tmpGeogFilter = slct_addKpiAdvanced_geoFilter.options[slct_addKpiAdvanced_geoFilter.selectedIndex].innerText;
                }
                else {
                    tmpGeogFilter = '';
                    geogCode = '';
                }
            }

            //It executes when we delete a filter from container
            btn_addKpiAdvanced_deleteGeoFilter.onclick = function () {
                CDHelper.displayHideDiv(div_addKpiAdvanced_containerGeo, false);
                slct_addKpiAdvanced_geoFilter.options[0].selected = true;
                tmpGeogFilter = '';
                lbl_addKpiAdvanced_geoFilter.innerText = '';
                geogCode = '';
            }

            //slct_addKpiAdvanced_compareTo.onchange = _bindDataCalculation;

            //auto select
            slct_addKpiAdvanced_frequency.dataSrc = currentKpi.frequency;
            slct_addKpiAdvanced_frequency.querySelector(".div_titleItem_select").innerText = listFrequency[currentKpi.frequency].title;
            slct_addKpiAdvanced_frequency.onclick = function () { _bindDataFrequency(listFrequency); };
            //_bindDataCompareTo(currentKpi.frequency, currentKpi.compareTo, slct_addKpiAdvanced_compareTo);
            //_bindDataCalculation();
            //slct_addKpiAdvanced_calculation.options[currentKpi.calculation - 1].selected = true;

        });
    }

    /* ------------------------------------------------------
   -- Author: [A.A]
   -- Name: _applyAdvancedConfig
   -- Description: apply changes
   -- Params:
   -- Return:
   -------------------------------------------------------*/
    function _applyAdvancedConfig() {
        if (currentKpi.connectorType == ConnectorsTemplate.ConnectorType.GoogleAnalytics)
            currentKpi.dimensions = tmpGeogFilter + " " + tmpDimensionFilter;
        currentKpi.compareTo = slct_addKpiAdvanced_compareTo.value;
        currentKpi.calculation = slct_addKpiAdvanced_calculation.value;
        currentKpi.frequency = slct_addKpiAdvanced_frequency.dataSrc;
        currentKpi.kpi.tile.frequency = slct_addKpiAdvanced_frequency.dataSrc;
        RightMenu.showRightMenu(Pages.addKpiResumeStep, null);
    }

    /* ------------------------------------------------------
   -- Author: [A.A]
   -- Name: _slct_addKpiAdvanced_frequencyChanged
   -- Description: on change frequency, bind new datas
   -- Params:
   -- Return:
   -------------------------------------------------------*/
    function _bindDataFrequency(listFrequency) {
        var type = "selectBox";
        var selectBoxClickCallback = function (idFrequency) {
            slct_addKpiAdvanced_frequency.querySelector(".div_titleItem_select").innerText = listFrequency[idFrequency].title;
            slct_addKpiAdvanced_frequency.dataSrc = idFrequency;
        };

        Popup.showSelectBox(slct_addKpiAdvanced_frequency, CockpitHelper.frequency, selectBoxClickCallback, CDHelper.position.center, type);
    }

   /* ------------------------------------------------------
   -- Author: [A.A]
   -- Name: _bindDataCompareTo
   -- Description: bind list compareTo
   -- Params:
   -- Return:
   -------------------------------------------------------*/
    function _bindDataCompareTo(level, compareType, slct_addKpiAdvanced_compareTo) {
        var compare = CockpitHelper.EnumCompareTo[level - 1];
        slct_addKpiAdvanced_compareTo.innerHTML = '';
        for (var i = 0; i < compare.length; i++) {
            slct_addKpiAdvanced_compareTo.options[slct_addKpiAdvanced_compareTo.options.length] = new Option(compare[i].label, compare[i].Code);
            if (compareType == compare[i].Code)
                slct_addKpiAdvanced_compareTo.options[slct_addKpiAdvanced_compareTo.options.length - 1].selected = true;
        }
        slct_addKpiAdvanced_compareTo.focus();
        slct_addKpiAdvanced_compareTo.blur();
    }

   /* ------------------------------------------------------
   -- Author: [A.A]
   -- Name: _bindDataCalculation
   -- Description: bind list calculations
   -- Params:
   -- Return:
   -------------------------------------------------------*/
    function _bindDataCalculation() {
        slct_addKpiAdvanced_calculation.innerHTML = '';
        if (slct_addKpiAdvanced_calculation.options) {
            slct_addKpiAdvanced_calculation.options[slct_addKpiAdvanced_calculation.options.length] = new Option(WinJS.Resources.getString("CockpitHelper_byValue").value, 1);
            if (slct_addKpiAdvanced_compareTo.value != -1) {
                slct_addKpiAdvanced_calculation.options[slct_addKpiAdvanced_calculation.options.length] = new Option(WinJS.Resources.getString("CockpitHelper_byPercentege").value, 2);
                slct_addKpiAdvanced_calculation.style.display = 'block';
                lbl_addKpiAdvanced_calculation.style.display = 'block';
                div_addKpiAdvanced_apply.style.msGridRow = 3;
            }
            else {
                CDHelper.displayHideDiv(slct_addKpiAdvanced_calculation, false);
                CDHelper.displayHideDiv(lbl_addKpiAdvanced_calculation, false);
                div_addKpiAdvanced_apply.style.msGridRow = 2;

            }
            slct_addKpiAdvanced_calculation.options[0].selected = true;
            //refresh list calculations
            slct_addKpiAdvanced_calculation.focus();
            slct_addKpiAdvanced_calculation.blur();
        }
    }

   /* ------------------------------------------------------
   -- Author: [A.A]
   -- Name: _getDimensions
   -- Description: get dimensions
   -- Params:
   -- Return:
   -------------------------------------------------------*/
    function _getDimensions() {
        RightMenu.rightMenuLoading(true);
        ConnectorsServices.getDimensions(currentKpi.connectorId, _getDimensionsSucceed, _getDimensionsFailed);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _getDimensionsSucceed
    -- Description: get dimensions succeed
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _getDimensionsSucceed(dimensions) {
        var lbl_showAll = WinJS.Resources.getString("addKpiAdvancedStep_showAll").value
        RightMenu.rightMenuLoading(false);
        if (div_addKpiAdvanced_gaFilters) {
            div_addKpiAdvanced_gaFilters.style.display = 'block';

            slct_addKpiAdvanced_geoFilter.innerHTML = '';
            slct_addKpiAdvanced_geoFilter.options[0] = new Option(lbl_showAll, lbl_showAll);
            for (var i = 0; i < dimensions.Geography.length; i++) {
                slct_addKpiAdvanced_geoFilter.options[slct_addKpiAdvanced_geoFilter.options.length] = new Option(dimensions.Geography[i].label, dimensions.Geography[i].id);
            }
            slct_addKpiAdvanced_geoFilter.focus();
            slct_addKpiAdvanced_geoFilter.blur();

            slct_addKpiAdvanced_medium.innerHTML = '';
            slct_addKpiAdvanced_medium.options[0] = new Option(lbl_showAll, lbl_showAll);
            for (var i = 0; i < dimensions.WebOrigin.length; i++) {
                slct_addKpiAdvanced_medium.options[slct_addKpiAdvanced_medium.options.length] = new Option(CDHelper.capitaliseOnlyFirstLetter(dimensions.WebOrigin[i].label.toLowerCase()));
            }
            slct_addKpiAdvanced_medium.focus();
            slct_addKpiAdvanced_medium.blur();


            ////[A.A] Auto generate dimensions
            ////for (var dimension in dimensions) {
            ////    //create filter label
            ////    var lblFilter = document.createElement('div');
            ////    lblFilter.className = 'rightMenuText';
            ////    lblFilter.innerText = dimension;
            ////    div_addKpiAdvanced_gaFilters.appendChild(lblFilter);

            ////    //create select
            ////    var select = document.createElement('select');
            ////    select.setAttribute('id', dimension);
                  
            ////    //setting an onchange event
            ////    select.onchange = function () {
            ////        var divDimension = document.getElementById('div_' + select.id);
            ////        var lblDimension = document.getElementById('div_lbl' + select.id);
            ////        if (select.value == 'Show all')
            ////            divDimension.style.display = 'none';
            ////        else {
            ////            divDimension.style.display = '-ms-grid';
            ////            lblDimension.innerText = select.options[select.selectedIndex].text;
            ////        }
            ////    };

            ////    //create options elements
            ////    var option;
            ////    option = document.createElement('option');
            ////    option.setAttribute('value', 'Show all');
            ////    option.innerHTML = 'Show all';
            ////    select.appendChild(option);
            ////    for (var i = 0; i < dimensions[dimension].length; i++) {
            ////        option = document.createElement('option');
            ////        option.setAttribute('value', dimensions[dimension][i].id);
            ////        option.innerHTML = dimensions[dimension][i].label;
            ////        select.appendChild(option);
            ////    }

            ////    div_addKpiAdvanced_gaFilters.appendChild(select);                

            ////    //create div selected dimension
            ////    var divDimension = document.createElement('div');
            ////    divDimension.setAttribute('id', 'div_' + dimension);
            ////    divDimension.className = 'divDimension';
            ////    //create selected dimension label
            ////    var lblDimension = document.createElement('div');
            ////    lblDimension.className = 'lblDimension';
            ////    lblDimension.setAttribute('id', 'div_lbl' + dimension);
            ////    divDimension.appendChild(lblDimension);
            ////    //create selected dimension btnDelete
            ////    var btnDeleteDimension = document.createElement('div');
            ////    btnDeleteDimension.className = 'btnDeleteDimension';
            ////    btnDeleteDimension.setAttribute('id', 'btn_delete' + dimension);
            ////    var img = document.createElement("IMG");
            ////    img.src = '/images/rightMenu/deleteFilter.png';
            ////    btnDeleteDimension.appendChild(img);
            ////    //setting an onclick delete event
            ////    btnDeleteDimension.onclick = function () {
            ////        divDimension.style.display = 'none';
            ////    };
            ////    divDimension.appendChild(btnDeleteDimension);
            ////    div_addKpiAdvanced_gaFilters.appendChild(divDimension);
            ////}
        }
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _getDimensionsFailed
    -- Description: get dimensions failed
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _getDimensionsFailed(error) {
        RightMenu.rightMenuLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showPreviousStep
    -- Description: Navigate to resume page
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showPreviousStep() {
        RightMenu.showRightMenu(Pages.addKpiResumeStep, null);
    }

    WinJS.UI.Pages.define(Pages.addKpiAdvancedStep, {
        ready: ready,
    });

})();
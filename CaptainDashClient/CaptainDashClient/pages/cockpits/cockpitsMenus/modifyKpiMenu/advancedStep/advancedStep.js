/*-------------------------------
-- Author : [M.C]
-- Creation date : 30/01/2013
------------------------------*/

(function () {
    "use strict";

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(CockpitHelper.CockpitsMenusTitles.modifyTile, '', true);
            btn_rightMenu_back.onclick = _showPreviousStep;
            btn_modifyKpiAdvanced_apply.onclick = _applyAdvancedConfig;
            var listFrequency = CDHelper.toHashTable(CockpitHelper.frequency);
            //slct_modifyKpiAdvanced_frequency.onchange = _slct_modifyKpiAdvanced_frequencyChanged;
            //slct_modifyKpiAdvanced_compareTo.onchange = _bindDataCalculation;
           
            //auto select
            slct_modifyKpiAdvanced_frequency.dataSrc = ModifyKpiHelper.currentTile.frequency;
            slct_modifyKpiAdvanced_frequency.querySelector(".div_titleItem_select").innerText = listFrequency[ModifyKpiHelper.currentTile.frequency].title;
            slct_modifyKpiAdvanced_frequency.onclick = function () { _bindDataFrequency(listFrequency); };
            //_bindDataCompareTo(ModifyKpiHelper.currentTile.frequency, ModifyKpiHelper.currentTile.compareTo);
            //_bindDataCalculation();
            // slct_modifyKpiAdvanced_calculation.options[ModifyKpiHelper.currentTile.calculation - 1].selected = true;
        });
    }


    function _applyAdvancedConfig() {
        if (ModifyKpiHelper.currentTile.connectorType == ConnectorsTemplate.ConnectorType.GoogleAnalytics)
            ModifyKpiHelper.currentTile.dimensions = null;
        ModifyKpiHelper.currentTile.compareTo = slct_modifyKpiAdvanced_compareTo.value;
        ModifyKpiHelper.currentTile.calculation = slct_modifyKpiAdvanced_calculation.value;
        ModifyKpiHelper.currentTile.frequency = slct_modifyKpiAdvanced_frequency.dataSrc;
        RightMenu.showRightMenu(Pages.modifyKpiResumeStep, null);
    }

  
    function _bindDataFrequency(listFrequency) {
        var type = "selectBox";
        var selectBoxClickCallback = function (idFrequency) {
            slct_modifyKpiAdvanced_frequency.querySelector(".div_titleItem_select").innerText = listFrequency[idFrequency].title;
            slct_modifyKpiAdvanced_frequency.dataSrc = idFrequency;
        };

        Popup.showSelectBox(slct_modifyKpiAdvanced_frequency, CockpitHelper.frequency, selectBoxClickCallback, CDHelper.position.center, type);
    }

    //not testable
    function _bindDataCompareTo(level, compareType) {
        var compare = CockpitHelper.EnumCompareTo[level - 1];
        slct_modifyKpiAdvanced_compareTo.innerHTML = '';
        for (var i = 0; i < compare.length; i++) {
            slct_modifyKpiAdvanced_compareTo.options[slct_modifyKpiAdvanced_compareTo.options.length] = new Option(compare[i].label, compare[i].Code);
            if (compareType == compare[i].Code)
                slct_modifyKpiAdvanced_compareTo.options[slct_modifyKpiAdvanced_compareTo.options.length - 1].selected = true;
        }
        slct_modifyKpiAdvanced_compareTo.focus();
        slct_modifyKpiAdvanced_compareTo.blur();
    }

    //not testable
    function _bindDataCalculation() {
        slct_modifyKpiAdvanced_calculation.innerHTML = '';
        if (slct_modifyKpiAdvanced_calculation.options) {
            slct_modifyKpiAdvanced_calculation.options[slct_modifyKpiAdvanced_calculation.options.length] = new Option(WinJS.Resources.getString("CockpitHelper_byValue").value, 1);
            if (slct_modifyKpiAdvanced_compareTo.value != -1) {
                slct_modifyKpiAdvanced_calculation.options[slct_modifyKpiAdvanced_calculation.options.length] = new Option(WinJS.Resources.getString("CockpitHelper_byPercentege").value, 2);
                slct_modifyKpiAdvanced_calculation.style.display = 'block';
                lbl_modifyKpiAdvanced_calculation.style.display = 'block';
                btn_modifyKpiAdvanced_apply.style.msGridRow = 3;
            }
            else {
                CDHelper.displayHideDiv(slct_modifyKpiAdvanced_calculation, false);
                CDHelper.displayHideDiv(lbl_modifyKpiAdvanced_calculation, false);
                btn_modifyKpiAdvanced_apply.style.msGridRow = 2;
            }

            slct_modifyKpiAdvanced_calculation.options[0].selected = true;
            //refresh list calculations
            slct_modifyKpiAdvanced_calculation.focus();
            slct_modifyKpiAdvanced_calculation.blur();
        }
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showPreviousStep
    -- Description: Navigate to resume page
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showPreviousStep() {
        RightMenu.showRightMenu(Pages.modifyKpiResumeStep, null);
    }

    WinJS.UI.Pages.define(Pages.modifyKpiAdvancedStep, {
        ready: ready,
    });

})();
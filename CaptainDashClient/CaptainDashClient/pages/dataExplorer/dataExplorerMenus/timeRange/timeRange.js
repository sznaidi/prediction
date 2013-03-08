/*-------------------------------
-- Author : [A.A]
-- Creation date : 12/02/2013
------------------------------*/

(function () {
    "use strict";

    var startDate;
    var endDate;

    var DAYS_MAX = 120;
    var MONTHS_MAX = 70;
    var YEARS_MAX = 35;

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(DataExplorerHelper.DataExplorerMenusTitles.timeRange, '', false);
            btn_timeRange_apply.onclick = _setNewDates;
            lbl_timeRange_period.innerText = CDHelper.formatDateToShow(new Date(DataExplorerController.exploration.timestamps[0]), DataExplorerController.exploration.getFrequency()) + ' to ' + CDHelper.formatDateToShow(new Date(DataExplorerController.exploration.timestamps[DataExplorerController.exploration.timestamps.length - 1]), DataExplorerController.exploration.getFrequency());

            _displayDatePicker();
            btn_timeRange_apply.focus();
            timeRangeContent.onkeydown = _onEnterKeyPressed;
        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _setNewDates
    -- Description: Set new dates
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _setNewDates() {
        if (_isValidDate()) {
            DataExplorerController.exploration.setTimeStamps(startDate._currentDate, endDate._currentDate);
            DataExplorerController.getExplorationData(DataExplorerController.exploration, DataExplorer.updateGraphsView);
            CDHelper.showHideLoading(true);
        }
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _isValidDate
    -- Description: check dates validity
    -- Params:
    -- Return: True if valid, False if not
    -------------------------------------------------------*/
    function _isValidDate() {
        lbl_timeRange_error.innerText = '';

        if ((CDHelper.compareDates(endDate._currentDate, startDate._currentDate) < 0) || (CDHelper.getDaysInterval(endDate._currentDate, new Date()) < 32)) {
            if (CDHelper.compareDates(endDate._currentDate, new Date()) > 0) {
                predictInt = CDHelper.getDaysInterval(endDate._currentDate, new Date());
                canPredict = true;
            }
        }
        else {
            lbl_timeRange_error.innerText = MessagesHelper.TXT_DATES_ERROR_NOT_EXIST;
            return false;
        }
        return true;
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _displayDatePicker
    -- Description: display DatePicker
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _displayDatePicker() {

        startDate = new WinJS.UI.DatePicker(date_timeRange_startDate, { current: new Date(DataExplorerController.exploration.timestamps[0]) });
        startDate.monthPattern = "{month.abbreviated(3)}";
        endDate = new WinJS.UI.DatePicker(date_timeRange_endDate, { current: new Date(DataExplorerController.exploration.timestamps[DataExplorerController.exploration.timestamps.length - 1]) });
        endDate.monthPattern = "{month.abbreviated(3)}";

        if (DataExplorerController.exploration.getFrequency() == CDHelper.AggregationType.Monthly) {
            CDHelper.displayHideDiv(document.querySelector("#date_timeRange_startDate .win-datepicker-date"), false);
            CDHelper.displayHideDiv(document.querySelector("#date_timeRange_endDate .win-datepicker-date"), false);
        }
        else if (DataExplorerController.exploration.getFrequency() == CDHelper.AggregationType.Yearly) {
            CDHelper.displayHideDiv(document.querySelector("#date_timeRange_startDate .win-datepicker-date"), false);
            CDHelper.displayHideDiv(document.querySelector("#date_timeRange_endDate .win-datepicker-date"), false);
            CDHelper.displayHideDiv(document.querySelector("#date_timeRange_startDate .win-datepicker-month"), false);
            CDHelper.displayHideDiv(document.querySelector("#date_timeRange_endDate .win-datepicker-month"), false);
        }
        else {//todo mohamed && ala
            //document.querySelector("#date_timeRange_startDate .win-datepicker-date").style.marginLeft = '-187px';
            //document.querySelector("#date_timeRange_endDate .win-datepicker-date").style.marginLeft = '-187px';
            //document.querySelector("#date_timeRange_startDate .win-datepicker-month").style.marginLeft = '95px';
            //document.querySelector("#date_timeRange_endDate .win-datepicker-month").style.marginLeft = '95px';
            //document.querySelector("#date_timeRange_startDate .win-datepicker-year").style.marginLeft = '95px';
            //document.querySelector("#date_timeRange_endDate .win-datepicker-year").style.marginLeft = '95px';
        }
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: onEnterKeyPressed
    -- Description: Add dashboard on press Enter Key
    -- Params: Event
    -- Return:
    -------------------------------------------------------*/
    function _onEnterKeyPressed(e) {
        if (e.keyCode == 13) {
            timeRangeContent.blur();
            _setNewDates();
            return false;
        }
    }

    WinJS.UI.Pages.define(Pages.timeRangeMenu, {
        ready: ready,
    });

})();
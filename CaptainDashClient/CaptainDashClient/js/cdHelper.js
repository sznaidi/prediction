//[A.A] creation date : 17/12/2012

(function () {
    "use strict";
    var isApiConfigLoaded = false;
    var listMetrics;
    var _applicationName = Windows.ApplicationModel.Package.current.id.familyName;

    var month_janvier = WinJS.Resources.getString('month_janvier').value;
    var month_fevrier = WinJS.Resources.getString('month_fevrier').value;
    var month_mars = WinJS.Resources.getString('month_mars').value;
    var month_avril = WinJS.Resources.getString('month_avril').value;
    var month_mai = WinJS.Resources.getString('month_mai').value;
    var month_juin = WinJS.Resources.getString('month_juin').value;
    var month_juillet = WinJS.Resources.getString('month_juillet').value;
    var month_aout = WinJS.Resources.getString('month_aout').value;
    var month_septembre = WinJS.Resources.getString('month_septembre').value;
    var month_octobre = WinJS.Resources.getString('month_octobre').value;
    var month_novembre = WinJS.Resources.getString('month_novembre').value;
    var month_decembre = WinJS.Resources.getString('month_decembre').value;
    var _month = [month_janvier, month_fevrier, month_mars, month_avril, month_mai, month_juin, month_juillet, month_aout, month_septembre, month_octobre, month_novembre, month_decembre];

    var AggregationType = {
        Yearly: 1,
        Monthly: 2,
        Daily: 3
    };

    var _TEXT_NEW_GROUP = WinJS.Resources.getString("DefaultWidget_newGroup").value;
    var _KEY_NEW_GROUP = "addGroup";
    var _TEXT_NEW_DASHBOARD = WinJS.Resources.getString("DefaultWidget_newDashboard").value;
    var _KEY_NEW_DASHBOARD = "add dashboard";

    var ConnectorType = {
        GoogleAnalytics: "GoogleAnalytics",
        Twitter: "Twitter",
        Atlas: "Atlas",
        FoursquarePrivate: "FoursquarePrivate",
        FoursquarePublic: "FoursquarePublic",
        FacebookFanpage: "FacebookFanpage",
        FacebookInsights: "FacebookInsights",
        CustomTwitter: "CustomTwitter",
        CustomFacebookInsights: "CustomFacebookInsights",
        CustomGoogleAnalytics: "CustomGoogleAnalytics"
    };

    var DAYLY_INTERVAL = 30;
    var MONTHLY_INTERVAL = 6;
    var YEARLY_INTERVAL = 3;

    window.addEventListener("resize", onResizeCD, true);

    var resizeActivated = true;

    Windows.UI.ViewManagement.InputPane.getForCurrentView().onshowing = function () {
        resizeActivated = false;
    }

    Windows.UI.ViewManagement.InputPane.getForCurrentView().onhiding = function () {
        setTimeout(function () { resizeActivated = true; }, 100);
    }

    function onResizeCD() {
        try
        {
            if (resizeActivated) {
                switch (WinJS.Navigation.location) {
                    case Pages.dataSources:
                        {
                            DataSources.onResize();
                            break;
                        }
                    case Pages.dashboards:
                        {
                            Dashboards.onResize();
                            break;
                        }
                    case Pages.help:
                        {
                            Help.onResize();
                            break;
                        }
                    case Pages.cockpits:
                        {
                            Cockpits.onResize();
                            break;
                        } 
                    case Pages.dataExplorer:
                        {
                            DataExplorer.onResize();
                            break;
                        }
                    case Pages.search:
                        {
                            Search.onResize();
                            break;
                        }
                    default: break;
                }
            }
        }
        catch (exp)
        {
            //page is not loaded yet
        }
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: showHideLoading
    -- Description: activate or desactivate all controls
    -- Params: true to activate, false to desactivate
    -- Return: No one
    -------------------------------------------------------*/
    function showHideLoading(activateLoading) {
        if (activateLoading) {
            coverControls.style.visibility = 'visible';
            loadingBar.style.display = "-ms-grid";
        }
        else {
            coverControls.style.visibility = 'hidden';
            loadingBar.style.display = "none";
        }
    }

    //Description: show or hide <div/>
    //Input: div to hide or to show, true to display or false to hide
    //Output:
    function displayHideDiv (div, isDisplayed) {
        if (div.style) {
            if (isDisplayed)
                return div.style.display = '-ms-grid';
            else
                return div.style.display = 'none';
        }
    } 
    
    //Description: test if it's a valid string (no ' " `)
    //Input: string
    //Output: true if it's valid, false if not
    function isValidFormat(chaine) {
        if ((chaine.indexOf('\"') != -1) || (chaine.indexOf('\'') != -1) || (chaine.indexOf('\`') != -1))
            return false;
        else
            return true;
    }

    //Description: strip the spaces of a string
    //Input: string to strip
    //Output: string striped
    function trim(string) {        
        string = string || "";
        return string.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '');
    }
    
    /*------------------------------------------------------
    -- Author: HK
    -- Name: requireScriptJS
    -- Description: 
    --   load the given script URL if not loaded
    -- Params: the required script path
    -- Return: none
    -------------------------------------------------------*/
    function requireScriptJS(scriptPath) {
        //verify if script is loaded
        if (!isScriptLoaded(scriptPath)) {
            //get head section
            var head = document.getElementsByTagName('head')[0];
            //create script element from given URL
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = scriptPath;
            //append creat script element to head section
            head.appendChild(script);
        }
    }

    /*------------------------------------------------------
    -- Author: [A.A]
    -- Name: unloadScriptJS
    -- Description: remove the given url
    -- Params: script to be removed
    -- Return: none
    -------------------------------------------------------*/
    function unloadScriptJS(scriptPath) {
        //get head section
        var head = document.getElementsByTagName('head')[0];
        
        //remove script element from given URL
        var scripts = document.querySelectorAll('script[src="' + scriptPath + '"]');
        if (scripts.length > 0) {
            head.removeChild(scripts[0]);
        } 
    }
    
    /*------------------------------------------------------
    -- Author: HK
    -- Name: isScriptLoaded
    -- Description: 
    --   verify if the given script url is loaded or not
    -- Params: the required script path
    -- Return: boolean(true = script loaded)
    -------------------------------------------------------*/
    function isScriptLoaded(scriptPath) {
        //get loaded script by src attribute 
        var scripts = document.querySelectorAll('script[src="' + scriptPath + '"]');
        scripts = (scripts.length == 0) ? document.querySelectorAll('script[src="ms-appx://' + Windows.ApplicationModel.Package.current.id.name.toLowerCase() + scriptPath + '"]') : scripts;

        if (scripts.length > 0) {
            //script is loaded
            return true;
        }

        //script is not loaded
        return false;
    }

    function parseODataDate(date) {
        var dateRegex = /^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/;
        var result = date;
        var matches = dateRegex.exec(date);
        if (matches) {
            result = new Date(parseInt(matches[1], 10));
            if (matches[2]) {
                var offset = parseInt(matches[3], 10);
                if (matches[2] === "-") {
                    offset = -offset;
                }
                result.setUTCMinutes(result.getUTCMinutes() - offset);
            }
        }
        return result;
    }

    function formatDateWithSince(date, ref_date) {
        //Date Formats must be be ordered smallest -> largest and must end in a format with ceiling of null
        var date_formats = {
            past: [
              { ceiling: 60, text: "$seconds " + WinJS.Resources.getString("cdHelper_secondsAgo").value },
              { ceiling: 3600, text: "$minutes " + WinJS.Resources.getString("cdHelper_minutesAgo").value },
              { ceiling: 86400, text: "$hours " + WinJS.Resources.getString("cdHelper_hoursAgo").value },
              { ceiling: 2629744, text: "$days " + WinJS.Resources.getString("cdHelper_daysAgo").value },
              { ceiling: 31556926, text: "$months " + WinJS.Resources.getString("cdHelper_monthsAgo").value },
              { ceiling: null, text: "$years " + WinJS.Resources.getString("cdHelper_yearAgo").value }
            ],
            future: [
              { ceiling: 60, text:  WinJS.Resources.getString("cdHelper_in").value + " $seconds " + WinJS.Resources.getString("cdHelper_seconds").value },
              { ceiling: 3600, text:  WinJS.Resources.getString("cdHelper_in").value + " $minutes " + WinJS.Resources.getString("cdHelper_minutes").value },
              { ceiling: 86400, text: WinJS.Resources.getString("cdHelper_in").value + " $hours " + WinJS.Resources.getString("cdHelper_hours").value },
              { ceiling: 2629744, text: WinJS.Resources.getString("cdHelper_in").value + " $days " + WinJS.Resources.getString("cdHelper_days").value },
              { ceiling: 31556926, text: WinJS.Resources.getString("cdHelper_in").value + " $months " + WinJS.Resources.getString("cdHelper_months").value },
              { ceiling: null, text: WinJS.Resources.getString("cdHelper_in").value + " $years " + WinJS.Resources.getString("cdHelper_year").value }
            ]
        };
        //Time units must be be ordered largest -> smallest
        var time_units = [
          [31556926, 'years'],
          [2629744, 'months'],
          [86400, 'days'],
          [3600, 'hours'],
          [60, 'minutes'],
          [1, 'seconds']
        ];

        ref_date = ref_date ? new Date(ref_date) : new Date();
        var seconds_difference = (ref_date - (new Date(date))) / 1000;

        var tense = 'past';
        if (seconds_difference < 0) {
            tense = 'future';
            seconds_difference = 0 - seconds_difference;
        }

        function get_format() {
            for (var i = 0; i < date_formats[tense].length; i++) {
                if (date_formats[tense][i].ceiling == null || seconds_difference <= date_formats[tense][i].ceiling) {
                    return date_formats[tense][i];
                }
            }
            return null;
        }

        function get_time_breakdown() {
            var seconds = seconds_difference;
            var breakdown = {};
            for (var i = 0; i < time_units.length; i++) {
                var occurences_of_unit = Math.floor(seconds / time_units[i][0]);
                seconds = seconds - (time_units[i][0] * occurences_of_unit);
                breakdown[time_units[i][1]] = occurences_of_unit;
            }
            return breakdown;
        }

        function render_date(date_format) {
            var breakdown = get_time_breakdown();
            var time_ago_text = date_format.text.replace(/\$(\w+)/g, function () {
                return breakdown[arguments[1]];
            });
            return depluralize_time_ago_text(time_ago_text, breakdown);
        }

        function depluralize_time_ago_text(time_ago_text, breakdown) {
            for (var i in breakdown) {
                if (breakdown[i] == 1) {
                    var regexp = new RegExp("\\b" + i + "\\b");
                    time_ago_text = time_ago_text.replace(regexp, function () {
                        return arguments[0].replace(/s\b/g, '');
                    });
                }
            }
            return time_ago_text;
        }

        return render_date(get_format());
    }

    function capitaliseOnlyFirstLetter(string) {
        if ((string != '') && (string != undefined) && (string != null) && (typeof (string) == 'string')) {
            var groupElem = string.substr(0, 1).toUpperCase() + string.substr(1, string.length).toLowerCase();

            return groupElem;
        }
        else
            return string;
    }

    function getUtcTime(callback) {
        WinJS.xhr({
            type: "GET",
            url: "http://json-time.appspot.com/time.json?tz=UTC"
        }).then(function (data) {
            var stringData = JSON.parse(data.response).datetime;
            var date = new Date(stringData);
            callback(date);
        },
        function (err) {
            callback(null);
        });
    }

    function getLastUpdate(updatedAt, createdAt) {
        var lastUpdate = parseODataDate((updatedAt == createdAt) ? createdAt : updatedAt);
        var dateNow = new Date;
        getUtcTime(function (dateUTC) {
            if (dateUTC)
                dateNow = dateUTC;
        });
        lastUpdate = formatDateWithSince(lastUpdate, dateNow);
        if (lastUpdate == WinJS.Resources.getString("cdHelper_onDayAgo").value)
            lastUpdate = WinJS.Resources.getString("cdHelper_yesterday").value;
        return lastUpdate;
    }

    function getYesterdayDate() {
        var yesterday = new Date();
        yesterday.setUTCDate(yesterday.getUTCDate() - 1);
        return yesterday;
    }

    function getDefaultStartDateFromFrequency(endDate, frequency) {
        var startDate = getYesterdayDate();
        switch (parseInt(frequency)) {
            case CDHelper.AggregationType.Daily: {
                startDate.setUTCDate(endDate.getUTCDate() - 30);
                break;
            }
            case CDHelper.AggregationType.Monthly: {
                startDate.setUTCMonth(endDate.getUTCMonth() - 5);
                break;
            }
            case CDHelper.AggregationType.Yearly: {
                startDate.setUTCFullYear(endDate.getUTCFullYear() - 3);
                break;
            }
        }
        return startDate;
    }

    function getIntervalFromFrequency(frequency) {
        switch (parseInt(frequency)) {
            case CDHelper.AggregationType.Daily: {
                return DAYLY_INTERVAL;
            }
            case CDHelper.AggregationType.Monthly: {
                return MONTHLY_INTERVAL;
            }
            case CDHelper.AggregationType.Yearly: {
                return YEARLY_INTERVAL;
            }
        }
    }

    function formatDateToShow(date, frequency) {
        switch (parseInt(frequency)) {
            case CDHelper.AggregationType.Daily: {
                return (date.getUTCDate() + 1) + ' ' + date.toString().split(' ')[1] + ' ' + date.getUTCFullYear();
            }
            case CDHelper.AggregationType.Monthly: {
                return date.toString().split(' ')[1] + ' ' + date.getUTCFullYear();
            }
            case CDHelper.AggregationType.Yearly: {
                return date.getUTCFullYear();
            }
        }
    }

    function compareDates(date1, date2) {
        var s1 = new Date(date1.getUTCFullYear(), date1.getUTCMonth(), date1.getUTCDate());
        var s2 = new Date(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate());
        var diff = s1.getTime() - s2.getTime();
        return (diff == 0 ? diff : diff / Math.abs(diff));
    }

    function getDaysInterval(date1, date2) {
        try {
            var one_day = 1000 * 60 * 60 * 24;
            var _Diff = Math.ceil((date1.getTime() - date2.getTime()) / (one_day)) + 1;
            return _Diff;
        }
        catch (ex) {
            return 0;
        }
    }

    function getMonthsInterval(date1, date2) {
        try {
            var months;
            months = (date1.getUTCFullYear() - date2.getUTCFullYear()) * 12;
            months -= date2.getUTCMonth() + 1;
            months += date1.getUTCMonth();
            return months + 1;
        } catch (e) {
            return 0;
        }
    }

    function getFrequencyLabel(frequency) {
        switch (parseInt(frequency)) {
            case CDHelper.AggregationType.Daily: {
                return WinJS.Resources.getString("DataExplorerHelper_daily").value;
            }
            case CDHelper.AggregationType.Monthly: {
                return WinJS.Resources.getString("DataExplorerHelper_monthly").value;
            }
            case CDHelper.AggregationType.Yearly: {
                return WinJS.Resources.getString("DataExplorerHelper_yearly").value;
            }
        }
    }

    //function sendMail() {
    //    var to = "";
    //    var subject = "voila";
    //    var body = "voila voila";

    //    var uri = new Uri('mailto:{0}?subject={1}&body={2}'.format(to, subject, body));
    //    return Launcher.launchUriAsync(uri);
    //}
    
    /*------------------------------------------------------
    -- Author: [M.C]
    -- Name: convertColorToHex
    -- Description: convert color to hex
    -- Params: color (rgb format)
    -- Return: color (hex color)
    -------------------------------------------------------*/
    function convertColorToHex(color) {
        var hexColor = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(color);
        return hexColor ? '#' + (1 << 24 | hexColor[1] << 16 | hexColor[2] << 8 | hexColor[3]).toString(16).substr(1) : color;
    };

    /*------------------------------------------------------
    -- Author: HK
    -- Name: toHashTable
    -- Description: transforms a simple array to hashed array
    -- Params: array
    -- Return: hashed array
    -------------------------------------------------------*/
    function toHashTable(array) {
        var hashedList = [];

        for (var indexArray = 0; indexArray < array.length; indexArray++) {
            hashedList[array[indexArray].id] = array[indexArray];
        }
        return hashedList;
    }

    /* ------------------------------------------------------
      -- Author: [S.H]
      -- Name: showInputBox
      -- Description: show text to add new group
      -- Params: name of current drop down list, input name and back btn name
      -- Return: No one
      -------------------------------------------------------*/
    function showInputBox(selectName, inputName, backButtonName) {
        CDHelper.displayHideDiv(selectName, false);
        CDHelper.displayHideDiv(inputName, true);
        CDHelper.displayHideDiv(backButtonName, true);
        inputName.value = '';
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: showSelectGroup
    -- Description: show list groups
    -- Params: name of current drop down list, input name and back btn name
    -- Return: No one
    -------------------------------------------------------*/
    function showSelectBox(selectName, inputName, backButtonName) {
        CDHelper.displayHideDiv(selectName, true);
        CDHelper.displayHideDiv(inputName, false);
        CDHelper.displayHideDiv(backButtonName, false);
        inputName.value = '';
    }


    function addCommas(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }

        return x1 + x2;
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: filterMetrics
    -- Description: return list metrics filtred by connector type
    -- Params: list metrics, connector type
    -- Return: list metrics filtred by type
    -------------------------------------------------------*/
    function filterMetrics(listMetricsFromServer, connectorType) {
        listMetrics = [];
        listMetrics[ConnectorType.GoogleAnalytics] = [];
        listMetrics[ConnectorType.Twitter] = [];
        listMetrics[ConnectorType.Atlas] = [];
        listMetrics[ConnectorType.FacebookFanpage] = [];
        listMetrics[ConnectorType.FacebookInsights] = [];
        listMetrics[ConnectorType.FoursquarePublic] = [];
        listMetrics[ConnectorType.FoursquarePrivate] = [];
        listMetrics[ConnectorType.CustomTwitter] = [];
        listMetrics[ConnectorType.CustomFacebookInsights] = [];
        listMetrics[ConnectorType.CustomGoogleAnalyticse] = [];

        switch (connectorType) {
            case ConnectorType.GoogleAnalytics: {
                listMetrics[ConnectorType.GoogleAnalytics] = listMetricsFromServer.GoogleAnalytics;
                break;
            }
            case ConnectorType.Twitter: {
                listMetrics[ConnectorType.Twitter] = listMetricsFromServer.Twitter;
                break;
            }
            case ConnectorType.Atlas: {
                listMetrics[ConnectorType.Atlas] = listMetricsFromServer.Atlas;
                break;
            }
            case ConnectorType.FacebookFanpage: {
                listMetrics[ConnectorType.FacebookFanpage] = listMetricsFromServer.FacebookFanpage;
                break;
            }

            case ConnectorType.FacebookInsights: {
                listMetrics[ConnectorType.FacebookInsights] = listMetricsFromServer.FacebookInsights;
                break;
            }

            case ConnectorType.FoursquarePublic: {
                listMetrics[ConnectorType.FoursquarePublic] = listMetricsFromServer.FoursquarePublic;
                break;
            }

            case ConnectorType.FoursquarePrivate: {
                listMetrics[ConnectorType.FoursquarePrivate] = listMetricsFromServer.FoursquarePrivate;
                break;
            }

            case ConnectorType.CustomTwitter: {
                listMetrics[ConnectorType.CustomTwitter] = listMetricsFromServer.CustomTwitter;
                break;
            }

            case ConnectorType.CustomFacebookInsights: {
                listMetrics[ConnectorType.CustomFacebookInsights] = listMetricsFromServer.CustomFacebookInsights;
                break;
            }

            case ConnectorType.CustomGoogleAnalytics: {
                listMetrics[ConnectorType.CustomGoogleAnalytics] = listMetricsFromServer.CustomGoogleAnalytics;
                break;
            }

            default:
                break;
         }
        return _formatListMetrics(listMetrics[connectorType]);
    }


    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _formatListMetrics
    -- Description: 
    -- Params: list metrics by type
    -- Return: list metrics filtred by type (formatted)
    -------------------------------------------------------*/
    function _formatListMetrics(list) {
        var filtredListMetrics = [];
        for (var element in list) {
            filtredListMetrics.push({ id: parseInt(element), name: capitaliseOnlyFirstLetter(list[element].name) }); 
        }
        return filtredListMetrics;
    }

    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: getListMetrics
   -- Description: 
   -- Params:type connector, succeed callback, failed callback
   -- Return: 
   -------------------------------------------------------*/
    function getListMetrics(connectorType, getMetricsSucceed, getMetricsfailed) {
        var filtredListMetrics;
          // List is full
        if (CDHelper.listMetrics) {
            _getMetrics(CDHelper.listMetrics)
        }

        else
           // List is empty
            ConnectorsServices.getMetrics(_getMetrics, getMetricsfailed);

        function _getMetrics(listMetricsFromServer) {
            filtredListMetrics = CDHelper.filterMetrics(listMetricsFromServer, connectorType);
            getMetricsSucceed(filtredListMetrics);
        }
    }

    /* ------------------------------------------------------
   -- Author: [A.A]
   -- Name: getMetricLabelFromCode
   -- Description:
   -- Params: code metric, connectorId, callback
   -- Return: metric
   -------------------------------------------------------*/
    function getMetricLabelFromCode(codeMetric, connectorId, callBackGetMetricSucceed, callBackGetMetricFailed) {
        var connector = DataSourcesHelper.getConnectorById(connectorId);

        var _callBackGetMetricSucceed = function (metrics) {
            for (var count = 0; count < metrics.length; count++) {
                if (metrics[count].id == codeMetric) {
                    callBackGetMetricSucceed(metrics[count]);
                    return;
                }
            }
        }

        if (connector.thrift_type)
            getListMetrics(connector.thrift_type, _callBackGetMetricSucceed, callBackGetMetricFailed);
    }

    /* ------------------------------------------------------
   -- Author: [A.A]
   -- Name: getReleaseStageLabel
   -- Description: get release stage label
   -- Params:
   -- Return: release stage label
   -------------------------------------------------------*/
    function getReleaseStageLabel() {
        var build = Windows.ApplicationModel.Package.current.id.version.build;
        switch (build) {
            case 0: {
                return "Developer";
                break;
            }
            case 1: {
                return "Q&A";
                break;
            }
            case 2: {
                return "Store";
                break;
            }
        }
    }

    /* ------------------------------------------------------
   -- Author: [A.A]
   -- Name: getDateWithTimezone
   -- Description: get date + time zone
   -- Params:
   -- Return: current date
   -------------------------------------------------------*/
    function getDateWithTimezone() {
        var currentDate = new Date();
        var currentTimeZone = currentDate.getTimezoneOffset();
        currentTimeZone = (currentTimeZone >= 0) ? " GMT +" + currentTimeZone / 60 : " GMT " + currentTimeZone / 60;
        currentDate = currentDate + currentTimeZone;
        return currentDate;
    }
    /* ------------------------------------------------------
   -- Author: [S.Z]
   -- Name: capitaliseFirstLetter
   -- Description: capitalise first letter
   -- Params: string
   -- Return: string
   -------------------------------------------------------*/
    function capitaliseFirstLetter(string) {
        if (typeof (string) == 'string')
            return string.charAt(0).toUpperCase() + string.slice(1);
        else
            return string;
    }

    WinJS.Namespace.define("CDHelper", {
        convertColorToHex:convertColorToHex,
        displayHideDiv: displayHideDiv,
        isValidFormat: isValidFormat,
        trim: trim,
        requireScriptJS: requireScriptJS,
        unloadScriptJS: unloadScriptJS,
        formatDateWithSince: formatDateWithSince,
        parseODataDate: parseODataDate,
        capitaliseOnlyFirstLetter: capitaliseOnlyFirstLetter,
        getUtcTime: getUtcTime,
        getLastUpdate: getLastUpdate,
        isApiConfigLoaded: { set: function (value) { isApiConfigLoaded = value; }, get: function () { return isApiConfigLoaded; } },
        showHideLoading: showHideLoading,
        placement: { top: "top", bottom: "bottom" },
        position: { left: "left", right: "right", center: "center" },
        errorCode: { notFound: 404, revokeAccess: 403 },
        buttonClickKey: { left: 0, right: 2 },
        AggregationType: AggregationType,
        getDefaultStartDateFromFrequency: getDefaultStartDateFromFrequency,
        formatDateToShow: formatDateToShow,
        getYesterdayDate: getYesterdayDate,
        compareDates: compareDates,
        getDaysInterval: getDaysInterval,
        getMonthsInterval: getMonthsInterval,
        toHashTable: toHashTable,
        getFrequencyLabel: getFrequencyLabel,
        addCommas: addCommas,
        getIntervalFromFrequency: getIntervalFromFrequency,
        showInputBox: showInputBox,
        showSelectBox: showSelectBox,
        textNewGroup: _TEXT_NEW_GROUP,
        keyNewGroup: _KEY_NEW_GROUP,
        DAYLY_INTERVAL: DAYLY_INTERVAL,
        MONTHLY_INTERVAL: MONTHLY_INTERVAL,
        YEARLY_INTERVAL: YEARLY_INTERVAL,
        filterMetrics: filterMetrics,
        ConnectorType: ConnectorType,
        listMetrics: listMetrics,
        getListMetrics: getListMetrics,
        getMetricLabelFromCode: getMetricLabelFromCode,
        txtNewDashboard: _TEXT_NEW_DASHBOARD,
        keyNewDashboard: _KEY_NEW_DASHBOARD,
        getReleaseStageLabel: getReleaseStageLabel,
        month: { get: function () { return _month; } },
        getDateWithTimezone: getDateWithTimezone,
        capitaliseFirstLetter: capitaliseFirstLetter,
        applicationName: { get: function () { return _applicationName; } },
        isScriptLoaded: isScriptLoaded
    });

})(); 
(function () {
    "use strict";

    function exceptionHandler(error, send) {
        //Log the last-chance exception (as a crash) MarkedUp
        MK.logLastChanceException(error);
        //Bugsnag
        CDHelper.requireScriptJS(Scripts.bugsnag);
        // application version
        var appVersion = Windows.ApplicationModel.Package.current.id.version;
        var appVersionAsNumber = appVersion.major + "." + appVersion.minor + "." + appVersion.build + "." + appVersion.revision;
        var applicationVersion = Windows.ApplicationModel.Package.current.id.name + ' ' + appVersionAsNumber;
        // the current page
        var currentPage = WinJS.Navigation.location;
        var payload = BugsnagTemplate.Payload;
        var event = BugsnagTemplate.Event;
        event.userId = BugsnagTemplate.Event.userId;
        event.appVersion = applicationVersion;
        event.osVersion = navigator.appVersion;
        event.releaseStage = CDHelper.getReleaseStageLabel();
        var exception = BugsnagTemplate.Exception;
        var stackTrace = [];
        if (send == 0) {
            BugsnagTemplate.MetaData.sent.sent = "No";
        }
        else {
            BugsnagTemplate.MetaData.sent.sent = "Yes";
        }

        var detail;

        if (error.detail.error)

            detail = error.detail.error;

        else if (error.detail.exception)

            detail = error.detail.exception;

        if (detail) {
            if (detail.stack) {
                var Stack = detail.stack;
                var stackArray = Stack.replace(/^[^(]*\(/, "").replace(/\)[^(]*$/, "").split(/\)[^(]*\(/);
                event.context = stackArray[0];

                BugsnagTemplate.MetaData.lineCode.line = stackArray[0];
                var stkArray = Stack.split(" at ");
                for (var element in stkArray) {
                    if (element > 0) {
                        var stack = stkArray[element].split("(")[1];
                        stackTrace.push({ file: stack.split(":")[1], lineNumber: stack.split(":")[2], method: stkArray[element].split("(")[0] });
                    }
                }
                exception.errorClass = detail.name;
                exception.message = detail.message;
                exception.stacktrace = stackTrace;

            }
            else { /* if Stack trace is not available : here only error case is handled */
                BugsnagTemplate.MetaData.lineCode.line = detail.lineno;
                event.context = detail.filename;
                exception.errorClass = detail.type;
                exception.message = detail.message;
                exception.stacktrace.push({ file: detail.filename, lineNumber: detail.lineno, method: 'null' });
            }

        }
        else {
            /* should be handled */
            BugsnagTemplate.MetaData.lineCode.line = error.type;
            event.context = error.type;
            exception.errorClass = error.type;
            exception.message = error.type;
            exception.stacktrace.push({ file: error.type, lineNumber: error.type, method: 'Neither error or exception' });
        }
        event.metaData = BugsnagTemplate.MetaData;
        event.exceptions = [];
        event.exceptions.push(exception);
        payload.events = [];
        payload.events.push(event);
        var params = JSON.stringify(payload);

        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Post, BugsnagTemplate.baseUrlBugsnag, params, BugsnagTemplate.headers,
            function (e) {
                if (WinJS.Navigation.location === Pages.cockpits) {
                    WinJS.Navigation.navigate(Pages.dashboards);
                } else {
                    WinJS.Navigation.navigate(WinJS.Navigation.location);
                }
            },
            function (e) {
               
            });
        request.launchService();
    }

    WinJS.Namespace.define("ErrorManager", {
        exceptionHandler: exceptionHandler,
    });
})();
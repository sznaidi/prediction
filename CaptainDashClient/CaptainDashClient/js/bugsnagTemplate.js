(function () {
    var Notifier = {
        name: "Bugsnag Js",
        version: "1.0.5",
        url: ConnectorsApiHelper.BugSnagNotifierUrl
    };

    var Payload = {
        apiKey: ConnectorsApiHelper.BugSnagApiKey,
        notifier: Notifier,
        events: []
    };

    var Event = {
        userId: "",
        appVersion: "",
        osVersion: "",
        releaseStage: "",
        context: "",
        exceptions: [],
        metaData:""
    };

    var Exception = {
        errorClass: "",
        message: "",
        stacktrace: []
    };

    var MetaData = {

        //User Info to send on sign In
        user: {
            firstName: '',
            lastName: '',
            version: '',
            date: '',
            osVersion: '',
            email: '',
            packageName: ''
        },
        
        lineCode: { line: "" },
        sent: { sent: ""}
    };

    var StackTrace = {
        file: "",
        lineNumber: "",
        method: "",
        inProject: true,
    };

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: formatBeforeSendVersion
    -- Description: format bugsnag object before send version
    -- Params: current user
    -- Return: payload
    -------------------------------------------------------*/
    function formatBeforeSendVersion(user) {
        var appVersion = Windows.ApplicationModel.Package.current.id.version;

        var event = BugsnagTemplate.Event
        event.userId = user.id;
        event.appVersion = appVersion.major + "." + appVersion.minor + "." + appVersion.build + "." + appVersion.revision;
        event.osVersion = navigator.appVersion;
        event.releaseStage = CDHelper.getReleaseStageLabel();
        event.context = "SignIn";

        var exception = BugsnagTemplate.Exception;
        exception.errorClass = "Version ";
        exception.message = event.appVersion;

        var stackTrace = BugsnagTemplate.StackTrace;
        stackTrace.file = "Date ";
        stackTrace.lineNumber = CDHelper.getDateWithTimezone();

        var metaData = BugsnagTemplate.MetaData;
        metaData.user.firstName = user.first_name;
        metaData.user.lastName = user.last_name;
        metaData.user.email = user.email;
        metaData.user.version = event.appVersion;
        metaData.user.date = CDHelper.getDateWithTimezone();
        metaData.user.osVersion = event.osVersion;
        metaData.user.packageName = Windows.ApplicationModel.Package.current.id.name;

        event.metaData = metaData;
        exception.stacktrace.push(stackTrace);
        event.exceptions.push(exception);

        var payload = BugsnagTemplate.Payload;
        payload.events.push(event);

        return payload;
    }

    /* ------------------------------------------------------
      -- Author: [S.Z]
      -- Name: _fillUserBugsnag
      -- Description: fill bugsnag user
      -- Params: user
      -- Return: No one
      -------------------------------------------------------*/
    function fillUserBugsnag(user) {
        var metaData = BugsnagTemplate.MetaData;
        metaData.user.firstName = user.first_name;
        metaData.user.lastName = user.last_name;
        metaData.user.email = user.email;
        metaData.user.version = event.appVersion;
        metaData.user.date = CDHelper.getDateWithTimezone();
        metaData.user.osVersion = event.osVersion;
        metaData.user.packageName = Windows.ApplicationModel.Package.current.id.name;
    }

    WinJS.Namespace.define("BugsnagTemplate",
        {
            baseUrlBugsnag: ConnectorsApiHelper.BugSnagBaseUrl,
            headers: { "Content-Type": "application/json" },
            Payload: Payload,
            Event: Event,
            Notifier: Notifier,
            Exception: Exception,
            MetaData: MetaData,
            StackTrace: StackTrace,
            formatBeforeSendVersion: formatBeforeSendVersion,
            fillUserBugsnag: fillUserBugsnag
        }
    );
})();
// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
    var apiConfigUrl = "http://www.captain-dash.com/cd_win8_ConfigApi/api.html";
    var messageConfigUrlBase = "http://www.captain-dash.com/cd_win8_ConfigMessage/";
    var messageConfigUrlPage = "/message.html";
    var _applicationName = Windows.ApplicationModel.Package.current.id.familyName;
    var _vault = new Windows.Security.Credentials.PasswordVault();
    
    app.addEventListener("activated", function (args) {
        //init search query
        CDHelper.requireScriptJS(Scripts.searchController);
        SearchController.searchQuery = args.detail.queryText;

        //get api configuration
        _getApiConfig();

        //get message configuration
        _getMessageConfig();

        //initialize charm menu listenners
        CharmeMenu.initializeSettings();

        _checkVersionAndLaunch(args);

    });

    function _checkVersionAndLaunch(args) {
        if (!ConnectionHelper.hasInternetConnection()) {
            splashScreen.style.display = "block";
            CDHelper.requireScriptJS(Scripts.messageHelper);
            Messages.showTryAgainMessage(MessagesHelper.MSG_NO_INTERNET_TITLE, MessagesHelper.MSG_NO_INTERNET_TEXT, function () { _checkVersionAndLaunch(args) });
        }
        else {
            splashScreen.style.display = "none";
            var currentAppVersion = Windows.ApplicationModel.Package.current.id.version;
            var currentAppVersionAsNumber = currentAppVersion.major + "." + currentAppVersion.minor + "." + currentAppVersion.build + "." + currentAppVersion.revision;
            var currentVersion = currentAppVersionAsNumber;

            var _getVersionSuccess = function (data) {
                var storeAppVersion = JSON.parse(data.response);
                var storeAppVersionAsNumber = storeAppVersion.major + "." + storeAppVersion.minor + "." + storeAppVersion.build + "." + storeAppVersion.revision;

                // compare required version with current version
                if (parseFloat(storeAppVersionAsNumber) <= parseFloat(currentAppVersionAsNumber)) {
                    if (args.detail.kind === activation.ActivationKind.launch) {
                        if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                            // TODO: This application has been newly launched. Initialize
                            // your application here.
                        } else {
                            // TODO: This application has been reactivated from suspension.
                            // Restore application state here.
                        }

                        if (app.sessionState.history) {
                            nav.history = app.sessionState.history;
                        }

                        args.setPromise(WinJS.UI.processAll().then(function () {
                            if (nav.location) {
                                nav.history.current.initialPlaceholder = true;
                                return nav.navigate(nav.location, nav.state);
                            } else {
                                Application.navigator.goToStartPage();
                            }
                        }));
                    }
                    else if (args.detail.kind === activation.ActivationKind.search) {
                        RightMenu.showHideRightMenu(false);
                        if (app.sessionState.history) {
                            nav.history = app.sessionState.history;
                        }

                        args.setPromise(WinJS.UI.processAll().then(function () {
                            if (nav.location && nav.location != Pages.login) {
                                nav.history.current.initialPlaceholder = true;
                                return nav.navigate(Pages.search, {searchQuery: SearchController.searchQuery});
                            } else if (nav.location && nav.location == Pages.login) {
                                Application.navigator.goToStartPage(false);
                                CDHelper.requireScriptJS(Scripts.intro);
                                Intro.stopIntro();
                                return;
                            }
                            else {
                                Application.navigator.goToStartPage(false);
                            }
                        }));
                    }
                }
                else {
                    Messages.showLinkedMessage(MessagesHelper.MSG_UPDATE_REQUIRED_TITLE, MessagesHelper.MSG_UPDATE_REQUIRED_TEXT, MessagesHelper.MSG_UPDATE_REQUIRED_LINK, function (e) {
                        window.open("ms-windows-store:updates");
                        WinJS.Application.stop();
                        WinJS.Application._terminateApp(null, e);
                    });
                }
            }

            var _getVersionFailed = function (error) {
                Messages.showOkMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR, function () { _checkVersionAndLaunch(args) });
            }

            var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Post, "http://www.captain-dash.com/cd_win8_required_version/version_test.json", null, { "Content-type": "application/json; charset=utf-8" }, _getVersionSuccess, _getVersionFailed);
            request.launchService();
        }

    }

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    document.addEventListener("visibilitychange", function (args) {
        // HK: This application is about to change visibility state
        if (args.currentTarget.hidden) {
            Cockpits.updateDynamicTile();
        }
    }, false);

    app.onerror = function (error) {
        return new WinJS.Promise(function (onComplete, onError, onProgress) {
            var send;
            Messages.showErrorMessage(MessagesHelper.APP_EXCEPTION_TITLE, MessagesHelper.APP_EXCEPTION_MESSAGE, function () {
                send = 1;
                CDHelper.requireScriptJS(Scripts.errorManager);
                ErrorManager.exceptionHandler(error, send);
            }, function () {
                send = 0;
                CDHelper.requireScriptJS(Scripts.errorManager);
                ErrorManager.exceptionHandler(error, send);
            });
        });
        return true;
    };

    var _getApiConfig = function () {
        var params = null;
        var header;//= { "Content-type": "application/json; charset=utf-8" };

        //get api success handler
        //process file and load the namespace inside
        //enable datasource menu load
        var getApiConfigSuccess = function (config) {
            var nameSpace = config.response.split('<config>')[1];
            eval(nameSpace);
            CDHelper.isApiConfigLoaded = true;
            // initialize the markedUp client
            MK.initialize(ConnectorsApiHelper.MarkedUpApiKey);
        };

        //get api fail handler
        //disable datasource menu load 
        var getApiConfigFailed = function (config) {
            CDHelper.isApiConfigLoaded = false;
        };

        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Post, apiConfigUrl, params, header, getApiConfigSuccess, getApiConfigFailed);
        request.launchService();        
    };

    var _getMessageConfig = function () {
        var params = null;
        var header;//= { "Content-type": "application/json; charset=utf-8" };

        //get message success handler
        //process file and load the namespace inside
        var getMessageConfigSuccess = function (config) {
            var nameSpace = config.response.split('<config>')[1];
            eval(nameSpace);
        };

        //get api fail handler
        //disable datasource menu load 
        var getMessageConfigFailed = function (config) {
            CDHelper.requireScriptJS("/js/messages/" + Windows.Globalization.ApplicationLanguages.languages[0] + "/messagesHelper.js");
        };

        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Post, _getMessageConfigUrl(), params, header, getMessageConfigSuccess, getMessageConfigFailed);
        request.launchService();
    };

    app.start();

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _getMessageConfigUrl
-- Description: recuperer l'url du fichier des messages d'erreurs selon la langue du machine
-- Params: no one 
-- Return: url
------------------------------------------------------*/
    function _getMessageConfigUrl() {//todo
        var resource = WinJS.Resources.getString('div_explorer_DefaultTopPage_label');
        return messageConfigUrlBase + resource.lang + messageConfigUrlPage;

    }

})();

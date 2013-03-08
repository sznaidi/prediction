//[M.C] creation date : 23/1/2013
(function () {
    "use strict";
    var signOutCommand;
    var signOut = WinJS.Resources.getString("btn_signIn_signOut").value;
    var singIn = WinJS.Resources.getString("btn_signIn_signIn").value;
    /* ------------------------------------------------------
  -- Author: [M.C]
  -- Name: onCommandsRequested
  -- Description: add items to the charme menu
  -- Params: event commandsrequested
  -- Return:
  -------------------------------------------------------*/
    function _onCommandsRequested(eventArgs) {
        var applicationSettings = Windows.UI.ApplicationSettings;
        var commands = eventArgs.request.applicationCommands;
        if(DataSourcesHelper.isWebBrokerActive != true) {
            if (LoginHelper.isLoggedIn) {
                if (!commands.indexOf(signOutCommand).returnValue) {
                    commands.append(new applicationSettings.SettingsCommand("signOut", signOut, Login.logOut));
                }
            }
            else {
                if (!commands.indexOf(signOutCommand).returnValue) {
                    commands.append(new applicationSettings.SettingsCommand("signIn", singIn, function () {
                        Application.navigator.goToStartPage(false);
                        CDHelper.requireScriptJS(Scripts.intro);
                        Intro.stopIntro();
                    }));
                }
            }
        }   
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: initializeSettings
-- Description: add event commandsrequested
-- Params: no one
-- Return:no one
-------------------------------------------------------*/
    function initializeSettings() {

        var applicationSettings = Windows.UI.ApplicationSettings;
        var currentView = applicationSettings.SettingsPane.getForCurrentView();
        currentView.addEventListener("commandsrequested", _onCommandsRequested);
    }

    WinJS.Namespace.define("CharmeMenu", {
        initializeSettings: initializeSettings,
    });
})();
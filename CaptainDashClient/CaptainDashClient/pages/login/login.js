/*-------------------------------
-- Author : [A.A]
-- Creation date : 15/01/2013
------------------------------*/
(function () {
    "use strict";

    var _applicationName = Windows.ApplicationModel.Package.current.id.familyName;
    var _vault = new Windows.Security.Credentials.PasswordVault();

    WinJS.UI.Pages.define(Pages.login,
   {
       ready: function (elements, options) {
           if (options && (!options.showIntro || options.user_email)) {
               var params = options.user_email ? options.user_email : null;
               Pages.renderPage(Pages.signIn, params, div_loginPage_loginPageContent);
           }
           else {
               Pages.renderPage(Pages.intro, null, div_loginPage_loginPageContent);
           }

           topAppBar.winControl.disabled = true;
           topAppBarInIntro.winControl.disabled = false;
       },


       /* ------------------------------------------------------
          -- Author: [S.H]
          -- Name: saveCredentials
          -- Description: 
          -- Params: user info, password
          -- Return: No one
          -------------------------------------------------------*/
       saveCredentials: function (credentials) {
           try {
               _vault.add(new Windows.Security.Credentials.PasswordCredential(_applicationName, credentials.email, credentials.password));
           }
           catch (exp) {
               //TODO
           }
       },

       /* ------------------------------------------------------
      -- Author: [M.C]
      -- Name: removeCredentials
      -- Description: remove all credentials saved
      -- Params: No one
      -- Return: No one
      -------------------------------------------------------*/
       removeCredentials: function () {
           CDHelper.requireScriptJS(Scripts.credentials);
           CDHelper.requireScriptJS(Scripts.credentialsServices);
           CDHelper.requireScriptJS(Scripts.credentialsTemplate);

           var creds = _vault.retrieveAll();
           for (var count = 0; count < creds.size; count++) {
               _vault.remove(creds.getAt(count));
           }
           Credentials.initialiseCredentails();
       },

       /* ------------------------------------------------------
      -- Author: [M.C]
      -- Name: logOut
      -- Description: log out
      -- Params: No one
      -- Return: No one
      -------------------------------------------------------*/
       logOut: function () {
           CDHelper.showHideLoading(true);
           LoginServices.signOutRequest(_onSignOutSucceed, _onSignOutFailed);

           function _onSignOutSucceed(userInfo) {
               LoginHelper.isLoggedIn = false;
               CDHelper.showHideLoading(false);
               pageLogin.removeCredentials();
               RightMenu.showHideRightMenu(false);
               if (CDHelper.isScriptLoaded(Scripts.dataExplorerController) && !DataExplorerController.isEmptyExploration)
                   DataExplorerController.deleteExploration();
               WinJS.Navigation.navigate(Pages.login, { showIntro: false });
           }

           function _onSignOutFailed(error) {
               CDHelper.showHideLoading(false);
               Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SIGNIN_SERVICE_ERROR);
           }
       }
   });


    var pageLogin = WinJS.UI.Pages.get(Pages.login).prototype;
    WinJS.Namespace.define("Login", {
        saveCredentials: pageLogin.saveCredentials,
        removeCredentials: pageLogin.removeCredentials,
        logOut: pageLogin.logOut,
    });

})();

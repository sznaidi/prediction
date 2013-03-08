/* ---------------------------------
-- Author : [A.A]
-- Creation date : 17/01/2013
---------------------------------*/
(function () {
    "use strict";
    
    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            CDHelper.showHideLoading(false);
            splashScreen.style.display = "none";

            btn_signIn_signIn.onclick = _signIn;
            btn_signIn_register.onclick = _navigateToRegisterUserPage;

            hlink_signIn_forgotPassword.onclick = _navigateToForgotPasswordPage;
            hlink_signIn_getFullProfil.onclick = _navigateToGetFullCDProfile;

            txt_signIn_emailAdress.onblur = _isValidEmail;
            txt_signIn_password.onblur = _isValidPassword;

            txt_signIn_password.onkeydown = function () { lbl_signIn_passwordError.innerText = ''; };
            txt_signIn_emailAdress.onkeydown = function () { lbl_signIn_emailAdressError.innerText = ''; lbl_signIn_passwordError.innerText = ''; };

            txt_signIn_emailAdress.focus();
            
            if (elements) {
                if (LoginHelper.isValidMail(elements, "")) {
                    txt_signIn_emailAdress.value = elements;
                }
                lbl_signIn_passwordError.innerText = MessagesHelper.MSG_INVALID_SAVED_CREDENTIALS;
            }

        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _signIn
    -- Description: Event click on SignIn button
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _signIn() {
        if (_isValidPassword() && _isValidEmail()) {
            CDHelper.displayHideDiv(prog_signIn_loadingRing, true);
            CDHelper.showHideLoading(true);
            var userCredentials = new LoginHelper.UserCredentials(txt_signIn_emailAdress.value, txt_signIn_password.value);
            signIn(userCredentials, false);
        }       
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _signIn
    -- Description: Event click on SignIn button
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function signIn(userCredentials, isSavedCredentials) {
        if (!ConnectionHelper.hasInternetConnection()) {
            CDHelper.requireScriptJS(Scripts.messageHelper);
            Messages.showTryAgainMessage(MessagesHelper.MSG_NO_INTERNET_TITLE, MessagesHelper.MSG_NO_INTERNET_TEXT, function () { signIn(userCredentials, isSavedCredentials); });
        }
        else {
            /* ------------------------------------------------------
            -- Author: [A.A]
            -- Name: _onSignInSucceed
            -- Description: on SignIn service succeed
            -- Params: user
            -- Return: No one
            -------------------------------------------------------*/
            var _onSignInSucceed = function (user) {
                if (!isSavedCredentials) {
                    //update ui
                    CDHelper.displayHideDiv(prog_signIn_loadingRing, false);
                    CDHelper.showHideLoading(false);
                    //save credentials
                    Login.saveCredentials(new LoginHelper.UserCredentials(user.email, txt_signIn_password.value));
                }

                topAppBar.winControl.disabled = false;
                topAppBarInIntro.winControl.disabled = true;

                CDHelper.displayHideDiv(splashScreen, false);
                _getAllDashboards();
                
                _sendVersion(user);
            }

            /* ------------------------------------------------------
            -- Author: [A.A]
            -- Name: _onSignInFailed
            -- Description: on SignIn service failed
            -- Params: error
            -- Return: No one
            -------------------------------------------------------*/
            var _onSignInFailed = function (error) {
                if (!isSavedCredentials) {
                    CDHelper.displayHideDiv(prog_signIn_loadingRing, false);
                    CDHelper.showHideLoading(false);
                }
                
                if (error.status == Windows.Web.WebErrorStatus.unauthorized)
                {
                    if (WinJS.Navigation.location == Pages.login) {
                        lbl_signIn_passwordError.innerText = MessagesHelper.MSG_SIGNIN_INVALID_CREDENTIALS;
                    }
                    else {
                        var creds = Windows.Security.Credentials.PasswordVault().retrieveAll();
                        WinJS.Navigation.navigate(Pages.login, { user_email: creds[0].userName });
                    }
                }
                else
                    Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SIGNIN_SERVICE_ERROR);
            }
            
            //launch sign in request
            CDHelper.showHideLoading(true);
            LoginServices.signInRequest(userCredentials, _onSignInSucceed, _onSignInFailed);
        }      
    }

    /* ------------------------------------------------------
    -- Author: [S.Z]
    -- Name: _getAllDashboards
    -- Description: Launch get all dashboards service
    -- Params: No one
    -- Return: No one
    ------------------------------------------------------*/
    function _getAllDashboards() {
        CDHelper.showHideLoading(true);
        CDHelper.requireScriptJS(Scripts.dashboardService);
        DashboardsServices.getAllDashboards(_getAllDashboardsSucceed, _getAllDashboardsFailed);
    }

    /* ------------------------------------------------------
     -- Author: [S.Z]
     -- Name: _getAllDashboardsSucceed
     -- Description: callback get all dashboards succeed 
     -- Params: list dashboards
     -- Return: No one
     ------------------------------------------------------*/
    function _getAllDashboardsSucceed(dashboards) {
        CDHelper.showHideLoading(false);
        if (dashboards && dashboards.length > 0) {
            // fill the static dashboard list
            CDHelper.requireScriptJS(Scripts.dashboardHelper);
            DashboardsHelper.fillListDashboards(dashboards);

            //Load dataSources
            CDHelper.showHideLoading(true);
            ConnectorsServices.getAllConnectors(ConnectorsTemplate.ConnectorType.All, _getAllConnectorsSucceed, _getAllConnectorsFailed);
        }
        else {
            Application.navigator.redirect(Pages.dataSources);
        }
    }

    /* ------------------------------------------------------
     -- Author: [A.A]
     -- Name: _getAllDashboardsFailed
     -- Description: callback get all dashboards failed
     -- Params: Error
     -- Return: No one
     ------------------------------------------------------*/
    function _getAllDashboardsFailed(error) {
        CDHelper.showHideLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /* ------------------------------------------------------
     -- Author: [A.A]
     -- Name: _getAllConnectorsSucceed
     -- Description: callback get all connectors succeed
     -- Params: Error
     -- Return: No one
     ------------------------------------------------------*/
    function _getAllConnectorsSucceed(connectors) {
        CDHelper.showHideLoading(false);
        DataSourcesHelper.fillListConnectors(connectors);

        if (connectors.length > 0)
            Application.navigator.redirect(Pages.dashboards);
        else
            Application.navigator.redirect(Pages.dataSources);
    }

    /* ------------------------------------------------------
     -- Author: [A.A]
     -- Name: _getAllConnectorsFailed
     -- Description: callback get all connectors failed
     -- Params: Error
     -- Return: No one
     ------------------------------------------------------*/
    function _getAllConnectorsFailed(error) {
        CDHelper.showHideLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _isValidEmail
    -- Description: validate the email input
    -- Params: No one
    -- Return: true if valid, false if not
    -------------------------------------------------------*/
    function _isValidEmail() {
        lbl_signIn_emailAdressError.innerText = '';
        if (document.activeElement.id != "txt_signIn_emailAdress" && document.activeElement.id != "btn_signIn_register") {           
            if (LoginHelper.isNotEmpty(txt_signIn_emailAdress, lbl_signIn_emailAdressError, MessagesHelper.TXT_EMAIL_EMPTY)) {
                if (LoginHelper.isValidMail(txt_signIn_emailAdress.value, lbl_signIn_emailAdressError))
                    return true;
                else
                    return false;
            }
            return false;
        }
    }

    /* ------------------------------------------------------
   -- Author: [A.A]
   -- Name: _isValidPassword
   -- Description: check if the password input is empty or no
   -- Params: No one
   -- Return: true if valid, false if not
   -------------------------------------------------------*/
    function _isValidPassword() {
        if (document.activeElement.id != "txt_signIn_emailAdress" && LoginHelper.isNotEmpty(txt_signIn_password, lbl_signIn_passwordError, MessagesHelper.TXT_PASSWORD_EMPTY)) {
            lbl_signIn_passwordError.innerText = '';
            return true;
        }
        else
            return false;
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _navigateToRegisterPage
    -- Description: Event click on Register button: navigate to Register user page
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _navigateToRegisterUserPage() {
        Pages.renderPage(Pages.registerPage, null, div_loginPage_loginPageContent);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _navigateToForgotPasswordPage
    -- Description: Event click on Forgot password hyperlink: navigate to Forgot password page
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _navigateToForgotPasswordPage() {
        Pages.renderPage(Pages.forgetPassword, null, div_loginPage_loginPageContent);
        //window.open('http://www.captaindash.com');
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _navigateToForgotPasswordPage
    -- Description: Event click on Forgot password hyperlink: navigate to Forgot password page
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _navigateToGetFullCDProfile() {
        window.open('http://www.captaindash.com');
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _sendVersion
    -- Description: send userInfo to bugsnag and markedUp
    -- Params: current user
    -- Return: No one
    -------------------------------------------------------*/
    function _sendVersion(user) {
        CDHelper.requireScriptJS(Scripts.bugsnag);
        var payload = BugsnagTemplate.formatBeforeSendVersion(user);
        //var params = JSON.stringify(payload);
        //var requestBugsnagSingnIn = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Post, BugsnagTemplate.baseUrlBugsnag, params, BugsnagTemplate.headers,
        //function () { }, function () { });
        //requestBugsnagSingnIn.launchService();

        //add user info on marked up
        MK.info('First name: ' + user.first_name + '\nLast name: ' + user.last_name + '\nEmail: ' + user.email + '\nUser Id: ' + user.id + '\nSingned in at: ' + CDHelper.getDateWithTimezone());
    }

    WinJS.UI.Pages.define(Pages.signIn, {
        ready: ready,    
    });

    WinJS.Namespace.define("SignIn", {
        signIn: signIn,
    });
})();
/*--------------------------------
-- Author : [S.H]
-- Creation date : 18/12/2012
--------------------------------*/
(function () {
    "use strict";
    var User = function(firstName, lastName, email, password) {
        this.email = email;
        this.password = password;
        this.first_name = firstName;
        this.last_name = lastName;
    }

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            txt_register_firstNameValue.onblur = function () { LoginHelper.isNotEmpty(txt_register_firstNameValue, txt_register_nameError, MessagesHelper.TXT_FIRST_NAME_EMPTY); };
            txt_register_lastNameValue.onblur = function () { _isValidLastName(txt_register_lastNameValue, txt_register_nameError, MessagesHelper.TXT_LAST_NAME_EMPTY); };

            txt_register_pswValue.onblur = _isValidPassword;
            txt_register_confirmPswValue.onblur = _isValidConfirmPassword;

            txt_register_emailAdress.onblur = _isValidEmail;
            txt_register_confirmEmail.onblur = _isValidConfirmEmail;

            btn_register_register.onclick = _registerUser;
            btn_register_back.onclick = _showSignInPage;

            txt_register_confirmPswValue.onpaste = _stopPastAction;
            txt_register_confirmEmail.onpaste = _stopPastAction;

        });
    }

  
    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: _isValidLastName
   -- Description: Check if the value of last input is empty or no 
   -- Params: the input name, the div of error text, the error msg
   -- Return: boolean
   -------------------------------------------------------*/
    function _isValidLastName(inputName, errorContent, errorMessage) {
        if (document.activeElement.id != "txt_register_firstNameValue" || (document.activeElement.id == "txt_register_firstNameValue" && txt_register_firstNameValue.value !="" && txt_register_lastNameValue.value == "")) {
            if (LoginHelper.isNotEmpty(inputName, errorContent, errorMessage))
                return true;
            else 
                return false;
        }       
    }


    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _isValidPassword
    -- Description: Check if the confirm psw is empty or no and check if the psw and confirm psw is equal or no
    -- Params: No one
    -- Return: boolean
    -------------------------------------------------------*/
    function _isValidPassword() {
        txt_register_pswError.innerText = '';
        if (LoginHelper.isNotEmpty(txt_register_pswValue, txt_register_pswError, MessagesHelper.TXT_PASSWORD_EMPTY)) {
            if (LoginHelper.isValidPassword(txt_register_pswValue.value, txt_register_pswError))
                   return true;
               else
                   return false;
            }
            return false;
    }

    /* ------------------------------------------------------
     -- Author: [S.H]
     -- Name: _isValidEmail
     -- Description: validate the email input
     -- Params: no one
     -- Return: true if valid, false if not
     -------------------------------------------------------*/
    function _isValidEmail() {
        txt_register_emailError.innerText = '';
        if (LoginHelper.isNotEmpty(txt_register_emailAdress, txt_register_emailError, MessagesHelper.TXT_EMAIL_EMPTY)) {
            if (LoginHelper.isValidMail(txt_register_emailAdress.value, txt_register_emailError))
                return true;
            else
                return false;
        }
        return false;
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _isValidConfirmPassword
    -- Description: validate the confirm email input
    -- Params: no one
    -- Return: true if valid, false if not
    -------------------------------------------------------*/
    function _isValidConfirmPassword() {
        //txt_register_pswError.innerText = '';
        if (document.activeElement.id != "txt_register_pswValue" || (document.activeElement.id == "txt_register_pswValue" && txt_register_pswValue.value != "" && txt_register_pswError.innerText == "")) {
            if (LoginHelper.isNotEmpty(txt_register_confirmPswValue, txt_register_pswError, MessagesHelper.TXT_CONFIRM_PASSWORD_EMPTY))
            {
                if (LoginHelper.isValidPassword(txt_register_pswValue.value, txt_register_pswError) && _isSimilarValues(txt_register_pswValue, txt_register_confirmPswValue, txt_register_pswError, MessagesHelper.TXT_PASSWORD_INCORRECT, MessagesHelper.TXT_CONFIRM_PASSWORD_EMPTY))
                    return true;
                else
                    return false;
            }
            return false;
        }
    }

    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: _isValidConfirmEmail
   -- Description: validate the confirm email input
   -- Params: no one
   -- Return: true if valid, false if not
   -------------------------------------------------------*/
    function _isValidConfirmEmail() {
        //txt_register_emailError.innerText = '';
        if (document.activeElement.id != "txt_register_emailAdress" || (document.activeElement.id == "txt_register_emailAdress" && txt_register_emailAdress.value != "" && txt_register_emailError.innerText == "")) {
            if (LoginHelper.isNotEmpty(txt_register_confirmEmail, txt_register_emailError, MessagesHelper.TXT_CONFIRM_EMAIL_EMPTY)) {
                if (LoginHelper.isValidMail(txt_register_emailAdress.value, txt_register_emailError) && _isSimilarValues(txt_register_emailAdress, txt_register_confirmEmail, txt_register_emailError, MessagesHelper.TXT_EMAIL_INCORRECT, MessagesHelper.TXT_CONFIRM_EMAIL_EMPTY))
                    return true;
                else
                    return false;
            }
            return false;
        }
    }

    /* ------------------------------------------------------
       -- Author: [S.H]
       -- Name: _isSimilarValues
       -- Description: compare the values ​​of two inputs
       -- Params: the first and second input that will be compared, the div of error msg and the specified error msg
       -- Return: Boolean
       -------------------------------------------------------*/
    function _isSimilarValues(firstInputValue, secondInputValue, divError, errorMsg, confirmErrorMsg) {
        // first input is similare as second input
        if (firstInputValue.value == secondInputValue.value)
            return true;
        else {
      // first input is not equal to second input
            if (secondInputValue.value == "") {
                divError.innerText = confirmErrorMsg;
            }
            else {
                divError.innerText = errorMsg;
            }           
         return false;
        }
    }

    /* ------------------------------------------------------
     -- Author: [S.H]
     -- Name: _stopPastAction
     -- Description: stops the default action (past) of an element from happening
        e.preventDefault(): will prevent the default event from occuring
     -- Params: L'event (past)
     -- Return: No one
     -------------------------------------------------------*/
    function _stopPastAction(e) {
        e.preventDefault();
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _registerUser
    -- Description: handle the click on register button
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _registerUser() {
        // Check if all inputs values are valide  or no
        if (_isValidCredentials()) {
            CDHelper.displayHideDiv(prog_register_loadingRing, true);
            CDHelper.showHideLoading(true);
            var user = new User(txt_register_firstNameValue.value, txt_register_lastNameValue.value, txt_register_emailAdress.value, txt_register_pswValue.value);
            LoginServices.signUpRequest(user, _onRegisterSucceed, _onRegisterFailed);
        }
    }


    /* ------------------------------------------------------
      -- Author: [S.H]
      -- Name: _isValidCredentials
      -- Description: Check if all inputs are valid or no
      -- Params: No one
      -- Return: Boolean
      -------------------------------------------------------*/
    function _isValidCredentials() {
        if (LoginHelper.isNotEmpty(txt_register_firstNameValue, txt_register_nameError, MessagesHelper.TXT_FIRST_NAME_EMPTY)
            && _isValidLastName(txt_register_lastNameValue, txt_register_nameError, MessagesHelper.TXT_LAST_NAME_EMPTY)
            && _isValidPassword()&& _isValidConfirmPassword()&& _isValidEmail()&& _isValidConfirmEmail())
            return true;
        else
            return false;
    }


    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: _onRegisterSucceed
   -- Description: on register service succeed
   -- Params: the user created
   -- Return: No one
   -------------------------------------------------------*/
    function _onRegisterSucceed(userInfo) {
        var user = JSON.parse(userInfo.response).user;
        CDHelper.displayHideDiv(prog_register_loadingRing, false);
        CDHelper.showHideLoading(false);
        WinJS.Navigation.navigate(Pages.dataSources);
        Login.saveCredentials(new LoginHelper.UserCredentials(user.email, txt_register_pswValue.value));
        //ToDo
        Messages.showConfirmMessage(MessagesHelper.MSG_REGISTER_TITLE_ERROR, MessagesHelper.TXT_VALIDATE_ACCOUNT);
        topAppBar.winControl.disabled = false;
        topAppBarInIntro.winControl.disabled = true;
        // fill bugsnag user
        CDHelper.requireScriptJS(Scripts.bugsnag);
        BugsnagTemplate.fillUserBugsnag(user);
    }


    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _onRegisterFailed
    -- Description: on register service failed
    -- Params: error
    -- Return: No one
    -------------------------------------------------------*/
    function _onRegisterFailed(error) {
        CDHelper.displayHideDiv(prog_register_loadingRing, false);
        CDHelper.showHideLoading(false);
        //ToDo
        Messages.showCancelMessage(MessagesHelper.MSG_REGISTER_TITLE_ERROR, MessagesHelper.TXT_ACCOUNT_EXIST);
    }


    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _showSignInPage
    -- Description: show previous page(sign in page)
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _showSignInPage() {
        Pages.renderPage(Pages.signIn, null, div_loginPage_loginPageContent);
    }

    WinJS.UI.Pages.define(Pages.registerPage, {
        ready: ready,
    });

})();
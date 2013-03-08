(function () {
    "use strict";

    var _isLoggedIn = false;//used to identify if user logged or not
    var UserCredentials = function (email, password) {
        this.password = password;
        this.email = email;
    }

    /*  ------------------------------------------------------
      -- Author: [S.H]
      -- Name: isValidMail
      -- Description: check if the adress email is valid or no.
      -- Params: email adress, the div of error text
      -- Return: Boolean
      -------------------------------------------------------*/
    function isValidMail(email, errorContent) {
        var mailPattern = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
        if (mailPattern.test(email)) {
            return (true);
        }
        else {
            if(errorContent)
                 errorContent.innerText = MessagesHelper.TXT_EMAIL_INVALID;
           return (false);
        }
    }

    /*  ------------------------------------------------------
     -- Author: [S.H]
     -- Name: isValidPassword
     -- Description: check if the password is valid or no.
     -- Params: passord, the div of error text
     -- Return: Boolean
     -------------------------------------------------------*/
    function isValidPassword(password, errorContent) {
        if (password.length >= 6 && password.length <= 128)
            return true;
        else {
            errorContent.innerHTML = MessagesHelper.TXT_PASSWORD_INVALID;
            return false;
        }
    }

    /* ------------------------------------------------------
      -- Author: [S.H]
      -- Name: isNotEmpty
      -- Description: Check if the value of current input is empty or no 
      -- Params: the input name, the div of error text, the error msg
      -- Return: boolean
      -------------------------------------------------------*/
    function isNotEmpty(inputName, errorContent, errorMessage) {
        errorContent.innerText = '';
        if (inputName.value == "") {
            errorContent.innerText = errorMessage;
            return false;
        }
        else
            return true;
    }

    function getUserSavedCredentials() {
        var savedCredentials;
        var _vault = new Windows.Security.Credentials.PasswordVault();

        if (_vault.retrieveAll().size > 0) {
            var userPassword = _vault.retrieve(CDHelper.applicationName, _vault.findAllByResource(CDHelper.applicationName)[0].userName).password;
            var userEmail = _vault.retrieve(CDHelper.applicationName, _vault.findAllByResource(CDHelper.applicationName)[0].userName).userName;
            savedCredentials = new LoginHelper.UserCredentials(userEmail, userPassword);
        }

        return savedCredentials;
    }

WinJS.Namespace.define("LoginHelper", {
    isValidMail: isValidMail,
    isValidPassword: isValidPassword,
    isNotEmpty: isNotEmpty,
    UserCredentials: UserCredentials,
    isLoggedIn: { get: function () { return _isLoggedIn; }, set: function (value) { _isLoggedIn = value; } },
});

})();
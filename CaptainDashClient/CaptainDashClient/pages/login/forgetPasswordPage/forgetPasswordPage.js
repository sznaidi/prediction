/*--------------------------------
-- Author : [S.H]
-- Creation date : 17/12/2012
--------------------------------*/

(function () {
    "use strict";

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            txt_forgetPassword_emailAdress.onblur = _sendEmail;
            btn_forgetPassword_send.onclick = _sendEmail;
            btn_forgetPassword_back.onclick = _showSignInPage;
        });
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _sendEmail
    -- Description: it run when we click on send button
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _sendEmail() {
        var userEmail = txt_forgetPassword_emailAdress.value;
        if (txt_forgetPassword_emailAdress.value != "") {
            if (LoginHelper.isValidMail(userEmail, lbl_forgetPassword_error)) {
                // TODO
                //CDHelper.displayHideDiv(prog_forgetPsw_loadingRing, true);
                //txt_notification_msg.innerText = MessagesHelper.EMAIL_WAS_SENT_TO_YOUR_INBOX;
            }
        }
        else
            lbl_forgetPassword_error.innerText = MessagesHelper.TXT_EMAIL_EMPTY;
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _showSignInPage
    -- Description: show previous page
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _showSignInPage() {
        Pages.renderPage(Pages.signIn, null, div_loginPage_loginPageContent);
    }

    WinJS.UI.Pages.define(Pages.forgetPassword, {
        ready: ready,
    });

})();
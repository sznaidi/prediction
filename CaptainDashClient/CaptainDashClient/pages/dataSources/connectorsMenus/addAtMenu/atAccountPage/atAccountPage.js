//[MC] Creation date : 24/12/2012

var atConnectorInfo = new AtMenuHelper.atConnectorInfo();

(function () {
    "use strict";

    function ready(successCallback) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            //if we have a seved credentials,show back button else hide back button
            if(Credentials.atlasCredentials.length)
                RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].credentials, true);
            else
                RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].credentials, false);
            
            btn_rightMenu_back.onclick = _showPreviousPage;

            btn_atAccount_Next.onclick = function (e) {
                _btnNext_click(successCallback);
            };

            txt_atAccount_Login.onkeydown = _atLoginOnkeydown; 
            
            txt_atAccount_Password.onkeydown = _atPasswordOnkeydown; 

            txt_atAccount_Token.onkeydown = _atTokenOnkeydown;

            _initialiseAccountPage();
       });
    }

    function _btnNext_click(successCallback) {
        if (_isValidateInputs()) {
            atConnectorInfo.username = txt_atAccount_Login.value;
            atConnectorInfo.password = txt_atAccount_Password.value;
            atConnectorInfo.accessToken = txt_atAccount_Token.value;
            successCallback(atConnectorInfo);
            RightMenu.rightMenuLoading(true);
        } else {
            lbl_atAccount_Token.innerText = MessagesHelper.AT_CREDENTIALS;
        }
    }
    // Description: on Enter key pressed in token input
    // Input: Evt click keyboard
    // Output:
    function _atTokenOnkeydown(e) {
        if (e.keyCode == 13) {
            txt_atAccount_Token.blur();
            _getAgencys();
            return false;
        }
    }

    // Description: on Enter key pressed in password input
    // Input: Evt click keyboard
    // Output:
    function _atPasswordOnkeydown(e) {
        if (e.keyCode == 13) {
            txt_atAccount_Token.focus();
            return false;
        }
    }

    // Description: on Enter key pressed in login input
    // Input: Evt click keyboard
    // Output:
    function _atLoginOnkeydown(e) {
        if (e.keyCode == 13) {
            txt_atAccount_Password.focus();
            return false;
        }
    }

    // Description: navigate to previous page
    // Input:
    // Output:
    function _showPreviousPage() {
        RightMenu.showRightMenu(Pages.credentialsMenu, ConnectorsTemplate.ConnectorType.Atlas);
    }

    // Description: initialise list account
    // Input:
    // Output:
    function _initialiseAccountPage() {
        if (atConnectorInfo.username && atConnectorInfo.password && atConnectorInfo.client_guid) {
            txt_atAccount_Login.value = atConnectorInfo.username;
            txt_atAccount_Password.value = atConnectorInfo.password;
            txt_atAccount_Token.value = atConnectorInfo.client_guid;
        }
    }

    // Description:  get list agencys
    // Input:
    // Output:

    ////function _getAgencys() {
    ////    lbl_atAccount_Token.innerText = "";
    ////    if (_isValidateInputs()) {
    ////        atConnectorInfo.username = txt_atAccount_Login.value;
    ////        atConnectorInfo.password = txt_atAccount_Password.value;
    ////        atConnectorInfo.accessToken = txt_atAccount_Token.value;
    ////        RightMenu.rightMenuLoading(true);
    ////        var addCredentialsCallBack = function () {
    ////            var i = 0;
    ////        }
    ////        //var userInfo = new CredentialsTemplate.AtCredentials(atConnectorInfo.accessToken, null, atConnectorInfo.username, atConnectorInfo.password);
    ////        //Credentials.addCredential(ConnectorsTemplate.ConnectorType.Atlas, userInfo, addCredentialsCallBack);
    ////        //get agencies
    ////        AtlasApi.getAgencies(atConnectorInfo.client_guid, 
    ////            function(agencies) {
    ////                if (!agencies.d) {
    ////                    lbl_atAccount_Token.innerText = MessagesHelper.AT_CREDENTIALS;
    ////                } else {
    ////                    atConnectorInfo.agencies = agencies.d;
    ////                    RightMenu.showRightMenu(Pages.addAtMenuAgency);
    ////                }
    ////                RightMenu.rightMenuLoading(false);
    ////            }, function(error) {
    ////                //todo
    ////                RightMenu.rightMenuLoading(false);
    ////            });
    ////    } else {
    ////        lbl_atAccount_Token.innerText = MessagesHelper.AT_CREDENTIALS;
    ////    }
    ////}

    // Description: check if inputs are valid
    // Input:loginText:string, passwordText:string, tokenText:string
    // Output: boolean

    function _isValidateInputs() {
        if (txt_atAccount_Login.value != "" && txt_atAccount_Password.value != "" && txt_atAccount_Token.value != "")
            return true;
        else
            return false;
    }

    WinJS.UI.Pages.define(Pages.addAtMenuAccount, {
        ready: ready,
    });

})();
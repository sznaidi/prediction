
var ConnectorApi = WinJS.Class.define(
       // The constructor function.
       function () {
       },

       // The set of instance members.
       {
       },

       // The set of static members.
       {
           launchApi: function (connectorType, success, failed) {

               var launchWebAuthSucceed = function (resultAuth) {
                   conFact.launchWebAuthSucceed(resultAuth, getTokenInfoSucceed, getTokenInfoFailed);
               };

               var getTokenInfoSucceed = function (token) {
                   conFact.getTokenInfoSucceed(token, getUserInfoSucceed, getUserInfoFailed);
               };

               var getTokenInfoFailed = function (error) {
                   failed(error);
               };

               var getUserInfoSucceed = function (userInfo) {
                   conFact.getUserInfoSucceed(userInfo, getFormattedUserInfoSucceed, getFormattedUserInfoFailed);
               };

               var getUserInfoFailed = function (error) {
                   failed(error);
               };

               var getFormattedUserInfoSucceed = function (formattedUserInfo) {
                   //callback addCredential
                   var addCredentialsCallBack = function (indexCredential) {
                       success({ indexCredential: indexCredential, data: formattedUserInfo.data });
                   }
                   Credentials.addCredential(connectorType, formattedUserInfo.credentialsToSend, addCredentialsCallBack);
               };

               var getFormattedUserInfoFailed = function (error) {
                   failed(error);
               };

               var launchWebAuthFailed = function (error) {
                   //error = "Error returned by WebAuth broker. Error Number: " + err.number + " Error Message: " + err.message + "\r\n";//TODO
                   failed(error);
               };

               var conFact = new ConnectorsApiFactory(connectorType);
               //test atlas sucess = getFormattedUserInfoSucceed
               if (connectorType == ConnectorsTemplate.ConnectorType.Atlas) {
                   conFact.launchWebAuth(getUserInfoSucceed, getUserInfoFailed);
               } else {
                    conFact.launchWebAuth(launchWebAuthSucceed, launchWebAuthFailed);
               }
               
           },

           verifyCredentialsApi: function (connectorType, credentials, success, failed) {

                var verifyCredentialsSucceed = function (userInfo) {
                    conFact.getUserInfoSucceed(userInfo, getFormattedUserInfoSucceed, getFormattedUserInfoFailed);
                };

                var verifyCredentialsFailed = function (error) {
                    failed(error);
                };

                var getFormattedUserInfoSucceed = function (formattedUserInfo) {
                    //callback addCredential
                    var addCredentialsCallBack = function (indexCredential) {
                        success({ indexCredential: indexCredential, data: formattedUserInfo.data });
                    }
                    Credentials.addCredential(connectorType, formattedUserInfo.credentialsToSend, addCredentialsCallBack);
                };

                var getFormattedUserInfoFailed = function (error) {
                    failed(error);
                };

                var conFact = new ConnectorsApiFactory(connectorType);
                conFact.verifyCredentials(credentials, verifyCredentialsSucceed, verifyCredentialsFailed);
           }
       }
       );

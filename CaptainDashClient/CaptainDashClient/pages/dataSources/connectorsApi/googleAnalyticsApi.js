/*-------------------------------
-- Author : [S.H]
-- Creation date : 13/12/2012
------------------------------*/

var GoogleAnalyticsApi = WinJS.Class.define(
       // The constructor function.
       function () {
       },

       // The set of instance members.
       {
       },

       // The set of static members.
       {
           launchWebAuth: function (launchWebAuthSucceed, launchWebAuthFailed) {
               var googleURL = ConnectorsApiHelper.GoogleAuthUrl + "client_id=" + ConnectorsApiHelper.GoogleApplicationClientID + "&access_type=offline&approval_prompt=force&&scope=" + ConnectorsApiHelper.GoogleScope + "&redirect_uri=" + encodeURIComponent(ConnectorsApiHelper.GoogleRedirectUri) + "&response_type=code&state=/profile&hl=en";
               var startURI;
               var endURI;
               try {
                   startURI = new Windows.Foundation.Uri(googleURL);
                   endURI = new Windows.Foundation.Uri(ConnectorsApiHelper.GoogleRedirectUri);
                   Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync(Windows.Security.Authentication.Web.WebAuthenticationOptions.default, startURI, endURI).then(launchWebAuthSucceed, launchWebAuthFailed);
               }
               catch (err) {
                   launchWebAuthFailed(JSON.parse(err.responseText).error.message);
               }
           },

           isBackButtonPressed: function (authResult) {
               if (authResult) {
                   if (authResult.responseData.indexOf("access_denied") != -1 || authResult.responseData == "")
                       // Back button or cancel button pressed 
                       return true;
                   return false;
               }

           },

           getTokenInfo: function (authResult, getTokenInfoSucceed, getTokenInfoFailed) {
               if (authResult && authResult.responseStatus == 0) {
                   var header = authResult.responseData.split('?');
                   if (header[0] == (ConnectorsApiHelper.GoogleRedirectUri)) {
                       var error = header[1].split('&')[0].split('=')[0];
                       if (error.toUpperCase() != "ERROR") {
                           var head = header[1].split('&')[1];
                           var code = head.split('=')[1];  //we must use this code to retrieve the token

                           //Service succeed (get Token from authorization code)
                           var getTokenInfoGaSucceed = function (tokenInfo) {
                               getTokenInfoSucceed(gaTokenInfo.formatToken(tokenInfo));
                           };

                           //Service failed
                           var getTokenInfoGaFailed = function (request) {
                               getTokenInfoFailed(JSON.parse(request.responseText).error);
                           };

                           var gaTokenInfo = new GaTokenInfo(getTokenInfoGaSucceed, getTokenInfoGaFailed);
                           // launch service
                           gaTokenInfo.getGoogleToken(code);
                       }
                   }
               }
           },

           getUserInfo: function (tokenInfo, getUserInfoSucceed, getUserInfoFailed) {
               var header = null;
               var params = null;
               var accessToken = tokenInfo.access_token;

               // service succeed
               getDetailedUserInfoCallback = function (details) {
                   var userInfo = JSON.parse(details.responseText);
                   userInfo.access_token = tokenInfo.access_token;
                   userInfo.refresh_token = tokenInfo.refresh_token;
                   getUserInfoSucceed(userInfo);
               }.bind(this);

               getDetailedUserInfoFailed = function (error) {
                   var errorObj = JSON.parse(error.response).error;

                   if (GoogleAnalyticsApi._isInvalidCredentials(errorObj.code, errorObj.message)) {
                       var gaTokenInfo = new GaTokenInfo(
                           function (newToken) {
                               var newTokenInfo = gaTokenInfo.formatToken(newToken);
                               newTokenInfo.refresh_token = tokenInfo.refresh_token;
                               GoogleAnalyticsApi.getUserInfo(newTokenInfo, getUserInfoSucceed, getUserInfoFailed);
                           },
                           getUserInfoFailed);

                       // token has expired, try to get a new one
                       gaTokenInfo.getNewGoogleToken(tokenInfo.refresh_token);
                   }
                   else {
                       getUserInfoFailed(error);
                   }
               }

               // launch service(get user info)
               var service = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Get, ConnectorsApiHelper.GoogleUserInfoUrl + accessToken, params, header, getDetailedUserInfoCallback, getDetailedUserInfoFailed);
               service.launchService();
           },

           getFormattedUserInfo: function (userInfo, getFormattedUserInfoSucceed, getFormattedUserInfoFailed) {
               // user object to return
               ////var userInfoGa = new UserInfoGa();
               var userInfoGa;

               // service succeed
               getAccountsSucceed = function (result) {
                   var listItems = window.JSON.parse(result.responseText);
                   userInfo.email = listItems.username;
                   var listAccounts = GoogleAnalyticsApi._formattedListAccount(listItems);
                   var promisesArray = [];

                   for (count = 0; count < listAccounts.length; count++) {
                       (function (indexAccount) {
                           promisesArray.push(GoogleAnalyticsApi._getWebProperties(listAccounts[indexAccount], userInfo.access_token).then(function (webProperties) {
                               listAccounts[indexAccount].properties = webProperties.items;
                            }));
                       })(count);
                   }

                   WinJS.Promise.join(promisesArray).then(
                       function () {
                           userInfoGa = new UserInfo(listAccounts, new CredentialsTemplate.GaCredentials(userInfo.access_token, userInfo, userInfo.refresh_token));
                           ////var credentialsToSend = {
                           ////    access_token: userInfo.access_token,
                           ////    refresh_token: userInfo.refresh_token,
                           ////    payload: userInfo
                           ////};

                           ////userInfoGa.data = listAccounts;
                           //////userInfoGa.localCredentials = GoogleAnalyticsApi._getCredentials(userInfo, getFormattedUserInfoFailed);
                           ////userInfoGa.credentialsToSend = credentialsToSend;
                           getFormattedUserInfoSucceed(userInfoGa);
                       },
                       function (error) {
                           getFormattedUserInfoFailed(error);
                       }
                   );
               };

               // service failed
               getAccountsFailed = function (request) {
                   getFormattedUserInfoFailed(JSON.parse(request.responseText).error.message);
               };

               //Launch service to get list of items
               var service = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Get, ConnectorsApiHelper.GoogleAnalyticsApiUrl + "accounts?access_token=" + userInfo.access_token, null, null, getAccountsSucceed, getAccountsFailed);
               service.launchService();

           },

           //_getCredentials: function (userInfo, getFormattedUserInfoFailed) {
           //    try {
           //        var status;
           //        var timezone;
           //        var GaCredentials = new CredentialsTemplate.GaCredentials(userInfo.id, userInfo.name, userInfo.email, userInfo.picture, userInfo.access_token, status, timezone, userInfo.refresh_token);
           //        return GaCredentials;
           //    }
           //    catch (Exception) {
           //        getFormattedUserInfoFailed(Exception);
           //    }
           //},

           _getWebProperties: function (listAccount, accessToken) {
               return new WinJS.Promise(function (c, e, p) {
                   var service = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Get, ConnectorsApiHelper.GoogleAnalyticsApiUrl + "accounts/" + listAccount.id + "/webproperties?access_token=" + accessToken, null, null, succeed, failed)
                   service.launchService();

                   function succeed(allProperties) {
                       var listWebProperties = JSON.parse(allProperties.responseText);
                       c(listWebProperties);
                   }

                   function failed(error) {
                       e(error);
                   }
               });
           },

           _formattedListAccount: function (listItems) {
               var allAccounts = new Array();
               if (listItems.items) {
                   listItems.items.forEach(function (item) {
                       allAccounts.push(item);
                   });
               }
               return (allAccounts);
           },

           _isInvalidCredentials: function (code, message) {
               if (message == "Invalid Credentials" && code == 401) {
                   return true;
               }

               return false;
           },

           getProfiles: function (property, accessToken, succeed, failed) {
               var service = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Get, ConnectorsApiHelper.GoogleAnalyticsApiUrl + "accounts/" + property.accountId + "/webproperties/" + property.id + "/profiles?access_token=" + accessToken, null, null, launchServiceSucceed, launchServiceFailed);
               service.launchService();
               function launchServiceSucceed(request) {
                   var data = window.JSON.parse(request.responseText);
                   var allProfiles = new Array();
                   if (data.items) {
                       data.items.forEach(function (item) {
                           allProfiles.push(item);
                       });
                   }
                   property.profiles = allProfiles;
                   succeed(allProfiles);
               }
               function launchServiceFailed(request) {
                   failed(JSON.parse(request.responseText).error.message);
               }
           }
       }

   );


 var GaTokenInfo = WinJS.Class.define(
  // The constructor function.
  function (success, failed) {
     this.Success = success;
     this.Failed = failed;
 },

  // The set of instance members.
 {
     Success: function () { },
     Failed: function () { },

     getGoogleToken: function (code) {
         var clientId = encodeURIComponent(ConnectorsApiHelper.GoogleApplicationClientID);
         var clientSecret = encodeURIComponent(ConnectorsApiHelper.GoogleClientSecret);
         var authorizationCode = encodeURIComponent(code);

         var params = "";
         params += "grant_type=authorization_code&";
         params += "client_id=" + clientId + "&";
         params += "client_secret=" + clientSecret + "&";
         params += "code=" + authorizationCode + "&";
         params += "redirect_uri=" + encodeURIComponent(ConnectorsApiHelper.GoogleRedirectUri);
         var requestHeader = { "Content-type": "application/x-www-form-urlencoded" };

         if (authorizationCode) {
             var service = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Post, ConnectorsApiHelper.UrlGetTokenGa, params, requestHeader, this.Success, this.Failed);
             service.launchService();
         }

     },

     getNewGoogleToken: function(refreshToken) {
         var clientId = encodeURIComponent(ConnectorsApiHelper.GoogleApplicationClientID);
         var clientSecret = encodeURIComponent(ConnectorsApiHelper.GoogleClientSecret);
         var refreshTokenEncoded = encodeURIComponent(refreshToken);
         var requestHeader = { "Content-type": "application/x-www-form-urlencoded" };
         var params = "";
         params += "grant_type=refresh_token&";
         params += "client_id=" + clientId + "&";
         params += "client_secret=" + clientSecret + "&";
         params += "refresh_token=" + refreshTokenEncoded;
       
         var service = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Post, ConnectorsApiHelper.UrlGetTokenGa, params, requestHeader, this.Success, this.Failed);
         service.launchService();
     },

     formatToken: function (request) {
         var data = window.JSON.parse(request.responseText);
         return (data)
     },

 },
 // The set of static members.
 {}
 );

////var UserInfoGa = function () {
////    this.credentialsToSend = {
////        access_token: null,
////        refresh_token: null,
////        payload: null,
////    },
////    //this.localCredentials;
////    this.data;
////}



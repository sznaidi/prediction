/*-------------------------------
-- Author : [S.H]
-- Creation date : 11/12/2012
------------------------------*/
var FacebookApi = WinJS.Class.define(
       // The constructor function.
       function () {
       },

       // The set of instance members.
       {           
       },

       // The set of static members.
       {
           launchWebAuth: function (launchWebAuthSucceed, launchWebAuthFailed) {
               var facebookURL = ConnectorsApiHelper.FacebookAuthUrl + "&client_id=" + ConnectorsApiHelper.FacebookApplicationClientId + "&redirect_uri=" + encodeURIComponent(ConnectorsApiHelper.FacebookCallbackUrl) + "&scope=offline_access,user_photos,user_groups,manage_pages,email,user_birthday,user_online_presence,read_stream,user_checkins,user_events,read_insights&display=popup&response_type=token";
               var startURI;
               var endURI;
               try {
                   startURI = new Windows.Foundation.Uri(facebookURL);
                   endURI = new Windows.Foundation.Uri(ConnectorsApiHelper.FacebookCallbackUrl);
                   Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync(Windows.Security.Authentication.Web.WebAuthenticationOptions.default, startURI, endURI).then(launchWebAuthSucceed, launchWebAuthFailed);
               }
               catch (exception) {
                   launchWebAuthFailed(JSON.parse(exception.responseText).error.message);
               }
           },

           isBackButtonPressed: function (authResult) {
               if (authResult) {                   
                   if (authResult.responseData.indexOf("access_token") != -1)
                       return false;
                   return true;// Back button or cancel button pressed 
               }
           },

           getTokenInfo: function (authResult, getTokenInfoSucceed, getTokenInfoFailed) 
           {

               // Service succeed
               var getTokenInfoFbSucceed = function (token) {
                   getTokenInfoSucceed(fbTokenInfo.formatToken(token)); 
               };

               // Service failed
               var getTokenInfoFbFailed = function (request) {
                   getTokenInfoFailed(JSON.parse(request.responseText).error);
               };

               // launch service to get token
               var fbTokenInfo = new FbTokenInfo(getTokenInfoFbSucceed, getTokenInfoFbFailed);
               fbTokenInfo.getToken(authResult);
           },

           getUserInfo: function (fbToken, getUserInfoSucceed, getUserInfoFailed) {
               var that = this;
              
               // service succeed
               function launchServiceSucceed(request) {
                   var userInfo = window.JSON.parse(request.responseText);
                   userInfo.access_token = fbToken; // offline access token
                   FacebookApi._getListAdminPage(userInfo, getUserInfoSucceed, getUserInfoFailed);
               }

               // Service failed
               function launchServiceFailed (request) {
                   getUserInfoFailed(JSON.parse(request.responseText).error.message);
               }

               //Launch service to get user info                    
               var service = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Get, ConnectorsApiHelper.UrlGetUserInfoFb + fbToken, null, null, launchServiceSucceed, launchServiceFailed);
               service.launchService();
           },

           _getListAdminPage: function (userInfoFB, getUserInfoSucceed, getUserInfoFailed) {
                   var service = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Get, ConnectorsApiHelper.UrlGetListAdminPages + userInfoFB.access_token, null, null, launchServiceSucceed, launchServiceFailed);
                   service.launchService();

                   function launchServiceSucceed(request) {
                       var response = window.JSON.parse(request.responseText);
                       var listPages = [];
                       if (response != null && response.data.length > 0) {
                           for (var i = 0; i < response.data.length; i++) {
                               listPages.push(response.data[i]);
                           }
                       }
                  
                        userInfoFB.pages = listPages;
                        getUserInfoSucceed(userInfoFB);
                   }

                   function launchServiceFailed(request) {
                       getUserInfoFailed(JSON.parse(request.responseText).error);
                   }
           },

           getFormattedUserInfo: function (userInfo, getFormattedUserInfoSucceed, getFormattedUserInfoFailed) {
               // user object to return
               var userInfoFb = new UserInfo(userInfo.pages, new CredentialsTemplate.FbCredentials(userInfo.access_token, userInfo));
               ////var credentialsToSend = {
               ////    access_token: userInfo.access_token,
               ////    payload: userInfo
               ////};

               ////userInfoFb.credentialsToSend = credentialsToSend;
               ////userInfoFb.data = userInfo.pages;

               getFormattedUserInfoSucceed(userInfoFb); 
           },

           //_getCredentials: function (userInfo, getFormattedUserInfoFailed) {
           //    try {
           //        var status;
           //        var picture = userInfo.picture.data.url;
           //        var FbCredentials = new CredentialsTemplate.FbCredentials(userInfo.id, userInfo.name, userInfo.email, picture, userInfo.access_token, userInfo.timezone, status);
           //        return FbCredentials;
           //    }
           //    catch (Exception) {
           //        failed(Exception);
           //    }
           //},

           getListFanPage: function (request, succeed, failed) {
               var service = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Get, ConnectorsApiHelper.UrlGetListFanPages + request + "&type=page", null, null, launchServiceSucceed, launchServiceFailed);
               service.launchService();
               function launchServiceSucceed(result) {
                   var pages = JSON.parse(result.responseText).data;
                   succeed(pages);
               }
               function launchServiceFailed(result) {
                   failed(JSON.parse(result.responseText).error.message);
               }
           },
       }
);

  var FbTokenInfo = WinJS.Class.define(
  // The constructor function.
  function (success, failed) {
    this.Success = success;
    this.Failed = failed;
},

  // The set of instance members.
  {
      Success: function () { },
      Failed: function () { },

      getToken: function (authResult) {
          var header;
          var callBackUrl;
          var tokenProperties;
          var fbToken;
          // click on connect button
          if (authResult && authResult.responseStatus == 0) {
              header = authResult.responseData.split('access_token=');
              callBackUrl = header[0].toString().slice(0, header[0].length - 1);
              if (callBackUrl == ConnectorsApiHelper.FacebookCallbackUrl.toString()) {
                  tokenProperties = header[1].toString().split("&expires_in=");
                  if (tokenProperties[0] != null) {
                      fbToken = tokenProperties[0];
                      this._generateOfflineAccessToken(fbToken);
                  }
              }
          }
              // Click on back button of web broker
          else {
              this.Success(ConnectorsApiFactory.BrokerBackButtonPressed);
          }
      },

      _generateOfflineAccessToken: function (token) {
          var clientId = encodeURIComponent(ConnectorsApiHelper.FacebookApplicationClientId);
          var clientSecret = encodeURIComponent(ConnectorsApiHelper.FacebookClientSecret);
          var param = "";
          param += "grant_type=fb_exchange_token&";
          param += "client_id=" + clientId + "&";
          param += "client_secret=" + clientSecret + "&";
          param += "fb_exchange_token=" + token;
          var requestHeader = { "Content-type": "application/x-www-form-urlencoded" };

          if (token) {
              var service = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Post, ConnectorsApiHelper.UrlGetTokenFb, param, requestHeader, this.Success, this.Failed);
              service.launchService();
          }
      },

      formatToken: function (request) {
          try {
              var fbOfflineToken;
              var header = request.responseText.split('access_token=');
              var tokenProperties = header[1].toString().split("&expires=");
              if (tokenProperties[0] != null) {
                  fbOfflineToken = tokenProperties[0];
              }
              return (fbOfflineToken)
          }
          catch (exception) {
              //TODO
          }
      },
    
  },

  // The set of static members.
  {}
);

////var UserInfoFB = function () {
////    this.credentialsToSend = {
////        access_token: null,
////        payload: null,
////    },
////    this.data;
////}
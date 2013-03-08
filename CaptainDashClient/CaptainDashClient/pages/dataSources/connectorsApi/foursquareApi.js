var FoursquareApi = WinJS.Class.define(
       // The constructor function.
       function () {
       },

       // The set of instance members.
       {           
       },

       // The set of static members.
       {

            _CLIENT_ID : "client_id",
            _REPONSE_TYPE : "response_type",
            _REDIRECT_URI : "redirect_uri",
            _ACCESS_TOKEN : "access_token",
            _OAUTH_TOKEN : "oauth_token",
            _TOKEN : "token",
            _CLIENT_SECRET : "client_secret",
            _NEAR : "near",
            _LIMIT : "limit",
            _QUERY : "query",

            launchWebAuth: function (succeed, failed) {
                var foursquareURL = ConnectorsApiHelper.foursquareAuthUrl;
                var clientID = ConnectorsApiHelper.foursquareApplicationClientID;
                var callbackURL = ConnectorsApiHelper.foursquareApplicationCallbackUrl;

                foursquareURL += this._CLIENT_ID + "=" + clientID + "&" + this._REPONSE_TYPE + "=" + this._TOKEN + "&" + this._REDIRECT_URI + "=" + callbackURL;

                var startURI = new Windows.Foundation.Uri(foursquareURL);
                var endURI = new Windows.Foundation.Uri(callbackURL);
                Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync(
                                                                Windows.Security.Authentication.Web.WebAuthenticationOptions.none,
                                                                startURI,
                                                                endURI).then(succeed, failed);
            },

            isBackButtonPressed: function (authResult) {
                if (authResult) {
                    if (authResult.responseData.indexOf("access_token") != -1)
                        return false;
                    return true;// Back button or cancel button pressed 
                }
            },

            getTokenInfo: function (authResult, getTokenInfoSucceed, getTokenInfoFailed) {
                try {
                    var header = authResult.responseData.split('#');
                    if (header[1]) {
                        var subHeader = header[1].split('&');
                        for (var i = 0; i < subHeader.length; i++) {
                            var splits = subHeader[i].split("=");
                            switch (splits[0]) {
                                case this._ACCESS_TOKEN:
                                    getTokenInfoSucceed(splits[1]);
                                    break;
                            }
                        }
                    }
                }
                catch(exception){
                    getTokenInfoFailed(exception);
                }
            },
   
            getUserInfo: function (token, succeed, failed) {
                var url = ConnectorsApiHelper.foursquareUserAuthUrl + this._OAUTH_TOKEN + "=" + token;
                var params = null;
                var header = null;

                getDetailedUserInfoCallback = function (details) {
                    var userInfo = JSON.parse(details.responseText).response.user;
                    userInfo.access_token = token;
                    succeed(userInfo);
                };

                var service = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Get, url, params, header, getDetailedUserInfoCallback, failed);
                service.launchService();
            },

            //_getCredentials: function (userInfo, failed) {
            //    try {
            //        // tw credentials contructor (account_id, name, handle, image_url, access_token)
            //        var FsCredentials = new CredentialsTemplate.FsCredentials(userInfo.id, userInfo.firstName + " " + userInfo.lastName, userInfo.contact.email, userInfo.photo, userInfo.access_token);
            //        return FsCredentials;
            //    }
            //    catch (Exception) {
            //        failed(Exception);
            //    }
            //},

            _getPrivateVenue: function (accessToken, failed) {
                return new WinJS.Promise( function(c, e, p) {
                    var foursquareSearchUrl = ConnectorsApiHelper.foursquareManagedUrl + this._OAUTH_TOKEN + "=" + accessToken;
                    var params = null;
                    var header = null;

                    getPrivateVenuesCallback = function (result) {
                        var privateVenues = JSON.parse(result.responseText).response.venues;
                        c(privateVenues);
                    };

                    var service = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Get, foursquareSearchUrl, params, header, getPrivateVenuesCallback, failed);
                    service.launchService();
                }.bind(this));
            },

            getFormattedUserInfo: function (userInfo, succeed, failed) {
                // user object to return
                ////var userInfoFs = new UserInfoFs();
                var userInfoFs;
                
                this._getPrivateVenue(userInfo.access_token, failed).then(
                    function (privateVenues) {
                        ////var credentialsToSend =  {
                        ////    access_token: userInfo.access_token,
                        ////    payload: userInfo
                        ////};

                        //userInfoFs.localCredentials = FoursquareApi._getCredentials(userInfo, failed);
                        ////userInfoFs.credentialsToSend = credentialsToSend;
                        ////userInfoFs.data = privateVenues;
                        userInfoFs = new UserInfo(privateVenues, new CredentialsTemplate.FsCredentials(userInfo.access_token, userInfo));
                        succeed(userInfoFs);
                    });
                
            },

            searchVenues: function (venue, near, succeed, failed) {
                var foursquareSearchUrl = ConnectorsApiHelper.foursquareSearchUrl;
                var clientID = ConnectorsApiHelper.foursquareApplicationClientID;
                var clientSecret = ConnectorsApiHelper.foursquareApplicationClientSecret;
                var urlSearch = foursquareSearchUrl + this._CLIENT_ID + "=" + clientID + "&" + this._CLIENT_SECRET + "=" + clientSecret + "&" + this._NEAR + "=" + near + "&" + this._LIMIT + "=15&" + this._QUERY + "=" + venue;
                var params = null;
                var header = null;

                var service = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Get, urlSearch, params, header, searchVenuesSucceed, searchVenuesFailed);
                service.launchService();

                function searchVenuesSucceed(venues) {
                    var formatedVenues = JSON.parse(venues.responseText).response.venues;
                    succeed(formatedVenues);
                }

                function searchVenuesFailed(error) {
                    failed(error);
                }
            },
       });

////var UserInfoFs = function () {
////    this.credentialsToSend = {
////        access_token: null,
////        payload: null,
////    },
////    //this.localCredentials;
////    this.data;
////}
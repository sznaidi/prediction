var TwitterApi = WinJS.Class.define(
       // The constructor function.
       function () {
       },

       // The set of instance members.
       {           
       },

       // The set of static members.
       {
            _OAUTH_TOKEN: "oauth_token",
            _OAUTH_TOKEN_SECRET: "oauth_token_secret",
            _USER_ID: "user_id",
            _SCREEN_NAME: "screen_name",
            _RequestType: {
                requestToken: 1,
                searchQuery: 2,
                other: 3
            },

            _prepareDataToSend: function (url, request, oauth_token, oauth_verif, query) {
                var twitterURL = url;
                var clientID = ConnectorsApiHelper.TwitterApplicationID;
                var clientSecret = ConnectorsApiHelper.TwitterApplicationSecret;
                var timestamp = Math.round(new Date().getTime() / 1000.0);
                var nonce = Math.random();
                nonce = Math.floor(nonce * 1000000000);
                nonce = btoa(nonce);

                var keyText = encodeURIComponent(clientSecret) + "&";
                keyText += oauth_verif ? encodeURIComponent(oauth_verif) : '';

                var keyMaterial = Windows.Security.Cryptography.CryptographicBuffer.convertStringToBinary(keyText, Windows.Security.Cryptography.BinaryStringEncoding.utf8);
                var macAlgorithmProvider = Windows.Security.Cryptography.Core.MacAlgorithmProvider.openAlgorithm("HMAC_SHA1");
                var key = macAlgorithmProvider.createKey(keyMaterial);
        

                switch (request) {
                    case TwitterApi._RequestType.requestToken:
                        var callbackURL = ConnectorsApiHelper.TwitterApplicationCallbackUrl;
                        var sigBaseStringParams = "oauth_callback=" + encodeURIComponent(callbackURL);
                        sigBaseStringParams += "&" + "oauth_consumer_key=" + clientID;
                        sigBaseStringParams += "&" + "oauth_nonce=" + nonce;
                        sigBaseStringParams += "&" + "oauth_signature_method=HMAC-SHA1";
                        sigBaseStringParams += "&" + "oauth_timestamp=" + timestamp;
                        sigBaseStringParams += "&" + "oauth_version=1.0";

                        var sigBaseString = "POST&";
                        sigBaseString += encodeURIComponent(twitterURL) + "&" + encodeURIComponent(sigBaseStringParams);

                        var tbs = Windows.Security.Cryptography.CryptographicBuffer.convertStringToBinary(sigBaseString, Windows.Security.Cryptography.BinaryStringEncoding.utf8);
                        var signatureBuffer = Windows.Security.Cryptography.Core.CryptographicEngine.sign(key, tbs);
                        var signature = Windows.Security.Cryptography.CryptographicBuffer.encodeToBase64String(signatureBuffer);

                        var dataToPost = "OAuth oauth_callback=\"" + encodeURIComponent(callbackURL) + "\", oauth_consumer_key=\"" + clientID + "\", oauth_nonce=\"" + nonce + "\", oauth_signature_method=\"HMAC-SHA1\", oauth_timestamp=\"" + timestamp + "\", oauth_version=\"1.0\", oauth_signature=\"" + encodeURIComponent(signature) + "\"";
                        return dataToPost;
                        
                        break;
                    
                    case TwitterApi._RequestType.searchQuery:
                        var sigBaseStringParams = "";
                        sigBaseStringParams += "oauth_consumer_key=" + clientID,
                        sigBaseStringParams += "&" + "oauth_nonce=" + nonce,
                        sigBaseStringParams += "&" + "oauth_signature_method=HMAC-SHA1",
                        sigBaseStringParams += "&" + "oauth_timestamp=" + timestamp,
                        sigBaseStringParams += "&" + "oauth_token=" + oauth_token,
                        sigBaseStringParams += "&" + "oauth_version=1.0",
                        sigBaseStringParams += "&" + "page=1",
                        sigBaseStringParams += "&" + "per_page=15",
                        sigBaseStringParams += "&" + "q=" + query
                        
                        var sigBaseString = "GET&";
                        sigBaseString += encodeURIComponent(twitterURL) + "&" + encodeURIComponent(sigBaseStringParams);

                        var tbs = Windows.Security.Cryptography.CryptographicBuffer.convertStringToBinary(sigBaseString, Windows.Security.Cryptography.BinaryStringEncoding.Utf8);
                        var signatureBuffer = Windows.Security.Cryptography.Core.CryptographicEngine.sign(key, tbs);
                        var signature = Windows.Security.Cryptography.CryptographicBuffer.encodeToBase64String(signatureBuffer);

                        var dataToPost = "OAuth oauth_consumer_key=\"" + clientID + "\", oauth_token=\"" + oauth_token + "\", oauth_nonce=\"" + nonce + "\", oauth_signature_method=\"HMAC-SHA1\", oauth_timestamp=\"" + timestamp + "\", oauth_version=\"1.0\", oauth_signature=\"" + encodeURIComponent(signature) + "\"";
                        return dataToPost;

                        break;

                    case TwitterApi._RequestType.other:
                        var sigBaseStringParams = "";
                        sigBaseStringParams += "oauth_consumer_key=" + clientID,
                        sigBaseStringParams += "&" + "oauth_nonce=" + nonce,
                        sigBaseStringParams += "&" + "oauth_signature_method=HMAC-SHA1",
                        sigBaseStringParams += "&" + "oauth_timestamp=" + timestamp,
                        sigBaseStringParams += "&" + "oauth_token=" + oauth_token,
                        sigBaseStringParams += "&" + "oauth_version=1.0"
                        
                        var sigBaseString = "GET&";
                        sigBaseString += encodeURIComponent(twitterURL) + "&" + encodeURIComponent(sigBaseStringParams);

                        var tbs = Windows.Security.Cryptography.CryptographicBuffer.convertStringToBinary(sigBaseString, Windows.Security.Cryptography.BinaryStringEncoding.Utf8);
                        var signatureBuffer = Windows.Security.Cryptography.Core.CryptographicEngine.sign(key, tbs);
                        var signature = Windows.Security.Cryptography.CryptographicBuffer.encodeToBase64String(signatureBuffer);

                        var dataToPost = "OAuth oauth_consumer_key=\"" + clientID + "\", oauth_token=\"" + oauth_token + "\", oauth_nonce=\"" + nonce + "\", oauth_signature_method=\"HMAC-SHA1\", oauth_timestamp=\"" + timestamp + "\", oauth_version=\"1.0\", oauth_signature=\"" + encodeURIComponent(signature) + "\"";
                        return dataToPost;

                        break;

                }
            },

            _authentication: function (succeed, failed) {
                this.twitterURL = ConnectorsApiHelper.TwitterRequestTokenUrl;
                this.params = null;
                this.header = { "Authorization": TwitterApi._prepareDataToSend(this.twitterURL, TwitterApi._RequestType.requestToken) };

                this.succeed = succeed;
                this.failed = failed;

                this.launchAuthSucceed = function (data) {
                    var response = data.responseText;
                    var oauth_token;
                    var oauth_token_secret;
                    keyValPairs = response.split("&");

                    for (var i = 0; i < keyValPairs.length; i++) {
                        var splits = keyValPairs[i].split("=");
                        switch (splits[0]) {
                            case TwitterApi._OAUTH_TOKEN:
                                oauth_token = splits[1];
                                break;
                            case TwitterApi._OAUTH_TOKEN_SECRET:
                                oauth_token_secret = splits[1];
                                break;
                        }
                    }

                    // Send the user to authorization
                    var twitterAuthorizationUrl = ConnectorsApiHelper.TwitterAuthorizationUrl + oauth_token + "&force_login=true";
                    try {
                        var startURI = new Windows.Foundation.Uri(twitterAuthorizationUrl);
                        var endURI = new Windows.Foundation.Uri(ConnectorsApiHelper.TwitterApplicationCallbackUrl);
                        Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync(
                                                                        Windows.Security.Authentication.Web.WebAuthenticationOptions.none,
                                                                        startURI,
                                                                        endURI).then(this.succeed, this.failed);
                    }
                    catch (exception) {
                        this.failed(JSON.parse(exception.responseText).error.message);
                    }
                }.bind(this);

                this.launchAuth = function () {
                    var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Post, this.twitterURL, this.params, this.header, this.launchAuthSucceed, this.failed);
                    request.launchService();
                }.bind(this);
            },

            launchWebAuth: function (succeed, failed) {
                var authRequest = new this._authentication(succeed, failed);
                authRequest.launchAuth();
            },

            isBackButtonPressed: function (authResult) {
                if (authResult) {
                    if (authResult.responseData.indexOf("oauth_token") != -1)
                        return false;
                    return true;// Back button or cancel button pressed 
                }
            },
    
            getTokenInfo: function (authResult, succeed, failed) {
                try {
                    var header = authResult.responseData.split(ConnectorsApiHelper.TwitterApplicationCallbackUrl + '?oauth_token=');
                    if (header.length > 0) {
                        var tokens = header[1].split("&oauth_verifier=");
                        var oauth_token = tokens[0];
                        var oauth_verif = tokens[1];
                        var tokenUrl = ConnectorsApiHelper.TwitterAccessTokenUrl;
                        var header = { "Authorization": TwitterApi._prepareDataToSend(tokenUrl, TwitterApi._RequestType.other, oauth_token, oauth_verif) };
                        var params = null;
                        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Post, tokenUrl, params, header, succeed, failed);
                        request.launchService();
                    }
                }
                catch(exception) {
                    failed(exception);
                }
            },

            getUserInfo: function (token, succeed, failed) {
                token = token.responseText;
                var keyValPairs = token.split("&");
                var oauth_token;
                var oauth_token_secret;
                var screen_name;
                var user_id;
                
                for (var i = 0; i < keyValPairs.length; i++) {
                    var splits = keyValPairs[i].split("=");
                    switch (splits[0]) {
                        case TwitterApi._OAUTH_TOKEN:
                            oauth_token = splits[1];
                            break;
                        case TwitterApi._OAUTH_TOKEN_SECRET:
                            oauth_token_secret = splits[1];
                            break;
                        case TwitterApi._SCREEN_NAME:
                            screen_name = splits[1];
                            break;
                        case TwitterApi._USER_ID:
                            user_id = splits[1];
                            break;
                    }
                }

                getDetailedUserInfoCallback = function (details) {
                    //the payload !!!!
                    var userInfo = JSON.parse(details.responseText);
                    userInfo.oauth_token = oauth_token;
                    userInfo.oauth_token_secret = oauth_token_secret;
                    succeed(userInfo);
                };

                var params = null;
                var header = null;
                // get user detailed informations
                var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Get, ConnectorsApiHelper.TwitterUserInfoUrl + screen_name, params, header, getDetailedUserInfoCallback, failed);
                request.launchService();
            },

            verifyCredentials: function (credentials, succeed, failed) {
                var oauth_token = credentials.access_token;
                var oauth_verif = credentials.access_token_secret;
                
                if (oauth_token && oauth_verif) {
                    var credentialsUrl = ConnectorsApiHelper.TwitterVerifyCredentialsUrl;
                    var header = { "Authorization": TwitterApi._prepareDataToSend(credentialsUrl, TwitterApi._RequestType.other, oauth_token, oauth_verif) };

                    var verifyCredentialsFail = function (error) {
                        var errorObj;

                        if (error.response) {
                            var errorObj = JSON.parse(error.response).errors[0];
                            if (TwitterApi._isInvalidCredentials(errorObj.code)) {
                                failed(error);
                            }
                            else {
                                Messages.showOkMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.TW_API_ERROR);
                            }
                        }
                        else {
                            Messages.showOkMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.TW_API_ERROR);
                        }
                    };

                    var verifyCredentialsSucceed = function (userResponse) {
                        var token = TwitterApi._formatToken(credentials);
                        TwitterApi.getUserInfo(token, succeed, failed);
                    };

                    var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Get, credentialsUrl, null, header, verifyCredentialsSucceed, verifyCredentialsFail);
                    request.launchService();
                }
                else {
                    var error = {
                        reponse: "{\"errors\":[{\"message\":\"Invalid or expired token\",\"code\":89}]}",
                        reponseText: "{\"errors\":[{\"message\":\"Invalid or expired token\",\"code\":89}]}"
                    }
                    failed(error);
                }
            },

            searchUsers: function (credentials, searchQuery, succeed, failed) {
                var oauth_token = credentials.access_token;
                var oauth_verif = credentials.access_token_secret;

                
                var header = { "Authorization": TwitterApi._prepareDataToSend(ConnectorsApiHelper.TwitterSearchUsersUrl, TwitterApi._RequestType.searchQuery, oauth_token, oauth_verif, searchQuery) };
                var param = "?page=1&per_page=15&q=" + searchQuery;
                var userSearchUrl = ConnectorsApiHelper.TwitterSearchUsersUrl + param;
                
                var getUsersSucceed = function (userResponse) {
                    var searchResult = JSON.parse(userResponse.response);
                    succeed(searchResult);
                };

                var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Api, CDServicesAccess.typeRequest.Get, userSearchUrl, param, header, getUsersSucceed, failed);
                request.launchService();
            },

            //_getCredentials: function (userInfo, failed) {
            //    try {
            //        // tw credentials contructor (account_id, name, handle, image_url, access_token, access_token_secret, timezone, status)
            //        var status;// default 1 = valid if not set
            //        var TwCredentials = new CredentialsTemplate.TwCredentials(userInfo.id, userInfo.name, userInfo.screen_name, userInfo.profile_image_url, userInfo.oauth_token, userInfo.oauth_token_secret, userInfo.time_zone, status);
            //        return TwCredentials;
            //    }
            //    catch (Exception) {
            //        failed(Exception);
            //    }
            //},

            _isInvalidCredentials: function (code) {
                if (code == 89) { //message == "Invalid or expired token"
                    return true;
                }

                return false;
            },

            _formatToken: function (credentials) {
                var userId = credentials.access_token.split("-")[0];
                var param = "";
                param += "oauth_token=" + credentials.access_token;
                param += "&oauth_token_secret=" + credentials.access_token_secret;
                param += "&user_id=" + userId;
                param += "&screen_name=" + credentials.handle;

                var token = {
                    "responseText": param,
                    "reponse": param
                }

                return token;
            },

            getFormattedUserInfo: function (userInfo, succeed, failed) {
                ////var credentialsToSend = {
                ////    access_token: userInfo.oauth_token,
                ////    access_token_secret: userInfo.oauth_token_secret,
                ////    payload: userInfo
                ////};

                ////// user object to return
                ////var userInfoTw = new UserInfoTw();
                //////userInfoTw.localCredentials = this._getCredentials(userInfo, failed);
                ////userInfoTw.credentialsToSend = credentialsToSend;
                
                var userInfoTw = new UserInfo(userInfo, new CredentialsTemplate.TwCredentials(userInfo.oauth_token, userInfo, userInfo.oauth_token_secret));
                succeed(userInfoTw);
            }


       });

////var UserInfoTw = function () {
////    this.credentialsToSend = {
////        access_token: null,
////        access_token_secret: null,
////        payload: null,
////    };
////    //this.localCredentials;
////};
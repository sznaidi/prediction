var UserInfo = function (userData, credentials)
{
    this.data = userData;
    this.credentialsToSend = credentials;
};

var ConnectorsApiFactory = WinJS.Class.define(
    // The constructor function.
    function (connectorType) {
        this._ConnectorType = connectorType;
    },

    // The set of instance members.
    {
        _ConnectorType: "",

        launchWebAuth: function (succeed, failed) {
            DataSourcesHelper.isWebBrokerActive = true;
            switch (this._ConnectorType) {
                case ConnectorsTemplate.ConnectorType.Atlas: AtlasApi.launchWebAuth(succeed, failed); break;
                case ConnectorsTemplate.ConnectorType.Facebook: FacebookApi.launchWebAuth(succeed, failed); break;
                case ConnectorsTemplate.ConnectorType.Foursquare: FoursquareApi.launchWebAuth(succeed, failed); break;
                case ConnectorsTemplate.ConnectorType.GoogleAnalytics: GoogleAnalyticsApi.launchWebAuth(succeed, failed); break;
                case ConnectorsTemplate.ConnectorType.Twitter: TwitterApi.launchWebAuth(succeed, failed); break;
            }
        },

        launchWebAuthSucceed: function (authResult, getTokenInfoSucceed, getTokenInfoFailed) {
            DataSourcesHelper.isWebBrokerActive = false;
            CDHelper.showHideLoading(true);
            switch (this._ConnectorType) {
                case ConnectorsTemplate.ConnectorType.Atlas: break;
                case ConnectorsTemplate.ConnectorType.Facebook:
                    if (FacebookApi.isBackButtonPressed(authResult)) {
                        getTokenInfoFailed(this._ConnectorType);
                        CDHelper.showHideLoading(false);
                    }
                    else
                        FacebookApi.getTokenInfo(authResult, getTokenInfoSucceed, getTokenInfoFailed);
                    break;

                case ConnectorsTemplate.ConnectorType.Foursquare:
                    if (FoursquareApi.isBackButtonPressed(authResult)) {
                        getTokenInfoFailed(this._ConnectorType);
                        CDHelper.showHideLoading(false);
                    }

                    else
                        FoursquareApi.getTokenInfo(authResult, getTokenInfoSucceed, getTokenInfoFailed);
                    break;

                case ConnectorsTemplate.ConnectorType.GoogleAnalytics:
                    if (GoogleAnalyticsApi.isBackButtonPressed(authResult)) {
                        getTokenInfoFailed(this._ConnectorType);
                        CDHelper.showHideLoading(false);
                    }
                    else
                        GoogleAnalyticsApi.getTokenInfo(authResult, getTokenInfoSucceed, getTokenInfoFailed);
                    break;

                case ConnectorsTemplate.ConnectorType.Twitter:
                    if (TwitterApi.isBackButtonPressed(authResult)) {
                        getTokenInfoFailed(this._ConnectorType);
                        CDHelper.showHideLoading(false);
                    }
                    else
                        TwitterApi.getTokenInfo(authResult, getTokenInfoSucceed, getTokenInfoFailed);
                    break;
            }
        },

        getTokenInfoSucceed: function (token, getUserInfoSucceed, getUserInfoFailed) {
            switch (this._ConnectorType) {
                case ConnectorsTemplate.ConnectorType.Atlas: break;
                case ConnectorsTemplate.ConnectorType.Facebook: FacebookApi.getUserInfo(token, getUserInfoSucceed, getUserInfoFailed); break;
                case ConnectorsTemplate.ConnectorType.Foursquare: FoursquareApi.getUserInfo(token, getUserInfoSucceed, getUserInfoFailed); break;
                case ConnectorsTemplate.ConnectorType.GoogleAnalytics: GoogleAnalyticsApi.getUserInfo(token, getUserInfoSucceed, getUserInfoFailed); break;
                case ConnectorsTemplate.ConnectorType.Twitter: TwitterApi.getUserInfo(token, getUserInfoSucceed, getUserInfoFailed); break;
            }
        },

        getUserInfoSucceed: function (userInfo, getFormattedUserInfoSucceed, getFormattedUserInfoFailed) {
            switch (this._ConnectorType) {
                case ConnectorsTemplate.ConnectorType.Atlas: AtlasApi.getFormattedUserInfo(userInfo, getFormattedUserInfoSucceed, getFormattedUserInfoFailed); break;
                case ConnectorsTemplate.ConnectorType.Facebook: FacebookApi.getFormattedUserInfo(userInfo, getFormattedUserInfoSucceed, getFormattedUserInfoFailed); break;
                case ConnectorsTemplate.ConnectorType.Foursquare: FoursquareApi.getFormattedUserInfo(userInfo, getFormattedUserInfoSucceed, getFormattedUserInfoFailed); break;
                case ConnectorsTemplate.ConnectorType.GoogleAnalytics: GoogleAnalyticsApi.getFormattedUserInfo(userInfo, getFormattedUserInfoSucceed, getFormattedUserInfoFailed); break;
                case ConnectorsTemplate.ConnectorType.Twitter: TwitterApi.getFormattedUserInfo(userInfo, getFormattedUserInfoSucceed, getFormattedUserInfoFailed); break;
            }
        },

        verifyCredentials: function (credentials, succeed, failed) {
            switch (this._ConnectorType) {
                case ConnectorsTemplate.ConnectorType.Atlas: AtlasApi.getAgencies(credentials.id, succeed, failed); break;//todo cote service
                case ConnectorsTemplate.ConnectorType.Facebook: FacebookApi.getUserInfo(credentials.access_token, succeed, failed); break;
                case ConnectorsTemplate.ConnectorType.Foursquare: FoursquareApi.getUserInfo(credentials.access_token, succeed, failed); break;
                case ConnectorsTemplate.ConnectorType.GoogleAnalytics: GoogleAnalyticsApi.getUserInfo(credentials, succeed, failed); break;
                case ConnectorsTemplate.ConnectorType.Twitter: TwitterApi.verifyCredentials(credentials, succeed, failed); break;
            }
        },
    },

     // The set of static members.
    {
    //BrokerBackButtonPressed: true,
    }
    );


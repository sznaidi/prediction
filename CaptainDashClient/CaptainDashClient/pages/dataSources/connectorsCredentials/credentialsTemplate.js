(function () {

    var Credentials = WinJS.Class.define(
    // The constructor function.
    function (accessToken, payload) {
        this.access_token = accessToken;
        this.payload = payload;
    },

    // The set of instance members.
    {
        access_token: null,
        payload: null,
    },

    // The set of static members.
    {}
    );
    //Facebook 
    var AtCredentials = WinJS.Class.derive(Credentials,
        // The constructor function.
        function (accessToken, payload, userName, password) {
            //call base class constructor
            Credentials.call(this, accessToken, payload);
            this.username = userName;
            this.password = password;
        },

        // The set of instance members.
        {
            username: null,
            password: null,
        },

        // The set of static members.
        {
        });
    //Facebook 
    var FbCredentials = WinJS.Class.derive(Credentials,
        // The constructor function.
        function (accessToken, payload) {
            //call base class constructor
            Credentials.call(this, accessToken, payload);
        },

        // The set of instance members.
        {
        },

        // The set of static members.
        {
        });

    //Twitter 
    var TwCredentials = WinJS.Class.derive(Credentials,
    // The constructor function.
    function (accessToken, payload, accessTokenSecret) {
        //call base class constructor
        Credentials.call(this, accessToken, payload);
        this.access_token_secret = accessTokenSecret;
    },

    // The set of instance members.
    {
        access_token_secret: null,
    },

    // The set of static members.
    {
    });

    //Foursquare 
    var FsCredentials = WinJS.Class.derive(Credentials,
        // The constructor function.
        function (accessToken, payload) {
            //call base class constructor
            Credentials.call(this, accessToken, payload);
        },

        // The set of instance members.
        {
        },

        // The set of static members.
        {
        });

    //Google analytics 
    var GaCredentials = WinJS.Class.derive(Credentials,
    // The constructor function.
    function (accessToken, payload, refreshToken) {
        //call base class constructor
        Credentials.call(this, accessToken, payload);
        this.refresh_token = refreshToken;
    },

    // The set of instance members.
    {
        refresh_token: null,
    },

    // The set of static members.
    {
    });

    //////Super Class
    ////var Credential = WinJS.Class.define(
    ////    // The constructor function.
    ////    function (account_id, name, handle, image_url, access_token, timezone, status) {
    ////        this.account_id = account_id;
    ////        this.name = name;
    ////        this.handle = handle;
    ////        this.access_token = access_token;

    ////        if (status)
    ////            this.status = status;
    ////        else
    ////            this.status = 1;

    ////        if (timezone)
    ////            this.timezone = timezone;
    ////        else
    ////            this.timezone = "Europe/Paris";

    ////        if (image_url) {
    ////            this.image_url = image_url;
    ////        }
    ////        else
    ////            this.image_url = "";
    ////    },

    ////    // The set of instance members.
    ////    {
    ////        id:null,
    ////        account_id : "",
    ////        name: "",
    ////        handle: "",
    ////        image_url: "",
    ////        access_token: "",
    ////        status: 1,
    ////        timezone: "Europe/Paris"
    ////    },

    ////    // The set of static members.
    ////    {}
    ////    );

    //////Facebook Connector
    ////var FbCredentials = WinJS.Class.derive(Credential,
    ////    // The constructor function.
    ////    function (account_id, name, handle, image_url, access_token, timezone, status) {
    ////        //call base class constructor
    ////        Credential.call(this, account_id, name, handle, image_url, access_token, timezone, status);

    ////        //add FB specific variables
    ////        //...
    ////    },

    ////    // The set of instance members.
    ////    {
    ////        formatCredentials: function () {

    ////            return {
    ////                type: ConnectorsTemplate.ConnectorType.Facebook,
    ////                credential: this
    ////            };
    ////        }
    ////    },

    ////    // The set of static members.
    ////    {
    ////    });

    //////Foursquare Connector
    ////var FsCredentials = WinJS.Class.derive(Credential,
    ////    // The constructor function.
    ////    function (account_id, name, handle, image_url, access_token) {
    ////        //call base class constructor
    ////        Credential.call(this, account_id, name, handle, image_url, access_token);
    ////    },

    ////    // The set of instance members.
    ////    {
    ////        formatCredentials: function () {

    ////            return {
    ////                type: ConnectorsTemplate.ConnectorType.Foursquare,
    ////                credential: this
    ////            };
    ////        }
    ////    },

    ////    // The set of static members.
    ////    {
    ////    });

    //////Google analytics Connector
    ////var GaCredentials = WinJS.Class.derive(Credential,
    ////// The constructor function.
    ////function (account_id, name, handle, image_url, access_token, timezone, status, refreshToken) {
    ////    //call base class constructor
    ////    Credential.call(this, account_id, name, handle, image_url, access_token, timezone, status, refreshToken);
    ////    this.refresh_token = refreshToken;
    ////},

    ////// The set of instance members.
    ////{
    ////    formatCredentials: function () {

    ////        return {
    ////            type: ConnectorsTemplate.ConnectorType.GoogleAnalytics,
    ////            credential: this
    ////        };
    ////    }
    ////},

    ////// The set of static members.
    ////{
    ////});

    //////Atlas Connector
    ////var AtCredentials = WinJS.Class.derive(Credential,
    ////// The constructor function.
    ////function () {
    ////    //call base class constructor
    ////    Credential.call(this);
    ////},

    ////// The set of instance members.
    ////{
    ////    formatCredentials: function () {

    ////        return {
    ////            type: ConnectorsTemplate.ConnectorType.Atlas,
    ////            credential: this
    ////        };
    ////    }
    ////},

    ////// The set of static members.
    ////{
    ////});

    //////Twitter Connector
    ////var TwCredentials = WinJS.Class.derive(Credential,
    ////// The constructor function.
    ////function (account_id, name, handle, image_url, access_token, access_token_secret, timezone, status) {
    ////    //call base class constructor
    ////    Credential.call(this, account_id, name, handle, image_url, access_token, timezone, status);
    ////    this.access_token_secret = access_token_secret;
    ////},

    ////// The set of instance members.
    ////{
    ////    formatCredentials: function () {

    ////        return {
    ////            type: ConnectorsTemplate.ConnectorType.Twitter,
    ////            credential: this
    ////        };
    ////    }
    ////},

    ////// The set of static members.
    ////{
    ////});



    WinJS.Namespace.define("CredentialsTemplate",
    {
        AtCredentials: AtCredentials,
        FsCredentials:FsCredentials,
        FbCredentials: FbCredentials,
        TwCredentials: TwCredentials,
        GaCredentials: GaCredentials,
    });
})();
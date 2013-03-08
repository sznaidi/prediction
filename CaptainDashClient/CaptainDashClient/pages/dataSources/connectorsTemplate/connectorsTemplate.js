(function () {
    var ConnectorType = {
        GoogleAnalytics: "ga",
        Twitter: "twitter",
        Atlas: "atlas",
        Foursquare: "foursquare",
        Facebook: "facebook",
        All: "all",
    };
    
    //[A.A]: define connectors labels
    var ConnectorLabel = {
        GoogleAnalytics: "Google analytics",
        Twitter: "Twitter",
        Atlas: "Atlas",
        Foursquare: "Foursquare",
        Facebook: "Facebook",
    }

    var ConnectorStatus = {
        Pending: 1,
        Done: 2,
        Failed: 3,
    };

    var ConnectorStatusLabel = {
        Pending: "Pending",
        Done: "Done",
        Failed: "Last update failed",
    };
    

    var ConnectorToultip = {
        Facebook: "url('/pages/dataSources/ConnectorsTemplate/images/fbToultip.png')",
        Foursquare: "url('/pages/dataSources/ConnectorsTemplate/images/fsToultip.png')",
        Atlas: "url('/pages/dataSources/ConnectorsTemplate/images/atToultip.png')",
        GoogleAnalytics: "url('/pages/dataSources/ConnectorsTemplate/images/gaToultip.png')",
        Twitter: "url('/pages/dataSources/ConnectorsTemplate/images/twToultip.png')",
        NewSource: "url('/pages/dataSources/ConnectorsTemplate/images/newSource.png')",
    };
    
    var DefaultTile = {
        Facebook: "url('/pages/dataSources/ConnectorsTemplate/images/defaultTiles/facebookDefaultStatus.png')",
        Foursquare: "url('/pages/dataSources/ConnectorsTemplate/images/defaultTiles/foursquareDefaultStatus.png')",
        Atlas: "url('/pages/dataSources/ConnectorsTemplate/images/defaultTiles/atlasDefaultStatus.png')",
        GoogleAnalytics: "url('/pages/dataSources/ConnectorsTemplate/images/defaultTiles/googleDefaultStatus.png')",
        Twitter: "url('/pages/dataSources/ConnectorsTemplate/images/defaultTiles/twitterDefaultStatus.png')",
    };
    
    //class connector
    var ConnectorInfo = function() {
        //this.title = '';//TODO
        this.credential_id = '';
        this.public;
        this.payload;
    };
    
    var ConnectorModelToSend = function(connectorType) {
        this.type = connectorType;
        this.connector = new ConnectorInfo();
    };
    
    //Super Class
    var Connector = WinJS.Class.define(
        // The constructor function.
        function (title, description, prefix, requestId, accessToken, sinceToken, isPublic, timezone, type, groupId) {
            this.title = title;
            this.description = description;
            this.prefix = prefix;
            this.request_id = requestId;
            this.access_token = accessToken;
            this.since_token = sinceToken;
            this.public = isPublic;
            this.timezone = timezone;
            this.type = type;
            this.group_id = groupId;
        },

        // The set of instance members.
        {
            title: "", //type: String
            description: "", //type: String
            prefix: "", //type: String
            request_id: "", //type: String
            access_token: "", //type: String
            since_token: "", //type: String
            public: false, //type: Boolean, default: false
            status: ConnectorStatus.Pending, //type: Integer, 
            synchronized_at: Date.now(), //type: DateTime
            created_at: Date.now(), // type:DateTime
            updated_at: Date.now(), // type:DateTime
            timezone: "", //type: String
            group_id: "", //type: String
            dashboard_id : "50dc22648a8e497891000001",
            type: ConnectorType.GoogleAnalytics,
           
        },

        // The set of static members.
        {
            getStatusLabel: function (status) {
                switch (status) {
                    case ConnectorStatus.Pending:
                        return ConnectorStatusLabel.Pending;
                    case ConnectorStatus.Done:
                        return ConnectorStatusLabel.Done;
                    case ConnectorStatus.Failed:
                        return ConnectorStatusLabel.Failed;
                    default:
                        return ConnectorStatusLabel.Failed;
                }
            },
            getConnectorTooltip: function (type) {
                switch (type) {
                    case ConnectorType.Facebook:
                        return ConnectorToultip.Facebook;
                    case ConnectorType.Twitter:
                        return ConnectorToultip.Twitter;
                    case ConnectorType.GoogleAnalytics:
                        return ConnectorToultip.GoogleAnalytics;
                    case ConnectorType.Foursquare:
                        return ConnectorToultip.Foursquare;
                    case ConnectorType.Atlas:
                        return ConnectorToultip.Atlas;
                    case ConnectorType.All:
                        {
                            return ConnectorToultip.NewSource;
                        }
                }
            },
            getConnectorLabel: function (type) {
                switch (type) {
                    case ConnectorType.Facebook:
                        return ConnectorLabel.Facebook;
                    case ConnectorType.Twitter:
                        return ConnectorLabel.Twitter;
                    case ConnectorType.GoogleAnalytics:
                        return ConnectorLabel.GoogleAnalytics;
                    case ConnectorType.Foursquare:
                        return ConnectorLabel.Foursquare;
                    case ConnectorType.Atlas:
                        return ConnectorLabel.Atlas;
                    case ConnectorType.All:
                        {
                            return "";
                        }
                    default: return type;
                }
            },
        }
        );

    //-----------Facebook Connector--------------
    var FbConnector = WinJS.Class.derive(Connector,
    // The constructor function.
    function (title, description, prefix, requestId, accessToken, sinceToken, isFanPage, timezone, type, objectId){
        //call base class constructor
        Connector.call(this, title, description, prefix, requestId, accessToken, sinceToken, isFanPage, timezone, type, objectId);

        this.obj_id = objectId;
    },

    // The set of instance members.
    {     
        Type: ConnectorType.Facebook,
        Obj_id: "", //type: String

        //clone: function () {
        //    var connector = new FbConnector(this.Access_token, this.Timezone, this.Obj_id);
        //    connector.Created_at = this.Created_at;
        //    return connector;
        //},
   
},

    // The set of static members.
    {
    });


    //---------Foursquare Connector------------
    var FsConnector = WinJS.Class.derive(Connector,
    // The constructor function.
    function (title, description, prefix, requestId, accessToken, sinceToken, isPublic, timezone, type, venueId) {
        //call base class constructor
        Connector.call(this, title, description, prefix, requestId, accessToken, sinceToken, isPublic, timezone, type, venueId);
        this.venue_id = venueId;
    },

    // The set of instance members.
    {
        venue_id: "", // type: String
    },

    // The set of static members.
    {
    });

    //--------Google analytics Connector--------
    var GaConnector = WinJS.Class.derive(Connector,
    // The constructor function.
    function (title, description, prefix, requestId, accessToken, sinceToken, isPublic, timezone, type, refreshToken, profileId) {
        //call base class constructor
        Connector.call(this, title, description, prefix, requestId, accessToken, sinceToken, isPublic, timezone, type, refreshToken, profileId);
        this.refresh_token = refreshToken;
        this.profile_id = profileId;
    },

    // The set of instance members.
    {
        refresh_token: "", // type: String
        profile_id: "", // type: String
    },

    // The set of static members.
    {
    });


    //---------Atlas Connector-----------------
    var AtConnector = WinJS.Class.derive(Connector,
    // The constructor function.
    function (title, description, prefix, requestId, accessToken, sinceToken, isPublic, timezone, type, username, password, client_guid) {
        //call base class constructor
        Connector.call(this, title, description, prefix, requestId, accessToken, sinceToken, isPublic, timezone, type, password, client_guid);
        this.username = username;
        this.password = password;
        this.client_guid = client_guid;
    },

    // The set of instance members.
    {
        username: "", // type: String
        password: "", // type: String
        client_guid: "", // type: String

    },

    // The set of static members.
    {
    });

   
    //-----------Twitter Connector-----------
    var TwConnector = WinJS.Class.derive(Connector,
    // The constructor function.
        function (title, description, prefix, requestId, accessToken, sinceToken, isPublic, timezone, type, accessTokenSecret, uid) {
            //call base class constructor
            Connector.call(this, title, description, prefix, requestId, accessToken, sinceToken, isPublic, timezone, type, accessTokenSecret, uid);
            this.access_token_secret = accessTokenSecret;
            this.uid = uid;
        },

    // The set of instance members.
    {
        access_token_secret: "", // type: String
        uid: "", // Bignum ??? ToDo!!!
    },

    // The set of static members.
    {
    });

    WinJS.Namespace.define("ConnectorsTemplate",
        {
            ConnectorModelToSend:ConnectorModelToSend,
            ConnectorStatusLabel: ConnectorStatusLabel,
            ConnectorType: ConnectorType,
            ConnectorLabel: ConnectorLabel,
            ConnectorStatus: ConnectorStatus,
            DefaultTile: DefaultTile,
            Connector: Connector,
            AtConnector: AtConnector,
            FbConnector: FbConnector,
            FsConnector: FsConnector,
            GaConnector: GaConnector,
            TwConnector: TwConnector,
        });
})();
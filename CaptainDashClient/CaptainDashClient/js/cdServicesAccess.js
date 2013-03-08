(function () {
    "use strict";
    var _TIMEOUT_SERVICE = 60000;
    var _TIMEOUT_API = 20000;

    var CdServices = WinJS.Class.define(
        // The constructor function.
        function (serviceType, type, urlService, params, header, serviceSucceed, serviceFailed) {
            this.Type = type;
            this.UrlService = urlService;

            this.Params = params;
            this.Header = header;
            this.Timeout = this._getTimeout(serviceType);
            this.ServiceSucceed = serviceSucceed || function () { };
            this.ServiceFailed = serviceFailed || function () { };

            this.user = CdServices._getUserFromParam(params);
            this.password = CdServices._getPasswordFromParam(params);
        },

        // The set of instance members.
        {
            Type:"",
            UrlService:"",
            Params:"",
            Header: "",
            Timeout: _TIMEOUT_SERVICE,
            ServiceSucceed: function () { },
            ServiceFailed: function () { },
            launchService: function () {
                if (!ConnectionHelper.hasInternetConnection() && WinJS.Navigation.location != '') 
                    Messages.showTryAgainMessage(MessagesHelper.MSG_NO_INTERNET_TITLE, MessagesHelper.MSG_NO_INTERNET_TEXT, function () { this.launchService() }.bind(this));
                else
                    this._launch().then(
                        this.ServiceSucceed
                        ,
                       this.ServiceFailed
                    )          
            },

            _getTimeout : function(serviceType)
            {
                switch (serviceType) {
                    case CDServicesAccess.ServiceType.Service: return _TIMEOUT_SERVICE; break;
                    case CDServicesAccess.ServiceType.Api: return _TIMEOUT_API; break;
                    default: return _TIMEOUT_SERVICE; break;                        
                }
            },

            _launch:function() {
                return WinJS.Promise.timeout(this.Timeout, WinJS.xhr({
                    type: this.Type,
                    url: this.UrlService,
                    data: this.Params,
                    headers: this.Header,
                    user: this.user,
                    password: this.password
                }));
            },
        },

        // The set of static members.
        {
            _getUserFromParam: function (params) {
                if (params && params.email) {
                    return params.email;
                }
                else {
                    return 'user';
                }
            },

            _getPasswordFromParam: function (params) {
                if (params && params.password) {
                    return params.password; // replace by this.user
                }
                else {
                    return 'passsword'; // replace by this.password
                }
            },
        }
        ); 
  
    WinJS.Namespace.define("CDServicesAccess", {
        CdServices: CdServices,
        ServiceType: { Service: 0, Api: 1 },
        typeRequest: { Get: "GET", Post: "POST", Delete: "DELETE", Put: "PUT"},
    });
})();

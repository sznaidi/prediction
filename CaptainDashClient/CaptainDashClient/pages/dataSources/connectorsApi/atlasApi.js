var AtlasApi = WinJS.Class.define(
    // The constructor function.
    function() {
    },
    // The set of instance members.
    {
        
    },
    // The set of static members.
    {
        launchWebAuth: function (succeed, failed) {
            RightMenu.showRightMenu(Pages.addAtMenuAccount, succeed);
        },

        getAgencies: function (credentialId, succeed, failed) {
            var _AGENCIES_BASE_URL_SERVICES = CdServicesHelper.baseUrlServices + CdServicesHelper.agenciesUrl + "?credential_id=" + credentialId;
    
            function succeedCallback(response) {
                var agencyInfo = JSON.parse(response.responseText).organizations;
                succeed(agencyInfo);
            }

            var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Get, _AGENCIES_BASE_URL_SERVICES, null, CdServicesHelper.headers, succeedCallback, failed);
            request.launchService();
        },
      
        getClientGuids: function (credentialId, parentId, succeed, failed) {
            var _CLIENTS_BASE_URL_SERVICES = CdServicesHelper.baseUrlServices + CdServicesHelper.clientsUrl;
            var params = JSON.stringify({ "credential_id": credentialId, "parent_id": parentId});

            function succeedCallback(response) {
                var clientInfo = JSON.parse(response.responseText).organizations;
                succeed(clientInfo);
            }

            var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Get, _CLIENTS_BASE_URL_SERVICES, params, CdServicesHelper.headers, succeedCallback, failed);
            request.launchService();
        },
        
        getFormattedUserInfo: function (userInfo, succeed, failed) {
            var userInfoAt = new UserInfo(userInfo, new CredentialsTemplate.AtCredentials(userInfo.accessToken, null, userInfo.username, userInfo.password));
            succeed(userInfoAt);
        }
     
    }
);
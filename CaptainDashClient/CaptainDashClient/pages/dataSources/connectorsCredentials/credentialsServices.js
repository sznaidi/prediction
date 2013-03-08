// [MK] Creation date: 18/12/2012

(function () {
    "use strict";

    var _CREDENTIALS_BASE_URL_SERVICES = CdServicesHelper.baseUrlServices + CdServicesHelper.credentialsUrl;

    /*  ------------------------------------------------------
    -- Author: MK
    -- Name: getCredentialsByType
    -- Description: 
    -- Get credentials for the current logged user by connector type
    -- Params: user= the logged user, succeed = success calback, failed = fail callback
    -- Return: list of credentials
    -------------------------------------------------------*/
    function getCredentialsByType(typeConnector, succeed, failed) {
        var urlCredentialsToGet = _CREDENTIALS_BASE_URL_SERVICES + "/" + typeConnector;
        var params = null;
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Get, urlCredentialsToGet, params, CdServicesHelper.headers, succeed, failed);
        request.launchService();
        //succeed([{ label: "cred1" }, { label: "cred2" }, { label: "cred3" }, { label: "cred4" }, { label: "cred1" }, { label: "cred2" }, { label: "cred3" }, { label: "cred4" }, { label: "cred1" }, { label: "cred2" }, { label: "cred3" }, { label: "cred4" }, { label: "cred1" }, { label: "cred2" }, { label: "cred3" }, { label: "cred4" }]);
    }
    
    /*  ------------------------------------------------------
    -- Author: MK
    -- Name: getAllCredentials
    -- Description: 
    -- Get all credentials for the current logged user
    -- Params: user= the logged user, succeed = success calback, failed = fail callback
    -- Return: list of credentials
    -------------------------------------------------------*/
    function getAllCredentials(typeConnector, succeed, failed) {
        var params = null;
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Get, _CREDENTIALS_BASE_URL_SERVICES, params, CdServicesHelper.headers, succeed, failed);
        request.launchService();
    }

    /*  ------------------------------------------------------
    -- Author: MK
    -- Name: addCredential
    -- Description: 
    -- saves a user credential object into db
    -- Params: credential = the credential object to save, succeed = success calback, failed = fail callback
    -- Return: added credential
    -------------------------------------------------------*/
    function addCredential(credential, succeed, failed) {
        var params = JSON.stringify(credential);
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Post, _CREDENTIALS_BASE_URL_SERVICES, params, CdServicesHelper.headers, succeed, failed);
        request.launchService();
    }

    /*  ------------------------------------------------------
    -- Author: MK
    -- Name: removeCredential
    -- Description: 
    -- removes credential with given id from db
    -- Params: credential = credential id to delete, succeed = success calback, failed = fail callback
    -- Return: removed credential
    -------------------------------------------------------*/
    function removeCredential(credentialId, succeed, failed) {
        var urlCredentialToRemove = _CREDENTIALS_BASE_URL_SERVICES + "/" + credentialId;
        var params = null;
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Delete, urlCredentialToRemove, params, CdServicesHelper.headers, succeed, failed);
        request.launchService();
    }

    /*  ------------------------------------------------------
    -- Author: MK
    -- Name: updateCredential
    -- Description: 
    -- updates credential with given id into db
    -- Params: credential = credential id to update, succeed = success calback, failed = fail callback
    -- Return: updated credential
    -------------------------------------------------------*/
    function updateCredential(credentials, succeed, failed) {
        var urlCredentialToUpdate = _CREDENTIALS_BASE_URL_SERVICES + "/" + credentials.credential.id;
        var params = JSON.stringify(credentials);
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Put, urlCredentialToUpdate, params, CdServicesHelper.headers, succeed, failed);
        request.launchService();
    }
    
    WinJS.Namespace.define("CredentialsServices", {
        getCredentialsByType: getCredentialsByType,
        getAllCredentials: getAllCredentials,
        addCredential: addCredential,
        removeCredential: removeCredential,
        updateCredential: updateCredential,
    });
})();

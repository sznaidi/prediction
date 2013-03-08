//[MK] Creation Date : 19/12/2012
var Credentials = WinJS.Class.define(

    // The constructor function.
    function () {
    },

    // The set of instance members.
    {
    },

     // The set of static members.
    {
        atlasCredentials: null, 
        facebookCredentials: null,
        foursquareCredentials: null,
        googleAnalyticsCredentials: null, 
        twitterCredentials: null,

    //Get list credentials swith connector type
    getListCredentials: function(connectorType) {
        switch (connectorType) {
        case ConnectorsTemplate.ConnectorType.Atlas:
            return Credentials.atlasCredentials;
        case ConnectorsTemplate.ConnectorType.Facebook:
            return Credentials.facebookCredentials;
        case ConnectorsTemplate.ConnectorType.Foursquare:
            return Credentials.foursquareCredentials;
        case ConnectorsTemplate.ConnectorType.GoogleAnalytics:
            return Credentials.googleAnalyticsCredentials;
        case ConnectorsTemplate.ConnectorType.Twitter:
            return Credentials.twitterCredentials;
        default:
            return [];
            break;
        }
    },

    //Get credentials from service of specific type of connector only first use of menu
    getSavedCredentials: function(connectorType, success, failed) {
        var listCredentials = this.getListCredentials(connectorType);
        if (!listCredentials)
            CredentialsServices.getCredentialsByType(connectorType, getCredentialsSuccess, getCredentialsFailed);
        else
            success(listCredentials);

        function getCredentialsSuccess(credentials) {
            listCredentials = new Array();
            if (credentials) {
                listCredentials = JSON.parse(credentials.response).credentials;
                _setListCredentials(connectorType, listCredentials);
            }
            //TODO fill credentials array by data returned from service
            if (success)
                success(listCredentials);

        }
        function getCredentialsFailed(error) {
            if (failed)
                failed(error);
        };

        //Set list credentials swith connector type
        function _setListCredentials(connectorType, listCredentials) {
            switch (connectorType) {
                case ConnectorsTemplate.ConnectorType.Atlas:
                    Credentials.atlasCredentials = listCredentials;
                    break;
                case ConnectorsTemplate.ConnectorType.Facebook:
                    Credentials.facebookCredentials = listCredentials;
                    break;
                case ConnectorsTemplate.ConnectorType.Foursquare:
                    Credentials.foursquareCredentials = listCredentials;
                    break;
                case ConnectorsTemplate.ConnectorType.GoogleAnalytics:
                    Credentials.googleAnalyticsCredentials = listCredentials;
                    break;
                case ConnectorsTemplate.ConnectorType.Twitter:
                    Credentials.twitterCredentials = listCredentials;
                    break;
                default:
                    break;
            }
        }
    },

    //Add or update credential if exists in list, if update database fail dont remove credential from local list
    addCredential: function (connectorType, credential, callBack) {
        var credentialsObj = {
            type: connectorType,
            credential: credential
        }
        var listCredentials = this.getListCredentials(connectorType);
        var indexCredInfo = this._indexOfCredential(connectorType, credential);
        var indexCredential = indexCredInfo.index;

        if (indexCredential == -1) {
            CredentialsServices.addCredential(credentialsObj, _addCredentialSuccess, _addCredentialFailed);
        } else {
            if (indexCredInfo.toBeUpdated) {
                credentialsObj.credential.id = listCredentials[indexCredential].id;
                //TODO to remove the line below after finishing with update success
                listCredentials[indexCredential].access_token = credential.access_token;
                CredentialsServices.updateCredential(credentialsObj, _updateCredentialSuccess, _updateCredentialFailed); //update credentialo into database
            }
            else
                callBack(indexCredential);
        }
        
        function _addCredentialSuccess(credential) {
            if (credential.response && credential.response != "") {
                listCredentials.push(JSON.parse(credential.response).credential);
                indexCredential = listCredentials.length - 1;
                callBack(indexCredential);
            }
        }

        function _addCredentialFailed(error) {
            Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
        }

        function _updateCredentialSuccess(credential) {
            //ToDo
            //listCredentials[indexCredential];//TODO
            callBack(indexCredential);
        }

        function _updateCredentialFailed(error) {
            Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
        }
    },
    
    _indexOfCredential: function(connectorType, credential) {
        switch (connectorType) {
            case ConnectorsTemplate.ConnectorType.Atlas:
                return this._indexOfAtCred(credential);
            case ConnectorsTemplate.ConnectorType.Facebook:
                return this._indexOfFbCred(credential);
            case ConnectorsTemplate.ConnectorType.Foursquare:
                return this._indexOfFsCred(credential);
            case ConnectorsTemplate.ConnectorType.GoogleAnalytics:
                return this._indexOfGaCred(credential);
            case ConnectorsTemplate.ConnectorType.Twitter:
                return this._indexOfTwCred(credential);
            default:
                break;
        }
    },
    
    _indexOfAtCred : function(credential) {
        for (var count = 0; count < this.atlasCredentials.length; count++) {
            if (this.atlasCredentials[count].handle == credential.username)
            {
                if (this.atlasCredentials[count].access_token != credential.access_token) { 
                    return{index:count, toBeUpdated : true};
                } else {
                    return{index:count, toBeUpdated : false};
                }
            }
        }
        return{index:-1, toBeUpdated : false};
    },
    
    _indexOfFbCred: function (credential) {//TODO
        var handle = (credential.handle) ? credential.handle : credential.payload.email;

        for (var count = 0; count < this.facebookCredentials.length; count++) {
            if (this.facebookCredentials[count].handle == handle) {
                    return { index: count, toBeUpdated: true };
            }
        }
        return { index: -1, toBeUpdated: false };
    },
    
    _indexOfFsCred: function (credential) {
        var handle = (credential.handle) ? credential.handle : credential.payload.contact.email;

        for (var count = 0; count < this.foursquareCredentials.length; count++) {
            if (this.foursquareCredentials[count].handle == handle) {
                    return { index: count, toBeUpdated: true };
                }
        }
        return { index: -1, toBeUpdated: false };
    },
    
    _indexOfTwCred: function (credential) {
        var handle = (credential.handle) ? credential.handle : '@'+credential.payload.screen_name;

        for (var count = 0; count < this.twitterCredentials.length; count++) {
            if (this.twitterCredentials[count].handle == handle) {
                if (this.twitterCredentials[count].access_token_secret != credential.access_token_secret) {
                    return { index: count, toBeUpdated: true };
                } else {
                    return { index: count, toBeUpdated: false };
                }
            }
        }
        return { index: -1, toBeUpdated: false };
    },
    
    _indexOfGaCred: function (credential) {
        for (var count = 0; count < this.googleAnalyticsCredentials.length; count++) {
            var handle = (credential.handle) ? credential.handle : credential.payload.email;

            if (this.googleAnalyticsCredentials[count].handle == handle) {
                if (this.googleAnalyticsCredentials[count].access_token != credential.access_token || //token
                    this.googleAnalyticsCredentials[count].refresh_token != credential.refresh_token) { //password
                    return { index: count, toBeUpdated: true };
                } else {
                    return { index: count, toBeUpdated: false };
                }
            }
        }
        return { index: -1, toBeUpdated: false };
    },
        //Remove credential from data base, if success remove credential from static list else return error
    removeCredential: function(connectorType, credential, removeCredSuccess, removeCredFailed) {
        var indexCredential = this._indexOfCredential(connectorType, credential);
        var listCredentials = this.getListCredentials(connectorType);
        listCredentials.splice(indexCredential.index, 1);
        if (credential.id)
            CredentialsServices.removeCredential(credential.id, _success, _failed);

        function _success(credential) {
            removeCredSuccess(listCredentials);
        }
        
        function _failed(error) {
            //TODO show error msg
            if (removeCredFailed)
                removeCredFailed(error);
        }
    },
    
    //Get credential in index position
    getCredentialByIndex: function (connectorType, index) {
        switch (connectorType) {
            case ConnectorsTemplate.ConnectorType.Atlas:
                if (this.atlasCredentials[index])
                    return this.atlasCredentials[index];
                break;
            case ConnectorsTemplate.ConnectorType.Facebook:
                if (this.facebookCredentials[index])
                    return this.facebookCredentials[index];
                break;
            case ConnectorsTemplate.ConnectorType.Foursquare:
                if (this.foursquareCredentials[index])
                    return this.foursquareCredentials[index];
                break;
            case ConnectorsTemplate.ConnectorType.GoogleAnalytics:
                if (this.googleAnalyticsCredentials[index])
                    return this.googleAnalyticsCredentials[index];
                break;
            case ConnectorsTemplate.ConnectorType.Twitter:
                if (this.twitterCredentials[index])
                    return this.twitterCredentials[index];
                break;
        default:
            break;
        }
    },

        //remove all credential
    initialiseCredentails: function () {
        Credentials.atlasCredentials = null;
        Credentials.facebookCredentials = null;
        Credentials.foursquareCredentials = null;
        Credentials.googleAnalyticsCredentials = null;
        Credentials.twitterCredentials = null;
    }
    }
); 


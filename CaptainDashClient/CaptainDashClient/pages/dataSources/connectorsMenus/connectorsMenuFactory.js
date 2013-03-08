//[A.A] creation date : 17/12/2012

var ConnectorsMenuFactory = WinJS.Class.define(
    // The constructor function.
    function () {
    },

    // The set of instance members.
    {
    },

     // The set of static members.
    {
        //Description: show add new source menu
        //Input: connector type
        showConnectorMenu: function (connectorType)
        {
            var elements;
            var listCredentials;

            if (CDHelper.isApiConfigLoaded) {
                if (connectorType == ConnectorsTemplate.ConnectorType.All) {
                    RightMenu.showRightMenu(Pages.connectorsTypeMenu, null);
                }
                else {
                    //gone with treatment for credentials so call credentials script
                    //TODO require once
                    CDHelper.requireScriptJS('/pages/DataSources/connectorsCredentials/credentials.js');
                    CDHelper.requireScriptJS('/pages/DataSources/connectorsCredentials/credentialsServices.js');
                    CDHelper.requireScriptJS('/pages/DataSources/connectorsCredentials/credentialsTemplate.js');

                    //maybe asynchronous = start loading
                    RightMenu.rightMenuLoading(true);

                    //get list credentials by connectorType
                    Credentials.getSavedCredentials(connectorType,
                        function (credentials) {
                            //stop loading
                            RightMenu.rightMenuLoading(false);
                            //switch credentials
                            this._loadConnectorApi(connectorType);
                            //there's credentials = credential page
                            //no credentials = open broker (broker)
                            if (credentials.length > 0) {
                                //Show credentials page
                                RightMenu.showRightMenu(Pages.credentialsMenu, connectorType);
                            }
                            else {
                                //hide menus

                                RightMenu.showHideRightMenu(false);
                                //Show the connector type menu
                                /*if (connectorType == ConnectorsTemplate.ConnectorType.Atlas) {
                                    this.redirectToFirstStepMenu(null, connectorType)
                                } else {*/
                                    this.launchAuthentification(connectorType);
                               /* }*/
                                
                            }
                        }.bind(this),
                        function (error) {
                            RightMenu.rightMenuLoading(false);
                            // TO BE UPDATED
                            Messages.showOkMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
                        });
                }
            }
            else {
                //HK
                //TODO: do not allow user to open connector menu
                //return error / show message
            }
        },

        /*------------------------------------------------------
        -- Author: HK
        -- Name: _loadConnectorApi
        -- Description: 
        --   switch connector type loads the correct API
        -- Params: the connector Type
        -- Return: none
        -------------------------------------------------------*/
        _loadConnectorApi: function (connectorType) {
            switch (connectorType) {
                case ConnectorsTemplate.ConnectorType.GoogleAnalytics:
                    {
                        CDHelper.requireScriptJS(Scripts.googleAnalytics);
                        break;
                    }
                case ConnectorsTemplate.ConnectorType.Atlas:
                    {
                        CDHelper.requireScriptJS(Scripts.atlas);
                        break;
                    }
                case ConnectorsTemplate.ConnectorType.Twitter:
                    {
                        CDHelper.requireScriptJS(Scripts.twitter);
                        break;
                    }
                case ConnectorsTemplate.ConnectorType.Foursquare:
                    {
                        CDHelper.requireScriptJS(Scripts.foursquare);
                        break;
                    }
                case ConnectorsTemplate.ConnectorType.Facebook:
                    {
                        CDHelper.requireScriptJS(Scripts.facebook);
                        break;
                    }
                default: break;
            }
        },

        launchAuthentification: function (connectorType) {
            var launchApiSucceed = function (userInfo) {
                this.redirectToFirstStepMenu(userInfo, connectorType)
            }.bind(this);

            ConnectorApi.launchApi(connectorType, launchApiSucceed, this.launchApiFailed);
        },

        redirectToFirstStepMenu: function (userInfo, connectorType) {
            //redirect to correct menu
            var page;
            switch (connectorType) {
                case ConnectorsTemplate.ConnectorType.Atlas:
                    page = Pages.addAtMenuAgency;//TODO specify the first step of each menu
                    break;
                case ConnectorsTemplate.ConnectorType.Facebook:
                    page = Pages.fbConnectorsTypeStep;
                    break;
                case ConnectorsTemplate.ConnectorType.Foursquare:
                    page = Pages.addFsMenuVenueTypeStep;
                    break;
                case ConnectorsTemplate.ConnectorType.GoogleAnalytics:
                    page = Pages.addGaMenuAccount;
                    break;
                case ConnectorsTemplate.ConnectorType.Twitter:
                    page = Pages.addTwMenuConnectorTypeStep;
                    break;
                default:
                    break;
            }

            RightMenu.showRightMenu(page, userInfo);
        },

        launchApiFailed: function (connectorType) {
            //When user click on back button in web broker (FA,TW,GA,4SQ), display right menu last page
            if (connectorType) {
                //get credentials count
                if (Credentials.getListCredentials(connectorType).length > 0) {
                    ConnectorsMenuFactory.showConnectorMenu(connectorType);
                }
                else if (DataSources.currentConnectorType == ConnectorsTemplate.ConnectorType.All) {
                    ConnectorsMenuFactory.showConnectorMenu(ConnectorsTemplate.ConnectorType.All);
                }
            }

            //TODO show message authentication failed
        }
    }
);


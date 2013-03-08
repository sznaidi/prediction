//[HK] Creation date : 20/12/2012

(function () {
    "use strict";

    var ui = WinJS.UI;
    var _ITEM_HEIGHT = 70;
    var _btnRemovePressed = false; //help us to know if we're clicking on remove button or not
    var _connectorType;
    var _ID_REMOVE_BUTTON = "btn_credentials_removeCredentials";

    //var listCredentials;
    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: ready
    -- Description: 
    --   first visited function when page rendering
    -- Params: elements (optionnal)
    -- Return: none
    -------------------------------------------------------*/
    function ready(connectorType) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            var _withBackButton = (DataSources.currentConnectorType == ConnectorsTemplate.ConnectorType.All) ? true : false;
            
            //Set HTML header
            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].credentials, _withBackButton);

            //Get connector type
            _connectorType = connectorType;//TODO

            //Set back button event
            if (_withBackButton)
                btn_rightMenu_back.onclick = _showPreviousPage;

            //Set other credentials event
            if (btn_credentials_addCredentials)
                btn_credentials_addCredentials.onclick = _btn_credentials_addCredentials_Click;

            //get an independent copy of credentials list
            var listCredentials = _getCredentialsList();
           
            //resize the listview to the correct height
            _lvCredentials_Resize(listCredentials.length);

            //create a binding list
            var listBinding = new WinJS.Binding.List(listCredentials);

            //bind listview data
            ui.setOptions(lvCredentials.winControl, {
                itemTemplate: lvCredentialsTemplate,
                itemDataSource: listBinding.dataSource,
                oniteminvoked: _lvCredentials_Iteminvoked,
                onMSPointerDown: _lvCredentials_PointerDown,
            });
        });
    }

    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: lvCredentials_Iteminvoked
    -- Description: 
    --   handle the click on credentials
    -- Params: e= event
    -- Return: none
    -------------------------------------------------------*/
    function _lvCredentials_Iteminvoked(e) {
        var currentItem = lvCredentials.winControl.itemDataSource.itemFromIndex(e.detail.itemIndex);
        //get choosen credentials
        var currentCredentials = Credentials.getCredentialByIndex(_connectorType, e.detail.itemIndex);
        if (!_btnRemovePressed) {
            RightMenu.rightMenuLoading(true);
            //verify choosen credentials validity
            ConnectorApi.verifyCredentialsApi(_connectorType, currentCredentials, _verifyCredentialsSucceed, _verifyCredentialsFailed);
        }
        else {
            //remove credentials
            _btnRemovePressed = false;
            //show warning message
            Messages.showOkCancelMessage(MessagesHelper.MSG_REGISTER_TITLE_ERROR, MessagesHelper.MSG_REMOVE_CREDENTIALS_TEXT, function () { _removeCredentials(currentCredentials, currentItem); });
        }
    }

    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: _removeCredentials
    -- Description: 
    --   remove selected credentials
    -- Params: e= event
    -- Return: none
    -------------------------------------------------------*/
    function _removeCredentials(currentCredentials, currentItem) {
        RightMenu.rightMenuLoading(true);
            Credentials.removeCredential(_connectorType, currentCredentials,
                function (listCredentials) {
                _removeCredentialsSucceed(listCredentials.length, currentItem);
                }.bind(this),
                function (error) {
                    _removeCredentialsFail(error);
                });
    }

    function _verifyCredentialsSucceed(userInfo) {
        RightMenu.rightMenuLoading(false);
        ConnectorsMenuFactory.redirectToFirstStepMenu(userInfo, _connectorType);
    }

    function _verifyCredentialsFailed(error) {
        RightMenu.rightMenuLoading(false);
        Messages.showReconnectMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.ERROR_CREDENTIALS, function () { } , ConnectorsMenuFactory.launchAuthentification(_connectorType));
    }

    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: _removeCredentialsSucceed
    -- Description: 
    --   handle for credentials remove success
    -- Params: listCredentials = new returned list, removedItem = the item to remove from lv
    -- Return: none
    -------------------------------------------------------*/
    function _removeCredentialsSucceed(listCredentialsLength, removedItem) {
        //lv_dataSources.winControl.itemDataSource._list._listReload();
        //lv_dataSources.winControl.itemDataSource._list.notifyReload();
        RightMenu.rightMenuLoading(false);
        DataSources.getAllConnectors();
        lvCredentials.winControl.itemDataSource.remove(removedItem._value.key);
        var oldHeight = (_ITEM_HEIGHT * (listCredentialsLength + 1)) + "px";
        var newHeight = (_ITEM_HEIGHT * listCredentialsLength) + "px";
        _lvCredentials_ResizeAnimation(oldHeight, newHeight);
    }

    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: _removeCredentialsFail
    -- Description: 
    --   handle for credentials remove fail
    -- Params: error = the error
    -- Return: none
    -------------------------------------------------------*/
    function _removeCredentialsFail(error) {
        RightMenu.rightMenuLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: _lvCredentials_Resize
    -- Description: 
    --   resizes the height of the listview
    -- Params: listCredentialsLength = the new length of listview
    -- Return: none
    -------------------------------------------------------*/
    function _lvCredentials_Resize(listCredentialsLength) {
        if (lvCredentials && lvCredentials.style) {
            lvCredentials.style.height = (_ITEM_HEIGHT * listCredentialsLength) + "px";
        }
    }

    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: _lvCredentials_Resize
    -- Description: 
    --   resizes the listview height & button position with animation
    -- Params: 
            * oldHeight = height before action
            * newHeight = height after action
    -- Return: none
    -------------------------------------------------------*/
    function _lvCredentials_ResizeAnimation(oldHeight, newHeight) {
        return WinJS.UI.executeTransition(
                lvCredentials,
                {
                    property: "height",
                    delay: 0,
                    duration: 500,
                    timing: "linear",
                    from: oldHeight,
                    to: newHeight
                }
            );
    }

    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: _lvCredentials_PointerDown
    -- Description: 
    --   tell us if we're removing or choosing credentials 
    -- Params: e = event
    -- Return: none
    -------------------------------------------------------*/
    function _lvCredentials_PointerDown(e) {
        if (e.srcElement.id == _ID_REMOVE_BUTTON) {
            _btnRemovePressed = true;
        }
        else {
            _btnRemovePressed = false;
        }
    }

    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: _showPreviousPage
    -- Description: 
    --   back button click handler
    -- Params: e = event
    -- Return: none
    -------------------------------------------------------*/
    function _showPreviousPage(e) {
        ConnectorsMenuFactory.showConnectorMenu(ConnectorsTemplate.ConnectorType.All);
    }

    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: _btn_credentials_addCredentials_Click
    -- Description: 
    --   other credentials button click handler
    -- Params: e = event
    -- Return: none
    -------------------------------------------------------*/
    function _btn_credentials_addCredentials_Click(e) {
        //hide menu
        RightMenu.showHideRightMenu(false);
        //launch web broker
        ConnectorsMenuFactory.launchAuthentification(_connectorType);
    }
    /*  ------------------------------------------------------
    -- Author: SZ
    -- Name: _getCredentialsList
    -- Description: 
    --   capitalise first letter of credentials name
    -- Params: none
    -- Return: listCredentials
    -------------------------------------------------------*/
    function _getCredentialsList() {
        var listCredentials = Credentials.getListCredentials(_connectorType);
        for (var count = 0; count < listCredentials.length; count++) {
            listCredentials[count].name = CDHelper.capitaliseOnlyFirstLetter(listCredentials[count].name);
        }
        return listCredentials;
    }
    WinJS.UI.Pages.define(Pages.credentialsMenu, {
        ready: ready,
    });
})();
(function () {
    "use strict";

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {

            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].webProperties, true);

            btn_rightMenu_back.onclick = _showPreviousPage;
            _bindDataWebProperties();
            
        });
    }

    /*  ------------------------------------------------------
    -- Author: SZ
    -- Name: _bindDataWebProperties
    -- Description: bind Data Web Properties
    -- Params: none
    -- Return: 
    -------------------------------------------------------*/
    function _bindDataWebProperties() {
        DataSourcesHelper.sortConnectors(gaConnectorInfo.selectedAccount.properties, DataSourcesHelper.SortMethod.Alphabetic);
        for (var count = 0; count < gaConnectorInfo.selectedAccount.properties.length; count++) {
            gaConnectorInfo.selectedAccount.properties[count].name = CDHelper.capitaliseOnlyFirstLetter(gaConnectorInfo.selectedAccount.properties[count].name);
        };
        WinJS.UI.setOptions(lv_googleWebProperties.winControl, {
            itemDataSource: new WinJS.Binding.List(gaConnectorInfo.selectedAccount.properties).dataSource,
            oniteminvoked: _lvGoogleWebPropertiesIteminvoked
        });
    }

    // Description: event click in list view webProerty
    // Input:
    // Output:
    function _lvGoogleWebPropertiesIteminvoked(e) {
        gaConnectorInfo.selectedProperty = new jQuery.extend(true, {}, gaConnectorInfo.selectedAccount.properties[e.detail.itemIndex]);

        if (gaConnectorInfo.selectedProperty) {
            RightMenu.rightMenuLoading(true);
            GoogleAnalyticsApi.getProfiles(gaConnectorInfo.selectedProperty, gaConnectorInfo.accessToken, _getProfilesSucceed, _getProfilesFailed);
        }
    }

    // Description: Succeed callback from getProfile
    // Input: profiles
    // Output:

    function _getProfilesSucceed(profiles) {
        RightMenu.rightMenuLoading(false);
        gaConnectorInfo.selectedProperty.profiles = profiles.slice();
        if (gaConnectorInfo.selectedProperty.profiles.length == 0) {
            RightMenu.showRightMenu(Pages.addGaMenuProfile, null);
            //error.innerText = MessagesHelper.NO_PROFILS_ARE_FOUND_UNDER + gaConnectorInfo.selectedProperty.name;
        }
        else {
            _deleteUsedProfiles();
            if (gaConnectorInfo.selectedProperty.profiles.length == 0)
                RightMenu.showRightMenu(Pages.addGaMenuProfile, gaConnectorInfo.selectedProperty.name);
            else {
                for (var i = 0; i < gaConnectorInfo.selectedProperty.profiles.length; i++) {
                    gaConnectorInfo.selectedProperty.profiles[i].radioId = "radio_" + gaConnectorInfo.selectedProperty.profiles[i].id;
                    gaConnectorInfo.selectedProperty.profiles[i].radioBackgroundImg = AddGaMenuHelper.NOT_SELCTED_IMG;
                }

                gaConnectorInfo.SelectedProfiles = [];
                RightMenu.showRightMenu(Pages.addGaMenuProfile, null);
            }
        }
    }

    // Description: Failed callback from from getProfile
    // Input: Error
    // Output:
    function _getProfilesFailed(error) {
        //TODO
        RightMenu.rightMenuLoading(false);
    }

    // Description: test if profile is used and remove used profiles from list
    // Input:
    // Output:

    function _deleteUsedProfiles() {
        for (var i = 0; i < gaConnectorInfo.selectedProperty.profiles.length; i++) {
            if (_isProfileIdExist(gaConnectorInfo.selectedProperty.profiles[i].id)) {
                gaConnectorInfo.selectedProperty.profiles.splice(i, 1);
            }
        }
    }

    // S.H: Description: test if profil id exist
    // Input: Id of current (selected) profil
    // Output: return true if the current profil id is already used else return false
    function _isProfileIdExist(currentProfilId) {
        if (DataSourcesHelper.listConnectors) {
            for (var count = 0; count < DataSourcesHelper.listConnectors[ConnectorsTemplate.ConnectorType.GoogleAnalytics].length; count++) {
                if (DataSourcesHelper.listConnectors[ConnectorsTemplate.ConnectorType.GoogleAnalytics][count].service_id == currentProfilId)
                    return true;
            }
        }
        return false;
    }


    // Description: navigate to previous page
    // Input:
    // Output:
    function _showPreviousPage() {
        RightMenu.showRightMenu(Pages.addGaMenuAccount, null);
    }

    WinJS.UI.Pages.define(Pages.addGaMenuWebProperties, {
        ready: ready,
    });

})();
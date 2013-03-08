//[MC] Creation date : 24/12/2012

(function () {
    "use strict";
    var _ITEM_HEIGHT = 70;
    function ready(usedProfile) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            if (!gaConnectorInfo.selectedProperty.profiles.length) {
                CDHelper.displayHideDiv(lbl_addGaProfile_errorUsedProfile, true);
                CDHelper.displayHideDiv(btn_gaProfiles_Next, false);               
                lbl_addGaProfile_errorUsedProfile.innerText = "All profiles for " + usedProfile + " are already used";
            }

            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].profile, true);
            btn_rightMenu_back.onclick = _showPreviousPage;

            btn_gaProfiles_Next.onclick = _btnNextClick;

            _lvProfilesResize(gaConnectorInfo.selectedProperty.profiles.length);
            _bindDataProfiles();
                    
        });
    }

    /*  ------------------------------------------------------
   -- Author: SZ
   -- Name: _bindDataWebProperties
   -- Description: bind Data Web Properties
   -- Params: none
   -- Return: 
   -------------------------------------------------------*/
    function _bindDataProfiles() {
        DataSourcesHelper.sortConnectors(gaConnectorInfo.selectedProperty.profiles, DataSourcesHelper.SortMethod.Alphabetic);
        for (var count = 0; count < gaConnectorInfo.selectedProperty.profiles.length; count++) {
            gaConnectorInfo.selectedProperty.profiles[count].name = CDHelper.capitaliseOnlyFirstLetter(gaConnectorInfo.selectedProperty.profiles[count].name);
        };
        WinJS.UI.setOptions(lv_googleProfiles.winControl, {
            itemDataSource: new WinJS.Binding.List(gaConnectorInfo.selectedProperty.profiles).dataSource,
            oniteminvoked: _lvGoogleProfileIteminvoked
        });
    }
    // Description:resizes the height of the listview
    // Input:listCredentialsLength = the new length of listview
    // Output:
    function _lvProfilesResize(nbElements) {
        if (lv_googleProfiles && lv_googleProfiles.style) {
            lv_googleProfiles.style.height = (_ITEM_HEIGHT * nbElements) + "px";
        }
    }

    // Description: navigate to previous page
    // Input:
    // Output:
    function _showPreviousPage() {
        RightMenu.showRightMenu(Pages.addGaMenuWebProperties, null);
    }

    // Description: event click in list view client
    // Input:
    // Output:
    function _lvGoogleProfileIteminvoked(e) {
        var index = e.detail.itemIndex;
            e.detail.itemPromise.then(function (item) {
                _toogleSelectRadio(item.data, index);
            });
    }

    // Description: add or remove from list client selected
    // Input: currentSelectedProfiles:object, index:int
    // Output:
    function _toogleSelectRadio(currentSelectedProfiles, index) {
        var element = lv_googleProfiles.winControl.elementFromIndex(index);
        if (!currentSelectedProfiles.isSelected) {
            currentSelectedProfiles.isSelected = true;
            currentSelectedProfiles.radioBackgroundImg = AddGaMenuHelper.SELCTED_IMG;
            element.querySelector('.radioItem').style.backgroundImage = AddGaMenuHelper.SELCTED_IMG;
            gaConnectorInfo.SelectedProfiles[currentSelectedProfiles.id] = currentSelectedProfiles;
        }
        else {
            currentSelectedProfiles.isSelected = false;
            currentSelectedProfiles.radioBackgroundImg = AddGaMenuHelper.NOT_SELCTED_IMG;
            element.querySelector('.radioItem').style.backgroundImage = AddGaMenuHelper.NOT_SELCTED_IMG;
            delete gaConnectorInfo.SelectedProfiles[currentSelectedProfiles.id];
        }
    }

    // Description: navigate to source name page
    // Input:
    // Output:

    function _btnNextClick() {
        for (var elem in gaConnectorInfo.SelectedProfiles) {
            // previous: Pages.addGaMenuProfile, 
            RightMenu.showRightMenu(Pages.addSourceNameStep, { previous: Pages.addGaMenuProfile, connectorType: ConnectorsTemplate.ConnectorType.GoogleAnalytics });
            break;
        }
    }

    WinJS.UI.Pages.define(Pages.addGaMenuProfile, {
        ready: ready,
    });

})();
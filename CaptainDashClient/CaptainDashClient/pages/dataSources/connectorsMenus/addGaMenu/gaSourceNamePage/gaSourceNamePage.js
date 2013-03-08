//[MC] Creation date : 24/12/2012

(function () {
    "use strict";
    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].nameSource, true);
            btn_rightMenu_back.onclick = _showPreviousPage;
            _buildSourceNamePage();
            _showDefaultWidget();

        });
    }

    // Description: navigate to previous page
    // Input:
    // Output:
    function _showPreviousPage() {
        RightMenu.showRightMenu(Pages.addGaMenuProfile, null);
    }

    // Description: Description: bind data in listview Source name
    // Input:
    // Output:
    function _buildSourceNamePage() {      

        CDHelper.requireScriptJS(Scripts.dashboardService);
        // build input texts relatives to selected profiles
        var count = 0;
        for (var el in gaConnectorInfo.SelectedProfiles) {
            count++;

            // id of source name content wiotch representing selected profile
            var divSourceNameId = "div_gaSourceName_" + gaConnectorInfo.SelectedProfiles[el].id;

            // content of source name
            var divSourceName = document.createElement("div");
            divSourceName.id = divSourceNameId;
            divSourceName.className = AddGaMenuHelper.SHOW_DEFAULT_WIDGET;
            divSourceName.style.msGridRow = count;

            //source name label 
            var labelSourceName = document.createElement("div");
            labelSourceName.className = AddGaMenuHelper.LABEL_GA_SOURCE_NAME;
            labelSourceName.innerText = CDHelper.capitaliseOnlyFirstLetter(gaConnectorInfo.SelectedProfiles[el].name.toLowerCase());
            divSourceName.appendChild(labelSourceName);

            // create source name input
            var inputSourceName = document.createElement("input");
            inputSourceName.className = AddGaMenuHelper.TXT_GA_SOURCE_NAME;
            inputSourceName.type = "text";
            inputSourceName.value = CDHelper.capitaliseOnlyFirstLetter(gaConnectorInfo.SelectedProfiles[el].name.toLowerCase());
            divSourceName.appendChild(inputSourceName);

            // create error div
            var errorDiv = document.createElement("div");
            errorDiv.className = AddGaMenuHelper.ERROR_GA_SOURCE_NAME;
            divSourceName.appendChild(errorDiv);

            // create checkbox container
            var divCheckbox = document.createElement("div");
            divCheckbox.className = AddGaMenuHelper.DIV_CHECKBOX_GA_SOURCE_NAME;

            //create checkbox
            var checkboxId = "checkbox_dfltWidget_input_" + gaConnectorInfo.SelectedProfiles[el].id;
            var checkboxSourceName = document.createElement("input");
            checkboxSourceName.id = checkboxId;
            checkboxSourceName.className = AddGaMenuHelper.CHECKBOX_DFLT_WIDGET_INPUT;
            checkboxSourceName.type = "checkbox";
            checkboxSourceName.disabled = true;
            checkboxSourceName.dataSrc = gaConnectorInfo.SelectedProfiles[el].id;
            divCheckbox.appendChild(checkboxSourceName);

            //create checkbox label
            var labelCheckbox = document.createElement("label");
            labelCheckbox.for = checkboxId;
            labelCheckbox.innerHTML = AddGaMenuHelper.CHECKBOX_LABEL_TXT;
            divCheckbox.appendChild(labelCheckbox);
            divSourceName.appendChild(divCheckbox);

            //create separator line
            if (el < (gaConnectorInfo.SelectedProfiles.length -1)) {
                var divSeparator = document.createElement("div");
                divSeparator.className = AddGaMenuHelper.SEPARATOR_GA_SOURCE_NAME;
                divSeparator.style.height = "50px";
                var img = document.createElement("img");
                img.src = AddGaMenuHelper.IMG_SRC;
                divSeparator.appendChild(img);
                divSourceName.appendChild(divSeparator);
            }

            gaConnectorInfo.SelectedProfiles[el].divSourceName = divSourceNameId;
            div_gaSourceNames.appendChild(divSourceName);
        }
        

        //create button connect
        btn_gaSourceName_connect.style.msGridRow = count + 1;
        btn_gaSourceName_connect.onclick = _btnConnectClick;
 
    }

    // Description: test if labels connecotr are valid
    // Input:
    // Output:boolean
    function _isSourceNamesValid() {
   
        for (var profileIndex in gaConnectorInfo.SelectedProfiles) {
            var divSourceName = document.getElementById(gaConnectorInfo.SelectedProfiles[profileIndex].divSourceName);
            //get source name value
            var sourceName = divSourceName.querySelector("." + AddGaMenuHelper.TXT_GA_SOURCE_NAME);
            sourceName.value = CDHelper.trim(sourceName.value);
            //get error
            var error = divSourceName.querySelector("." + AddGaMenuHelper.ERROR_GA_SOURCE_NAME);
            error.innerHTML = "";

            if (sourceName.value == "") {
                error.innerHTML = MessagesHelper.TXT_CONNECTOR_NAME;
                return false;
            }
            else if (!CDHelper.isValidFormat(sourceName.value)) {
                error.innerHTML = MessagesHelper.TXT_CONNECTOR_SPECIAL_CARACTER;
                return false;
            }
            else if ((DataSourcesHelper.isConnectorLabelExist(ConnectorsTemplate.ConnectorType.GoogleAnalytics, sourceName.value)) || (_isLabelProfileExists(sourceName.value, profileIndex))) {
                error.innerHTML = MessagesHelper.TXT_CONNECTOR_DUPLICATED_NAME;
                return false;
            }
            else {
                gaConnectorInfo.SelectedProfiles[profileIndex].name = sourceName.value;
            }
        }
        return true;
    }

    // Description: add connecotrs
    // Input:
    // Output:
    function _btnConnectClick() {
        if (_isSourceNamesValid()) {
            for (var el in gaConnectorInfo.SelectedProfiles) {
                
                // add group_id to connector
                CDHelper.requireScriptJS(Scripts.defaultWidget);
                var divSourceName = document.getElementById(gaConnectorInfo.SelectedProfiles[el].divSourceName);
                var selectGroup = divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP);
                if (selectGroup) {
                    if (selectGroup.length > 0) {
                        var groupId = selectGroup.options[selectGroup.selectedIndex].value;
                        if (groupId) {
                            gaConnectorInfo.connectorModelToSend.connector.group_id = groupId;
                        }
                    }
                }
                RightMenu.rightMenuLoading(true);
                gaConnectorInfo.connectorModelToSend.connector.payload = gaConnectorInfo.SelectedProfiles[el];
                ConnectorsServices.addConnector(gaConnectorInfo.connectorModelToSend, _addGaConnectorSucceed, _addGaConnectorFailed);
            }
        }
    }

    // Description: test if list containe a duplicate client
    // Input:label : string,index : int
    // Output:boolean
    function _isLabelProfileExists(label, profileIndex) {
        label = label.toUpperCase();

        for (var el in gaConnectorInfo.SelectedProfiles) {
            var element = document.getElementById(gaConnectorInfo.SelectedProfiles[el].divSourceName);
            var input = element.querySelector("." + AddGaMenuHelper.TXT_GA_SOURCE_NAME);
            if (profileIndex != el && input.value.toUpperCase() == label) {
                return true;
            }
        }
        return false;
    }

    function _clickCheckbox() {
    }
    function _addGaConnectorSucceed(connector) {
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);
        DataSources.addConnector(ConnectorsTemplate.ConnectorType.GoogleAnalytics, connector);
    }
    
    function _addGaConnectorFailed(error) {
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);
        DataSourcesHelper.manageAddConnectorsErrors(error);
    }

    /* ------------------------------------------------------
      -- Author: [S.Z]
      -- Name: _showDefaultWidget
      -- Description: show Default Widget
      -- Params:
      -- Return:
      -------------------------------------------------------*/
    function _showDefaultWidget() {
        RightMenu.rightMenuLoading(true);
        CDHelper.requireScriptJS(Scripts.dashboardService);
        DashboardsServices.getAllDashboards(_getDashboardsSucceed, _getDashboardsFailed);
    }

    /* ------------------------------------------------------
       -- Name: _getDashboardsSucceed
       -- Author: [S.Z]
       -- Description: get dashboards succeed
       -- Params: No one
       -- Return: No one
       -------------------------------------------------------*/
    function _getDashboardsSucceed(dashboards) {
        RightMenu.rightMenuLoading(false);
        CDHelper.requireScriptJS(Scripts.dashboardHelper);
        var _listDashboards = DashboardsHelper.filterDashboards(dashboards);

        if (_listDashboards.length > 0) {

            for (var el in gaConnectorInfo.SelectedProfiles) {
                (function(element) {
                    // add group_id to connector
                    var divSourceName = document.getElementById(gaConnectorInfo.SelectedProfiles[element].divSourceName);
                    var checkbox = document.getElementById(gaConnectorInfo.SelectedProfiles[element].divSourceName).querySelector("." + AddGaMenuHelper.CHECKBOX_DFLT_WIDGET_INPUT);
                    checkbox.disabled = false;
                    checkbox.onclick = function() {
                        if (checkbox.checked) {
                            CDHelper.requireScriptJS(Scripts.defaultWidget);
                            DefaultWidget.showDefaultWidget(document.getElementById(gaConnectorInfo.SelectedProfiles[element].divSourceName), _listDashboards);
                            div_gaSourceNames.appendChild(document.getElementById(gaConnectorInfo.SelectedProfiles[element].divSourceName));
                        } else {
                            DefaultWidget.hideDefaultWidget(document.getElementById(gaConnectorInfo.SelectedProfiles[element].divSourceName));
                        }
                    }
                })(el);

            }
        }
    }

    /* ------------------------------------------------------
    -- Author: [S.Z]
   -- Name: _getDashboardsFailed
   -- Description: get dashboards failed
   -- Params:
   -- Return:
   -------------------------------------------------------*/
    function _getDashboardsFailed(error) {
        RightMenu.rightMenuLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    WinJS.UI.Pages.define(Pages.addGaMenuSourceName, {
        ready: ready,
    });

})();
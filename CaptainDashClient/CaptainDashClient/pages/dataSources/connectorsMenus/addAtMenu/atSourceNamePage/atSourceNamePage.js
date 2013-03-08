//[MC] Creation date : 24/12/2012

(function () {
    "use strict";
    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            btn_rightMenu_back.onclick = _showPreviousPage;
          
            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].nameSource, true);
            _buildSourceNamePage();
            _showDefaultWidget();
        });
    }

    // Description: navigate to previous page
    // Input:
    // Output:
    function _showPreviousPage() {
        RightMenu.showRightMenu(Pages.addAtMenuClient, null);
    }

    // Description: create list label client in in name source page
    // Input:
    // Output:
    function _buildSourceNamePage() {

        // build input texts relatives to selected profiles
        var count = 0;

        for (var el in atConnectorInfo.selectedClients) {
            atConnectorInfo.selectedClients[el].divLabelInputId = "divLabelInputId_" + atConnectorInfo.selectedClients[el].Id;
            count++;

            // id of source name content wiotch representing selected profile
            var divSourceNameId = "div_atSourceName_" + atConnectorInfo.selectedClients[el].id;

            // content of source name
            var divSourceName = document.createElement("div");
            divSourceName.id = divSourceNameId;
            divSourceName.className = AddAtMenuHelper.SHOW_DEFAULT_WIDGET;
            divSourceName.style.msGridRow = count;

            //source name label 
            var labelSourceName = document.createElement("div");
            labelSourceName.className = AddAtMenuHelper.LABEL_AT_SOURCE_NAME;
            labelSourceName.innerText = CDHelper.capitaliseOnlyFirstLetter(atConnectorInfo.selectedClients[el].Name.toLowerCase());
            divSourceName.appendChild(labelSourceName);

            // create source name input
            var inputSourceName = document.createElement("input");
            inputSourceName.className = AddAtMenuHelper.TXT_AT_SOURCE_NAME;;
            inputSourceName.type = "text";
            inputSourceName.value = CDHelper.capitaliseOnlyFirstLetter(atConnectorInfo.selectedClients[el].Name.toLowerCase());
            divSourceName.appendChild(inputSourceName);

            // create error div
            var errorDiv = document.createElement("div");
            errorDiv.className = AddAtMenuHelper.ERROR_AT_SOURCE_NAME;
            divSourceName.appendChild(errorDiv);

            // create checkbox container
            var divCheckbox = document.createElement("div");
            divCheckbox.className = AddAtMenuHelper.DIV_CHECKBOX_AT_SOURCE_NAME;


            //create checkbox
            var checkboxId = "checkbox_dfltWidget_input_" + atConnectorInfo.selectedClients[el].id;
            var checkboxSourceName = document.createElement("input");
            checkboxSourceName.id = checkboxId;
            checkboxSourceName.className = AddAtMenuHelper.CHECKBOX_DFLT_WIDGET_INPUT;
            checkboxSourceName.type = "checkbox";
            checkboxSourceName.disabled = true;
            checkboxSourceName.dataSrc = atConnectorInfo.selectedClients[el].id;
            divCheckbox.appendChild(checkboxSourceName);

            //create checkbox label
            var labelCheckbox = document.createElement("label");
            labelCheckbox.for = checkboxId;
            labelCheckbox.innerHTML = AddAtMenuHelper.CHECKBOX_LABEL_TXT;
            divCheckbox.appendChild(labelCheckbox);
            divSourceName.appendChild(divCheckbox);

            //create separator line
            if (el < (atConnectorInfo.selectedClients.length - 1)) {
                var divSeparator = document.createElement("div");
                divSeparator.className = AddAtMenuHelper.SEPARATOR_AT_SOURCE_NAME;
                divSeparator.style.height = "50px";
                var img = document.createElement("img");
                img.src = AddAtMenuHelper.IMG_SRC;
                divSeparator.appendChild(img);
                divSourceName.appendChild(divSeparator);
            }


            atConnectorInfo.selectedClients[el].divSourceName = divSourceNameId;
            div_atSourceNames.appendChild(divSourceName);
        }

        //create button connect
        btn_atSourceName_connect.style.msGridRow = count + 1;
        btn_atSourceName_connect.onclick = _btnConnectClick;
    }

    // Description: test if labels connecotr are valid
    // Input:
    // Output:boolean
    function _isValide() {

        for (var profileIndex in atConnectorInfo.selectedClients) {
            var divSourceName = document.getElementById(atConnectorInfo.selectedClients[profileIndex].divSourceName);
            //get source name value
            var sourceName = divSourceName.querySelector("." + AddAtMenuHelper.TXT_AT_SOURCE_NAME);
            sourceName.value = CDHelper.trim(sourceName.value);
            //get error
            var error = divSourceName.querySelector("." + AddAtMenuHelper.ERROR_AT_SOURCE_NAME);
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
                atConnectorInfo.selectedClients[profileIndex].name = sourceName.value;
            }
        }
        return true;
    }

    // Description: add connecotrs
    // Input:
    // Output:
    function _btnConnectClick() {
            if (_isValide()) {
                for (var el in atConnectorInfo.selectedClients) {

                    // add group_id to connector

                    CDHelper.requireScriptJS(Scripts.defaultWidget);
                    var divSourceName = document.getElementById(atConnectorInfo.selectedClients[el].divSourceName);
                    var selectGroup = divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP);
                    if (selectGroup.length > 0) {
                        if (selectGroup.length > 0) {
                            var groupId = selectGroup.options[selectGroup.selectedIndex].value;
                            if (groupId) {
                                atConnectorInfo.selectedClients[el].group_id = groupId;
                            }
                        }
                    }
                    
                    var atConnectorObject = new ConnectorsTemplate.AtConnector(atConnectorInfo.selectedClients[el].Label, null, null, null, atConnectorInfo.client_guid, null, null, AtMenuHelper.TIME_ZONE_PARIS, ConnectorsTemplate.ConnectorType.Atlas, atConnectorInfo.username, atConnectorInfo.password, atConnectorInfo.selectedClients[el].Id);
                    ConnectorsServices.addConnector(atConnectorObject, _addAtConnectorSucceed, _addAtConnectorFailed);
                    RightMenu.rightMenuLoading(true);
                }
            }
    }

    // Description: Succeed callback add google Analytic connector
    // Input:connector
    // Output:
    function _addAtConnectorSucceed(connector) {
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);
        DataSources.addConnector(ConnectorsTemplate.ConnectorType.Atlas, connector);
    }

    // Description:Failed callback add google Analytic connector
    // Input:error
    // Output:
    function _addAtConnectorFailed(error) {
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);
        DataSourcesHelper.manageAddConnectorsErrors(error);
    }

    // Description: test if list containe a duplicate client
    // Input:label : string,index : int
    // Output:boolean
    function _isLabelClientExist(label, index) {
        label = label.toUpperCase();

        for (var el in atConnectorInfo.selectedClients) {
            var element = document.getElementById(atConnectorInfo.selectedClients[el].divSourceName);
            var input = element.querySelector("." + AddAtMenuHelper.TXT_AT_SOURCE_NAME);
            if (index != el && input.value.toUpperCase() == label) {
                return true;
            }
        }

        return false;
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

            for (var el in atConnectorInfo.selectedClients) {
                (function (element) {
                    // add group_id to connector
                    var divSourceName = document.getElementById(atConnectorInfo.selectedClients[element].divSourceName);
                    var checkbox = document.getElementById(atConnectorInfo.selectedClients[element].divSourceName).querySelector("." + AddAtMenuHelper.CHECKBOX_DFLT_WIDGET_INPUT);
                    checkbox.disabled = false;
                    checkbox.onclick = function () {
                        if (checkbox.checked) {
                            CDHelper.requireScriptJS(Scripts.defaultWidget);
                            DefaultWidget.showDefaultWidget(document.getElementById(atConnectorInfo.selectedClients[element].divSourceName), _listDashboards);
                            div_gaSourceNames.appendChild(document.getElementById(atConnectorInfo.selectedClients[element].divSourceName));
                        } else {
                            DefaultWidget.hideDefaultWidget(document.getElementById(atConnectorInfo.selectedClients[element].divSourceName));
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

    WinJS.UI.Pages.define(Pages.addAtMenuSourceName, {
        ready: ready,
    });

})();
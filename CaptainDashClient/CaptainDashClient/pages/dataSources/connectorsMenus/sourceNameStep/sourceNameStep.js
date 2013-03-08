//[SZ] Creation date : 19/02/2013

(function () {
    "use strict";
    var _connectorInfo;
    var _elements;
    var _listDashboards;

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].nameSource, true);
            _elements = elements;
            _init(_elements.connectorType);
            btn_rightMenu_back.onclick = function () {
                _showPreviousPage(elements.previous);
            };
            
            _buildSourceNamePage();
            _showDefaultWidget();
            btn_connectorSourceName_connect.focus();
            connectorSourceNamePage.onkeydown = function (e) {
                if (e.keyCode == 13) {
                    _btnConnectClick();
                    return false;
                }
            };


        });
    }
    
    /* ------------------------------------------------------
   -- Author: [S.Z]
   -- Name: _showPreviousPage
   -- Description: Navigate to previous page
   -- Params:page
   -- Return:
   -------------------------------------------------------*/
    function _showPreviousPage(page) {
        RightMenu.showRightMenu(page, null);
    }

    // Description: Description: bind data in listview Source name
    // Input:
    // Output:
    function _buildSourceNamePage() {

        CDHelper.requireScriptJS(Scripts.dashboardService);
        // build input texts relatives to selected profiles
        var lengthOfSelectedItem = 0;
        var count = 0;

        for (var el in _connectorInfo.selectedItems) {
            lengthOfSelectedItem++;
        }
        for (var el in _connectorInfo.selectedItems) {
            count++;

            // id of source name content wiotch representing selected profile
            var divSourceNameId = "div_connectorSourceName_" + _connectorInfo.selectedItems[el].id;

            // content of source name
            var divSourceName = document.createElement("div");
            divSourceName.id = divSourceNameId;
            divSourceName.className = SourceNameStepHelper.SHOW_DEFAULT_WIDGET;
            divSourceName.style.msGridRow = count;

            //source name label 
            var labelSourceName = document.createElement("div");
            labelSourceName.className = SourceNameStepHelper.LABEL_CONNECTOR_SOURCE_NAME;
            labelSourceName.innerText = CDHelper.capitaliseOnlyFirstLetter(_connectorInfo.selectedItems[el].name.toLowerCase());
            divSourceName.appendChild(labelSourceName);

            // create source name input
            var inputSourceName = document.createElement("input");
            inputSourceName.className = SourceNameStepHelper.TXT_CONNECTOR_SOURCE_NAME;
            inputSourceName.type = "text";
            inputSourceName.value = CDHelper.capitaliseOnlyFirstLetter(_connectorInfo.selectedItems[el].name.toLowerCase());
            divSourceName.appendChild(inputSourceName);

            // create error div
            var errorDiv = document.createElement("div");
            errorDiv.className = SourceNameStepHelper.ERROR_CONNECTOR_SOURCE_NAME;
            divSourceName.appendChild(errorDiv);

            // create checkbox container
            var divCheckbox = document.createElement("div");
            divCheckbox.className = SourceNameStepHelper.DIV_CHECKBOX_CONNECTOR_SOURCE_NAME;

            //create checkbox
            var checkboxId = "checkbox_dfltWidget_input_" + _connectorInfo.selectedItems[el].id;
            var checkboxSourceName = document.createElement("input");
            checkboxSourceName.id = checkboxId;
            checkboxSourceName.className = SourceNameStepHelper.CHECKBOX_DFLT_WIDGET_INPUT;
            checkboxSourceName.type = "checkbox";
            checkboxSourceName.disabled = true;
            checkboxSourceName.dataSrc = _connectorInfo.selectedItems[el].id;
            divCheckbox.appendChild(checkboxSourceName);

            //create checkbox label
            var labelCheckbox = document.createElement("label");
            labelCheckbox.for = checkboxId;
            labelCheckbox.innerHTML = SourceNameStepHelper.CHECKBOX_LABEL_TXT;
            divCheckbox.appendChild(labelCheckbox);
            divSourceName.appendChild(divCheckbox);

            //create separator line
            if (count < (lengthOfSelectedItem )) {
                var divSeparator = document.createElement("div");
                divSeparator.className = SourceNameStepHelper.SEPARATOR_CONNECTOR_SOURCE_NAME;
                divSeparator.style.height = "50px";
                var img = document.createElement("img");
                img.src = SourceNameStepHelper.IMG_SRC;
                divSeparator.appendChild(img);
                divSourceName.appendChild(divSeparator);
            }

            _connectorInfo.selectedItems[el].divSourceName = divSourceNameId;
            div_connectorSourceNames.appendChild(divSourceName);
        }


        //create button connect
        btn_connectorSourceName_connect.style.msGridRow = count + 1;
        btn_connectorSourceName_connect.onclick = _btnConnectClick;

    }

    // Description: test if labels connecotr are valid
    // Input:
    // Output:boolean
    function _isValidFields() {

        for (var profileIndex in _connectorInfo.selectedItems) {
            var divSourceName = document.getElementById(_connectorInfo.selectedItems[profileIndex].divSourceName);
            //get source name value
            var sourceName = divSourceName.querySelector("." + SourceNameStepHelper.TXT_CONNECTOR_SOURCE_NAME);
            sourceName.value = CDHelper.trim(sourceName.value);
            //get error
            var error = divSourceName.querySelector("." + SourceNameStepHelper.ERROR_CONNECTOR_SOURCE_NAME);
            error.innerHTML = "";
            if (_isLabelProfileExists(sourceName.value, profileIndex)) {
                error.innerHTML = MessagesHelper.TXT_PROFIL_EXIST;
                return false;
            } 
            else if (sourceName.value == "") {
                error.innerHTML = MessagesHelper.TXT_CONNECTOR_NAME;
                return false;
            }
            else if ((DataSourcesHelper.isConnectorLabelExist(_elements.connectorType, sourceName.value))) {
                error.innerHTML = MessagesHelper.TXT_CONNECTOR_DUPLICATED_NAME;
                return false;
            }
            else if (!CDHelper.isValidFormat(sourceName.value)) {
                error.innerHTML = MessagesHelper.TXT_CONNECTOR_SPECIAL_CARACTER;
                return false;
            }
            else {
                _connectorInfo.selectedItems[profileIndex].name = sourceName.value;
            }



            //test checked
            var checkbox = divSourceName.querySelector("." + SourceNameStepHelper.CHECKBOX_DFLT_WIDGET_INPUT);
            if (checkbox.checked) {
                CDHelper.requireScriptJS(Scripts.defaultWidget);
                var errorDashboard = divSourceName.querySelector("." + DefaultWidget._ERROR_DASHBOARD_DIV);
                var divAddDashboard = divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._ADD_DASHBOARD_DIV);
                DefaultWidget.isNewDashboard = (divAddDashboard.style.display == 'none') ? false : true;

                if (DefaultWidget.isNewDashboard) {
                    var inputDashboard = divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("input[type=text]");
                    if (inputDashboard.value == "") {
                        errorDashboard.innerHTML = MessagesHelper.TXT_DASHBOARD_NAME;
                        return false;
                    } else if (!CDHelper.isValidFormat(inputDashboard.value)) {
                        errorDashboard.innerHTML = MessagesHelper.TXT_CONNECTOR_SPECIAL_CARACTER;
                        return false;
                    }
                    else {
                        errorDashboard.innerHTML = "";
                        _connectorInfo.selectedItems[profileIndex].dashboardName = inputDashboard.value;
                    }
                } else if (divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD)) {
                    if (divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._SLCT_BOX)) {
                        if (divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._SLCT_BOX).dataSrc == "") {
                            errorDashboard.innerHTML = MessagesHelper.TXT_DASHBOARD_NAME;
                            return false;
                        } else {
                            errorDashboard.innerHTML = "";
                            _connectorInfo.selectedItems[profileIndex].dashboardId = divSourceName.querySelector("." + DefaultWidget._SLCT_DASHBOARD).querySelector("." + DefaultWidget._SLCT_BOX).dataSrc;
                        }
                    }
                }

                var errorGroup = divSourceName.querySelector("." + DefaultWidget._ERROR_GROUP_DIV);
                var divAddGroup = divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._ADD_GROUP_DIV);
                DefaultWidget.isNewGroup = (divAddGroup.style.display == 'none') ? false : true;

                if (DefaultWidget.isNewGroup) {
                    var inputGroup = divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("input[type=text]");
                    if (inputGroup.value == "") {
                        errorGroup.innerHTML = MessagesHelper.TXT_NAME_GROUP;
                        return false;
                    } else if (!CDHelper.isValidFormat(inputGroup.value)) {
                        errorGroup.innerHTML = MessagesHelper.TXT_CONNECTOR_SPECIAL_CARACTER;
                        return false;
                    }
                    else {
                        errorGroup.innerHTML = "";
                        _connectorInfo.selectedItems[profileIndex].groupName = inputGroup.value;
                    }
                } else if (divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP)) {
                    if (divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._SLCT_BOX).dataSrc == "") {
                        errorGroup.innerHTML = MessagesHelper.TXT_GROUP_NAME;
                        return false;
                    } else {
                        errorGroup.innerHTML = "";
                        _connectorInfo.selectedItems[profileIndex].groupId = divSourceName.querySelector("." + DefaultWidget._SLCT_GROUP).querySelector("." + DefaultWidget._SLCT_BOX).dataSrc;
                    }
                }
            }
        }
        return true;
    }


    // Description: add connecotrs
    // Input:
    // Output:
    function _btnConnectClick() {
        if (_isValidFields()) {
            for (var el in _connectorInfo.selectedItems) {

                // add group_id to connector
                CDHelper.requireScriptJS(Scripts.defaultWidget);
                var divSourceName = document.getElementById(_connectorInfo.selectedItems[el].divSourceName);
                var checkbox = divSourceName.querySelector("." + SourceNameStepHelper.CHECKBOX_DFLT_WIDGET_INPUT);
                if (checkbox.checked) {
                    if (_connectorInfo.selectedItems[el].dashboardName) {
                        _addDashboard(_connectorInfo.selectedItems[el]);
                    }
                    else if (_connectorInfo.selectedItems[el].groupName) {
                        var dashboardId = _connectorInfo.selectedItems[el].dashboardId;
                        _addGroup(dashboardId, _connectorInfo.selectedItems[el]);
                    }
                    else {
                        _connectorInfo.connectorModelToSend.connector.group_id = _connectorInfo.selectedItems[el].groupId;
                        _addConnector(_connectorInfo.selectedItems[el]);
                    }
                }
                else {
                    _addConnector(_connectorInfo.selectedItems[el]);
                }
            }
        }
    }

    function _addConnector(selectedItem) {
        if (_elements.connectorType == ConnectorsTemplate.ConnectorType.GoogleAnalytics) {
            _connectorInfo.connectorModelToSend.connector.payload = selectedItem;
        } else if (_elements.connectorType == ConnectorsTemplate.ConnectorType.Atlas) {
            _connectorInfo.connectorModelToSend = new ConnectorsTemplate.AtConnector(selectedItem.Label, null, null, null, atConnectorInfo.client_guid, null, null, AtMenuHelper.TIME_ZONE_PARIS, ConnectorsTemplate.ConnectorType.Atlas, atConnectorInfo.username, atConnectorInfo.password, selectedItem.Id);
        }
        var divSourceName = document.getElementById(selectedItem.divSourceName);
        var connectorLabel = CDHelper.trim(divSourceName.querySelector("." + SourceNameStepHelper.TXT_CONNECTOR_SOURCE_NAME).value);
        _connectorInfo.connectorModelToSend.connector.payload.name = connectorLabel;
        
        ConnectorsServices.addConnector(_connectorInfo.connectorModelToSend, _addConnectorSucceed, _addConnectorFailed);
    }

    function _addDashboard(selectedItem) {
        var dashboardTitle = selectedItem.dashboardName;
        var dashboardToSend = {
            dashboard: {
                title: dashboardTitle,
                description: ""

            }
        }

        DashboardsServices.addDashboard(dashboardToSend, function (dashboard) { _addDashboardSucceed(dashboard, selectedItem) }, _addDashboardFailed);
    }

    /* ------------------------------------------------------
   -- Author: [S.Z]
   -- Name: _addDashboardSucceed
   -- Description: Succeed callback add dashboard
   -- Params: dashboard
   -- Return:
   -------------------------------------------------------*/
    function _addDashboardSucceed(dashboard, selectedItem) {
        _addGroup(dashboard.id, selectedItem);
    }

    /* ------------------------------------------------------
    -- Author: [S.Z]
    -- Name: _addDashboardFailed
    -- Description: Failed callback add dashboard
    -- Params: error
    -- Return:
    -------------------------------------------------------*/
    function _addDashboardFailed(error) {
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    function _addGroup(dashboardId, selectedItem) {
        var groupTitle = CDHelper.trim(selectedItem.groupName);
        var newGroup = {
            group: {
                title: groupTitle
            }
        }
        DashboardsServices.addGroupDashboard(dashboardId, newGroup, function (group) { _addGroupSucceed(group, selectedItem); }, _addGroupFailed);
    }

    /* ------------------------------------------------------
   -- Author: [S.Z]
   -- Name: _addGroupSucceed
   -- Description: add Group succeed
   -- Params:
   -- Return:
   -------------------------------------------------------*/
    function _addGroupSucceed(group, selectedItem) {
        //selectedItem.groupId = group.id;
        _connectorInfo.connectorModelToSend.connector.group_id = group.id;
        _addConnector(selectedItem);
    }

    /* ------------------------------------------------------
    -- Author: [S.Z]
    -- Name: _addGroupFailed
    -- Description: add Group failed
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _addGroupFailed(error) {
 
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    // Description: test if list containe a duplicate client
    // Input:label : string,index : int
    // Output:boolean
    function _isLabelProfileExists(label, profileIndex) {
        if ([ConnectorsTemplate.ConnectorType.Facebook, ConnectorsTemplate.ConnectorType.Foursquare, ConnectorsTemplate.ConnectorType.Twitter].indexOf(_elements.connectorType) >= 0) {
            if (DataSourcesHelper.listConnectors) {
                for (var count = 0; count < DataSourcesHelper.listConnectors[_elements.connectorType].length; count++) {
                    if (DataSourcesHelper.listConnectors[_elements.connectorType][count].service_id == _connectorInfo.connectorModelToSend.connector.payload.id)
                        return true;
                }
            }
            return false;
        } 
        else {
            label = label.toUpperCase();
            for (var el in _connectorInfo.selectedItems) {
                var element = document.getElementById(_connectorInfo.selectedItems[el].divSourceName);
                var input = element.querySelector("." + SourceNameStepHelper.TXT_CONNECTOR_SOURCE_NAME);
                if (profileIndex != el && input.value.toUpperCase() == label) {
                    return true;
                }
            }
            return false;
        }
        
    }

    //function _clickCheckbox() {
    //}
    function _addConnectorSucceed(connector) {
        DataSources.addConnector(_elements.connectorType, connector);
    }

    function _addConnectorFailed(error) {
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
        //DashboardsServices.getAllDashboards(_getDashboardsSucceed, _getDashboardsFailed);
        //RightMenu.rightMenuLoading(true);
        for (var el in _connectorInfo.selectedItems) {
            (function (element) {
                // add group_id to connector
                var divSourceName = document.getElementById(_connectorInfo.selectedItems[element].divSourceName);
                var checkbox = document.getElementById(_connectorInfo.selectedItems[element].divSourceName).querySelector("." + SourceNameStepHelper.CHECKBOX_DFLT_WIDGET_INPUT);
                checkbox.disabled = false;
                checkbox.onclick = function () {
                    RightMenu.rightMenuLoading(true);
                    if (checkbox.checked) {
                        var divSource = document.getElementById(_connectorInfo.selectedItems[element].divSourceName);
                        _getAllDashboards(divSource);
     
                        
                    } else {
                        DefaultWidget.hideDefaultWidget(document.getElementById(_connectorInfo.selectedItems[element].divSourceName)).then(function () {
                            RightMenu.rightMenuLoading(false);
                        });
                    }
                }
            })(el);

        }
    }

    function _getAllDashboards(divSource) {
        //RightMenu.rightMenuLoading(true);
        CDHelper.requireScriptJS(Scripts.dashboardService);
        DashboardsServices.getAllDashboards(function (dashboards) { _getDashboardsSucceed(dashboards, divSource); }, _getDashboardsFailed);
    }

    /* ------------------------------------------------------
      -- Name: _getDashboardsSucceed
      -- Author: [S.Z]
      -- Description: get dashboards succeed
      -- Params: dashboards
      -- Return: No one
      -------------------------------------------------------*/
    function _getDashboardsSucceed(dashboards, divSourceName) {
        // capitalise first letter dashboard
        for (var count = 0; count < dashboards.length; count++) {
            dashboards[count].title = CDHelper.capitaliseOnlyFirstLetter(dashboards[count].title);
        };
        _listDashboards = dashboards;
        CDHelper.requireScriptJS(Scripts.defaultWidget);
        DefaultWidget.showDefaultWidget(divSourceName, _listDashboards).then(function () {
            div_connectorSourceNames.appendChild(divSourceName);
            RightMenu.rightMenuLoading(false);
        });
    }

    /* ------------------------------------------------------
      -- Name: _getDashboardsfailed
      -- Author: [S.Z]
      -- Description: get dashboards failed
      -- Params: errror
      -- Return: No one
      -------------------------------------------------------*/
    function _getDashboardsFailed(error) {
        RightMenu.rightMenuLoading(false);
    }

    /* ------------------------------------------------------
     -- Author: [S.Z]
    -- Name: _init
    -- Description: initialize connector info
    -- Params:connectorType
    -- Return:
    -------------------------------------------------------*/
    function _init(connectorType) {
        var _selectedItems = new Array();

        switch (connectorType) {
            case ConnectorsTemplate.ConnectorType.Atlas:
                _connectorInfo = { selectedItems: atConnectorInfo.selectedClients, connectorModelToSend: atConnectorInfo.connectorModelToSend };
                break;
            case ConnectorsTemplate.ConnectorType.Facebook:
                _selectedItems.push({ name: _elements.accountLabel, id: _elements.connectorType });
                _connectorInfo = { selectedItems: _selectedItems, connectorModelToSend: fbconnectorModelToSend };
                break;
            case ConnectorsTemplate.ConnectorType.Foursquare:
                _selectedItems.push({ name: _elements.accountLabel, id: _elements.connectorType });
                _connectorInfo = { selectedItems: _selectedItems, connectorModelToSend: fsConnectorModelToSend };
                break;
            case ConnectorsTemplate.ConnectorType.GoogleAnalytics:
                _connectorInfo = { selectedItems: gaConnectorInfo.SelectedProfiles, connectorModelToSend: gaConnectorInfo.connectorModelToSend };
                break;
            case ConnectorsTemplate.ConnectorType.Twitter:
                _selectedItems.push({ name: _elements.accountLabel, id: _elements.connectorType });
                _connectorInfo = { selectedItems: _selectedItems, connectorModelToSend: connectorModelToSend };
                break;
        }
    }

    WinJS.UI.Pages.define(Pages.addSourceNameStep, {
        ready: ready,
    });

})();
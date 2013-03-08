/*-------------------------------
-- Author : [A.A]
-- Creation date : 17/12/2012
------------------------------*/

(function() {
    "use strict";

    var _currentConnectorType = ConnectorsTemplate.ConnectorType.All;
    var currentSortMethod = DataSourcesHelper.SortMethod.Recent;
    var _listBinding;
    var _isItemsFocused;// true: auto focus first item in lv, false if not
    var listDashboards;
    var _currentFilterType;

    WinJS.UI.Pages.define(Pages.dataSources,
        {
            ready: function (elements, options) {

                CDHelper.requireScriptJS(Scripts.DataSourcesHelper);
                WinJS.Resources.processAll();
                _initialiseAppBarLabel();
                getAllConnectors();
               
                _isItemsFocused = false;
                _currentConnectorType = ConnectorsTemplate.ConnectorType.All;
                _currentFilterType = ConnectorsTemplate.ConnectorType.All;
                //CDHelper.displayHideDiv(document.querySelector('.win-appbarclickeater'), false);
                div_DataSource_bottomAppBar.winControl.hideCommands("cmdDeleteSource");
                cmdNewSource.onclick = function () {
                    //if default view we reset the current connector type to All
                    if (DataSourcesHelper.listConnectorsLength() == 0) {
                        _currentConnectorType = ConnectorsTemplate.ConnectorType.All;
                    }
                    _showConnectorMenu();
                };
                cmdDeleteSource.onclick = _warningRemoveConnector;
                dataSourcesPage.onmousedown = function (e) {
                    RightMenu.showHideRightMenu(false);
                   
                };
                CDHelper.displayHideDiv(document.querySelector('.win-appbarclickeater'), false);
                lbl_dataSourcesPage_allFilter.onclick = function () { _setFilter(ConnectorsTemplate.ConnectorType.All) };
                lbl_dataSourcesPage_gaFilter.onclick = function () { _setFilter(ConnectorsTemplate.ConnectorType.GoogleAnalytics) };
                lbl_dataSourcesPage_twitterFilter.onclick = function () { _setFilter(ConnectorsTemplate.ConnectorType.Twitter)};
                lbl_dataSourcesPage_atlasFilter.onclick = function () { _setFilter(ConnectorsTemplate.ConnectorType.Atlas)};
                lbl_dataSourcesPage_foursquareFilter.onclick = function () { _setFilter(ConnectorsTemplate.ConnectorType.Foursquare)};
                lbl_dataSourcesPage_facebookFilter.onclick = function () { _setFilter(ConnectorsTemplate.ConnectorType.Facebook) };
                cmdRate.onclick = Pages.goToRatePage;

            
                rightMenu.onmousedown = function (e) {
                    if (e.button == CDHelper.buttonClickKey.right)
                        RightMenu.showHideRightMenu(false);
                };
                listDashboards = [{ id: DataSourcesHelper.SortMethod.Recent, title: DataSourcesHelper.SortMethod.Recent }, { id: DataSourcesHelper.SortMethod.Type, title: DataSourcesHelper.SortMethod.Type }];
                lbl_dataSourcesPage_currentSortBy.innerHTML = DataSourcesHelper.SortMethod.Recent;
                //slct_dataSourcesPage_sortBy.onchange = _setSort;

                flyout_dataSourcesPage_sortBy.onclick = _showDashboardsFlyout;
                lbl_dataSourcesPage_currentSortBy.onclick = _showDashboardsFlyout;
                btn_dataSourcesPage_sortBy.onclick = _showDashboardsFlyout;

                cmdHelpTopAppBar.onclick = function () { HelpUtil.goToHelpPage(HelpUtil.PreviousPageIndex.DataSources); };
            },
        });

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _initialiseAppBarLabel
-- Description: initialise app bar globalisation
-- Params: no one 
-- Return: no one
------------------------------------------------------*/
    function _initialiseAppBarLabel() {
        cmdDeleteSource.winControl.label = WinJS.Resources.getString("bottomAppBar_remove").value;
        cmdNewSource.winControl.label = WinJS.Resources.getString("bottomAppBar_newSource").value;
        cmdRate.winControl.label = WinJS.Resources.getString("bottomAppBar_rate").value;
    }

    function _showDashboardsFlyout() {
        Popup.showSelectBox(flyout_dataSourcesPage_sortBy, listDashboards, _setSort, CDHelper.position.left);
    }


    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _setFilter
    -- Description: set a connector filter
    -- Params: connector type
    -- Return:
    -------------------------------------------------------*/
    function _setFilter(connectorType) {
        eval('lbl_dataSourcesPage_' + _currentFilterType + 'Filter').style.color = DataSourcesHelper.filterStatusColor.DISABLED;
        eval('lbl_dataSourcesPage_' + connectorType + 'Filter').style.color = DataSourcesHelper.filterStatusColor.ENABLED;
        _currentFilterType = connectorType;
        _currentConnectorType = connectorType;
        currentSortMethod = DataSourcesHelper.SortMethod.Recent;

        _showDataSourcesContent();

        _updateSortByOptions();
    }

    /* ------------------------------------------------------
     -- Author: [A.A]
     -- Name: _setSort
     -- Description: set sort of connectors
     -- Params:
     -- Return:
     -------------------------------------------------------*/
    function _setSort(id, label) {
        lbl_dataSourcesPage_currentSortBy.innerHTML = label;
        currentSortMethod = id;
        _showDataSourcesContent();
    }

    /* ------------------------------------------------------
     -- Author: [A.A]
     -- Name: _updateSortByOptions
     -- Description: render options of current connector filter
     -- Params:
     -- Return:
     -------------------------------------------------------*/
    function _updateSortByOptions() {
        lbl_dataSourcesPage_currentSortBy.innerHTML = currentSortMethod;
        listDashboards = [{ id: DataSourcesHelper.SortMethod.Recent, title: DataSourcesHelper.SortMethod.Recent }];
        if (_currentConnectorType == ConnectorsTemplate.ConnectorType.All)
            listDashboards.push({ id: DataSourcesHelper.SortMethod.Type, title: DataSourcesHelper.SortMethod.Type });
        else
            listDashboards.push({ id: DataSourcesHelper.SortMethod.Alphabetic, title: DataSourcesHelper.SortMethod.Alphabetic });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _displayConnectorsCountByFilter
    -- Description: display connector count for each filter
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _displayConnectorsCountByFilter() {
        var connectorCountPerFilter = DataSourcesHelper.getConnectorsCountByFilter();
        if (connectorCountPerFilter) {
            lbl_dataSourcesPage_allFilter.innerText = lbl_dataSourcesPage_allFilter.dataSrc + " (" + connectorCountPerFilter.all + ")";
            lbl_dataSourcesPage_gaFilter.innerText = lbl_dataSourcesPage_gaFilter.dataSrc + " (" + connectorCountPerFilter.ga + ")";
            lbl_dataSourcesPage_twitterFilter.innerText = lbl_dataSourcesPage_twitterFilter.dataSrc + " (" + connectorCountPerFilter.twitter + ")";
            lbl_dataSourcesPage_atlasFilter.innerText = lbl_dataSourcesPage_atlasFilter.dataSrc + " (" + connectorCountPerFilter.atlas + ")";
            lbl_dataSourcesPage_foursquareFilter.innerText = lbl_dataSourcesPage_foursquareFilter.dataSrc + " (" + connectorCountPerFilter.foursquare + ")";
            lbl_dataSourcesPage_facebookFilter.innerText = lbl_dataSourcesPage_facebookFilter.dataSrc + " (" + connectorCountPerFilter.facebook + ")";
        }
    }

    /* ------------------------------------------------------
     -- Author: [S.H]
     -- Name: _lvSelectionChanged
     -- Description: Manages the controls of bottom bar after the selection of an item 
     -- Params: L'event of selection
     -- Return: No one
     -------------------------------------------------------*/
    function _lvSelectionChanged(e) {
        var count = lv_dataSources.winControl.selection.count();
        topAppBar.winControl.hide();
  
        // Keep the app bar open after it's shown.
        //div_DataSource_bottomAppBar.winControl.sticky = false;
        if (count > 0) {
            RightMenu.showHideRightMenu(false);
            div_DataSource_bottomAppBar.winControl.showCommands("cmdDeleteSource");
            div_DataSource_bottomAppBar.winControl.hideCommands("cmdNewSource");
            div_DataSource_bottomAppBar.winControl.show();
            div_DataSource_bottomAppBar.winControl.sticky = true;
        } 
        else {
            div_DataSource_bottomAppBar.winControl.hideCommands("cmdDeleteSource");
            div_DataSource_bottomAppBar.winControl.showCommands("cmdNewSource");
            div_DataSource_bottomAppBar.winControl.hide();
            div_DataSource_bottomAppBar.winControl.sticky = false;
        }
       
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _lvSelectionChanging
    -- Description: Prevent selection if item is the "add new source" tile
    -- Params: Click event on lv item
    -- Return:
    ------------------------------------------------------*/
    function _lvSelectionChanging(e) { //TODO
        //  Handle selection event 
        var currentItemIndex = e.detail.newSelection.getIndices()[e.detail.newSelection.getIndices().length - 1];
        var lvLastItemIndex = lv_dataSources.winControl.itemDataSource.getCount()._value - 1;
        if (currentItemIndex == lvLastItemIndex) {
            // prevent selection if item is the "add new source" tile
            // by removing the item from temp selected ranges array
            e.detail.newSelection._ranges.splice(e.detail.newSelection.getIndices().length - 1);
            div_DataSource_bottomAppBar.winControl.hide();
        }
    }

    /* ------------------------------------------------------
     -- Author: [S.H]
     -- Name: _removeConnectors
     -- Description: launche the remove service for each item selected
     -- Params: No one
     -- Return: No one
     -------------------------------------------------------*/
    function _removeConnectors() {
        var connectorsToBeDeleted = [];
        var idConnector;

        connectorsToBeDeleted = lv_dataSources.winControl._selection.getItems()._value;
        idConnector = connectorsToBeDeleted[count].data.id;
        ConnectorsServices.removeConnector(idConnector, function () { _removeConnectorSucceed(connectorsToBeDeleted[0]); }, _removeConnectorFailed);
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _warningRemoveConnector
    -- Description: show popup remove connector and remove connector 
       when user click on delete cmd
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _warningRemoveConnector() {
        //hide top app bar
        topAppBar.winControl.hide();
        //preserve bottom app bar shown
        div_DataSource_bottomAppBar.winControl.sticky = true;
        //show popup
        Popup.showYesNoPopup(cmdDeleteSource, MessagesHelper.MSG_REMOVE_CONNECTOR_TITLE, MessagesHelper.MSG_REMOVE_CONNECTOR_TEXT,
            MessagesHelper.buttonsLabel.delete,
            function () {
                _removeConnectors();
                div_DataSource_bottomAppBar.winControl.sticky = false;
                div_DataSource_bottomAppBar.winControl.hide();
            },
            MessagesHelper.buttonsLabel.cancel,
            function () {
                div_DataSource_bottomAppBar.winControl.sticky = false;
            },
            CDHelper.position.right);
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _removeConnectorSucceed
    -- Description: callback remove connector succeed
    -- Params: index of the selected item (item will be deleted)
    -- Return: No one
    -------------------------------------------------------*/
    function _removeConnectorSucceed(connector) {
        lv_dataSources.winControl.itemDataSource.remove(connector.key);
        DataSourcesHelper.removeConnectorFromList(connector.data.type, connector.data.id);
        _displayConnectorsCountByFilter();
        DataExplorerController.updateExploration(connector.data.id)

        if (DataSourcesHelper.listConnectorsLength() == 0)
            _showDefaultView();
    }

    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: _removeConnectorFailed
   -- Description: callback remove connector failed
   -- Params: Error 
   -- Return: No one
   -------------------------------------------------------*/
    function _removeConnectorFailed(error) {
        //To be updated
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /* ------------------------------------------------------
    -- Author: [M.K]
    -- Name: _getAllConnectors
    -- Description: Launch get all connectors service
    -- Params: No one
    -- Return: No one
    ------------------------------------------------------*/
    function getAllConnectors() {
        CDHelper.showHideLoading(true);
        ConnectorsServices.getAllConnectors(ConnectorsTemplate.ConnectorType.All, _getAllConnectorsSucceed, _getAllConnectorsFailed);
    }

    /* ------------------------------------------------------
      -- Author: [M.K]
      -- Name: _getAllConnectorsSucceed
      -- Description: callback get all connectors succeed
      -- Params: No one
      -- Return: No one
      ------------------------------------------------------*/
    function _getAllConnectorsSucceed(connectors) {
        CDHelper.showHideLoading(false);
        if (connectors.length > 0)
        {
            DataSourcesHelper.fillListConnectors(connectors);
            _displayConnectorsCountByFilter();
            _showDataSourcesContent();
        } else {
            _showDefaultView();
        }

    }

    /* ------------------------------------------------------
     -- Author: [M.K]
     -- Name: _getAllConnectorsFailed
     -- Description: callback get all connectors failed
     -- Params: Error
     -- Return: No one
     ------------------------------------------------------*/
    function _getAllConnectorsFailed(error) {
        // To be updated
        CDHelper.showHideLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /* ------------------------------------------------------
    -- Author: [M.K]
    -- Name: _showDefaultView
    -- Description: set Listview items and options in defaul view
    -- Params: No one
    -- Return: No one
    ------------------------------------------------------*/
    function _showDefaultView() {
        var currentLayout;

        lv_dataSources.style.display = 'none';
        lv_defaultDataSources.style.display = 'block';

        CDHelper.displayHideDiv(div_dataSources_allSnapView, false);
        //Hide filters
        CDHelper.displayHideDiv(listFilters, false);
        //Show header default page
        CDHelper.displayHideDiv(div_dataSources_headerDefaultPage, true);

        if (Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped)
        {
            var backButton = dataSourcesPage.querySelector(".win-backbutton");
            if (backButton.disabled) {
                div_dataSources_topPage_label.style.msGridColumn = "2";
            }
            currentLayout = new WinJS.UI.ListLayout();
            div_dataSources_headerDefaultPage.innerText = MessagesHelper.TXT_DATASOURCE_EMPTY_SNAPVIEW;
        }
        else
        {
            currentLayout = new WinJS.UI.GridLayout();
            div_dataSources_headerDefaultPage.innerText = MessagesHelper.TXT_DATASOURCE_EMPTY_FULLVIEW;
        }

        //Bind default data sources 
        WinJS.UI.setOptions(lv_defaultDataSources.winControl, {
            itemDataSource: new WinJS.Binding.List(DataSourcesHelper.listItemsDefaultView).dataSource,
            itemTemplate: template_defaultDataSources,
            layout: currentLayout,
            selectionMode: 'none',
            oniteminvoked: _showConnectorMenuByType,
        });
    }

    /* ------------------------------------------------------
    -- Author: [M.K]
    -- Name: _showDataSourcesContent
    -- Description: show content of data source page 
    -- Params: No one
    -- Return: No one
    ------------------------------------------------------*/
    function _showDataSourcesContent() {
        var formattedConnectors;
        var listFiltredConnectors = [];
        _isItemsFocused = false;
        // filter connectors
        listFiltredConnectors = DataSourcesHelper.filterConnectors();
        // sort connectors
        DataSourcesHelper.sortConnectors(listFiltredConnectors, currentSortMethod).then(
            function (listSortedConnectors) {
                // format connectors
                formattedConnectors = DataSourcesHelper.formatConnectors(listSortedConnectors);
                if (formattedConnectors)
                    _updateUI(formattedConnectors);
                    
            },
            function () {
                //error when sorting list connectors
            }
        );
    }

    /* ------------------------------------------------------
     -- Author: [S.H]
     -- Name: _updateUI
     -- Description: set Listview items and options in normal and snap view
     -- Params: list of connectors
     -- Return: No one
     -------------------------------------------------------*/
    function _updateUI(listConnectors) {
        var currentItemTemplate;
        var currentLayout;

        lv_dataSources.style.display = 'block';
        lv_defaultDataSources.style.display = 'none';

        if (Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped) {
            var backButton = dataSourcesPage.querySelector(".win-backbutton");
            if (backButton.disabled) {
                div_dataSources_topPage_label.style.msGridColumn = "2";
            }
            currentItemTemplate = template_connectorModel_SV;
            currentLayout = new WinJS.UI.ListLayout();
            CDHelper.displayHideDiv(listFilters, false);
            CDHelper.displayHideDiv(div_dataSources_headerDefaultPage, false);
            CDHelper.displayHideDiv(div_dataSources_allSnapView, true);
        }
        else {
            var backButton = dataSourcesPage.querySelector(".win-backbutton");
            currentItemTemplate = template_connectorTile;
            currentLayout = new WinJS.UI.GridLayout();
            CDHelper.displayHideDiv(listFilters, true);
            CDHelper.displayHideDiv(div_dataSources_headerDefaultPage, false);
            CDHelper.displayHideDiv(div_dataSources_allSnapView, false);
        }
        //set Listview items and options
        WinJS.UI.setOptions(lv_dataSources.winControl, {
            itemDataSource: new WinJS.Binding.List(listConnectors).dataSource,
            itemTemplate: currentItemTemplate,
            layout: currentLayout,
            selectionMode: 'single',
            oniteminvoked: _itemInvoked,
            onloadingstatechanged: _listViewStateChanged,
            onselectionchanging: _lvSelectionChanging,
            onselectionchanged: _lvSelectionChanged,
        });

    }

    /* ------------------------------------------------------
     -- Author: 
     -- Name: _itemInvoked
     -- Description: 
     -- Params: No one
     -- Return: No one
     ------------------------------------------------------*/
    function _itemInvoked(e) {
        //   e.stopPropagation();
        var currentItem = lv_dataSources.winControl.itemDataSource.itemFromIndex(e.detail.itemIndex);
        var connectorType = currentItem._value.data.type;

        if (connectorType == -1 && lv_dataSources.winControl.selection.count() > 0)
            return;

        if (connectorType == ConnectorsTemplate.ConnectorType.All) {
            // Call from new source item
            if (_currentConnectorType == ConnectorsTemplate.ConnectorType.All) {
                // View = All connectors
                _showConnectorMenu();
            }
            else {
                // View = Specific connector
                ConnectorsMenuFactory.showConnectorMenu(_currentConnectorType);
            }
        }
        else
            RightMenu.showHideRightMenu(false);
    }

    /* ------------------------------------------------------
     -- Author: [A.A]
     -- Name: _listViewStateChanged
     -- Description: auto select first connector in lv
     -- Params: event end lv loading
     -- Return:
     ------------------------------------------------------*/
    function _listViewStateChanged(e) {
        if (!_isItemsFocused) {
            if (lv_dataSources.winControl.loadingState == "complete") {
                var winContainer = document.querySelector('.win-container');
                if (winContainer) {
                    winContainer.classList.add("win-focused");
                    var outlineDiv = document.createElement("div");
                    outlineDiv.className = "win-focusedoutline";
                    winContainer.appendChild(outlineDiv);

                    if (document.querySelector('.connectorItem'))
                        document.querySelector('.connectorItem').focus();
                }
                _isItemsFocused = true;
            }
        }

    }

    /* ------------------------------------------------------
     -- Author: [M.K]
     -- Name: showConnector
     -- Description: Insert connector in list view (at start)
     -- Params: connector
     -- Return: No one
     ------------------------------------------------------*/
    function _showConnector(connector) {
        if (connector) {
            if (DataSourcesHelper.listConnectorsLength() > 1)
                lv_dataSources.winControl.itemDataSource.insertAtStart(null, DataSourcesHelper.generateConnectorModel(connector));
            else
                _showDataSourcesContent();
        }
        _displayConnectorsCountByFilter();
    }

    /* ------------------------------------------------------
     -- Author: [A.A]
     -- Name: _showConnectorMenuByType
     -- Description: display connector menu from default connector lv
     -- Params: event on item invoked
     -- Return:
     -------------------------------------------------------*/
    function _showConnectorMenuByType(e) {
        _currentConnectorType = lv_defaultDataSources.winControl.itemDataSource.itemFromIndex(e.detail.itemIndex)._value.data.type;
        _showConnectorMenu();
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showConnectorMenu
    -- Description: display connector menu from appBar
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showConnectorMenu() {
        topAppBar.winControl.hide();
        div_DataSource_bottomAppBar.winControl.hide();
        ConnectorsMenuFactory.showConnectorMenu(_currentConnectorType);
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: onResize
    -- Description: handle the event of resize between normal and snap view
    -- Params: L'event
    -- Return: No one
    -------------------------------------------------------*/
    function onResize(e) {
        eval('lbl_dataSourcesPage_' + _currentConnectorType + 'Filter').style.color = DataSourcesHelper.filterStatusColor.DISABLED;
        lbl_dataSourcesPage_allFilter.style.color = DataSourcesHelper.filterStatusColor.ENABLED;
        _currentConnectorType = ConnectorsTemplate.ConnectorType.All;
        currentSortMethod = DataSourcesHelper.SortMethod.Recent;
        _updateSortByOptions();

        if (Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped) {
            RightMenu.showHideRightMenu(false);
            _currentFilterType = ConnectorsTemplate.ConnectorType.All;
        }

        if (DataSourcesHelper.listConnectorsLength() > 0) {
            _showDataSourcesContent();
            div_DataSource_bottomAppBar.winControl.hideCommands("cmdDeleteSource");
            div_DataSource_bottomAppBar.winControl.showCommands("cmdNewSource");
            div_DataSource_bottomAppBar.winControl.sticky = false;
        }
        else {
            _showDefaultView();
        }      
    }

    function addConnector(connectorType, connector) {
        RightMenu.showHideRightMenu(false);
        DataSourcesHelper.addConnector(connectorType, connector);
        _showConnector(connector);
        Messages.showToast(connector.title + " is on the launchpad.");
    }

    function notificationHandler(notification) {
        //TODO
    }

    WinJS.Namespace.define("DataSources", {
        currentConnectorType: { get: function () { return _currentConnectorType; } },
        currentFilterType: { get: function () { return _currentFilterType; } },
        addConnector: addConnector,
        onResize: onResize,
        notificationHandler: notificationHandler,
        getAllConnectors: getAllConnectors,
    });
})();




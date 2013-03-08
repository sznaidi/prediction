/*-------------------------------
-- Author : [M.C]
-- Creation date : 28/01/2013
------------------------------*/

(function () {
    "use strict";

    var listWidgetsBinding;
    var listGroupsBinding;
    var _ALL_DASHBOARDS = WinJS.Resources.getString("Cockpits_ALL_DASHBOARDS").value;
    var _ALL = WinJS.Resources.getString("Cockpits_ALL").value;
    var _idgroup;
    var currentDash = [];

    WinJS.UI.Pages.define(Pages.cockpits,
        {
            ready: function (elements, options) {

                _initialiseAppBarLabel();
                CDHelper.requireScriptJS(Scripts.dataExplorerHelperJS);
                CDHelper.requireScriptJS(Scripts.dataExplorerController);
                listGroupsBinding = null;
                cockpitsPage.onmousedown = function () { RightMenu.showHideRightMenu(false); };

                CDHelper.displayHideDiv(document.querySelector('.win-appbarclickeater'), false);

                //set command bar events
                cmdDelete.onclick = _deleteItems;
                cmdNew.onclick = _showAddTileMenu;
                cmdModify.onclick = _showModifyTileMenu;
                cmdRate.onclick = Pages.goToRatePage;
                //cmdHighlightWidget.onclick = _highlightTile;

                lbl_dashboard.innerHTML = CDHelper.capitaliseOnlyFirstLetter(options.title);
                lbl_dashboard.onclick = _showDashboardsFlyout;
                btn_selectDashboard_cockpit.onclick = _showDashboardsFlyout;

                _getDashboard(options.idDashboard);

                div_cockpits_bottomAppBar.winControl.hideCommands("cmdModify");
                div_cockpits_bottomAppBar.winControl.hideCommands("cmdDelete");
                div_cockpits_bottomAppBar.winControl.hideCommands("cmdHighlightWidget");

                if (options.idGroup)
                    _idgroup = options.idGroup;

                cmdHelpTopAppBar.onclick = function () { HelpUtil.goToHelpPage(HelpUtil.PreviousPageIndex.Dashboards); };
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
        cmdDelete.winControl.label = WinJS.Resources.getString("bottomAppBar_delete").value;
        cmdModify.winControl.label = WinJS.Resources.getString("bottomAppBar_modify").value;
        cmdNew.winControl.label = WinJS.Resources.getString("bottomAppBar_newWidget").value;
        cmdRate.winControl.label = WinJS.Resources.getString("bottomAppBar_rate").value;
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _getListDashboardsForFlyout
    -- Description: show dashboards flyout
    -- Params: 
    -- Return:
    ------------------------------------------------------*/
    function _getListDashboardsForFlyout() {
        var listDashboards = DashboardsHelper.listDashboards.slice();
        listDashboards.splice(0, 0, { "title": _ALL_DASHBOARDS, "id": _ALL });
        // capitalise dashboards list
        for (var count = 0; count < listDashboards.length; count++) {
            listDashboards[count].title = CDHelper.capitaliseOnlyFirstLetter(listDashboards[count].title);
        };
        for (var count = 0 ; count < listDashboards.length; count++) {
            if (CockpitHelper.currentDashboard.id == listDashboards[count].id) {
                listDashboards.splice(count, 1);
                return listDashboards;
            }
        }
        return listDashboards;
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showListDashboards
    -- Description: show dashboards flyout
    -- Params: 
    -- Return:
    ------------------------------------------------------*/
    function _showDashboardsFlyout() {
        var listDashboards = _getListDashboardsForFlyout();
        Popup.showSelectBox(lbl_dashboard, listDashboards, _selectNavigationCallback, CDHelper.position.left);
    }

    /* ------------------------------------------------------
 -- Author: [M.C]
 -- Name: _scrollToGroup
 -- Description: scroll to selected group
 -- Params: 
 -- Return: 
 ------------------------------------------------------*/
    function _scrollToGroup() {
        if (listGroupsBinding && listGroupsBinding.groups._groupItems[_idgroup]) {
            var firstItemIndexHint = listGroupsBinding.groups._groupItems[_idgroup].firstItemIndexHint;
            lv_cockpits.winControl.indexOfFirstVisible = firstItemIndexHint;
        }

        lv_cockpits.winControl.removeEventListener("loadingstatechanged", _scrollToGroup);
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _selectNavigationCallback
-- Description: go to cockpi after click id dashboard
-- Params: idDashboard, title
-- Return: 
------------------------------------------------------*/
    function _selectNavigationCallback(idDashboard, title) {
        if (idDashboard != _ALL)
            WinJS.Navigation.navigate(Pages.cockpits, { "title": title, "idDashboard": idDashboard, "idGroup": null });
        else
            WinJS.Navigation.navigate(Pages.dashboards);
    }

    /* ------------------------------------------------------
  -- Author: [M.C]
  -- Name: _getDashboard
  -- Description: Launch get full dashboards service
  -- Params: idDashboard
  -- Return: No one
  ------------------------------------------------------*/
    function _getDashboard(idDashboard) {
        CDHelper.showHideLoading(true);
        DashboardsServices.getDashboard(idDashboard, _getDashboardSucceed, _getDashboardFailed);
    }

    /* ------------------------------------------------------
     -- Author: [M.C]
     -- Name: _getDashboardSucceed
     -- Description: callback get full dashboard succeed 
     -- Params: full dashboard
     -- Return: No one
     ------------------------------------------------------*/
    function _getDashboardSucceed(dashboard) {
        CockpitHelper.fillCockpits(dashboard);
        currentDash = dashboard;
        if (dashboard.groups.length > 0) {
            CockpitHelper.hashedGroupList = CDHelper.toHashTable(dashboard.groups);
            var listItem = CockpitHelper.getListItemFromDashboard(currentDash);

            listGroupsBinding = new WinJS.Binding.List(listItem);
            listGroupsBinding.sort(_ascendingCompare);

            listGroupsBinding = listGroupsBinding.createGrouped(_getGroupKeySelector, _getGroupDataSelector, _sortGroups);
            _bindDataLvTiles();

            if (_idgroup)
                lv_cockpits.winControl.addEventListener("loadingstatechanged", _scrollToGroup);
        }
        else
            CDHelper.showHideLoading(false);
    }


    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _ascendingCompare
    -- Description: sorts the given list ascending by position
    -- Params: 2 items to compare
    -- Return: integer
    ------------------------------------------------------*/
    function _ascendingCompare(first, second) {
        return first.position - second.position;
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _sortGroups
    -- Description: sorts groups switch their positions
    -- Params: 2 groups to compare
    -- Return: integer
    ------------------------------------------------------*/
    function _sortGroups(first, second) {
        var firstGroup = CockpitHelper.hashedGroupList[first];
        var secondGroup = CockpitHelper.hashedGroupList[second];
        return firstGroup.position - secondGroup.position;
    }

    function updateDynamicTile() {
        CockpitsServices.getDynamicTileKpi(_getDynamicTileKpiSucced, _getDynamicTileKpiFailed);
        function _getDynamicTileKpiSucced(tiles) {
            var kpis = [];
            tiles.forEach(function (item) {
                if (item.type == CockpitHelper.TileType.Numerique) {
                    var itemKpi = _getKpiItem(CockpitHelper.cloneNumericTile(item));
                    kpis.push({ 'Date': itemKpi.dateCreation, 'Kpi': itemKpi });
                }
            });
            DynamicTile.updateDynamicTile(kpis);
        }
        function _getDynamicTileKpiFailed(error) { }
    }
    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _getGroupKeySelector
    -- Description: This function is called with each element in the list, 
       it returns the key of group containing the element.
    -- Params: It accept a single item
    -- Return: the key of group containing the item
    ------------------------------------------------------*/
    function _getGroupKeySelector(item) {
        return item.group.key;
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _getGroupDataSelector
    -- Description: given an item in the list, returns the data object 
       that represents the group that the item belongs to.
    -- Params: item
    -- Return: data object of each group
    ------------------------------------------------------*/
    function _getGroupDataSelector(item) {
        return item.group;
    }


    /* ------------------------------------------------------
     -- Author: [M.C]
     -- Name: _getDashboardFailed
     -- Description: callback get full dashboard failed
     -- Params: Error
     -- Return: No one
     ------------------------------------------------------*/
    function _getDashboardFailed(error) {
        CDHelper.showHideLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _deleteItem
    -- Description: removes selected items
    -- Params: none
    -- Return:  none
    ------------------------------------------------------*/
    function _deleteItems() {
        var nbSelectedItems = lv_cockpits.winControl.selection.count();

        if (nbSelectedItems == lv_cockpits.winControl.itemDataSource.getCount()._value) {
            _warningRemoveItems();
        }
        else {
            _removeTiles();
        }
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _warningRemoveItems
    -- Description: display warning popup to confirm delete
    -- Return: none
    -------------------------------------------------------*/
    function _warningRemoveItems() {
        //hide top app bar
        topAppBar.winControl.hide();
        //preserve bottom app bar shown
        div_cockpits_bottomAppBar.winControl.sticky = true;
        //show popup
        Popup.showYesNoPopup(cmdDelete, MessagesHelper.MSG_REMOVE_LAST_TILE_TITLE, MessagesHelper.MSG_REMOVE_LAST_TILE_TEXT,
            MessagesHelper.buttonsLabel.delete,
            function () {
                _removeTiles();
                div_cockpits_bottomAppBar.winControl.sticky = false;
                div_cockpits_bottomAppBar.winControl.hide();
            },
            MessagesHelper.buttonsLabel.cancel,
            function () {
                div_cockpits_bottomAppBar.winControl.sticky = false;
            },
            CDHelper.position.right);
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _removeTiles
    -- Description: removes selected tiles from DB
    -- Params: none
    -- Return: none
    -------------------------------------------------------*/
    function _removeTiles() {
        var tilesKeys = _getSelectedTilesKeys();
        var tilesIds = _getSelectedTilesIds();

        var _succeedHandler = function () {
            _removeTileSucceed(tilesKeys, tilesIds);
        };

        if (tilesIds.length > 0) {
            //join promise remove keys for mutli remove if needed
            CDHelper.showHideLoading(true);
            CockpitsServices.removeTiles(tilesIds[0], _succeedHandler, _removeTileFailed);
        }
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _getSelectedTilesKeys
    -- Description: collects selected tiles Keys
    -- Params: none
    -- Return: tilesKeys = array of selected tiles keys
    -------------------------------------------------------*/
    function _getSelectedTilesKeys() {
        var tilesKeys = [];
        var nbSelectedtiles = lv_cockpits.winControl.selection.count();
        for (var tileIterator = 0; tileIterator < nbSelectedtiles; tileIterator++) {
            var currentItem = lv_cockpits.winControl.selection.getItems()._value[tileIterator];
            tilesKeys.push(currentItem.key);
        }

        return tilesKeys;
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _getSelectedTilesIds
    -- Description: collects selected tiles Ids
    -- Params: none
    -- Return: tilesKeys = array of selected tiles Ids
    -------------------------------------------------------*/
    function _getSelectedTilesIds() {
        var tilesIds = [];
        var nbSelectedtiles = lv_cockpits.winControl.selection.count();
        for (var tileIterator = 0; tileIterator < nbSelectedtiles; tileIterator++) {
            var currentItemData = lv_cockpits.winControl.selection.getItems()._value[tileIterator].data;
            tilesIds.push(currentItemData.id);
        }

        return tilesIds;
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _removeTileSucceed
    -- Description: 
            * remove tiles from UI & static list
    -- Params: none
    -- Return: none
    -------------------------------------------------------*/
    function _removeTileSucceed(keysToRemove, idsToRemove) {
        //successfully deleted from DB 
        //remove tile from UI
        //add loop for mutli remove if needed
        CDHelper.showHideLoading(false);
        var dataSource = lv_cockpits.winControl.itemDataSource;
        for (var tilesIterator = 0; tilesIterator < keysToRemove.length; tilesIterator++) {
            var currentItem = dataSource.itemFromKey(keysToRemove[tilesIterator]);
            dataSource.remove(keysToRemove[tilesIterator]);
            CockpitHelper.removeTileFromCurrentDashboard(idsToRemove[tilesIterator]);
        }
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _removeTileFailed
    -- Description: 
            * failed callback for remove dashboard
            * shows error message 
    -- Params: none
    -- Return: none
    -------------------------------------------------------*/
    function _removeTileFailed(error) {
        CDHelper.showHideLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }
    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name:_updateLvTiles
    -- Description: bind data of list view of tiles (widgets)
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _bindDataLvTiles() {
        if (Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped) {
            WinJS.UI.setOptions(lv_cockpits.winControl, {
                itemTemplate: renderWidget,
                itemDataSource: listGroupsBinding.dataSource,
                oniteminvoked: lvCockpitsItemInvoked,
                onselectionchanged: _lvCockpitsSelectionChanged,
                layout: new WinJS.UI.ListLayout,
                onloadingstatechanged: _lvTitlesLoadStateChanged,
            });
        }
        else {
            WinJS.UI.setOptions(lv_cockpits.winControl, {
                itemTemplate: renderWidget,
                itemDataSource: listGroupsBinding.dataSource,
                groupHeaderTemplate: template_group,
                groupDataSource: listGroupsBinding.groups.dataSource,
                oniteminvoked: lvCockpitsItemInvoked,
                onselectionchanged: _lvCockpitsSelectionChanged,
                onloadingstatechanged: _lvTitlesLoadStateChanged,
                layout: new WinJS.UI.GridLayout({
                    backdropColor: "transparent",
                    groupHeaderPosition: "top",
                    groupInfo: function () {
                        return {
                            enableCellSpanning: true,
                            cellWidth: 10,
                            cellHeight: 10,
                        };
                    }
                }),
                automaticallyLoadPages: true,
                pagesToLoad: 50,
                swipeBehavior: 'select',
            });
        }
    }

    function _lvTitlesLoadStateChanged(e) {
        if (lv_cockpits.winControl.loadingState == "complete") {
            CDHelper.showHideLoading(false);
        }
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name:renderWidget
    -- Description: Render selected template to div container
    -- Params: item from datasource
    -- Return: container div
    -------------------------------------------------------*/
    function renderWidget(itemPromise) {
        return itemPromise.then(function (item) {
            var size = CockpitHelper.calculTileSize(item.data.width, item.data.height);
            var container = document.createElement("div");
            switch (item.data.widgetType) {
                case CockpitHelper.TileType.Numerique:
                    {
                        //template_kpi is used when rendering a kpi item
                        template_kpi.winControl.render(_getKpiItem(item.data), container);
                        var itemKpi = container.querySelector('.itemKpi');

                        itemKpi.style.backgroundImage = CockpitHelper.getKpiBackgroundImg(item.data.connectorType, item.data.spotlighted_at);

                        if (Windows.UI.ViewManagement.ApplicationView.value != Windows.UI.ViewManagement.ApplicationViewState.snapped) {
                            itemKpi.style.width = size.width;
                            itemKpi.style.height = size.height;
                        }
                        else {
                            itemKpi.style.width = CockpitHelper.widthKpiSnap;
                            itemKpi.style.height = CockpitHelper.heightKpiSnap;
                        }
                        break;
                    }

                case CockpitHelper.TileType.Exploration:
                    {
                        var explorationTile;
                        var containerExploration;
                        //template_exploration is used when rendering an exploration item
                        template_exploration.winControl.render(_getItemExploration(item.data), container);
                        explorationTile = container.querySelector('.explorationTile');
                        explorationTile.style.width = size.width;
                        explorationTile.style.height = size.height;
                        explorationTile.style.backgroundColor = "#faf8ea";

                        containerExploration = explorationTile.querySelector('.containerItemExploration');
                        containerExploration.id = "exploration" + item.index;

                        (function (exploration) {
                            exploration.setTimeStamps();
                            exploration.graphs_attributes = _formatIdSerie(exploration.graphs_attributes);
                            CDHelper.requireScriptJS(Scripts.dataExplorerController);
                            DataExplorerController.getExplorationData(exploration, function () { _drawExplorationTile(exploration, containerExploration.id); });
                        })(item.data);

                        break;
                    }

                case CockpitHelper.TileType.Comparaison:
                    {
                        //TODO
                        break;
                    }

                default:
                    {
                        break;
                    }
            }

            return container;
        });
    }

    function _formatIdSerie(graphs) {
        for (var i = 0; i < graphs.length; i++) {
            if (!graphs[i].dimensions)
                graphs[i].dimensions = [];
            graphs[i].id = GraphTemplate.Graph.prototype.getSerieId(graphs[i].connector_id, graphs[i].measure, graphs[i].dimensions);
        }
        return graphs;
    }

    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name:_getKpiItem
   -- Description: Return the kpi item model from the data of item
   -- Params: data of item
   -- Return: kpi item model
   -------------------------------------------------------*/
    function _getKpiItem(data) {
        var currentDate;
        var tileModel;
        var labelSize
        var formattedValue;

        if (data.frequency)
            currentDate = CockpitHelper.formatDate(data.frequency, data.date);

        if (data.value) {

            formattedValue = CockpitHelper.formatKpiValue(data.value);
            labelSize = CockpitHelper.getTileValueSize((formattedValue).toString().length);
        }

        else {
            formattedValue = CockpitHelper.noData;
        }

        var item = {
            key: (data.group) ? data.group.key : data.id,
            value: formattedValue,
            precision: "",
            unit: "",
            fontSize: labelSize,
            label: data.label,
            typeSource: CDHelper.capitaliseOnlyFirstLetter(data.connectorName),
            formattedDate: currentDate,
        }
        return item;
    }

    function _getItemExploration(data) {
        var item = {
            label: data.name,
        }
        return item;
    }

    function _drawExplorationTile(explorationTile, idContainer) {
        var tempViewObject = D3jsAccess.drawExploration(idContainer, explorationTile, true);
        D3jsAccess.displayExploration(tempViewObject, idContainer, explorationTile);
    }

    function updateKpi(currentTile) {
        var key = lv_cockpits.winControl.selection.getItems()._value[0].key;
        var dashboardKey = currentTile.idDashboard;
        var groupKey = currentTile.group.key;
        if (currentTile.lastIdDashboard == dashboardKey) {
            if (currentTile.group.key != currentTile.lastGroup.key) {
                lv_cockpits.winControl.itemDataSource.remove(key);
                lv_cockpits.winControl.itemDataSource.insertAtEnd('', currentTile);
                lv_cockpits.winControl.indexOfFirstVisible = listGroupsBinding.groups._groupItems[currentTile.group.key].firstItemIndexHint + listGroupsBinding.groups._groupItems[currentTile.group.key].groupSize - 1;
            }
            else {
                lv_cockpits.winControl.itemDataSource.beginEdits();
                lv_cockpits.winControl.itemDataSource.change(key, currentTile);
                //lv_cockpits.winControl.itemDataSource._list._listReload();
                lv_cockpits.winControl.itemDataSource.endEdits();
            }
            CockpitHelper.modifyTileInCurrentDashboard(currentTile);
        }
        else {
            lv_cockpits.winControl.itemDataSource.remove(key);
            WinJS.Navigation.navigate(Pages.cockpits, { "title": DashboardsHelper.getDashboardById(dashboardKey).title, "idDashboard": dashboardKey, "idGroup": groupKey });
        }

        lv_cockpits.winControl.selection.clear();
        div_cockpits_bottomAppBar.winControl.hide();
        RightMenu.showHideRightMenu(false);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
   -- Name:insertNewKpi
   -- Description: add new kpi to list view
   -- Params: new kpi
   -- Return:
   -------------------------------------------------------*/
    function insertNewKpi(tile) {
        var tempTile = {};
        tempTile = CockpitHelper.cloneNumericTile(tile);
        tempTile.group = DashboardsHelper.getHeaderProperties(currentKpi.kpi.tile.group_id, currentKpi.group);

        // add tile to static list
        CockpitHelper.addTileToCurrentDashboard(tile);

        lv_cockpits.winControl.itemDataSource.insertAtEnd(null, tempTile).then(function (item) {
            if (listGroupsBinding)
                lv_cockpits.winControl.indexOfFirstVisible = listGroupsBinding.groups._groupItems[tempTile.group.key].firstItemIndexHint + listGroupsBinding.groups._groupItems[tempTile.group.key].groupSize - 1;
            else
                _getDashboard(CockpitHelper.currentDashboard.id)
        });
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name:lvCockpitsItemInvoked
    -- Description: draw tile in explorer page
    -- Params: e:item
    -- Return: no one
    -------------------------------------------------------*/
    function lvCockpitsItemInvoked(e) {
        e.detail.itemPromise.done(function (item) {
            DataExplorer.drawTile(item.data);
        });
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _lvCockpitsSelectionChanged
    -- Description: Manages the controls of bottom bar after the selection of an item
    -- Params: event selection changed
    -- Return:
    -------------------------------------------------------*/
    function _lvCockpitsSelectionChanged(e) {
        var count = lv_cockpits.winControl.selection.count();
        topAppBar.winControl.hide();

        // Keep the app bar open after it's shown.
        //div_cockpits_bottomAppBar.winControl.sticky = true;
        if (count > 1) {
            div_cockpits_bottomAppBar.winControl.showCommands("cmdDelete");
            div_cockpits_bottomAppBar.winControl.hideCommands("cmdNew");
            div_cockpits_bottomAppBar.winControl.hideCommands("cmdModify");
            //div_cockpits_bottomAppBar.winControl.showCommands("cmdHighlightWidget");
            div_cockpits_bottomAppBar.winControl.show();
            div_cockpits_bottomAppBar.winControl.sticky = true;
        }
        else if (count == 1) {
            div_cockpits_bottomAppBar.winControl.showCommands("cmdDelete");
            div_cockpits_bottomAppBar.winControl.hideCommands("cmdNew");
            div_cockpits_bottomAppBar.winControl.showCommands("cmdModify");
            //div_cockpits_bottomAppBar.winControl.showCommands("cmdHighlightWidget");
            div_cockpits_bottomAppBar.winControl.show();
            div_cockpits_bottomAppBar.winControl.sticky = true;
        }
        else {
            RightMenu.showHideRightMenu(false);
            div_cockpits_bottomAppBar.winControl.hideCommands("cmdDelete");
            div_cockpits_bottomAppBar.winControl.showCommands("cmdNew");
            div_cockpits_bottomAppBar.winControl.hideCommands("cmdModify");
            //div_cockpits_bottomAppBar.winControl.hideCommands("cmdHighlightWidget");
            div_cockpits_bottomAppBar.winControl.hide();
            div_cockpits_bottomAppBar.winControl.sticky = false;
        }
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _highlightTile
    -- Description: handle the click on highlight button
    -- Params: No one
    -- Return: No one
       -------------------------------------------------------*/
    //Do not delete this code
    function _highlightTile() {
        var itemSelected = lv_cockpits.winControl.selection.getItems()._value[0];
        if (!itemSelected.data.spotlighted_at) {
            itemSelected.data.spotlighted_at = new Date();
        }
        else
            itemSelected.data.spotlighted_at = null;
        lv_cockpits.winControl.itemDataSource.change(itemSelected.key, itemSelected.data);
    }


    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showAddTileMenu
    -- Description: display add tile menu from appBar
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showAddTileMenu() {
        topAppBar.winControl.hide();
        div_cockpits_bottomAppBar.winControl.hide();
        RightMenu.showRightMenu(Pages.formatTileStep, null);
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _showModifyTileMenu
    -- Description: display modify tile menu from appBar
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showModifyTileMenu() {
        //topAppBar.winControl.hide();
        div_cockpits_bottomAppBar.winControl.hide();
        var item = lv_cockpits.winControl._selection.getItems()._value[0].data;
        item.idDashboard = CockpitHelper.currentDashboard.id;
        if (item.widgetType == CockpitHelper.TileType.Numerique) {
            RightMenu.showRightMenu(Pages.modifyKpiResumeStep, { "tile": item });
        }
        else if (item.widgetType == CockpitHelper.TileType.Exploration) {
            RightMenu.showRightMenu(Pages.modifyExploration, { "tile": item });
        }
    }

    function onResize(e) {
        if ((Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped))
            RightMenu.showHideRightMenu(false);
        _bindDataLvTiles();
        div_cockpits_bottomAppBar.winControl.sticky = false;
    }

    WinJS.Namespace.define("Cockpits", {
        onResize: onResize,
        insertNewKpi: insertNewKpi,
        updateKpi: updateKpi,
        updateDynamicTile: updateDynamicTile,
        currentDash: { get: function () { return currentDash; }, set: function (value) { currentDash = value; } },
        lvCockpitsItemInvoked: lvCockpitsItemInvoked,
        renderWidget: renderWidget,
    });

})();




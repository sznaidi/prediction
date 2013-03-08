/*-------------------------------
-- Author : [A.A]
-- Creation date : 21/01/2013
------------------------------*/

(function () {
    "use strict";

    var listDashboardsBinding;

    WinJS.UI.Pages.define(Pages.dashboards,
        {
            ready: function (elements, options) {

                WinJS.Resources.processAll();
                _initialiseAppBarLabel();
                CDHelper.requireScriptJS(Scripts.dashboardHelper);

                _getAllDashboards();

                cmdNewDashboard.onclick = _showAddDashboardMenu;
                cmdModify.onclick = _modifyItem;
                cmdDelete.onclick = _deleteItems;
                cmdRate.onclick = Pages.goToRatePage;

                dashboardsPage.onmousedown = function () { RightMenu.showHideRightMenu(false); };
                CDHelper.displayHideDiv(document.querySelector('.win-appbarclickeater'), false);

                div_dashboards_bottomAppBar.winControl.hideCommands("cmdModify");
                div_dashboards_bottomAppBar.winControl.hideCommands("cmdDelete");

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
        cmdNewDashboard.winControl.label = WinJS.Resources.getString("bottomAppBar_newDashboard").value;
        cmdRate.winControl.label = WinJS.Resources.getString("bottomAppBar_rate").value;
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _getAllDashboards
    -- Description: Launch get all dashboards service
    -- Params: No one
    -- Return: No one
    ------------------------------------------------------*/
    function _getAllDashboards() {
        CDHelper.showHideLoading(true);
        DashboardsServices.getAllDashboards(_getAllDashboardsSucceed, _getAllDashboardsFailed);
    }

    /* ------------------------------------------------------
      -- Author: [A.A]
      -- Name: _getAllDashboardsSucceed
      -- Description: callback get all dashboards succeed 
      -- Params: list dashboards
      -- Return: No one
      ------------------------------------------------------*/
    function _getAllDashboardsSucceed(dashboards) {
        CDHelper.showHideLoading(false);
        _upadteUiDashboards(dashboards);
    }

    /* ------------------------------------------------------
     -- Author: [A.A]
     -- Name: _getAllDashboardsFailed
     -- Description: callback get all dashboards failed
     -- Params: Error
     -- Return: No one
     ------------------------------------------------------*/
    function _getAllDashboardsFailed(error) {
        CDHelper.showHideLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);

    }

    /* ------------------------------------------------------
  -- Author: [M.C]
  -- Name: _upadteUiDashboards
  -- Description: update format data && binding data && create group item
  -- Params: list dashboards
  -- Return: No one
  ------------------------------------------------------*/
    function _upadteUiDashboards(dashboards) {
        if (dashboards.length > 0) {
            _updateMarginLeftListViewDashboards(false);
            DashboardsHelper.fillListDashboards(dashboards);
            listDashboardsBinding = new WinJS.Binding.List();

            //add dashboard element and group element to list of binding

            DashboardsHelper.listDashboards.forEach(function (dashboard) {
                var tempDashBoard = {};
                tempDashBoard.group = DashboardsHelper.getHeaderProperties(dashboard.id, dashboard.title);
                tempDashBoard.type = DashboardsHelper.WidgetType.DASHBOARD;
                tempDashBoard.id = dashboard.id;
                tempDashBoard.description = CDHelper.capitaliseFirstLetter(dashboard.description);
                tempDashBoard.tiles_count = dashboard.tiles_count;
                listDashboardsBinding.push(tempDashBoard);


                dashboard.groups.forEach(function (group) {
                    //if (group.nbrTiles > 0) { HK: Waiting for variable to be added service side
                    var tempGroup = {};
                    tempGroup.group = tempDashBoard.group;
                    tempGroup.type = DashboardsHelper.WidgetType.GROUP;
                    tempGroup.id = group.id;
                    tempGroup.title = group.title;
                    listDashboardsBinding.push(tempGroup);
                    //}
                });
            });

            listDashboardsBinding = listDashboardsBinding.createGrouped(_getDashboaedGroupKeySelector, _getDashboaedGroupDataSelector);
            _renderLvDashboards();
        }
        else
            _updateMarginLeftListViewDashboards(true);
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _renderDashboards
    -- Description: render data in dashboard div or group div 
    -- Params: item from datasource
    -- Return: div
    ------------------------------------------------------*/
    function _renderDashboards(itemPromise) {
        return itemPromise.then(function (item) {
            var container = document.createElement("div");
            if (item.data.type == DashboardsHelper.WidgetType.DASHBOARD) {
                //since the virtual keyboard is decreasing the main window height
                //layout height of new dashboard to render is not not conform to others
                //so we get virtual keyboard properties and add its height to main window height
                //virtual keyboard closed => height = 0 (we preserve always the start height of the window)
                var virtualKeyboardProperties = Windows.UI.ViewManagement.InputPane.getForCurrentView().occludedRect;
                var screenHeight = window.innerHeight + virtualKeyboardProperties.height;

                template_dashboard_item.winControl.render(_getDashboardItem(item.data), container);
                container.style.height = (screenHeight * 0.612) + "px";
            }
            else {
                template_group_item.winControl.render(_getGroupItem(item.data), container);
            }
            return container;
        });
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _getDashboardItem
    -- Description: return data needed to dashboard item
    -- Params: item from datasource
    -- Return: dashborad object
    ------------------------------------------------------*/
    function _getDashboardItem(dashboard) {
        var item = {
            key: dashboard.id,
            description: (dashboard.description) ? dashboard.description : '',
            count: "(" + dashboard.tiles_count + " widgets)",
            index: '',
        };
        return item;
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _getGroupItem
    -- Description: return data needed to group item
    -- Params: item from datasource
    -- Return: groupWidget object
    ------------------------------------------------------*/
    function _getGroupItem(group) {
        var item = {
            key: group.id,
            label: CDHelper.capitaliseOnlyFirstLetter(group.title),
        };
        return item;
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _getDashboaedGroupKeySelector
    -- Description: return key of group dashboard
    -- Params: item from datasource
    -- Return: int
    ------------------------------------------------------*/
    function _getDashboaedGroupKeySelector(item) {
        return item.group.key;
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _getDashboaedGroupDataSelector
    -- Description: return item group dashboard
    -- Params: item from datasource
    -- Return:  object
    ------------------------------------------------------*/
    function _getDashboaedGroupDataSelector(item) {
        return item.group;
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _lv_dashboards_itemInvoked
    -- Description: event click in dashboard or group item
    -- Params: event
    -- Return:  
    ------------------------------------------------------*/
    function _lv_dashboards_itemInvoked(e) {
        var idDashboard;
        var titleDashboard;
        var idGroup;
        var item = lv_dashboards.winControl.itemDataSource.itemFromIndex(e.detail.itemIndex)._value.data;
        idDashboard = item.group.key;
        titleDashboard = item.group.label;
        if (item.type == DashboardsHelper.WidgetType.GROUP)
            idGroup = item.id;
        RightMenu.showHideRightMenu(false);
        WinJS.Navigation.navigate(Pages.cockpits, { "title": titleDashboard, "idDashboard": idDashboard, "idGroup": idGroup });
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _renderLvDashboards
    -- Description: update listeView dashboard
    -- Params: no one
    -- Return:  no one
    ------------------------------------------------------*/
    function _renderLvDashboards() {
        WinJS.UI.setOptions(lv_dashboards.winControl, {
            itemTemplate: _renderDashboards,
            groupHeaderTemplate: template_dashboard,
            itemDataSource: listDashboardsBinding.dataSource,
            groupDataSource: listDashboardsBinding.groups.dataSource,
            oniteminvoked: _lv_dashboards_itemInvoked,
            onselectionchanged: _lvSelectionChanged,
            layout: new WinJS.UI.GridLayout({
                backdropColor: "transparent",
                groupHeaderPosition: "top",
                groupInfo: function () {
                    return {
                        enableCellSpanning: true,
                        cellWidth: 290,
                        cellHeight: 70
                    };
                },
                ////automaticallyLoadPages: true,
                ////pagesToLoad: 50,
                ////pagesToLoadThreshold: 3000,
                ////scrollLimitMin: 200
            })
        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showAddDashboardMenu
    -- Description: display add dashboard menu from appBar
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showAddDashboardMenu() {
        topAppBar.winControl.hide();
        div_dashboards_bottomAppBar.winControl.hide();
        CDHelper.unloadScriptJS(Pages.modifyDashboardJS);
        CDHelper.requireScriptJS(Pages.addDashboardJS);
        RightMenu.showRightMenu(Pages.dashboardMenus, null);
    }

    /* ------------------------------------------------------
     -- Author: [A.A]
     -- Name: insertNewDashboard
     -- Description: Insert dashboard in list view (at start)
     -- Params: added dashboard
     -- Return:
     ------------------------------------------------------*/
    function insertNewDashboard(dashboard) {
        var newDashboard = {};
        newDashboard.group = DashboardsHelper.getHeaderProperties(dashboard.id, dashboard.title);
        newDashboard.type = DashboardsHelper.WidgetType.DASHBOARD;
        newDashboard.id = dashboard.id;
        newDashboard.description = CDHelper.capitaliseFirstLetter(dashboard.description);
        newDashboard.tiles_count = 0;
        newDashboard.groups = [];
        newDashboard.title = dashboard.title;

        DashboardsHelper.addToListDashboards(newDashboard);
        lv_dashboards.winControl.itemDataSource.insertAtStart(null, newDashboard).then(function (item) {
            if (listDashboardsBinding)
                lv_dashboards.winControl.indexOfFirstVisible = listDashboardsBinding.groups._groupItems[newDashboard.group.key].firstItemIndexHint + listDashboardsBinding.groups._groupItems[newDashboard.group.key].groupSize - 1;
            else
                _upadteUiDashboards(DashboardsHelper.listDashboards)
        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showModifyDashboardMenu
    -- Description: display add dashboard menu from appBar
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showModifyDashboardMenu() {
        if (lv_dashboards.winControl._selection.getItems()._value.length == 1) {
            topAppBar.winControl.hide();
            div_dashboards_bottomAppBar.winControl.hide();

            CDHelper.unloadScriptJS(Pages.addDashboardJS);
            CDHelper.requireScriptJS(Pages.modifyDashboardJS);

            var selectedDashboard = lv_dashboards.winControl._selection.getItems()._value[0].data;
            RightMenu.showRightMenu(Pages.dashboardMenus, selectedDashboard);
        }
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: updateDashboardTile
    -- Description: update dashboard tile after modification
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function updateDashboardTile(dashboard) {
        try {
            //modify list dashboards
            DashboardsHelper.modifyListDashboards(dashboard);

            //update listDashboardsBinding
            listDashboardsBinding.getItemFromKey(lv_dashboards.winControl._selection.getItems()._value[0].key).data.group = DashboardsHelper.getHeaderProperties(dashboard.id, dashboard.title);
            listDashboardsBinding.getItemFromKey(lv_dashboards.winControl._selection.getItems()._value[0].key).data.description = CDHelper.capitaliseFirstLetter(dashboard.description);

            //update lv_dashboards
            lv_dashboards.winControl.itemDataSource.change(lv_dashboards.winControl._selection.getItems()._value[0].key, lv_dashboards.winControl._selection.getItems()._value[0].data);
            lv_dashboards.winControl.groupDataSource.itemFromKey(lv_dashboards.winControl._selection.getItems()._value[0].groupKey)._value.data.label = dashboard.title;

            //update group title UI
            var selectionTarget = document.querySelector("div [dataSrc='" + lv_dashboards.winControl._selection.getItems()._value[0].groupKey + "']");
            selectionTarget.innerText = dashboard.title;

            lv_dashboards.winControl.selection.clear();
        }
        catch (ex) { }
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _warningRemoveDashboard
    -- Description: display warning popup to confirm delete
    -- Return: none
    -------------------------------------------------------*/
    function _warningRemoveDashboard() {
        //hide top app bar
        topAppBar.winControl.hide();
        //preserve bottom app bar shown
        div_dashboards_bottomAppBar.winControl.sticky = true;
        //show popup
        Popup.showYesNoPopup(cmdDelete, MessagesHelper.MSG_REMOVE_DASHBOARD_TITLE, MessagesHelper.MSG_REMOVE_DASHBOARD_TEXT,
            MessagesHelper.buttonsLabel.delete,
            function () {
                _removeDashboard();
                div_dashboards_bottomAppBar.winControl.sticky = false;
                div_dashboards_bottomAppBar.winControl.hide();
            },
            MessagesHelper.buttonsLabel.cancel,
            function () {
                div_dashboards_bottomAppBar.winControl.sticky = false;
            },
            CDHelper.position.right);
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _removeDashboard
    -- Description: removes selected dashboard from DB
    -- Params: none
    -- Return: none
    -------------------------------------------------------*/
    function _removeDashboard() {
        var dashboardsKeys = _getSelectedDashboardsKeys();
        var dashboardsIds = _getSelectedDashboardsIds();
        var _succeedHandler = function () {
            _removeDashboardSucceed(dashboardsKeys);
        };

        if (dashboardsIds.length > 0) {
            //join promise remove keys for mutli remove if needed
            CDHelper.showHideLoading(true);
            DashboardsServices.removeDashboard(dashboardsIds[0], _succeedHandler, _removeDashboardFailed);
        }
    }


    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _getSelectedDashboardsKeys
    -- Description: collects selected dashboards Keys
    -- Params: none
    -- Return: dashboardsKeys = array of selected dashboards keys
    -------------------------------------------------------*/
    function _getSelectedDashboardsKeys() {
        var dashboardsKeys = [];
        var nbSelectedDashboards = lv_dashboards.winControl.selection.count();
        for (var dashboardIterator = 0; dashboardIterator < nbSelectedDashboards; dashboardIterator++) {
            var currentItemData = lv_dashboards.winControl.selection.getItems()._value[dashboardIterator].data;
            if (currentItemData.type == DashboardsHelper.WidgetType.DASHBOARD) {
                dashboardsKeys.push(currentItemData.group.key);
            }
        }

        return dashboardsKeys;
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _getSelectedDashboardsIds
    -- Description: collects selected dashboards Ids
    -- Params: none
    -- Return: dashboardsKeys = array of selected dashboards Ids
    -------------------------------------------------------*/
    function _getSelectedDashboardsIds() {
        var dashboardIds = [];
        var nbSelectedDashboards = lv_dashboards.winControl.selection.count();
        for (var dashboardIterator = 0; dashboardIterator < nbSelectedDashboards; dashboardIterator++) {
            var currentItemData = lv_dashboards.winControl.selection.getItems()._value[dashboardIterator].data;
            if (currentItemData.type == DashboardsHelper.WidgetType.DASHBOARD) {
                dashboardIds.push(currentItemData.id);
            }
        }

        return dashboardIds;
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _removeGroupItems
    -- Description: 
            removes all items related to the deleted Group
            from UI
    -- Params: groupKey = the key of the deleted group
    -- Return: none
    -------------------------------------------------------*/
    function _removeGroupItems(groupKey) {
        var dataSource = lv_dashboards.winControl.itemDataSource;
        var dataSourceLength = dataSource.getCount()._value;
        for (var dashboardIterator = 0; dashboardIterator < dataSourceLength; dashboardIterator++) {
            var currentItem = dataSource.itemFromIndex(dashboardIterator)._value;
            if (currentItem && currentItem.groupKey == groupKey) {
                dataSource.remove(currentItem.key);
                dashboardIterator--;
            }
        }
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _removeDashboardSucceed
    -- Description: 
            * succeed callback for remove dashboard
            * removes selected dashboard from UI
    -- Params: none
    -- Return: none
    -------------------------------------------------------*/
    function _removeDashboardSucceed(keysToRemove) {
        //successfully deleted from DB 
        //remove dashboard from UI
        //add loop for mutli remove if needed
        CDHelper.showHideLoading(false);
        _removeGroupItems(keysToRemove[0]);
    }

    /* ------------------------------------------------------
    -- Author: HK
    -- Name: _removeDashboardFailed
    -- Description: 
            * failed callback for remove dashboard
            * shows error message 
    -- Params: none
    -- Return: none
    -------------------------------------------------------*/
    function _removeDashboardFailed(error) {
        //show message
        CDHelper.showHideLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /* ------------------------------------------------------
     -- Author: [A.A]
     -- Name: onResize
     -- Description: refresh page on resizing
     -- Params:
     -- Return:
     ------------------------------------------------------*/
    function onResize(e) {
        if ((Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped))
            RightMenu.showHideRightMenu(false);
        _renderLvDashboards();
        div_dashboards_bottomAppBar.winControl.sticky = false;
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _showModifyGroupPopup
    -- Description: show popup modify group
    -- Params: no one
    -- Return:  no one
    ------------------------------------------------------*/
    function _showModifyGroupPopup() {
        var item = lv_dashboards.winControl._selection.getItems()._value[0];
        //todo
        Popup.showAddPopup(cmdModify, DashboardsHelper.LBL_MODIFY_GROUP_POPUP, MessagesHelper.buttonsLabel.apply, _btnApplyCallback, MessagesHelper.MODIFY_GROUP_ERROR, 'left', item.data.title);
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _btnApplyCallback
-- Description: callback click in button apply && and call service
-- Params: name group
-- Return:  no one
------------------------------------------------------*/
    function _btnApplyCallback(nameGroup) {
        var item = lv_dashboards.winControl._selection.getItems()._value[0];
        var idDashboard = item.data.group.key;
        var idGroup = item.data.id;
        CDHelper.showHideLoading(true);
        DashboardsServices.updateDashboardGroup(nameGroup, idDashboard, idGroup, _updateDashboardSucceed(nameGroup), _updateDashboardFailed);
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
     -- Name: _updateDashboardSucceed
    -- Description: callback update dashboard group succed && update ui dashboard
    -- Params: title group
    -- Return: No one
    ------------------------------------------------------*/
    function _updateDashboardSucceed(title) {
        CDHelper.showHideLoading(false);
        var item = lv_dashboards.winControl._selection.getItems()._value[0].data;
        item.title = title;
        var key = lv_dashboards.winControl.selection.getItems()._value[0].key;
        lv_dashboards.winControl.itemDataSource.change(key, item);
        lv_dashboards.winControl.selection.clear();
        div_dashboards_bottomAppBar.winControl.hide();
        DashboardsHelper.modifyGroupListDashboards(item.group.key, item.id, title);
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _updateDashboardFailed
    -- Description: callback update dashboard group failed
    -- Params: Error
    -- Return: No one
    ------------------------------------------------------*/
    function _updateDashboardFailed(error) {
        CDHelper.showHideLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _modifyItem
    -- Description: show modify menu
    -- Params: no one
    -- Return:  no one
    ------------------------------------------------------*/
    function _modifyItem() {
        if (lv_dashboards.winControl._selection.getItems()._value[0].data.type == DashboardsHelper.WidgetType.DASHBOARD)
            _showModifyDashboardMenu();
        else
            _showModifyGroupPopup();
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _deleteItem
    -- Description: delete dashboard or group
    -- Params: no one
    -- Return:  no one
    ------------------------------------------------------*/
    function _deleteItems() {
        var selectedItem = lv_dashboards.winControl._selection.getItems()._value[0].data;
        if (selectedItem.type == DashboardsHelper.WidgetType.GROUP) {
            _warningRemoveGroup(selectedItem);
        }
        else {
            _warningRemoveDashboard();
        }

    }
    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _removeGroup
    -- Description: launch service delete group
    -- Params: selected item
    -- Return:  no one
    ------------------------------------------------------*/
    function _removeGroup(selectedItem) {
        var idDashboard = selectedItem.group.key;
        var idGroup = selectedItem.id;
        CDHelper.showHideLoading(true);
        DashboardsServices.deleteDashboardGroup(idDashboard, idGroup, _deleteGroupSucceed, _deleteGroupFailed);
    }

    /* ------------------------------------------------------
   -- Author: [M.C]
   -- Name: _removeGroup
   -- Description: launch service delete group
   -- Params: selected item
   -- Return:  no one
   ------------------------------------------------------*/
    function _warningRemoveGroup(selectedItem) {
        //hide top app bar
        topAppBar.winControl.hide();
        //preserve bottom app bar shown
        div_dashboards_bottomAppBar.winControl.sticky = true;
        //show popup
        Popup.showYesNoPopup(cmdDelete, MessagesHelper.MSG_REMOVE_GROUP_TITLE, MessagesHelper.MSG_REMOVE_ALL_TILES_TEXT,
            MessagesHelper.buttonsLabel.delete,
            function () {
                _removeGroup(selectedItem);
                div_dashboards_bottomAppBar.winControl.sticky = false;
                div_dashboards_bottomAppBar.winControl.hide();
            },
            MessagesHelper.buttonsLabel.cancel,
            function () {
                div_dashboards_bottomAppBar.winControl.sticky = false;
            },
            CDHelper.position.right);
    }


    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _deleteGroupSucceed
    -- Description: callback delete dashboard group succed && update ui dashboard
    -- Params: No one
    -- Return: No one
    ------------------------------------------------------*/
    function _deleteGroupSucceed() {
        CDHelper.showHideLoading(false);
        var selectedItem = lv_dashboards.winControl._selection.getItems()._value[0];
        DashboardsHelper.removeGroupFromListDashboards(selectedItem.data.group.key, selectedItem.data.id);
        lv_dashboards.winControl.itemDataSource.remove(selectedItem.key);
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _deleteGroupFailed
    -- Description: callback delete dashboard group failed
    -- Params: Error
    -- Return: No one
    ------------------------------------------------------*/
    function _deleteGroupFailed(error) {
        CDHelper.showHideLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);

    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: _lvSelectionChanged
    -- Description: Manages the controls of bottom bar after the selection of an item 
    -- Params: L'event of selection
    -- Return: No one
    -------------------------------------------------------*/
    function _lvSelectionChanged(e) {
        var count = lv_dashboards.winControl.selection.count();
        topAppBar.winControl.hide();

        // Keep the app bar open after it's shown.
        //div_dashboards_bottomAppBar.winControl.sticky = true;
        if (count > 1) {
            div_dashboards_bottomAppBar.winControl.showCommands("cmdDelete");
            div_dashboards_bottomAppBar.winControl.hideCommands("cmdNewDashboard");
            div_dashboards_bottomAppBar.winControl.hideCommands("cmdModify");
            div_dashboards_bottomAppBar.winControl.show();
            div_dashboards_bottomAppBar.winControl.sticky = true;
        }
        else if (count == 1) {
            div_dashboards_bottomAppBar.winControl.showCommands("cmdDelete");
            div_dashboards_bottomAppBar.winControl.hideCommands("cmdNewDashboard");
            div_dashboards_bottomAppBar.winControl.showCommands("cmdModify");
            div_dashboards_bottomAppBar.winControl.show();
            div_dashboards_bottomAppBar.winControl.sticky = true;
        }
        else {
            div_dashboards_bottomAppBar.winControl.hideCommands("cmdDelete");
            div_dashboards_bottomAppBar.winControl.showCommands("cmdNewDashboard");
            div_dashboards_bottomAppBar.winControl.hideCommands("cmdModify");
            div_dashboards_bottomAppBar.winControl.hide();
            div_dashboards_bottomAppBar.winControl.sticky = false;
        }
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _updateMarginLeftListViewDashboards
-- Description: fix margin left for dashboards list view
-- Params: Boolean
-- Return: No one
-------------------------------------------------------*/
    function _updateMarginLeftListViewDashboards(isEmpty) {
        if (lv_dashboards.querySelector('.win-surface'))
            lv_dashboards.querySelector('.win-surface').style.marginLeft = (isEmpty) ? "0%" : "4%";
    }

    WinJS.Namespace.define("Dashboards", {
        onResize: onResize,
        insertNewDashboard: insertNewDashboard,
        updateDashboardTile: updateDashboardTile
    });

})();




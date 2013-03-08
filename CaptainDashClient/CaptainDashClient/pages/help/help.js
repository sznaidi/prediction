/*-------------------------------
-- Author : [S.H]
-- Creation date : 08/01/2013
------------------------------*/
(function () {
    "use strict";
    var _currentItemInvoked;
    var _indexPreviousPage;
    var _currentMenu;

    WinJS.UI.Pages.define(Pages.help,
       {
           ready: function (elements, previousPage) {
               WinJS.Resources.processAll();
               CDHelper.showHideLoading(true);
               RightMenu.showHideRightMenu(false);
               _indexPreviousPage = previousPage;
               cmdRate.onclick = Pages.goToRatePage;
               onResize();
               topAppBarInIntro.winControl.hide();
               _currentMenu =  HelpUtil.activeMenu.principal;

               document.querySelector('.win-backbutton ').onclick = _manageHelpBackButton;

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
        cmdRate.winControl.label = WinJS.Resources.getString("bottomAppBar_rate").value;
    }


       /* ------------------------------------------------------
   -- Author: [M.C]
   -- Name: _manageHelpBackButton
   -- Description: after click in back button in snap view mode,if we are in description menu we return to principal menu else navigate to last page
   -- Params: No one
   -- Return: No one
   -------------------------------------------------------*/
    function _manageHelpBackButton() {
        if ((Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped) && (_currentMenu == HelpUtil.activeMenu.description)) {
            containerDescriptionsHelp.style.display = 'none';
            contentContainerItems.style.display = '-ms-grid';
            _currentMenu = HelpUtil.activeMenu.principal;
        }
        else {
            WinJS.Navigation.back();
        }
    }
    function _listViewStateChanged() {
        if (lv_help.winControl.loadingState == "complete") {
            var listItems = HelpUtil.getListCollections();
            var item = { index: _indexPreviousPage, data: listItems[_indexPreviousPage] };
            _currentItemInvoked = item;
            _updatePageView();
            CDHelper.showHideLoading(false);
        }
    }

   /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: _bindListItems
   -- Description: binding of list view. 
   -- Params: No one
   -- Return: No one
   -------------------------------------------------------*/
    function _bindListItems(currentTemlplate) {
        var listItems = HelpUtil.getListCollections();
        WinJS.UI.setOptions(lv_help.winControl, {
            itemDataSource: new WinJS.Binding.List(listItems).dataSource,
            itemTemplate: currentTemlplate,
            layout: new WinJS.UI.ListLayout(),
            selectionMode: 'none',
            oniteminvoked: lvItemInvoked,
            onloadingstatechanged: _listViewStateChanged,
        });
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: lvItemInvoked
    -- Description: show description page on intem invoked
    -- Params: L'event
    -- Return: No one
    -------------------------------------------------------*/
    function lvItemInvoked(e) {
        containerDescriptionsHelp.scrollTop = 0;
      //  window.scrollTo(0);
        var selectedItemProperties;
        var _currentIndex;
        e.detail.itemPromise.done(function (item) {
            _currentItemInvoked = item;
            _indexPreviousPage = _currentItemInvoked.index;
            _updatePageView();
            _showDetailsPages();
        })
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _showDetailsPages
-- Description: show details page
-- Params: No one
-- Return: No one
-------------------------------------------------------*/
    function _showDetailsPages() {
        if (Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped) {
            contentContainerItems.style.display = 'none';
            containerDescriptionsHelp.style.display = '-ms-grid';
            _currentMenu = HelpUtil.activeMenu.description;
        }
        else {
            contentContainerItems.style.display = '-ms-grid';
        }
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _updatePageView
    -- Description: update the content of page(description and color of selected item (In normal and snap view))
    -- Params: No one
    -- Return: No one
     -------------------------------------------------------*/
    function _updatePageView() {
        if (Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped) {
                _updateContent(".helpSnapItem");
        }
        else {
            _updateContent(".helpItem");
        }             
    }

    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: _updateContent
   -- Description: update item color and update description
   -- Params: class, index
   -- Return: No one
    -------------------------------------------------------*/
    function _updateContent(itemsClass) {
        var listItems = lv_help.querySelectorAll(itemsClass);   
        if (lv_help.winControl.loadingState == "complete") {
            // update item color
            _deselectItems(listItems, itemsClass);
            //update description
            _showCurrentDescription();
        }
        else
            if (_currentItemInvoked && lv_help.winControl.elementFromIndex(_currentItemInvoked.index).querySelector(itemsClass))
                lv_help.winControl.elementFromIndex(_currentItemInvoked.index).querySelector(itemsClass).style.backgroundColor = "#ebc24b";
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _deselectItems
    -- Description: clear selection of all items
    -- Params: list items
    -- Return: No one
    -------------------------------------------------------*/
    function _deselectItems(listElements, itemsClass) {
        var currentIndex;
        if (_currentItemInvoked) {
            currentIndex = _currentItemInvoked.index;
            //deselect all items
            for (var i = 0; i < listElements.length; i++) {
                listElements[i].style.backgroundColor = "#f1eedc";
            }
            //highlighth selected item
            lv_help.winControl.elementFromIndex(currentIndex).querySelector(itemsClass).style.backgroundColor = "#ebc24b";
        }
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _showCurrentDescription
    -- Description: update description
    -- Params: properties of the selected item
    -- Return: No one
    -------------------------------------------------------*/
    function _showCurrentDescription() {
        var itemProperties;
        if (_currentItemInvoked) {
            itemProperties = _currentItemInvoked.data;
            titleDescription.innerHTML = itemProperties.title;
            subTitleDescription.innerHTML = itemProperties.descTitle;
            //hide all descriptions
            _hideAllDescriptions();
            //show description relative to selected page
            switch (itemProperties.type) {
                case HelpUtil.ItemType.About:
                    div_help_about.style.display = "block";
                    break;
                case HelpUtil.ItemType.Cockpit:

                    div_help_cockpit.style.display = "block";
                    break;
                case HelpUtil.ItemType.DataExplorer:

                    div_help_dataExplorer.style.display = "block";
                    break;
                case HelpUtil.ItemType.DataSources:

                    div_help_dataSources.style.display = "block";
                    break;
            }
        }   
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _hideAllDescriptions
    -- Description: hide all descriptions pages
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _hideAllDescriptions() {
        div_help_about.style.display = "none";
        div_help_cockpit.style.display = "none";
        div_help_dataExplorer.style.display = "none";
        div_help_dataSources.style.display = "none";
    }

    /* ------------------------------------------------------
   -- Author: [S.H]
   -- Name: onResize
   -- Description: handle the event of resize between normal and snap view
   -- Params: No one
   -- Return: No one
   -------------------------------------------------------*/
    function onResize() {
        var currentTemlplate;
        if (Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped) {
            currentTemlplate = template_helpItem_SV;
            // In snap view: hide Description page 
            CDHelper.displayHideDiv(containerDescriptionsHelp, false);
        }
        else {
            containerDescriptionsHelp.style.display = '-ms-grid';
            contentContainerItems.style.display = '-ms-grid';
            currentTemlplate = template_helpItem;
            //In full view: show list of items  and description page 
            CDHelper.displayHideDiv(containerItemsHelp, true);
            CDHelper.displayHideDiv(containerDescriptionsHelp, true);
        }
        // list view set options
        _bindListItems(currentTemlplate);
   }


    WinJS.Namespace.define("Help", {
        onResize: onResize
    });

})();
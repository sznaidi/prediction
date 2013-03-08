(function () {
    "use strict";

    var ui = WinJS.UI;
    var _currentFilter = SearchHelper.filters.none;

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;

    ui.Pages.define(Pages.search,
        {
            ready: function (elements, options) {
                WinJS.Resources.processAll();
                CDHelper.showHideLoading(true);
                // set search query if not set
                SearchController.searchQuery = (options && options.searchQuery) ? options.searchQuery : SearchController.searchQuery;
                // Update header with the search query
                if (div_searchQuery && (SearchController.searchQuery && CDHelper.trim(SearchController.searchQuery).length != 0)) {
                    // Set header filter click
                    pageSearch._initializeFilterEvent();

                    // Get items & Initialize lists 
                    var _getDashboardPromiseSucceed = function (promiseResult) {
                        pageSearch._updateUIByItemsCount();
                    };

                    var _getDashboardPromiseFailed = function (promiseResult) {
                        CDHelper.showHideLoading(false);
                        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
                    }

                    SearchController.launchSearch(_getDashboardPromiseSucceed, _getDashboardPromiseFailed);
                }
                    // Show message box if no search was entred
                else if (SearchController.searchQuery || CDHelper.trim(SearchController.searchQuery).length == 0) {
                    CDHelper.showHideLoading(false);
                    Messages.showOkMessage(MessagesHelper.EMPTY_SEARCH_TITLE, MessagesHelper.EMPTY_SEARCH);
                }
            },

            unload: function () {
                SearchController.searchQuery = null;
            },

            // Define filter click event
            _initializeFilterEvent: function () {
                lbl_searchPage_widgetsFilter.addEventListener("click", function () { pageSearch._filterClick(SearchHelper.filters.widgets); });
                lbl_searchPage_sourcesFilter.addEventListener("click", function () { pageSearch._filterClick(SearchHelper.filters.sources); });
            },

            _filterClick: function (filter) {
                _currentFilter = filter;
                pageSearch._updateUIByFilter();
            },
            
            _updateUIByItemsCount: function () {
                // hide/diplay filters switch theirs items count
                // set filters' items' count in UI
                if (SearchController.listConnectors.length > 0) {
                    var sourceHeader = lbl_searchPage_sourcesFilter.dataSrc + " (" + SearchController.listConnectors.length + ")";
                    lbl_searchPage_sourcesFilter.innerText = sourceHeader;
                    _currentFilter = SearchHelper.filters.sources;
                }
                else {
                    //hide source filter & translate widgets filter
                    lbl_searchPage_sourcesFilter.style.display = "none";
                    lbl_searchPage_widgetsFilter.style.msGridColumn = "1";
                    //set current filter
                    _currentFilter = SearchHelper.filters.widgets;
                }

                if (SearchController.listWidgets.length > 0) {
                    //update header
                    var sourceHeader = lbl_searchPage_widgetsFilter.dataSrc + " (" + SearchController.listWidgets.length + ")";
                    lbl_searchPage_widgetsFilter.innerText = sourceHeader;
                }
                else {
                    //hide filter
                    lbl_searchPage_widgetsFilter.style.display = "none";
                    if (_currentFilter == SearchHelper.filters.widgets) {
                        _currentFilter = SearchHelper.filters.none;
                    }
                }

                if (_currentFilter == SearchHelper.filters.none) {
                    //no results
                    CDHelper.showHideLoading(false);
                    div_searchQuery.innerText = SearchHelper.getResultsHeader(false);
                }
                else {
                    //activated the correct header & show view
                    div_searchQuery.innerText = SearchHelper.getResultsHeader(true);
                    pageSearch._updateUIByFilter();
                }
            },

            _updateUIByFilter: function () {
                //deactivate all link
                lbl_searchPage_sourcesFilter.style.color = SearchHelper.filterStatusColor.disabled;
                lbl_searchPage_widgetsFilter.style.color = SearchHelper.filterStatusColor.disabled;

                //activate desired link
                eval('lbl_searchPage_' + _currentFilter + 'Filter.style.color = SearchHelper.filterStatusColor.enabled;');

                //fill listview with desired filter
                pageSearch._updateUI();
            },
                        
            _renderItems: function (itemPromise) {
                return itemPromise.then(function (item) {
                    var container = document.createElement("div");
                    switch (_currentFilter) {
                        case SearchHelper.filters.widgets:
                            container = Cockpits.renderWidget(itemPromise);
                            break;
                        case SearchHelper.filters.sources:
                            if (Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped) {
                                var currentItemTemplate = template_connectorModel_SV;
                            }
                            else {
                                var currentItemTemplate = template_connectorTile;
                            }
                            currentItemTemplate.winControl.render(item.data, container);
                            break;
                        default:
                            break;
                    }

                    return container;
                });
            },

            _itemInvoked_lvSearch: function (e) {
                CDHelper.requireScriptJS(Scripts.dataExplorerHelperJS);
                switch (_currentFilter) {
                    case SearchHelper.filters.widgets:
                        Cockpits.lvCockpitsItemInvoked(e);
                        break;
                    case SearchHelper.filters.sources:
                           
                        break;
                    default:
                        break;
                }
            },

            _updateUI: function () {
                CDHelper.showHideLoading(false);
                var itemDataSource = SearchHelper.getItemDatasourceByFilter(_currentFilter);

                if (appView.value === appViewState.snapped) {
                    var backButton = searchPage.querySelector(".win-backbutton");
                    if (backButton.disabled) {
                        div_search_topPage_label.style.msGridColumn = "2";
                        div_searchQuery.style.marginLeft = "60px";
                    }
                    else {
                        div_searchQuery.style.marginLeft = "97px";
                    }
                    var currentLayout = new WinJS.UI.ListLayout({ backdropColor: "transparent" });
                }
                else {
                    //update listview dimension to fit items
                    //get group info :)
                    div_search_topPage_label.style.msGridColumn = "3";
                    div_searchQuery.style.marginLeft = "calc(8.6% + 204px)";

                    var currentLayout = new WinJS.UI.GridLayout({
                        groupInfo: SearchHelper.getListViewGroupInfo(_currentFilter),
                        backdropColor: "transparent",
                    })
                }

                ui.setOptions(div_lv_sources.winControl, {
                    itemTemplate: pageSearch._renderItems,
                    itemDataSource: itemDataSource.dataSource,
                    oniteminvoked: pageSearch._itemInvoked_lvSearch,
                    layout: currentLayout,
                    selectionMode: 'none',
                    automaticallyLoadPages: true,
                    pagesToLoad: 50,
                    pagesToLoadThreshold: 3000
                });
            },

            onResize: function (e) {
                CDHelper.showHideLoading(true);
                pageSearch._updateUI();
            }
        });

    var pageSearch = WinJS.UI.Pages.get(Pages.search).prototype;

    WinJS.Namespace.define("Search", {
        onResize: pageSearch.onResize,
    })
})();
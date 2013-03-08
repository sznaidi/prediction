/*-------------------------------
-- Author : [A.A]
-- Creation date : 17/12/2012
------------------------------*/

(function () {
    "use strict";

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {

            switch (WinJS.Navigation.location) {
                case Pages.dataSources:
                    {
                        RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].category, false);
                        break;
                    }
                case Pages.cockpits:
                    {
                        RightMenu.setHeader(CockpitHelper.CockpitsMenusTitles.addTile, CockpitHelper.CockpitsMenusSubTitles[CockpitHelper.CockpitsMenusTitles.addTile].source, true);
                        btn_rightMenu_back.onclick = function () { RightMenu.showRightMenu(Pages.typeTileStep, null); };
                        break;
                    }
                default: break;
            }
            
            _bindDataTypeConnector();
        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _bindDataTypeConnector
    -- Description: Binding list connectors
    -- Params: None
    -- Return: None
    ------------------------------------------------------*/
    function _bindDataTypeConnector() {
        WinJS.UI.setOptions(lvTypeConnector.winControl, {
            itemDataSource: new WinJS.Binding.List(DataSourcesHelper.listConnectorsType).dataSource,
            oniteminvoked: _lvTypeConnectorItemInvoked
        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _lvTypeConnectorItemInvoked
    -- Description: click on list connectors
    -- Params: Evt click
    -- Return: No one
    ------------------------------------------------------*/
    function _lvTypeConnectorItemInvoked(e) {
        var typeConnector = DataSourcesHelper.listConnectorsType[e.detail.itemIndex].type;
        switch (WinJS.Navigation.location) {
            case Pages.dataSources:
                {
                    ConnectorsMenuFactory.showConnectorMenu(typeConnector);
                    break;
                }
            case Pages.cockpits:
                {
                    var listDoneConnectors = DataSourcesHelper.getDoneConnectors(typeConnector);
                    if (listDoneConnectors.length > 0)
                        RightMenu.showRightMenu(Pages.connectorsStep, listDoneConnectors);
                    else
                        Messages.showCancelMessage('Title', 'Message');
                    break;
                }
            default: break;
        }
    }

    WinJS.UI.Pages.define(Pages.connectorsTypeMenu, {
        ready: ready,
    });

})();
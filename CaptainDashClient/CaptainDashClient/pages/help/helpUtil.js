/*-------------------------------
-- Author : [S.H]
-- Creation date : 09/01/2013
------------------------------*/

(function () {
    "use strict";

    var aboutTheCaptain = WinJS.Resources.getString("HelpUtil_aboutTheCaptain").value;
    var about = WinJS.Resources.getString("HelpUtil_about").value;
    var dashboards = WinJS.Resources.getString("HelpUtil_dashboards").value;
    var explorer = WinJS.Resources.getString("HelpUtil_explorer").value;
    var sources = WinJS.Resources.getString("HelpUtil_sources").value;
    var aboutTheCaptainTitle = WinJS.Resources.getString("HelpUtil_aboutTheCaptainTitle").value;
    var dashboardsTitle = WinJS.Resources.getString("HelpUtil_dashboardsTitle").value;
    var explorerTitle = WinJS.Resources.getString("HelpUtil_explorerTitle").value;
    var sourcesTitle = WinJS.Resources.getString("HelpUtil_sourcesTitle").value;
    var aboutTheCaptainDescription = WinJS.Resources.getString("HelpUtil_aboutTheCaptainDescription").value;
    var dashboardsDescription = WinJS.Resources.getString("HelpUtil_dashboardsDescription").value;
    var explorerDescription = WinJS.Resources.getString("HelpUtil_explorerDescription").value;
    var sourcesDescription = WinJS.Resources.getString("HelpUtil_sourcesDescription").value;

    var ItemType = {
        'About': about,
        'Cockpit': dashboards,
        'DataExplorer': explorer,
        'DataSources': sources
    }

    var _previousPageIndex = {
        About: 0,
        Dashboards: 1,
        DataExplorer: 2,
        DataSources: 3
    }

    var _activeMenu = {'principal' : 0 ,'description' : 1};

    function getListCollections()
    {
        var listItems = [];
        listItems.push({ title: aboutTheCaptain, descTitle: aboutTheCaptainTitle, desc: aboutTheCaptainDescription, tooltip: "url('pages/help/images/aboutHelp.png')", tooltipSnap: "url('pages/help/images/aboutHelpSnap.png')", type: ItemType.About, background: "#f1eedc" });
        listItems.push({ title: dashboards, descTitle: dashboardsTitle, desc: dashboardsDescription, tooltip: "url('pages/help/images/cockpit.png')", tooltipSnap: "url('pages/help/images/cockpitsnap.png')", type: ItemType.Cockpit, background: "#f1eedc" });
        listItems.push({ title: explorer, descTitle: explorerTitle, desc: explorerDescription, tooltip: "url('pages/help/images/explorer.png')", tooltipSnap: "url('pages/help/images/explorerSnap.png')", type: ItemType.DataExplorer, background: "#f1eedc" });
        listItems.push({ title: sources, descTitle: sourcesTitle, desc: sourcesDescription, tooltip: "url('pages/help/images/sources.png')", tooltipSnap: "url('pages/help/images/sourcesSnap.png')", type: ItemType.DataSources, background: "#f1eedc" });
        return listItems;
    }

    function goToHelpPage(previousPageIndex) {
        if (WinJS.Navigation.location != Pages.help) {
            WinJS.Navigation.navigate(Pages.help, previousPageIndex);
            topAppBar.winControl.hide();
        }
    }

    WinJS.Namespace.define("HelpUtil", {
        ItemType: { get: function () { return ItemType; } },
        getListCollections: getListCollections,
        PreviousPageIndex: { get: function () { return _previousPageIndex; } },
        goToHelpPage: goToHelpPage,
        activeMenu: { get: function () { return _activeMenu; } },
    });


})();

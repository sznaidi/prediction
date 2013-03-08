//[A.A] creation date : 17/12/2012

(function () {
    "use strict";
    WinJS.Namespace.define("Pages", {
        dataSources: '/pages/dataSources/dataSources.html',
        help: '/pages/help/help.html',
        connectorsTypeMenu: '/pages/dataSources/connectorsMenus/connectorsTypeMenu.html',

        addTwMenuAccountStep: "pages/dataSources/connectorsMenus/addTwMenu/accountStep/accountStep.html",
        addTwMenuSourceNameStep: "pages/dataSources/connectorsMenus/addTwMenu/sourceNameStep/sourceNameStep.html",
        addTwMenuConnectorTypeStep: "pages/dataSources/connectorsMenus/addTwMenu/connectorTypeStep/connectorsTypeStep.html",
        addTwMenuSearchResultStep: "pages/dataSources/connectorsMenus/addTwMenu/searchResultStep/searchResultStep.html",

        fbConnectorsTypeStep: "pages/dataSources/connectorsMenus/addFbMenu/connectorsTypeStep/connectorsTypeStep.html",
        fbSearchStep: "pages/dataSources/connectorsMenus/addFbMenu/searchStep/searchStep.html",
        fbSearchResultStep: "pages/dataSources/connectorsMenus/addFbMenu/searchResultStep/searchResultStep.html",
        fbSourceNameStep: "pages/dataSources/connectorsMenus/addFbMenu/sourceNameStep/sourceNameStep.html",

        addFsMenuVenueTypeStep: "pages/dataSources/connectorsMenus/addFsMenu/venueTypeStep/venueTypeStep.html",
        addFsMenuSourceNameStep: "pages/dataSources/connectorsMenus/addFsMenu/sourceNameStep/sourceNameStep.html",
        addFsMenuSearchStep: "pages/dataSources/connectorsMenus/addFsMenu/searchStep/searchStep.html",
        addFsMenuSearchResultStep: "pages/dataSources/connectorsMenus/addFsMenu/searchResultStep/searchResultStep.html",
        credentialsMenu: "pages/DataSources/connectorsMenus/credentialsMenu/credentialsMenu.html",

        addAtMenu: "pages/dataSources/connectorsMenus/addAtMenu/addAtMenu.html",
        addAtMenuAccount: "pages/dataSources/connectorsMenus/addAtMenu/atAccountPage/atAccountPage.html",
        addAtMenuAgency: "pages/dataSources/connectorsMenus/addAtMenu/atAgencyPage/atAgencyPage.html",
        addAtMenuClient: "pages/dataSources/connectorsMenus/addAtMenu/atClientPage/atClientPage.html",
        addAtMenuSourceName: "pages/dataSources/connectorsMenus/addAtMenu/atSourceNamePage/atSourceNamePage.html",

        addGaMenuAccount: "pages/dataSources/connectorsMenus/addGaMenu/gaAccountPage/gaAccountPage.html",
        addGaMenuWebProperties: "pages/dataSources/connectorsMenus/addGaMenu/gaWebPropertiesPage/gaWebPropertiesPage.html",
        addGaMenuProfile: "pages/dataSources/connectorsMenus/addGaMenu/gaProfilePage/gaProfilePage.html",
        addGaMenuSourceName: "pages/dataSources/connectorsMenus/addGaMenu/gaSourceNamePage/gaSourceNamePage.html",

        addSourceNameStep: "pages/dataSources/connectorsMenus/sourceNameStep/sourceNameStep.html",

        login: "/pages/login/login.html",
        forgetPassword: "pages/login/forgetPasswordPage/forgetPasswordPage.html",
        intro: "pages/login/introPage/introPage.html",
        signIn: "pages/login/signIn/signIn.html",

        registerPage: "pages/login/registerPage/registerPage.html",
        messages: "/js/messages/messages.html",
        popup: "/js/popup/popup.html",

        dashboards: '/pages/dashboards/dashboards.html',
        dashboardMenus: '/pages/dashboards/dashboardMenus/dashboardMenu.html',
        addDashboardJS: '/pages/dashboards/dashboardMenus/addDashboardMenu/addDashboardMenu.js',
        modifyDashboardJS: '/pages/dashboards/dashboardMenus/modifyDashboardMenu/modifyDashboardMenu.js',

        cockpits: '/pages/cockpits/cockpits.html',
        connectorsStep: '/pages/cockpits/cockpitsMenus/addKpiMenu/connectorsStep/connectorsStep.html',
        addKpiMetricsStep: '/pages/cockpits/cockpitsMenus/addKpiMenu/metricsStep/metricsStep.html',
        addKpiResumeStep: '/pages/cockpits/cockpitsMenus/addKpiMenu/resumeStep/resumeStep.html',
        addKpiAdvancedStep: '/pages/cockpits/cockpitsMenus/addKpiMenu/advancedStep/advancedStep.html',
        modifyKpiResumeStep: '/pages/cockpits/cockpitsMenus/modifyKpiMenu/resumeStep/resumeStep.html',
        modifyKpiAdvancedStep: '/pages/cockpits/cockpitsMenus/modifyKpiMenu/advancedStep/advancedStep.html',

        modifyExploration: '/pages/cockpits/cockpitsMenus/modifyExplorationMenu/modifyExplorationMenu.html',

        formatTileStep: '/pages/cockpits/cockpitsMenus/formatTileStep/formatTileStep.html',
        typeTileStep: '/pages/cockpits/cockpitsMenus/typeTileStep/typeTileStep.html',

        dataExplorer: '/pages/dataExplorer/dataExplorer.html',
        addSerieConnectorsTypeStep: '/pages/dataExplorer/dataExplorerMenus/addSerie/connectorsTypeStep/connectorsType.html',
        addSerieConnectorsStep: '/pages/dataExplorer/dataExplorerMenus/addSerie/connectorsStep/connectors.html',
        addSerieMetricsStep: '/pages/dataExplorer/dataExplorerMenus/addSerie/metricsStep/metrics.html',
        addSerieResumeStep: '/pages/dataExplorer/dataExplorerMenus/addSerie/resumeStep/resume.html',
        timeRangeMenu: '/pages/dataExplorer/dataExplorerMenus/timeRange/timeRange.html',
        modifySerieResumeStep: '/pages/dataExplorer/dataExplorerMenus/modifySerie/resumeStep/resume.html',
        modifySerieGraphTypeStep: '/pages/dataExplorer/dataExplorerMenus/modifySerie/graphTypeStep/graphType.html',

        pinToCockpit: '/pages/dataExplorer/dataExplorerMenus/pinToCockpit/pinToCockpit.html',

        search: '/pages/search/search.html',
       
     
        // launches to the captain dash store rate page URI
        // Parameters : No one
        // Return: No one
        goToRatePage: function () {
            try {
                //S.H: missing a parameter (PFN)
                window.open("ms-windows-store:REVIEW?PFN=" + Windows.ApplicationModel.Package.current.id.familyName); 
            }
            catch (ex) {
                //TODO
            }
        },

        /*  ------------------------------------------------------
        -- Author: [S.H]
        -- Name: renderPage
        -- Description: Loads and copies the contents of the specified URI into the specified element.
        -- Params: url page, element
        -- Return: No one
        -------------------------------------------------------*/
        renderPage: function (urlPage, elements, divContent) {
            if (urlPage) {
                WinJS.UI.Fragments.renderCopy(urlPage, null).then(function (frag) {
                    divContent.innerHTML = '';
                    divContent.appendChild(frag);
                    if (divContent == rightMenuContent)
                        RightMenu.showHideRightMenu(true);
                    WinJS.UI.Pages.get(urlPage).prototype.ready(elements);
                });
            }
        }
    });
    
    WinJS.Namespace.define("Scripts", {
        twitter: "/pages/DataSources/connectorsApi/twitterApi.js",
        googleAnalytics: "/pages/DataSources/connectorsApi/googleAnalyticsApi.js",
        foursquare: "/pages/DataSources/connectorsApi/foursquareApi.js",
        atlas: "/pages/DataSources/connectorsApi/atlasApi.js",
        facebook: "/pages/DataSources/connectorsApi/facebookApi.js",
        signIn: "/pages/login/signIn/signIn.js",
        dashboardService: "/pages/dashboards/dashboardsServices/dashboardsServices.js",
        messageHelper: "/js/messages/messagesHelper.js",
        cockpitHelper: "/pages/cockpits/cockpitHelper.js",
        dashboardHelper: "/pages/dashboards/dashboardsHelper.js",
        defaultWidget: "/pages/DataSources/connectorsMenus/defaultWidget/defaultWidget.js",
        searchController: '/pages/Search/searchController.js',
        searchHelper: '/pages/Search/searchHelper.js',
        dataExplorerHelperJS: '/pages/dataExplorer/dataExplorerHelper.js',
        dataExplorerJS: '/pages/dataExplorer/dataExplorer.js',
        legendHelperJS: '/pages/dataExplorer/legend/legendHelper.js',
        legendJS: '/pages/dataExplorer/legend/legend.js',
        gridHelperJS: '/pages/dataExplorer/grid/gridHelper.js',
        gridJS: '/pages/dataExplorer/grid/grid.js',
        dataExplorerController: '/pages/dataExplorer/dataExplorerController.js',
        bugsnag: '/js/bugsnagTemplate.js',
        errorManager: '/js/errorManager.js',
        dataSourcesHelper: "/pages/DataSources/dataSourcesHelper.js",
        dataSources: "/pages/DataSources/dataSources.js",
        credentials: "/pages/DataSources/connectorsCredentials/credentials.js",
        credentialsServices: "/pages/DataSources/connectorsCredentials/credentialsServices.js",
        credentialsTemplate: "/pages/DataSources/connectorsCredentials/credentialsTemplate.js",
        intro: "/pages/login/introPage/introPage.js",
    });
}
)();
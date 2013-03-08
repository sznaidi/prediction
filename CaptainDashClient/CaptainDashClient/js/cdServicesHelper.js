//[HK] creation date : 17/12/2012
(function () {
    "use strict";

    WinJS.Namespace.define("CdServicesHelper", {
        baseUrlServices: "https://integration.capback.fr",
        headers: { "Accept": "application/vnd.captaindash-v1+json", "Content-Type": "application/json"},
        connectorsUrl: "/connectors",
        metricsUrl: "/metrics",
        usersUrl: "/users",
        userSignInUrl: "/users/sign_in",
        userSignOutUrl: "/users/sign_out",
        credentialsUrl: "/credentials",
        dashboardsUrl: "/dashboards",
        cockpitsUrl: "/tiles",
        groupsUrl: "/groups",
        describeUrl: "/describe",
        agenciesUrl: "/atlas/agencies",
        clientsUrl: "/atlas/clients",
        explorationsUrl: "/explorations/select",
        explorationPinnedUrl: "/explorations/pin",
        dynamicTileUrl: "/desktop"
    });
})();
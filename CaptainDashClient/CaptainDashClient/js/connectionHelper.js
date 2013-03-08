/*-------------------------------
-- Author : [A.A]
-- Creation date : 01/02/2013
------------------------------*/

(function () {
    "use strict";

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: hasInternetConnection
    -- Description: test internet connection
    -- Params: None
    -- Return: True if has internet connection, False if not
    ------------------------------------------------------*/
    function hasInternetConnection () {
        try {
            var connectionProfile = Windows.Networking.Connectivity.NetworkInformation.getInternetConnectionProfile();
            if (connectionProfile) {
                if (connectionProfile.getNetworkConnectivityLevel() === 3)
                    return true;
            }
        }
        catch (e) {}

        return false;
    }

    WinJS.Namespace.define("ConnectionHelper",
    {
        hasInternetConnection: hasInternetConnection,
    });

})();
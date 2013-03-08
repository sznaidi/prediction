/*-------------------------------
-- Author : [A.A]
-- Creation date : 25/12/2012
------------------------------*/


(function () {

    var listVenueType = [
           { label: WinJS.Resources.getString("AddFsMenuHelper_private").value, isPublic: false },
           { label: WinJS.Resources.getString("AddFsMenuHelper_public").value, isPublic: true },
    ];

    var fsVenues = function () {
        this.privateVenues = [];
        this.publicVenues = [];
        this.venue = '';
        this.near = '';
    }

WinJS.Namespace.define("AddFsMenuHelper", {
    listVenueType: { get: function () { return listVenueType; } },
    fsVenues: { get: function () { return fsVenues; } }
});

})();
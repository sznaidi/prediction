/*------------------------------
-- Author : [S.H]
-- Creation date : 24/12/2012
------------------------------*/
(function () {

  var fbConnectorsTypes = [
          { label: WinJS.Resources.getString("AddFbMenuHelper_insight").value, isPublic: false },
          { label: WinJS.Resources.getString("AddFbMenuHelper_fanpage").value, isPublic: true },
  ];

  var fbPages = function () {
      this.fanPages;
      this.insightPages;
  }


 WinJS.Namespace.define("AddFbMenuHelper", {
     fbConnectorsTypes: { get: function () { return fbConnectorsTypes; } },
     fbPages: { get: function () { return fbPages; } },
 });


})();

/*-------------------------------
-- Author : [A.A]
-- Creation date : 21/01/2013
------------------------------*/

(function () {
    "use strict";

    var _DASHBOARDS_BASE_URL_SERVICES = CdServicesHelper.baseUrlServices + CdServicesHelper.dashboardsUrl;

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: getAllDashboards
    -- Description: Get all dashboards for the current logged user
    -- Params: succeed = success calback, failed = fail callback
    -- Return: list of dashboards
    -------------------------------------------------------*/
    function getAllDashboards(succeed, failed) {
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Get, _DASHBOARDS_BASE_URL_SERVICES, null, CdServicesHelper.headers, function (result) {
            succeed(JSON.parse(result.response).dashboards);
        },
            failed);
        request.launchService();
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: addDashboard
    -- Description: Saves a dashboard object to db
    -- Params: dashboard = the dashboard object to save, succeed = success calback, failed = fail callback
    -- Return: The new dashboard
    -------------------------------------------------------*/
    function addDashboard(dashboardToSend, succeed, failed) {
        var params = JSON.stringify(dashboardToSend);
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Post, _DASHBOARDS_BASE_URL_SERVICES, params, CdServicesHelper.headers, _succeed, failed);
        request.launchService();
        function _succeed(dashboard) {
            succeed(JSON.parse(dashboard.responseText).dashboard);
        }
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: modifyDashboard
    -- Description: Saves a dashboard object to db
    -- Params: dashboard = the dashboard object to save, succeed = success calback, failed = fail callback
    -- Return: The new dashboard
    -------------------------------------------------------*/
    function updateDashboard(dashboardId, dashboardToSend, succeed, failed) {
        var urlDashboardToUpdate = _DASHBOARDS_BASE_URL_SERVICES + "/" + dashboardId;
        var params = JSON.stringify(dashboardToSend);
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Put, urlDashboardToUpdate, params, CdServicesHelper.headers, succeed, failed);
        request.launchService();
    }

    /*  ------------------------------------------------------
    -- Author: HK
    -- Name: removeDashboard
    -- Description: 
    --      removes dashboard with given id from db
    -- Params: dashboardId = dashboard id to delete, succeed = success calback, failed = fail callback
    -- Return: removed dashboard
    -------------------------------------------------------*/
    function removeDashboard(dashboardId, succeed, failed) {
        var urlDashboardToRemove = _DASHBOARDS_BASE_URL_SERVICES + "/" + dashboardId;
        var params = null;
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Delete, urlDashboardToRemove, params, CdServicesHelper.headers, succeed, failed);
        request.launchService();
    }

    /*  ------------------------------------------------------
  -- Author: [M.C]
  -- Name: updateDashboardGroup
  -- Description: Upadte title of group
  -- Params: groupName :new name of group, idGroup : id of group, idDashboard : id of dashboard, succeed = success calback, failed = fail callback
  -- Return: 
  -------------------------------------------------------*/
    function updateDashboardGroup(groupName, idDashboard, idGroup, succeed, failed) {
        var url = _DASHBOARDS_BASE_URL_SERVICES + "/" + idDashboard + "/groups/" + idGroup;
        groupName = { group: { title: groupName } };
        var params = JSON.stringify(groupName);
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Put, url , params, CdServicesHelper.headers, succeed, failed);
        request.launchService();
    }

    /*  ------------------------------------------------------
  -- Author: [M.C]
  -- Name: deleteDashboardGroup
  -- Description: Deletes a group and tiles included in this group.
  -- Params: idGroup : id of group, idDashboard : id of dashboard, succeed = success calback, failed = fail callback
  -- Return: 
  -------------------------------------------------------*/
    function deleteDashboardGroup(idDashboard, idGroup, succeed, failed) {
        var url = _DASHBOARDS_BASE_URL_SERVICES + "/" + idDashboard + "/groups/" + idGroup;
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Delete, url, null, CdServicesHelper.headers, succeed, failed);
        request.launchService();
    }

    /*  ------------------------------------------------------
 -- Author: [M.C]
 -- Name: getDashboard
 -- Description: Get full dashboard by id
 -- Params: succeed = success calback, failed = fail callback
 -- Return: Full dashboard
 -------------------------------------------------------*/
    function getDashboard(idDashboard, succeed, failed) {
        var url = _DASHBOARDS_BASE_URL_SERVICES + "/" + idDashboard;
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Get, url, null, CdServicesHelper.headers, function (result) {
            succeed(JSON.parse(result.response).dashboard);
        },
            failed);
        request.launchService(); 
    }

    /*  ------------------------------------------------------
    -- Author: [A.A]
    -- Name: add group dashboard
    -- Description: Saves a dashboard object to db
    -- Params: dashboard = the dashboard object to save, succeed = success calback, failed = fail callback
    -- Return: The new dashboard
    -------------------------------------------------------*/
    function addGroupDashboard(dashboardId, groupToSend, succeed, failed) {
        var urlGroupDashboardToAdd = _DASHBOARDS_BASE_URL_SERVICES + "/" + dashboardId + CdServicesHelper.groupsUrl + "/";
        var params = JSON.stringify(groupToSend);
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Post, urlGroupDashboardToAdd, params, CdServicesHelper.headers, _succeed, failed);
        function _succeed(group) {
            succeed(JSON.parse(group.responseText).group);
        }
        request.launchService();
    }

    WinJS.Namespace.define("DashboardsServices", {
        getAllDashboards: getAllDashboards,
        addDashboard: addDashboard,
        removeDashboard: removeDashboard,
        updateDashboard: updateDashboard,
        updateDashboardGroup: updateDashboardGroup,
        deleteDashboardGroup: deleteDashboardGroup,
        getDashboard: getDashboard,
        addGroupDashboard: addGroupDashboard
    });
})();

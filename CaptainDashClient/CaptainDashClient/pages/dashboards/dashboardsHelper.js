/*-------------------------------
-- Author : [A.A]
-- Creation date : 21/01/2013
------------------------------*/

(function () {

    var _listDashboards;
    var addDashboard = WinJS.Resources.getString("DashboardsHelper_addDashboard").value;
    var modifyDashboard = WinJS.Resources.getString("DashboardsHelper_modifyDashboard").value;

    var DashboardsMenusTitles = { 'addDashboard': addDashboard, 'modifyDashboard': modifyDashboard };
    var LBL_MODIFY_GROUP_POPUP = WinJS.Resources.getString("DashboardsHelper_LBL_MODIFY_GROUP_POPUP").value;
    var WidgetType = {
        GROUP: 0,
        DASHBOARD: 1,
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: isValidDashboardTitle
    -- Description: Verif validity of dashboard title
    -- Params: dashbord title, error div
    -- Return: True if valid, False if not
    -------------------------------------------------------*/
    function isValidDashboardTitle(dashboardTitle, errorTxt) {
        if (dashboardTitle != '') {
            if (CDHelper.isValidFormat(dashboardTitle))
                return true;
            else
                errorTxt.innerText = MessagesHelper.TXT_CONNECTOR_SPECIAL_CARACTER;
        }
        else
            errorTxt.innerText = MessagesHelper.TXT_DASHBOARD_NAME; 

        return false;
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: fillListDashboards
    -- Description: Fill dashbords list
    -- Params: dashboards
    -- Return:
    -------------------------------------------------------*/
    function fillListDashboards(dashboards) {
        _listDashboards = dashboards;
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: addToListDashboards
    -- Description: add new dashboard to list dashborads
    -- Params: dashboard
    -- Return:
    -------------------------------------------------------*/
    function addToListDashboards(dashboard) {
        if (!_listDashboards)
            _listDashboards = [];
        _listDashboards.push(dashboard);
    }

    /* ------------------------------------------------------
  -- Author: [M.C]
  -- Name: removeGroupFromListDashboards
  -- Description: remove group from dashboard
  -- Params: idDashboard,idGroup
  -- Return:
  -------------------------------------------------------*/
    function removeGroupFromListDashboards(idDashboard,idGroup) {
        for (var count = 0 ; count < _listDashboards.length; count++) {
            if (idDashboard == _listDashboards[count].id) {
                for (var subCount = 0 ; subCount < _listDashboards[count].groups.length; subCount++) {
                    if (idGroup == _listDashboards[count].groups[subCount].id) {
                        _listDashboards[count].groups.splice(subCount, 1);
                        return;
                    }
                }
            }
        }
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: modifyGroupListDashboards
-- Description: update title group 
-- Params: idDashboard,idGroup,title
-- Return:
-------------------------------------------------------*/
    function modifyGroupListDashboards(idDashboard, idGroup, title) {
        for (var count = 0 ; count < _listDashboards.length; count++) {
            if (idDashboard == _listDashboards[count].id) {
                for (var subCount = 0 ; subCount < _listDashboards[count].groups.length; subCount++) {
                    if (idGroup == _listDashboards[count].groups[subCount].id) {
                        _listDashboards[count].groups[subCount].title = title;
                        return;
                    }
                }
            }
        }
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: modifyListDashboards
    -- Description: modify list dashborads
    -- Params: dashboard
    -- Return:
    -------------------------------------------------------*/
    function modifyListDashboards(dashboard) {
        for (var count = 0; count < _listDashboards.length; count++) {
            if (_listDashboards[count].id == dashboard.id)
            {
                _listDashboards[count].title = dashboard.title;
                _listDashboards[count].description = dashboard.description;
                return;
            }
        } 
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: getHeaderProperties
    -- Description: return data needed to dashboard or group header
    -- Params: item from datasource
    -- Return: group object or dashbord object
    ------------------------------------------------------*/
    function getHeaderProperties(id, title) {
        var item = {
            key: id,
            label: (title != null) ? CDHelper.capitaliseOnlyFirstLetter(title) : '',
        };
        return item;
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: getGroupsDashboard
    -- Description: retourne list des groups du dashboard defini
    -- Params: idDashboard
    -- Return: list groups
    -------------------------------------------------------*/
    function getGroupsDashboard(idDashboard) {
        for (var count = 0; count < _listDashboards.length; count++) {
            if (_listDashboards[count].id == idDashboard) {
                return (_listDashboards[count].groups) ? _listDashboards[count].groups : [];
            }
        }
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: addGroupDashboard
    -- Description: add a group to specified dashboard
    -- Params: idDashboard, group
    -- Return:
    -------------------------------------------------------*/
    function addGroupDashboard(idDashboard, group) {
       var currentDashboardGroups = [];
         for (var count = 0; count < _listDashboards.length; count++) {
              if (_listDashboards[count].id == idDashboard) {
                  _listDashboards[count].groups.push(group);
              }           
          }

         if (Cockpits.currentDash.id == idDashboard) {
            currentDashboardGroups = Cockpits.currentDash.groups;
            currentDashboardGroups.push(group);
            CockpitHelper.hashedGroupList = CDHelper.toHashTable(currentDashboardGroups);
        }                  
    }

    /* ------------------------------------------------------
    -- Author: [M.C]
    -- Name: getDashboardById
    -- Description: retourne list des groups du dashboard defini
    -- Params: idDashboard
    -- Return: dashboard
    -------------------------------------------------------*/
    function getDashboardById(idDashboard) {
        for (var count = 0; count < _listDashboards.length; count++) {
            if (_listDashboards[count].id == idDashboard) {
                return _listDashboards[count];
            }
        }
    }

    /* ------------------------------------------------------
      -- Author: [S.Z]
     -- Name: filterDashboards
     -- Description: filter dashboards groups
     -- Params:
     -- Return:
     -------------------------------------------------------*/
    function filterDashboards(dashboards) {
        var _listDashboards = new Array();
        for (var count = 0; count < dashboards.length; count++) {
            if (dashboards[count].groups.length > 0) {
                _listDashboards[count] = dashboards[count];
            }
        }
        return _listDashboards;
    }

    WinJS.Namespace.define("DashboardsHelper", {
        WidgetType: { get: function () { return WidgetType; } },
        isValidDashboardTitle: isValidDashboardTitle,
        DashboardsMenusTitles: DashboardsMenusTitles,
        LBL_MODIFY_GROUP_POPUP: { get: function () { return LBL_MODIFY_GROUP_POPUP; } },
        listDashboards: { get: function () { return _listDashboards; } },
        fillListDashboards: fillListDashboards,
        addToListDashboards: addToListDashboards,
        modifyListDashboards: modifyListDashboards,
        getGroupsDashboard: getGroupsDashboard,
        removeGroupFromListDashboards: removeGroupFromListDashboards,
        modifyGroupListDashboards: modifyGroupListDashboards,
        getHeaderProperties: getHeaderProperties,
        getDashboardById: getDashboardById,
        addGroupDashboard: addGroupDashboard,
        filterDashboards: filterDashboards
    });
  
})();
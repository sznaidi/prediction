/*-------------------------------
-- Author : [A.A]
-- Creation date : 22/01/2013
------------------------------*/

(function () {
    "use strict";

    var currentDashboardId;

    function ready(currentDashboard) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(DashboardsHelper.DashboardsMenusTitles.modifyDashboard, '', false);
            btn_dashboardMenu_apply.onclick = _modifyDashboard;

            currentDashboardId = currentDashboard.id;
            txt_dashboardMenu_dashboardName.value = (currentDashboard.group.label) ? currentDashboard.group.label : '';
            txt_dashboardMenu_dashboardDescription.value =  (currentDashboard.description) ? currentDashboard.description : '';

            txt_dashboardMenu_dashboardName.focus();
            dashboardMenuContent.onkeydown = function (e) {
                if (e.keyCode == 13) {
                    _modifyDashboard();
                    return false;
                }
            }
        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _modifyDashboard
    -- Description: Modify dashboard
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _modifyDashboard() {
        var dashboardTitle = CDHelper.trim(txt_dashboardMenu_dashboardName.value);
        if (DashboardsHelper.isValidDashboardTitle(dashboardTitle, lbl_dashboardMenu_error)) {
            var dashboardToSend = { 
                dashboard: {
                    title: dashboardTitle,
                    description: txt_dashboardMenu_dashboardDescription.value
                }
            }
            RightMenu.rightMenuLoading(true);
            DashboardsServices.updateDashboard(currentDashboardId, dashboardToSend, _modifyDashboardSucceed, _modifyDashboardFailed);
        }
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _modifyDashboardSucceed
    -- Description: Succeed callback modify dashboard
    -- Params: dashboard
    -- Return:
    -------------------------------------------------------*/
    function _modifyDashboardSucceed() {
        //ToDo:: modifyItem in Lv
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);
        var dashboard = {
            id: currentDashboardId,
            title: CDHelper.capitaliseOnlyFirstLetter(txt_dashboardMenu_dashboardName.value),
            description: txt_dashboardMenu_dashboardDescription.value
        }
        Dashboards.updateDashboardTile(dashboard)
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _modifyDashboardFailed
    -- Description: Failed callback modify dashboard
    -- Params: error
    -- Return:
    -------------------------------------------------------*/
    function _modifyDashboardFailed(error) {
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: onEnterKeyPressed
    -- Description: Modify dashboard on press Enter Key
    -- Params: Event
    -- Return:
    -------------------------------------------------------*/
    function _onEnterKeyPressed(e) {
        if (e.keyCode == 13) {
            dashboardMenuContent.blur();
            _modifyDashboard();
            return false;
        }
    }

    WinJS.UI.Pages.define(Pages.dashboardMenus, {
        ready: ready,
    });

})();
/*-------------------------------
-- Author : [A.A]
-- Creation date : 21/01/2013
------------------------------*/

(function () {
    "use strict";

    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(DashboardsHelper.DashboardsMenusTitles.addDashboard, '', false);
            btn_dashboardMenu_apply.onclick = _addDashboard;

            txt_dashboardMenu_dashboardName.focus();
            dashboardMenuContent.onkeydown = function (e) {
                if (e.keyCode == 13) {
                    _addDashboard();
                    return false;
                }
            }
        });
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _addDashboard
    -- Description: Add new dashboard
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _addDashboard() {
        var dashboardTitle = CDHelper.trim(txt_dashboardMenu_dashboardName.value);
        if (DashboardsHelper.isValidDashboardTitle(dashboardTitle, lbl_dashboardMenu_error)) {
            var dashboardToSend = {
                dashboard: {
                    title: dashboardTitle,
                    description: txt_dashboardMenu_dashboardDescription.value
                }
            }
            RightMenu.rightMenuLoading(true);
            DashboardsServices.addDashboard(dashboardToSend, _addDashboardSucceed, _addDashboardFailed);
        }
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _addDashboardSucceed
    -- Description: Succeed callback add dashboard
    -- Params: dashboard
    -- Return:
    -------------------------------------------------------*/
    function _addDashboardSucceed(dashboard) {
        //ToDo:: addItem in Lv
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);
        Dashboards.insertNewDashboard(dashboard);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _addDashboardFailed
    -- Description: Failed callback add dashboard
    -- Params: error
    -- Return:
    -------------------------------------------------------*/
    function _addDashboardFailed(error) {
        RightMenu.rightMenuLoading(false);
        RightMenu.showHideRightMenu(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: onEnterKeyPressed
    -- Description: Add dashboard on press Enter Key
    -- Params: Event
    -- Return:
    -------------------------------------------------------*/
    function _onEnterKeyPressed(e) {
        if (e.keyCode == 13) {
            dashboardMenuContent.blur();
            _addDashboard();
            return false;
        }
    }

    WinJS.UI.Pages.define(Pages.dashboardMenus, {
        ready: ready,
    });

})();
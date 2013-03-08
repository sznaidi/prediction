/*-------------------------------
-- Author : [S.H]
-- Creation date : 24/12/2012
------------------------------*/
(function () {
    "use strict";
    function ready(elements) {
        WinJS.UI.processAll().then(function (e) {
            WinJS.Resources.processAll();
            RightMenu.setHeader(DataSourcesHelper.menusTitles.newSource, DataSourcesHelper.menusSubTitles[DataSourcesHelper.menusTitles.newSource].search, true);
            btn_rightMenu_back.onclick = _showPreviousPage;
            btn_fbSearch_search.onclick = _showFanPages;
            btn_fbSearch_search.focus();
            txt_fbSearch_input.onkeydown = _onEnterKeyPressed;
        });
    }

    /*  ------------------------------------------------------
   -- Author: [S.H]
   -- Name: _onEnterKeyPressed
   -- Description: Show search result on press Enter Key
   -- Params: Event
   -- Return: No one
   -------------------------------------------------------*/
    function _onEnterKeyPressed(e) {
        if (e.keyCode == 13) {
            txt_fbSearch_input.blur();
            _showFanPages();
            return false;
          }
      }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _showFanPages
    -- Description: Show facebook fan page
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _showFanPages() {    
        if (txt_fbSearch_input.value) {
            // Show loading bar
            RightMenu.rightMenuLoading(true);
            FacebookApi.getListFanPage(txt_fbSearch_input.value, _getListFanPagesSucceed, _getListFanPageFailed)
        }
        else
            lbl_fbSearch_error.innerHTML = MessagesHelper.FB_SEARCH_TXT;
    }

     /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _getListFanPagesSucceed
    -- Description: Callback succeed (getListFanPages)
    -- Params: list FanPages
    -- Return: No one
    -------------------------------------------------------*/
    function _getListFanPagesSucceed(listFanPages) {
         // End loading bar
        RightMenu.rightMenuLoading(false);
        if (listFanPages && listFanPages.length > 0) {
            fbPages.fanPages = listFanPages;
            RightMenu.showRightMenu(Pages.fbSearchResultStep, null);
        }
        else {
            // Page doesn't exist
            lbl_fbSearch_error.innerHTML = MessagesHelper.FB_SEARCH_ERROR;
        }
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _getListFanPageFailed
    -- Description: Callback failed (getListFanPages)
    -- Params: error
    -- Return: No one
    -------------------------------------------------------*/
    function _getListFanPageFailed(error) {
        RightMenu.rightMenuLoading(false);
        Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _showPreviousPage
    -- Description: Navigate to previous page (fb connector type menu)
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _showPreviousPage() {
        RightMenu.showRightMenu(Pages.fbConnectorsTypeStep, null);
    }

    WinJS.UI.Pages.define(Pages.fbSearchStep, {
        ready: ready,
    });

})();
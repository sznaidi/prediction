/*--------------------------------
-- Author : [S.H]
-- Creation date : 17/12/2012
--------------------------------*/
(function () {
    "use strict";
    var timer;
    WinJS.UI.Pages.define(Pages.intro,
        {
            ready: function(elements) {
                WinJS.UI.processAll().then(function (e) {
                    WinJS.Resources.processAll();
                    _initialiseAppBarLabel();
                    audioElement.play();
                    _runIntro();
                    btn_intro_launchButton.onclick = _showSingnInPage;
                    document.getElementById("listenAgain").onclick = _listenAgain;
                    document.getElementById("skip").onclick = _skipClick;
                    cmdHelp.onclick = _cmdHelpClick;
                });
            },

            unload: function() {
                clearInterval(timer);
            },

            stopIntro: function () {
                if (typeof(audioElement) != "undefined") {
                    clearInterval(timer);
                    audioElement.pause();
                }
            }
        });

    var pageIntro = WinJS.UI.Pages.get(Pages.intro).prototype;
    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _initialiseAppBarLabel
-- Description: initialise app bar globalisation
-- Params: no one 
-- Return: no one
------------------------------------------------------*/
    function _initialiseAppBarLabel() {
        listenAgain.winControl.label = WinJS.Resources.getString("bottomAppBar_listenAgain").value;
        skip.winControl.label = WinJS.Resources.getString("bottomAppBar_skip").value;
    }

    /* ------------------------------------------------------
     -- Author: [S.H]
     -- Name: _runIntro
     -- Description: run intro process
     -- Params: No one
     -- Return: No one
     -------------------------------------------------------*/
    function _runIntro() {
        _showHideContentPage(txt_intro_welcomeTxt1);
        timer = setTimeout(function () {
            timer = setTimeout(function () {
                timer = setTimeout(function () {
                    timer = setTimeout(function () {
                        timer = setTimeout(function () {
                            _showHideContentPage(txt_intro_welcomeTxt6);
                        }, 6000);
                        _showHideContentPage(txt_intro_welcomeTxt5);
                    }, 5000);
                    _showHideContentPage(txt_intro_welcomeTxt4);
                }, 4000);
                _showHideContentPage(txt_intro_welcomeTxt3);
            }, 4000);          
            _showHideContentPage(txt_intro_welcomeTxt2);
        }, 5500);
    }

    function _cmdHelpClick() {
        clearInterval(timer);
        //Application.navigator.redirect(Pages.help);
        HelpUtil.goToHelpPage(HelpUtil.PreviousPageIndex.About);
    }

    /* --------------------------------------------------------
    -- Author: [S.H]
    -- Name: _listenAgain
    -- Description:It executes when we click on listen again cmd 
    -- Params: No one
    -- Return: No one
    ---------------------------------------------------------*/
    function _listenAgain() {
        if (!audioElement.ended) {
            audioElement.currentTime = 0;
            clearInterval(timer);
        }
        audioElement.play();
        _runIntro();
        div_intro_bottomAppBar.winControl.showCommands("skip");
        div_intro_bottomAppBar.winControl.hide();
        topAppBarInIntro.winControl.hide();
    }

    /* --------------------------------------------------------
    -- Author: [S.H]
    -- Name: _skipClick
    -- Description:It executes when we click on skip cmd  
    -- Params: No one
    -- Return: No one
    ---------------------------------------------------------*/
    function _skipClick() {
        audioElement.pause();
        _showHideContentPage(txt_intro_welcomeTxt6);
        div_intro_bottomAppBar.winControl.hide();
        topAppBarInIntro.winControl.hide();
        clearInterval(timer);
    }


    /* ------------------------------------------------------
      -- Author: [S.H]
      -- Name: _showHideContentPage
      -- Description: hide and show contents pages
      -- Params: the id of content to show
      -- Return: No one
      -------------------------------------------------------*/
    function _showHideContentPage(idContentToShow) {
        _hideContent();
        WinJS.UI.Animation.exitContent(div_intro_content, null).done(function () {
            idContentToShow.style.display = "block";

            if (idContentToShow == txt_intro_welcomeTxt6)
            {
                div_intro_bottomAppBar.winControl.hideCommands("skip");
                btn_intro_launchButton.style.display = "-ms-grid";           
            }

            return WinJS.UI.Animation.enterContent(div_intro_content, null);
        });
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _hideContent
    -- Description: It hide all pages contents
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _hideContent() {
        btn_intro_launchButton.style.display = "none";
        txt_intro_welcomeTxt1.style.display = "none";
        txt_intro_welcomeTxt2.style.display = "none";
        txt_intro_welcomeTxt3.style.display = "none";
        txt_intro_welcomeTxt4.style.display = "none";
        txt_intro_welcomeTxt5.style.display = "none";
        txt_intro_welcomeTxt6.style.display = "none";
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _showSingnInPage
    -- Description: 
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _showSingnInPage() {
        Pages.renderPage(Pages.signIn, null, div_loginPage_loginPageContent);
    }

    WinJS.Namespace.define("Intro", {
        stopIntro: pageIntro.stopIntro
    });
   
})();
(function () {
    "use strict";

    var appView = Windows.UI.ViewManagement.ApplicationView;
    var nav = WinJS.Navigation;
    WinJS.Namespace.define("Application", {
        PageControlNavigator: WinJS.Class.define(
            // Define the constructor function for the PageControlNavigator.
            function PageControlNavigator(element, options) {
                this._element = element || document.createElement("div");
                this._element.appendChild(this._createPageElement());

                //this.home = options.home;
                this._lastViewstate = appView.value;
                this.preventGoBackTo = [Pages.login, Pages.search];

                nav.onnavigated = this._navigated.bind(this);
                window.onresize = this._resized.bind(this);

                document.body.onkeyup = this._keyupHandler.bind(this);
                document.body.onkeypress = this._keypressHandler.bind(this);
                document.body.onmspointerup = this._mspointerupHandler.bind(this);

                Application.navigator = this;
            }, {
                home: "",
                /// <field domElement="true" />
                _element: null,
                _lastNavigationPromise: WinJS.Promise.as(),
                _lastViewstate: 0,

                // This is the currently loaded Page object.
                pageControl: {
                    get: function () { return this.pageElement && this.pageElement.winControl; }
                },

                // This is the root element of the current page.
                pageElement: {
                    get: function () { return this._element.firstElementChild; }
                },

                // Creates a container for a new page to be loaded into.
                _createPageElement: function () {
                    var element = document.createElement("div");
                    element.style.width = "100%";
                    element.style.height = "100%";
                    return element;
                },

                // Retrieves a list of animation elements for the current page.
                // If the page does not define a list, animate the entire page.
                _getAnimationElements: function () {
                    if (this.pageControl && this.pageControl.getAnimationElements) {
                        return this.pageControl.getAnimationElements();
                    }
                    return this.pageElement;
                },

                // Navigates back whenever the backspace key is pressed and
                // not captured by an input field.
                _keypressHandler: function (args) {
                    if (args.key === "Backspace") {
                        RightMenu.showHideRightMenu(false);
                        nav.back();
                    }
                },

                // Navigates back or forward when alt + left or alt + right
                // key combinations are pressed.
                _keyupHandler: function (args) {
                    if ((args.key === "Left" && args.altKey) || (args.key === "BrowserBack")) {
                        RightMenu.showHideRightMenu(false);
                        nav.back();
                    } else if ((args.key === "Right" && args.altKey) || (args.key === "BrowserForward")) {
                        nav.forward();
                    }
                },

                // This function responds to clicks to enable navigation using
                // back and forward mouse buttons.
                _mspointerupHandler: function (args) {
                    if (args.button === 3) {
                        RightMenu.showHideRightMenu(false);
                        nav.back();
                    } else if (args.button === 4) {
                        nav.forward();
                    }
                },

                // Responds to navigation by adding new pages to the DOM.
                _navigated: function (args) {
                    var newElement = this._createPageElement();
                    var parentedComplete;
                    var parented = new WinJS.Promise(function (c) { parentedComplete = c; });

                    this._lastNavigationPromise.cancel();

                    this._lastNavigationPromise = WinJS.Promise.timeout().then(function () {
                        return WinJS.UI.Pages.render(args.detail.location, newElement, args.detail.state, parented);
                    }).then(function parentElement(control) {
                        var oldElement = this.pageElement;
                        if (oldElement.winControl && oldElement.winControl.unload) {
                            oldElement.winControl.unload();
                        }
                        this._element.appendChild(newElement);
                        this._element.removeChild(oldElement);
                        oldElement.innerText = "";
                        this._updateBackButton();
                        this.navigated();
                        parentedComplete();
                        WinJS.UI.Animation.enterPage(this._getAnimationElements()).done();
                    }.bind(this));

                    args.detail.setPromise(this._lastNavigationPromise);
                },

                // This function updates application controls once a navigation
                // has completed.
                navigated: function () {

                    var backButton = this.pageElement.querySelectorAll(".win-backbutton");

                    if (backButton.length) {
                        backButton[0].onclick = function (e) {
                            RightMenu.showHideRightMenu(false);
                            nav.back();
                        };

                        if (nav.canGoBack) {
                            backButton[0].removeAttribute("disabled");
                        } else {
                            backButton[0].setAttribute("disabled", "disabled");
                        }

                        if (nav.history.backStack.length && this.preventGoBackTo.indexOf(nav.history.backStack[nav.history.backStack.length - 1].location) > -1 && nav.location != Pages.help) {
                            for (var indexBackButton = 0; indexBackButton < backButton.length; indexBackButton++) {
                                backButton[indexBackButton].setAttribute("disabled", "disabled");
                            }
                        }
                    }
                },

                // Responds to resize events and call the updateLayout function
                // on the currently loaded page.
                _resized: function (args) {
                    if (this.pageControl && this.pageControl.updateLayout) {
                        this.pageControl.updateLayout.call(this.pageControl, this.pageElement, appView.value, this._lastViewstate);
                    }
                    this._lastViewstate = appView.value;
                },

                // Updates the back button state. Called after navigation has
                // completed.
                _updateBackButton: function () {
                    var backButton = this.pageElement.querySelector("header[role=banner] .win-backbutton");
                    if (backButton) {
                        backButton.onclick = function () {
                            RightMenu.showHideRightMenu(false);
                            nav.back();
                        };

                        if (nav.canGoBack) {
                            backButton.removeAttribute("disabled");
                        } else {
                            backButton.setAttribute("disabled", "disabled");
                        }
                    }
                },

                redirect: function (destination) {
                    if (destination != Pages.search && nav.location != Pages.login && nav.location != "") {
                        SearchController.searchQuery = null;
                    }
                    if (typeof (SearchController) != 'undefined' && (SearchController.searchQuery || SearchController.searchQuery == "")) {
                        //navigate to search page
                        WinJS.Navigation.navigate(Pages.search);
                    }
                    else if (nav.location == destination) {
                        return;
                    }
                    else {
                        RightMenu.showHideRightMenu(false);
                        WinJS.Navigation.navigate(destination);
                        topAppBar.winControl.hide();
                    }
                },

                /* ------------------------------------------------------
                  -- Author: [S.H]
                  -- Name: checkUserStatus
                  -- Description: 
                  -- Params: No one
                  -- Return: No one
                  -------------------------------------------------------*/
                goToStartPage: function (displayIntro) {
                    
                    topAppBar.winControl.addEventListener("beforeshow", function () { if (nav.location == Pages.dataExplorer && !DataExplorerController.isEmptyExploration) RightMenu.showHideRightMenu(false); }, false);
                    cmdHelp.onclick = function () {
                        HelpUtil.goToHelpPage(HelpUtil.PreviousPageIndex.About);
                    };
                    cmdHelpTopAppBar.onclick = function () {
                        HelpUtil.goToHelpPage(HelpUtil.PreviousPageIndex.About);
                    };
                    var _vault = new Windows.Security.Credentials.PasswordVault();
                    //No saved credentials (First loggin)         
                    if (_vault.retrieveAll().size == 0) {
                        var showIntro = (displayIntro == false) ? displayIntro : true;
                        WinJS.Navigation.navigate(Pages.login, { showIntro: showIntro });
                    }
                        //Logged with saved credential
                    else {
                        // If we try to install another application with another crendential (we have 2 saved credentials in vault) 
                        if (_vault.retrieveAll().size == 2) {
                            for (var count = 0; count < _vault.retrieveAll().size; count++) {
                                if (!LoginHelper.isValidMail(_vault.retrieveAll().getAt(count).userName, ""))
                                    _vault.remove(_vault.retrieveAll().getAt(count));
                            }
                        }

                        topAppBar.winControl.disabled = true;
                        topAppBarInIntro.winControl.disabled = true;

                        CDHelper.requireScriptJS(Scripts.signIn);
                        var userPassword = _vault.retrieve(CDHelper.applicationName, _vault.findAllByResource(CDHelper.applicationName)[0].userName).password;
                        var userEmail = _vault.retrieve(CDHelper.applicationName, _vault.findAllByResource(CDHelper.applicationName)[0].userName).userName;
                        var savedCredentials = new LoginHelper.UserCredentials(userEmail, userPassword);
                        SignIn.signIn(savedCredentials, true);
                        CDHelper.displayHideDiv(splashScreen, true);
                    }
                }
            }
        )
    });
})();

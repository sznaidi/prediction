//[A.A] creation date : 17/12/2012

var RightMenu = WinJS.Class.define(

    // The constructor function.
    function () {
    },

    // The set of instance members.
    {       
    },

    // The set of static members.
    {
         _objectsToDelete : new Array(),//contains all objects created in connectors menus and to be deleted from memory when exiting Right menu

        //Description: set right menu header
        //Input: title: string, subtitle:string, withBackButton:bool (true to show, else false)
        setHeader: function(title, subtitle, withBackButton) {
            rightMenuTitle.innerText = title;
            rightMenuSubtitle.innerText = subtitle;
            RightMenu._showHideBackBtn(withBackButton);
            RightMenu.setRightMenuContentAnimation();
        },

        //Description: open right menu and load content
        //Input: page url, options
        showRightMenu: function(pageUrl, elements) {
            var canShowMenu = true;
            if (Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped) {
                canShowMenu = Windows.UI.ViewManagement.ApplicationView.tryUnsnap();
            }

            if (canShowMenu) {
                Pages.renderPage(pageUrl, elements, rightMenuContent);
            }
        },

        //Description: show or hide right menu
        //Input: True: show, false: hide
        showHideRightMenu: function(show) {
            if (show) {
                rightMenu.style.visibility = "visible";
                return WinJS.UI.executeTransition(
                    rightMenu,
                    {
                        property: "right",
                        delay: 0,
                        duration: 200,
                        timing: "linear",
                        from: "-32.8%",
                        to: "0%"
                    }
                );
            } else {
                if (rightMenu.style.right == "0%") {
                    return WinJS.UI.executeTransition(
                        rightMenu,
                        {
                            property: "right",
                            delay: 0,
                            duration: 200,
                            timing: "linear",
                            from: "0%",
                            to: "-32.8%"
                        }
                    );
                }
                //delete objects was used in Right menu 
                this._garbageCollector();
            }
        },

        //Description: Animation of right menu content
        setRightMenuContentAnimation: function() {
            if (rightMenuDiv) {
                return WinJS.UI.executeTransition(
                   rightMenuDiv,
                   [{
                       property: "margin-left",
                       delay: 0,
                       duration: 700,
                       timing: "ease",
                       from: "150px",
                       to: "0px"
                   },
                   {
                       property: "opacity",
                       delay: 0,
                       duration: 100,
                       timing: "linear",
                       from: 0,
                       to: 1
                   }]);
            }
        },

        //Description: show or hide back button
        //Input: True: show, false: hide
        _showHideBackBtn: function(show) {
            if (show) {
                btn_rightMenu_back.style.display = 'block';
                rightMenuTitle.style.msGridColumn = 2;
            } else {
                btn_rightMenu_back.style.display = 'none';
                rightMenuTitle.style.msGridColumn = 1;
            }
        },


        //Description: delete all objects in _objectsToDelete array
        //Input:
        _garbageCollector: function () {
            //TODO to be tested
            for (var i = 0; i < this._objectsToDelete.count; i++) {
                delete _objectsToDelete[0];
            }
        },

        //Description: add an object to _objectsToDelete array
        //Input: object to be deleted when hiding Right menu
        addToObjectsToBeDeleted: function(object) {
            RightMenu._objectsToDelete.push(object);
        },
        
        //Description: show or hide loading ring
        //Input: True: show, false: hide
        rightMenuLoading: function(isLoading) {
            CDHelper.displayHideDiv(rightMenuCoverControls, isLoading);
            CDHelper.displayHideDiv(rightMenuLoadingDiv, isLoading);
            if (isLoading)
                coverControls.style.visibility = 'visible';
            else
                coverControls.style.visibility = 'hidden';
        },
    }
);


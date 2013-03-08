/*------------------------------------------------------
-- Author: HK
-- Creation Date: 21-01-2013
-------------------------------------------------------*/
(function () {
    "use strict";
    //	--------------------------------------------------------------------------
    //	Namespace: Popup 
    //	-------------------------------------------------------------------------

    /*------------------------------------------------------
    -- Author: HK
    -- Name: showYesNoPopup
    -- Description: 
    --   shows a flyout with title, text & 2 buttons
    -- Params: 
        * anchor: the DOM element wich the popup will be attached to
        * popupTitle: the title of popup
        * popupText: the body text of popup
        * btnYesLabel: the label of yes button(left button)
        * yesCallback: the function to execute once yes button is clicked
        * btnNoLabel: the label of no button (right button)
        * noCallback: the function to execute once no button is clicked
        * placement: TOP | BOTTOM relative to anchor
        * alignement: LEFT |RIGHT relative to anchor
    -- Return: void = display popUp
    -------------------------------------------------------*/
    function showYesNoPopup(anchor, popupTitle, popupText, btnYesLabel, yesCallback, btnNoLabel, noCallback, alignement) {
        WinJS.UI.Fragments.renderCopy(Pages.popup, null).then(function (frag) {
            // this div is global & will contain the popup
            var popupContainer = document.querySelector('.divPopUpGlobal');
            
            // fill the global div with popup UI
            popupContainer.innerHTML = '';
            popupContainer.appendChild(frag);

            //create a flyout from HTML
            var object = new WinJS.UI.Flyout(flyout_yesNoConfirm_popup);

            //set buttons labels & onclick events
            //yes button
            btn_yesConfirm_popup.innerHTML = btnYesLabel;
            btn_yesConfirm_popup.onclick = function () {
                object.hide();
                yesCallback();
            };
            //no button
            btn_noConfirm_popup.innerHTML = btnNoLabel;
            btn_noConfirm_popup.onclick = function () {
                object.hide();
                noCallback();
            };

            //set title & text
            div_titleYesNo_popup.innerHTML = popupTitle;
            div_textYesNo_popup.innerHTML = popupText;

            //show popup
            object.show(anchor, CDHelper.placement.top, alignement);
        });
    }

    /*------------------------------------------------------
    -- Author: HK
    -- Name: showYesNoPopup
    -- Description: 
    --   shows a flyout with title, text & only one buttons
    -- Params: 
        * anchor: the DOM element wich the popup will be attached to
        * popupTitle: the title of popup
        * popupText: the body text of popup
        * btnLabel: the label of button
        * btnCallback: the function to execute once the button is clicked
        * placement: TOP | BOTTOM relative to anchor
        * alignement: LEFT |RIGHT relative to anchor
    -- Return: void = display popUp
    -------------------------------------------------------*/
    function showInformationPopup(anchor, popupTitle, popupText, btnLabel, btnCallback, alignement) {
        WinJS.UI.Fragments.renderCopy(Pages.popup, null).then(function (frag) {
            // this div is global & will contain the popup
            var popupContainer = document.querySelector('.divPopUpGlobal');

            // fill the global div with popup UI
            popupContainer.innerHTML = '';
            popupContainer.appendChild(frag);

            //set button labels & onclick events
            //yes button
            btn_information_popup.innerHTML = btnLabel;
            btn_information_popup.onclick = btnCallback;
            
            //set title & text
            div_titleInfo_popup.innerHTML = popupTitle;
            div_textInfo_popup.innerHTML = popupText;

            //create a flyout from the UI & show it
            var object = new WinJS.UI.Flyout(flyout_information_popup);
            object.show(anchor, CDHelper.placement.top, alignement);
        });
    }

    /*------------------------------------------------------
    -- Author: HK
    -- Name: showYesNoPopup
    -- Description: 
    --   shows a flyout with title, input text & a confirm button
    -- Params: 
        * anchor: the DOM element wich the popup will be attached to
        * popupTitle: the title of popup
        * btnLabel: the label of the button
        * btnCallback: the function to execute once the button is clicked
        * errorMessage: the message to show if the user confirms with empty input
        * placement: TOP | BOTTOM relative to anchor
        * alignement: LEFT |RIGHT relative to anchor
        * inputDefaultValue: the default value to show into input (if exists & not empty string)
    -- Return: void = display popUp
    -------------------------------------------------------*/
    function showAddPopup(anchor, popupTitle, btnLabel, btnCallback, errorMessage, alignement, inputDefaultValue) {
        WinJS.UI.Fragments.renderCopy(Pages.popup, null).then(function (frag) {
            // this div is global & will contain the popup
            var popupContainer = document.querySelector('.divPopUpGlobal');

            // fill the global div with popup UI
            popupContainer.innerHTML = '';
            popupContainer.appendChild(frag);

            //set input focus event & default value
            if (inputDefaultValue && inputDefaultValue != '') {
                input_add_popup.value = inputDefaultValue;
            }

            var functionApplay = function (e) {
                if (input_add_popup.value != '') {
                    object.hide();
                    btnCallback(input_add_popup.value);
                }
                else {
                    div_errorInput_popup.innerText = errorMessage;
                    div_errorInput_popup.style.visibility = 'visible';
                }
            };

            input_add_popup.onfocus = function () {
                div_errorInput_popup.innerText = '';
                div_errorInput_popup.style.visibility = 'hidden';
            };

            //set button labels & onclick events
            //yes button
            btn_add_popup.innerHTML = btnLabel;

            input_add_popup.onkeydown = function (e) { if (e.keyCode == 13) { functionApplay(); return false; } }

            btn_add_popup.onclick = functionApplay;

            //set title
            div_titleAdd_popup.innerHTML = popupTitle;

            //create a flyout from the UI & show it
            var object = new WinJS.UI.Flyout(flyout_add_popup);
            object.show(anchor, CDHelper.placement.top, alignement);
        });
    }

    function _getCurrentTitle(item) {
        if (item.title) {
            return item.title;
        }
        else if (item.name) {
            return item.name;
        }
        //else add if you need
    }

    function showSelectBox(anchor, list, clickCallback, alignement, type) {
        WinJS.UI.Fragments.renderCopy(Pages.popup, null).then(function (frag) {
            WinJS.UI.processAll();
            // this div is global & will contain the popup
            var popupContainer = document.querySelector('.divPopUpGlobal');
            var placement = CDHelper.placement.bottom;
            var selectType = "selectBox";
            // fill the global div with popup UI
            popupContainer.innerHTML = '';
            popupContainer.appendChild(frag);
            var max_height_flyout = 212;
            var HEIGHT_ITEM_FLYOUT = 40;
            var HEIGHT_MARGIN_FLYOUT = 12;

            //get current selected item
            var currentSelected = anchor.querySelector(".selectBox") ? anchor.querySelector(".selectBox") : anchor;

            //create a flyout from the UI & show it
            var object = new WinJS.UI.Menu(flyout_selectbox);

            //create menu commands
            for (var count = 0; count < list.length; count++)
            {
                var command = new WinJS.UI.MenuCommand();
                command.label = _getCurrentTitle(list[count]);
                command.id = list[count].id;

                //setting the behavior of selected element
                if(currentSelected && currentSelected.dataSrc && (currentSelected.dataSrc == list[count].id)) {
                    command._element.style.backgroundColor = '#ebc24b';
                    var scrollToIndex = count + 1;//help us to set the correct position to menu
                    var selectedCommand = command._element;//in case it's not shown beacause of overflow we scroll to it
                }
                (function (currentCommand) {//closure to save current object
                    currentCommand.addEventListener("click", function (e) {
                        //execute the callback
                        clickCallback(currentCommand.id, currentCommand.label);
                        //disable cover
                        coverControls.style.visibility = "hidden";
                    }, false);
                })(command);//end closure

                //add command to menu
                object._addCommand(command);
            }
            
            //setting the height of menu: number commands * command layout height
            flyout_selectbox.style.height = (count * HEIGHT_ITEM_FLYOUT) + "px";
            
            //in case of select box type we do some styling
            if (type && type == selectType) {
                max_height_flyout = 400;//max 10 items 
                flyout_selectbox.style.width = anchor.clientWidth + "px";
                flyout_selectbox.style.border = "0px";
                flyout_selectbox.style.margin = "0px";
                flyout_selectbox.style.padding = "0px";
                popupContainer.style.height = "auto";
                popupContainer.style.overflowY = "visible";
                placement = CDHelper.placement.bottom;
                flyout_selectbox.style.marginTop = scrollToIndex ? "-" + (scrollToIndex * HEIGHT_ITEM_FLYOUT) + "px" : "-" + HEIGHT_ITEM_FLYOUT + "px";
                coverControls.style.visibility = "visible";
                //max width of menu
                flyout_selectbox.style.maxWidth = anchor.clientWidth + "px";
            }
     

            //styling the overflow
            flyout_selectbox.style.maxHeight = max_height_flyout + "px";
            if (max_height_flyout < flyout_selectbox.style.pixelHeight) {
                flyout_selectbox.style.overflowY = "scroll";
                if (currentSelected && scrollToIndex > 9) {
                    flyout_selectbox.style.marginTop = "-" + max_height_flyout + "px";
                }
            }
            else {
                flyout_selectbox.style.overflowY = "hidden";
            }

            

            //set menu options
            object.anchor = anchor;
            object.placement = placement;
            object.alignment = alignement;
            object.onbeforehide = function (event) {
                //disable cover
                coverControls.style.visibility = "hidden";
            };
            object.show();

            //scroll to selected command
            if (selectedCommand) {
                selectedCommand.scrollIntoView(false);
            }
        });
    }
    
    WinJS.Namespace.define("Popup", {
        showYesNoPopup: showYesNoPopup,
        showInformationPopup: showInformationPopup,
        showAddPopup: showAddPopup,
        showSelectBox: showSelectBox,
    });

})();
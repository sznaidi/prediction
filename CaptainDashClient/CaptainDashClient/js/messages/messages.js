(function () {
    "use strict";
    //	--------------------------------------------------------------------------
    //	Namespace: Message
    //	-------------------------------------------------------------------------
    var buttonTemplate = function (label, callback, cssClass) {
        this.label = label;
        this.callback = callback;
        this.class = cssClass ? cssClass : buttonsClass.regular;
    };

    var buttonsClass = { regular: "msgButtonRegular", wide: "msgButtonWide" };
    var MessageLevel = { Exception: 1, Error: 2, Warning: 3, Info: 4 };

    function _showMessage(title, text, buttonsToAdd, hyperlink, hyperLinkCallback) {
        // getW8Message
        // the function to call annywhere to display the message
        // params:
        //  title: containig message title
        //  text: containig message text body
        //  buttonsToAdd = array of specific buttons created before call

        // Create a copy of message html UI
        WinJS.UI.Fragments.renderCopy(Pages.messages, null).then(function (frag) {
            // get/fill title zone
            var divTitle = frag.querySelector('.messageTitle');
            var messageTitle = document.createTextNode(title);
            divTitle.appendChild(messageTitle);

            // get/fill text zone
            var divText = frag.querySelector('.messageText');
            divText.appendChild(document.createTextNode(toStaticHTML(text)));

            // add hyperLink
            if (hyperlink) {
                var linkLabel = document.createElement("a");
                linkLabel.appendChild(document.createTextNode(hyperlink));
                var divHyperLink = frag.querySelector('.messageLink');
                divHyperLink.appendChild(linkLabel);
                linkLabel.onclick = hyperLinkCallback;
            }

            // populate with buttons
            _populateMessageButtons(buttonsToAdd, frag);

            // this div is in the default page so it's global
            var msgContent = document.querySelector('.divMessageGlobal');

            // fill the global div with the message UI
            msgContent.appendChild(frag);

            // display the message
            _showHideMessage(true);

            // Make the page ready
            var pageShowMessage = WinJS.UI.Pages.get(Pages.messages).prototype;
            pageShowMessage.ready();
        });
    }

    function _populateMessageButtons(buttonsArray, frag) {
        // _populateMessageButtons
        // Add desired buttons to the button zone in the message UI
        // params: 
        //  buttonsZone = the zone where to put button in the UI
        //  buttonsArray = array of buttons to create 
        
        var cell;
        var button;
        var buttonLabel;

        // get button zone
        var buttonsZone = frag.querySelector('.buttonsTableZone');
        // empty content
        buttonsZone.innerHTML = "";//??

        for (var i = 0; i < buttonsArray.length; i++) {
            // create needed elements for message buttons
            cell = document.createElement('td');
            buttonLabel = document.createTextNode(buttonsArray[i].label);
            button = document.createElement('button');
            button.className = buttonsArray[i].class;

            button.appendChild(buttonLabel);
            button.onclick = buttonsArray[i].callback;
            cell.appendChild(button);

            // add the created button to message UI
            buttonsZone.appendChild(cell);
        }
    }

    function _showHideMessage(show) {
        // showHideMessage
        // show or hide the message box
        // params: show boolean true=show
        var animating = WinJS.Promise.wrap();
        if (show) {
            // Display
            var msgContent = document.querySelector('.divMessageGlobal');
            msgContent.style.visibility = "visible";
        }
        else {
            // Hide & empty
            animating = animating.then(function () {
                // this div is in the default page so it's global
                var msgContent = document.querySelector('.divMessageGlobal');
                msgContent.style.visibility = "hidden";
                // empty content
                msgContent.innerHTML = '';

                return WinJS.UI.Animation.hidePanel(msgContent);
            });
        }
    }

    function showCancelMessage(title, text) {
        var buttonsToAdd = [];
        var cancelCallBack = function () {
            _showHideMessage(false);
        }

        var btnCancel = new buttonTemplate(MessagesHelper.buttonsLabel.cancel, cancelCallBack, buttonsClass.regular);
        buttonsToAdd.push(btnCancel);
        _showMessage(title, text, buttonsToAdd);
    }

    function showCloseMessage(title, text) {
        var buttonsToAdd = [];
        var closeCallBack = function (e) {
            _showHideMessage(false);
            WinJS.Application.stop();
            WinJS.Application._terminateApp(null, e);
        }

        var btnClose = new buttonTemplate(MessagesHelper.buttonsLabel.close, closeCallBack, buttonsClass.regular);
        buttonsToAdd.push(btnClose);
        _showMessage(title, text, buttonsToAdd);
    }

    function showOkMessage(title, text, callBack) {
        var buttonsToAdd = [];
        var okCallBack = function () {
            _showHideMessage(false);

            if (typeof (callBack) == "function") {
                callBack();
            }
        }

        var btnOk = new buttonTemplate(MessagesHelper.buttonsLabel.ok, okCallBack, buttonsClass.regular);
        buttonsToAdd.push(btnOk);
        _showMessage(title, text, buttonsToAdd);
    }

    function showConfirmMessage(title, text, callBack) {
        var buttonsToAdd = [];
        var confirmCallBack = function () {
            _showHideMessage(false);

            if (typeof (callBack) == "function") {
                callback();
            }
        }

        var btnConfirm = new buttonTemplate(MessagesHelper.buttonsLabel.confirm, confirmCallBack, buttonsClass.regular);
        buttonsToAdd.push(btnConfirm);
        _showMessage(title, text, buttonsToAdd);
    }

    function showTryAgainMessage(title, text, callBack) {
        var buttonsToAdd = [];
        var tryAgainCallBack = function () {
            _showHideMessage(false);

            if (typeof (callBack) == "function") {
                callBack();
            }
        }

        var btnTryAgain = new buttonTemplate(MessagesHelper.buttonsLabel.tryAgain, tryAgainCallBack, buttonsClass.regular);
        buttonsToAdd.push(btnTryAgain);
        _showMessage(title, text, buttonsToAdd);
    }

    function showErrorMessage(title, text, sendCallBack, dontSendCallBack) {
        var buttonsToAdd = [];

        var btnSend = new buttonTemplate(MessagesHelper.buttonsLabel.send, function () { _callbackController(sendCallBack) }, buttonsClass.wide);
        var btnDontSend = new buttonTemplate(MessagesHelper.buttonsLabel.dontSend, function () { _callbackController(dontSendCallBack) }, buttonsClass.wide);

        buttonsToAdd.push(btnSend);
        buttonsToAdd.push(btnDontSend);

        _showMessage(title, text, buttonsToAdd);
    }

    function showReconnectMessage(title, text, okCallBack, reconnectCallBack) {
        var buttonsToAdd = [];

        var btnOk = new buttonTemplate(MessagesHelper.buttonsLabel.ok, function () { _callbackController(okCallBack) }, buttonsClass.regular);
        var btnReconnect = new buttonTemplate(MessagesHelper.buttonsLabel.reconnect, function () { _callbackController(reconnectCallBack) }, buttonsClass.regular);

        buttonsToAdd.push(btnOk);
        buttonsToAdd.push(btnReconnect);

        _showMessage(title, text, buttonsToAdd);
    }

    function showOkCancelMessage(title, text, okCallBack, cancelCallBack) {
        var buttonsToAdd = [];

        var btnOk = new buttonTemplate(MessagesHelper.buttonsLabel.ok, function () { _callbackController(okCallBack) }, buttonsClass.regular);
        var btnCancel = new buttonTemplate(MessagesHelper.buttonsLabel.cancel, function () { _callbackController(cancelCallBack) }, buttonsClass.regular);

        buttonsToAdd.push(btnOk);
        buttonsToAdd.push(btnCancel);

        _showMessage(title, text, buttonsToAdd);
    }

    function showLinkedMessage(title, text, link, callbackLink) {
        var buttonsToAdd = [];
        var closeCallBack = function (e) {
            _showHideMessage(false);
            WinJS.Application.stop();
            WinJS.Application._terminateApp(null, e);
        }

        var btnClose = new buttonTemplate(MessagesHelper.buttonsLabel.close, closeCallBack, buttonsClass.regular);
        buttonsToAdd.push(btnClose);
        _showMessage(title, text, buttonsToAdd, link, callbackLink);
    }

    function _callbackController(callback) {
        _showHideMessage(false);
        if (typeof (callback) == "function") {
            callback();
        }
    }

    /* ------------------------------------------------------
     -- Author: [M.K]
     -- Name: showToast
     -- Description: show text msg in toast notification format
     -- Params: text message to show
     -- Return:
     -------------------------------------------------------*/
    function showToast(toastText) {
        // Specify the toast template to use
        var toastTemplate = Windows.UI.Notifications.ToastTemplateType.toastImageAndText01;
        // Get a template content object
        var templateContent = Windows.UI.Notifications.ToastNotificationManager.getTemplateContent(toastTemplate);
        //set image and text attributes 
        templateContent.getElementsByTagName("image")[0].setAttribute("src", MessagesHelper.IMG_TOAST);
        templateContent.getElementsByTagName("text")[0].appendChild(templateContent.createTextNode(toastText));
        // Create a toast
        var toast = new Windows.UI.Notifications.ToastNotification(templateContent);
        //show the toast
        Windows.UI.Notifications.ToastNotificationManager.createToastNotifier().show(toast);
    }
    
    WinJS.Namespace.define("Messages", {
        showCancelMessage: showCancelMessage,
        showCloseMessage: showCloseMessage,
        showOkMessage: showOkMessage,
        showConfirmMessage: showConfirmMessage,
        showTryAgainMessage: showTryAgainMessage,
        showErrorMessage: showErrorMessage,
        showReconnectMessage: showReconnectMessage,
        showOkCancelMessage: showOkCancelMessage,
        showToast: showToast,
        showLinkedMessage: showLinkedMessage
    });
})();
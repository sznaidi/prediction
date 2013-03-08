//[M.K] creation date : 17/01/2013

(function () {
    "use strict";
    /* ------------------------------------------------------
     -- Author: [M.K]
     -- Name: initializeNotificationChannel
     -- Description: open a new channel for the user 
     -- The channel is used to receive service notifications 
     -- Params: 
     -- Return:
     -------------------------------------------------------*/

    function initializeNotificationChannel() {
        var channelOperation = Windows.Networking.PushNotifications.PushNotificationChannelManager.createPushNotificationChannelForApplicationAsync();
        return channelOperation.then(
            function (channel) {
                if (channel) {
                    channel.addEventListener("pushnotificationreceived", _notificationReceivedHandler);
                }
                //TODO Update Client Channel
            },
            function (error) {
                //TODO
            }
        );
    }

    /* ------------------------------------------------------
     -- Author: [M.K]
     -- Name: _notificationReceivedHandler
     -- Description: if active page ==  datasources => Update the connector from pending to start in DataSources
     --              if active page ==  cockpit => Go to the updated group
     -- Params: notification event
     -- Return:
     -------------------------------------------------------*/

    function _notificationReceivedHandler(e) {
        var notificationContent;
        if (e.notificationType == Windows.Networking.PushNotifications.PushNotificationType.toast) {
            //get notification content
            notificationContent = e.toastNotification.content.getXml();
            switch (WinJS.Navigation.location) {
                case Pages.dataSources:
                    //TODO service not ready
                    DataSources.notificationHandler(notificationContent);
                    break;
                    //case Pages.cockpit:
                    //    //TODO
                    //    break;
                default:
                    break;
            }
        }
    }

    WinJS.Namespace.define("Notifications", {
        initializeNotificationChannel: initializeNotificationChannel,
    });

})();
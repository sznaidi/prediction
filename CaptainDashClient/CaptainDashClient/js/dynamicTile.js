(function () {
    "use strict";

    var notifications = Windows.UI.Notifications;
    var updateManager = notifications.TileUpdateManager.createTileUpdaterForApplication();
 
    function updateDynamicTile(kpis) {
        var NBR_MAX_TILE;
        updateManager.clear();
        updateManager.enableNotificationQueue(true);
        if (kpis.length > 5) {
            NBR_MAX_TILE = 5;
        }
        else {
            NBR_MAX_TILE = kpis.length;
        }

        for (var count = NBR_MAX_TILE; count >= 1; count--) {
            updateTile("images/cdWideLogo.png", kpis[count - 1].Kpi, updateManager, notifications);
            updateSmallTile("images/cdSmallLogo.png", kpis[count - 1].Kpi, updateManager, notifications);
        }

    }

    function updateTile(imageUrl, kpi, updateManager, notifications) {

        var tileXml = notifications.TileUpdateManager.getTemplateContent(notifications.TileTemplateType.tileWidePeekImage02);

        var tileImageAttributes = tileXml.getElementsByTagName("image");
        tileImageAttributes[0].setAttribute("src", "ms-resource:" + imageUrl);
        var tileTextAttributes = tileXml.getElementsByTagName("text");
        tileTextAttributes[0].appendChild(tileXml.createTextNode(kpi.value + kpi.precision + kpi.unit));
        tileTextAttributes[1].appendChild(tileXml.createTextNode(kpi.label));
        tileTextAttributes[2].appendChild(tileXml.createTextNode(kpi.typeSource));
        tileTextAttributes[3].appendChild(tileXml.createTextNode(kpi.formattedDate));

        var tileNotification = new notifications.TileNotification(tileXml);
        notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);
    }

    function updateSmallTile(imageUrl, kpi, updateManager, notifications) {

        var tileXml = notifications.TileUpdateManager.getTemplateContent(notifications.TileTemplateType.tileSquareText01);
        var labels = getTileLabels(kpi.label);
        var labelFirstPart = labels[0];
        var labelSecondPart = labels[1];
        var tileTextAttributes = tileXml.getElementsByTagName("text");
        tileTextAttributes[0].appendChild(tileXml.createTextNode(kpi.value + kpi.precision + kpi.unit));
        tileTextAttributes[1].appendChild(tileXml.createTextNode(labelFirstPart));
        tileTextAttributes[2].appendChild(tileXml.createTextNode(labelSecondPart));
        tileTextAttributes[3].appendChild(tileXml.createTextNode(kpi.formattedDate));

        var tileNotification = new notifications.TileNotification(tileXml);
        updateManager.update(tileNotification);
    }

    function getTileLabels(label) {
        var FIRST_PART_MAX_LENGTH = 8;
        var firstLabel = "";
        var secondLabel = "";
        if (label) {
            var words = label.split(" ");
            var firstLabelTemp = "";
            for (var index = 0; index < words.length ; index++) {
                firstLabelTemp = firstLabel + words[index];
                if (firstLabelTemp.length < FIRST_PART_MAX_LENGTH) {
                    firstLabel = firstLabelTemp + " ";
                }
                else {
                    if (index == 0) {
                        firstLabel = words[0].slice(0, FIRST_PART_MAX_LENGTH) + "-";
                        words[0] = words[0].slice(FIRST_PART_MAX_LENGTH, words[0].length)
                    }
                    secondLabel = secondLabel + words[index] + " ";
                }
            }
        }
        return [firstLabel.trim(), secondLabel.trim()];
    }
    WinJS.Namespace.define("DynamicTile", {
        updateDynamicTile: updateDynamicTile,
    });
})();

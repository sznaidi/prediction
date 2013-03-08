//[A.A] creation date : 17/12/2012

(function () {

    var _SERVICE_ACCOUNT_EXIST_ERROR = "is already taken";

    var newSource = WinJS.Resources.getString("DataSourcesHelper_newSource").value;
    var  category = WinJS.Resources.getString("DataSourcesHelper_category").value;
    var credentials = WinJS.Resources.getString("DataSourcesHelper_credentials").value;
    var account = WinJS.Resources.getString("DataSourcesHelper_account").value;
    var nameSource = WinJS.Resources.getString("DataSourcesHelper_nameSource").value;
    var venueType = WinJS.Resources.getString("DataSourcesHelper_venueType").value;
    var search = WinJS.Resources.getString("DataSourcesHelper_search").value;
    var searchResult = WinJS.Resources.getString("DataSourcesHelper_searchResult").value;
    var yourVenueResult = WinJS.Resources.getString("DataSourcesHelper_yourVenueResult").value;
    var connectorType = WinJS.Resources.getString("DataSourcesHelper_connectorType").value;
    var agency = WinJS.Resources.getString("DataSourcesHelper_agency").value;
    var client = WinJS.Resources.getString("DataSourcesHelper_client").value;
    var webProperties = WinJS.Resources.getString("DataSourcesHelper_webProperties").value;
    var profile = WinJS.Resources.getString("DataSourcesHelper_profile").value;
    var recent = WinJS.Resources.getString("DataSourcesHelper_recent").value;
    var type = WinJS.Resources.getString("DataSourcesHelper_type").value;
    var alphabetic = WinJS.Resources.getString("DataSourcesHelper_alphabetic").value;

    //liste des titles des right menu de datasource
    var menusTitles = { 'newSource': newSource };
    var menusSubTitles =[];
    //liste des subtitles des right menu de datasource
    menusSubTitles[menusTitles.newSource] = { 'category': category, 'credentials': credentials, 'account': account, 'nameSource': nameSource, 'venueType': venueType, 'search': search, 'searchResult': searchResult, 'yourVenueResult': yourVenueResult, 'connectorType': connectorType, 'agency': agency, 'client': client, 'webProperties': webProperties, 'profile': profile };

    var SortMethod = {
        'Recent': recent,
        'Type': type,
        'Alphabetic': alphabetic,
    };

    var filterStatusColor = {
        ENABLED: "#EC715A",
        DISABLED: "#C7C2B0",
    }

    var isWebBrokerActive;

    var _listConnectors;

    //var listConnectorsType = [
    //        { type: ConnectorsTemplate.ConnectorType.Atlas, label: ConnectorsTemplate.ConnectorLabel.Atlas },
    //        { type: ConnectorsTemplate.ConnectorType.Facebook, label: ConnectorsTemplate.ConnectorLabel.Facebook },
    //        { type: ConnectorsTemplate.ConnectorType.Foursquare, label: ConnectorsTemplate.ConnectorLabel.Foursquare },
    //        { type: ConnectorsTemplate.ConnectorType.GoogleAnalytics, label: ConnectorsTemplate.ConnectorLabel.GoogleAnalytics },
    //        { type: ConnectorsTemplate.ConnectorType.Twitter, label: ConnectorsTemplate.ConnectorLabel.Twitter },
    //];

    var _listItemsDefaultView = [
        { type: ConnectorsTemplate.ConnectorType.Atlas, label: ConnectorsTemplate.ConnectorLabel.Atlas, image: ConnectorsTemplate.DefaultTile.Atlas },
        { type: ConnectorsTemplate.ConnectorType.Facebook, label: ConnectorsTemplate.ConnectorLabel.Facebook, image: ConnectorsTemplate.DefaultTile.Facebook },
        { type: ConnectorsTemplate.ConnectorType.Foursquare, label: ConnectorsTemplate.ConnectorLabel.Foursquare, image: ConnectorsTemplate.DefaultTile.Foursquare },
        { type: ConnectorsTemplate.ConnectorType.GoogleAnalytics, label: ConnectorsTemplate.ConnectorLabel.GoogleAnalytics, image: ConnectorsTemplate.DefaultTile.GoogleAnalytics },
        { type: ConnectorsTemplate.ConnectorType.Twitter, label: ConnectorsTemplate.ConnectorLabel.Twitter, image: ConnectorsTemplate.DefaultTile.Twitter }
    ];
    // Description: fill local list connectors
    // Input: list connectors
    // Output:
    function fillListConnectors(connectors) {
            _listConnectors = [];
            _listConnectors[ConnectorsTemplate.ConnectorType.Atlas] = [];
            _listConnectors[ConnectorsTemplate.ConnectorType.Facebook] = [];
            _listConnectors[ConnectorsTemplate.ConnectorType.Foursquare] = [];
            _listConnectors[ConnectorsTemplate.ConnectorType.GoogleAnalytics] = [];
            _listConnectors[ConnectorsTemplate.ConnectorType.Twitter] = [];

        for (var count = 0; count < connectors.length; count++) {
                   _listConnectors[connectors[count].type].push(connectors[count]);   
            }            
        }    

    function listConnectorsLength() {
        if (_listConnectors) {
            return (_listConnectors[ConnectorsTemplate.ConnectorType.Atlas].length +
            _listConnectors[ConnectorsTemplate.ConnectorType.Facebook].length +
            _listConnectors[ConnectorsTemplate.ConnectorType.Foursquare].length +
            _listConnectors[ConnectorsTemplate.ConnectorType.GoogleAnalytics].length +
            _listConnectors[ConnectorsTemplate.ConnectorType.Twitter].length);
        }

        return 0;
    }

    function getConnectorsCountByFilter() {
        if (_listConnectors) {
            return ({
                ga: _listConnectors[ConnectorsTemplate.ConnectorType.GoogleAnalytics].length,
                facebook: _listConnectors[ConnectorsTemplate.ConnectorType.Facebook].length,
                twitter: _listConnectors[ConnectorsTemplate.ConnectorType.Twitter].length,
                atlas: _listConnectors[ConnectorsTemplate.ConnectorType.Atlas].length,
                foursquare: _listConnectors[ConnectorsTemplate.ConnectorType.Foursquare].length,
                all: listConnectorsLength()
            });
        }
    }

    function addConnector(connectorType, connector) {
        if (!_listConnectors)
            fillListConnectors([]);
        if (connector)
            _listConnectors[connectorType].push(connector);
    }

    function filterConnectors() {
        var listFiltredConnectors;
        if (_listConnectors) {
        switch (DataSources.currentConnectorType) {
            case ConnectorsTemplate.ConnectorType.All:
                listFiltredConnectors = _listConnectors[ConnectorsTemplate.ConnectorType.Atlas].concat(
                    _listConnectors[ConnectorsTemplate.ConnectorType.Facebook],
                    _listConnectors[ConnectorsTemplate.ConnectorType.Foursquare],
                    _listConnectors[ConnectorsTemplate.ConnectorType.GoogleAnalytics],
                    _listConnectors[ConnectorsTemplate.ConnectorType.Twitter]
                );
            break;
        case ConnectorsTemplate.ConnectorType.Atlas:
            listFiltredConnectors = _listConnectors[ConnectorsTemplate.ConnectorType.Atlas];
            break;
        case ConnectorsTemplate.ConnectorType.Facebook:
            listFiltredConnectors = _listConnectors[ConnectorsTemplate.ConnectorType.Facebook];
            break;
        case ConnectorsTemplate.ConnectorType.Foursquare:
            listFiltredConnectors = _listConnectors[ConnectorsTemplate.ConnectorType.Foursquare];
            break;
        case ConnectorsTemplate.ConnectorType.GoogleAnalytics:
            listFiltredConnectors = _listConnectors[ConnectorsTemplate.ConnectorType.GoogleAnalytics];
            break;
        case ConnectorsTemplate.ConnectorType.Twitter:
            listFiltredConnectors = _listConnectors[ConnectorsTemplate.ConnectorType.Twitter];
            break;
            default:
                listFiltredConnectors = [];
            break;
        }
        return listFiltredConnectors;
    }
    }

    function sortConnectors(listFiltredConnectors, currentSortMethod) {
        return new WinJS.Promise(function(c, e, p) {
            var listSortedConnectors;
            switch (currentSortMethod) {
                case SortMethod.Alphabetic:
                    listSortedConnectors = _sortByAlphabetic(listFiltredConnectors);
                    break;
                case SortMethod.Type:
                    listSortedConnectors = _sortByType(listFiltredConnectors);
                    break;
                case SortMethod.Recent:
                    listSortedConnectors = _sortByRecent(listFiltredConnectors);
                    break;
                default:
                    listSortedConnectors = listFiltredConnectors;
                }
                c(listSortedConnectors);
            });
    }
    // add name test
    function _sortByAlphabetic(list) {
        list.sort(function (item1, item2) {
            var title1;
            var title2;
            (item1.name) ? title1 = item1.name.toLowerCase() : title1 = item1.title.toLowerCase();
            (item2.name) ? title2 = item2.name.toLowerCase() : title2 = item2.title.toLowerCase();
            if (title1 < title2) { return -1 }
            if (title1 > title2) { return 1 }
            return 0;
        });
        return list;
    }

    function _sortByType(listFiltredConnectors) {
        listFiltredConnectors.sort(function (connector1, connector2) {
            var type1 = connector1.type;
            var type2 = connector2.type;
            if (type1 < type2) { return -1 }
            if (type1 > type2) { return 1 }
            if (type1 == type2 && connector1.title.toLowerCase() < connector2.title.toLowerCase()) { return -1 }
            if (type1 == type2 && connector1.title.toLowerCase() > connector2.title.toLowerCase()) { return 1 }
            return 0;
        });
        return listFiltredConnectors;
    }

    function _sortByRecent(listFiltredConnectors) {
        listFiltredConnectors.sort(function (connector1, connector2) {
            var creationDate1 = connector1.created_at;
            var creationDate2 = connector2.created_at;
            if (creationDate1 < creationDate2) { return 1 }
            if (creationDate1 > creationDate2) { return -1 }
            return 0;
        });
        return listFiltredConnectors;
    }

    function formatConnectors(listSortedConnectors, forSearch) {
        var formattedConnectors = new Array();
       
        for(var i=0;i<listSortedConnectors.length;i++) {
            formattedConnectors.push(generateConnectorModel(listSortedConnectors[i]));
        }

        if (!forSearch) {
            formattedConnectors.push(generateNewSourceTile());
        }

        return formattedConnectors;
    }
    
    function generateNewSourceTile() {
        var newSourceItem = {};
        newSourceItem.type = ConnectorsTemplate.ConnectorType.All;

        return generateConnectorModel(newSourceItem);
    }
      
    function generateConnectorModel (connector) {

        if (connector.type != ConnectorsTemplate.ConnectorType.All) {
            return {
                key: connector.id,
                type: connector.type,
                label: CDHelper.capitaliseOnlyFirstLetter(connector.title),
                tooltip: ConnectorsTemplate.Connector.getConnectorTooltip(connector.type),
                date: "Last Update : " + CDHelper.getLastUpdate(connector.updated_at, connector.created_at),
                addType: '',
                id: connector.id,
                status: ConnectorsTemplate.Connector.getStatusLabel(connector.status),
                statusLoad: ConnectorsTemplate.Connector.getStatusLabel(connector.status),
                connectorStatusClass: "connectorStatus",
                backgroundColor: "#f1eedc",
            }
        }
        else {
            return {
                divId:  connector.type,
                type: connector.type,
                label: "",
                tooltip: ConnectorsTemplate.Connector.getConnectorTooltip(connector.type),
                date: '',
                addType: "New " + ConnectorsTemplate.Connector.getConnectorLabel(DataSources.currentFilterType) + " source",
                id: "newSource" + connector.type,
                status: "",
                statusLoad: ConnectorsTemplate.ConnectorStatusLabel.Done,
                SearchScreenName: "",
                connectorStatusClass: "newSourceText",
                backgroundColor: "transparent"
            }
        }
    }
    // Description: test if connector label exit
    // Input: connector type, connector label
    // Output: true if exist, false if not
    function isConnectorLabelExist(typeConnector, label) {
        if (_listConnectors) {
            for (var count = 0; count < _listConnectors[typeConnector].length; count++) {
                if (_listConnectors[typeConnector][count].title.toUpperCase() == label.toUpperCase())
                    return true;
            }
        }
        return false;
    }


    // Description: Verif connector label validity
    // Input: the ype of connector, input labe, error text
    // Output: boolean
    function isValidNameSource(connectorType, connectorLabel, errorTxt) {
        if (connectorLabel!="") {
            if (CDHelper.isValidFormat(connectorLabel)) {
                if (!DataSourcesHelper.isConnectorLabelExist(connectorType, connectorLabel)) {
                    return true;
            }
                else
                    errorTxt.innerText = MessagesHelper.TXT_CONNECTOR_DUPLICATED_NAME;
            }
            else
                errorTxt.innerText = MessagesHelper.TXT_CONNECTOR_SPECIAL_CARACTER;
        }
        else
            errorTxt.innerText = MessagesHelper.TXT_CONNECTOR_NAME;

        return false;
    }

    // Description: test if connector id exist
    // Input: connector type, id
    // Output: true if exist, false if not
    function isConnectorIdExist(typeConnector, id) {
        if (_listConnectors) {
            for (var count = 0; count < _listConnectors[typeConnector].length; count++) {
                if (_listConnectors[typeConnector].id == id)
                    return true;
            }
        }
        return false;
    }

    function removeConnectorFromList(typeConnector, idConnector)
    {       
        for (var count = 0; count < _listConnectors[typeConnector].length; count++)
        {
            if (_listConnectors[typeConnector][count].id == idConnector)
            {
                _listConnectors[typeConnector].splice(count, 1);
                break;
            }
        }
    }

    function getDoneConnectors(typeConnector) {
        var listDoneConnectors = []
        if (_listConnectors) {
            for (var count = 0; count < _listConnectors[typeConnector].length; count++) {
                if (_listConnectors[typeConnector][count].status == ConnectorsTemplate.ConnectorStatus.Done)
                    listDoneConnectors.push(_listConnectors[typeConnector][count]);
            }        
        }
        return listDoneConnectors;
    }

    function manageAddConnectorsErrors(error) {
        try {
            var response = JSON.parse(error.response);

            if (response.errors && response.errors.uid && response.errors.uid.length > 0) {
                var message = response.errors.uid[0];

                if (message.toLowerCase() == DataSourcesHelper.accountExistError.toLowerCase()) {
                    lbl_twSourceName_error.innerText = MessagesHelper.TXT_PROFIL_EXIST;
                }
            }
            else if (response.error)
                Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, response.error);
            else 
                Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
        }
        catch (exp) {
            Messages.showCancelMessage(MessagesHelper.MSG_SERVICE_ERROR_TITLE, MessagesHelper.MSG_SERVICE_ERROR);
        }
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name:getConnectorById
-- Description: get connector object by id
-- Params: id connector
-- Return: no one
-------------------------------------------------------*/
    function getConnectorById(id) {
        if (_listConnectors) {
            for (var typeConnector in _listConnectors) {
                for (var count = 0; count < _listConnectors[typeConnector].length; count++) {
                    if (_listConnectors[typeConnector][count].id == id)
                        return _listConnectors[typeConnector][count];
                }
            }
        }
        return false;
    }
   
    WinJS.Namespace.define("DataSourcesHelper", {
        listConnectorsType: { get: function () { return _listItemsDefaultView; } },
        fillListConnectors: fillListConnectors,
        isConnectorLabelExist: isConnectorLabelExist,
        isConnectorIdExist: isConnectorIdExist,
        isValidNameSource: isValidNameSource,
        statusLabel: { get: function() { return statusLabel; } },
        statusKey: { get: function() { return statusKey; } },
        listConnectors: { get: function() { return _listConnectors; } },
        listConnectorsLength: listConnectorsLength,
        addConnector: addConnector,
        SortMethod: SortMethod,
        filterConnectors: filterConnectors,
        sortConnectors: sortConnectors,
        listItemsDefaultView: { get: function () { return _listItemsDefaultView; } },
        formatConnectors: formatConnectors,
        generateConnectorModel: generateConnectorModel,
        filterStatusColor: filterStatusColor,
        getConnectorsCountByFilter: getConnectorsCountByFilter,
        removeConnectorFromList: removeConnectorFromList,
        menusTitles: { get: function () { return menusTitles; } },
        menusSubTitles: { get: function () { return menusSubTitles; } },
        getDoneConnectors: getDoneConnectors,
        isWebBrokerActive: { get: function () { return isWebBrokerActive; }, set: function (value) { isWebBrokerActive = value; } },
        accountExistError: { get: function () { return _SERVICE_ACCOUNT_EXIST_ERROR; } },
        manageAddConnectorsErrors: manageAddConnectorsErrors,
        getConnectorById: getConnectorById
    });

})();
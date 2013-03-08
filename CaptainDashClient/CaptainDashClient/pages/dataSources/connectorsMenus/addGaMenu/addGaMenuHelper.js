//[S.H] Creation date : 24/12/2012
(function () {

    var gaConnectorInfo = function () {
        this.connectorModelToSend = new ConnectorsTemplate.ConnectorModelToSend(ConnectorsTemplate.ConnectorType.GoogleAnalytics);
        this.accounts = null;
        this.selectedAccount = null;
        this.selectedProperty = null;
        this.SelectedProfiles = null;
        this.accessToken = null;
    }

    WinJS.Namespace.define("AddGaMenuHelper", {
        gaConnectorInfo: gaConnectorInfo,
        SELCTED_COLOR: "#FAF8EA",
        NOT_SELCTED_COLOR: "#4b3d5d",
        SELCTED_IMG: "url(/pages/datasources/images/backgroundRadioColor.png)",
        NOT_SELCTED_IMG: "",
        SHOW_DEFAULT_WIDGET: "showDefaultWidget",
        LABEL_GA_SOURCE_NAME: "labelGaSourceName",
        TXT_GA_SOURCE_NAME: "txtGaSourceName",
        ERROR_GA_SOURCE_NAME: "errorGaSourceName",
        DIV_CHECKBOX_GA_SOURCE_NAME: "divCheckboxGaSourceName",
        CHECKBOX_DFLT_WIDGET_INPUT:"checkboxDfltWidgetInput",
        SEPARATOR_GA_SOURCE_NAME: "separatorGaSourceName",
        IMG_SRC: "/images/rightMenu/separator.png",
    });

})();

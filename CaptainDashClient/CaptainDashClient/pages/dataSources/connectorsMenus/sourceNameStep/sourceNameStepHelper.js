//[S.Z] Creation date : 19/02/2013
(function () {

    var _CHECKBOX_LABEL_TXT = WinJS.Resources.getString("SourceNameStepHelper_CHECKBOX_LABEL_TXT").value;

    WinJS.Namespace.define("SourceNameStepHelper", {
        SELCTED_COLOR: "#FAF8EA",
        NOT_SELCTED_COLOR: "#4b3d5d",
        SELCTED_IMG: "url(/pages/datasources/images/backgroundRadioColor.png)",
        NOT_SELCTED_IMG: "",
        SHOW_DEFAULT_WIDGET: "showDefaultWidget",
        LABEL_CONNECTOR_SOURCE_NAME: "labelConnectorSourceName",
        TXT_CONNECTOR_SOURCE_NAME: "txtConnectorSourceName",
        ERROR_CONNECTOR_SOURCE_NAME: "errorConnectorSourceName",
        DIV_CHECKBOX_CONNECTOR_SOURCE_NAME: "divCheckboxConnectorSourceName",
        CHECKBOX_DFLT_WIDGET_INPUT: "checkboxDfltWidgetInput",
        SEPARATOR_CONNECTOR_SOURCE_NAME: "separatorConnectorSourceName",
        IMG_SRC: "/images/rightMenu/separator.png",
        CHECKBOX_LABEL_TXT: { get: function () { return _CHECKBOX_LABEL_TXT; } },
    });

})();
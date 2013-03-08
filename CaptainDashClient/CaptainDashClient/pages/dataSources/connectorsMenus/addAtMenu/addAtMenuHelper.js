//[MC] creation date : 25/12/2012

(function () {
    "use strict";
    
    var atConnectorInfo = function () {
        this.title = '';
        this.clients;
        this.agencies;
        this.selectedClients;
        this.accessToken = '';
        this.timeZone = '';
        this.username;
        this.password;
        this.client_guid;
    }

    WinJS.Namespace.define("AtMenuHelper", {
       atConnectorInfo : atConnectorInfo,
       SELCTED_COLOR : "#FAF8EA",
       NOT_SELCTED_COLOR: "#4b3d5d",
       TIME_ZONE_PARIS: "Europe/Paris",
       SELCTED_IMG: "url(/pages/datasources/images/backgroundRadioColor.png)",
       NOT_SELCTED_IMG: "",
       SHOW_DEFAULT_WIDGET: "showDefaultWidget",
       LABEL_AT_SOURCE_NAME: "labelAtSourceName",
       TXT_AT_SOURCE_NAME: "txtAtSourceName",
       ERROR_AT_SOURCE_NAME: "errorAtSourceName",
       DIV_CHECKBOX_AT_SOURCE_NAME: "divCheckboxAtSourceName",
       CHECKBOX_DFLT_WIDGET_INPUT: "checkboxDfltWidgetInput",
       SEPARATOR_AT_SOURCE_NAME: "separatorAtSourceName",
       IMG_SRC: "/images/rightMenu/separator.png",
    }); 
    
})(); 
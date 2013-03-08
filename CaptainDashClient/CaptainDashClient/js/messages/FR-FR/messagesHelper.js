(function () {
    "use strict";
    //	--------------------------------------------------------------------------
    //	Namespace: MessagesHelper 
    //	-------------------------------------------------------------------------

    WinJS.Namespace.define("MessagesHelper", {
        //DASH TYPE
        buttonsLabel: { cancel: "Cancel", close: "Close", ok: "OK", confirm: "Confirm", reconnect: "Reconnect", tryAgain: "Try Again", send: "Send", dontSend: "Don't send", delete: "Delete", remove: "remove", apply: "Apply", continue: "continue" },
        TW_ACCOUNT_EXIST: "This account doesn't exist!",
        TW_NO_ACCESS: "Man, you don't have access to this account!",
        TW_ACCOUNT_USERNAME: "Hey man, provide an account username please !",
        TXT_PROFIL_EXIST: "Profil already exist !",
        TW_API_ERROR: "Sorry, something went wrong with Twitter API !!", // TO DO
        TXT_CONNECTOR_DUPLICATED_NAME: "Give this connector a new name code!",
        TXT_CONNECTOR_NAME: "Hey man, name your connector please!",
        TXT_CONNECTOR_SPECIAL_CARACTER: "Hey man, use only letters and numbers",
        FB_SEARCH_TXT: "Hey man, what are you looking for!",
        FB_SEARCH_ERROR: "Page doesn't exist !",
        FB_INSIGHT_PROFIL_EXIST: "Facebook insight already exist !",
        TXT_INVALID_SEARCH: "You should add a valid venue and near value!",
        TXT_NO_SEARCH_RESULT: "Hey man, there is no result for this search!",
        TXT_NO_MANAGED_VENUE: "You don't have any managed venue, man!",
        AT_CREDENTIALS: "Hey man! Enter a valid credential!",
        FS_PROFILE_USED: "You've already used this profile, Please choose another one!",
        ALL_CLIENT_GUID_EXIST: "All clients GUID are already used under this agency.",
        NO_CLIENTS_GUID: "No clients GUID exist under this agency.",
        NO_PROFILS_ARE_FOUND_UNDER: "No profiles are found under ",
        TXT_DATASOURCE_EMPTY_SNAPVIEW: "Change the view to add your first source",
        TXT_DATASOURCE_EMPTY_FULLVIEW: "Connect first source to begin playing with your data",
        TXT_KPI_NAME: "Hey man, don’t forget to name your KPI!",
        TXT_PASSWORD_EMPTY: "Enter your password.",//ToDo
        TXT_PASSWORD_INCORRECT: "Password incorrect", //TODo
        TXT_PASSWORD_INVALID: "Your password is too short",//TODo
        TXT_CONFIRM_PASSWORD_EMPTY: "Please confirm your password",//ToDo 
        MSG_SIGNIN_SERVICE_ERROR: "Service error",//ToDo
        MSG_SIGNIN_INVALID_CREDENTIALS: "Invalid credentials !",
        MSG_INVALID_SAVED_CREDENTIALS: "Invalid saved credentials !",
        TXT_DASHBOARD_NAME: "Hey man, name your dashboard please!",//ToDO
        TXT_DASHBOARD_DUPLICATED_NAME: "Give this dashboard a new name code!",//ToDo
        TXT_EMAIL_INCORRECT: "Email incorrect", //ToDo
        TXT_EMAIL_EMPTY: "Enter your email.",//ToDo
        TXT_EMAIL_INVALID: "You should enter a valid email",//ToDo
        TXT_CONFIRM_EMAIL_EMPTY: "Please confirm your adress email",//ToDo
        TXT_FIRST_NAME_EMPTY: "Enter your first name",//ToDo
        TXT_LAST_NAME_EMPTY: "Enter your last name",//ToDo
        MSG_REGISTER_TITLE_ERROR: "Hey man!",//ToDo
        TXT_ACCOUNT_EXIST: "This account is already taken!", //ToDO
        TXT_VALIDATE_ACCOUNT: "Please, check your email inbox and follow the instruction to validate your account!",//ToDO
        MSG_MODIFY_GROUP_EMPTY: "Name group empty ",//TODO MC
        MSG_REMOVE_DASHBOARD_TITLE: "Are you sure you want remove this dashboard ?",//TODO
        MSG_REMOVE_DASHBOARD_TEXT: "All it's related data will be lost !",//TODO
        MSG_REMOVE_LAST_TILE_TITLE: "Are you sure you want remove this widget?",//TODO   
        MSG_REMOVE_LAST_TILE_TEXT: "Group and dashboard will be removed also !",
        MSG_REMOVE_GROUP_TITLE: "Are you sure you want to remove this group ?",
        MSG_REMOVE_ALL_TILES_TEXT: "All it's related data will be lost !",//TODO
        EMAIL_WAS_SENT_TO_YOUR_INBOX: "Email with istructions was sent to your inbox",//TODO 
        MSG_SERVICE_ERROR_TITLE: "Oops !!",
        MSG_SERVICE_ERROR: "Sorry man, something went wrong !!!",//TODO
        MSG_NO_INTERNET_TITLE: "Be careful",
        MSG_NO_INTERNET_TEXT: "No internet, no superpowers !",
        IMG_TOAST: "/images/cdLogo.png",
        MSG_CONFIRM_NEW_EXPLORATION_TITLE: "Are you sure you want to start new exploration?",
        MSG_CONFIRM_NEW_EXPLORATION_TXT: "The current exploration will be lost.", // TODO
        TXT_NAME_GROUP: "Hey man, name your group!",
        TXT_CHOOSE_GROUP: "You should choose a group",
        TXT_GROUP_ALREADY_EXIST: "Hey man, group already exist!",
        TXT_DATES_ERROR_NOT_EXIST: "Date unknown on planet earth",
        TXT_DATES_ERROR_LIMIT_DAYS: "Number of days can not exceed 120 days",// TODO
        TXT_DATES_ERROR_LIMIT_MONTHS: "Number of months can not exceed 70 months", // TODO
        TXT_DATES_ERROR_LIMIT_YEARS: "Number of years can not exceed 35 years",// TODO
        TXT_NAME_PIN_TO_DASHBOARD: "Hey man, don’t forget to name your pin!",
        TXT_CHOOSE_DASHBOARD: "You should choose a dashboard", // TODO
        ERROR_CREDENTIALS: "Sorry Man, these credentials are no longer valid",
        TXT_ADD_DASHBOARD: "You should create a new dashboard.",
        EMPTY_SEARCH: "Can' t do nuttin for ya man! Nothing entred for search.",
        EMPTY_SEARCH_TITLE: 'Aouch ...',
        MSG_UPDATE_REQUIRED_TITLE: "Captain Dash Need to be updated",
        MSG_UPDATE_REQUIRED_TEXT: "Check the Windows Store App Updates to get the latest version.",
        MSG_UPDATE_REQUIRED_LINK: "Go to the store",
        MSG_REMOVE_CREDENTIALS_TEXT: "Are you sure you want remove this credentials ? All it's related data will be lost !",//TODO
        MSG_REMOVE_CONNECTOR_TITLE: "Are you sure you want remove this source ?",
        MSG_REMOVE_CONNECTOR_TEXT: "Associated widgets will be removed also.",
        MSG_SERIES_TITLE: "Warning !",
        MSG_SERIES_EXIST: "Hey buddy, you' ve already loaded this series.",
        MSG_MODIFY_SERIE_EMPTY: "Hey man, name your chart please !",
        MSG_DUPLICATED_CHART_NAME: "Save this chart under a different name!",
        APP_EXCEPTION_MESSAGE: "Captain Dash ran into a problem that it couldn't handle. You can send info about what went wrong to help us improve Captain Dash. ",
        APP_EXCEPTION_TITLE:"Sorry :(",
        MSG_SEARCH_NOT_FOUND: "So sorry, no result for ",
        MSG_SEARCH_NOT_FOUND_TITLE: "",

    });
})();
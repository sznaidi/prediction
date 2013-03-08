// [HK] Creation date: 17/12/2012

(function () {
    "use strict";

    var _USER_SIGN_IN_URL = CdServicesHelper.baseUrlServices + CdServicesHelper.userSignInUrl;
    var _USER_SIGN_OUT_URL = CdServicesHelper.baseUrlServices + CdServicesHelper.userSignOutUrl;
    var _USERS_URL = CdServicesHelper.baseUrlServices + CdServicesHelper.usersUrl;

    /*  ------------------------------------------------------
    -- Author: MK
    -- Name: signInRequest
    -- Description: 
    -- Logs in a user via email and password
    -- Params: user= the logged user, succeed = success calback, failed = fail callback
    -- Return: logged user 
    -------------------------------------------------------*/
    
    function signInRequest(user, succeed, failed) {
        var params = JSON.stringify({ "user": user });
        var succeedCallBack = function (userInfo) {
            var user = JSON.parse(userInfo.response).user;
            LoginHelper.isLoggedIn = true;
            succeed(user);
        }
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Post, _USER_SIGN_IN_URL, params, CdServicesHelper.headers, succeedCallBack, failed);
        request.launchService();
    }

    /*  ------------------------------------------------------
   -- Author: MK
   -- Name: signUpRequest
   -- Description: 
   -- Creates a new user. The new user is automatically logged in.
   -- Params: user= the logged user, succeed = success calback, failed = fail callback
   -- Return: created user
   -------------------------------------------------------*/
    function signUpRequest(user, succeed, failed) {
        var params = JSON.stringify({ "user": user });
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Post, _USERS_URL, params, CdServicesHelper.headers, succeed, failed);
        request.launchService();
    }
    
    /*  ------------------------------------------------------
  -- Author: MK
  -- Name: signOutRequest
  -- Description: 
  -- Logs out a user.
  -- Params: user= the logged user, succeed = success calback, failed = fail callback
  -- Return: 
  -------------------------------------------------------*/
    function signOutRequest(succeed, failed) {
        var request = new CDServicesAccess.CdServices(CDServicesAccess.ServiceType.Service, CDServicesAccess.typeRequest.Delete, _USER_SIGN_OUT_URL, null, CdServicesHelper.headers, succeed, failed);
        request.launchService();
    }

    WinJS.Namespace.define("LoginServices", {
        signInRequest: signInRequest,
        signUpRequest: signUpRequest,
        signOutRequest: signOutRequest,
    });
})(); 

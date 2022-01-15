const LocalStorage = (function(){

    var _service;

    function _getService(){
        if (!_service){
            _service = this;
            return _service;
        }
        return _service;
    }

    function _setToken(data){
        if (typeof window !== 'undefined'){
        localStorage.setItem('IdToken', data.IdToken);
        localStorage.setItem('RefreshToken', data.RefreshToken);
        }
    }

    function _setIdToken(IdToken){
if (typeof window !== 'undefined'){

        localStorage.setItem('IdToken', IdToken);
}
    }

    function _setRefreshToken(RefreshToken){
if (typeof window !== 'undefined'){

        localStorage.setItem('RefreshToken', RefreshToken);
}
    }

    function _getIdToken(){
if (typeof window !== 'undefined'){

        return localStorage.getItem('IdToken');
}
    }

    function _getRefreshToken() {
if (typeof window !== 'undefined'){

        var refreshToken = localStorage.getItem('RefreshToken');
        return refreshToken;
}
    }

    function _clearToken(){
if (typeof window !== 'undefined'){

        localStorage.removeItem('IdToken');
        localStorage.removeItem('RefreshToken');
}
    }

    //
    // isAdmin
    //
    function _setIsAdmin(isAdmin){
if (typeof window !== 'undefined'){

        localStorage.setItem('isAdmin', isAdmin); 
}
    }
    function _isAdmin(){
if (typeof window !== 'undefined'){

        return localStorage.getItem('isAdmin');
}
    }

    //
    // cognitoId
    //
    function _setCognitoId(cognitoId){
if (typeof window !== 'undefined'){

        localStorage.setItem('cognitoId', cognitoId);
}
    }
    function _cognitoId(){
if (typeof window !== 'undefined'){

        return localStorage.getItem('cognitoId');
}
    }

    //
    // email
    //
    function _setEmail(email){
if (typeof window !== 'undefined'){

        localStorage.setItem('email', email);
}
    }
    function _email(){
if (typeof window !== 'undefined'){

        return localStorage.getItem('email');
}
    }

    //
    // fullName
    //
    function _setFullName(fullName){
if (typeof window !== 'undefined'){

        localStorage.setItem('fullName', fullName);
}
    }
    function _fullName(){
if (typeof window !== 'undefined'){

        return localStorage.getItem('fullName');
}
    }
    
    //
    // Constant Contact Auth Token
    //
    function _setCCAccessToken(ccAccessToken){
if (typeof window !== 'undefined'){

        localStorage.setItem('ccAccessToken', ccAccessToken);
}
    }
    function _ccAccessToken(){
if (typeof window !== 'undefined'){

        return localStorage.getItem('ccAccessToken');
}
    }

    //
    // Constant Contact Refresh Token
    //
    function _setCCRefreshToken(ccRefreshToken){
if (typeof window !== 'undefined'){

        localStorage.setItem('ccRefreshToken', ccRefreshToken);
}
    }
    function _ccRefreshToken(){
if (typeof window !== 'undefined'){

        return localStorage.getItem('ccRefreshToken');
}
    }

    function _clearAll(){
if (typeof window !== 'undefined'){

        localStorage.removeItem('IdToken');
        localStorage.removeItem('RefreshToken');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('cognitoId');
        localStorage.removeItem('email');
        localStorage.removeItem('fullName');
}
    }

    return {
        getService: _getService,
        setToken: _setToken,
        setIdToken: _setIdToken,
        setRefreshToken: _setRefreshToken,
        getIdToken: _getIdToken,
        getRefreshToken: _getRefreshToken,
        clearToken: _clearToken,

        // isAdmin
        isAdmin: _isAdmin,
        setIsAdmin: _setIsAdmin,

        // cognitoId
        cognitoId: _cognitoId,
        setCognitoId: _setCognitoId,

        // email
        email: _email,
        setEmail: _setEmail,

        // fullName
        fullName: _fullName,
        setFullName: _setFullName,

        // Constant Contact accessToken
        ccAccessToken: _ccAccessToken,
        setCCAccessToken: _setCCAccessToken,

        // Constant Contact refreshToken
        ccRefreshToken: _ccRefreshToken,
        setCCRefreshToken: _setCCRefreshToken,

        // clearAll
        clearAll: _clearAll
    }
}) ();

export default LocalStorage; 

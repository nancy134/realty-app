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
        localStorage.setItem('IdToken', data.IdToken);
        localStorage.setItem('RefreshToken', data.RefreshToken);
    }

    function _setIdToken(IdToken){
        localStorage.setItem('IdToken', IdToken);
    }

    function _setRefreshToken(RefreshToken){
        localStorage.setItem('RefreshToken', RefreshToken);
    }

    function _getIdToken(){
        return localStorage.getItem('IdToken');
    }

    function _getRefreshToken() {
        var refreshToken = localStorage.getItem('RefreshToken');
        return refreshToken;
    }

    function _clearToken(){
        localStorage.removeItem('IdToken');
        localStorage.removeItem('RefreshToken');
    }

    //
    // isAdmin
    //
    function _setIsAdmin(isAdmin){
        localStorage.setItem('isAdmin', isAdmin); 
    }
    function _isAdmin(){
        return localStorage.getItem('isAdmin');
    }

    //
    // cognitoId
    //
    function _setCognitoId(cognitoId){
        localStorage.setItem('cognitoId', cognitoId);
    }
    function _cognitoId(){
        return localStorage.getItem('cognitoId');
    }

    //
    // email
    //
    function _setEmail(email){
        localStorage.setItem('email', email);
    }
    function _email(){
        return localStorage.getItem('email');
    }

    //
    // fullName
    //
    function _setFullName(fullName){
        localStorage.setItem('fullName', fullName);
    }
    function _fullName(){
        return localStorage.getItem('fullName');
    }

    function _clearAll(){
        localStorage.removeItem('IdToken');
        localStorage.removeItem('RefreshToken');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('cognitoId');
        localStorage.removeItem('email');
        localStorage.removeItem('fullName');
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

        // clearAll
        clearAll: _clearAll
    }
}) ();

export default LocalStorage; 

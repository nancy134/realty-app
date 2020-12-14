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

    return {
        getService: _getService,
        setToken: _setToken,
        setIdToken: _setIdToken,
        setRefreshToken: _setRefreshToken,
        getIdToken: _getIdToken,
        getRefreshToken: _getRefreshToken,
        clearToken: _clearToken
    }
}) ();

export default LocalStorage; 

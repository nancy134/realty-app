import axiosInstance from './axios';

function getContacts(query){
    var url = process.env.REACT_APP_API + 'users/me/contacts';
    if (query){
        url += "?"+query;
    }
    return new Promise(function(resolve, reject){
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

function createContact(body){
    var url = process.env.REACT_APP_API + 'users/me/contacts';
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'POST',
            data: body
        };
        axiosInstance(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        }); 
    });
}

function getGroups(query){
    var url = process.env.REACT_APP_API + 'users/me/groups';
    if (query){
        url += "?" + query;
    }
    return new Promise(function(resolve, reject){
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

function createGroup(body){
    var url = process.env.REACT_APP_API + 'users/me/groups';
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'POST',
            data: body
        };
        axiosInstance(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

function getClientGroups(id){
    var url = process.env.REACT_APP_API + 'users/me/clients/' + id + '/groups';
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'GET'
        };
        axiosInstance(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

function getGroupClients(id, query){
    var url = process.env.REACT_APP_API + 'users/me/groups/' + id + '/clients';
    if (query){
        url += "?" + query;
    } 
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'GET'
        };
        axiosInstance(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

function createClientGroup(body){
    var url = process.env.REACT_APP_API + 'users/me/groups/clients';
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'POST',
            data: body
        };
        axiosInstance(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

function clientUpload(group, file){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + "clients/upload";
        var data = new FormData();
        data.append('file', file, file.name);
        data.append('group', group);
        var headers = {
           'Content-Type': 'multipart/form-data'
        };
        var options = {
            url: url,
            method: 'POST',
            headers: headers,
            data: data
        };
        axiosInstance(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        }); 
    });
}

const contacts = {
    getContacts,
    createContact,
    getGroups,
    createGroup,
    getClientGroups,
    getGroupClients,
    createClientGroup,
    clientUpload
};
export default contacts;

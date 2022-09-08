import axiosInstance from './axios';

function getUsers(query){
    var url = process.env.REACT_APP_API + 'users';
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

// This API is used to register users to receive emails
// It will create a new user account if one does not exist
function optInUser(body){
    var url = process.env.REACT_APP_API + "users";
    return new Promise(function(resolve, reject){
        axiosInstance.post(url, body).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

// This API is used to opt users out of receiving emails
// It will create a new user account if one does not exist
function optOutUser(body){
    var url = process.env.REACT_APP_API + "users";
    return new Promise(function(resolve, reject){
        axiosInstance.put(url, body).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

function getUser(){
    var url = process.env.REACT_APP_API + 'user/me';
    return new Promise(function(resolve, reject){
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

function updateUser(id, body){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'user/me';

        axiosInstance.put(url,body).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        }); 
    });
}

function getInvite(token, email){
    return new Promise(function(resolve, reject){
        // pass email
        var url = process.env.REACT_APP_API + 'users/invitations?token='+token;
        if (email){
            url = url + '&email=' + email;
        }
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            if (err.response && err.response.data)
                reject(err.response.data);
            else
                reject(err);
        });
    });
}

function acceptInvite(body){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'users/invitations';
        axiosInstance.put(url,body).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

function getUserEnums(){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'user/enums';
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
             reject(err);
        });
    });
}

function getAssociatesMe(){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'associations/me/users';
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

function inviteAssociate(body){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'associations/users/invite';
        axiosInstance.post(url, body).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            if (err.response && err.response.data)
                reject(err.response.data);
            else
                reject(err);
        });
    });
}

function removeAssociate(userId, associationId){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'associations/' + associationId + '/users/' + userId;
        axiosInstance.delete(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

function resendInvite(associationId, userId){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'associations/' + associationId + '/users/' + userId;
        axiosInstance.put(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

const users = {
    getUser,
    optInUser,
    optOutUser,
    updateUser,
    getUsers,
    getUserEnums,
    getAssociatesMe,
    inviteAssociate,
    getInvite,
    acceptInvite,
    removeAssociate,
    resendInvite
};
export default users;

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

const contacts = {
    getContacts,
    createContact
};
export default contacts;

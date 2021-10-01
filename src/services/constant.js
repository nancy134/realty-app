import axiosInstance from './axios';

function createCampaign(body){
    var url = process.env.REACT_APP_API + 'cc/emails';
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'POST',
            data: body
        }
        axiosInstance(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            if (err.response && err.response.data)
                reject(err.response.data);
            else
                reject(err);
        });

    });
}

function tokenInfo(body){
    var url = process.env.REACT_APP_API + 'cc/tokenInfo';
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

function updateCampaign(campaignId, body){
    var url = process.env.REACT_APP_API + 'cc/emails/' + campaignId;
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'PUT',
            data: body
        };
        axiosInstance(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

const constant = {
    createCampaign,
    tokenInfo,
    updateCampaign
};
export default constant;


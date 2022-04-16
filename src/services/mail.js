import axiosInstance from './axios';

export function listingInquiry(body){
    var url = process.env.REACT_APP_API + "mail/listing/inquiry";
    return new Promise(function(resolve, reject){
        var options = {
            method: 'POST',
            url: url,
            data: body
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function sendListing(body){
    var url = process.env.REACT_APP_API + "mail/sendListing";
    return new Promise(function(resolve, reject){
        var options = {
            method: 'POST',
            url: url,
            data: body
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            if (err && err.response && err.response.data){
                reject(err.response.data);
            } else {
                reject(err);
            }
        });
    });
}

export function findingcreEmails(body){
    var url = process.env.REACT_APP_MAIL_SERVICE + "findingcre/emails";
    return new Promise(function(resolve, reject){
        var options = {
            method: 'POST',
            url: url,
            data: body
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function contactUs(body){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + "mail/contactUs";
        var options = {
            method: 'POST',
            url: url,
            data: body
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

const mail = {
    listingInquiry,
    sendListing,
    findingcreEmails,
    contactUs
};
export default mail;

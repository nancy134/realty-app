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
            reject(err);
        });
    });
}

const mail = {
    listingInquiry,
    sendListing
};
export default mail;

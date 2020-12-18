import axiosInstance from './axios';

export function getClientToken(){
    var url = process.env.REACT_APP_API+"billing/getClientToken";
    return new Promise(function(resolve, reject){
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function setPaymentMethod(nonce){
    var url = process.env.REACT_APP_API+"billing/paymentMethod";
    return new Promise(function(resolve, reject){
        axiosInstance({
            method: 'post',
            url: url,
            data: {
                nonce: nonce
            }
        }).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}


const billing = {
    getClientToken,
    setPaymentMethod
};
export default billing;

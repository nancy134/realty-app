import axiosInstance from './axios';
import FormData from 'form-data';

function getImages(query){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'library/images';
        if (query){
            url += "?" + query;
        }

        var options = {
            url: url,
            method: 'GET'
        }
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

function deleteImage(id){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + "library/images/" + id;
        var options = {
            url: url,
            method: 'DELETE'
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

function uploadFiles(imagesToAdd, progressCB){
    return new Promise(function(resolve, reject){
        const promises = [];
        imagesToAdd.forEach(imageToAdd => {
            promises.push(sendRequest(imageToAdd.file, imageToAdd.order, progressCB));
        });
        Promise.all(promises).then(function(ret){
            console.log(ret);
            resolve(ret);
        }).catch(function(err){
            console.log(err);
            reject(err);
        });
    });
}
function sendRequest(file, order, progressCB){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + "library/upload";
        var data = new FormData();
        data.append('image', file, file.name);
        data.append('order', order);
        var headers = {
            'Content-Type': 'multipart/form-data'
        };
 
        var options = {
            url: url,
            method: 'POST',
            headers: headers,
            data: data
        }
        axiosInstance(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

const library = {
    getImages,
    uploadFiles,
    deleteImage
};

export default library;

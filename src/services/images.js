var rp = require('request-promise');

var uploadProgress = {};
export function uploadFiles(imagesToAdd, table, id, progressCB) {
    return new Promise((resolve, reject) => {

        const promises = [];
        imagesToAdd.forEach(imageToAdd => {
            promises.push(sendRequest(imageToAdd.file, table, id, imageToAdd.order, progressCB));
        });

        Promise.all(promises).then(function(ret){
            resolve("1");
        }).catch(function(err){
            reject(err);
        });
    });
}

function sendRequest(file, table, id, order, progressCB){
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();

        req.upload.addEventListener("progress", event => {
            if (event.lengthComputable) {
                //const copy = { ...uploadProgress };

                uploadProgress[file.name] = {
                    state: "pending",
                    percentage: (event.loaded / event.total) * 100
                };
                progressCB(uploadProgress);
            }
        });

        req.upload.addEventListener("load", event => {
            //const copy = { ...uploadProgress };
            uploadProgress[file.name] = { state: "done", percentage: 100 };
            progressCB(uploadProgress);
        });

        req.upload.addEventListener("error", event => {
            //const copy = { ...uploadProgress };
            uploadProgress[file.name] = { state: "error", percentage: 0 };
            progressCB(uploadProgress);
            reject(req.response);
        });

        uploadProgress = [];
        const formData = new FormData();
        formData.append("image", file, file.name);
        formData.append("listing_id",id);
        formData.append("order",order);
        var url = process.env.REACT_APP_LISTING_SERVICE+"upload";
        req.open("POST", url);
        req.onreadystatechange = function(){
            if (req.readyState === 4){
                if (req.status === 200) {
                    resolve(req.status);
                } else {
                    reject(req.status);
                }
            }
        };
        req.send(formData);
    });
}

export function update(data){
    return new Promise(function(resolve, reject){
        var options = {
            method: 'PUT',
            uri: process.env.REACT_APP_LISTING_SERVICE+"images/"+data.id,
            body: data,
            json: true
        };
        rp(options).then(function(parsedBody){
            resolve(parsedBody);
        }).catch(function(err){
            reject(err.error);
        });
    });
}

export function deletePromise(id)
{
    return new Promise(function(resolve, reject){
        var options = {
            method: 'DELETE',
            uri: process.env.REACT_APP_LISTING_SERVICE+"images/"+id,
            json: true
        };
        rp(options).then(function(parsedBody){
            resolve(parsedBody);
        }).catch(function(err){
            reject(err.error);
        });
    });
}

const images = {
    uploadFiles,
    deletePromise,
    update
};
export default images;

var uploadProgress = {};
export function uploadFiles(files, table, id, progressCB) {
    return new Promise((resolve, reject) => {

        const promises = [];
        files.forEach(file => {
            promises.push(sendRequest(file,table, id, progressCB));
        });

        Promise.all(promises).then(function(ret){
            resolve(ret);
        }).catch(function(err){
            reject(err);
        });
    });
}

function sendRequest(file,table, id, progressCB){
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();

        req.upload.addEventListener("progress", event => {
            if (event.lengthComputable) {
                console.log("progress: event.loaded: "+event.loaded+" event.total: "+event.total);
                //const copy = { ...uploadProgress };

                uploadProgress[file.name] = {
                    state: "pending",
                    percentage: (event.loaded / event.total) * 100
                };
                progressCB(uploadProgress);
            }
        });

        req.upload.addEventListener("load", event => {
            console.log("load copy");
            //const copy = { ...uploadProgress };
            uploadProgress[file.name] = { state: "done", percentage: 100 };
            progressCB(uploadProgress);
        });

        req.upload.addEventListener("error", event => {
            console.log("error");
            //const copy = { ...uploadProgress };
            uploadProgress[file.name] = { state: "error", percentage: 0 };
            progressCB(uploadProgress);
            reject(req.response);
        });

        uploadProgress = [];
        const formData = new FormData();
        formData.append("image", file, file.name);
        formData.append("listing_id",id);
        var url = process.env.REACT_APP_LISTING_SERVICE+"upload";
        req.open("POST", url);
        req.onreadystatechange = function(){
            if (req.readyState === 4){
                if (req.status === 200) {
                    console.log("readyState=4");
                    resolve(req.responseText);
                } else {
                    reject(req.responsetext);
                }
            }
        };
        req.send(formData);
    });
}
const images = {
    uploadFiles
};
export default images;

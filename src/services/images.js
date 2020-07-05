var uploadProgress = [];
export function uploadFiles(files, table, id, progressCB) {
    console.log("uploadFiles: table: "+table+" id: "+id);
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
                const copy = { ...uploadProgress };
                copy[file.name] = {
                    state: "pending",
                    percentage: (event.loaded / event.total) * 100
                };
                progressCB(copy);
            }
        });

        req.upload.addEventListener("load", event => {
            const copy = { ...uploadProgress };
            copy[file.name] = { state: "done", percentage: 100 };
            progressCB(copy);
        });

        req.upload.addEventListener("error", event => {
            const copy = { ...uploadProgress };
            copy[file.name] = { state: "error", percentage: 0 };
            progressCB(copy);
            reject(req.response);
        });
        const formData = new FormData();
        formData.append("image", file, file.name);
        formData.append("listing_id",id);
        var url = process.env.REACT_APP_LISTING_SERVICE+"upload";
        req.open("POST", url);
        req.onreadystatechange = function(){
            if (req.readyState === 4){
                if (req.status === 200)
                    resolve(req.responseText);
                else
                    reject(req.responsetext);
            }
        };
        req.send(formData);
    });
}
const images = {
    uploadFiles
};
export default images;

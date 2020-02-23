import React, { Component } from 'react'
import './Upload.css'
import Dropzone from './Dropzone'
import Progress from './Progress'

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            uploading: false,
            uploadProgress: {},
            successfullUploaded: false
        };

        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.renderActions = this.renderActions.bind(this);
    }
    onFilesAdded(files) {
        this.setState(prevState => ({
            files: prevState.files.concat(files)
        }));
    }
    async uploadFiles() {
        this.setState({ uploadProgress: {}, uploading: true });
        const promises = [];
        this.state.files.forEach(file => {
            promises.push(this.sendRequest(file));
        });
        try {
            await Promise.all(promises);

            this.setState({ successfullUploaded: true, uploading: false });
        } catch (e) {
        // Not Production ready! Do some error handling here instead...
        this.setState({ successfullUploaded: true, uploading: false });
    }
}

sendRequest(file){
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();

        const formData = new FormData();
        formData.append("image", file, file.name);
        formData.append("listing_id",1);
        console.log("formData: "+formData);
        req.open("POST", "https://listing-api.phowma.com/upload");
        req.send(formData);
    });
}
renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
        return (
        <div className="ProgressWrapper">
            <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
            <img
                className="CheckIcon"
                alt="done"
                src="baseline-check_circle_outline-24px.svg"
                style={{
                    opacity:
                        uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
                }}
            />
        </div>
        );
    }
}

renderActions() {
    if (this.state.successfullUploaded) {
        return (
        <button
            onClick={() =>
              this.setState({ files: [], successfullUploaded: false })
            }
        >
        Clear
        </button>
        );
    } else {
        return (
        <button
            disabled={this.state.files.length < 0 || this.state.uploading}
            onClick={this.uploadFiles}
        >
        Upload
        </button>
        );
    }
}
render() {
    return (
    <div className="Upload">
        <div className="Content">
            <div>
                <Dropzone
                    onFilesAdded={this.onFilesAdded}
                    disabled={this.state.uploading || this.state.successfullUploaded}
                />
            </div>
            <div className="Files">
                {this.state.files.map(file => {
                    return (
                        <div key={file.name} className="Row">
                            <span className="Filename">{file.name}</span>
                            {this.renderProgress(file)}
                        </div>
                    );
                })}
            </div>
        </div>
        <div className="Actions">
        {this.renderActions()}
        </div>
    </div>
    );
  }
}

export default Upload;

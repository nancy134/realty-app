import React from 'react';
import {
Container
} from 'react-bootstrap'; 
import Dropzone from './Dropzone';

class AccountLogos extends React.Component {

    render(){

        return(
            <Container>
                <Dropzone>
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    )}
                </Dropzone>
            </Container>
        );
    }
}

export default AccountLogos;

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import sha256 from 'sha256';
import { sendChecksum } from './../actions/index';


class FileUploadForm extends Component{
    constructor(props){
        super(props);
        this.state = {msg: 'Drop file here or click to upload', rejected: false}
    }

    componentWillReceiveProps(nextProps){
        this.setState({...this.state, rejected: false});
    }

    onDrop(acceptedFiles, rejectedFiles){
        if (rejectedFiles.length){
            this.setState({
                msg: 'File size is larger than 10kbs',
                rejected: true
            });
        }
        else{
            const file = acceptedFiles[0];
            let fileReader = new FileReader();
            fileReader.onload = () => {
                let sha256Checksum = sha256(new Uint8Array(fileReader.result));
                this.props.sendChecksum(sha256Checksum);
            };
            fileReader.readAsArrayBuffer(file);
        }

    }
    render(){
        return(
            <div>
                <div className="dropzone-holder">
                    <Dropzone activeClassName="active-dropzone"
                              className="dropzone"
                              onDrop={this.onDrop.bind(this)}
                              multiple={false}
                              maxSize={10000}>
                        {
                            (this.props.checksumObj && !this.state.rejected &&
                                <p className="dropzone-text">
                                    SHA256 checksum:
                                    <br/>
                                    {this.props.checksumObj.checksum}
                                    <br/>
                                    Loaded {this.props.checksumObj.count} times
                                </p>
                            ) ||
                            <p className="dropzone-text">
                                {this.state.msg}
                            </p>
                        }

                    </Dropzone>
                </div>


            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        checksumObj: state.fileChecksum.checksumObj
    };
}

export default connect(mapStateToProps, {sendChecksum})(FileUploadForm);
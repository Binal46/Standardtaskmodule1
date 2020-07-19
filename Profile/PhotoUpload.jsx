/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Image, Icon } from 'semantic-ui-react';



export default class PhotoUpload extends Component {

   

    constructor(props) {
        super(props);


        const profilePhoto = props.profilePhoto ?
            Object.assign({}, props.profilePhoto)
            : "camera.jpg";

        const profilePhotoUrl = props.profilePhotoUrl ?
            Object.assign({}, props.profilePhotoUrl)
            : "";

        this.selectFileToUpload = this.selectFileToUpload.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.maxFileSize = 2097152;
        this.acceptedFileType = ["image/gif", "image/jpeg", "image/png", "image/jpg"];

        this.state = {
            selectedFile: null,
            selectedFileName: '',
            imageSrc: '',
            showUploadButton: false
        }
    };

    selectFileToUpload() {
        document.getElementById('selectFile').click();
    }

    fileSelectedHandler(event) {

        var localSelectedFile = this.state.selectedFile;
        let localSelectedFileName = this.state.selectedFileName;
        let localImageSrc = this.state.imageSrc;

        if (event.target.files[0].size > this.maxFileSize || this.acceptedFileType.indexOf(event.target.files[0].type) == -1) {
            TalentUtil.notification.show("Max file size is 2 MB and supported file types are *.jpg, *.jpeg, *.png, *.gif", "error", null, null);
        }
        else {
            localSelectedFile = event.target.files[0],
                localSelectedFileName = event.target.files[0].name,
                localImageSrc = window.URL.createObjectURL(event.target.files[0])
        }

        this.setState({
            selectedFile: localSelectedFile,
            selectedFileName: localSelectedFileName,
            imageSrc: localImageSrc,
            showUploadButton: true
        })
    }



    fileUploadHandler(event) {
        event.preventDefault();
        var data = new FormData();
        if (this.state.selectedFile != "") {
            data.append('file', this.state.selectedFile);
        }
        console.log('selectedFile', this.state.selectedFile)
        console.log('selectedFile', this.state.selectedFileName)
        
        this.props.updateProfileData({ profilePhoto: this.state.selectedFileName });

        this.props.saveProfileData({ profilePhoto: this.state.selectedFileName });
        this.setState({ showUploadButton: false });
        /*var cookies = Cookies.get('talentAuthToken');

        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateProfilePhoto',
            headers: {
                'Authorization': 'Bearer ' + cookies
            },
            type: "POST",
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.success) {
                    this.setState({ showUploadButton: false });
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show(res.message, "error", null, null);
                }
            }.bind(this),
            error: function (res, status, error) {
                //Display error
                TalentUtil.notification.show("There is an error when updating Images - " + error, "error", null, null);
            }
        });*/

    }

    render() {
        let showProfileImg = [];
        let profileUrl = this.state.imageSrc ? this.state.imageSrc : this.props.profilePhotoUrl;

        if (profileUrl != null && profileUrl != '') {
            showProfileImg.push(<span key="imgSpan"><img style={{ height: 112, width: 112, borderRadius: 55 }} className="ui small" src={profileUrl} alt="Image Not Found" onClick={this.selectFileToUpload} /></span>);
        } else {
            showProfileImg.push(<span key="imgSpan"><i className="huge circular camera retro icon " style={{ alignContent: 'right', verticalAlign: 'top' }} onClick={this.selectFileToUpload}></i></span>);
        }

        return (
            <div className="row">
                <div className="ui sixteen wide column">
                    <section>
                        <div style={{ float: "right", marginRight: "4.0em" }}>
                            <label htmlFor="work_sample_uploader" className="profile-photo">
                                {showProfileImg}
                            </label>
                            <input id="selectFile" type="file" style={{ display: 'none' }} onChange={this.fileSelectedHandler} accept="image/*" />
                            {this.state.showUploadButton ? <div>
                                <button type="button" className="ui teal button" onClick={this.fileUploadHandler}><Icon name="upload" />Upload</button>
                            </div> : ""}
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
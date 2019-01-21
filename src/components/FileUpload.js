import React, { Component } from 'react';
import storage from '../config/firebaseConfig';
import firebase from 'firebase';
import FileList from './FileList';
import '../css/FileUpload.css';

class FileUpload extends Component {
    state = {
        files:[
            {
                name:"Asd1",
                dUrl:"asd"
            },
            {
                name:"Asd2",
                dUrl:"asd"
            }
        ]
    }

    fileUpload= (e) => {
        e.preventDefault();

        const file=document.getElementById("file").files[0];
        console.log(file);
        var reader = new FileReader();
        reader.onloadend = function (e) {
            const blob = new Blob([e.target.result], { type: "image/jpeg" });

            const storageUrl = 'images/';
            const storageRef = firebase.storage().ref(storageUrl + file.name);
            console.warn(file); // Watch Screenshot
            const uploadTask = storageRef.put(blob);
            

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
            }, function(error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

                case 'storage/canceled':
                // User canceled the upload
                break;

                case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
            }, function() {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                    // const obj = {
                    //     name: file.name,
                    //     dUrl: downloadURL
                    // };
                    // this.setState({
                    //     files: this.state.files.concat(obj)
                    // });
                    // console.log(this.state.files);
                });
            });
          
        }

        reader.onerror = function (e) {
            console.log("Failed file read: " + e.toString());
        };
        reader.readAsArrayBuffer(file);
    }

    render() {
        
        return (
            <div className="uploadBox">
                <form onSubmit={this.fileUpload}>
                    <input type="file" name="file" id="file"/>
                    <button type="submit">파일 업로드</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>파일명</th>
                            <th>다운로드 URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.files.map(file => {
                            return <FileList name={file.name} dUrl={file.dUrl} />                                
                        })}
                    </tbody>
                </table>
               
            </div>
        );
    }
}

export default FileUpload;
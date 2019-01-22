import React, { Component } from 'react';
import '../css/FileList.css';
import firebase from 'firebase';

class FileList extends Component {

    fileDownload= () => {
        const storageRef=firebase.storage().ref();
        const dUrl=this.props.dUrl;

        storageRef.child('images/stars.jpg').getDownloadURL().then(function(dUrl) {
            // `url` is the download URL for 'images/stars.jpg'
            
            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
              var blob = xhr.response;

            };
            xhr.open('GET', dUrl);
            xhr.send();
          
            // Or inserted into an <img> element:
            var img = document.getElementById('myimg');
            img.src = dUrl;
          }).catch(function(error) {
            // Handle any errors
             // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                    // File doesn't exist
                    break;

                    case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                    case 'storage/canceled':
                    // User canceled the upload
                    break;

                    case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
                }
          });
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.name}
                </td>
                <td>
                    {this.props.name}의 url
                </td>
                <td><img src="#" id="myimg"/></td>
                <td>
                    <button type="button" onClick={this.fileDownload}>파일 다운로드</button>
                </td>
            </tr>
        )
    }
}

export default FileList;
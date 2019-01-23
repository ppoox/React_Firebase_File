import React, { Component } from 'react';
import firebase from '../config/firebaseConfig';
//import firebase from 'firebase';
import FileList from './FileList';
import '../css/FileUpload.css';

class FileUpload extends Component {
    state = {
        files:[]          
    }
    fileUpload= (e) => {
        e.preventDefault();
        // 업로드할 파일정보 가져오기
        const file=e.target.file.files[0];
        // FileReader 객체 생성
        const reader = new FileReader();
        reader.onloadend = (e) => {
            // blob변수에 전달된 파라미터의 배열과 업로드할 파일 타입을 담은 객체를 저장
            const blob = new Blob([e.target.result], { type: "image/jpeg" });

            // 업로드할 파일을 저장할 스토리지의 url -> 파이어베이스 스토리지의 '폴더+파일이름' 으로 구성
            const storageUrl = 'images/'+file.name;
            // 스토리지 참조값 생성
            const storageRef = firebase.storage().ref(storageUrl);
            console.warn(file); // Watch Screenshot
            // blob(업로드할 파일 데이터가 담긴)을 업로드(put)하고 진행률에 따른 변화를 감지하기위해 변수에 저장
            const uploadTask = storageRef.put(blob);
            
            // 업로드시 진행률에 따른 변화를 감지하기위한 이벤트
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
            (snapshot) => {
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
            }, (error) => {
           // 에러 발생시 상황에 따른 대처
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
            }, () => {
                // 로드가 성공적으로 완료되면 이때부터 다운로드 url을 가져올수 있음
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    alert("업로드 완료");
                    // state에 파일이름과 스토리지 url 저장
                    const obj={
                        name:file.name,
                        storageUrl:'images/'+file.name
                    }
                    this.setState({
                        files:this.state.files.concat(obj)
                    })
                });
            });
        }

        reader.onerror = (e) => {
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
                            return <FileList key={file.storageUrl} name={file.name} storageUrl={file.storageUrl} />                                
                        })}
                    </tbody>
                </table>
               
            </div>
        );
    }
}

export default FileUpload;
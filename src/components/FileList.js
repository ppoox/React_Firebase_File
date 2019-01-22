import React, { Component } from 'react';
import '../css/FileList.css';
import firebase from 'firebase';

class FileList extends Component {

    fileDownload= (e) => {
        e.preventDefault();
        const storageRef=firebase.storage().ref();
        // 다운로드할 파일의 스토리지 url -> 스토리지의 '폴더명+파일이름'으로 구성
        const storageUrl=this.props.storageUrl;
        const dName=this.props.name;
        // 파일로 다운로드하기 위해 담을 a 태그 값 -> a 태그의 display:none
        const docA=document.getElementById("downFile");
        
        // 스토리지의 images폴더에 있는 파일명에 따른 다운로드 url가져오기 -> 가져오고 .then 내용 실행
        storageRef.child(storageUrl).getDownloadURL().then((paramUrl) => {
            //XMLHttpRequest 객체 생성
            const xhr = new XMLHttpRequest();
            //요청에 따른 받을 type 선언
            xhr.responseType = 'blob';
            //callback 요청이 성공적으로 이루어지면 실행될 함수
            xhr.onload = (e) => {
                //응답받은 데이터를 blob변수에 저장
                const blob = xhr.response;
                //다운로드를 위한 blob데이터형을 url형식으로 생성
                const url=window.URL.createObjectURL(blob);
                //a 태그에 url을 담고 download할 때의 파일 이름 저장 -> 클릭(다운)
                docA.href=url;
                docA.download=dName;
                docA.click();
            };
            // 새로 생성 된 요청을 초기화하거나 기존 요청을 다시 초기화
            xhr.open('GET', paramUrl);
            // send()서버에 요청을 보내고, 요청이 비동기 (기본값) 인 경우이 메소드는 요청이 보내지고 이벤트를 사용하여 결과가 전달되는 즉시 리턴
            // 요청이 동기이면 응답이 도착할 때까지이 메서드가 반환되지 않음
            // send()요청의 본문을 지정할 수있는 선택적 매개 변수를 허용
            // 이것은 주로와 같은 요청에 사용 -> PUT같은, 요청 메소드가 GET또는 HEAD이면 body매개 변수가 무시되고 요청 본문은로 null로 설정
            xhr.send();
           
        }).catch((error) => {
            // 에러 발생시 상황에 따른 대처
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
                <td>
                    <button type="button" onClick={this.fileDownload}>파일 다운로드</button>
                    <a href="#" id="downFile" name="downFile">다운</a>
                </td>
            </tr>
        )
    }
}

export default FileList;
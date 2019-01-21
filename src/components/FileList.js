import React, { Component }from 'react';
import '../css/FileList.css';

class FileList extends Component {

    fileDownload= () => {
        
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.name}
                </td>
                <td>
                    {this.props.dUrl}
                </td>
                <td>
                    <button type="button" onClick={this.fileDownload}>파일 다운로드</button>
                </td>
            </tr>
        )
    }
}

export default FileList;
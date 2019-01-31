import React, { Component } from "react";
import axios from "axios";

class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      file: null
    };
  }

  submitFile = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file[0]);
    axios
      .put(`/api/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNDkzMDcwZjZhNTkzZTUxNTAyZTcyMSIsImlhdCI6MTU0ODg5NjcwNSwiZXhwIjoxNTg0ODk2NzA1fQ.ZQ3HU_K4F4iNfjtniYnkfeG36yv-sE9xuWKavQ-TDJo"
        }
      })
      .then(response => {
        // handle your response;
        console.log(response);
      })
      .catch(error => {
        // handle your error
        console.log(error);
      });
  };

  handleFileUpload = event => {
    this.setState({ file: event.target.files });
  };

  render() {
    return (
      <form onSubmit={this.submitFile}>
        <input
          label="upload file"
          type="file"
          onChange={this.handleFileUpload}
        />
        <button type="submit">Send</button>
      </form>
    );
  }
}

export default FileUpload;

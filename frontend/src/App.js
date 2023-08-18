// import logo from './logo.svg';
// import './App.css';
import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [file, setFile] = useState()
  const [single, setSingle] = useState(0)
  const [multiple, setMulitple] = useState(0)
  const [multipleFiles, setMulitplefiles] = useState([])

  //save single file
  const singlefileHandler = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files[0])
    setSingle(1)
  }

  //save multiple files
  const multiplefilesHandler = (e) => {

    setMulitplefiles(e.target.files)
    setMulitple(1)
  }

  //on submit form
  const submitHandler = (e) => {
    e.preventDefault();

    if (single === 1) {
      const data = new FormData();

      data.append('file', file)
      console.log(data)
      axios.post('http://localhost:3002/api/upload/singleFile', data)
        .then(res => {
          alert("file sent successfully")
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (multiple === 1) {
      const data = new FormData();

      for (let i = 0; i < multipleFiles.length; i++) {
        data.append('files', multipleFiles[i]);
      }

      axios.post('http://localhost:3000/api/upload/multipleFiles', data)
        .then(res => {
          alert("file sent successfully")
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        <h1>
          File upload
        </h1>
        <label>Single upload </label>
        <input
          name="file"
          type="file"
          placeholder="no file chosen"
          onChange={singlefileHandler}
        />
        <label>Multiple upload </label>
        <input
          name="files"
          type="file"
          placeholder="no file chosen"
          multiple
          onChange={multiplefilesHandler}
        />
        <br />
        <button type='submit' >Send</button>
      </form>
    </React.Fragment>
  );
}

export default App;

import React from 'react'
import "./Note.scss";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { Slide } from 'react-awesome-reveal';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
export default function Note({ note, getUserNote }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let formik = useFormik({
    initialValues: {
      title: "",
      content: ""
    },
    onSubmit: updateNote
  })
  function updateNote(values) {

    axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`, values, {
      headers: {
        token: `3b8ny__${localStorage.getItem("userToken")}`
      }
    })
      .then((res) => {
        console.log(res);
        getUserNote()
      })
      .catch((error) => { console.log(error); })
      .finally(() => { handleClose(); })
  }
  function deletNotes() {
    axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`, {

      headers: {
        token: `3b8ny__${localStorage.getItem("userToken")}`
      }

    })
      .then((res) => {
        console.log(res);
        getUserNote()

      })
      .catch((error) => { console.log(error); })
  }

  return <>



    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <input onChange={formik.handleChange} className='form-control my-3' type="text" name='title' id='title' placeholder='please enter title' />
          <textarea onChange={formik.handleChange} className='form-control my-3' placeholder='please enter content' name="content" id="content"></textarea>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit}>
          Update Notes
        </Button>
      </Modal.Footer>
    </Modal>
    <div className='col-md-6 p-3 '>
      <Slide direction='up'>
        <Card>
          <Card.Body>
            <Card.Title>{note.title}</Card.Title>
            <Card.Text>
              {note.content}
            </Card.Text>
            <i variant="primary" onClick={handleShow} class="fa-regular fa-pen-to-square m-3 fa-xl"></i>
            <i onClick={deletNotes} class="fa-solid fa-trash m-3 fa-xl"></i>
          </Card.Body>
        </Card>
      </Slide>
    </div>


  </>

}

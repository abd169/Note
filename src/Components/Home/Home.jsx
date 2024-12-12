import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { noteState } from '../Atom/Atom';
import Note from '../Note/Note';
import { useEffect } from 'react';

export default function Home() {

 let[noteLength , setnoteLength] = useRecoilState(noteState);
 const [allNotes, setallNotes] = useState([]) 
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect(()=> {
       getUserNote()
  }, [])

   let formik = useFormik({
    initialValues:{
     title: "",
    content: ""
    },
    onSubmit: addnote
   })


   function addnote(values){
     axios.post(`https://note-sigma-black.vercel.app/api/v1/notes` , values ,{
      headers:{
        token : `3b8ny__${localStorage.getItem("userToken")}`
      }
     })
     .then((res)=> {
      console.log(res);
      getUserNote()
      })
      .catch((error)=> {
        console.log(error);
      })
      .finally(()=>  {handleClose()})
     
   }

   function getUserNote(){

    axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`,{
      headers:{
        token : `3b8ny__${localStorage.getItem("userToken")}`
      }
    })
    .then((res)=> {
      console.log(res);
      setnoteLength(res.data.notes.length)
      setallNotes(res.data.notes)
      })
      .catch((error) => {
        console.log(error);
        
      })
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
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
    
        <div className="overflow-hidden">
        <div className="row">
          <div className="col-2">
            <div className="position-fixed col-lg-2">
              <Sidebar />
            </div>
          </div>

          <div className="col-10 px-lg-5 px-2 py-5">
            <div className="text-end me-2">
              <button variant="primary" onClick={handleShow} className="btn btn-info text-white">
                <i className="fa-solid fa-plus"></i> Add Note
              </button>
            </div>
            <div className="row ">
              {allNotes.map((note) => {
                return <Note key={note._id} note={note} getUserNote = {getUserNote}/>
              })}
            </div>
          </div>
        </div>
      </div>
    
  </>
}

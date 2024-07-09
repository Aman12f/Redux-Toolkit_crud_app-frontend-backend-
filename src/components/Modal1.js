import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editUser } from '../features/UseReducer';
import { useDispatch } from 'react-redux'
import { useRef } from 'react';
import { updateUser } from '../features/UseReducer';

const Modal1 = forwardRef((props, ref) => {
  const closeRef = useRef();
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const [note, setNote] = useState({ id: "", name: "", email: "" });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => ({
    openModal: (note) => {
      setNote(note);
      handleShow();
    },
  }));

  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleOnClick = (note)=>{
    // dispatch(editUser(note))
    dispatch(updateUser(note))
    closeRef.current.click();
    console.log("handleOnClick function ");
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{ display: 'none' }}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="id">Roll No</label>
              <input
                type="text"
                className="form-control"
                id="id"
                placeholder="Enter Id"
                required
                minLength={10}
                name="id"
                value={note.id}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Name"
                required
                minLength={2}
                name="name"
                value={note.name}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                required
                name="email"
                value={note.email}
                onChange={handleOnChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} ref={closeRef}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleOnClick(note)}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default Modal1;

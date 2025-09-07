import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/UserService';
import { toast }  from 'react-toastify';

const ModalDeleteUser = (props) => {
    const {show, handleClose, handleShow, dataUserDelete, handleDeleteUserFromModal} = props

    const handleDelete = async () => {
        let res = await deleteUser(dataUserDelete.id)
        if(res){
            handleClose()
            handleDeleteUserFromModal(dataUserDelete)
            toast.success("Deleted successfully!")
        }
        else{
            toast.error("Error while deleting user!")
        }
    }

    return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            This action can't be undone! Do you want to delete this user?
           <br></br>
           <b>user email: {dataUserDelete.email}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser
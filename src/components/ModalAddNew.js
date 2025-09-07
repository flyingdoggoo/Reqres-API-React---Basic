import { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { createNewUser } from "../services/UserService"
import { toast, Bounce } from 'react-toastify';

const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props
    const [ name, setName ] = useState("")
    const [ job, setJob] = useState("")
    const handleSaveUsers = async () => {
        let res = await createNewUser(name, job);
        console.log(">>> check ", res)
        if(res){
            handleClose()
            setName('')
            setJob('')
            toast('Create New User Succeeded!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            handleUpdateTable({first_name: name, id: res.id})
        }
        else{
            toast.error("Error occurred!")
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className='form-control'
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Job</label>
                            <input  
                                type="text"
                                className="form-control"
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUsers()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew
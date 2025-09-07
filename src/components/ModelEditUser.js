import { useEffect, useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { toast, Bounce } from 'react-toastify';
import { editUser } from "../services/UserService";
const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props
    const [ name, setName ] = useState("")
    const [ job, setJob] = useState("")

    const handleEditUsers = async () => {
        let res = await editUser(name, job, dataUserEdit.id)
        if(res && res.updatedAt){
            handleClose()
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id
            })
            toast('Edit User Succeeded!', {
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
        }
        else{
            toast.error("Error occurred!")
        }
    }
    useEffect(() => {
        if(show){
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit])

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleEditUsers()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUser
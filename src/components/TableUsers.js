import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import { useState } from 'react';
import ReactPaginate from 'react-paginate'
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModelEditUser';
import ModalDeleteUser from './ModalDelete';
import _ from "lodash"
import { CSVLink } from "react-csv";
import Papa from 'papaparse';
import { toast } from 'react-toastify';
const TableUsers = (props) => {

    const [listUsers, setListUsers] = useState([])
    const [originalListUsers, setOriginalListUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataUserEdit, setDataUserEdit] = useState({})
    const [dataUserDelete, setDataUserDelete] = useState({})
    const [sortBy, setSortBy] = useState("asc")
    const [sortField, setSortField] = useState("id")

    useEffect(() => {
        getUsers(1)
    }, [])

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy)
        setSortField(sortField)
        let cloneListUser = _.cloneDeep(listUsers)
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy])
        setListUsers(cloneListUser)
    }
    const getUsers = async (page) => {
        let res = await fetchAllUser(page)
        if (res && res.data) {
            setTotalUsers(res.total)
            setListUsers(res.data)
            setOriginalListUsers(res.data)
            setTotalPages(res.total_pages)
        }
    }
    const handleEditUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers)
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUser[index].first_name = user.first_name
        setListUsers(cloneListUser)
    }
    const handleDeleteUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers)
        cloneListUser = cloneListUser.filter(item => item.id !== user.id)
        setListUsers(cloneListUser)
    }
    const handlePageClick = (event) => {
        getUsers(+event.selected + 1)
    }
    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    }
    const handleEditUser = (user) => {
        setDataUserEdit(user)
        setIsShowModalEdit(true)
    }
    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true)
        setDataUserDelete(user)
        // console.log(user)
    }
    const searchByEmail = (e) => {
        let email = e.target.value
        let cloneListUser = _.cloneDeep(originalListUsers)
        if (email) {
            cloneListUser = cloneListUser.filter(item => item.email.includes(email))
        }
        setListUsers(cloneListUser)
    }
    const parseCSV = (file) => {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    resolve(results)
                },
                error: (error) => {
                    reject(error)
                }
            })
        })
    }
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            let newData = await parseCSV(file);
            e.target.value = ""
            if(newData && newData.data && newData.data.length > 0){
                setListUsers(newData.data)
                // setOriginalListUsers(cloneListUser)
            }
            toast.success("Import CSV file successfully!")
            console.log('Current data:', listUsers);
        }
        else{
            toast.error("Error import CSV file!")
        }

    }
    return (<>
        <div className='my-3 d-flex justify-content-between align-items-center'>
            <span><b>List Users:</b></span>
            <div className="d-flex gap-3">
                <label className="btn btn-warning" htmlFor="input-file">Import</label>
                <input
                    id="input-file"
                    type="file"
                    accept='.csv'
                    onChange={(e) => handleFileUpload(e)}
                    hidden />
                <CSVLink filename="users.csv" data={listUsers} className="btn btn-primary">Export</CSVLink>
                <button className='btn btn-success'
                    onClick={() => setIsShowModalAddNew(true)}
                >Add new user</button>
            </div>

        </div>
        <div>
            <input
                placeholder='Search by email...'
                type='text'
                className='form-control mb-3 w-25'
                onChange={(e) => searchByEmail(e)}
            ></input>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID
                        <i className="fa-solid fa-sort"
                            onClick={() => {
                                let sortBy_tem = (sortBy === "asc") ? "desc" : "asc"
                                let sortField_tem = "id"
                                handleSort(sortBy_tem, sortField_tem)
                            }}
                        ></i>
                    </th>
                    <th>Email</th>
                    <th>First Name
                        <i className="fa-solid fa-sort"
                            onClick={() => {
                                let sortBy_tem = (sortBy === "asc") ? "desc" : "asc"
                                let sortField_tem = "first_name"
                                handleSort(sortBy_tem, sortField_tem)
                            }}
                        ></i>
                    </th>
                    <th>Last Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 &&
                    listUsers.map((item, index) => {
                        return (
                            <tr key={`users-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.email}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>
                                    <button
                                        className="btn btn-warning mx-3"
                                        onClick={() => handleEditUser(item)}
                                    >Edit</button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteUser(item)}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }

            </tbody>
        </Table>
        <div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}

                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
            />
        </div>
        <ModalAddNew
            show={isShowModalAddNew}
            handleClose={() => setIsShowModalAddNew(false)}
            handleUpdateTable={handleUpdateTable}
        />
        <ModalEditUser
            show={isShowModalEdit}
            handleClose={() => setIsShowModalEdit(false)}
            dataUserEdit={dataUserEdit}
            handleEditUserFromModal={handleEditUserFromModal}
        />
        <ModalDeleteUser
            show={isShowModalDelete}
            handleClose={() => setIsShowModalDelete(false)}
            dataUserDelete={dataUserDelete}
            handleDeleteUserFromModal={handleDeleteUserFromModal}
        />
    </>)
}

export default TableUsers
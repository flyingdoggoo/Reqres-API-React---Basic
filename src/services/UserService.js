import instance from "./axios"
const fetchAllUser = (page) => {
    return instance.get(`/api/users?page=${page}`)
}

const createNewUser = (name, job) => {
    return instance.post(`/api/users`, {name, job})
}

const editUser = (name, job, id) => {
    return instance.put(`/api/users/${id}`, {name, job})
}

const deleteUser = (id) => {
    return instance.delete(`/api/user/${id}`)
}

export {fetchAllUser, createNewUser, editUser, deleteUser}
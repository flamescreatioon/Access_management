import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '@/lib/apiClient.js'
import { useAuth } from '@/context/AuthContext.jsx'

const UsersContext = createContext()
export const useUsers = () => useContext(UsersContext)

// Initially empty, populated from backend
const initialUsers = []

export function UsersProvider({ children }) {
  const [users, setUsers] = useState(initialUsers)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const fetchUsers = async () => {
    if(!token){ setUsers([]); return }
    setLoading(true); setError(null)
    try {
      const data = await api.admin.listUsers(token)
      setUsers(data.users || [])
    } catch (err){ setError(err.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchUsers() }, [token])

  const mutateRole = async (userId, role) => {
    const previous = [...users]
    try {
      setUsers(u => u.map(x => x.id === userId ? { ...x, role } : x))
      await api.admin.updateRole(token, userId, role)
    } catch (err) {
      setUsers(previous)
      throw err
    }
  }

  const createUser = async (payload) => {
    try {
      await api.admin.createUser(token, payload)
      await fetchUsers()
    } catch (err){ setError(err.message); throw err }
  }

  const updateUser = async (id, patch) => {
    const previous = [...users]
    try {
      setUsers(u => u.map(x => x.id === id ? { ...x, ...patch } : x))
      await api.admin.updateUser(token, id, patch)
    } catch (err) {
      setUsers(previous); throw err
    }
  }

  const deleteUser = async (id) => {
    const previous = [...users]
    try {
      setUsers(u => u.filter(x => x.id !== id))
      await api.admin.deleteUser(token, id)
    } catch (err) {
      setUsers(previous); throw err
    }
  }

  const approveUser = async (userId) => {
    const previous = [...users]
    try {
      setUsers(u => u.map(x => x.id === userId ? { ...x, status: 'approved' } : x))
      await api.admin.approveUser(token, userId)
    } catch (err) {
      setUsers(previous); throw err
    }
  }

  const rejectUser = async (userId) => {
    const previous = [...users]
    try {
      setUsers(u => u.map(x => x.id === userId ? { ...x, status: 'rejected' } : x))
      await api.admin.rejectUser(token, userId)
    } catch (err) {
      setUsers(previous); throw err
    }
  }

  return (
    <UsersContext.Provider value={{ users, loading, error, mutateRole, approveUser, rejectUser, createUser, updateUser, deleteUser, refresh: fetchUsers }}>
      {children}
    </UsersContext.Provider>
  )
}

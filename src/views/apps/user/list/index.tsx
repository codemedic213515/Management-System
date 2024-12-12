// src/views/apps/user/list/index.tsx

'use client' // Mark this component as a Client Component

import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import UserListTable from './UserListTable'
import UserListCards from './UserListCards'
import type { UsersType } from '@/types/apps/userTypes'

const UserList = () => {
  const [userData, setUserData] = useState<UsersType[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user-list')
        console.log('Response:', response) // Log response for debugging
        if (!response.ok) throw new Error('Failed to fetch users')
        const data = await response.json()
        setUserData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUsers()
  }, [])

  if (error) return <div>Error: {error}</div> // Display error if any

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListCards />
      </Grid>
      <Grid item xs={12}>
        <UserListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default UserList

'use client'

// React Imports
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'

const ChangePassword = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const searchParams = useSearchParams() // Get search params
  const id = searchParams.get('id') // Retrieve the 'id' parameter
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/user-list?id=${id}`)
          if (response.ok) {
            const data = await response.json()
            setUserData(data)
          } else {
            console.error('Failed to fetch user data:', response.statusText)
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      } else if (session?.user?.id) {
        try {
          const response = await fetch(`/api/user-list?id=${session.user.id}`)
          if (response.ok) {
            const data = await response.json()
            setUserData(data)
          } else {
            console.error('Failed to fetch user data:', response.statusText)
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
    }

    fetchData()
  }, [session, id])

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (!userData) {
    return <p>No user data found.</p>
  }

  console.log(userData)

  const handleChangePassword = async () => {
    // Reset messages
    setErrorMessage('')
    setSuccessMessage('')

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    // Send request to update password
    try {
      const response = await fetch(`/api/user-list`, {
        // Assuming you have an endpoint for updating the password
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: userData.id,
          password: newPassword
        })
      })

      if (response.ok) {
        setSuccessMessage('Password changed successfully!')
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.message || 'Failed to change password.')
      }
    } catch (error) {
      console.error('Error changing password:', error)
      setErrorMessage('An error occurred while changing your password.')
    }
  }

  return (
    <Card>
      <CardHeader title='Change Password' />
      <CardContent className='flex flex-col gap-4'>
        <Alert icon={false} severity='warning' onClose={() => {}}>
          <AlertTitle>Ensure that these requirements are met</AlertTitle>
          Minimum 8 characters long, uppercase & symbol
        </Alert>

        {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
        {successMessage && <Alert severity='success'>{successMessage}</Alert>}

        <form>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='New Password'
                type={isPasswordShown ? 'text' : 'password'}
                onChange={e => setNewPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={() => setIsPasswordShown(!isPasswordShown)}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Confirm Password'
                type={isConfirmPasswordShown ? 'text' : 'password'}
                onChange={e => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isConfirmPasswordShown ? 'ri-eye-off-line text-xl' : 'ri-eye-line text-xl'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} className='flex gap-4'>
              <Button variant='contained' onClick={handleChangePassword}>
                Change Password
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ChangePassword

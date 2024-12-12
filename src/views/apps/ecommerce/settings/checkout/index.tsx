'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CustomerContact from './CustomerContact'
import CustomerInformation from './CustomerInformation'

const Checkout = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CustomerContact />
      </Grid>
      <Grid item xs={12}>
        <CustomerInformation />
      </Grid>
    </Grid>
  )
}

export default Checkout

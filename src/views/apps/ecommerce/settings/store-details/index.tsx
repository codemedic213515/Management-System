'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import Profile from './Profile'
import BillingInformation from './BillingInformation'
import TimeZone from './TimeZone'
import StoreCurrency from './StoreCurrency'
import OrderIdFormat from './OrderIdFormat'

const StoreDetails = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Profile />
      </Grid>
      <Grid item xs={12}>
        <BillingInformation />
      </Grid>
      <Grid item xs={12}>
        <TimeZone />
      </Grid>
      <Grid item xs={12}>
        <StoreCurrency />
      </Grid>
      <Grid item xs={12}>
        <OrderIdFormat />
      </Grid>
    </Grid>
  )
}

export default StoreDetails

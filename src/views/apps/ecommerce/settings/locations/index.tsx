// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import LocationName from './LocationName'
import Address from './Address'

const Locations = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <LocationName />
      </Grid>
      <Grid item xs={12}>
        <Address />
      </Grid>
    </Grid>
  )
}

export default Locations

// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { OrderType } from '@/types/apps/ecommerceTypes'

// Component Imports
import OrderDetailHeader from './OrderDetailHeader'
import OrderDetailsCard from './OrderDetailsCard'
import ShippingActivity from './ShippingActivityCard'
import CustomerDetails from './CustomerDetailsCard'
import ShippingAddress from './ShippingAddressCard'
import BillingAddress from './BillingAddressCard'

const OrderDetails = ({ orderData, order }: { orderData?: OrderType; order: string }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <OrderDetailHeader orderData={orderData} order={order} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <OrderDetailsCard />
          </Grid>
          <Grid item xs={12}>
            <ShippingActivity order={order} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CustomerDetails orderData={orderData} />
          </Grid>
          <Grid item xs={12}>
            <ShippingAddress />
          </Grid>
          <Grid item xs={12}>
            <BillingAddress />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OrderDetails

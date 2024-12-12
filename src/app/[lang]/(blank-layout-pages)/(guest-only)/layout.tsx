// Type Imports
import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'

// HOC Imports
import GuestOnlyRoute from '@/hocs/GuestOnlyRoute'

const Layout = ({ children, params }: ChildrenType & { params: { lang: Locale } }) => {
  return <GuestOnlyRoute lang={params.lang}>{children}</GuestOnlyRoute>
}

export default Layout

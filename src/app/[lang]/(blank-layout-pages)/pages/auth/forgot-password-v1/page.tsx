// Component Imports
import ForgotPasswordV1 from '@views/pages/auth/ForgotPasswordV1'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const ForgotPasswordV1Page = () => {
  // Vars
  const mode = getServerMode()

  return <ForgotPasswordV1 mode={mode} />
}

export default ForgotPasswordV1Page

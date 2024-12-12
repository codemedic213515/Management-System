// Component Imports
import ResetPasswordV1 from '@views/pages/auth/ResetPasswordV1'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const ResetPasswordV1Page = () => {
  // Vars
  const mode = getServerMode()

  return <ResetPasswordV1 mode={mode} />
}

export default ResetPasswordV1Page

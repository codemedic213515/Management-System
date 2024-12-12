// Component Imports
import RegisterV1 from '@views/pages/auth/RegisterV1'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const RegisterV1Page = () => {
  // Vars
  const mode = getServerMode()

  return <RegisterV1 mode={mode} />
}

export default RegisterV1Page

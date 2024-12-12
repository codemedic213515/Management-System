// Component Imports
import TwoStepsV1 from '@views/pages/auth/TwoStepsV1'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const TwoStepsV1Page = () => {
  // Vars
  const mode = getServerMode()

  return <TwoStepsV1 mode={mode} />
}

export default TwoStepsV1Page

// 'use client'

// // React Imports
// import { useState } from 'react'

// // Next Imports
// import Link from 'next/link'
// import { useParams } from 'next/navigation'

// // MUI Imports
// import Typography from '@mui/material/Typography'
// import TextField from '@mui/material/TextField'
// import IconButton from '@mui/material/IconButton'
// import InputAdornment from '@mui/material/InputAdornment'
// import Checkbox from '@mui/material/Checkbox'
// import Button from '@mui/material/Button'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Divider from '@mui/material/Divider'

// // Third-party Imports
// import classnames from 'classnames'

// // Type Imports
// import type { Mode } from '@core/types'
// import type { Locale } from '@configs/i18n'

// // Component Imports
// import Logo from '@components/layout/shared/Logo'
// import Illustrations from '@components/Illustrations'

// // Hook Imports
// import { useImageVariant } from '@core/hooks/useImageVariant'
// import { useSettings } from '@core/hooks/useSettings'

// // Util Imports
// import { getLocalizedUrl } from '@/utils/i18n'

// const RegisterV2 = ({ mode }: { mode: Mode }) => {
//   // States
//   const [isPasswordShown, setIsPasswordShown] = useState(false)

//   // Vars
//   const darkImg = '/images/pages/auth-v2-mask-dark.png'
//   const lightImg = '/images/pages/auth-v2-mask-light.png'
//   const darkIllustration = '/images/illustrations/auth/v2-register-dark.png'
//   const lightIllustration = '/images/illustrations/auth/v2-register-light.png'
//   const borderedDarkIllustration = '/images/illustrations/auth/v2-register-dark-border.png'
//   const borderedLightIllustration = '/images/illustrations/auth/v2-register-light-border.png'

//   // Hooks
//   const { lang: locale } = useParams()
//   const authBackground = useImageVariant(mode, lightImg, darkImg)
//   const { settings } = useSettings()

//   const characterIllustration = useImageVariant(
//     mode,
//     lightIllustration,
//     darkIllustration,
//     borderedLightIllustration,
//     borderedDarkIllustration
//   )

//   const handleClickShowPassword = () => setIsPasswordShown(show => !show)

//   return (
//     <div className='flex bs-full justify-center'>
//       <div
//         className={classnames(
//           'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
//           {
//             'border-ie': settings.skin === 'bordered'
//           }
//         )}
//       >
//         <div className='plb-12 pis-12'>
//           <img
//             src={characterIllustration}
//             alt='character-illustration'
//             className='max-bs-[500px] max-is-full bs-auto'
//           />
//         </div>
//         <Illustrations
//           image1={{ src: '/images/illustrations/objects/tree-3.png' }}
//           image2={null}
//           maskImg={{ src: authBackground }}
//         />
//       </div>
//       <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
//         <Link
//           href={getLocalizedUrl('/', locale as Locale)}
//           className='absolute block-start-5 sm:block-start-[38px] inline-start-6 sm:inline-start-[38px]'
//         >
//           <Logo />
//         </Link>

//         <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
//           <div>
//             <Typography variant='h4'>Adventure starts here 🚀</Typography>
//             <Typography className='mbe-1'>Make your app management easy and fun!</Typography>
//           </div>
//           <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='flex flex-col gap-5'>
//             <TextField autoFocus fullWidth label='Username' />
//             <TextField fullWidth label='Email' />
//             <TextField
//               fullWidth
//               label='Password'
//               type={isPasswordShown ? 'text' : 'password'}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position='end'>
//                     <IconButton
//                       size='small'
//                       edge='end'
//                       onClick={handleClickShowPassword}
//                       onMouseDown={e => e.preventDefault()}
//                     >
//                       <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
//                     </IconButton>
//                   </InputAdornment>
//                 )
//               }}
//             />
//             <div className='flex justify-between items-center gap-3'>
//               <FormControlLabel
//                 control={<Checkbox />}
//                 label={
//                   <>
//                     <span>I agree to </span>
//                     <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
//                       privacy policy & terms
//                     </Link>
//                   </>
//                 }
//               />
//             </div>
//             <Button fullWidth variant='contained' type='submit'>
//               Sign Up
//             </Button>
//             <div className='flex justify-center items-center flex-wrap gap-2'>
//               <Typography>Already have an account?</Typography>
//               <Typography component={Link} href='/login' color='primary'>
//                 Sign in instead
//               </Typography>
//             </div>
//             <Divider className='gap-3'>or</Divider>
//             <div className='flex justify-center items-center gap-2'>
//               <IconButton size='small'>
//                 <i className='ri-facebook-fill text-facebook' />
//               </IconButton>
//               <IconButton size='small'>
//                 <i className='ri-twitter-fill text-twitter' />
//               </IconButton>
//               <IconButton size='small'>
//                 <i className='ri-github-fill text-github' />
//               </IconButton>
//               <IconButton size='small'>
//                 <i className='ri-google-fill text-googlePlus' />
//               </IconButton>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RegisterV2

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, minLength, string, email, pipe, nonEmpty } from 'valibot'
import classnames from 'classnames'
import type { SubmitHandler } from 'react-hook-form'
import type { InferInput } from 'valibot'
import type { Mode } from '@core/types'
import type { Locale } from '@configs/i18n'
import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { getLocalizedUrl } from '@/utils/i18n'

const schema = object({
  username: pipe(string(), minLength(1, 'Username is required')),
  email: pipe(string(), minLength(1, 'Email is required'), email('Please enter a valid email address')),
  password: pipe(
    string(),
    nonEmpty('Password is required'),
    minLength(8, 'Password must be at least 8 characters long')
  )
})

type FormData = InferInput<typeof schema>

const Register = ({ mode }: { mode: Mode }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState<string | null>(null)

  const router = useRouter()
  const { lang: locale } = useParams()
  const { settings } = useSettings()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: valibotResolver(schema)
  })

  const darkImg = '/images/pages/auth-v2-mask-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-register-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-register-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-register-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-register-light-border.png'

  const authBackground = useImageVariant(mode, lightImg, darkImg)
  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        router.push('/login')
      } else {
        const errorData = await response.json()
        setErrorState(errorData.message)
      }
    } catch (error) {
      setErrorState('An error occurred during registration')
    }
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          { 'border-ie': settings.skin === 'bordered' }
        )}
      >
        <div className='plb-12 pis-12'>
          <img
            src={characterIllustration}
            alt='character-illustration'
            className='max-bs-[500px] max-is-full bs-auto'
          />
        </div>
        <Illustrations
          image1={{ src: '/images/illustrations/objects/tree-3.png' }}
          image2={null}
          maskImg={{ src: authBackground }}
        />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link
          href={getLocalizedUrl('/', locale as Locale)}
          className='absolute block-start-5 sm:block-start-[38px] inline-start-6 sm:inline-start-[38px]'
        >
          <Logo />
        </Link>
        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
          <div>
            <Typography variant='h4'>Adventure starts here 🚀</Typography>
            <Typography className='mbe-1'>Make your app management easy and fun!</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
            <Controller
              name='username'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  fullWidth
                  label='Username'
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Email'
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Password'
                  type={isPasswordShown ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          size='small'
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={e => e.preventDefault()}
                        >
                          <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={
                <>
                  <span>I agree to </span>
                  <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                    privacy policy & terms
                  </Link>
                </>
              }
            />
            {errorState && <Typography color='error'>{errorState}</Typography>}
            <Button fullWidth variant='contained' type='submit'>
              Sign Up
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>Already have an account?</Typography>
              <Typography component={Link} href='/login' color='primary'>
                Sign in instead
              </Typography>
            </div>
          </form>
          <Divider className='gap-3'>or</Divider>
          <div className='flex justify-center items-center gap-2'>
            <IconButton size='small'>
              <i className='ri-facebook-fill text-facebook' />
            </IconButton>
            <IconButton size='small'>
              <i className='ri-twitter-fill text-twitter' />
            </IconButton>
            <IconButton size='small'>
              <i className='ri-github-fill text-github' />
            </IconButton>
            <IconButton size='small'>
              <i className='ri-google-fill text-googlePlus' />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

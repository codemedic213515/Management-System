import * as fs from 'fs'

import { consola } from 'consola'

// Update the main layout file
export const updateLayoutFile = async () => {
  consola.start('Updating layout file...')

  // Using fs.promises API for reading and writing files asynchronously
  let layoutFileContent = await fs.promises.readFile('src/app/layout.tsx', 'utf8')

  // Modify the file content as needed
  layoutFileContent = layoutFileContent
    .replace(/\{ children, params \}/, '{ children }')
    .replace(/lang={params.lang}/g, "lang='en'")
    .replace(/ & { params: { lang: Locale } }/, '')
    .replace(/const headersList.*/, '')
    .replace(/<TranslationWrapper[^>]*>([\s\S]*?)<\/TranslationWrapper>/, '$1')

  // Write the modified content back to the file
  await fs.promises.writeFile('src/app/layout.tsx', layoutFileContent)
  consola.success('Layout file updated successfully\n')
}

// Update Private routes Layout file
export const updateDashboardLayoutFile = async () => {
  consola.start('Updating dashboard layout file...')

  const filePath = 'src/app/(dashboard)/(private)/layout.tsx'

  let content = await fs.promises.readFile(filePath, 'utf8')

  // Add disableDirection to <Customizer> if not already present
  content = content
    .replace(/<Customizer((?!disableDirection)[^>]*?)\/?>/g, `<Customizer$1 disableDirection />`)
    .replace(/const dictionary = await getDictionary\(params.lang\)\n?/, '')
    .replace(/(AuthGuard\s*[^>]*?)locale={params.lang}(.*?>)/, '$1$2')

  await fs.promises.writeFile(filePath, content)
  consola.success('Added disabledDirection prop in customizer component\n')
}

// Update Guest routes Layout file
export const updateGuestLayoutFile = async () => {
  consola.start('Updating guest layout file...')

  const filePath = 'src/app/(blank-layout-pages)/(guest-only)/layout.tsx'

  let content = await fs.promises.readFile(filePath, 'utf8')

  content = content.replace(/lang={params.lang}/, '')

  await fs.promises.writeFile(filePath, content)
}

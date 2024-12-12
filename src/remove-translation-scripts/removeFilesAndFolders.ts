import { consola } from 'consola'

const fs = require('fs').promises
const path = require('path')

export const removeFilesAndFolders = async () => {
  consola.start('Removing unused files and folders related to i18n...')

  const pathsToDelete = [
    'src/configs/i18n.ts',
    'src/utils/i18n.ts',
    'src/utils/getDictionary.ts',
    'src/components/LangRedirect.tsx',
    'src/hocs/TranslationWrapper.tsx',
    'src/data/dictionaries'
  ]

  for (const filePath of pathsToDelete) {
    await fs.rm(path.resolve(filePath), { recursive: true, force: true })
  }

  consola.success('Removed unused files and folders related to i18n successfully\n')
}

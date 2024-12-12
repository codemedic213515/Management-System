import { consola } from 'consola'

const fs = require('fs')
const util = require('util')

const { globby } = require('globby')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

// Pattern to find `getLocalizedUrl('/any-url', locale as Locale)` and capture the URL
const getUrlPattern = /getLocalizedUrl\((['"`]\/)(.*)(['"`]), locale as Locale\)/g
const getUrlPattern2 = /getLocalizedUrl\((.*), locale as Locale\)/g
const getUrlPattern3 = /getLocalizedUrl\((.*), lang\)/g

const getDictionaryPropPattern = /dictionary={dictionary}/g

const getDictionaryPropPattern2 =
  /\{\s*dictionary\s*\}\s*:\s*\{\s*dictionary\s*:\s*Awaited<ReturnType<typeof getDictionary>>\s*\}/g

const getDictionaryPropFromType = /(dictionary\s*:\s*Awaited<ReturnType<typeof\s*getDictionary>>),?/g

const getDictionaryProp = /const\s+dictionary\s+=\s+await\s+getDictionary\(params\.lang\)\s*/g

const replaceDirectionPattern = /const direction\s*=\s*i18n.langDirection\[params.lang\]/g

const removeDictionaryDestructuringPattern = /dictionary(,| )/g

// Pattern to match Props type definitions including `params`
const removeParamsFromPropsPattern = /&\s*{\s*params:\s*{\s*lang:\s*Locale\s*}\s*}/g

const removeParamsFromPropsPattern2 = /\{ params \}: \{ params: \{ lang: Locale \} \}/

const removeParamsFromFunctionPattern = /(?<={ .*)params,?(?=.* }: [A-Z][A-Za-z]+)/g

const excludeLangPattern = /excludeLang\??:\s.*,?/g

async function replacePatternInFile(filePath: string) {
  const data = await readFile(filePath, 'utf8')

  // Initial check to see if any pattern exists in the data, to avoid unnecessary operations
  if (
    getUrlPattern.test(data) ||
    getUrlPattern2.test(data) ||
    getUrlPattern3.test(data) ||
    getDictionaryPropPattern.test(data) ||
    getDictionaryPropPattern2.test(data) ||
    getDictionaryPropFromType.test(data) ||
    getDictionaryProp.test(data) ||
    replaceDirectionPattern.test(data) ||
    removeDictionaryDestructuringPattern.test(data) ||
    removeParamsFromPropsPattern.test(data) ||
    removeParamsFromPropsPattern2.test(data) ||
    removeParamsFromFunctionPattern.test(data) ||
    excludeLangPattern.test(data)
  ) {
    // Perform replacements
    const newData = data
      .replace(getUrlPattern, '$1$2$3')
      .replace(getUrlPattern2, '$1')
      .replace(getUrlPattern3, '$1')
      .replace(getDictionaryPropPattern, '')
      .replace(getDictionaryPropPattern2, '')
      .replace(getDictionaryPropFromType, '')
      .replace(getDictionaryProp, '')
      .replace(replaceDirectionPattern, "const direction = 'ltr'")
      .replace(removeDictionaryDestructuringPattern, '')
      .replace(removeParamsFromPropsPattern, '')
      .replace(removeParamsFromPropsPattern2, '')
      .replace(removeParamsFromFunctionPattern, '')
      .replace(/const\s*{\s*lang:\s*locale\s*}\s*=\s*useParams\(\)/g, '')
      .replace(/(\w+: )?locale,/g, '')
      .replace(/,\s*(\w+: )?locale/g, '')
      .replace(/\{ lang \}(: \{ lang: Locale \})?/g, '')
      .replace(/\${lang}\//g, '')
      .replace(/excludeLang\??:\s.*,?/g, '')
      .replace(/item\.excludeLang.*?:/, '')

    // Only write back if changes were made
    if (data !== newData) {
      await writeFile(filePath, newData, 'utf8')
    } else {
      consola.error(`No changes made to: ${filePath}`)
    }
  }
}

async function updateNextConfig() {
  const filePath = 'next.config.mjs'

  const content = await readFile(filePath, 'utf8')

  // Define a pattern that matches the redirects configuration and remove it
  const redirectsPattern = /(return \[[\s\S]*?\]\s*)/

  const redirect = `return [{
    source: '/',
    destination: '/dashboards/crm',
    permanent: true
  }]`

  const updatedContent = content.replace(redirectsPattern, redirect)

  if (content !== updatedContent) {
    await writeFile(filePath, updatedContent, 'utf8')
    consola.success('Removed redirects from next.config.mjs\n')
  }
}

export const findAndReplaceInFiles = async () => {
  const paths = await globby(['src/**/*.{tsx,ts}', '!src/remove-translation-scripts/**/*'])

  consola.start('Replacing various patterns in whole project......')

  for (const filePath of paths) {
    await replacePatternInFile(filePath)
  }

  consola.success('Replaced pattern successfully\n')

  await updateNextConfig()

  consola.success('Replaced various patterns in whole project successfully.\n')
}

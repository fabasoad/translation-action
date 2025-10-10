import fs from 'node:fs'
import { debug } from '@actions/core'

const extract = (source: string): string => {
  if (fs.existsSync(source)) {
    debug(`${source} file exists. Reading from file...`)
    const text: string = fs.readFileSync(source, 'utf-8').trim()
    debug(`File content: ${text}`)
    return text
  }
  debug(`${source} file does not exist. "${source}" will be translated`)
  return source
}

export default extract

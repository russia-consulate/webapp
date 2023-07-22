import * as fs from 'fs'

const NODE_ENV = process.env.NODE_ENV || "development"

const ENV = Object.entries(process.env).reduce((acc, [key, value]) => {
  if (!key.startsWith('CLIENT_')) return acc
  acc[key] = value
  return acc
}, { NODE_ENV })

const script = `window.ENV = ${JSON.stringify(ENV)}`

if (NODE_ENV === "development") {
  fs.writeFileSync("./public/env.js", script)
} else {
  const content = fs.readFileSync('./index.html', { encoding: 'utf8' })
  const toReplace = '<script type="module" src="/env.js"></script>'
  const replaceWith = `<script>${script}</script>`
  const withEnv = content.replace(toReplace, replaceWith)
  fs.writeFileSync("./index.html", withEnv)
}

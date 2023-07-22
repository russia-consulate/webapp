import * as fs from 'fs'
import * as path from 'path'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import svg from '@neodx/svg/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
const config = defineConfig({
  server: {
    port: 3001,
    https: {
      cert: fs.readFileSync(path.resolve(__dirname, 'ssl/webapp.crt')),
      key: fs.readFileSync(path.resolve(__dirname, 'ssl/webapp.key')),
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        rewrite: (path) => path.replace('/api/', '/'),
      },
    },
  },
  plugins: [
    react({
      babel: { babelrc: true },
    }),
    tsconfigPaths(),
    svg({
      root: 'src/shared/ui/assets/icons',
      output: 'public',
      definitions: 'src/shared/ui/general/icon/sprites.generated.ts',
      group: false,
      resetColors: false,
    }),
  ],
})

// eslint-disable-next-line import/no-default-export
export default config

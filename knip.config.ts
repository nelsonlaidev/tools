import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  entry: ['./src/components/ui/*.tsx'],
  ignoreDependencies: ['postcss', 'canvas']
}

export default config

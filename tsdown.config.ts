import { defineConfig } from 'tsdown'

export default defineConfig({
  deps: {
    // Uncomment the following block to make the build succeed.
    // neverBundle: [
    //   '@nuxt/schema',
    // ],
  },
  dts: true,
})

import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Universal Icon Set",
  description: "Universal Icon Set documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Icons', link: '/icons/index.md' },
      { text: 'Guide', link: '/guide/index.md' },
      { text: 'Packages', link: '/packages' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is Universal Icon Set', link: '/guide/index.md' },
          { text: 'Installation', link: '/guide/installation.md' },
        ]
      },
      {
        text: 'Packages',
        items: [
          { text: 'React', link: '/guide/packages/react.md' },
          { text: 'Vue 2', link: '/guide/packages/vue-v2.md' },
          { text: 'Vue 3', link: '/guide/packages/vue-v3.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dimagroshev/universal-icon-set' }
    ]
  },

  vite: {
    resolve: {
      alias: {
        '@node_modules': './node_modules',
        '@icons': '../icons',
      }
    }
  }
})

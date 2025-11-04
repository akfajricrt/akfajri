import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Ahmad Khoirul Fajeri',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://fajeriaicshub.id',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  organizationName: 'AICSHub.id', 
  projectName: 'fajri.github.io', 

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.

          // Hanya urus kategori "My Research"
          sidebarItemsGenerator: async function ({ defaultSidebarItemsGenerator, ...args }) {
            const items = await defaultSidebarItemsGenerator(args);

            // Helper ambil date dari frontMatter
            const getDateMs = (item: any) => {
              const d = item?.frontMatter?.date;
              const ms = d ? Date.parse(d) : NaN;
              return Number.isNaN(ms) ? null : ms;
            };

            // Cek kategori "My Research" berdasarkan slug atau customProps
            const isResearchCategory = (cat: any) => {
              // Bisa match lewat slug /category/my-research
              if (cat.link?.type === 'generated-index' && (cat.link as any).slug === '/category/my-research')
                return true;
              // Atau lewat customProps di _category_.json
              if (cat.customProps?.bucket === 'research') return true;
              // Fallback lewat label
              return ['My Research', 'Riset Saya'].includes(cat.label);
            };

            // Sorting by date (desc)
            const sortByDateDesc = (cat: any) => {
              cat.items = cat.items.slice().sort((a: any, b: any) => {
                const ad = getDateMs(a);
                const bd = getDateMs(b);
                if (ad !== null && bd !== null) return bd - ad; // paling baru di atas
                if (ad !== null) return -1;
                if (bd !== null) return 1;
                return 0;
              });
            };

            // Rekursif, cuma jalankan di kategori “My Research”
            const walk = (node: any) => {
              if (node.type === 'category' && Array.isArray(node.items)) {
                if (isResearchCategory(node)) sortByDateDesc(node);
                node.items.forEach(walk);
              }
            };

            items.forEach(walk);
            return items;
          },
        

         
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'DocFajeri',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'profile',
          position: 'left',
          label: 'Profil',
        },

        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'right',
          label: 'Tutorial',
        },

        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Resume, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  themes: [
    // ... Your other themes.
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,

        // For Docs using Chinese, it is recomended to set:
        language: ["en", "zh"],

        // Customize the keyboard shortcut to focus search bar (default is "mod+k"):
        // searchBarShortcutKeymap: "s", // Use 'S' key
        // searchBarShortcutKeymap: "ctrl+shift+f", // Use Ctrl+Shift+F

        // If you're using `noIndex: true`, set `forceIgnoreNoIndex` to enable local index:
        // forceIgnoreNoIndex: true,
      }),
    ],
  ],
};


export default config;

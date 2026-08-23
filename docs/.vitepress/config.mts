import { defineConfig } from "vitepress";

// Deployed as a GitHub Pages *project* site (https://<user>.github.io/react-native-text-toolkit/),
// so every asset path needs the repo name as a base. If you rename the repo,
// update this to match.
export default defineConfig({
  title: "react-native-text-toolkit",
  description: "Inline text formatting and clickable links for React Native, styled through the standard style prop.",
  base: "/react-native-text-toolkit/",
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "GitHub", link: "https://github.com/nolasco7a/react-native-text-toolkit" },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [{ text: "Getting Started", link: "/guide/getting-started" }],
      },
      {
        text: "Components",
        items: [
          { text: "Text", link: "/guide/text" },
          { text: "TextLink", link: "/guide/text-link" },
          { text: "TextToolkit", link: "/guide/text-toolkit" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/nolasco7a/react-native-text-toolkit" },
    ],

    search: {
      provider: "local",
    },

    footer: {
      message: "Released under the MIT License.",
    },
  },
});

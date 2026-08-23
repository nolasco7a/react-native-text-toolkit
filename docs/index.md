---
layout: home

hero:
  name: react-native-text-toolkit
  text: Text formatting and links, without the ceremony
  tagline: Inline bold, italic, strikethrough and underline via a simple {**syntax**}, plus tappable links for URLs, email, phone, SMS and settings — all styled through React Native's own style prop.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/nolasco7a/react-native-text-toolkit

features:
  - title: Inline markup, no JSX gymnastics
    details: "Write {**bold**}, {!!italic!!}, {~~strikethrough~~} and {__underline__} straight inside a string — no nested <Text> trees to keep track of."
  - title: Tappable links built in
    details: TextLink opens URLs, email, phone, SMS or device settings out of the box — pass a type and a value, done.
  - title: Links embedded in text
    details: "TextToolkit mixes formatted text and multiple independent links in one string using {placeholder} syntax."
  - title: Full styling via style prop
    details: No arbitrary presets or theme abstractions — every component takes React Native's standard StyleProp<TextStyle>.
  - title: Automatic dark/light colors
    details: Text color adapts to the device color scheme via useColorScheme(), with optional themeTextColors overrides.
  - title: TypeScript first
    details: Every component and prop is fully typed, including the LinksMapping shape for TextToolkit.
---

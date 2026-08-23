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

<div class="demo-section">

## See it in action

<div class="demo-grid">

<div class="demo-item">

### [Text](/guide/text)

Inline `{**bold**}`, `{!!italic!!}`, `{~~strikethrough~~}` and `{__underline__}` markup, styled through the standard `style` prop.

<a href="/guide/text"><img src="/screenshots/text.png" alt="Text component screenshot" /></a>

</div>

<div class="demo-item">

### [TextLink](/guide/text-link)

Tappable text for URLs, email, phone, SMS and device settings — each `type` just works out of the box.

<a href="/guide/text-link"><img src="/screenshots/text-link.png" alt="TextLink component screenshot" /></a>

</div>

<div class="demo-item">

### [TextToolkit](/guide/text-toolkit)

Text and multiple independently-styled links combined in one string via `{placeholder}` syntax.

<a href="/guide/text-toolkit"><img src="/screenshots/text-toolkit.png" alt="TextToolkit component screenshot" /></a>

</div>

</div>

</div>

<style>
.demo-section {
  max-width: 1152px;
  margin: 0 auto;
  padding: 32px 24px 64px;
}
.demo-section h2 {
  text-align: center;
  margin-bottom: 32px;
}
.demo-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}
@media (min-width: 768px) {
  .demo-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.demo-item h3 {
  margin-top: 0;
  margin-bottom: 8px;
  border-top: none;
  padding-top: 0;
}
.demo-item p {
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}
.demo-item img {
  display: block;
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}
</style>

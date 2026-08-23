# Getting Started

React Native Text Toolkit is a small set of text components: inline markup formatting, tappable links, and a component that combines both.

## Installation

```bash
npm install @nolasco7a/react-native-text-toolkit
# or
yarn add @nolasco7a/react-native-text-toolkit
```

## Components

- **[Text](/guide/text)** — enhanced text with inline markup support (bold, italic, strikethrough, underline).
- **[TextLink](/guide/text-link)** — clickable text that opens URLs, email, phone, SMS, or device settings.
- **[TextToolkit](/guide/text-toolkit)** — combines text and links using `{placeholder}` syntax.

## Quick example

```tsx
import { TextToolkit } from '@nolasco7a/react-native-text-toolkit';

<TextToolkit
  text="This is {**bold**} text with a link to {website}."
  links={{
    website: { text: "our website", type: "url", value: "https://example.com" },
  }}
/>
```

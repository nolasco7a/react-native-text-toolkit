# React Native Text Toolkit

A powerful and flexible text component library for React Native that supports inline text formatting, clickable links, and combined text with embedded links.

📖 [Full documentation](https://nolasco7a.github.io/react-native-text-toolkit/)

## Installation

```bash
npm install @nolasco7a/react-native-text-toolkit
# or
yarn add @nolasco7a/react-native-text-toolkit
```

## Features

- Automatic dark/light theme detection
- Inline text formatting (bold, italic, strikethrough, underline)
- Inline clickable links with template syntax
- Full styling via React Native's `style` prop — no arbitrary abstractions
- TypeScript support

## Components

- **Text** - Enhanced text component with inline markup support (bold, italic, strikethrough, underline)
- **TextLink** - Clickable text that opens URLs, emails, phone, SMS, or device settings
- **TextToolkit** - Combines text and links using placeholder syntax

---

## Text Component

The `Text` component supports inline markup using a simple syntax:

| Style | Syntax | Example |
|-------|--------|---------|
| **Bold** | `{**text**}` | `{**bold**}` |
| *Italic* | `{!!text!!}` | `{!!italic!!}` |
| ~~Strikethrough~~ | `{~~text~~}` | `{~~deleted~~}` |
| <u>Underline</u> | `{__text__}` | `{__important__}` |

### Basic Usage

```tsx
import { Text } from '@nolasco7a/react-native-text-toolkit';

// Bold text
<Text text="This is a {**bold**} word in a sentence." />

// Italic text
<Text text="This is an {!!italic!!} word in a sentence." />

// Strikethrough text
<Text text="This is a {~~strikethrough~~} word in a sentence." />

// Underline text
<Text text="This is an {__underlined__} word in a sentence." />

// Combining multiple styles
<Text text="Mix {**bold**}, {!!italic!!}, {~~strikethrough~~} and {__underline__} in one text." />
```

### Styling

All styling is done through React Native's standard `style` prop. No arbitrary presets — you have full control.

```tsx
<Text
  text="Large bold centered text"
  style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
/>

<Text
  text="Custom styled text"
  style={{ fontSize: 14, fontWeight: "300", textTransform: "uppercase", letterSpacing: 2 }}
/>
```

### Theme-aware Colors

Automatically adapts text color based on the device's color scheme using `useColorScheme()`.

```tsx
<Text
  text="I adapt to the theme"
  themeTextColors={{ light: "#222222", dark: "#EEEEEE" }}
/>
```

Without `themeTextColors`, the text defaults to `#000000` in light mode and `#FFFFFF` in dark mode.

### Text Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string \| React.ReactNode` | - | The text to display |
| `style` | `StyleProp<TextStyle>` | - | Standard React Native text styles |
| `onPress` | `() => void` | - | Press handler |
| `themeTextColors` | `{ light: ColorValue, dark: ColorValue }` | `{ light: "#000000", dark: "#FFFFFF" }` | Theme-aware colors |

---

## TextLink Component

The `TextLink` component renders clickable text that can open URLs, emails, phone numbers, SMS, or device settings.

### Basic Usage

```tsx
import { TextLink } from '@nolasco7a/react-native-text-toolkit';

// URL link
<TextLink text="Visit Google" type="url" value="https://google.com" />

// Email link
<TextLink text="Send us an email" type="email" value="hello@example.com" />

// Phone link
<TextLink text="Call support" type="phone" value="+1234567890" />

// SMS link
<TextLink text="Send a text message" type="sms" value="+1234567890" />

// Settings link
<TextLink text="Open app settings" type="settings" />
```

### Custom Styled Link

`style` accepts any `StyleProp<TextStyle>`, giving you full control over the link's appearance.

```tsx
<TextLink
  text="Custom styled link"
  type="url"
  value="https://github.com"
  style={{ fontSize: 20, fontWeight: "900", textDecorationLine: "none", color: "#E91E63" }}
/>
```

### TextLink Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | The text to display |
| `type` | `"email" \| "phone" \| "url" \| "sms" \| "settings"` | - | Type of link action |
| `value` | `string` | - | The link value (not required for `settings`) |
| `style` | `StyleProp<TextStyle>` | `{ fontWeight: "bold", textDecorationLine: "underline", color: "#3366CC" }` | Custom styling for the link |

---

## TextToolkit Component

The `TextToolkit` component allows you to embed multiple links within text using `{placeholder}` syntax. It accepts all `Text` props for styling the text segments, while links maintain their own independent styles.

### Basic Usage

```tsx
import { TextToolkit } from '@nolasco7a/react-native-text-toolkit';

// Simple link
<TextToolkit
  text="Visit {website} for more information."
  links={{
    website: { text: "our website", type: "url", value: "https://example.com" }
  }}
/>

// Multiple links
<TextToolkit
  text="Contact us via {email} or call us at {phone}."
  links={{
    email: { text: "email", type: "email", value: "support@example.com" },
    phone: { text: "phone", type: "phone", value: "+1234567890" }
  }}
/>

// Settings link in text
<TextToolkit
  text="Having issues? Go to {settings} to configure permissions."
  links={{
    settings: { text: "Settings", type: "settings" }
  }}
/>
```

### Styled Text with Links

```tsx
<TextToolkit
  text="Read our {terms} and {privacy} before signing up."
  style={{ fontSize: 16, color: "#333" }}
  themeTextColors={{ light: "#333", dark: "#CCC" }}
  links={{
    terms: {
      text: "Terms of Service",
      type: "url",
      value: "https://example.com/terms",
      style: { color: "#2196F3" }
    },
    privacy: {
      text: "Privacy Policy",
      type: "url",
      value: "https://example.com/privacy",
      style: { color: "#4CAF50" }
    }
  }}
/>
```

### Advanced Example - Support Section

```tsx
<TextToolkit
  text="Reach out via {email}, {phone}, or {chat}. Check our {faq} for quick answers."
  style={{ fontSize: 15 }}
  links={{
    email: {
      text: "email",
      type: "email",
      value: "support@example.com",
      style: { color: "#E91E63", fontWeight: "800" }
    },
    phone: {
      text: "phone",
      type: "phone",
      value: "+1234567890",
      style: { color: "#00BCD4", fontWeight: "800" }
    },
    chat: {
      text: "live chat",
      type: "url",
      value: "https://example.com/chat",
      style: { color: "#8BC34A", fontWeight: "800" }
    },
    faq: {
      text: "FAQ",
      type: "url",
      value: "https://example.com/faq",
      style: { color: "#FF9800", fontWeight: "800" }
    }
  }}
/>
```

### Footer Style Links

```tsx
<TextToolkit
  text="{about} | {blog} | {careers} | {contact}"
  style={{ fontSize: 12, textAlign: "center" }}
  links={{
    about: {
      text: "About",
      type: "url",
      value: "https://example.com/about",
      style: { color: "#757575", fontSize: 12, textDecorationLine: "none" }
    },
    blog: {
      text: "Blog",
      type: "url",
      value: "https://example.com/blog",
      style: { color: "#757575", fontSize: 12, textDecorationLine: "none" }
    },
    careers: {
      text: "Careers",
      type: "url",
      value: "https://example.com/careers",
      style: { color: "#757575", fontSize: 12, textDecorationLine: "none" }
    },
    contact: {
      text: "Contact",
      type: "url",
      value: "https://example.com/contact",
      style: { color: "#757575", fontSize: 12, textDecorationLine: "none" }
    }
  }}
/>
```

### TextToolkit Props

Accepts all `Text` props (except `text` and `onPress`) plus:

| Prop | Type | Description |
|------|------|-------------|
| `text` | `string` | Text with `{placeholder}` tags for links |
| `links` | `LinksMapping` | Object mapping placeholder names to link configurations |
| `style` | `StyleProp<TextStyle>` | Styles applied to all text segments |
| `themeTextColors` | `{ light: ColorValue, dark: ColorValue }` | Theme-aware colors for text segments |

#### LinksMapping

Each key in the `links` object corresponds to a placeholder in the text. The value is a `TextLinkProps` object:

```ts
{
  [placeholderName: string]: {
    text: string;                  // Display text for the link
    type: "url" | "email" | "phone" | "sms" | "settings";
    value?: string;                // Link value (not required for "settings")
    style?: StyleProp<TextStyle>;  // Optional custom styling
  }
}
```

---

## License

MIT

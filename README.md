# React Native Text Toolkit

A powerful and flexible text component library for React Native that supports inline text formatting, clickable links, and combined text with embedded links.

## Installation

```bash
npm install react-native-text-toolkit
# or
yarn add react-native-text-toolkit
```
## Features

✨ Automatic dark/light theme detection
📝 Inline text formatting (bold, italic, strikethrough, underline)
🔗 Inline clickable links with template syntax
🎨 Highly customizable
📱 TypeScript support

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
import { Text } from 'react-native-text-toolkit';

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

### Text Sizes

```tsx
<Text text="Small text" size="small" />
<Text text="Regular text" size="regular" />
<Text text="Medium text" size="medium" />
<Text text="Large text" size="large" />
<Text text="Extra large text" size="xlarge" />
```

Available sizes: `small` | `regular` | `medium` | `large` | `xlarge` | `x2large` | `x3large` | `x4large` | `x5large`

### Text Weights

```tsx
<Text text="Light weight" weight="light" />
<Text text="Normal weight" weight="normal" />
<Text text="Bold weight" weight="bold" />
<Text text="Black weight" weight="black" />
```

Available weights: `thin` | `extraLight` | `light` | `normal` | `bold` | `extraBold` | `black`

### Text Decorations

```tsx
<Text text="Underlined text" decoration="underline" />
<Text text="Strikethrough text" decoration="strikethrough" />
```

Available decorations: `none` | `underline` | `strikethrough`

### Text Transforms

```tsx
<Text text="uppercase text" transform="uppercase" />
<Text text="LOWERCASE TEXT" transform="lowercase" />
<Text text="capitalized text" transform="capitalize" />
```

Available transforms: `none` | `uppercase` | `lowercase` | `capitalize`

### Text Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string \| React.ReactNode` | - | The text to display |
| `size` | `string` | `"medium"` | Font size preset |
| `weight` | `string` | `"normal"` | Font weight |
| `decoration` | `string` | `"none"` | Text decoration |
| `transform` | `string` | `"none"` | Text transform |
| `align` | `"left" \| "center" \| "right"` | `"left"` | Text alignment |
| `fontStyle` | `"regular" \| "italic"` | `"regular"` | Font style |
| `style` | `StyleProp<TextStyle>` | - | Custom styles |
| `onPress` | `() => void` | - | Press handler |
| `themeTextColors` | `{ light: ColorValue, dark: ColorValue }` | - | Theme-aware colors |

---

## TextLink Component

The `TextLink` component renders clickable text that can open URLs, emails, phone numbers, SMS, or device settings.

### Basic Usage

```tsx
import { TextLink } from 'react-native-text-toolkit';

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

```tsx
<TextLink
  text="Custom styled link"
  type="url"
  value="https://github.com"
  linkStyle={{
    size: "large",
    weight: "bold",
    decoration: "none",
    color: "#E91E63"
  }}
/>
```

### TextLink Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | The text to display |
| `type` | `"email" \| "phone" \| "url" \| "sms" \| "settings"` | - | Type of link action |
| `value` | `string` | - | The link value (not required for `settings`) |
| `linkStyle` | `object` | - | Custom styling for the link |

#### linkStyle Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `size` | `string` | `"medium"` | Font size preset |
| `weight` | `string` | `"bold"` | Font weight |
| `decoration` | `string` | `"underline"` | Text decoration |
| `transform` | `string` | `"none"` | Text transform |
| `color` | `string` | `"blue"` | Link color |

---

## TextToolkit Component

The `TextToolkit` component allows you to embed multiple links within text using `{placeholder}` syntax.

### Basic Usage

```tsx
import { TextToolkit } from 'react-native-text-toolkit';

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

### Custom Styled Links

```tsx
// Different colored links
<TextToolkit
  text="Check out {github} or {twitter} for updates."
  links={{
    github: {
      text: "GitHub",
      type: "url",
      value: "https://github.com",
      linkStyle: { color: "#333", weight: "bold", decoration: "none" }
    },
    twitter: {
      text: "Twitter",
      type: "url",
      value: "https://twitter.com",
      linkStyle: { color: "#1DA1F2", weight: "bold", decoration: "none" }
    }
  }}
/>

// Terms and Privacy links
<TextToolkit
  text="Read our {terms} and {privacy} before signing up."
  links={{
    terms: {
      text: "Terms of Service",
      type: "url",
      value: "https://example.com/terms",
      linkStyle: { color: "#2196F3", decoration: "underline" }
    },
    privacy: {
      text: "Privacy Policy",
      type: "url",
      value: "https://example.com/privacy",
      linkStyle: { color: "#4CAF50", decoration: "underline" }
    }
  }}
/>
```

### Advanced Example - Support Section

```tsx
<TextToolkit
  text="Reach out via {email}, {phone}, or {chat}. Check our {faq} for quick answers."
  links={{
    email: {
      text: "email",
      type: "email",
      value: "support@example.com",
      linkStyle: { color: "#E91E63", weight: "bold" }
    },
    phone: {
      text: "phone",
      type: "phone",
      value: "+1234567890",
      linkStyle: { color: "#00BCD4", weight: "bold" }
    },
    chat: {
      text: "live chat",
      type: "url",
      value: "https://example.com/chat",
      linkStyle: { color: "#8BC34A", weight: "bold" }
    },
    faq: {
      text: "FAQ",
      type: "url",
      value: "https://example.com/faq",
      linkStyle: { color: "#FF9800", weight: "bold", decoration: "underline" }
    }
  }}
/>
```

### Footer Style Links

```tsx
<TextToolkit
  text="{about} • {blog} • {careers} • {contact}"
  links={{
    about: {
      text: "About",
      type: "url",
      value: "https://example.com/about",
      linkStyle: { color: "#757575", size: "small", decoration: "none" }
    },
    blog: {
      text: "Blog",
      type: "url",
      value: "https://example.com/blog",
      linkStyle: { color: "#757575", size: "small", decoration: "none" }
    },
    careers: {
      text: "Careers",
      type: "url",
      value: "https://example.com/careers",
      linkStyle: { color: "#757575", size: "small", decoration: "none" }
    },
    contact: {
      text: "Contact",
      type: "url",
      value: "https://example.com/contact",
      linkStyle: { color: "#757575", size: "small", decoration: "none" }
    }
  }}
/>
```

### TextToolkit Props

| Prop | Type | Description |
|------|------|-------------|
| `text` | `string` | Text with `{placeholder}` tags for links |
| `links` | `LinksMapping` | Object mapping placeholder names to link configurations |

#### LinksMapping

Each key in the `links` object corresponds to a placeholder in the text. The value is a `TextLinkProps` object:

```ts
{
  [placeholderName: string]: {
    text: string;           // Display text for the link
    type: "url" | "email" | "phone" | "sms" | "settings";
    value?: string;         // Link value (not required for "settings")
    linkStyle?: {           // Optional custom styling
      size?: string;
      weight?: string;
      decoration?: string;
      transform?: string;
      color?: string;
    }
  }
}
```

---

## License

MIT

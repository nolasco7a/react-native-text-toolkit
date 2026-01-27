import React from "react";
import { Text } from "./text";
import { TextLink, TextLinkProps } from "./text-link";

type LinksMapping = {
  [key: string]: TextLinkProps;
};

interface TextToolkitProps {
  text: string;
  links: LinksMapping;
};

/**
 * The TextToolkit component
 *
 * Renders text with embedded links using `{tag}` placeholders
 *
 * @example
 * // Text with URL link
 * <TextToolkit
 *   text="Visit {url} for more info"
 *   links={{
 *     url: { text: "our website", type: "url", value: "https://google.com" }
 *   }}
 * />
 *
 * @example
 * // Multiple links
 * <TextToolkit
 *   text="Contact us by {email} or {phone}"
 *   links={{
 *     email: { text: "email", type: "email", value: "hello@example.com" },
 *     phone: { text: "phone", type: "phone", value: "+1234567890" }
 *   }}
 * />
 */
export const TextToolkit = ({ text, links }: TextToolkitProps) => {
  // RegEx to split on {tag}, capturing the tag names
  const pattern = /\{([^}]+)\}/g;

  // Array to hold React elements
  const elements: React.ReactNode[] = [];

  // Current index in the string
  let lastIndex = 0;
  let match;
  let idx = 0;

  // Iterate over all matches
  while ((match = pattern.exec(text)) !== null) {
    // Text before this match
    if (match.index > lastIndex) {
      const before = text.slice(lastIndex, match.index);
      elements.push(
        <Text key={`text-${idx}`} text={before} />
      );
      idx++;
    }

    const tag = match[1];

    const linkConfig = links[tag];
    if (linkConfig) {
      // separate elements for discriminated union type
      if (linkConfig.type === "settings") {
        elements.push(
          <TextLink
            key={`link-${idx}`}
            text={linkConfig.text}
            type={linkConfig.type}
            value={undefined as never}
            linkStyle={linkConfig.linkStyle}
          />
        );
      } else {
        elements.push(
          <TextLink
            key={`link-${idx}`}
            text={linkConfig.text}
            type={linkConfig.type}
            value={linkConfig.value}
            linkStyle={linkConfig.linkStyle}
          />
        );
      }
    } else {
      // If the tag is not found, show as plain text with braces
      elements.push(
        <Text key={`text-${idx}`} text={`{${tag}}`} />
      );
    }
    idx++;
    lastIndex = match.index + match[0].length;
  }

  // Add any remaining text after last tag
  if (lastIndex < text.length) {
    elements.push(
      <Text key={`text-${idx}`} text={text.slice(lastIndex)} />
    );
  }

  // In React Native, <Text> children must be wrapped in a single parent <Text>
  return <Text text={elements}/>;
};


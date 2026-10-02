import React, { useMemo } from "react";
import { Text as RNText } from "react-native";
import { Text, TextProps } from "./text";
import { TextLink, TextLinkProps } from "./text-link";

type LinksMapping = {
  [key: string]: TextLinkProps;
};

export interface TextToolkitProps extends Omit<TextProps, "text" | "onPress"> {
  text: string;
  links: LinksMapping;
};

type Token =
  | { kind: "text"; value: string }
  | { kind: "tag"; name: string };

/**
 * Splits text on `{tag}` placeholders. Depends only on the string, so it can be
 * memoized independently of the links mapping, which consumers usually rebuild
 * on every render.
 */
function tokenize(text: string): Token[] {
  const pattern = /\{([^}]+)\}/g;
  const tokens: Token[] = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ kind: "text", value: text.slice(lastIndex, match.index) });
    }
    tokens.push({ kind: "tag", name: match[1] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push({ kind: "text", value: text.slice(lastIndex) });
  }
  return tokens;
}

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
export const TextToolkit = ({ text, links, ...textProps }: TextToolkitProps) => {
  const tokens = useMemo(() => tokenize(text), [text]);

  // Plain RNText wrapper avoids theme color cascading to links
  return (
    <RNText style={textProps.style}>
      {tokens.map((token, idx) => {
        if (token.kind === "text") {
          return <Text key={idx} text={token.value} {...textProps} />;
        }

        const linkConfig = links[token.name];
        if (!linkConfig) {
          // Unknown tag: show it literally, braces included.
          return <Text key={idx} text={`{${token.name}}`} {...textProps} />;
        }

        return <TextLink key={idx} {...linkConfig} />;
      })}
    </RNText>
  );
};

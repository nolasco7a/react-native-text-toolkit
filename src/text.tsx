import React, {useMemo} from "react";
import {Text as RNText, StyleProp, TextStyle, StyleSheet, useColorScheme, ColorValue} from "react-native";

export interface TextProps {
  /** The text to display */
  text: string | React.ReactNode;
  /** The style of the text */
  style?: StyleProp<TextStyle>;
  /** The on press of the text */
  onPress?: () => void;
  /** Theme-aware text colors */
  themeTextColors?: {
    light: ColorValue;
    dark: ColorValue;
  }
}

type StyleType = "normal" | "bold" | "italic" | "strikethrough" | "underline";

type Fragment = { type: StyleType; value: string };

const MARKUP = /(\{\*\*(.+?)\*\*\}|\{!!(.+?)!!\}|\{~~(.+?)~~\}|\{__(.+?)__\})/g;

/** Splits markup into styled fragments. Pure, so it can be memoized per string. */
function parseStyledText(input: string): Fragment[] {
  const regex = new RegExp(MARKUP.source, "g");
  const result: Fragment[] = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      result.push({ type: "normal", value: input.slice(lastIndex, match.index) });
    }

    if (match[2]) {
      result.push({ type: "bold", value: match[2] });
    } else if (match[3]) {
      result.push({ type: "italic", value: match[3] });
    } else if (match[4]) {
      result.push({ type: "strikethrough", value: match[4] });
    } else if (match[5]) {
      result.push({ type: "underline", value: match[5] });
    }

    lastIndex = regex.lastIndex;
  }
  if (lastIndex < input.length) {
    result.push({ type: "normal", value: input.slice(lastIndex) });
  }
  return result;
}

function getMarkupOverride(activeType: StyleType): TextStyle {
  switch (activeType) {
    case "bold": return { fontWeight: "bold" };
    case "italic": return { fontStyle: "italic" };
    case "strikethrough": return { textDecorationLine: "line-through" };
    case "underline": return { textDecorationLine: "underline" };
    default: return {};
  }
}

/**
 * The Text component
 *
 * Supports simple markup for:
 * - Bold: `{**word**}`
 * - Italic: `{!!word!!}`
 * - Strikethrough: `{~~word~~}`
 * - Underline: `{__word__}`
 *
 * @example
 * // Text with bold
 * <Text text="this is a {**bold**} word" />
 *
 * @example
 * // Text with italic
 * <Text text="this is an {!!italic!!} word" />
 *
 * @example
 * // Text with strikethrough
 * <Text text="this is a {~~strikethrough~~} word" />
 *
 * @example
 * // Text with underline
 * <Text text="this is an {__underlined__} word" />
 *
 * @example
 * // Combining multiple styles
 * <Text text="{**bold**}, {!!italic!!}, {~~strikethrough~~} and {__underline__}" />
 */
export const Text = ({
 text,
 onPress,
 style,
 themeTextColors,
}: TextProps) => {

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const textColor = useMemo((): TextStyle => {
    if(themeTextColors) {
      return { color: isDarkMode ? themeTextColors.dark : themeTextColors.light };
    }
    return isDarkMode ? textColors.dark : textColors.light;
  }, [themeTextColors, isDarkMode]);

  // Parsing is the expensive part and depends only on the string, so it is kept
  // out of the render path for lists that re-render often.
  const parsed = useMemo(
    () => (typeof text === "string" ? parseStyledText(text) : null),
    [text]
  );

  // If text is a ReactNode (not a string), render directly without parsing.
  if (parsed === null) {
    return (
      <RNText
        onPress={onPress}
        suppressHighlighting={true}
        style={[textColor, style]}
      >
        {text}
      </RNText>
    );
  }

  return (
    <RNText
      onPress={onPress}
      suppressHighlighting={true}
      style={[textColor, style]}
    >
      {parsed.map((frag, i) => (
        <RNText
          key={i}
          style={[textColor, style, getMarkupOverride(frag.type)]}
          suppressHighlighting={true}
        >
          {frag.value}
        </RNText>
      ))}
    </RNText>
  );
};

const textColors = StyleSheet.create({
  light: {
    color: "#000000"
  },
  dark: {
    color: "#FFFFFF"
  },
})

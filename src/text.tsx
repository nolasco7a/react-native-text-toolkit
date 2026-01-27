import React, {useMemo} from "react";
import {Text as RNText, StyleProp, TextStyle, StyleSheet, useColorScheme, ColorValue} from "react-native";

export interface TextProps {
  /** The text to display */
  text: string | React.ReactNode;
  /** The style of the text */
  style?: StyleProp<TextStyle>;
  /** The size of the text */
  size?: "small" | "regular" | "medium" | "large" | "xlarge" | "x2large" | "x3large" | "x4large" | "x5large";
  /** The weight of the text */
  weight?: "thin" | "extraLight" | "light" | "normal" | "bold" | "extraBold" | "black";
  /** The decoration of the text */
  decoration?: "none" | "underline" | "strikethrough";
  /** The transform of the text */
  transform?: "none" | "uppercase" | "lowercase" | "capitalize";
  /** The alignment of the text */
  align?: "center" | "right" | "left";
  /** The font style of the text */
  fontStyle?: "regular" | "italic";
  /** The on press of the text */
  onPress?: () => void;
  /** The color of the text */
  themeTextColors?: {
    light: ColorValue;
    dark: ColorValue;
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
 size = "medium",
 weight = "normal",
 decoration = "none",
 transform = "none",
 align = "left",
 fontStyle = "regular",
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

  // Solo aplicar el parser si text es un string. Si es ReactNode, renderizar directo.
  if (typeof text !== "string") {
    return (
      <RNText
        onPress={onPress}
        suppressHighlighting={true}
        style={[
          fontSizes[size],
          fontWeight[weight],
          fontStyles[fontStyle],
          textDecoration[decoration],
          textTransform[transform],
          textAlign[align],
          textColor,
          style as TextStyle
        ]}
      >
        {text}
      </RNText>
    );
  }

  // Parser for bold ({**text**}), italic ({!!text!!}), strikethrough ({~~text~~}), underline ({__text__})
  type StyleType = "normal" | "bold" | "italic" | "strikethrough" | "underline";
  function parseStyledText(input: string) {
    const regex = /(\{\*\*(.+?)\*\*\}|\{!!(.+?)!!\}|\{~~(.+?)~~\}|\{__(.+?)__\})/g;
    const result: { type: StyleType; value: string }[] = [];

    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(input)) !== null) {
      if (match.index > lastIndex) {
        result.push({
          type: "normal",
          value: input.slice(lastIndex, match.index),
        });
      }

      if (match[2]) {
        // Bold
        result.push({
          type: "bold",
          value: match[2],
        });
      } else if (match[3]) {
        // Italic
        result.push({
          type: "italic",
          value: match[3],
        });
      } else if (match[4]) {
        // Strikethrough
        result.push({
          type: "strikethrough",
          value: match[4],
        });
      } else if (match[5]) {
        // Underline
        result.push({
          type: "underline",
          value: match[5],
        });
      }

      lastIndex = regex.lastIndex;
    }
    if (lastIndex < input.length) {
      result.push({
        type: "normal",
        value: input.slice(lastIndex),
      });
    }
    return result;
  }

  const parsed = parseStyledText(text);

  // Function to generate base styles with possible overrides
  function getTextStyles(activeType: StyleType): TextStyle[] {
    let override: TextStyle = {};
    if (activeType === "bold") {
      override.fontWeight = "bold";
    }
    if (activeType === "italic") {
      override.fontStyle = "italic";
    }
    if (activeType === "strikethrough") {
      override.textDecorationLine = "line-through";
    }
    if (activeType === "underline") {
      override.textDecorationLine = "underline";
    }
    return [
      fontSizes[size],
      fontWeight[weight],
      fontStyles[fontStyle],
      textDecoration[decoration],
      textTransform[transform],
      textAlign[align],
      textColor,
      style as TextStyle,
      override,
    ];
  }

  return (
    <RNText
      onPress={onPress}
      suppressHighlighting={true}
      style={[
        fontSizes[size],
        fontWeight[weight],
        fontStyles[fontStyle],
        textDecoration[decoration],
        textTransform[transform],
        textAlign[align],
        textColor,
        style,
      ]}
    >
      {parsed.map((frag, i) => (
        <RNText
          key={i}
          style={getTextStyles(frag.type)}
          suppressHighlighting={true}
        >
          {frag.value}
        </RNText>
      ))}
    </RNText>
  );
};

const fontSizes = StyleSheet.create({
  small: {
    fontSize: 12,
  },
  regular: {
    fontSize: 14,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 18,
  },
  xlarge: {
    fontSize: 20,
  },
  x2large: {
    fontSize: 22,
  },
  x3large: {
    fontSize: 26,
  },
  x4large: {
    fontSize: 30,
  },
  x5large: {
    fontSize: 34,
  },
})

const fontWeight = StyleSheet.create({
  thin: {
    fontWeight: "100",
  },
  extraLight: {
    fontWeight: "200",
  },
  light: {
    fontWeight: "300",
  },
  normal: {
    fontWeight: "normal",
  },
  bold: {
    fontWeight: "bold",
  },
  extraBold: {
    fontWeight: "800",
  },
  black: {
    fontWeight: "900",
  },
})

const fontStyles = StyleSheet.create({
  regular: {
    fontStyle: "normal",
  },
  italic: {
    fontStyle: "italic",
  },
})

const textDecoration = StyleSheet.create({
  none: {
    textDecorationLine: "none",
  },
  underline: {
    textDecorationLine: "underline",
  },
  strikethrough: {
    textDecorationLine: "line-through",
  },
})

const textTransform = StyleSheet.create({
  none: {
    textTransform: "none",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  lowercase: {
    textTransform: "lowercase",
  },
  capitalize: {
    textTransform: "capitalize",
  },
})

const textAlign = StyleSheet.create({
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
  left: {
    textAlign: "left",
  },
})

const textColors = StyleSheet.create({
  light: {
    color: "#000000"
  },
  dark: {
    color: "#FFFFFF"
  },
})
import { Text } from "./text";
import { Linking, StyleProp, TextStyle } from "react-native";

export type TextLinkProps = {
  /** The key of the link */
  key?: string;
  /** The text to display */
  text: string;
  /** The type of the link */
  type: "email" | "phone" | "url" | "sms" | "settings";
  /** The value of the link */
  value?: string;
  /** The style of the link */
  style?: StyleProp<TextStyle>;
} & (
      | {
      type: "email" | "phone" | "url" | "sms";
      value: string;
        }
      | {
      type: "settings";
      value: never;
    }
  )

/**
 * The TextLink component
 *
 * Renders clickable text that opens different types of links
 *
 * @example
 * // Open a URL
 * <TextLink text="Visit Google" type="url" value="https://google.com" />
 *
 * @example
 * // Open email
 * <TextLink text="Contact us" type="email" value="hello@example.com" />
 *
 * @example
 * // Open phone
 * <TextLink text="Call us" type="phone" value="+1234567890" />
 *
 * @example
 * // Open SMS
 * <TextLink text="Send message" type="sms" value="+1234567890" />
 *
 * @example
 * // Open device settings
 * <TextLink text="Open settings" type="settings" />
 */
export const TextLink = ({
  text,
  type,
  value,
  style,
}: TextLinkProps) => {

  const handleOpenSettings = async () => {
    await Linking.openSettings();
  }

  const handleOpenUrl = async (url: string) => {
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    } else {
      console.error("Error: Unable to open URL");
    }
  }

  const handleOpenEmail = async (email: string) => {
    if (await Linking.canOpenURL(`mailto:${email}`)) {
      await Linking.openURL(`mailto:${email}`);
    } else {
      console.error("Error: Unable to open email");
    }
  }

  const handleOpenPhone = async (phone: string) => {
    if (await Linking.canOpenURL(`tel:${phone}`)) {
      await Linking.openURL(`tel:${phone}`);
    } else {
      console.error("Error: Unable to open phone");
    }
  }

  const handleOpenSms = async (sms: string) => {
    if (await Linking.canOpenURL(`sms:${sms}`)) {
      await Linking.openURL(`sms:${sms}`);
    } else {
      console.error("Error: Unable to open SMS");
    }
  }

  const handleAction = (action: TextLinkProps["type"]) => {
    switch (action) {
      case "settings":
        void handleOpenSettings();
        break;
      case "url":
        void handleOpenUrl(value);
        break;
      case "email":
        void handleOpenEmail(value);
        break;
      case "phone":
        void handleOpenPhone(value);
        break;
      case "sms":
        void handleOpenSms(value);
        break;
      default:
        break;
    }
  };

  return (
    <Text
      onPress={() => handleAction(type)}
      style={[defaultLinkStyle, style]}
      text={text}
    />
  );
};

const defaultLinkStyle: TextStyle = {
  fontWeight: "bold",
  textDecorationLine: "none",
  color: "#3366CC",
};
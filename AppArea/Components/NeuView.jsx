import React from "react";
import { View, Platform } from "react-native";
import {
  COLORS,
  BORDER_RADIUS,
  COMPONENT_STYLES,
} from "../../lib/constants/theme";

const styles = COMPONENT_STYLES.NeuView;

export const NeuView = ({
  children,
  style,
  borderRadius = BORDER_RADIUS.xl,
  inset = false,
}) => {
  const radiusStyle = { borderRadius };

  if (inset) {
    return (
      <View
        style={[
          style,
          styles.content,
          radiusStyle,
          // Inset logic using simple borders on the content view itself
          {
            backgroundColor: COLORS.background,
            borderTopWidth: 4,
            borderLeftWidth: 4,
            borderBottomWidth: 4,
            borderRightWidth: 4,
            borderTopColor: COLORS.neuDark,
            borderLeftColor: COLORS.neuDark,
            borderBottomColor: COLORS.neuLight,
            borderRightColor: COLORS.neuLight,
          },
        ]}
      >
        {children}
      </View>
    );
  }

  // Standard Elevated View (unchanged logic)
  return (
    <View style={[styles.wrapper, style]}>
      {/* Dark Shadow Layer */}
      <View
        style={[
          styles.darkShadow,
          radiusStyle,
          { transform: [{ translateX: 2 }, { translateY: 2 }] },
        ]}
      />

      {/* Light Shadow Layer */}
      <View
        style={[
          styles.lightShadow,
          radiusStyle,
          { transform: [{ translateX: -2 }, { translateY: -2 }] },
          Platform.OS === "android" && {
            backgroundColor: "transparent",
            borderWidth: 1.5,
            borderColor: "white",
          },
        ]}
      />

      <View style={[styles.content, radiusStyle]}>{children}</View>
    </View>
  );
};

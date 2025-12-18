import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const SafeContainer = ({
  children,
  style,
  top = true,
  bottom = false,
  left = false,
  right = false,
}) => {
  const insets = useSafeAreaInsets();

  const safeAreaStyle = {
    paddingTop: top ? insets.top : 0,
    paddingBottom: bottom ? insets.bottom : 0,
    paddingLeft: left ? insets.left : 0,
    paddingRight: right ? insets.right : 0,
  };

  return (
    <View style={[styles.container, safeAreaStyle, style]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

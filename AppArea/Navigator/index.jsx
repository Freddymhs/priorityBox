import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import HomeSection from "../Screens/HomeSection";
import GuideSection from "../Screens/GuideSection";
import ListSection from "../Screens/ListSection";
import {
  COLORS,
  BORDER_RADIUS,
  SPACING,
  FONT_SIZES,
} from "../../lib/constants/theme";

const Tab = createBottomTabNavigator();

export const Navigator = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.background,
      card: COLORS.card,
      text: COLORS.textPrimary,
      border: COLORS.muted,
      primary: COLORS.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        initialRouteName="MATRIZ"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.textLight,
          tabBarInactiveTintColor: COLORS.textSecondary,
          tabBarActiveBackgroundColor: COLORS.primary,
          tabBarItemStyle: {
            borderRadius: BORDER_RADIUS.medium,
            marginHorizontal: SPACING.xs,
            marginVertical: SPACING.sm,
          },
          tabBarStyle: {
            backgroundColor: COLORS.card,
            borderTopWidth: 0,
            paddingTop: SPACING.xs,
            paddingBottom: SPACING.sm,
            paddingHorizontal: SPACING.md,
            height: 70,
            borderTopLeftRadius: BORDER_RADIUS.xxl,
            borderTopRightRadius: BORDER_RADIUS.xxl,
            position: "absolute",
            elevation: 8,
            shadowColor: COLORS.neuDark,
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
          },
          tabBarLabelStyle: {
            fontSize: FONT_SIZES.small,
            fontWeight: "600",
            marginTop: 2,
          },
        }}
      >
        <Tab.Screen
          name="LISTAS"
          component={ListSection}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="th-list" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="MATRIZ"
          component={HomeSection}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="list-alt" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="GUÍA"
          component={GuideSection}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="file" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

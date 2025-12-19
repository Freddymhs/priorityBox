import * as React from "react";
import { CustomSidebar } from "./CustomSidebar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import HomeSection from "../Screens/HomeSection";
import GuideSection from "../Screens/GuideSection";
import ListSection from "../Screens/ListSection";
import { COLORS, BORDER_RADIUS } from "../../lib/constants/theme";

export const Navigator = () => {
  const Drawer = createDrawerNavigator();

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
      <Drawer.Navigator
        drawerContent={(navigatorProps) => (
          <CustomSidebar {...navigatorProps} />
        )}
        initialRouteName="MATRIZ"
        screenOptions={{
          drawerType: "front",
          drawerStyle: {
            backgroundColor: COLORS.background,
            width: "89%",
            borderTopRightRadius: BORDER_RADIUS.xl,
            borderBottomRightRadius: BORDER_RADIUS.xl,
          },
          drawerActiveTintColor: COLORS.primaryDark,
          drawerActiveBackgroundColor: COLORS.card,
          drawerInactiveTintColor: COLORS.textSecondary,
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="GUÍA"
          component={GuideSection}
          options={{
            headerShown: false,
            drawerIcon: () => (
              <FontAwesome name="file" size={32} color={COLORS.drawerIcon} />
            ),
          }}
        />
        <Drawer.Screen
          name="MATRIZ"
          component={HomeSection}
          options={{
            headerShown: false,
            drawerIcon: () => (
              <FontAwesome
                name="list-alt"
                size={32}
                color={COLORS.drawerIcon}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="LISTAS"
          component={ListSection}
          options={{
            headerShown: false,
            drawerIcon: () => (
              <FontAwesome name="th-list" size={32} color={COLORS.drawerIcon} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

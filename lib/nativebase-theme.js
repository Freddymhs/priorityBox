import { extendTheme } from "native-base";
import { COLORS } from "./constants/theme";

// Tema de NativeBase que evita colores vacíos
export const nativeBaseTheme = extendTheme({
  colors: {
    primary: {
      50: "#FFF8E5",
      100: "#FFEDB3",
      200: "#FFE180",
      300: "#FFD54D",
      400: "#FFC91A",
      500: COLORS.primary, // #F5A623
      600: "#D48A1C",
      700: "#A66E16",
      800: "#795210",
      900: "#4C350A",
    },
    secondary: {
      50: "#E8F4FC",
      100: "#C5E3F7",
      200: "#9FD0F1",
      300: "#79BDEB",
      400: "#54AAE5",
      500: COLORS.accent, // #3B82C4
      600: "#2E68A0",
      700: "#224E79",
      800: "#163452",
      900: "#0B1A29",
    },
  },
  config: {
    initialColorMode: "light",
  },
  components: {
    Button: {
      baseStyle: {
        _pressed: {
          opacity: 0.8,
        },
      },
      defaultProps: {
        colorScheme: "primary",
      },
    },
    Input: {
      baseStyle: {
        _focus: {
          borderColor: COLORS.primary,
        },
      },
    },
    Select: {
      baseStyle: {
        _focus: {
          borderColor: COLORS.primary,
        },
      },
    },
    Modal: {
      baseStyle: {
        _backdrop: {
          bg: "rgba(0,0,0,0.5)",
        },
      },
    },
  },
});

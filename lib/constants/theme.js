export const COLORS = {
  // Colores primarios
  primary: "#62EFFF",
  primaryDark: "#215055",
  secondary: "#52C7D5",
  tertiary: "#317880",

  // Colores de texto
  textPrimary: "#215055",
  textSecondary: "#34656A",
  textLight: "#FFFFFF",
  textMuted: "#999999",

  // Colores de fondo
  background: "#62EFFF",
  backgroundDark: "#215055",
  backgroundLight: "#FFFFFF",

  // Colores de estado
  success: "#4CAF50",
  error: "#F44336",
  warning: "#FFC107",

  // Colores de la matriz
  matrix: {
    item: "#215055",
    itemText: "#62EFFF",
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const FONT_SIZES = {
  small: 12,
  body: 14,
  subtitle: 16,
  title: 18,
  header: 24,
};

export const BORDER_RADIUS = {
  small: 4,
  medium: 8,
  large: 12,
  round: 50,
};

// Estilos comunes reutilizables
export const COMMON_STYLES = {
  button: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
  },
  buttonText: {
    fontSize: FONT_SIZES.title,
    fontWeight: "bold",
    color: COLORS.textLight,
  },
  input: {
    borderColor: COLORS.primaryDark,
    placeholderTextColor: COLORS.textSecondary,
  },
  modal: {
    header: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
    body: { backgroundColor: COLORS.primary },
    footer: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  },
};

export const COLORS = {
  background: "#F2F4F6",
  card: "#FFFFFF",
  foreground: "#2D3035",
  primary: "#F5A623",
  primaryDark: "#2D3035",
  accent: "#3B82C4",
  destructive: "#DC4A4A",
  neuLight: "#F8FAFB",
  neuDark: "#B5BDC5",
  muted: "#D8DDE2",
  textPrimary: "#1F2328",
  textSecondary: "#6B7280",
  textLight: "#FFFFFF",
  textMuted: "#9CA3AF",
  matrix: {
    item: "#F2F4F6",
    itemText: "#1F2328",
  },
  categories: {
    necesidades: "#F5A623",
    deseos: "#3B82C4",
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
};

export const FONT_SIZES = {
  small: 12,
  body: 15,
  subtitle: 17,
  title: 20,
  header: 26,
};

export const BORDER_RADIUS = {
  small: 12,
  medium: 16,
  large: 20,
  xl: 24,
  xxl: 28,
  round: 999,
};

export const SHADOWS = {
  neu: {},
  neuLight: {},
  neuStrong: {},
  soft: {},
};

export const COMMON_STYLES = {
  screen: {
    backgroundColor: COLORS.background,
  },
  button: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.round,
    paddingVertical: 12,
    paddingHorizontal: 24,
    ...SHADOWS.neu,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonDanger: {
    backgroundColor: COLORS.destructive,
  },
  buttonText: {
    fontSize: FONT_SIZES.title,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  buttonTextOnDark: {
    color: COLORS.textLight,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.large,
    paddingVertical: 12,
    paddingHorizontal: SPACING.md,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.muted,
    ...SHADOWS.neuLight,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.neu,
  },
  modal: {
    header: {
      backgroundColor: COLORS.card,
      borderColor: "transparent",
    },
    body: {
      backgroundColor: COLORS.card,
    },
    footer: {
      backgroundColor: COLORS.card,
      borderColor: "transparent",
    },
  },
};

export const FLEX_STYLES = {
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowSpaced: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowStart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  column: {
    flexDirection: "column",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  flex1: {
    flex: 1,
  },
};

export const INPUT_STATES = {
  focusStyle: {
    borderColor: COLORS.primary,
  },
  selectedItemStyle: {
    bg: COLORS.card,
  },
};

export const MODAL_PROPS = {
  maxWidth: "720px",
  contentBg: COLORS.card,
};

export const COMPONENT_PROPS = {
  emptyStateText: {
    fontSize: "16",
    color: COLORS.textMuted,
  },
  selectBg: COLORS.card,
  inputBg: COLORS.card,
  modalBg: COLORS.card,
  modalMaxWidth: "720px",
};

export const COMPONENT_STYLES = {
  AppArea: {
    safeAreaView: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
  },

  HomeSection: {
    topSection: {
      flex: 1,
    },
    bottomSection: {
      backgroundColor: COLORS.background,
      paddingVertical: 10,
      paddingBottom: 80,
    },
  },

  GuideSection: {
    safeContainer: {
      flex: 1,
      backgroundColor: COLORS.background,
      padding: SPACING.lg,
      paddingBottom: 90,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    timeline: {
      flex: 1,
      width: "100%",
      backgroundColor: "transparent",
      alignSelf: "stretch",
      paddingHorizontal: SPACING.md,
    },
    timelineList: {
      paddingVertical: SPACING.lg,
    },
    timelineContent: {
      flexGrow: 1,
      justifyContent: "flex-start",
    },
    title: {
      color: COLORS.textPrimary,
      fontWeight: "700",
      fontSize: FONT_SIZES.subtitle,
    },
    description: {
      color: COLORS.textSecondary,
      fontSize: FONT_SIZES.body,
    },
  },

  ListSection: {
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      padding: SPACING.lg,
      paddingBottom: 90,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: SPACING.md,
      marginBottom: SPACING.md,
    },
    title: {
      fontSize: FONT_SIZES.header,
      fontWeight: "800",
      color: COLORS.textPrimary,
      letterSpacing: 0.5,
    },
    listWrapper: {
      flex: 1,
    },
  },

  ModalAddList: {
    header: COMMON_STYLES.modal.header,
    body: COMMON_STYLES.modal.body,
    footer: COMMON_STYLES.modal.footer,
    button: {
      ...COMMON_STYLES.buttonPrimary,
      borderRadius: BORDER_RADIUS.large,
      width: "100%",
      height: 56,
      alignSelf: "center",
      marginBottom: SPACING.md,
      marginHorizontal: SPACING.lg,
      borderWidth: 0,
      borderColor: "transparent",
      paddingVertical: 12,
      paddingHorizontal: SPACING.lg,
      ...SHADOWS.neu,
    },
    compactButton: {
      backgroundColor: COLORS.card,
      borderRadius: BORDER_RADIUS.large,
      padding: SPACING.sm,
      borderWidth: 0,
      borderColor: "transparent",
      ...SHADOWS.neuLight,
    },
    compactIcon: {
      color: COLORS.primary,
    },
    textButton: {
      fontSize: FONT_SIZES.title,
      fontWeight: "700",
      color: COLORS.textLight,
    },
    buttonGroup: {
      ...COMMON_STYLES.button,
      alignSelf: "center",
      backgroundColor: COLORS.card,
      ...SHADOWS.neu,
    },
    textButtonGroup: {
      fontSize: FONT_SIZES.title,
      color: COLORS.textPrimary,
    },
    textButtonGroupSave: {
      fontSize: FONT_SIZES.title,
      color: COLORS.textLight,
    },
  },

  ListOfLists: {
    listItemContainer: {
      paddingBottom: SPACING.lg,
      paddingTop: SPACING.lg,
      paddingHorizontal: SPACING.lg,
      backgroundColor: COLORS.card,
      borderRadius: BORDER_RADIUS.xxl,
      marginHorizontal: 0,
      marginVertical: SPACING.md,
      borderWidth: 2,
      borderColor: COLORS.muted,
      ...SHADOWS.neu,
    },
    listItemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: SPACING.md,
    },
    listTitle: {
      fontSize: FONT_SIZES.subtitle,
      fontWeight: "700",
      color: COLORS.textPrimary,
    },
    itemCount: {
      color: COLORS.textMuted,
      fontSize: FONT_SIZES.small,
    },
    listItem: {
      alignItems: "flex-start",
      paddingLeft: SPACING.md,
      paddingVertical: SPACING.md,
      borderRadius: BORDER_RADIUS.large,
      backgroundColor: COLORS.matrix.item,
      borderWidth: 2,
      borderColor: COLORS.muted,
      ...SHADOWS.neuLight,
    },
    listItemText: {
      fontSize: FONT_SIZES.body,
      color: COLORS.textPrimary,
    },
    listHeaderRow: {
      ...FLEX_STYLES.row,
    },
    listItemIcon: {
      paddingRight: SPACING.md,
      paddingLeft: SPACING.sm,
    },
    listContentContainer: {
      paddingTop: SPACING.md,
      paddingBottom: SPACING.xxl,
    },
  },

  ModalAddItem: {
    container: {
      backgroundColor: COLORS.background,
      marginBottom: SPACING.md,
      ...FLEX_STYLES.center,
    },
    createButton: {
      ...COMMON_STYLES.buttonPrimary,
      ...SHADOWS.neu,
      borderWidth: 2,
      borderColor: COLORS.primary,
      borderRadius: BORDER_RADIUS.round,
      width: "100%",
      height: 56,
      alignSelf: "center",
      paddingVertical: 12,
      paddingHorizontal: SPACING.lg,
    },
    createButtonText: {
      fontSize: FONT_SIZES.title,
      fontWeight: "700",
      color: COLORS.textLight,
    },
    modalHeader: {
      fontWeight: "700",
      color: COLORS.textPrimary,
      fontSize: FONT_SIZES.title,
    },
    modalBodyRow: {
      ...FLEX_STYLES.row,
    },
    selectRow: {
      backgroundColor: COLORS.card,
      borderRadius: BORDER_RADIUS.large,
      paddingVertical: 12,
      paddingHorizontal: SPACING.md,
      borderWidth: 2,
      borderColor: COLORS.muted,
    },
    modalButtonCancel: {
      backgroundColor: COLORS.card,
      borderRadius: BORDER_RADIUS.round,
      paddingVertical: 12,
      paddingHorizontal: SPACING.xl,
      alignSelf: "center",
      borderWidth: 2,
      borderColor: COLORS.muted,
    },
    modalButtonCancelText: {
      fontSize: FONT_SIZES.subtitle,
      fontWeight: "600",
      color: COLORS.textPrimary,
    },
    modalButtonSave: {
      backgroundColor: COLORS.primary,
      borderRadius: BORDER_RADIUS.round,
      paddingVertical: 12,
      paddingHorizontal: SPACING.xl,
      alignSelf: "center",
      flexDirection: "row",
      borderWidth: 2,
      borderColor: COLORS.primary,
    },
    modalButtonSaveText: {
      fontSize: FONT_SIZES.subtitle,
      fontWeight: "600",
      color: COLORS.textLight,
    },
    marginLeftSmall: {
      marginLeft: SPACING.sm,
    },
  },

  Matriz: {
    container: {
      flexDirection: "row",
      backgroundColor: COLORS.background,
      paddingHorizontal: SPACING.lg,
      paddingBottom: SPACING.md,
      gap: SPACING.md,
    },
    column: {
      flex: 1,
      flexDirection: "column",
      gap: SPACING.md,
    },
    quadrantRow: {
      flexDirection: "row",
      alignItems: "stretch",
      gap: SPACING.md,
      flex: 1,
    },
    quadrantCard: {
      flex: 1,
      paddingVertical: SPACING.xs,
      paddingHorizontal: SPACING.md,
      minHeight: 160,
      backgroundColor: COLORS.card,
      borderRadius: BORDER_RADIUS.small,
      borderColor: COLORS.muted,
      ...SHADOWS.neu,
    },
    quadrantWrapper: {
      flex: 1,
      minHeight: 180,
      width: "100%",
      alignSelf: "stretch",
      paddingHorizontal: 0,
    },
    quadrantTitleContainer: {
      marginBottom: SPACING.lg,
    },
    quadrantCategory: {
      fontSize: FONT_SIZES.small,
      fontWeight: "900",
      color: COLORS.primary,
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    quadrantSubLabel: {
      fontSize: FONT_SIZES.small,
      fontWeight: "500",
      color: COLORS.textSecondary,
      marginTop: 4,
    },
    itemsStack: {
      gap: SPACING.md,
    },
    itemsScroll: {
      flexGrow: 1,
      paddingBottom: SPACING.md,
      paddingHorizontal: 0,
    },
    itemsStackEmpty: {
      justifyContent: "center",
      flex: 1,
    },
    itemContainer: {
      borderRadius: BORDER_RADIUS.large,
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.md,
      backgroundColor: COLORS.matrix.item,
      borderWidth: 2,
      borderColor: COLORS.muted,
      ...SHADOWS.neuLight,
      alignSelf: "stretch",
      width: "100%",
    },
    itemText: {
      fontSize: FONT_SIZES.body,
      fontWeight: "600",
      textAlign: "left",
      color: COLORS.matrix.itemText,
      flexShrink: 1,
      flexWrap: "wrap",
      lineHeight: FONT_SIZES.body + 2,
    },
    emptyText: {
      color: COLORS.textMuted,
      fontSize: FONT_SIZES.small,
    },
  },

  SafeContainer: {
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
  },

  NeuView: {
    wrapper: {},
    lightShadow: {
      backgroundColor: COLORS.card,
      borderRadius: BORDER_RADIUS.xl,
      shadowColor: COLORS.neuLight,
      shadowOffset: { width: -4, height: -4 },
      shadowOpacity: 1,
      shadowRadius: 4,
    },
    darkShadow: {
      backgroundColor: COLORS.card,
      borderRadius: BORDER_RADIUS.xl,
      shadowColor: COLORS.neuDark,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
    },
    content: {
      backgroundColor: COLORS.card,
      borderRadius: BORDER_RADIUS.xl,
      overflow: "hidden",
    },
  },

};

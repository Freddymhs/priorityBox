import { SectionList, useToast } from "native-base";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext, useMemo, useCallback } from "react";
import { SafeContainer } from "../../Components/SafeContainer";
import { MyContext } from "../../../lib/Context";
import { useItems, useConfirmation } from "../../../lib/hooks";
import { categorizeItemsByQuadrant } from "../../../lib/utils/matrixUtils";
import { MATRIX_COLUMNS, VERTICAL_LABELS } from "../../../lib/constants/matrix";
import {
  COLORS,
  FONT_SIZES,
  BORDER_RADIUS,
} from "../../../lib/constants/theme";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS.background,
  },
  column: {
    flex: 1,
    flexDirection: "column",
  },
  columnHeader: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDER_RADIUS.medium,
  },
  columnHeaderText: {
    fontWeight: "800",
    color: COLORS.primaryDark,
  },
  quadrantContainer: {
    flex: 1,
    justifyContent: "center",
    width: screenWidth / 2,
    flexDirection: "row",
  },
  quadrantContainerRight: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth / 2,
  },
  verticalLabelContainer: {
    alignItems: "center",
    alignSelf: "center",
  },
  verticalLabelText: {
    fontSize: 13,
    fontWeight: "900",
    color: COLORS.primaryDark,
  },
  itemContainer: {
    margin: 2,
    borderRadius: BORDER_RADIUS.large,
    padding: 7,
    backgroundColor: COLORS.matrix.item,
  },
  itemText: {
    fontSize: FONT_SIZES.body,
    fontWeight: "bold",
    textAlign: "center",
    minWidth: screenWidth / 3,
    color: COLORS.matrix.itemText,
  },
  sectionHeader: {},
});

/**
 * VerticalLabel - Etiqueta vertical para los cuadrantes
 * SOLID: SRP - Solo renderiza etiquetas verticales
 */
const VerticalLabel = ({ letters }) => (
  <View style={styles.verticalLabelContainer}>
    {letters.map((letter, index) => (
      <Text key={index} style={styles.verticalLabelText}>
        {letter}
      </Text>
    ))}
  </View>
);

/**
 * QuadrantItem - Item individual de un cuadrante
 * SOLID: SRP - Solo renderiza un item
 */
const QuadrantItem = ({ item, onDelete }) => (
  <TouchableOpacity onPress={() => onDelete(item)} style={styles.itemContainer}>
    <Text style={styles.itemText}>{item.name}</Text>
  </TouchableOpacity>
);

/**
 * QuadrantList - Lista de items de un cuadrante
 * SOLID: SRP - Solo renderiza la lista de un cuadrante
 */
const QuadrantList = ({ items, onDeleteItem }) => (
  <SectionList
    sections={[{ data: items }]}
    renderItem={({ item }) => (
      <QuadrantItem item={item} onDelete={onDeleteItem} />
    )}
    renderSectionHeader={({ section }) => (
      <Text style={styles.sectionHeader}>{section.title}</Text>
    )}
    keyExtractor={(item, index) => `${item.name}-${index}`}
    showsVerticalScrollIndicator={false}
  />
);

/**
 * MatrixColumn - Columna de la matriz (NECESIDADES o DESEOS)
 * SOLID: SRP - Solo renderiza una columna
 */
const MatrixColumn = ({
  title,
  quadrants,
  onDeleteItem,
  showLabels = true,
}) => (
  <View style={styles.column}>
    <View style={styles.columnHeader}>
      <Text style={styles.columnHeaderText}>{title}</Text>
    </View>

    {quadrants.map((quadrant, index) => (
      <View
        key={quadrant.id}
        style={
          showLabels ? styles.quadrantContainer : styles.quadrantContainerRight
        }
      >
        {showLabels && (
          <VerticalLabel
            letters={
              quadrant.label === "RELEVANTE"
                ? VERTICAL_LABELS.RELEVANTE
                : VERTICAL_LABELS.IRRELEVANTE
            }
          />
        )}
        <QuadrantList items={quadrant.items} onDeleteItem={onDeleteItem} />
      </View>
    ))}
  </View>
);

/**
 * Matriz - Componente principal de la Matriz Eisenhower
 */
export const Matriz = () => {
  const toast = useToast();
  const { boxData, refetchBoxData } = useContext(MyContext);

  // Hooks SOLID
  const { deleteItemFromAll } = useItems(boxData, refetchBoxData);
  const { confirmDeleteItem } = useConfirmation();

  // Categorizar items usando la utilidad pura
  const categorizedItems = useMemo(() => {
    return categorizeItemsByQuadrant(boxData);
  }, [boxData]);

  // Preparar datos para las columnas
  const columnsData = useMemo(
    () => ({
      left: {
        title: MATRIX_COLUMNS.LEFT.title,
        quadrants: MATRIX_COLUMNS.LEFT.quadrants.map((q) => ({
          ...q,
          items: categorizedItems[q.id] || [],
        })),
      },
      right: {
        title: MATRIX_COLUMNS.RIGHT.title,
        quadrants: MATRIX_COLUMNS.RIGHT.quadrants.map((q) => ({
          ...q,
          items: categorizedItems[q.id] || [],
        })),
      },
    }),
    [categorizedItems]
  );

  /**
   * Maneja la eliminación de un item con confirmación
   */
  const handleDeleteItem = useCallback(
    (item) => {
      confirmDeleteItem(async () => {
        const result = await deleteItemFromAll(item);
        if (result.success) {
          toast.show({
            description: "TAREA ELIMINADA",
            placement: "top",
          });
        }
      });
    },
    [confirmDeleteItem, deleteItemFromAll, toast]
  );

  return (
    <SafeContainer style={styles.container}>
      <MatrixColumn
        title={columnsData.left.title}
        quadrants={columnsData.left.quadrants}
        onDeleteItem={handleDeleteItem}
        showLabels={true}
      />
      <MatrixColumn
        title={columnsData.right.title}
        quadrants={columnsData.right.quadrants}
        onDeleteItem={handleDeleteItem}
        showLabels={false}
      />
    </SafeContainer>
  );
};

import { useToast } from "native-base";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { useContext, useMemo, useCallback } from "react";
import { SafeContainer } from "../../Components/SafeContainer";
import { NeuView } from "../../Components/NeuView";
import { MyContext } from "../../../lib/Context";
import { useItems, useConfirmation } from "../../../lib/hooks";
import { categorizeItemsByQuadrant } from "../../../lib/utils/matrixUtils";
import { MATRIX_COLUMNS } from "../../../lib/constants/matrix";
import { COMPONENT_STYLES } from "../../../lib/constants/theme";

const styles = COMPONENT_STYLES.Matriz;

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
const QuadrantList = ({ items, onDeleteItem, category, subLabel }) => (
  <NeuView style={styles.quadrantWrapper} inset={true}>
    <View style={styles.quadrantCard}>
      <View style={styles.quadrantTitleContainer}>
        <Text style={styles.quadrantCategory}>{category}</Text>
        <Text style={styles.quadrantSubLabel}>{subLabel}</Text>
      </View>
      {items && items.length > 0 ? (
        <ScrollView
          style={styles.scrollViewFlex}
          contentContainerStyle={[styles.itemsStack, styles.itemsScroll]}
          showsVerticalScrollIndicator={false}
        >
          {/* s */}
          {items.map((item, index) => (
            <QuadrantItem
              key={`${item.name}-${index}`}
              item={item}
              onDelete={onDeleteItem}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={[styles.itemsStack, styles.itemsStackEmpty]}>
          <Text style={styles.emptyText}>Sin elementos</Text>
        </View>
      )}
    </View>
  </NeuView>
);

/**
 * MatrixColumn - Columna de la matriz (NECESIDADES o DESEOS)
 * SOLID: SRP - Solo renderiza una columna
 */
const MatrixColumn = ({ quadrants, onDeleteItem }) => (
  <View style={styles.column}>
    {quadrants.map((quadrant, index) => (
      <View key={quadrant.id} style={styles.quadrantRow}>
        <QuadrantList
          items={quadrant.items}
          onDeleteItem={onDeleteItem}
          category={quadrant.categoryName}
          subLabel={quadrant.subLabelText}
        />
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
          categoryName: MATRIX_COLUMNS.LEFT.title, // "NECESIDADES"
          subLabelText:
            q.label === "RELEVANTE" ? "Importantes" : "Menos importantes",
          items: categorizedItems[q.id] || [],
        })),
      },
      right: {
        title: MATRIX_COLUMNS.RIGHT.title,
        quadrants: MATRIX_COLUMNS.RIGHT.quadrants.map((q) => ({
          ...q,
          categoryName: MATRIX_COLUMNS.RIGHT.title, // "DESEOS"
          subLabelText:
            q.label === "RELEVANTE" ? "Importantes" : "Menos importantes",
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
            render: () => {
              return (
                <View style={styles.toastContainer}>
                  <Text style={styles.toastText}>TAREA ELIMINADA</Text>
                </View>
              );
            },
          });
        }
      });
    },
    [confirmDeleteItem, deleteItemFromAll, toast]
  );

  return (
    <SafeContainer style={styles.container}>
      <MatrixColumn
        quadrants={columnsData.left.quadrants}
        onDeleteItem={handleDeleteItem}
      />
      <MatrixColumn
        quadrants={columnsData.right.quadrants}
        onDeleteItem={handleDeleteItem}
      />
    </SafeContainer>
  );
};

import {
  Button,
  Modal,
  View,
  Select,
  CheckIcon,
  useToast,
  Input,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { Text, Alert } from "react-native";
import { ModalAddList } from "../ListSection/ModalAddList";
import { MyContext } from "../../../lib/Context";
import { useItems, useLists } from "../../../lib/hooks";
import { SELECT_OPTIONS } from "../../../lib/constants/matrix";
import { COLORS, COMMON_STYLES } from "../../../lib/constants/theme";

export const ModalAddItem = () => {
  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const { boxData, refetchBoxData } = useContext(MyContext);

  // Hooks SOLID
  const { addItem, createItem, isLoading } = useItems(boxData, refetchBoxData);
  const { getListNames } = useLists(boxData, refetchBoxData);

  const [listNames, setListNames] = useState([]);
  const [formData, setFormData] = useState(() => createItem());
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    setListNames(getListNames());
  }, [boxData, getListNames]);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(createItem());
    setSelectedList(null);
  }, [createItem]);

  const handleSubmit = useCallback(async () => {
    // Validación básica
    if (!formData.name || formData.name.trim().length === 0) {
      Alert.alert("Error", "El nombre es requerido");
      return;
    }

    if (!selectedList) {
      Alert.alert("Error", "Seleccione una lista");
      return;
    }

    const result = await addItem(selectedList, formData);

    if (result.success) {
      toast.show({
        description: "TAREA AGREGADA",
        placement: "top",
      });
      setModalVisible(false);
      resetForm();
    } else {
      Alert.alert("Error", result.error || "Error al agregar el item");
    }
  }, [formData, selectedList, addItem, toast, resetForm]);
  return (
    <View backgroundColor={COLORS.background} marginBottom={11}>
      <Button
        style={{
          ...COMMON_STYLES.button,
          width: 233,
          height: 55,
          alignSelf: "center",
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={COMMON_STYLES.buttonText}>Crear Itesssm</Text>
      </Button>

      <Modal
        animationType="slide"
        transparent={true}
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <Modal.Content maxWidth="720px">
          <Modal.CloseButton />
          <Modal.Header style={COMMON_STYLES.modal.header}>
            Nuevo Item
          </Modal.Header>
          <Modal.Body style={COMMON_STYLES.modal.body}>
            <Input
              borderColor={COLORS.primaryDark}
              placeholderTextColor={COLORS.textSecondary}
              w="100%"
              onChangeText={(value) => updateField("name", value)}
              value={formData.name}
              placeholder="Asigne un nombre"
            />
            <View style={{ flexDirection: "row" }}>
              <Select
                flex={5}
                borderColor={COLORS.primaryDark}
                placeholderTextColor={COLORS.textSecondary}
                w="100%"
                selectedValue={selectedList}
                defaultValue={selectedList}
                onValueChange={setSelectedList}
                placeholder="A que lista agregar este item?"
                _selectedItem={{ bg: "cyan.600" }}
              >
                {listNames?.map((name, i) => (
                  <Select.Item label={name} value={name} key={i} />
                ))}
              </Select>
              {ModalAddList({ compactSize: true })}
            </View>
            <Select
              borderColor={COLORS.primaryDark}
              placeholderTextColor={COLORS.textSecondary}
              w="100%"
              selectedValue={formData.type}
              minWidth={200}
              placeholder="Deseo o prioridad?"
              onValueChange={(value) => updateField("type", value)}
            >
              {SELECT_OPTIONS.TYPE.map((opt) => (
                <Select.Item
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                />
              ))}
            </Select>
            <Select
              borderColor={COLORS.primaryDark}
              placeholderTextColor={COLORS.textSecondary}
              w="100%"
              selectedValue={formData.priority}
              minWidth={200}
              placeholder="Nivel de relevancia"
              onValueChange={(value) => updateField("priority", value)}
              _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />,
              }}
            >
              {SELECT_OPTIONS.PRIORITY.map((opt) => (
                <Select.Item
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                />
              ))}
            </Select>
          </Modal.Body>

          <Modal.Footer style={COMMON_STYLES.modal.footer}>
            <Button.Group>
              <Button
                style={{
                  ...COMMON_STYLES.button,
                  alignSelf: "center",
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ fontSize: 18, color: COLORS.textLight }}>
                  <FontAwesome
                    name="close"
                    size={21}
                    color={COLORS.textLight}
                  />
                  Cancelar
                </Text>
              </Button>
              <Button
                isDisabled={isLoading}
                style={{
                  ...COMMON_STYLES.button,
                  alignSelf: "center",
                  flexDirection: "row",
                }}
                onPress={handleSubmit}
              >
                <Text style={{ fontSize: 18, color: COLORS.textLight }}>
                  <FontAwesome
                    name="check"
                    size={21}
                    color={COLORS.textLight}
                  />
                  {isLoading ? "Guardando..." : "Guardar"}
                </Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

import {
  Button,
  Modal,
  View,
  Select,
  useToast,
  Input,
} from "native-base";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { ModalAddList } from "../ListSection/ModalAddList";
import { MyContext } from "../../../lib/Context";
import { useItems, useLists } from "../../../lib/hooks";
import { SELECT_OPTIONS } from "../../../lib/constants/matrix";
import {
  COLORS,
  COMMON_STYLES,
  COMPONENT_STYLES,
  INPUT_STATES,
  MODAL_PROPS,
  COMPONENT_PROPS,
} from "../../../lib/constants/theme";

const styles = COMPONENT_STYLES.ModalAddItem;

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
      Alert.alert("Error", result.error || "Error al agregar el elemento");
    }
  }, [formData, selectedList, addItem, toast, resetForm]);
  return (
    <View style={styles.container}>
      <Button
        style={styles.createButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.createButtonText}>Crear elemento</Text>
      </Button>

      <Modal
        animationType="slide"
        transparent={true}
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "height"}
          enabled
          style={{ flex: 1, justifyContent: "center" }}
        >
          <Modal.Content maxWidth={MODAL_PROPS.maxWidth} bg={MODAL_PROPS.contentBg}>
            <Modal.CloseButton />
            <Modal.Header style={COMMON_STYLES.modal.header}>
              <Text style={styles.modalHeader}>Nuevo elemento</Text>
            </Modal.Header>
            <Modal.Body style={COMMON_STYLES.modal.body}>
              <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <Input
              variant="unstyled"
              style={COMMON_STYLES.input}
              _focus={INPUT_STATES.focusStyle}
              onChangeText={(value) => updateField("name", value)}
              value={formData.name}
              placeholder="Asigne un nombre"
              placeholderTextColor={COLORS.textMuted}
            />
            <View style={styles.modalBodyRow}>
              <Select
                flex={5}
                borderWidth={0}
                bg={COMPONENT_PROPS.selectBg}
                style={styles.selectRow}
                selectedValue={selectedList}
                defaultValue={selectedList}
                onValueChange={setSelectedList}
                placeholder="¿A qué lista agregar este elemento?"
                placeholderTextColor={COLORS.textMuted}
                _selectedItem={INPUT_STATES.selectedItemStyle}
              >
                {listNames?.map((name, i) => (
                  <Select.Item label={name} value={name} key={i} />
                ))}
              </Select>
              <View style={styles.marginLeftSmall}>
                <ModalAddList compactSize={true} />
              </View>
            </View>
            <Select
              borderWidth={0}
              bg={COMPONENT_PROPS.selectBg}
              style={styles.selectRow}
              selectedValue={formData.type}
              minWidth={200}
              placeholder="¿Deseo o necesidad?"
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
              borderWidth={0}
              bg={COMPONENT_PROPS.selectBg}
              style={styles.selectRow}
              selectedValue={formData.priority}
              minWidth={200}
              placeholder="Nivel de relevancia"
              onValueChange={(value) => updateField("priority", value)}
              _selectedItem={INPUT_STATES.selectedItemStyle}
            >
              {SELECT_OPTIONS.PRIORITY.map((opt) => (
                <Select.Item
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                />
              ))}
            </Select>
              </ScrollView>
            </Modal.Body>

            <Modal.Footer style={COMMON_STYLES.modal.footer}>
              <Button.Group>
                <Button
                  style={styles.modalButtonCancel}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonCancelText}>Cancelar</Text>
                </Button>
                <Button
                  isDisabled={isLoading}
                  style={styles.modalButtonSave}
                  onPress={handleSubmit}
                >
                  <Text style={styles.modalButtonSaveText}>
                    {isLoading ? "Guardando..." : "Guardar"}
                  </Text>
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

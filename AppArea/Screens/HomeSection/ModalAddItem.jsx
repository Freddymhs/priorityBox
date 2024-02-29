import { onValue, ref, set } from "firebase/database";
import { Button, Modal, View, Select } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { CheckIcon } from "native-base";
import React, { useState, useEffect, useContext } from "react";
import { Text, Alert } from "react-native";
import { useToast, Input } from "native-base";
import { db } from "../../../lib/init-firebase";
import { ModalAddList } from "../ListSection/ModalAddList";
import { MyContext } from "../../../lib/Context";

export const ModalAddItem = () => {
  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const { boxData, refetchBoxData } = useContext(MyContext);
  const [listNames, setListNames] = useState([]); // disponibles

  useEffect(() => {
    setListNames(Object?.keys(boxData || []));
  }, [boxData]);

  const [text, onChangeText] = useState({
    name: "",
    priority: "bajo",
    type: "deseo",
  });
  const [selectedList, setSelectedList] = useState(null);

  const addItemInList = () => {
    if (
      text?.name?.length < 1 ||
      selectedList === null ||
      text?.type?.length === null ||
      text?.priority?.length === null
    ) {
      Alert.alert("complete todos los campos vacios");
      return;
    }

    const newPosition = boxData[selectedList]?.items?.length || 0;
    set(ref(db, `/listas/${selectedList}/items/${newPosition}`), text);
    toast.show({
      description: "TAREA AGREGADA",
      placement: "top",
    });
    refetchBoxData();
    setModalVisible(false);

    onChangeText((prev) => {
      return {
        ...prev,
        name: null,
      };
    });
  };
  // const completedForm = text?.name?.length < 1 || selectedList === null || type;
  return (
    <View backgroundColor="#62EFFF" marginBottom={11}>
      <Text>{listNames}</Text>
      <Button
        style={{
          backgroundColor: "#215055",
          borderRadius: 8,
          padding: 10,
          width: 233,
          height: 55,
          alignSelf: "center",
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
          Crear Item
        </Text>
      </Button>

      <Modal
        animationType="slide"
        transparent={true}
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Modal.Content maxWidth="720px">
          <Modal.CloseButton />
          <Modal.Header
            style={{ backgroundColor: "#62EFFF", borderColor: "#62EFFF" }}
          >
            Nuevo Item
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#62EFFF" }}>
            <Input
              borderColor="#215055"
              placeholderTextColor="#34656A"
              w="100%"
              onChangeText={(e) => {
                onChangeText((prev) => {
                  return { ...prev, name: e };
                });
              }}
              value={text.name}
              placeholder="Asigne un nombre"
            />
            <View style={{ flexDirection: "row" }}>
              <Select
                flex={5}
                borderColor="#215055"
                placeholderTextColor="#34656A"
                w="100%"
                selectedValue={selectedList}
                defaultValue={selectedList}
                onValueChange={(itemValue) => setSelectedList(itemValue)}
                placeholder="A que lista agregar este item?"
                _selectedItem={{ bg: "cyan.600" }}
              >
                {listNames?.map((name, i) => {
                  return <Select.Item label={name} value={name} key={i} />;
                })}
              </Select>
              {ModalAddList({ compactSize: true })}
            </View>
            <Select
              borderColor="#215055"
              placeholderTextColor="#34656A"
              w="100%"
              selectedValue={text.type}
              minWidth={200}
              placeholder="Deseo o prioridad?"
              onValueChange={(itemValue) =>
                onChangeText((prev) => ({ ...prev, type: itemValue }))
              }
            >
              <Select.Item label="necesidad" value="necesidad" />
              <Select.Item label="deseo" value="deseo" />
            </Select>
            <Select
              borderColor="#215055"
              placeholderTextColor="#34656A"
              w="100%"
              selectedValue={text.priority}
              minWidth={200}
              placeholder="Nivel de relevancia "
              onValueChange={(itemValue) =>
                onChangeText((prev) => ({ ...prev, priority: itemValue }))
              }
              _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />,
              }}
            >
              <Select.Item label="Muy Importante" value="alto" />
              <Select.Item label="Poco Importante" value="bajo" />
            </Select>
          </Modal.Body>

          <Modal.Footer
            style={{ backgroundColor: "#62EFFF", borderColor: "#62EFFF" }}
          >
            <Button.Group>
              <Button
                style={{
                  backgroundColor: "#215055",
                  borderRadius: 8,
                  padding: 10,
                  alignSelf: "center",
                }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text
                  style={{
                    color: "#215055",
                  }}
                >
                  <Text style={{ fontSize: 18, color: "white" }}>
                    <FontAwesome name="close" size={21} color="white" />
                    Cancelar
                  </Text>
                </Text>
              </Button>
              <Button
                // isDisabled={completedForm}
                style={{
                  backgroundColor: "#215055",
                  borderRadius: 8,
                  padding: 10,
                  alignSelf: "center",
                  flexDirection: "row",
                }}
                onPress={() => {
                  addItemInList();
                }}
              >
                <Text style={{ fontSize: 18, color: "white" }}>
                  <FontAwesome name="check" size={21} color="white" />
                  Guardar
                </Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

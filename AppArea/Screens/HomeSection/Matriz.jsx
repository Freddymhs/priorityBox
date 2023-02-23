import { SectionList } from "native-base";

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { handleDeleteByItem } from "../../../lib/helpers";
import { MyContext } from "../../../lib/Context";
import { useContext } from "react";

export const Matriz = ({ setMainLists }) => {
  const { boxData, refetchBoxData } = useContext(MyContext);
  const screenWidth = Dimensions.get("window").width;
  const styles = StyleSheet.create({
    itemContainer: {
      margin: 2,
      borderRadius: 12,
      padding: 7,
      backgroundColor: "#215055",
    },
    itemText: {
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center",
      minWidth: screenWidth / 3,
      color: "#62EFFF",
    },
    sectionHeader: {},
  });
  const keysInList = boxData && Object?.keys(boxData);

  const formattedItemsFromLists = keysInList?.reduce(
    (accum = [], key) => {
      const list = boxData[key];

      list?.items?.filter((item) => {
        const important =
          item?.type === "necesidad" && item?.priority === "alto";
        const midImportant =
          item.type === "necesidad" && item.priority === "bajo";
        const lowImprtant = item.type === "deseo" && item.priority === "alto";
        const noImportant = item.type === "deseo" && item.priority === "bajo";
        if (important) {
          accum[0]?.push(item);
        }
        if (midImportant) {
          accum[1]?.push(item);
        }
        if (lowImprtant) {
          accum[2]?.push(item);
        }
        if (noImportant) {
          accum[3]?.push(item);
        }
      });

      return accum;
    },
    [[], [], [], []]
  );

  return (
    <View
      style={{
        flex: 20,
        flexDirection: "row",
        backgroundColor: "#62EFFF",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",

            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#215055",
            }}
          >
            NECESIDADES
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            width: screenWidth / 2,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              R
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              E
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              L
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              E
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              V
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              A
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              N
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              T
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              E
            </Text>
          </View>
          <SectionList
            sections={[
              {
                data: formattedItemsFromLists?.[0] || [],
              },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  handleDeleteByItem(item, boxData, setMainLists);
                }}
                style={styles.itemContainer}
              >
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            width: screenWidth / 2,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              I
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              R
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              E
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              L
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              E
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              V
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              A
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              N
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              T
            </Text>
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#215055" }}
            >
              E
            </Text>
          </View>
          <SectionList
            sections={[
              {
                data: formattedItemsFromLists?.[1] || [],
              },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  handleDeleteByItem(item, boxData, setMainLists);
                }}
                style={styles.itemContainer}
              >
                <Text style={styles.itemText}>{item.name} </Text>
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",

            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#215055",
            }}
          >
            DESEOS
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: screenWidth / 2,
            borderColor: "#215055",
          }}
        >
          <SectionList
            sections={[
              {
                data: formattedItemsFromLists?.[2] || [],
              },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  handleDeleteByItem(item, boxData, setMainLists);
                }}
                style={styles.itemContainer}
              >
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: screenWidth / 2,
          }}
        >
          <SectionList
            sections={[
              {
                data: formattedItemsFromLists?.[3] || [],
              },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  handleDeleteByItem(item, boxData, setMainLists);
                }}
                style={styles.itemContainer}
              >
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

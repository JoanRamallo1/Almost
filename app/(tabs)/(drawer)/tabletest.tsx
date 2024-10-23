import { Image, StyleSheet, Platform } from "react-native";
import { Text } from "react-native";
import { View, TextInput, Button } from "react-native";
import axios from "axios";
import { useState } from "react";
import { DataTable, TouchableRipple } from "react-native-paper";
import * as React from "react";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4, 10, 100]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  const router = useRouter();

  const handleNameDetails = (item: {
    name: string;
    calories: number;
    fat: number;
  }) => {
    console.log(item);
    router.push({
      pathname: "/appViews/NameDetails",
      params: { name: item.name, calories: item.calories, fat: item.fat }, // Can be passed directly
    });
  };

  const [items] = React.useState([
    {
      key: 1,
      name: "Cupcake",
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: "Eclair",
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: "Frozen yogurt",
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 5,
      name: "Honeycomb",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 6,
      name: "Ice Cream",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 7,
      name: "Jelly",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 8,
      name: "KitKat",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 9,
      name: "Ice cream sandwich",
      calories: 237,
      fat: 9,
    },
    {
      key: 10,
      name: "Jelly Bean",
      calories: 375,
      fat: 0,
    },
  ]);

  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const handleRowPress = (key: number) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(key)
        ? prevSelectedRows.filter((rowKey) => rowKey !== key)
        : [...prevSelectedRows, key],
    );
  };
  console.log(selectedRows);

  return (
    <View style={styles.container}>
      <Button
        title="Select Something"
        onPress={(data) => console.log(data)}
        disabled={selectedRows.length === 0}
      />
      <Button
        title="Select All"
        onPress={() => setSelectedRows(items.map((item) => item.key))}
      />
      <Button title="Unselect All" onPress={() => setSelectedRows([])}></Button>
      <Button
        title="Select multiple things"
        onPress={(data) => console.log(data)}
        disabled={selectedRows.length <= 1}
      />
      <Button
        title="Select only one"
        onPress={(data) => console.log(data)}
        disabled={selectedRows.length !== 1}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Dessert</DataTable.Title>
          <DataTable.Title numeric>Calories</DataTable.Title>
          <DataTable.Title numeric>Fat</DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map((item) => (
          <DataTable.Row
            onPress={() => handleRowPress(item.key)}
            rippleColor="rgba(0, 0, 0, .32)"
            key={item.key}
            style={{
              backgroundColor: selectedRows.includes(item.key)
                ? "lightgray"
                : "white",
            }}
          >
            <DataTable.Cell>
              <Button title="Detail" onPress={() => handleNameDetails(item)} />
            </DataTable.Cell>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
            <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    width: "90%",
    marginTop: 8,
    borderColor: "black",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

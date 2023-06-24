import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";

const styles = StyleSheet.create({
  container: {
    // borderColor: "#fff",
    backgroundColor: "#7CA982",
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 10,
  },
  inputField: {
    // color: "#fff",
    // height: 50,
    maxHeight: 50,
    flex: 1,
  },
  categoryPicker: {
    flex: 1,
    // marginLeft: 10,

    // color: "#fff",
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown: {
    margin: 16,
    height: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    width: 150,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    // width: 100,
    fontSize: 16,
  },
});

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const TaskInput = (props) => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");

  const [value, setValue] = useState(null);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value}
      </View>
    );
  };

  const handleAddTask = () => {
    const newTask = {
      task,
      category,
    };
    props.addTask(newTask);
    setTask("");
    setCategory("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TextInput
        style={styles.inputField}
        value={task}
        onChangeText={setTask}
        placeholder="Write here"
      />
      {/* <Picker
        style={styles.categoryPicker}
        selectedValue={category}
        onValueChange={setCategory}
      >
        <Picker.Item label="Select a category" value="" />
        <Picker.Item label="Apple" value="Apple" />
        <Picker.Item label="Banana" value="Banana" />
        <Picker.Item label="Cherry" value="Cherry" />
        <Picker.Item label="Milk" value="Milk" />
      </Picker> */}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Категория"
        searchPlaceholder="Поиск..."
        value={category}
        onChange={(item) => {
          setCategory(item.value);
        }}
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={styles.icon}
        //     color="black"
        //     name="Safety"
        //     size={20}
        //   />
        // )}
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={handleAddTask}>
        {/* <View style={styles.button}> */}
        <View>
          <MaterialIcons name="add" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default TaskInput;

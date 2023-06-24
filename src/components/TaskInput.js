import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

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
    // flex: 1,
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
});

const TaskInput = (props) => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");

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

      <TouchableOpacity onPress={handleAddTask}>
        {/* <View style={styles.button}> */}
        <View>
          <MaterialIcons name="add" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <Picker
        style={styles.categoryPicker}
        selectedValue={category}
        onValueChange={setCategory}
      >
        <Picker.Item label="Select a category" value="" />
        <Picker.Item label="Apple" value="Apple" />
        <Picker.Item label="Banana" value="Banana" />
        <Picker.Item label="Cherry" value="Cherry" />
        <Picker.Item label="Milk" value="Milk" />
      </Picker>
    </KeyboardAvoidingView>
  );
};

export default TaskInput;

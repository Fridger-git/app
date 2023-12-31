import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SearchBar } from "@rneui/themed";
import { Keyboard, ScrollView, Text } from "react-native";
import TaskInput from "../components/TaskInput";
import TaskItem from "../components/TaskItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forAnd: {
    top: Platform.OS === "android" ? 30 : 0,
    "&:first-child": {
      backgroundColor: "red",
    },
  },
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  },
});

const HomePage = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (newSearch) => {
    setSearch(newSearch);
  };

  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    if (newTask.task == null || newTask.category == null) return;
    setTasks([...tasks, newTask]);
    Keyboard.dismiss();
  };

  const deleteTask = (deleteIndex) => {
    setTasks(tasks.filter((value, index) => index != deleteIndex));
  };

  return (
    <View style={styles.container}>
      <View style={styles.forAnd}>
        <SearchBar
          // platform="ios"
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
        />
        <ScrollView style={styles.scrollView}>
          {tasks.map((task, index) => {
            return (
              <View key={index} style={styles.taskContainer}>
                <TaskItem
                  index={index + 1}
                  task={task}
                  deleteTask={() => deleteTask(index)}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <TaskInput addTask={addTask} />
    </View>
  );
};

export default HomePage;

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setAddMode] = useState(false);

  const addGoalHandler = (enteredGoal) => {

    if(enteredGoal.length === 0) {
      return;
    }

    setCourseGoals(currentGoals => [
      ...currentGoals,
      { key: Math.random().toString(), value: enteredGoal }
    ]);
    setAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.key !== goalId);
    });
  };

  const cancelAddGoalHandler = () => {
    setAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setAddMode(true)}/>
      <GoalInput 
        visible={isAddMode}
        onAddGoal={addGoalHandler} 
        onCancelGoal={cancelAddGoalHandler}/>
      <FlatList data={courseGoals} renderItem={itemData => (
        <GoalItem
          id={itemData.item.key}
          title={itemData.item.value}
          onDelete={removeGoalHandler}
        />
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
});
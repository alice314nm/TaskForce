import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios'; 

export default function CreateTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [category, setCategory] = useState('assignment');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSubmit = async () => {
    try {
      await axios.post('http://10.0.2.2:5000/', {
        title,
        description,
        dueDate,
        completed: false,
        category
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      // Update date part of dueDate
      const currentDate = new Date(selectedDate);
      currentDate.setHours(dueDate.getHours());
      currentDate.setMinutes(dueDate.getMinutes());
      setDueDate(currentDate);

      // Show time picker after date is selected
      setShowTimePicker(true);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      // Update time part of dueDate
      const currentDate = new Date(dueDate);
      currentDate.setHours(selectedTime.getHours());
      currentDate.setMinutes(selectedTime.getMinutes());
      setDueDate(currentDate);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={styles.input}
      />

      <Button
        onPress={() => setShowDatePicker(true)}
        mode="outlined"
        style={styles.input}
      >
        Select Due Date: {dueDate.toLocaleString()}
      </Button>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={dueDate}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}

      <RadioButton.Group
        onValueChange={value => setCategory(value)}
        value={category}
      >
        <RadioButton.Item label="Assignment" value="assignment" />
        <RadioButton.Item label="Test" value="test" />
      </RadioButton.Group>

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Create Task
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});
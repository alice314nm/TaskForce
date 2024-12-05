import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import TaskCard from './TaskCard';

const WeeklyCalendar = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const currentDate = new Date();
  const [chosenDay, setChosenDay] = useState(currentDate.getDay());
  const [weekTasks, setWeekTasks] = useState(Array(7).fill([]));

  // Add navigation functions
  const goToPreviousWeek = () => setWeekOffset(prev => prev - 1);
  const goToNextWeek = () => setWeekOffset(prev => prev + 1);

  // Modified getWeekDates to use weekOffset
  const getWeekDates = () => {
    const dates = [];
    const firstDayOfWeek = new Date(currentDate);
    // Adjust to start of week (Sunday) and apply week offset
    firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (weekOffset * 7));

    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDates = getWeekDates();

  const fetchWeekTasks = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/');
      const allTasks = response.data;
      const dates = getWeekDates();
  
      const tasksByDay = dates.map((date) => {
        return allTasks.filter(
          (task) => new Date(task.dueDate).toDateString() === date.toDateString()
        );
      });
  
      setWeekTasks(tasksByDay);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchWeekTasks();
    }, []),
  );

  useEffect(() => {
    fetchWeekTasks();
  }, [weekOffset]);

  return (
    <View style={styles.container}>
      {/* Week Navigation */}
      <View style={styles.navigation}>
        <IconButton
          icon="chevron-left"
          size={24}
          onPress={goToPreviousWeek}
        />
        <Text style={styles.weekText}>
          Week of {getWeekDates()[0].toLocaleDateString()}
        </Text>
        <IconButton
          icon="chevron-right"
          size={24}
          onPress={goToNextWeek}
        />
      </View>

      {/* Day headers */}
      <View style={styles.headerRow}>
        {weekDays.map((day, index) => (
          <TouchableOpacity
            key={index + ''}
            style={[
              styles.dayHeader,
              styles.dayTaskBarArea,
              {backgroundColor: index === chosenDay ? '#EEEEEE' : 'white'},
            ]}
            onPress={() => setChosenDay(index)}>
            <View style={styles.textView}>
              <Text style={styles.dayText}>{day}</Text>
              <Text style={styles.dateText}>{weekDates[index].getDate()}</Text>
            </View>
            {/* Task Bar */}
            <View
            style={[
              weekTasks[index].length >= 10
                ? styles.dayTaskBarFull
                : styles.dayTaskBar,
              {
                height: `${
                  weekTasks[index].length > 10
                    ? 87
                    : weekTasks[index].length * 8.7
                }%`,
              },
            ]}
          />
          </TouchableOpacity>
        ))}
      </View>

      {/* Calendar grid - placeholder for now */}
      <View style={styles.calendarGrid}>
        <Text style={styles.dueText}>Tasks due {weekDates[chosenDay].toDateString()}</Text>
        <FlatList
          data={weekTasks[chosenDay]}
          renderItem={({ item }) => <TaskCard task={item} />}
          keyExtractor={item => item._id}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //paddingVertical: 10, // Removed padding
    borderBottomWidth: 1,
    //borderBottomColor: '#e0e0e0',
    height: '50%',
  },
  dayHeader: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dayText: {
    marginTop: 10, // added margin top
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateText: {
    marginBottom: 5, // added margin bottom
    fontSize: 12,
    color: '#666',
  },
  dueText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
    fontWeight: 'bold',
  },
  textView: {
    alignItems: 'center',
  },
  calendarGrid: {
    flex: 1,
    padding: 10,
  },
  // Added styles, if the day is chosen, the background will be gray
  dayTaskBarArea: {
    borderColor: '#f0dcfc',
    borderWidth: 1,
  },
  // if the tasks are less than 10, the bar will be violet
  dayTaskBar: {
    backgroundColor: '#6750a4',
  },
  // if the tasks are more than 10, the bar will turn red
  dayTaskBarFull: {
    backgroundColor: 'red',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#EEEEEE',
  },
  weekText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WeeklyCalendar;
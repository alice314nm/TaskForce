import {set} from 'mongoose';
import React from 'react';
import {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';

const WeeklyCalendar = () => {
  // declare a variable for bar height (total height of the bar)
  const currentDate = new Date();
  const [chosenDay, setChosenDay] = useState(currentDate.getDay());
  const [weekTasks, setWeekTasks] = useState<any[][]>([]);

  // Get dates for the current week
  const getWeekDates = () => {
    const dates = [];
    const firstDayOfWeek = new Date(currentDate);
    // Adjust to start of week (Sunday)
    firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    // Create array of 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDates = getWeekDates();

  // Fetch tasks for the week
  const fetchWeekTasks = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/');
      const dates = getWeekDates();
      const tasks = await response.data;
      dates.forEach((date, index) => {
        const dayTasks = tasks.filter(
          (task: {dueDate: Date}) => new Date(task.dueDate) === date,
        );
        setWeekTasks(prevTasks => [...prevTasks, dayTasks]);
      });
    } catch (error) {
      console.error(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchWeekTasks();
    }, []),
  );
  let weekTasksHardcoded = [
    [1, 2, 3],
    [1, 2],
    [],
    [1, 2, 3, 4],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1],
    [1, 1, 1, 1, 1],
  ]; // dummy data, please replace with actual data, which
  // should be an array of tasks for the day
  // calculated based on fetchWeekTasks function down below
  // Get current date
  return (
    <View style={styles.container}>
      {/* Day headers */}
      <View style={styles.headerRow}>
        {weekDays.map((day, index) => (
          <TouchableOpacity
            key={index + ''}
            style={[
              styles.dayHeader,
              styles.dayTaskBarArea,
              {backgroundColor: index + 1 === chosenDay ? '#EEEEEE' : 'white'},
            ]}
            onPress={() => setChosenDay(index + 1)}>
            <View style={styles.textView}>
              <Text style={styles.dayText}>{day}</Text>
              <Text style={styles.dateText}>{weekDates[index].getDate()}</Text>
            </View>
            {/* Task Bar */}
            <View
              style={[
                weekTasksHardcoded[index].length >= 10
                  ? styles.dayTaskBarFull
                  : styles.dayTaskBar,
                {
                  height: `${
                    weekTasksHardcoded[index].length > 10
                      ? 87
                      : weekTasksHardcoded[index].length * 8.7
                  }%`,
                },
              ]}></View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Calendar grid - placeholder for now */}
      <View style={styles.calendarGrid}>
        <Text>Calendar Content</Text>
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
  textView: {
    alignItems: 'center',
  },
  calendarGrid: {
    flex: 1,
    padding: 10,
  },
  // Added styles, if the day is chosen, the background will be gray
  dayTaskBarArea: {
    borderColor: '#5EA1A4',
    borderWidth: 1,
  },
  // if the tasks are less than 10, the bar will be green
  dayTaskBar: {
    backgroundColor: '#5EA1A4',
  },
  // if the tasks are more than 10, the bar will turn red
  dayTaskBarFull: {
    backgroundColor: 'red',
  },
});

export default WeeklyCalendar;
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WeeklyCalendar = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  // Get current date
  const currentDate = new Date();
  
  // Get dates for the current week
  const getWeekDates = () => {
    const dates = [];
    const currentDate = new Date();
    const firstDayOfWeek = new Date(currentDate);

    // Adjust to start of week (Sunday) and apply week offset
    firstDayOfWeek.setDate(
      currentDate.getDate() - currentDate.getDay() + weekOffset * 7
    );

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

  return (
    <View style={styles.container}>
      {/* Week Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => setWeekOffset(weekOffset - 1)}>
          <Text style={styles.navButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>
          Week of {weekDates[0].toLocaleDateString()}
        </Text>
        <TouchableOpacity onPress={() => setWeekOffset(weekOffset + 1)}>
          <Text style={styles.navButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Day headers */}
      <View style={styles.headerRow}>
        {weekDays.map((day, index) => (
          <View key={day} style={styles.dayHeader}>
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.dateText}>{weekDates[index].getDate()}</Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dayHeader: {
    alignItems: 'center',
    flex: 1,
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  calendarGrid: {
    flex: 1,
    padding: 10,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  navButton: {
    fontSize: 24,
    color: '#007AFF',
  },
  navTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WeeklyCalendar;
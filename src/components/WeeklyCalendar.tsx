import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeeklyCalendar = () => {
  // Get current date
  const currentDate = new Date();
  
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

  return (
    <View style={styles.container}>
      {/* Day headers */}
      <View style={styles.headerRow}>
        {weekDays.map((day, index) => (
          <View key={day} style={styles.dayHeader}>
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.dateText}>
              {weekDates[index].getDate()}
            </Text>
          </View>
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
});

export default WeeklyCalendar;
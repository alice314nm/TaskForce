import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

export default function NotificationsScreen() {
  const notifications = []; // Your notifications data

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={item.message}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
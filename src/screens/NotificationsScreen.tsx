import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

export default function NotificationsScreen() {
  const notifications = []; // Add your notifications data here

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={item.message}
            left={props => <List.Icon {...props} icon="bell" />}
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
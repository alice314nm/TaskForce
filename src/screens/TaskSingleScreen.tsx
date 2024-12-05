import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph, Card, Text, Button } from 'react-native-paper';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
}

export default function TaskSingleScreen({ route }: any) {

    const { task } = route.params;

    return (
        <View style={styles.container}>
        <Card style={styles.card}>
            <Card.Content>
                <Title style={styles.title}>{task.title}</Title>
                <Paragraph style={styles.description}>{task.description}</Paragraph>
                <Paragraph style={styles.description}>Category: {task.category}</Paragraph>

                <Paragraph style={styles.dueDate}>
                    <Text style={styles.boldText}>Due: {new Date(task.dueDate).toDateString()}</Text>
                </Paragraph>
                <View style={styles.buttonContainer}>
                <Button
                    onPress={() => console.log('Delete')}
                    mode="outlined"
                    style={[styles.button, styles.deleteButton]}
                    labelStyle={styles.deleteLabel}
                >
                    Delete
                </Button>            
                <Button
                    onPress={() => console.log('Completed')}
                    mode="outlined"
                    style={styles.button}
                >
                    Completed
                </Button>            
                </View>        
            </Card.Content>
        </Card>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#fff',
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 5,
  },
  button: {
    flex: 1, 
    borderWidth: 2,
  },
  deleteButton: {
    borderColor: 'red',
  },
  deleteLabel: {
    color: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
  },
  dueDate: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333333',
  },
});

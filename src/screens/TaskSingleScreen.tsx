import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Title, Paragraph, Card, Text, Button } from 'react-native-paper';
import { Task } from '../types';
import { useNavigation } from '@react-navigation/native';

interface TaskCardProps {
  task: Task;
}

export default function TaskSingleScreen({ route }: any) {

    const { task } = route.params;
    const navigation = useNavigation();

    const deleteTask = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:5000/${task._id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          Alert.alert('Success!', 'Task deleted successfully', [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]);
        } else {
          const data = await response.json();
          Alert.alert('Error', data.message || 'Failed to delete task');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while deleting the task');
      }
    };

    const completedTask = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:5000/${task._id}/completed`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: true }),
        });
    
        if (response.ok) {
          const updatedTask = await response.json();
          Alert.alert('Success!', 'Task has been marked as completed!', [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]);
        } else {
          const data = await response.json();
          Alert.alert('Error', data.message || 'Failed to update task status');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while updating the task status');
      }
    };
  

    return (
        <View style={styles.container}>
        <Card style={styles.card}>
            <Card.Content>
                <Title style={styles.title}>{task.title}</Title>
                <Paragraph style={styles.description}>{task.description}</Paragraph>
                <Paragraph style={styles.description}>Category: {task.category}</Paragraph>
                
                {task.completed ? (
                <Paragraph style={styles.description}>Task is completed!</Paragraph>

                ) : (
                  <Paragraph style={styles.description}>Task is in progress!</Paragraph>

                )} 
                <Paragraph style={styles.dueDate}>
                    <Text style={styles.boldText}>Due: {new Date(task.dueDate).toDateString()}</Text>
                </Paragraph>
                <View style={styles.buttonContainer}>
                <Button
                    onPress={deleteTask}
                    mode="outlined"
                    style={[styles.button, styles.deleteButton]}
                    labelStyle={styles.deleteLabel}
                >
                    Delete
                </Button>            
                <Button
                    onPress={completedTask}
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

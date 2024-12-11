import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { Task } from '../types';
import { useNavigation } from '@react-navigation/native';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {

  const navigation = useNavigation();

  return (
    <Card style={task.completed ? styles.cardCompleted : styles.card} onPress={() => navigation.navigate('TaskSingle', { task })}>
      <Card.Content>
        <Title>{task.title}</Title>
        <Paragraph>{task.description}</Paragraph>
        {task.completed ? (
        <Paragraph>Due: {new Date(task.dueDate).toLocaleDateString()} | completed! </Paragraph>

        ) : (
          <Paragraph>Due: {new Date(task.dueDate).toLocaleDateString()} | in progress </Paragraph>

        )} 
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  cardCompleted: {
    marginBottom: 16,
    backgroundColor: '#d4ccd9'
  },
});
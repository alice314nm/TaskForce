import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{task.title}</Title>
        <Paragraph>{task.description}</Paragraph>
        <Paragraph>Due: {task.dueDate.toLocaleDateString()}</Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
});
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TaskCard({ task, onPress, onToggle }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.info} onPress={onPress}>
        <Text style={[styles.title, task.completed && styles.completed]}>
          {task.title}
        </Text>
        <Text style={styles.description}>{task.description}</Text>
        <Text style={styles.priority}>Prioridade: {task.priority}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, task.completed && styles.doneButton]}
        onPress={onToggle}
      >
        <Text style={styles.buttonText}>
          {task.completed ? 'Concluída' : 'Concluir'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888888',
  },
  description: {
    color: '#666666',
    marginTop: 5,
  },
  priority: {
    color: '#5267D9',
    marginTop: 7,
    fontSize: 12,
  },
  button: {
    backgroundColor: '#5267D9',
    padding: 9,
    borderRadius: 8,
  },
  doneButton: {
    backgroundColor: '#279B69',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
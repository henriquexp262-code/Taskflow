import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyState({ title, message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  message: {
    color: '#777777',
    marginTop: 8,
    textAlign: 'center',
  },
});
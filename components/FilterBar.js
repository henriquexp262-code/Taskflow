import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const filters = ['Todas', 'Pendentes', 'Concluídas'];

export default function FilterBar({ selectedFilter, onChangeFilter }) {
  return (
    <View style={styles.container}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filter,
            selectedFilter === filter && styles.selected,
          ]}
          onPress={() => onChangeFilter(filter)}
        >
          <Text
            style={[
              styles.text,
              selectedFilter === filter && styles.selectedText,
            ]}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 18,
  },
  filter: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#E9EAF0',
  },
  selected: {
    backgroundColor: '#5267D9',
  },
  text: {
    color: '#444444',
    fontSize: 12,
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
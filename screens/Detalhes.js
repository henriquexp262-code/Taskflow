
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

import AppButton from '../components/AppButton';

export default function Detalhes({ route, navigation }) {
  const { task } = route.params;

  const editarTarefa = () => {
    navigation.navigate('Formulario', { task });
  };

  const excluirTarefa = () => {
    Alert.alert(
      'Excluir tarefa',
      'Tem certeza de que deseja excluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            navigation.popTo('Home', {
              tarefaExcluida: task.id,
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Detalhes da tarefa</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome da tarefa</Text>
        <Text style={styles.title}>{task.title}</Text>

        <Text style={styles.label}>Descrição</Text>
        <Text style={styles.description}>
          {task.description || 'Sem descrição'}
        </Text>

        <Text style={styles.label}>Prioridade</Text>
        <Text style={styles.priority}>{task.priority}</Text>

        <Text style={styles.label}>Status</Text>
        <Text
          style={[
            styles.status,
            task.completed ? styles.completed : styles.pending,
          ]}
        >
          {task.completed ? 'Concluída' : 'Pendente'}
        </Text>
      </View>

      <AppButton
        title="Editar tarefa"
        onPress={editarTarefa}
      />

      <AppButton
        title="Excluir tarefa"
        color="#D94343"
        onPress={excluirTarefa}
      />

      <AppButton
        title="Voltar para tarefas"
        color="#888888"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5FA',
    padding: 20,
  },
  heading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#20243A',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: '#777777',
    marginTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#20243A',
  },
  description: {
    fontSize: 16,
    color: '#444444',
  },
  priority: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5267D9',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  completed: {
    color: '#269B62',
  },
  pending: {
    color: '#D98A26',
  },
});

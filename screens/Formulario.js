
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

import AppButton from '../components/AppButton';

export default function Formulario({ navigation, route }) {
  const tarefaEditar = route.params?.task;
  const modoEdicao = Boolean(tarefaEditar);

  const [title, setTitle] = useState(tarefaEditar?.title || '');
  const [description, setDescription] = useState(
    tarefaEditar?.description || ''
  );
  const [priority, setPriority] = useState(
    tarefaEditar?.priority || 'Média'
  );

  useEffect(() => {
    navigation.setOptions({
      title: modoEdicao ? 'Editar tarefa' : 'Nova tarefa',
      headerBackVisible: false,
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation, modoEdicao]);

  const salvarTarefa = () => {
    if (title.trim() === '') {
      Alert.alert('Atenção', 'Digite o nome da tarefa.');
      return;
    }

    const tarefa = {
      id: tarefaEditar?.id || Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: tarefaEditar?.completed || false,
    };

    if (modoEdicao) {
      navigation.popTo('Home', {
        tarefaEditada: tarefa,
      });
    } else {
      navigation.popTo('Home', {
        novaTarefa: tarefa,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {modoEdicao ? 'Editar tarefa' : 'Nova tarefa'}
      </Text>

      <Text style={styles.subtitle}>
        {modoEdicao
          ? 'Altere as informações da sua tarefa.'
          : 'Preencha as informações abaixo.'}
      </Text>

      <Text style={styles.label}>Nome da tarefa</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Estudar programação"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Descrição</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descreva sua tarefa..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Prioridade</Text>

      <View style={styles.priorityContainer}>
        {['Baixa', 'Média', 'Alta'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.priorityButton,
              priority === item && styles.selectedPriority,
            ]}
            onPress={() => setPriority(item)}
          >
            <Text
              style={[
                styles.priorityText,
                priority === item && styles.selectedPriorityText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <AppButton
        title={modoEdicao ? 'Salvar alterações' : 'Salvar tarefa'}
        onPress={salvarTarefa}
      />

      <AppButton
        title="Cancelar"
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
  },
  subtitle: {
    color: '#777777',
    marginTop: 6,
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E1E2E8',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  priorityButton: {
    flex: 1,
    padding: 13,
    backgroundColor: '#E9EAF0',
    borderRadius: 9,
    alignItems: 'center',
  },
  selectedPriority: {
    backgroundColor: '#5267D9',
  },
  priorityText: {
    color: '#444444',
    fontWeight: 'bold',
  },
  selectedPriorityText: {
    color: '#FFFFFF',
  },
});

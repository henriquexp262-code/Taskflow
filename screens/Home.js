
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import TaskCard from '../components/TaskCard';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import AppButton from '../components/AppButton';

const STORAGE_KEY = '@taskflow:tasks';

const tarefasIniciais = [
  {
    id: '1',
    title: 'Estudar React Native',
    description: 'Revisar os conteúdos da aula',
    priority: 'Alta',
    completed: false,
  },
  {
    id: '2',
    title: 'Fazer atividade',
    description: 'Finalizar o trabalho de programação',
    priority: 'Média',
    completed: false,
  },
  {
    id: '3',
    title: 'Organizar a rotina',
    description: 'Planejar as tarefas da semana',
    priority: 'Baixa',
    completed: true,
  },
];

export default function Home({ navigation, route }) {
  const [tasks, setTasks] = useState(tarefasIniciais);
  const [selectedFilter, setSelectedFilter] = useState('Todas');
  const [carregando, setCarregando] = useState(true);

  // Carregar tarefas armazenadas
  useEffect(() => {
    let ativo = true;

    const carregarTarefas = async () => {
      try {
        const tarefasSalvas = await AsyncStorage.getItem(STORAGE_KEY);

        if (tarefasSalvas !== null && ativo) {
          const tarefasConvertidas = JSON.parse(tarefasSalvas);

          if (Array.isArray(tarefasConvertidas)) {
            setTasks(tarefasConvertidas);
          }
        }
      } catch (error) {
        console.log('Erro ao carregar tarefas:', error);
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    };

    carregarTarefas();

    return () => {
      ativo = false;
    };
  }, []);

  // Salvar tarefas automaticamente
  useEffect(() => {
    if (carregando) return;

    const salvarTarefas = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(tasks)
        );
      } catch (error) {
        console.log('Erro ao salvar tarefas:', error);
      }
    };

    salvarTarefas();
  }, [tasks, carregando]);

  // Receber cadastro, edição e exclusão
  useEffect(() => {
    if (carregando) return;

    const { novaTarefa, tarefaEditada, tarefaExcluida } =
      route.params || {};

    if (!novaTarefa && !tarefaEditada && !tarefaExcluida) {
      return;
    }

    setTasks((tarefasAtuais) => {
      if (novaTarefa) {
        return [...tarefasAtuais, novaTarefa];
      }

      if (tarefaEditada) {
        return tarefasAtuais.map((task) =>
          task.id === tarefaEditada.id ? tarefaEditada : task
        );
      }

      if (tarefaExcluida) {
        return tarefasAtuais.filter(
          (task) => task.id !== tarefaExcluida
        );
      }

      return tarefasAtuais;
    });

    navigation.setParams({
      novaTarefa: null,
      tarefaEditada: null,
      tarefaExcluida: null,
    });
  }, [
    route.params?.novaTarefa,
    route.params?.tarefaEditada,
    route.params?.tarefaExcluida,
    carregando,
    navigation,
  ]);

  // Concluir ou reabrir tarefa
  const alternarTarefa = (id) => {
    setTasks((tarefasAtuais) =>
      tarefasAtuais.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Filtrar tarefas
  const tarefasFiltradas = tasks.filter((task) => {
    if (selectedFilter === 'Pendentes') return !task.completed;
    if (selectedFilter === 'Concluídas') return task.completed;
    return true;
  });

  // Abrir detalhes
  const abrirDetalhes = (task) => {
    navigation.navigate('Detalhes', { task });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Olá! 👋</Text>

      <Text style={styles.title}>Minhas tarefas</Text>

      <Text style={styles.subtitle}>
        Organize seu dia e mantenha tudo em ordem.
      </Text>

      <View style={styles.summary}>
        <View>
          <Text style={styles.summaryNumber}>{tasks.length}</Text>
          <Text style={styles.summaryLabel}>Total de tarefas</Text>
        </View>

        <View>
          <Text style={styles.summaryNumber}>
            {tasks.filter((task) => task.completed).length}
          </Text>
          <Text style={styles.summaryLabel}>Concluídas</Text>
        </View>
      </View>

      <FilterBar
        selectedFilter={selectedFilter}
        onChangeFilter={setSelectedFilter}
      />

      {carregando ? (
        <ActivityIndicator
          size="large"
          color="#5267D9"
          style={{ flex: 1 }}
        />
      ) : (
        <FlatList
          data={tarefasFiltradas}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onPress={() => abrirDetalhes(item)}
              onToggle={() => alternarTarefa(item.id)}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              title="Nenhuma tarefa encontrada"
              message="Adicione uma nova tarefa para começar."
            />
          }
        />
      )}

      <AppButton
        title="+ Nova tarefa"
        onPress={() => navigation.navigate('Formulario')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5FA',
    padding: 20,
    paddingTop: 25,
  },
  greeting: {
    fontSize: 16,
    color: '#777777',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#20243A',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 13,
    color: '#777777',
    marginTop: 5,
  },
  summary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryNumber: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#5267D9',
    textAlign: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },
  list: {
    paddingBottom: 10,
    flexGrow: 1,
  },
});

import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface TaskProps{
  id:number;
  title:string;
  done:boolean;
}

export type EditTaskProps = {
  taskId:number;
  taskNewTitle:string;
}
export function Home() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundItem = tasks.find(item => item.title === newTaskTitle);

    if(foundItem){
      Alert.alert('Task já cadastrada','Você não pode cadastrar uma task com o mesmo nome');
      return;
    }
    //TODO -  add new task
    const data = {
      id: new Date().getTime(),
      title:newTaskTitle,
      done:false,
    }

    setTasks( oldState => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map( task => ({...task}));

    const updateTaskDone = updatedTasks.map( task => {
      if(task.id === id){
        task.done = !task.done;
      }
      return task;
    })
    // const foundItem = updateTaskDone.find(item => item.id === id);
    // if(!foundItem)
    //   return;
    //   foundItem.done = !foundItem.done;
    setTasks(updateTaskDone);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',[
      {
        text: "Não",
        style: "cancel"
      },
      { text: "Sim", onPress: () =>{

          const upDateTasks = tasks.filter(item => item.id !== id);

          setTasks(upDateTasks)
       } 
      }
    ]);
  }

  function handleEditTask({taskId,taskNewTitle}:EditTaskProps){
    const updatedTasks = tasks.map( task => ({...task}));

    const foundItem = updatedTasks.find(item => item.id === taskId);
    if(!foundItem)
      return;

      foundItem.title = taskNewTitle;

    setTasks(updatedTasks); 
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={(newTaskTitle)=> handleAddTask(newTaskTitle)} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
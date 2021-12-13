import React, { useState , useRef, useEffect} from "react";
import { View, TouchableOpacity, Text, Image , StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Feather";
// import {Icon} from 'react-native-vector-icons/Icon';

import trashIcon from '../assets/icons/trash/trash.png'
import Editing from '../assets/icons/edit/edit.png'

import { EditTaskProps } from "../pages/Home";
import { Task } from "./TasksList";

interface TasksItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask:({taskId,taskNewTitle}: EditTaskProps) => void;
}

export function TaskItem({ task, toggleTaskDone, removeTask,editTask }: TasksItemProps){
  const [isEditing,setIsEditing] = useState(false);
  const [taskupDateTiTle,setTaskupDateTiTle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing(){
    setIsEditing(true);
  }

  function handleCancelEditing(){
    setTaskupDateTiTle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing(){
    editTask({taskId:task.id,taskNewTitle:taskupDateTiTle});
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return(
    <View style={styles.container} >
      <View style={styles.infoContainer} >
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={()=> toggleTaskDone(task.id)}
          //TODO - use onPress (toggle task) prop
        >
          <View 
            style={task.done? styles.taskMarkerDone: styles.taskMarker}
            //TODO - use style prop 
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          {/* <Text
            style={task.done? styles.taskTextDone: styles.taskText}
            //TODO - use style prop
          >
            {task.title}
          </Text> */}
          <TextInput 
            ref={textInputRef}
            style={ task.done ? styles.taskTextDone : styles.taskText}
            value={taskupDateTiTle}
            editable={isEditing}
            onChangeText={setTaskupDateTiTle}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.IconContainer}>
        {isEditing ?(
          <TouchableOpacity
            onPress={handleCancelEditing}
            //TODO - use onPress (remove task) prop
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity> 
        ):(
          <TouchableOpacity
            onPress={handleStartEditing}
            //TODO - use onPress (remove task) prop
          >
            <Image source={Editing} />
          </TouchableOpacity> 
        )}

        <View style={styles.IconDivider}/>

        <TouchableOpacity
          onPress={()=> removeTask(task.id)}
          disabled={isEditing}
          //TODO - use onPress (remove task) prop
        >
          <Image source={trashIcon} style={{opacity: isEditing? 0.2:1}}/>
        </TouchableOpacity>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  infoContainer:{
    flex:1,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  IconContainer:{
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:12,
    paddingRight:24

  },
  IconDivider:{
    width:1,
    height:24,
    backgroundColor:'rgba(196, 196, 196, 0.24)',
    marginHorizontal:12
  }
})
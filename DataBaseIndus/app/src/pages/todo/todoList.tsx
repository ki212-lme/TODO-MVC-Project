import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DoneTodoList from "../../components/todo/doneTodo";
import UndoneTodoList from "../../components/todo/undoneTodo";
import { fetchCategoryAction, fetchCategoryActionType } from "../../store/actions/category/categoryActions";
import { fetchTodoAction } from "../../store/actions/todo/todoActions";
import { useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store/store";


function TodoList() {
  const dispatch = useAppDispatch();
  const todo = useSelector((s: RootState) => s.rootReducer.todoReducer.todo).filter((item) => item.taskCompleted)
   
  useEffect(()=>{
    dispatch({type:  fetchTodoAction}); 
    dispatch({type: fetchCategoryAction});
  },[])

  return (
    <>
      <UndoneTodoList />
      <DoneTodoList />
    </>
  );
}

export default TodoList;

import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { dateToSting } from "../../parseDate/parseDate";
import { deleteTodoAction, fetchTodoAction, updateTodoAction } from "../../store/actions/todo/todoActions";
import { useAppDispatch } from "../../store/hooks";
import { removeTodo, updateTodo } from "../../store/Slice/todo/todoSlice";
import { RootState } from "../../store/store";


function DoneTodoList() {

    const todo = useSelector((s: RootState) => s.rootReducer.todoReducer.todo).filter((item) => item.taskCompleted)
    const dispatch = useAppDispatch()
    const categories = useSelector((s: RootState) => s.rootReducer.categoryReducer.category)
    const [idCategory, setCategory] = useState(0);
    const deleteTodo = (id: number) => {
        dispatch(deleteTodoAction(id))
    }
    const stringEdit = "/edit/todo/"
    if (todo.length == 0) {
        return (<div className="block"><i>Non Done Todo</i></div>)
    }
    return (<>
        <div className="block">
            <select value={idCategory} onChange={(e) => setCategory(parseInt(e.target.value))}>
                <option value={0}>None</option>
                {categories.map((item) =>
                    <option key={item.idCategory} value={item.idCategory} >{item.nameCategory}</option>
                )}
            </select>
            <table className="undoneTodo">
                <caption>Done Todos</caption>
                <tbody>
                    <tr>
                        <th>Name Todo</th>
                        <th>Dead Line</th>
                        <th>Category</th>
                        <th colSpan={3}>Actions</th>
                    </tr>

                    {todo.map((item) => {
                        if (item.taskCompleted && (!(idCategory != 0) || item.categoryId == idCategory))
                            return (
                                <tr key={item.id}>
                                    <td>{item.nameTodo} </td>
                                    <td>{item.deadLine == null ? "None" : dateToSting(item.deadLine)}</td>
                                    <td>{item.nameCategory}</td>
                                    <td><img onClick={() => dispatch(updateTodoAction(
                                        {
                                            nameTodo: item.nameTodo,
                                            id: item.id,
                                            categoryId: item.categoryId,
                                            deadLine: item.deadLine,
                                            taskCompleted: !item.taskCompleted
                                        }))} src={require('../../icons/done.png')} /></td>
                                    <td><NavLink to={stringEdit + item.id} ><img src={require('../../icons/edit.png')} /></NavLink></td>
                                    <td><img src={require('../../icons/delete.png')} onClick={() => deleteTodo(item.id)} /></td>
                                </tr>
                            );
                    })}

                </tbody>
            </table>
        </div>
    </>
    );



}

export default DoneTodoList;

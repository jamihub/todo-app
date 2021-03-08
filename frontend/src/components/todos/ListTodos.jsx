import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./Todo";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { getTodos } from "../../store/actions/todoActions";

const useStyles = makeStyles({
  todosStyle: {
    margin: "30px auto",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 12px -3px #000000"
  },
});

const ListTodos = ({ todo, setTodo }) => {
  const auth= useSelector((state) => state.auth);
  const todos = useSelector((state) => state.todos);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [todo._id, dispatch]);

  if (!auth._id) return <Redirect to="/signin" />;

  return (
    <>
      <div className={classes.todosStyle}>
        <Typography variant="h5">
          {" "}
          {todos.length > 0 ? "Tasks to do" : "You have no tasks"}{" "}
        </Typography>
        {todos &&
          todos.map((todo) => {
            return (
              <Todo
                todo={todo}
                key={todo._id}
                setTodo={setTodo}
                todos={todos}
              />
            );
          })}
      </div>
    </>
  );
};

export default ListTodos;
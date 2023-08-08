import React from 'react';

export default React.createContext({
  tasks: [],
  input:'',
  inputHandler: (e:string) => {},
  addNewTask : (task:string) => {},
  deleteTask : (taskId:number) => {},
  markTask : (taskId:number) => {}
});
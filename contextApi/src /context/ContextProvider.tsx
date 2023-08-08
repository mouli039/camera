import React from 'react';
import Context from './Context';

interface IProps {
  children: any;
}
interface IState {
  tasks: any;
  input: string;
}

class ContextProvider extends React.Component<IProps, IState> {
  state = {
    tasks: [],
    input:''
  };

  addNewTask = (task: string) => {
    const newTask = {
      id: Date.now(),
      date: new Date(),
      taskName: task,
      strike: false,
    };
    const list = [...this.state.tasks, newTask];
    this.setState({tasks: list,input:''});
  };

  deleteTask = (taskId: number) => {
    console.log(taskId);
    const updatedList = this.state.tasks.filter(
      (ele: any) => ele.id !== taskId,
    );
    this.setState({tasks: updatedList});
  };

  markTask = (taskId: number) => {
    const updatedList = this.state.tasks.map((ele: {id: number; strike: boolean}) =>
      ele.id === taskId ? {...ele, strike: !ele.strike} : ele,
    );
    this.setState({tasks:updatedList})
  };

  inputHandler = (e: string) => {
    this.setState({input: e});
  };

  render() {
    return (
      <Context.Provider
        value={{
          tasks: this.state.tasks,
          input:this.state.input,
          inputHandler:this.inputHandler,
          addNewTask: this.addNewTask,
          deleteTask: this.deleteTask,
          markTask:this.markTask
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
export default ContextProvider;

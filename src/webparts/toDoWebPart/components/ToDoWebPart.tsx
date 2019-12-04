import * as React from 'react';
import styles from './ToDoWebPart.module.scss';
import { IToDoWebPartProps } from './IToDoWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { spToDoService, IToDo } from '../../services/spToDoService';
import ToDoList from './ToDoList';
import ToDoPanel from './ToDoPanel';

export interface IToDoWebPartState
{
    toDos : IToDo[];
}


export default class ToDoWebPart extends React.Component<IToDoWebPartProps, IToDoWebPartState> {


constructor(props: IToDoWebPartProps) {
  super(props);

  this.state = {
    toDos : []
  };

}


  public async componentDidMount() {
        var items = await spToDoService.GetAllToDos();
        console.log(items);
        this.setState({toDos : items});
  }

  public render(): React.ReactElement<IToDoWebPartProps> {
    return (
      <div>
        <ToDoPanel onAdded={this.refreshData} ctx={this.props.ctx}></ToDoPanel>
      <ToDoList key={Math.random()} items={this.state.toDos}></ToDoList>
      </div>
    );
  }

  private refreshData = async () => {
    var items = await spToDoService.GetAllToDos();
    console.log(items);
    this.setState({toDos : items});
  }
}

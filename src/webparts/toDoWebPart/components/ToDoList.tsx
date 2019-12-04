import * as React from 'react';
import { IToDo } from '../../services/spToDoService';
import { DetailsList} from 'office-ui-fabric-react/lib/DetailsList';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export interface IToDoListProps {
  items : IToDo[];

}

export interface IToDoListState {
  filteredItems : IToDo[];
}

export default class ToDoList extends React.Component<IToDoListProps, IToDoListState> {



  constructor(props: IToDoListProps) {
    super(props);

    this.state = {
      filteredItems : this.props.items
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {

  //   return {
  //     filteredItems: nextProps.items,
  //     // ... other derived state properties
  //   };
  // }


  public render(): React.ReactElement<IToDoListProps> {
    return (
      <div>
          <TextField
          label="Filter by name:"
          onChange={this._onFilter}
          styles={{ root: { maxWidth: '300px' } }}
        />
          <DetailsList
            compact={true}
            items={this.state.filteredItems}
            // columns={this._columns}
            // setKey="set"
            // layoutMode={DetailsListLayoutMode.justified}
            // selection={this._selection}
            // selectionPreservedOnEmptyClick={true}
            // onItemInvoked={this._onItemInvoked}
            // ariaLabelForSelectionColumn="Toggle selection"
            // ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            // checkButtonAriaLabel="Row checkbox"
          />
      </div>
    );
  }


  private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
   console.log(text);
    this.setState({
      filteredItems: text ? this.props.items.filter(i => i.Title.toLowerCase().indexOf(text) > -1) : this.props.items
    });
  };


}

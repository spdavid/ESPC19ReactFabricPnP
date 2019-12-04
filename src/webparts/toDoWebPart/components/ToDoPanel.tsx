import * as React from 'react';
import { DefaultButton, Button } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { TaxonomyPicker, IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DatePicker, DayOfWeek, IDatePickerStrings, mergeStyleSets } from 'office-ui-fabric-react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { spToDoService } from '../../services/spToDoService';

export interface IToDoPanelProps {
  ctx: WebPartContext;
  onAdded : () => void;
}

export interface IToDoPanelState {
  isOpen: boolean;
}



export default class ToDoPanel extends React.Component<IToDoPanelProps, IToDoPanelState> {

  private title: string;
  private category: any;
  private dueDate: Date;
  private assignedTo: string;


  constructor(props: IToDoPanelProps) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  public render(): React.ReactElement<IToDoPanelProps> {
    return (
      <div>
        <DefaultButton text="Add ToDo" onClick={this.openPanel} />
        <Panel
          headerText="Add ToDo"
          isOpen={this.state.isOpen}
          onDismiss={this.dismissPanel}
          closeButtonAriaLabel="Close"
        >
          <TextField label="Title" onChange={this.titleChanged} />

          <TaxonomyPicker allowMultipleSelections={false}
            termsetNameOrID="b89a58a6-e401-473a-b7d2-5d9de5d0f856"
            panelTitle="Select Term"
            label="Category"
            context={this.props.ctx}
            onChange={this.onTaxPickerChange}
            isTermSetSelectable={false} />

          <DatePicker
            label="Due Date"
            placeholder="Select a date..."
            ariaLabel="Select a date"
            onSelectDate={this.dueDateChanged}
          />
          <PeoplePicker
            context={this.props.ctx}
            titleText="Assigned To"
            personSelectionLimit={1}
            showtooltip={true}
            isRequired={true}
            disabled={false}
            selectedItems={this.AssignedToChanged}
            showHiddenInUI={false}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000} />

          <Button text="Add ToDo" onClick={this.AddToDo}></Button>

        </Panel>
      </div>
    );
  }

  private AddToDo = async () => {
    await spToDoService.AddToDo(this.title, this.category, this.dueDate, this.assignedTo);
    this.props.onAdded();
    this.dismissPanel();
  }

  private onTaxPickerChange = (val) => {
    console.log(val);
    this.category = val;
  }

  private titleChanged = (input, val) => {
    console.log(val);
    this.title = val;
  }

  private dueDateChanged = (val) => {
    console.log(val);
    this.dueDate = val;
  }

  private AssignedToChanged  = (val) =>
  {
    console.log(val);
    this.assignedTo = val[0].id;
  }

  private openPanel = () => {
    this.setState({ isOpen: true });
  }

  private dismissPanel = () => {
    this.setState({ isOpen: false });
  }


}

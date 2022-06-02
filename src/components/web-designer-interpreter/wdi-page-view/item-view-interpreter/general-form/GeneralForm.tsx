import React, { useEffect } from "react";
import { ItemForm, VariableAccess } from "sira-lang/lib/sira.interface";
import { searchGlobalDataTable, SiraStateDataTable } from "../../../statement.interface";
import { ItemFormInputBigtextView } from "./item-form/item-form-input-bigtext-view/ItemFormInputBigtextView";
import { ItemFormInputDateView } from "./item-form/item-form-input-date-view/ItemFormInputDateView";
import { ItemFormInputDateTimeView } from "./item-form/item-form-input-datetime-view/ItemFormInputDateTimeView";
import { ItemFormInputDropdownView } from "./item-form/item-form-input-dropdown-view/ItemFormInputDropdownView";
import { ItemFormInputNumericView } from "./item-form/item-form-input-numeric-view/ItemFormInputNumericView";
import { ItemFormInputTextView } from "./item-form/item-form-input-text-view/ItemFormInputTextView";
import { ItemFormInputTimeView } from "./item-form/item-form-input-time-view/ItemFormInputTimeView";
import { GeneralFormContainer } from "./styled";

interface GeneralFormProps {
  items: ItemForm[]
  state: any
  values: any
  setValue(va: VariableAccess, value: any): void
}

export function GeneralForm(props: GeneralFormProps) {
  return (
    <GeneralFormContainer>
      {
        props.items.map((iform: ItemForm, i: number) => {
          switch (iform.source_target.type) {
            case 'radio':
            case 'dropdown': 
              const options_table: SiraStateDataTable | undefined = searchGlobalDataTable(props.state, iform.source_target.source);
              if (!options_table) {
                throw new Error(`Table source dropdown '${iform.source_target.source}' on form undefined`);
              }
              return (
                <ItemFormInputDropdownView
                  options={options_table.value}
                  key={i}
                  label={iform.label}
                  value={props.values[iform.label]}
                  onChange={value => props.setValue(iform.source_target.variable, value)} />
              );
            case 'numeric': return (<ItemFormInputNumericView
              key={i}
              label={iform.label}
              value={props.values[iform.label] ?? ''}
              onChange={value => props.setValue(iform.source_target.variable, value)} />);
            case 'bigtext': return (<ItemFormInputBigtextView
              key={i}
              label={iform.label}
              value={props.values[iform.label] ?? ''}
              onChange={value => props.setValue(iform.source_target.variable, value)} />);
            case 'text': return (<ItemFormInputTextView
              key={i}
              label={iform.label}
              value={props.values[iform.label] ?? ''}
              onChange={value => props.setValue(iform.source_target.variable, value)} />);
            case 'date': return (<ItemFormInputDateView
              key={i}
              label={iform.label}
              value={props.values[iform.label] ?? ''}
              onChange={value => props.setValue(iform.source_target.variable, value)} />);
            case 'time': return (<ItemFormInputTimeView
              key={i}
              label={iform.label}
              value={props.values[iform.label] ?? ''}
              onChange={value => props.setValue(iform.source_target.variable, value)} />);
            case 'datetime': return (<ItemFormInputDateTimeView
              key={i}
              label={iform.label}
              value={props.values[iform.label] ?? ''}
              onChange={value => props.setValue(iform.source_target.variable, value)} />);
          }
        })
      }
    </GeneralFormContainer>
  );
}

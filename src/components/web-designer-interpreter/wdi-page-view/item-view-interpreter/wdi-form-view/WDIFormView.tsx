import React, { useEffect } from "react";
import { ItemForm, VariableAccess, ViewComponentForm } from "sira-lang/lib/sira.interface";
import { Button } from "../../../../button/Button";
import { IconArrowDown } from "../../../../form/form-input-dropdown/FormInputDropdown";
import { searchGlobalDataRow, searchState, SiraState, SiraStateDataRow } from "../../../statement.interface";
import { GeneralForm } from "../general-form/GeneralForm";
import { ItemFormPreviewContainer, ItemFormPreviewDropdown, ItemFormPreviewInput, ItemFormPreviewLabel, ItemFormPreviewTextarea, WDIFormViewContainer, WDIFormViewPreviewContainer } from "./styled";

interface WDIFormViewProps {
  data: ViewComponentForm
  state: any
  setState(state: any): void
}

export function WDIFormView(props: WDIFormViewProps) {
  function getValues() {
    const values: any = {};
    for (const item_form of props.data.data.items) {
      const row: SiraStateDataRow | undefined = searchGlobalDataRow(props.state, item_form.source_target.variable.table);
      if (!row) {
        throw new Error(`Row '${item_form.source_target.variable.table}' on form '${props.data.data.name}' undefined`);
      }
      values[item_form.label] = row.value[item_form.source_target.variable.column];
    }

    return values;
  }

  function setValue(va: VariableAccess, value: any) {
    const state: SiraState | undefined = searchState(props.state, va.table);
    if (!state) {
      throw new Error(`Variable '${va.table}' undefined`);
    }
    if (state.data[va.table].type !== 'row') {
      throw new Error(`Variable '${va.table}' must be a row`);
    }
    (state.data[va.table] as SiraStateDataRow).value[va.column] = value;
    props.setState(props.state);
  }
  
  return (
    <WDIFormViewContainer>
      <div style={{ marginBottom: 8, fontSize: 20, fontWeight: 700, color: '#444' }}>
        { props.data.data.name }
      </div>
      <div>
        <GeneralForm
          state={props.state}
          items={props.data.data.items}
          values={getValues()}
          setValue={setValue} />
      </div>
    </WDIFormViewContainer>
  );
}

interface WDIFormViewPreviewProps {
  data: ViewComponentForm
}

export function WDIFormViewPreview(props: WDIFormViewPreviewProps) {
  function getItemPreview(iform: ItemForm) {
    switch (iform.source_target.type) {
      case 'bigtext':
        return (
          <ItemFormPreviewTextarea 
            readOnly
            placeholder={iform.label} />
        );
      case 'dropdown':
        return (
          <ItemFormPreviewDropdown>
            <ItemFormPreviewInput 
              readOnly
              placeholder={iform.label} />
            <div style={{ position: 'absolute', right: 0, top: 21 }}>
              <IconArrowDown />
            </div>
          </ItemFormPreviewDropdown>
        );
      case 'numeric':
        return (
          <ItemFormPreviewInput 
            readOnly
            type={'number'} 
            placeholder={iform.label} />
        );
      case 'text':
        return (
          <ItemFormPreviewInput 
            readOnly
            placeholder={iform.label} />
        );
      case 'date':
        return (
          <ItemFormPreviewInput 
            type={'date'}
            readOnly
            placeholder={iform.label} />
        );
      case 'time':
        return (
          <ItemFormPreviewInput 
            type={'time'}
            readOnly
            placeholder={iform.label} />
        );
      case 'datetime':
        return (
          <ItemFormPreviewInput 
            type={'datetime-local'}
            readOnly
            placeholder={iform.label} />
        );
    }
  }
  
  return (
    <WDIFormViewPreviewContainer>
      <div style={{ marginBottom: 8, fontSize: '1.2em' }}>
        { props.data.data.name }
      </div>
      <div>
        {
          props.data.data.items.map((iform: ItemForm, i: number) => (
            <ItemFormPreviewContainer key={i}>
              <ItemFormPreviewLabel>
                { iform.label }
              </ItemFormPreviewLabel>
              <div>
                { getItemPreview(iform) }
              </div>
            </ItemFormPreviewContainer>
          ))
        }
      </div>
    </WDIFormViewPreviewContainer>
  );
}

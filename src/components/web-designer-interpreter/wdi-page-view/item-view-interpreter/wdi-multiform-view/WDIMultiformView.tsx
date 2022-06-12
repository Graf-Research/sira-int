import React, { useEffect } from "react";
import { VariableAccess, ViewComponentMultiform } from "sira-lang/lib/sira.interface";
import { Button } from "../../../../button/Button";
import { searchGlobalDataTable, searchLocalDataRow, searchState, SiraState, SiraStateDataTable } from "../../../statement.interface";
import { SectionTitle } from "../../styled";
import { GeneralForm } from "../general-form/GeneralForm";
import { WDIFormViewPreview } from "../wdi-form-view/WDIFormView";
import { ItemFormContainer, ItemMultiformPreview, ListFormContainer, RemoveFormContainer, WDIMultiformViewContainer, WDIMultiformViewPreviewContainer } from "./styled";

interface WDIMultiformViewProps {
  data: ViewComponentMultiform
  state: any
  setState(state: SiraState): void
}

export function WDIMultiformView(props: WDIMultiformViewProps) {
  const multiform_source_key = props.data.data.source_target
  const list_form_data: SiraStateDataTable | undefined = searchGlobalDataTable(props.state, multiform_source_key);
  if (!list_form_data) {
    throw new Error(`(1) Multiform source data '${multiform_source_key}' on multiform '${props.data.data.name}' undefined`);
  }

  function addItem() {
    const list_form_state: SiraState | undefined = searchState(props.state, multiform_source_key);
    if (!list_form_state) {
      throw new Error(`(2) Multiform source data '${multiform_source_key}' on multiform '${props.data.data.name}' undefined`);
    }
    (list_form_state.data[multiform_source_key] as SiraStateDataTable).value = [
      ...(list_form_state.data[multiform_source_key] as SiraStateDataTable).value,
      {}
    ];
    props.setState(props.state);
  }

  function onRemoveItem(index: number) {
    const list_form_state: SiraState | undefined = searchState(props.state, multiform_source_key);
    if (!list_form_state) {
      throw new Error(`(3) Multiform source data '${multiform_source_key}' on multiform '${props.data.data.name}' undefined`);
    }
    (list_form_state.data[multiform_source_key] as SiraStateDataTable).value = (list_form_state.data[multiform_source_key] as SiraStateDataTable).value.filter((_: any, i: number) => i !== index);
    props.setState(props.state);
  }

  function onItemValueChange(va: VariableAccess, new_value: any, row_index: number) {
    const is_local_source_state = va.table === multiform_source_key;
    if (is_local_source_state) {
      // local state
      const list_form_state: SiraState | undefined = searchState(props.state, multiform_source_key);
      if (!list_form_state) {
        throw new Error(`(4) Multiform source data '${multiform_source_key}' on multiform '${props.data.data.name}' undefined`);
      }
      (list_form_state.data[multiform_source_key] as SiraStateDataTable).value = 
        (list_form_state.data[multiform_source_key] as SiraStateDataTable).value.map((row_form: any, i: number) => {
          if (i !== row_index) {
            return row_form;
          }
          return {
            ...row_form,
            [va.column]: new_value
          };
        });
    } else {
      // global state
      const mutable_row_state: SiraState | undefined = searchState(props.state, va.table);
      if (!mutable_row_state) {
        throw new Error(`(5) Multiform variable '${va.table}' on multiform '${props.data.data.name}' undefined`);
      }
      if (mutable_row_state.data[va.table].type !== 'row') {
        throw new Error(`(6) Multiform variable '${va.table}' on multiform '${props.data.data.name}' must be a row`);
      }
      mutable_row_state.data[va.table].value[va.column] = new_value;
    }

    // propagate changes
    props.setState(props.state);
  }

  return (
    <WDIMultiformViewContainer>
      <SectionTitle>
        { props.data.data.name }
      </SectionTitle>
      <ListFormContainer>
        <div>
          {
            list_form_data.value.map((data: any, i: number) => {
              const values: any = {};
              for (const item of props.data.data.items) {
                let row: any = {};
                if (item.source_target.variable.table === multiform_source_key) {
                  row = data;
                } else {
                  row = searchLocalDataRow(props.state, item.source_target.variable.table);
                }
                values[item.label] = row[item.source_target.variable.column];
              }

              return (
                <ItemFormContainer key={i}>
                  <RemoveFormContainer>
                    <Button 
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        fontSize: 14,
                        padding: '5px 16px'
                      }}
                      onClick={() => onRemoveItem(i)}
                      outline>
                      Hapus
                    </Button>
                  </RemoveFormContainer>
                  <GeneralForm
                    state={props.state}
                    items={props.data.data.items}
                    values={values}
                    setValue={(va: VariableAccess, value: any) => onItemValueChange(va, value, i)} />
                </ItemFormContainer>
              );
            })
          }
        </div>
        <div style={{ marginTop: 8 }}>
          <Button 
            style={{
              display: 'block',
              textAlign: 'center',
              padding: 8
            }}
            onClick={addItem}
            outline>
            + Tambah Item
          </Button>
        </div>
      </ListFormContainer>
    </WDIMultiformViewContainer>
  );
}

interface WDIMultiformViewPreviewProps {
  data: ViewComponentMultiform
}

export function WDIMultiformViewPreview(props: WDIMultiformViewPreviewProps) {
  return (
    <WDIMultiformViewPreviewContainer>
      <div style={{ marginBottom: 8, marginTop: 12, fontSize: '1.2em' }}>
        { props.data.data.name }
      </div>
      <ListFormContainer>
        <ItemMultiformPreview>
          <WDIFormViewPreview data={{ 
            type: 'form', 
            data: {
              items: props.data.data.items, 
              name: ''
            }
          }} />
        </ItemMultiformPreview>
        <Button 
          style={{
            display: 'block',
            textAlign: 'center',
            marginTop: 8
          }}
          outline>
          + Tambah Item
        </Button>
      </ListFormContainer>
    </WDIMultiformViewPreviewContainer>
  );
}

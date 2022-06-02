import React, { useEffect } from "react";
import FormInputText from "../../../../../../form/form-input-text/FormInputText";
import { ItemFormInputTimeContainer } from "./styled";

interface ItemFormInputTimeProps {
  label: string
  value: any
  onChange(value: any): void
}

export function ItemFormInputTimeView(props: ItemFormInputTimeProps) {
  return (
    <ItemFormInputTimeContainer>
      <FormInputText
        label={props.label}
        placeholder={props.label ?? ''}
        value={props.value}
        type={'time'}
        onChange={e => props.onChange(e.target.value)} />
    </ItemFormInputTimeContainer>
  );
}

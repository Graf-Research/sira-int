import React, { useEffect } from "react";
import FormInputTextarea from "../../../../../../form/form-input-textarea/FormInputTextarea";
import { ItemFormInputBigtextContainer } from "./styled";

interface ItemFormInputBigtextProps {
  label: string
  value: any
  onChange(value: any): void
}

export function ItemFormInputBigtextView(props: ItemFormInputBigtextProps) {
  return (
    <ItemFormInputBigtextContainer>
      <FormInputTextarea
        label={props.label}
        placeholder={props.label ?? ''}
        value={props.value}
        onChange={e => props.onChange(e.target.value)} />
    </ItemFormInputBigtextContainer>
  );
}

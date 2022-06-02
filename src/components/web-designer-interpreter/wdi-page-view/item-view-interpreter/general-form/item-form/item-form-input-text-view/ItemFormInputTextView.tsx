import React, { useEffect } from "react";
import FormInputText from "../../../../../../form/form-input-text/FormInputText";
import { ItemFormInputTextContainer } from "./styled";

interface ItemFormInputTextProps {
  label: string
  value: any
  onChange(value: any): void
}

export function ItemFormInputTextView(props: ItemFormInputTextProps) {
  return (
    <ItemFormInputTextContainer>
      <FormInputText
        label={props.label}
        placeholder={props.label ?? ''}
        value={props.value}
        onChange={e => props.onChange(e.target.value)} />
    </ItemFormInputTextContainer>
  );
}

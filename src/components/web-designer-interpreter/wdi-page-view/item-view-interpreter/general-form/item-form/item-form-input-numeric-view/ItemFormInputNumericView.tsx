import React, { useEffect } from "react";
import FormInputText from "../../../../../../form/form-input-text/FormInputText";
import { ItemFormInputNumericContainer } from "./styled";

interface ItemFormInputNumericProps {
  label: string
  value: any
  onChange(value: any): void
}

export function ItemFormInputNumericView(props: ItemFormInputNumericProps) {
  return (
    <ItemFormInputNumericContainer>
      <FormInputText
        type={'number'}
        label={props.label}
        placeholder={props.label ?? ''}
        value={props.value}
        onChange={e => props.onChange(e.target.value)} />
    </ItemFormInputNumericContainer>
  );
}

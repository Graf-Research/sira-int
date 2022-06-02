import React, { useEffect } from "react";
import FormInputText from "../../../../../../form/form-input-text/FormInputText";
import { ItemFormInputDateTimeContainer } from "./styled";

interface ItemFormInputDateTimeProps {
  label: string
  value: any
  onChange(value: any): void
}

export function ItemFormInputDateTimeView(props: ItemFormInputDateTimeProps) {
  return (
    <ItemFormInputDateTimeContainer>
      <FormInputText
        label={props.label}
        placeholder={props.label ?? ''}
        value={props.value}
        type={'datetime-local'}
        onChange={e => props.onChange(e.target.value)} />
    </ItemFormInputDateTimeContainer>
  );
}

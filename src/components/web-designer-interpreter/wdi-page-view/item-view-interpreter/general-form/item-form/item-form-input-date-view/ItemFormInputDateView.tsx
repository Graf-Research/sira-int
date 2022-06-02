import React, { useEffect } from "react";
import moment from "moment";
import FormInputText from "../../../../../../form/form-input-text/FormInputText";
import { ItemFormInputDateContainer } from "./styled";

interface ItemFormInputDateProps {
  label: string
  value: any
  onChange(value: any): void
}

export function ItemFormInputDateView(props: ItemFormInputDateProps) {
  return (
    <ItemFormInputDateContainer>
      <FormInputText
        label={props.label}
        placeholder={props.label ?? ''}
        value={moment(props.value).format('YYYY-MM-DD')}
        type={'date'}
        onChange={e => props.onChange(e.target.value)} />
    </ItemFormInputDateContainer>
  );
}

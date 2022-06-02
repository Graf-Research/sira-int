import React, { useEffect } from "react";
import { SourceTargetDropdown } from "sira-lang/lib/sira.interface";
import { Option } from "../../../../../../form/form-input-dropdown/dropdown/Dropdown";
import FormInputDropdown from "../../../../../../form/form-input-dropdown/FormInputDropdown";
import { ItemFormInputDropdownContainer } from "./styled";

interface ItemFormInputDropdownProps {
  label: string
  options: Option[]
  value: any
  onChange(value: any): void
}

export function ItemFormInputDropdownView(props: ItemFormInputDropdownProps) {
  return (
    <ItemFormInputDropdownContainer>
      <FormInputDropdown
        options={props.options}
        label={props.label}
        placeholder={props.label ?? ''}
        value={props.options.find(o => o.value == props.value)?.label ?? ''}
        selected={props.value}
        onSelected={props.onChange} />
    </ItemFormInputDropdownContainer>
  );
}

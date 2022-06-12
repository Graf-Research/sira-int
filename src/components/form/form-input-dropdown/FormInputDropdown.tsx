import React, { useEffect } from "react";
import { CSSProperties, InputHTMLAttributes, useState } from "react";
import Dropdown, { CustomOption, Option } from "./dropdown/Dropdown";
import InputBox, { InputBoxState } from "../input-box/InputBox";
import { AbsolutePositionDropdown, FormInputDropdownContainer } from "./styled";
import { CustomInput } from "../form-input-text/styled";

interface FormInputDropdownProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelSize?: number
  boxStyle?: CSSProperties
  containerStyle?: CSSProperties
  inactiveState?: InputBoxState
  activeState?: InputBoxState
  keepStateOnValue?: boolean
  errorText?: string
  selected?: any
  onSelected?(selected: any): void
  options?: Option[]
  customOptions?: CustomOption[]
  leftItem?: React.ReactNode
  rightItem?: React.ReactNode
  withoutFilter?: boolean
  wihtoutMarginTop?: boolean
}

export function IconArrowDown(props: InputHTMLAttributes<HTMLInputElement>) {
  const is_dark_mode = false;
  return <div {...props} style={{ paddingRight: 8, color: is_dark_mode ? '#BBB' : '#666' }}>▼</div>;
}

export default function FormInputDropdown(props: FormInputDropdownProps) {
  const is_dark_mode = false;
  const [show_dropdown, setShowDropdown] = useState<boolean>(false);

  function clickAction() {
    if (props.readOnly) {
      return;
    }
    setShowDropdown(!show_dropdown);
  }

  return (
    <FormInputDropdownContainer>
      <InputBox 
        boxStyle={props.boxStyle}
        label={props.label}
        labelSize={props.labelSize}
        containerStyle={props.containerStyle}
        state={show_dropdown ? (props.activeState ?? (props.errorText ? 'error' : 'normal')) : (props.inactiveState ?? (props.errorText ? 'error' : 'border'))}
        rightItem={props.readOnly ? undefined : (props.rightItem ?? <IconArrowDown onClick={clickAction} />)}
        leftItem={props.leftItem}
        required={props.required}
        errorText={props.errorText}
        removeLabelPaddingLeft={true}>
        <div style={{ position: 'relative' }}>
          <CustomInput 
            {...props}
            onClick={clickAction}
            readOnly />
          { show_dropdown && <AbsolutePositionDropdown className="floating-container">
            <Dropdown 
              withoutFilter={(props.options?.length ?? 0) < 7}
              value={props.selected}
              onValueChange={(value: any) => {
                if (props.onSelected) {
                  props.onSelected(value);
                }
                setShowDropdown(false);
              }}
              options={props.options} />
          </AbsolutePositionDropdown> }
        </div>
      </InputBox>
    </FormInputDropdownContainer>
  );
}

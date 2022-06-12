import React, { useEffect } from "react";
import { CSSProperties, InputHTMLAttributes, useState } from "react";
import InputBox, { InputBoxState } from "../input-box/InputBox";
import { CustomInput } from "./styled";

interface FormInputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelSize?: number
  boxStyle?: CSSProperties
  containerStyle?: CSSProperties
  inactiveState?: InputBoxState
  activeState?: InputBoxState
  errorText?: string
  leftItem?: React.ReactNode
  rightItem?: React.ReactNode
}

export default function FormInputText(props: FormInputTextProps) {
  const is_dark_mode = false;
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <InputBox 
      boxStyle={props.boxStyle}
      containerStyle={props.containerStyle}
      label={props.label}
      labelSize={props.labelSize}
      state={focus ? (props.activeState ?? (props.errorText ? 'error' : 'normal')) : (props.inactiveState ?? (props.errorText ? 'error' : 'border'))}
      rightItem={props.rightItem}
      leftItem={props.leftItem}
      errorText={props.errorText}
      required={props.required}
      removeLabelPaddingLeft={true}>
      <CustomInput 
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props} />
    </InputBox>
  );
}

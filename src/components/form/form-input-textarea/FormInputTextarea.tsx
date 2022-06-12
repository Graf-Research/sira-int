import React, { useEffect } from "react";
import { CSSProperties, InputHTMLAttributes, TextareaHTMLAttributes, useState } from "react";
import { CustomInput } from "./styled";
import InputBox, { InputBoxState } from "../input-box/InputBox";

interface FormInputTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  labelSize?: number
  boxStyle?: CSSProperties
  labelStyle?: CSSProperties
  inactiveState?: InputBoxState
  activeState?: InputBoxState
  state?: InputBoxState
  errorText?: string
  leftItem?: React.ReactNode
  rightItem?: React.ReactNode
}

export default function FormInputTextarea(props: FormInputTextareaProps) {
  const is_dark_mode = false;
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <InputBox 
      boxStyle={props.boxStyle}
      label={props.label}
      labelSize={props.labelSize}
      state={focus ? (props.activeState ?? (props.errorText ? 'error' : 'normal')) : (props.inactiveState ?? (props.errorText ? 'error' : 'border'))}
      rightItem={props.rightItem}
      leftItem={props.leftItem}
      errorText={props.errorText}
      required={props.required}
      labelStyle={props.labelStyle}
      removeLabelPaddingLeft={true}>
      <CustomInput 
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        rows={6}
        {...props} />
    </InputBox>
  );
}

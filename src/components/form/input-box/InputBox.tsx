import React, { useEffect } from "react";
import { CSSProperties } from "styled-components";
import { theme } from "../../theme";
import { Box, CenterItem, InputBoxContainer, InputBoxErrorText, InputBoxLabelDark, InputBoxLabelLight } from "./styled";

export type InputBoxState = 'normal' | 'done' | 'error' | 'border' | 'calendar-off' | 'calendar-on' | 'search' | 'transparent';

interface InputBoxProps {
  state?: InputBoxState
  children?: React.ReactNode
  leftItem?: React.ReactNode
  rightItem?: React.ReactNode
  label?: string
  labelSize?: number
  removeLabelPaddingLeft?: boolean
  errorText?: string
  containerStyle?: CSSProperties
  labelStyle?: CSSProperties
  boxStyle?: CSSProperties
  required?: boolean
  onClick?(): void
}

function getInputBoxStateStyle(is_dark_mode: boolean, state: InputBoxState): CSSProperties {
  switch (state) {
    case 'normal':
      return {
        border: `solid 1px ${theme.primary_color}`,
        backgroundColor: is_dark_mode ? '#222' : '#FFF'
      }
    case 'error':
      return {
        border: `solid 1px ${theme.danger_color}`,
        backgroundColor: is_dark_mode ? '#222' : '#FFF'
      }
    case 'border':
      return {
        border: `solid 1px ${is_dark_mode ? '#888' : '#CCC'}`,
        backgroundColor: is_dark_mode ? '#222' : '#FFF',
      }
    case 'transparent':
      return {
        border: `solid 1px ${is_dark_mode ? '#222' : '#FFF'}`,
        backgroundColor: is_dark_mode ? '#222' : '#FFF'
      }
    case 'calendar-off':
      return {
        border: `solid 1px #E9E9E9`,
        backgroundColor: '#E9E9E9'
      }
    case 'calendar-on':
      return {
        border: `solid 1px ${theme.primary_color}`,
        backgroundColor: theme.primary_color
      }
    case 'done':
      return {
        border: `solid 1px ${theme.primary_color}`,
        backgroundColor: theme.primary_color
      }
    case 'search':
      return {
        border: `solid 1px #EBEBEB`,
        backgroundColor: '#FFF',
        color: '#777'
      }
  }
}

export default function InputBox(props: InputBoxProps) {
  const is_dark_mode = false;
  const state_style = getInputBoxStateStyle(is_dark_mode, props.state ?? 'normal');

  const InputBoxLabel = is_dark_mode ? InputBoxLabelDark : InputBoxLabelLight;

  return (
    <InputBoxContainer 
      onClick={props.onClick}
      style={props.containerStyle}>
      { props.label && <InputBoxLabel style={{
        paddingLeft: props.removeLabelPaddingLeft ? 0 : 14,
        ...(props.labelStyle ?? {})
      }}>
        <div>
          { props.required && <span style={{ color: '#F00' }}>{'* '}</span>}{ props.label }
        </div>
      </InputBoxLabel> }
      <Box style={{ ...state_style, ...(props.boxStyle ?? {}) }}>
        { props.leftItem }
        <CenterItem>
          { props.children }
        </CenterItem>
        { props.rightItem }
      </Box>
      { props.state === 'error' && <InputBoxErrorText>
        { props.errorText }
      </InputBoxErrorText> }
    </InputBoxContainer>
  );
}

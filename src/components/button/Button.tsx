import React from "react";
import { CSSProperties } from "react";
import { ButtonContainer, ButtonOutlineContainer } from "./styled";

interface ButtonProps {
  children?: any
  href?: string
  onClick?(): void
  outline?: boolean
  style?: CSSProperties
}

export function Button(props: ButtonProps) {
  const Container = props.outline ? ButtonOutlineContainer : ButtonContainer;

  return (
    <a href={props.href}>
      <Container style={props.style} onClick={props.onClick}>
        { props.children }
      </Container>
    </a>
  );
}

import React, { useEffect } from "react";
import { ViewComponentButton } from "sira-lang/lib/sira.interface";
import { Button } from "../../../../button/Button";
import { StatementExec } from "../../../statement-exec";
import { WDIButtonViewContainer, WDIButtonViewPreviewContainer } from "./styled";

interface WDIButtonViewProps {
  data: ViewComponentButton
  state: any
  setState(state: any): void
}

export function WDIButtonView(props: WDIButtonViewProps) {
  async function onClick() {
    console.log(props.state);
    const statement_exec = new StatementExec({
      parent_state: props.state,
      statements: props.data.data.statements,
    });
    statement_exec.execute();
    props.setState(props.state);
  }
  
  return (
    <WDIButtonViewContainer>
      <Button onClick={onClick} style={{ padding: '6px 16px' }}>
        { props.data.data.label }
      </Button>
    </WDIButtonViewContainer>
  );
}

interface WDIButtonViewPreviewProps {
  data: ViewComponentButton
}

export function WDIButtonViewPreview(props: WDIButtonViewPreviewProps) {
  return (
    <WDIButtonViewPreviewContainer>
      <Button style={{ padding: '6px 16px' }}>
        { props.data.data.label }
      </Button>
    </WDIButtonViewPreviewContainer>
  );
}

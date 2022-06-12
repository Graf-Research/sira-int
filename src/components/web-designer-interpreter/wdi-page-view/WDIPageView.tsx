import React, { useEffect } from "react";
import { ViewComponent } from "sira-lang/lib/sira.interface";
import { WDIButtonView, WDIButtonViewPreview } from "./item-view-interpreter/wdi-button-view/WDIButtonView";
import { WDIFormView, WDIFormViewPreview } from "./item-view-interpreter/wdi-form-view/WDIFormView";
import { WDIMultiformView, WDIMultiformViewPreview } from "./item-view-interpreter/wdi-multiform-view/WDIMultiformView";
import { WDITableView, WDITableViewPreview } from "./item-view-interpreter/wdi-table-view/WDITableView";
import { WDIPageViewContainer, WDIPageViewPreviewContainer, WDIPageViewTitle } from "./styled";

interface WDIPageViewProps {
  title: string
  views: ViewComponent[]
  state: any
  setState(state: any): void
}

export function WDIPageView(props: WDIPageViewProps) {
  return (
    <WDIPageViewContainer>
      <WDIPageViewTitle>
        { props.title }
      </WDIPageViewTitle>
      { props.views.map((iv: ViewComponent, i: number) => {
        switch (iv.type) {
          case 'button': return (<WDIButtonView 
            key={i}
            state={props.state}
            setState={props.setState}
            data={iv} />)
          case 'form': return (<WDIFormView
            key={i}
            state={props.state}
            setState={props.setState}
            data={iv} />)
          case 'multiform': return (<WDIMultiformView
            key={i}
            state={props.state}
            setState={props.setState}
            data={iv} />)
          case 'table': return (<WDITableView
            key={i}
            state={props.state}
            setState={props.setState}
            data={iv} />)
        }
      }) }
    </WDIPageViewContainer>
  );
}

interface WDIPageViewPreviewProps {
  rawCode: string
  views: ViewComponent[]
  title: string
}

export function WDIPageViewPreview(props: WDIPageViewPreviewProps) {
  return (
    <WDIPageViewPreviewContainer>
      <WDIPageViewTitle>
        { props.title }
      </WDIPageViewTitle>
      {
        (props.views ?? []).map((iv: ViewComponent, i: number) => {
          switch (iv.type) {
            case 'button': return (<WDIButtonViewPreview 
              key={i}
              data={iv} />)
            case 'form': return (<WDIFormViewPreview
              key={i}
              data={iv} />)
            case 'multiform': return (<WDIMultiformViewPreview
              key={i}
              data={iv} />)
            case 'table': return (<WDITableViewPreview
              key={i}
              data={iv} />)
          }
        })
      }
    </WDIPageViewPreviewContainer>
  );
}

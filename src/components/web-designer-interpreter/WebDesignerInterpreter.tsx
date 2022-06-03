import React from "react";
import { useEffect, useState } from "react";
import { MainSection, SidebarSection, WebDesignerInterpreterContainer } from "./styled";
import { WDIPageView } from "./wdi-page-view/WDIPageView";
import { WDISidebar } from "./wdi-sidebar/WDISidebar";
import { PageSection, SectionData, SiraPage, StatementVariableAssignment, VariableAssignment, ViewComponent } from 'sira-lang/lib/sira.interface';
import { StatementExec } from "./statement-exec";
import { SiraState, SiraStateDataCell } from "./statement.interface";
import { getAllUrlParams, getUrlParam } from "../url.util";

export interface WebDesignerInterpreterProps {
  pages: SiraPage[]
}

export function WebDesignerInterpreter(props: WebDesignerInterpreterProps) {
  const page_title: string = getUrlParam('page') as string;
  const [active_page, setActivePage] = useState<SiraPage>();
  const [state, setState] = useState<SiraState>({
    data: getParamsData()
  });

  function getParamsData(): {[key: string]: SiraStateDataCell} {
    const list_params_cell: {[key: string]: SiraStateDataCell} = Object.keys(getAllUrlParams())
      .reduce((accumulator: {[key: string]: SiraStateDataCell}, key: string) => {
        accumulator[key] = {
          type: 'cell',
          value: getUrlParam(key)
        } as SiraStateDataCell;
        return accumulator;
      }, {});
    return list_params_cell;
  }
  
  function onChangePage(page: string) {
    window.location = `?page=${page}` as any;
  }

  async function initPage() {
    // Get current page
    const current_page: SiraPage | undefined = props.pages.find((sp: SiraPage) => sp.title === page_title);
    if (!current_page) {
      return;
    }

    // Initiate data if exist
    const data: SectionData | undefined = current_page.sections.find((ps: PageSection) => ps.type === 'data') as SectionData | undefined;
    if (data) {
      const statement_exec = new StatementExec({
        parent_state: state,
        statements: data.data.map((va: VariableAssignment) => ({
          type: 'variable-assignment',
          data: va
        } as StatementVariableAssignment))
      });
      const new_state = await statement_exec.execute();
      console.log('new_state', new_state);
      setState({
        data: {
          ...new_state.data,
          ...getParamsData()
        }
      });
    }
    
    // Propagate active page
    // Initial data must be executed first or else state will be undefined will cause an error
    setActivePage(current_page);
  }

  useEffect(() => {
    if (!page_title) {
      return;
    }
    initPage().catch(err => alert(err.toString()));
  }, [props.pages, page_title]);

  return (
    <WebDesignerInterpreterContainer>
      <SidebarSection>
        <WDISidebar 
          onPageChange={onChangePage}
          pages={props.pages} />
      </SidebarSection>
      <MainSection>
        <div style={{ fontSize: 24, marginBottom: 20, fontWeight: 700 }}>
          { active_page?.title }
        </div>
        <WDIPageView 
          state={state}
          setState={__state => setState({ ...__state })}
          views={(active_page?.sections.find((ip: PageSection) => ip.type === 'view')?.data ?? []) as ViewComponent[]} />
      </MainSection>
    </WebDesignerInterpreterContainer>
  );
}

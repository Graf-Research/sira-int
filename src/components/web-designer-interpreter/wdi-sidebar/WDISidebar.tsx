import React from "react";
import { ActiveMenu, ContainerMenu, ContainerSidebar, Menu, WDISidebarContainer } from "./styled";
import { PageSection, SiraPage } from 'sira-lang/lib/sira.interface';
import { getUrlParam } from "../../url.util";

interface WDISidebarProps {
  pages: SiraPage[]
  onPageChange(page: string): void
}

function needParams(sp: SiraPage): boolean {
  if (sp.sections.find((item: PageSection) => item.type === 'param')) {
    return true;
  }

  return false;
}

export function WDISidebar(props: WDISidebarProps) {
  return (
    <WDISidebarContainer>
      <ContainerSidebar>
        <div style={{ marginLeft: 19, marginBottom: 10 }}>
          Logo
        </div>
        {
          props.pages.filter((sp: SiraPage) => !needParams(sp)).map((sp: SiraPage, i: number) => {
            const is_active = getUrlParam('page') === sp.title;
            const MenuStyle = is_active ? ActiveMenu : Menu;

            return (
              <ContainerMenu key={i}>
                <MenuStyle onClick={() => props.onPageChange(sp.title)}>
                  { sp.title }
                </MenuStyle>
              </ContainerMenu>
            );
          })
        }
      </ContainerSidebar>
    </WDISidebarContainer>
  );
}

import React from "react";
import { ActiveMenu, ContainerMenu, ContainerSidebar, LogoContainer, Menu, WDISidebarContainer } from "./styled";
import { PageSection, SiraPage } from 'sira-lang/lib/sira.interface';
import { getUrlParam } from "../../url.util";
import { HomeIconBase64 } from "../../icon";

interface WDISidebarProps {
  pages: SiraPage[]
  onPageChange(page: string): void
  onLogout?(): void
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
        <LogoContainer>
          Play on Dearblues
        </LogoContainer>
        {
          props.pages.filter((sp: SiraPage) => !needParams(sp)).map((sp: SiraPage, i: number) => {
            const is_active = getUrlParam('page') === sp.title;
            const MenuStyle = is_active ? ActiveMenu : Menu;

            return (
              <ContainerMenu key={i}>
                <MenuStyle onClick={() => props.onPageChange(sp.title)}>
                  <img src={HomeIconBase64} />
                  { sp.title }
                </MenuStyle>
              </ContainerMenu>
            );
          })
        }
        <br/>
        <ContainerMenu>
          <Menu onClick={props.onLogout}>
            Logout
          </Menu>
        </ContainerMenu>
      </ContainerSidebar>
    </WDISidebarContainer>
  );
}

import React, { useEffect } from "react";
import { useState } from "react";
import FormInputText from "../../form-input-text/FormInputText";
import { ActiveDropdownItemDark, ActiveDropdownItemLight, DropdownContainerDark, DropdownContainerLight, DropdownItemDark, DropdownItemLight } from "./styled";

export interface Option {
  label: string
  value: any
  editValue?: any
  editValueType?: 'text' | 'boolean' | 'dropdown' | 'dropdown-multiple' | 'upload-npwp' | 'upload-images'
  options?: Option[]
  onClick?(): void
  onChange?(v: any): void
  is_boolean_type?: boolean
  hide?: boolean
}

export interface CustomOption {
  render?(callback?: () => void): React.ReactNode
}

interface DropdownProps {
  customOptions?: CustomOption[]
  options?: Option[]
  value?: any
  withoutFilter?: boolean
  onValueChange?(value: any): void
}

export default function Dropdown(props: DropdownProps) {
  const is_dark_mode = false;
  const [temp_data, setTempData] = useState<Option[]>(props.options ?? []);

  const DropdownContainer = is_dark_mode ? DropdownContainerDark : DropdownContainerLight;
  const DropdownItem = is_dark_mode ? DropdownItemDark : DropdownItemLight;
  const ActiveDropdownItem = is_dark_mode ? ActiveDropdownItemDark : ActiveDropdownItemLight;

  return (
    <div>
      { !props.withoutFilter && <FormInputText
        autoFocus
        onChange={e => {
          setTempData((props.options ?? []).filter(o => o.label.toLowerCase().includes(e.target.value.toLowerCase())))
        }}
        containerStyle={{
          marginBottom: 0,
        }}
        activeState={'transparent'}
        inactiveState={'transparent'}
        boxStyle={{
          borderBottom: 'solid 1px #CCC',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        placeholder={'Filter'} />
      }
      <DropdownContainer>
        { (props.options ?? []).length === 0 && <div style={{ marginLeft: 16, color: '#777' }}><i>Tidak ada data</i></div> }
        {
          temp_data.filter((option: Option) => !option.hide).map((option: Option, i: number) => {
            if (option.value === props.value) {
              return (
                <ActiveDropdownItem 
                onClick={() => {
                  if (option.onClick) {
                    option.onClick();
                  }
                  if (props.onValueChange) {
                    props.onValueChange(option.value);
                  }
                }}
                key={i}>
                  { option.label }
                </ActiveDropdownItem>
              )
            }
            return (
              <DropdownItem 
                key={i}
                onClick={() => {
                  if (option.onClick) {
                    option.onClick();
                  }
                  if (props.onValueChange) {
                    props.onValueChange(option.value);
                  }
                }}>
                { option.label }
              </DropdownItem>
            );
          })
        }
        {
          (props.customOptions ?? []).map((custom_option: CustomOption) => (custom_option as any).render())
        }
      </DropdownContainer>
    </div>
  );
}

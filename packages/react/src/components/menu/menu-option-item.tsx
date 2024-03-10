import { cx } from "@chakra-ui/utils"
import { useCallback, useId, useMemo } from "react"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import {
  OptionItemStateProvider,
  useMenuContext,
  useMenuGroupContext,
  useMenuStyles,
} from "./menu-context"
import { UseMenuOptionItemProps } from "./use-menu"

export interface MenuOptionItemProps
  extends HTMLChakraProps<"button", UseMenuOptionItemProps> {}

export const MenuOptionItem = forwardRef<MenuOptionItemProps, "button">(
  function MenuOptionItem(props, ref) {
    const api = useMenuContext()
    const group = useMenuGroupContext()
    const styles = useMenuStyles()

    const uid = useId()
    const id = props.id ?? `menuitem-${uid}`

    const optionProps = useMemo(
      () =>
        api.getOptionItemProps(
          {
            ...props,
            id,
            type: group.type,
            isChecked: group.isChecked(props.value!),
            onClick: () => group.setValue(props.value!),
          },
          ref,
        ),
      [],
    )

    return (
      <OptionItemStateProvider
        value={{ isChecked: group.isChecked(props.value!), type: group.type }}
      >
        <chakra.button
          {...optionProps}
          className={cx("chakra-menu__menuitem-option", props.className)}
          css={[styles.item, props.css]}
        />
      </OptionItemStateProvider>
    )
  },
)

MenuOptionItem.displayName = "MenuOptionItem"

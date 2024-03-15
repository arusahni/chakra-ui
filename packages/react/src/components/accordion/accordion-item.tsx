import { MaybeRenderProp, cx, runIfFn } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import {
  AccordionItemContextProvider,
  useAccordionStyles,
} from "./accordion-context"
import { splitAccordionItemProps } from "./accordion-props"
import { UseAccordionItemProps, useAccordionItem } from "./use-accordion-item"

interface AccordionItemState {
  isOpen: boolean
  isDisabled: boolean
}

export interface AccordionItemProps
  extends Omit<
      HTMLChakraProps<"div">,
      keyof UseAccordionItemProps | "children"
    >,
    UseAccordionItemProps {
  children?: MaybeRenderProp<AccordionItemState>
}
/**
 * AccordionItem is a single accordion that provides the open-close
 * behavior when the accordion button is clicked.
 *
 * It also provides context for the accordion button and panel.
 */
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem(props, ref) {
    const { children, ...restProps } = props

    const [itemProps, localProps] = splitAccordionItemProps(restProps)

    const itemApi = useAccordionItem(itemProps)
    const styles = useAccordionStyles()

    const itemState = {
      isOpen: !!itemApi.open,
      isDisabled: !!itemApi.disabled,
      isFocused: !!itemApi.focused,
    }

    return (
      <AccordionItemContextProvider value={itemApi}>
        <chakra.div
          {...itemApi.getItemProps(localProps, ref)}
          className={cx("chakra-accordion__item", props.className)}
          css={[styles.item, localProps.css]}
        >
          {runIfFn(children, itemState)}
        </chakra.div>
      </AccordionItemContextProvider>
    )
  },
)

AccordionItem.displayName = "AccordionItem"

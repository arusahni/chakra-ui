import {
  HTMLChakraProps,
  SlotRecipeProps,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import { FieldOptions, splitFieldProps, useField } from "../field"
import { SelectContextProvider, SelectStylesProvider } from "./select-context"

export interface NativeSelectRootProps
  extends HTMLChakraProps<"div">,
    SlotRecipeProps<"NativeSelect">,
    FieldOptions {}

/**
 * React component used to select one item from a list of options.
 *
 * @see Docs https://chakra-ui.com/docs/components/select
 */
export const NativeSelectRoot = forwardRef<NativeSelectRootProps, "select">(
  function NativeSelectRoot(props, ref) {
    const recipe = useSlotRecipe("NativeSelect", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const [fieldProps, rootProps] = splitFieldProps(localProps)
    const field = useField(fieldProps)

    return (
      <SelectContextProvider value={field}>
        <SelectStylesProvider value={styles}>
          <chakra.div
            ref={ref}
            className="chakra-select"
            css={styles.root}
            {...rootProps}
          >
            {props.children}
          </chakra.div>
        </SelectStylesProvider>
      </SelectContextProvider>
    )
  },
)

NativeSelectRoot.displayName = "Select"

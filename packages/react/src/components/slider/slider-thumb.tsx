import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useSliderContext, useSliderStyles } from "./slider-context"

export interface SliderThumbProps extends HTMLChakraProps<"div"> {}

/**
 * Slider component that acts as the handle used to select predefined
 * values by dragging its handle along the track
 */
export const SliderThumb = forwardRef<SliderThumbProps, "div">(
  function SliderThumb(props, ref) {
    const api = useSliderContext()
    const styles = useSliderStyles()
    return (
      <chakra.div
        {...api.getThumbProps(props, ref)}
        className={cx("chakra-slider__thumb", props.className)}
        css={[styles.thumb, props.css]}
      />
    )
  },
)

SliderThumb.displayName = "SliderThumb"

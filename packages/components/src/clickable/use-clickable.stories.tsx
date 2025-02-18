import { chakra, forwardRef } from "../system"
import * as React from "react"
import { useClickable } from "."

const Clickable: React.FC<any> = forwardRef((props, ref) => {
  const clickable = useClickable({ ...props, ref })
  return <chakra.button display="inline-flex" {...clickable} />
})

export default {
  title: "System / Clickable",
}

export const button = () => (
  <>
    <Clickable
      as="div"
      onClick={() => {
        alert("clicked")
      }}
      style={{
        userSelect: "none",
      }}
      _active={{ bg: "blue.500", color: "white" }}
      _disabled={{ opacity: 0.4, pointerEvents: "none" }}
    >
      Clickable
    </Clickable>

    <Clickable
      disabled
      focusable
      _disabled={{ opacity: 0.4, pointerEvents: "none" }}
    >
      Clickable
    </Clickable>

    <button
      onClick={() => {
        alert("clicked")
      }}
    >
      Native Button
    </button>
  </>
)

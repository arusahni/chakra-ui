import { fireEvent, render, testA11y, waitFor } from "@chakra-ui/test-utils"
import * as React from "react"
import { Dialog } from "../src/components/dialog"

const DemoDialog = (props: Omit<Dialog.RootProps, "children">) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Backdrop data-testid="overlay" />
      <Dialog.Positioner>
        <Dialog.Content data-testid="content">
          <Dialog.Header>Dialog header</Dialog.Header>
          <Dialog.CloseTrigger data-testid="close" />
          <Dialog.Body>Dialog body</Dialog.Body>
          <Dialog.Footer>Dialog footer</Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

test("should have no accessibility violations", async () => {
  const { baseElement } = render(<DemoDialog open onClose={vi.fn()} />)

  // Test baseElement because the Dialog. is in a portal
  await testA11y(baseElement, {
    axeOptions: {
      rules: {
        // https://github.com/dequelabs/axe-core/issues/3752
        "aria-dialog-name": { enabled: false },
      },
    },
  })
})

test("should have the proper 'aria' attributes", () => {
  const { getByRole, getByText } = render(<DemoDialog open onClose={vi.fn()} />)

  const dialog = getByRole("dialog")

  expect(dialog).toHaveAttribute("aria-modal", "true")
  expect(dialog).toHaveAttribute("role", "dialog")

  expect(getByText("Dialog body").id).toEqual(
    dialog.getAttribute("aria-describedby"),
  )

  /**
   * The id of `DialogHeader` should equal the `aria-labelledby` of the dialog
   */
  expect(getByText("Dialog header").id).toEqual(
    dialog.getAttribute("aria-labelledby"),
  )
})

test("should fire 'onClose' callback when close button is clicked", () => {
  const onClose = vi.fn()
  const tools = render(<DemoDialog open onClose={onClose} />)

  fireEvent.click(tools.getByTestId("close"))
  expect(onClose).toHaveBeenCalled()
})

test.skip("should close on outside click", async () => {
  const onClose = vi.fn()
  const { user, getByTestId } = render(<DemoDialog open onClose={onClose} />)

  await user.click(getByTestId("overlay"))
  expect(onClose).toHaveBeenCalled()
})

test.skip("should close on escape key", async () => {
  const onClose = vi.fn()
  const { user } = render(<DemoDialog open onClose={onClose} />)
  await user.keyboard("[Escape]")
  expect(onClose).toHaveBeenCalled()
})

test("focus initial element when opened", () => {
  const Component = () => {
    const [open, setOpen] = React.useState(false)
    const inputRef = React.useRef(null)
    return (
      <>
        <button
          type="button"
          data-testid="button"
          onClick={() => setOpen(true)}
        >
          Open
        </button>

        <Dialog.Root open={open} initialFocusRef={inputRef} onClose={vi.fn()}>
          <Dialog.Backdrop />
          <Dialog.Content>
            <Dialog.Header>Dialog. header</Dialog.Header>
            <Dialog.Body>
              <input />
              <input />
              <input data-testid="input" ref={inputRef} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Root>
      </>
    )
  }

  const { getByTestId } = render(<Component />)

  fireEvent.click(getByTestId("button"))
  expect(getByTestId("input")).toHaveFocus()
})

test("should return focus to button when closed", async () => {
  const Component = () => {
    const [open, setopen] = React.useState(false)
    const buttonRef = React.useRef(null)
    return (
      <>
        <button
          type="button"
          ref={buttonRef}
          data-testid="button"
          onClick={() => setopen(true)}
        >
          Open
        </button>

        <Dialog.Root
          finalFocusRef={buttonRef}
          open={open}
          onClose={() => setopen(false)}
        >
          <Dialog.Backdrop />
          <Dialog.Content>
            <Dialog.Header>Dialog. header</Dialog.Header>
            <Dialog.CloseTrigger data-testid="close" />
            <Dialog.Body>Dialog. body</Dialog.Body>
          </Dialog.Content>
        </Dialog.Root>
      </>
    )
  }

  const { getByTestId } = render(<Component />)

  const button = getByTestId("button")
  expect(button).not.toHaveFocus()

  fireEvent.click(button)
  fireEvent.click(getByTestId("close"))

  await waitFor(() => expect(button).toHaveFocus())
})

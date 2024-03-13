import {
  fireEvent,
  focus,
  render,
  screen,
  testA11y,
} from "@chakra-ui/test-utils"
import { RangeSlider } from "../src"

const HorizontalSlider = () => {
  return (
    <RangeSlider.Root
      aria-label={["leftThumb", "rightThumb"]}
      min={1}
      max={100}
      defaultValue={[40, 80]}
    >
      <RangeSlider.Track>
        <RangeSlider.FilledTrack />
      </RangeSlider.Track>
      <RangeSlider.Thumb index={0} />
      <RangeSlider.Thumb index={1} />
    </RangeSlider.Root>
  )
}

const HorizontalSliderWithStackedThumbs = () => {
  return (
    <RangeSlider.Root min={0} max={100} defaultValue={[0, 0, 100]}>
      <RangeSlider.Track>
        <RangeSlider.FilledTrack />
      </RangeSlider.Track>
      <RangeSlider.Thumb index={0} />
      <RangeSlider.Thumb index={1} />
      <RangeSlider.Thumb index={2} />
    </RangeSlider.Root>
  )
}

const getThumbs = () => screen.getAllByRole("slider")

test("passes a11y test", async () => {
  await testA11y(<HorizontalSlider />)
})

test("should move the left thumb with an arrow key", async () => {
  const { user } = render(<HorizontalSlider />)

  const [leftThumb] = getThumbs()

  focus(leftThumb)

  await user.keyboard("[ArrowRight]")
  expect(leftThumb).toHaveAttribute("aria-valuenow", "41")
})

test("should move the right thumb with an arrow key", async () => {
  const { user } = render(<HorizontalSlider />)

  const [, rightThumb] = getThumbs()

  focus(rightThumb)

  await user.keyboard("[ArrowRight]")
  expect(rightThumb).toHaveAttribute("aria-valuenow", "81")
})

test("should increment a thumb by 10 position pressing the page-up key", async () => {
  const { user } = render(<HorizontalSlider />)

  const [leftThumb] = getThumbs()

  focus(leftThumb)

  await user.keyboard("[PageUp]")
  expect(leftThumb).toHaveAttribute("aria-valuenow", "50")
})

test("should decrement a thumb by 10 position pressing the page-down key", async () => {
  const { user } = render(<HorizontalSlider />)

  const [leftThumb] = getThumbs()
  focus(leftThumb)

  await user.keyboard("[PageDown]")
  expect(leftThumb).toHaveAttribute("aria-valuenow", "30")
})

test("should set a thumb to its minimum value when pressing the home key", async () => {
  const { user } = render(<HorizontalSlider />)

  const [, rightThumb] = getThumbs()
  focus(rightThumb)

  await user.keyboard("[Home]")

  // The minimum value for the right thumb is whatever value
  // the left thumb currently is
  expect(rightThumb).toHaveAttribute("aria-valuenow", "40")
})

test("should set a thumb to its maximum value when pressing the end key", async () => {
  const { user } = render(<HorizontalSlider />)

  const [, rightThumb] = getThumbs()
  focus(rightThumb)

  await user.keyboard("[End]")

  expect(rightThumb).toHaveAttribute("aria-valuenow", "100")
})

test.skip("should move the correct thumb when user clicks the track in case of stacked thumbs", () => {
  render(<HorizontalSliderWithStackedThumbs />)

  const track = screen.getByTestId("chakra-range-slider-track")

  // getBoundingClientRect is not supported by JSDOM
  // its implementation needs to be mocked
  vi.spyOn(track, "getBoundingClientRect").mockImplementation(
    () =>
      ({
        left: 0,
        top: 0,
        width: 100,
        height: 20,
      }) as DOMRect,
  )

  const clickCoordinates = { clientX: 20, clientY: 10 }

  fireEvent.pointerDown(track, clickCoordinates)

  const [firstThumb, secondThumb, thirdThumb] = getThumbs()

  expect(firstThumb).toHaveAttribute("aria-valuenow", "0")
  expect(secondThumb).toHaveAttribute("aria-valuenow", "20")
  expect(thirdThumb).toHaveAttribute("aria-valuenow", "100")
})

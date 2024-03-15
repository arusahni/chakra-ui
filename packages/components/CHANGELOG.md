# @chakra-ui/react

## 3.0.0

### Major Changes

- [#8153](https://github.com/chakra-ui/chakra-ui/pull/8153)
  [`7b6e66a`](https://github.com/chakra-ui/chakra-ui/commit/7b6e66a15b08ad27e8458a009c3fb15ee738ca37)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Prepares the ground
  for the next version Chakra that leverages Ark UI.

  **User Facing**

  - Consolidate all component packages into a single package
  - Remove all deprecated components and APIs
  - Simplify the Changelogs for all v2 releases

  **Infrastructure**

  - Simplify the repo infrastructure and release process
  - Migrate from `jest` to `vitest`
  - Migrate from `tsup` to custom `rollup` setup for better bundling strategy

- [#8222](https://github.com/chakra-ui/chakra-ui/pull/8222)
  [`c583d8a`](https://github.com/chakra-ui/chakra-ui/commit/c583d8a03d813d26d14d340984e91385b6b403a2)
  Thanks [@TKYK93](https://github.com/TKYK93)! - Add default
  preserveScrollBarGap

### Minor Changes

- [#8349](https://github.com/chakra-ui/chakra-ui/pull/8349)
  [`bb3ce66`](https://github.com/chakra-ui/chakra-ui/commit/bb3ce6671d4b857ebe79ce968c4acbc0b32cff42)
  Thanks [@autologie](https://github.com/autologie)! - Suppress unnecessary
  re-renders of Checkbox and Radio component

- [#8302](https://github.com/chakra-ui/chakra-ui/pull/8302)
  [`8296ad3`](https://github.com/chakra-ui/chakra-ui/commit/8296ad3b930d9708d9a0261693cb046181272972)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  `asChild` in chakra factory

- [#8136](https://github.com/chakra-ui/chakra-ui/pull/8136)
  [`006d9e0`](https://github.com/chakra-ui/chakra-ui/commit/006d9e0b5e58aaa8f5ac635ea1238be6ed7e73d6)
  Thanks [@MrBr](https://github.com/MrBr)! - Export `toastStore` from `toast`
  component

- [#8218](https://github.com/chakra-ui/chakra-ui/pull/8218)
  [`a89c598`](https://github.com/chakra-ui/chakra-ui/commit/a89c598ed822bf11efc519f8789fa7c145e3bba0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  custom theme conditions or pseudo props via `theme.conditions`

  ```ts
  // theme.ts

  const theme = extendTheme({
    conditions: {
      _closed: "[data-state='closed']", // pseudo prop
    },
  })
  ```

  This allows you to use the pseudo prop in your components

  ```jsx
  <Box data-state="closed" _closed={{ bg: "red.200" }}>
    This box is closed
  </Box>
  ```

  **For TypeScript users**, you need to use the Chakra CLI to generate the types
  for your custom conditions.

  ```sh
  pnpm chakra-cli tokens src/theme/index.ts
  ```

- [#8303](https://github.com/chakra-ui/chakra-ui/pull/8303)
  [`2ac836e`](https://github.com/chakra-ui/chakra-ui/commit/2ac836ebce407990371e54bc16d379e704648935)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add component
  namespace to reduce imports and provide better composition

### Patch Changes

- [#8208](https://github.com/chakra-ui/chakra-ui/pull/8208)
  [`8135ded`](https://github.com/chakra-ui/chakra-ui/commit/8135ded09b523681f33e818017a841b64a05e9c1)
  Thanks [@SamuelNoB](https://github.com/SamuelNoB)! - Fix problem with leading
  and trailing spaces when getting initials for the Avatar component

- [#8354](https://github.com/chakra-ui/chakra-ui/pull/8354)
  [`71c0244`](https://github.com/chakra-ui/chakra-ui/commit/71c0244bedbd0253afc33b4bd39dbf03808989e4)
  Thanks [@NASlR](https://github.com/NASlR)! - Upgrade framer-motion to allow
  for skipAnimations (#3696)

- Updated dependencies
  [[`170198f`](https://github.com/chakra-ui/chakra-ui/commit/170198fc3936ad34f8136a2da173c12d9dc3dc36),
  [`52d5f3c`](https://github.com/chakra-ui/chakra-ui/commit/52d5f3ccb5732b3ba84cdc04c3258c49c38c64a9),
  [`a89c598`](https://github.com/chakra-ui/chakra-ui/commit/a89c598ed822bf11efc519f8789fa7c145e3bba0),
  [`2ac836e`](https://github.com/chakra-ui/chakra-ui/commit/2ac836ebce407990371e54bc16d379e704648935),
  [`a89c598`](https://github.com/chakra-ui/chakra-ui/commit/a89c598ed822bf11efc519f8789fa7c145e3bba0)]:
  - @chakra-ui/theme@3.4.0
  - @chakra-ui/styled-system@2.10.0
  - @chakra-ui/utils@2.1.0
  - @chakra-ui/hooks@2.2.2

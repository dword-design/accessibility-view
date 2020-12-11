<!-- TITLE/ -->
# @dword-design/accessibility-view
<!-- /TITLE -->

<!-- BADGES/ -->
![Linux macOS Windows compatible](https://img.shields.io/badge/os-linux%20%7C%C2%A0macos%20%7C%C2%A0windows-blue)
[![Build status](https://github.com/dword-design/accessibility-view/workflows/build/badge.svg)](https://github.com/dword-design/accessibility-view/actions)
[![Dependency status](https://img.shields.io/david/dword-design/accessibility-view)](https://david-dm.org/dword-design/accessibility-view)
![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen)

<a href="https://gitpod.io/#https://github.com/dword-design/bar">
  <img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod">
</a><a href="https://www.buymeacoffee.com/dword">
  <img
    src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
    alt="Buy Me a Coffee"
    height="32"
  >
</a><a href="https://paypal.me/SebastianLandwehr">
  <img
    src="https://dword-design.de/images/paypal.svg"
    alt="PayPal"
    height="32"
  >
</a><a href="https://www.patreon.com/dworddesign">
  <img
    src="https://dword-design.de/images/patreon.svg"
    alt="Patreon"
    height="32"
  >
</a>
<!-- /BADGES -->

<!-- DESCRIPTION/ -->
Accessibility View converts an arbitrary website into its accessibility relevant form.
<!-- /DESCRIPTION -->

<!-- INSTALL/ -->
## Recommended setup
* Node.js 12.16.0
* Yarn 1.21.1

## Install
```bash
$ yarn --frozen-lockfile
```

## Running a development server
```bash
$ yarn dev [target]
```
Available targets are `firefox` and `chrome`. Default is `firefox`.

## Building the extension for upload
```bash
$ yarn prepublishOnly
```

## Archiving the source for upload
```bash
$ yarn source
```
<!-- /INSTALL -->

<!-- LICENSE/ -->
## License

Unless stated otherwise all works are:

Copyright &copy; Sebastian Landwehr <info@dword-design.de>

and licensed under:

[MIT License](https://opensource.org/licenses/MIT)
<!-- /LICENSE -->

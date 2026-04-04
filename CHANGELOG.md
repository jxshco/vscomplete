# Changelog

All notable changes to the VSComplete extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- README: document Cursor and other Open VSX–based editors, VSIX install path, and Marketplace search tip

### Added

- `@vscode/vsce` devDependency so `yarn package` works without a global `vsce` install

### Fixed

- Exclude `.vscomplete.json` from packaged `.vsix` (workspace state, not part of the extension)

## [0.1.0] - 2026-03-20

### Added

- Mark files as complete with a green checkmark badge in the explorer
- Mark entire folders as complete (recursively marks all contents)
- Unmark files and folders to remove completion status
- Right-click context menu commands: "Mark as Complete" and "Unmark as Complete"
- Completion state persisted to `.vscomplete.json` in workspace root
- Customisable theme colour for completed items (`vscomplete.completedForeground`)

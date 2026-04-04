# VSComplete

Visually mark files and folders as complete in the VS Code explorer.

A lightweight extension that adds a green checkmark badge to files and folders you've finished working on — helping you track progress through large codebases, reviews, migrations, or any task that involves working through files one by one.

![Files marked as complete in the explorer](images/screenshot-explorer.png)

## Features

- **Mark files as complete** — adds a green ✓ badge in the explorer
- **Mark entire folders** — recursively marks all files within the folder
- **Unmark to revert** — remove completion status when needed
- **Persisted state** — completion data saved to `.vscomplete.json` in your workspace root
- **Customisable colours** — theme colour `vscomplete.completedForeground` can be overridden

## Installation

### Visual Studio Code (Microsoft Marketplace)

The extension is published as **`jxshco.vscomplete`**. Search for **VSComplete** in the Extensions panel (low install count can hide it in browse results—pasting the full ID in the search box works), or install from a terminal:

```sh
code --install-extension jxshco.vscomplete
```

### Cursor, VSCodium, and other Open VSX–based editors

Those products resolve extensions from the [Open VSX Registry](https://open-vsx.org/), not the Microsoft VS Code Marketplace. **VSComplete is not listed on Open VSX yet**, so commands like `cursor --install-extension jxshco.vscomplete` fail with “extension not found” even though the ID is correct.

Until it is published to Open VSX, install from a **`.vsix`**:

1. **Build locally** (from this repo):

   ```sh
   yarn install
   yarn compile
   yarn package
   ```

   This produces `vscomplete-<version>.vsix` in the project root.

2. **Install the file** — either:
   - Command Palette → **Extensions: Install from VSIX…** → choose the `.vsix`, or
   - Terminal: `cursor --install-extension ./vscomplete-0.1.0.vsix` (adjust the filename to match the version you built).

To make the extension searchable and CLI-installable in Cursor, publish the same package to Open VSX (namespace must match publisher `jxshco`).

### From source (development)

```sh
git clone https://github.com/jxshco/vscomplete.git
cd vscomplete
yarn install
yarn compile
```

Then press `F5` in VS Code to launch the Extension Development Host. After `yarn compile`, run **`yarn package`** to produce a `.vsix` (for Open VSX–based editors or manual installs).

## Usage

Right-click any file or folder in the explorer to see:

![Context menu showing Mark as Complete](images/screenshot-context-menu.png)

- **Mark as Complete** — adds the ✓ badge
- **Unmark as Complete** — removes the ✓ badge

Completion state is stored in `.vscomplete.json` at your workspace root. You can commit this file to share progress with your team, or add it to `.gitignore` to keep it local.

## Configuration

### Theme Colour

Override the badge colour in your `settings.json`:

```json
{
  "workbench.colorCustomizations": {
    "vscomplete.completedForeground": "#f59e0b"
  }
}
```

Default colours:
| Theme | Colour |
|-------|--------|
| Dark | `#22c55e` |
| Light | `#16a34a` |
| High Contrast | `#22c55e` |
| High Contrast Light | `#16a34a` |

## The `.vscomplete.json` File

This is a simple JSON array of relative file paths:

```json
[
  "src/extension.ts",
  "src/state.ts"
]
```

Add it to `.gitignore` if you don't want to track it in version control.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

[MIT](LICENSE)

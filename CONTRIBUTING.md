# Contributing

Thanks for your interest in contributing to VSComplete!

## Development Setup

1. Clone the repo:

   ```sh
   git clone https://github.com/jxshco/vscomplete.git
   cd vscomplete
   ```

2. Install dependencies:

   ```sh
   yarn install
   ```

3. Compile:

   ```sh
   yarn compile
   ```

4. Press `F5` in VS Code to launch the Extension Development Host with the extension loaded.

## Scripts

| Command | Description |
|---------|-------------|
| `yarn compile` | Bundle the extension with esbuild |
| `yarn watch` | Recompile on file changes |
| `yarn lint` | Run ESLint |
| `yarn package` | Package as `.vsix` |

## Guidelines

- Use TypeScript — no plain JavaScript
- Follow conventional commit messages: `type(scope): subject`
- Keep changes focused — one feature or fix per PR
- Test your changes in the Extension Development Host before submitting

## Reporting Issues

Open an issue at [github.com/jxshco/vscomplete/issues](https://github.com/jxshco/vscomplete/issues).

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

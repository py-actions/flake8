# py-actions/flake8 GitHub Action

![Version](https://img.shields.io/github/v/release/py-actions/flake8?sort=semver)
[![Linux CI](https://github.com/py-actions/flake8/workflows/Linux%20CI/badge.svg)](https://github.com/py-actions/flake8/actions?query=workflow%3A%22Linux+CI%22)
[![macOS CI](https://github.com/py-actions/flake8/workflows/macOS%20CI/badge.svg)](https://github.com/py-actions/flake8/actions?query=workflow%3A%22macOS+CI%22)
[![Windows CI](https://github.com/py-actions/flake8/workflows/Windows%20CI/badge.svg)](https://github.com/py-actions/flake8/actions?query=workflow%3A%22Windows+CI%22)
[![Lint](https://github.com/py-actions/flake8/workflows/Lint/badge.svg)](https://github.com/py-actions/flake8/actions?query=workflow%3ALint)

This GitHub Action installs the Python [flake8 package](https://pypi.org/project/flake8/) in an environment with a Python interpreter and executes flake8 stylistic and logical linting of Python source files.  flake8 installation and execution defaults can be configured with optional Action settings.

The project is tested against the latest GitHub Actions Linux, macOS, and Windows runner environment cPython versions 3.7 - 3.10 interpreters on a nightly basis.

## Quick Start

### Default

```yaml
name: flake8 Lint

on: [push, pull_request]

jobs:
  flake8-lint:
    runs-on: ubuntu-latest
    name: Lint
    steps:
      - name: Check out source repository
        uses: actions/checkout@v2
      - name: Set up Python environment
        uses: actions/setup-python@v2
        with:
          python-version: "3.8"
      - name: flake8 Lint
        uses: py-actions/flake8@v2
```

### With custom settings

```yaml
name: flake8 Lint

on: [push, pull_request]

jobs:
  flake8-lint:
    runs-on: ubuntu-latest
    name: Lint
    steps:
      - name: Check out source repository
        uses: actions/checkout@v2
      - name: Set up Python environment
        uses: actions/setup-python@v2
        with:
          python-version: "3.8"
      - name: flake8 Lint
        uses: py-actions/flake8@v2
        with:
          ignore: "F401"
          exclude: "src/ignoreme.py"
          max-line-length: "100"
          path: "src"
          plugins: "flake8-bugbear==22.1.11 flake8-black"
```

See the Inputs section below for details on the defaults and optional configuration settings.

## Inputs

Configure the Action with the following *optional* settings:

### `flake8-version`

**Optional** flake8 version for testing. Options: ['latest', 'main', 'master', '[VERSION NUMBER]'].Default = `"latest"`.

- 'latest' = current PyPI release version
- 'main' = current [GitHub source repository main branch version](https://github.com/PyCQA/flake8)
- '[VERSION NUMBER]' = the version number of the [flake8 PyPI package](https://pypi.org/project/flake8/) (e.g., `"3.7.9"`)

### `path`

**Optional** The path to the Python source file(s) or directory. Default = `"."`.

### `args`

**Optional** Command line arguments to the flake8 executable. Default = None.

Please note that some command line arguments can be defined with other fields in your configuration.  You may combine the `args` setting with the other settings below, or use `args` to configure flake8 without the other Action settings.

See the inputs below for additional details.

### `exclude`

**Optional** Comma-delimited list of ignored file paths. Default = flake8 default.

### `ignore`

**Optional** Comma-delimited list of ignored flake8 rule codes. Default = flake8 default.

### `max-line-length`

**Optional** Integer value (as string) representing maximum acceptable line length. Default = flake8 default.

### `update-pip`

**Optional** Update `pip` before the flake8 install. Options: [`"true"`, `"false"`]. Default = `"false"`.

### `plugins`

**Optional** Space delimited list of flake8 plugin packages to install with pip prior to flake8 execution.  Default = none.

Use the syntax:

- `[PACKAGE NAME]`: for current PyPI release version across Action runs
- `[PACKAGE NAME]==[VERSION]`: for a fixed PyPI release version on every Action run

See the ["With custom settings" example](#with-custom-settings) above.

## Outputs

None

## License

[Apache License, v2.0](LICENSE)

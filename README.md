# py-actions/flake8 GitHub Action

[![Linux CI](https://github.com/py-actions/flake8/workflows/Linux%20CI/badge.svg)](https://github.com/py-actions/flake8/actions?query=workflow%3A%22Linux+CI%22)
[![macOS CI](https://github.com/py-actions/flake8/workflows/macOS%20CI/badge.svg)](https://github.com/py-actions/flake8/actions?query=workflow%3A%22macOS+CI%22)
[![Windows CI](https://github.com/py-actions/flake8/workflows/Windows%20CI/badge.svg)](https://github.com/py-actions/flake8/actions?query=workflow%3A%22Windows+CI%22)
[![Lint](https://github.com/py-actions/flake8/workflows/Lint/badge.svg)](https://github.com/py-actions/flake8/actions?query=workflow%3ALint)

This GitHub Action installs the Python [flake8 package](https://pypi.org/project/flake8/) and executes flake8 stylistic and logical linting of Python source files.  flake8 installation and execution defaults can be configured with optional Action settings.

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
        uses: actions/setup-python@v1
        with:
          python-version: "3.8"
      - name: flake8 Lint
        uses: py-actions/flake8@v1
```

### With non-default settings

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
        uses: actions/setup-python@v1
        with:
          python-version: "3.8"
      - name: flake8 Lint
        uses: py-actions/flake8@v1
        with:
          ignore: "F401"
          exclude: "src/ignoreme.py"
          max-line-length: "100"
          path: "src"
```

See the Inputs section below for details on the defaults and optional configuration settings.

## Inputs

Configure the Action with the following *optional* settings:

### `flake8-version`

**Optional** flake8 version for testing. Options: ['latest', 'master', '[VERSION NUMBER]'].Default = `"."`.

- 'latest' = current PyPI release version
- 'master' = current [GitLab source repository master branch version](https://gitlab.com/pycqa/flake8)
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

## Outputs

None

## License

[Apache License, v2.0](LICENSE)

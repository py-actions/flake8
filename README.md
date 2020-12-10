# py-actions/flake8 GitHub Action

![Version](https://img.shields.io/github/v/release/py-actions/flake8?sort=semver)
[![LICENSE](https://img.shields.io/badge/LICENSE-apache2-success)](https://github.com/rickstaa/action-flake8/blob/master/LICENSE)
[![Linux CI](https://github.com/py-actions/flake8/workflows/Linux%20CI/badge.svg)](https://github.com/py-actions/flake8/actions?query=workflow%3A%22Linux+CI%22)
[![macOS CI](https://github.com/py-actions/flake8/workflows/macOS%20CI/badge.svg)](https://github.com/py-actions/flake8/actions?query=workflow%3A%22macOS+CI%22)
[![Windows CI](https://github.com/py-actions/flake8/workflows/Windows%20CI/badge.svg)](https://github.com/py-actions/flake8/actions?query=workflow%3A%22Windows+CI%22)
[![Lint](https://github.com/py-actions/flake8/workflows/Lint/badge.svg)](https://github.com/py-actions/flake8/actions?query=workflow%3ALint)

This action runs flak8 with [reviewdog](https://github.com/reviewdog/reviewdog) on pull requests to lint to lint python source files while creating annotations. It does this by installing the Python [flake8 package](https://pypi.org/project/flake8/) in an environment with a Python interpreter and executes flake8 stylistic and logical linting of Python source files. Following [reviewdog](https://github.com/reviewdog/reviewdog) is used to parse the bash output into github annotations. Flake8 and reviewdog installation and execution defaults can be configured with optional Action settings.

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
        uses: rickstaa/flake8@v2
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
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
        uses: py-actions/flake8@v2
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          reporter: github-pr-check # Change reporter. (Only `github-pr-check` is supported at the moment).
          level: warning
          ignore: "F401"
          exclude: "src/ignoreme.py"
          max-line-length: "100"
          path: "src"
```

See the Inputs section below for details on the defaults and optional configuration settings.

## Inputs

Configure the Action with the following _optional_ settings:

### Flake8 options

#### `flake8-version`

**Optional** flake8 version for testing. Options: \['latest', 'master', '[VERSION NUMBER]'].Default = `"latest"`.

-   'latest' = current PyPI release version
-   'master' = current [GitLab source repository master branch version](https://gitlab.com/pycqa/flake8)
-   '[VERSION NUMBER]' = the version number of the [flake8 PyPI package](https://pypi.org/project/flake8/) (e.g., `"3.7.9"`)

#### `path`

**Optional** The path to the Python source file(s) or directory. Default = `"."`.

#### `args`

**Optional** Command line arguments to the flake8 executable. Default = None.

Please note that some command line arguments can be defined with other fields in your configuration.  You may combine the `args` setting with the other settings below, or use `args` to configure flake8 without the other Action settings.

See the inputs below for additional details.

#### `exclude`

**Optional** Comma-delimited list of ignored file paths. Default = flake8 default.

#### `ignore`

**Optional** Comma-delimited list of ignored flake8 rule codes. Default = flake8 default.

#### `max-line-length`

**Optional** Integer value (as string) representing maximum acceptable line length. Default = flake8 default.

#### `update-pip`

**Optional** Update `pip` before the flake8 install. Options: [`"true"`, `"false"`]. Default = `"false"`.

### Reviewdog options

#### `github_token`

**Required** Your github action token.

#### `level`

**Optional** The log level of the reviewdog reporter. Options: [`"info"`, `"warning"`, `"error"`]. Default = `"error"`.

#### `level`

**Optional** The log level of the reviewdog reporter. Options: [`"info"`, `"warning"`, `"error"`]. Default = `"error"`.

#### `reporter`

**Optional** The reviewdog reporter type. Only `github-pr-check` is supported at the moment. Default = `"github-pr-check"`.

## Outputs

None

## License

[Apache License, v2.0](LICENSE)

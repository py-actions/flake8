# Reviewdog/action-flake8 GitHub Action

[![reviewdog](https://github.com/reviewdog/action-flake8/workflows/reviewdog/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3Areviewdog)
[![depup](https://github.com/reviewdog/action-flake8/workflows/depup/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3Adepup)
[![release](https://github.com/reviewdog/action-flake8/workflows/release/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3Arelease)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/reviewdog/action-flake8?logo=github&sort=semver)](https://github.com/reviewdog/action-flake8/releases)
[![action-bumpr supported](https://img.shields.io/badge/bumpr-supported-ff69b4?logo=github&link=https://github.com/haya14busa/action-bumpr)](https://github.com/haya14busa/action-bumpr)
[![Linux CI](https://github.com/reviewdog/action-flake8/workflows/Linux%20CI/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3A%22Linux+CI%22)
[![MacOS CI](https://github.com/reviewdog/action-flake8/workflows/MacOS%20CI/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3A%22MacOS+CI%22)
[![Windows CI](https://github.com/reviewdog/action-flake8/workflows/Windows%20CI/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3A%22Windows+CI%22)

![github-pr-review example picture](https://user-images.githubusercontent.com/17570430/101988765-1d5b0080-3c9c-11eb-91c6-69b0e4846ba3.png)
![github-check example picture](https://user-images.githubusercontent.com/17570430/102074231-bd339e00-3e04-11eb-95be-42130b8a6754.png)

This action runs flake8 with [reviewdog](https://github.com/reviewdog/reviewdog) on pull requests to lint to lint python source files while creating annotations. It does this by installing the Python [flake8 package](https://pypi.org/project/flake8/) in an environment with a Python interpreter and executes flake8 stylistic and logical linting of Python source files. Following [reviewdog](https://github.com/reviewdog/reviewdog) is used to parse the bash output into github annotations. Flake8 and reviewdog installation and execution defaults can be configured with optional Action settings. This action is meant to be run inside a existing workflow and therefore does not does not install [python](https://www.python.org/) or setup a python environment.

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
        uses: reviewdog/action-flake8@v2
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
        uses: actions/setup-python@v2
        with:
          python-version: "3.8"
      - name: flake8 Lint
        uses: reviewdog/action-flake8@v2
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          reporter: github-pr-check
          level: warning
          ignore: "F401"
          exclude: "src/ignoreme.py"
          max_line_length: "100"
          path: "src"
```

See the Inputs section below for details on the defaults and optional configuration settings.

## Inputs

Configure the Action with the following _optional_ settings:

### Pip options

#### `update_pip`

**Optional**. Update `pip` before the flake8 install. Options: `[true, false]`. Defaults to `false`.

#### `install_deps`

**Optional**. Install the python project and dependencies (uses `setup.py`, `pyproject.toml` or `requirements.txt`) before the flake8 install. Options: `[true, false]`. Defaults to `false`.

#### `dev_install`

**Optional**. Install the project in editable `-e` mode (i.e.  [setuptools](https://pypi.org/project/setuptools/) 'develop mode'). Options: `[true, false]`. Defaults to `false`.

#### `req_file_path`

**Optional**. Path pointing to the requirements file. Defaults to `./requirements.txt`.

### Flake8 options

#### `flake8_version`

**Optional**. flake8 version for testing. Options: `[latest, master, <VERSION NUMBER>]`. Defaults to `latest`.

- `latest` = current PyPI release version
- `master` = current [GitLab source repository master branch version](https://gitlab.com/pycqa/flake8)
- `<VERSION NUMBER>` = the version number of the [flake8 PyPI package](https://pypi.org/project/flake8/) (e.g., `3.7.9`)

#### `path`

**Optional**. The path to the Python source file(s) or directory. Defaults to `"."`.

#### `args`

**Optional**. Command line arguments to the flake8 executable. Defaults to `None`.

Please note that some command line arguments can be defined with other fields in your configuration.  You may combine the `args` setting with the other settings below, or use `args` to configure flake8 without the other Action settings.

See the inputs below for additional details.

#### `exclude`

**Optional**. Comma-delimited list of ignored file paths. Defaults to flake8 defaults.

#### `ignore`

**Optional**. Comma-delimited list of ignored flake8 rule codes. Defaults to flake8 defaults.

#### `max_line_length`

**Optional**. Integer value (as string) representing maximum acceptable line length. Defaults to flake8 default.

### Reviewdog options

### `github_token`

**Required**. The [GITHUB_TOKEN](https://docs.github.com/en/free-pro-team@latest/actions/reference/authentication-in-a-workflow). Must be in form of `github_token: ${{ secrets.github_token }}`. Defaults to `${{ github.token }}`.

#### `level`

**Optional**. The log level of the reviewdog reporter. Options: `[info, warning, error]`. Defaults to `error`.

#### `reporter`

**Optional**. Reporter of reviewdog command `[github-pr-check, github-pr-review, github-check]`. Defaults to `github-pr-check`.

#### `filter_mode`

**Optional**. Filtering mode for the reviewdog command `[added, diff_context, file, nofilter]`. Defaults to `added`.

#### `fail_on_error`

**Optional**. Exit code for reviewdog when errors are found `[true, false]`. Defaults to `false`.

#### `reviewdog_flags`

**Optional**. Additional reviewdog flags. Defaults to `""`.

#### `tool_name`

**Optional**. Tool name to use for reviewdog reporter. Defaults to `flake8`.

## Acknowledgement

:rocket: This github action was based on the [flake8 action](https://github.com/marketplace/actions/python-flake8-lint) of [py-actions](https://github.com/py-actions) organization.

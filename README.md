# Reviewdog/action-flake8 composite GitHub Action

[![Test](https://github.com/reviewdog/action-flake8/workflows/Test/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3ATest)
[![reviewdog](https://github.com/reviewdog/action-flake8/workflows/reviewdog/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3Areviewdog)
[![depup](https://github.com/reviewdog/action-flake8/workflows/depup/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3Adepup)
[![release](https://github.com/reviewdog/action-flake8/workflows/release/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3Arelease)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/reviewdog/action-flake8?logo=github\&sort=semver)](https://github.com/reviewdog/action-flake8/releases)
[![action-bumpr supported](https://img.shields.io/badge/bumpr-supported-ff69b4?logo=github\&link=https://github.com/haya14busa/action-bumpr)](https://github.com/haya14busa/action-bumpr)

![github-pr-review example picture](https://user-images.githubusercontent.com/17570430/101988765-1d5b0080-3c9c-11eb-91c6-69b0e4846ba3.png)
![github-check example picture](https://user-images.githubusercontent.com/17570430/102074231-bd339e00-3e04-11eb-95be-42130b8a6754.png)

This composite action runs [flake8](https://pypi.org/project/flake8/) with [reviewdog](https://github.com/reviewdog/reviewdog) on pull requests to lint to lint python source files while creating annotations. It does this by installing the Python [flake8 package](https://pypi.org/project/flake8/) in an environment with a Python interpreter and executes flake8 stylistic and logical linting of Python source files. Following [reviewdog](https://github.com/reviewdog/reviewdog) is used to parse the bash output into GitHub annotations. This (composite) action is meant to be run inside an existing workflow and therefore, does not install [python](https://www.python.org/) or set up a python environment.

## Quick Start

In it's simplest form this action can be used to annotate the changes that are suggested by the [flake8](https://flake8.pycqa.org/en/latest/) linter.

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

See the Inputs section below for details on the defaults and optional configuration settings.

## Inputs

### `github_token`

**Required**. The [GITHUB_TOKEN](https://docs.github.com/en/free-pro-team@latest/actions/reference/authentication-in-a-workflow). Must be in form of `github_token: ${{ secrets.github_token }}`. Defaults to `${{ github.token }}`.

### `workdir`

**Optional**. The directory to run flake8 in. Defaults to `.`.

#### `flake8_args`

**Optional**. Command-line arguments to the flake8 executable. Defaults to `""`.

Please note that some command-line arguments can be defined with other fields in your configuration.  You may combine the `args` setting with the other settings below, or use `args` to configure flake8 without the other Action settings.

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

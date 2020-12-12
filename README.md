# reviewdog/action-flake8 GitHub Action

![Version](https://img.shields.io/github/v/release/reviewdog/action-flake8?sort=semver)
[![Test](https://github.com/reviewdog/action-flake8/workflows/Test/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3ATest)
[![reviewdog](https://github.com/reviewdog/action-flake8/workflows/reviewdog/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3Areviewdog)
[![depup](https://github.com/reviewdog/action-flake8/workflows/depup/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3Adepup)
[![release](https://github.com/reviewdog/action-flake8/workflows/release/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3Arelease)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/reviewdog/action-flake8?logo=github&sort=semver)](https://github.com/reviewdog/action-flake8/releases)
[![action-bumpr supported](https://img.shields.io/badge/bumpr-supported-ff69b4?logo=github&link=https://github.com/haya14busa/action-bumpr)](https://github.com/haya14busa/action-bumpr)
[![Linux CI](https://github.com/reviewdog/action-flake8/workflows/Linux%20CI/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3A%22Linux+CI%22)
[![macOS CI](https://github.com/reviewdog/action-flake8/workflows/macOS%20CI/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3A%22macOS+CI%22)
[![Windows CI](https://github.com/reviewdog/action-flake8/workflows/Windows%20CI/badge.svg)](https://github.com/reviewdog/action-flake8/actions?query=workflow%3A%22Windows+CI%22)

![action example picture](https://user-images.githubusercontent.com/17570430/101988765-1d5b0080-3c9c-11eb-91c6-69b0e4846ba3.png)

This action runs flake8 with [reviewdog](https://github.com/reviewdog/reviewdog) on pull requests to lint to lint python source files while creating annotations. It does this by installing the Python [flake8 package](https://pypi.org/project/flake8/) in an environment with a Python interpreter and executes flake8 stylistic and logical linting of Python source files. Following [reviewdog](https://github.com/reviewdog/reviewdog) is used to parse the bash output into github annotations. Flake8 and reviewdog installation and execution defaults can be configured with optional Action settings.

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
        uses: reviewdog/flake8@v2
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

**Optional** Update `pip` before the flake8 install. Options: [`"true"`, `"false"`]. Default = `"false"`.

#### `install_deps`

**Optional** Install the python project and dependencies (uses setup.py, pyproject.toml or requirements.txt) before the flake8 install. Options: [`"true"`, `"false"`]. Default = `"false"`.

#### `dev_install`

**Optional** Install the project in editable `-e` mode (i.e.  setuptools 'develop mode'). Options: [`"true"`, `"false"`]. Default = `"false"`.

#### `req_file_path`

**Optional** Path pointing to the requirements file. Default = `"./requirements.txt"`.

### Flake8 options

#### `flake8_version`

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

#### `max_line_length`

**Optional** Integer value (as string) representing maximum acceptable line length. Default = flake8 default.

### Reviewdog options

#### `github_token`

**Required** The automatically created secret github action token (supply as '${{ secrets.GITHUB_TOKEN }}'').

#### `level`

**Optional** The log level of the reviewdog reporter. Options: [`"info"`, `"warning"`, `"error"`]. Default = `"error"`.

#### `reporter`

**Optional** The reviewdog reporter type. Only `github-pr-check` is supported at the moment. Default = `"github-pr-check"`.

#### `filter_mode`

**Optional** Filtering mode for the reviewdog command [added, diff_context, file, nofilter]. Default = `"added"`.

#### `fail_on_error`

**Optional** Exit code for reviewdog when errors are found [`true`, `false`]. Default = `false`.

#### `reviewdog_flags`

**Optional** Additional reviewdog flags. Default = `""`.

#### `tool_name`

**Optional** Tool name to use for reviewdog reporter. Default = `flake8`.

## Outputs

None

## Development

### Release

#### [haya14busa/action-bumpr](https://github.com/haya14busa/action-bumpr)

You can bump version on merging Pull Requests with specific labels (bump:major,bump:minor,bump:patch).
Pushing tag manually by yourself also work.

#### [haya14busa/action-update-semver](https://github.com/haya14busa/action-update-semver)

This action updates major/minor release tags on a tag push. e.g. Update v1 and v1.2 tag when released v1.2.3.
ref: <https://help.github.com/en/articles/about-actions#versioning-your-action>

### Lint - reviewdog integration

This reviewdog action template itself is integrated with reviewdog to run lints
which is useful for Docker container based actions.

![reviewdog integration](https://user-images.githubusercontent.com/3797062/72735107-7fbb9600-3bde-11ea-8087-12af76e7ee6f.png)

Supported linters:

-   [reviewdog/action-shellcheck](https://github.com/reviewdog/action-shellcheck)
-   [reviewdog/action-hadolint](https://github.com/reviewdog/action-hadolint)
-   [reviewdog/action-misspell](https://github.com/reviewdog/action-misspell)

### Dependencies Update Automation

This repository uses [haya14busa/action-depup](https://github.com/haya14busa/action-depup) to update
reviewdog version.

[![reviewdog depup demo](https://user-images.githubusercontent.com/3797062/73154254-170e7500-411a-11ea-8211-912e9de7c936.png)](https://github.com/reviewdog/action-flake8/pull/6)

## Acknowledgement

:rocket: This github action was based on the [flake8 action](https://github.com/marketplace/actions/python-flake8-lint) of [py-actions](https://github.com/py-actions) organization.

## License

[Apache License, v2.0](LICENSE)

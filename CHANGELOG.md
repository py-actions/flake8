# Changelog

## v2.3.0

- update the GitHub Action to use node 20 environment from node 16 environment (addresses GitHub Actions node 16 deprecation warnings)
- add cPython 3.12.x interpreter testing support
- drop cPython 3.8.x interpreter testing support (may work, no longer tested)
- development dependency updates

## v2.2.1

- add cPython 3.11.x environment support
- drop cPython 3.7.x environment support (may still function, but will no longer be included in tests)
- dependency updates
- update CodeQL scanning configuration

## v2.2.0

- Add support for flake8 plugin installation prior to flake8 execution
- Add new `plugins` input field that accepts a space-delimited list of flake8 plugin packages
- Remove Windows-specific CI environment pip installation workaround that was required to temporarily address #139 pip bug

## v2.1.0

- Move remote git repository for flake8 default source branch installs to https://github.com/PyCQA/flake8.git (from GitLab)
- Add new `main` branch definition option for the flake8-version input field.  Both "main" and "master" now result in the installation of flake8 from the latest commit in the main branch of the new GitHub repository (see above)
- Update npm commands in Makefile update and dev-update targets
- Execute the GitHub Action in a node16 environment (from node12)
- Execute eslint lint tests in a node16 environment (from node12)
- update @actions/core to ^1.9.0
- update @actions/exec to ^1.1.1
- update eslint-config-airbnb-base to ^15.0.0
- update eslint-plugin-import to ^2.26.0
- update eslint-plugin-promise to ^6.0.0
- update eslint-plugin-react to ^7.30.0
- update jest to ^28.1.1

## v2.0.0

- Remove cPython 3.6 GitHub Actions test runner support (all platforms)
- Add cPython 3.10 GitHub Actions test runner support (all platforms)
- update eslint-plugin-import to ^2.25.3
- update eslint-plugin-jsx-a11y to ^6.5.1
- update eslint-plugin-react to ^7.27.1
- update jest to ^27.4.5

## v1.2.0

- Fix: remove custom error string "ERROR: Action failed during execution with error: " in non-zero exit status code reporting.  This was not semantically correct when flake8 raises a non-zero exit code for failed lints
- add cPython 3.10 interpreter CI testing
- update @actions/core dependency to v1.6.0
- update @actions/exec dependency to v1.1.0
- update eslint-plugin-import dependency to v2.25.2
- update eslint-plugin-prettier dependency to v3.4.1
- update eslint-plugin-promise depenency to v4.3.1
- update eslint-plugin-react dependency to v7.26.1
- update jest dependency to v27.3.1

## v1.1.0

- add cPython 3.9 interpreter CI testing
- add daily cron schedule CI testing
- update @actions/core dependency to v1.2.6
- update @zeit/ncc dependency to v0.22.3
- update eslint-config-airbnb-base dependency to v14.2.1
- update estlint-plugin-import dependency to v2.22.1
- update eslint-plugin-jsx-a11y dependency to v6.4.1
- update eslint-plugin-prettier dependency to v3.1.4
- update eslint-plugin-react dependency to v7.21.5
- update jest dependency to v26.6.3

## v1.0.1

Auto-updated during Action execution when you use the `v1` action tag

- Fix typo in README documentation description of `flake8-version` default setting.

## v1.0.0

Auto-updated during Action execution when you use the `v1` action tag

- Initial release

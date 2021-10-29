# Changelog

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

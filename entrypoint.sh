#!/bin/sh
set -eu # Increase bash strictness

if [[ -n "${GITHUB_WORKSPACE}" ]]; then
  cd "${GITHUB_WORKSPACE}/${INPUT_WORKDIR}" || exit
fi

export REVIEWDOG_GITHUB_API_TOKEN="${INPUT_GITHUB_TOKEN}"

export REVIEWDOG_VERSION=v0.11.0-nightly20210104+207b245

echo "[action-flake8] Installing reviewdog..."
wget -O - -q https://raw.githubusercontent.com/reviewdog/nightly/master/install.sh | sh -s -- -b /tmp/ "${REVIEWDOG_VERSION}"

if [[ "$(which flake8)" == "" ]]; then
  echo "[action-flake8] Installing flake8 package..."
  python -m pip install --upgrade flake8
  echo "[action-flake8] Flake8 version:"
  flake8 --version
fi

# NOTE: Used for debugging
if [[ "$#" -eq 0 && "${INPUT_FLAKE8_ARGS}" != "" ]]; then
  flake8_args=(${INPUT_FLAKE8_ARGS})
elif [[ "$#" -ne 0 && "${INPUT_FLAKE8_ARGS}" != "" ]]; then
  flake8_args=($* ${INPUT_FLAKE8_ARGS})
elif [[ "$#" -ne 0 && "${INPUT_FLAKE8_ARGS}" == "" ]]; then
  flake8_args=($*)
fi

# NOTE: ${VAR,,} Is bash 4.0 syntax to make strings lowercase.
echo "[action-flake8] Checking python code with the flake8 linter and reviewdog..."
flake8 . ${flake8_args[@]} 2>&1 | # Removes ansi codes see https://github.com/reviewdog/errorformat/issues/51
  /tmp/reviewdog -f=flake8 \
    -name="${INPUT_TOOL_NAME}" \
    -reporter="${INPUT_REPORTER,,}" \
    -filter-mode="${INPUT_FILTER_MODE,,}" \
    -fail-on-error="${INPUT_FAIL_ON_ERROR,,}" \
    -level="${INPUT_LEVEL,,}" \
    -tee \
    ${INPUT_REVIEWDOG_FLAGS}

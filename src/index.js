const core = require("@actions/core");
const exec = require("@actions/exec");
const fs = require("fs");
const os = require("os");

const REVIEWDOG_VERSION = "v0.11.0-nightly20201208+12faa31"; // Current version of reviewdog

async function run() {
  const sourcePath = core.getInput("path");
  // const updatePip = core.getInput("update_pip");
  const updatePip = "true";
  const ignoreRuleCodes = core.getInput("ignore");
  const excludePaths = core.getInput("exclude");
  const maxLineLength = core.getInput("max_line_length");
  const flake8Args = core.getInput("args");
  // const flake8Version = core.getInput("flake8_version");
  const flake8Version = "master";
  const installDeps = core.getInput("install_deps");
  const devInstall = core.getInput("dev_install");
  const reqFilePath = core.getInput("req_file_path");

  const githubToken = core.getInput("github_token");
  const level = core.getInput("level");
  const reporter = core.getInput("reporter");

  // ====================
  // Install dependencies
  // ====================
  try {
    // update pip
    if (updatePip === "true") {
      console.log("[*] Updating pip package...");
      await exec.exec("python -m pip install --upgrade pip");
    }

    const platform = os.type();
    console.log(platform);

    // install Reviewdog (nightly)
    console.log(`[*] Installing reviewdog...`);
    if (os.type() === "Windows_NT") {
      const semver = REVIEWDOG_VERSION.substring(1);
      const downloadUrl = `https://github.com/reviewdog/nightly/releases/download/${REVIEWDOG_VERSION}/reviewdog_${semver}_Windows_x86_64.tar.gz`;
      await exec.exec(`curl -LJ ${downloadUrl} -o reviewdog.tar.gz`); // /bin/bash -c is needed since @actions/exec does not yet support piping https://github.com/actions/toolkit/issues/359
      await exec.exec("tar -xvzf reviewdog.tar.gz"); // /bin/bash -c is needed since @actions/exec does not yet support piping https://github.com/actions/toolkit/issues/359
    } else {
      await exec.exec(
        `/bin/bash -c "wget -O - -q https://raw.githubusercontent.com/reviewdog/nightly/master/install.sh| sudo sh -s -- -b /usr/local/bin/ ${REVIEWDOG_VERSION}`
      ); // /bin/bash -c is needed since @actions/exec does not yet support piping https://github.com/actions/toolkit/issues/359
    }

    // install dependencies if user requested this
    if (installDeps !== "none" && installDeps) {
      let devArg = "";
      if (devInstall !== "none" && devInstall) {
        devArg = "-e";
      }
      let reqFilePathArg = "requirements.txt";
      if (reqFilePath !== "none") {
        reqFilePathArg = reqFilePath;
      }
      try {
        if (fs.existsSync("setup.py")) {
          console.log(`[*] Installing python package and dependencies...`);
          await exec.exec(`python -m pip install ${devArg} .`);
        } else if (fs.existsSync("requirements.txt")) {
          console.log(`[*] Installing package dependencies...`);
          await exec.exec(`python -m pip install -r ${reqFilePathArg}`);
        } else {
          console.log(
            `[*] Installing package dependencies failed as no 'setup.py' or 'requirements.txt' was found.`
          );
        }
      } catch (error) {
        console.log(`[*] Installing package dependencies failed.`);
      }
    }

    // install/update flake8 package
    console.log(`[*] Installing flake8 package @ ${flake8Version}...`);
    if (flake8Version === "latest") {
      await exec.exec("python -m pip install --upgrade flake8");
    } else if (flake8Version === "master") {
      await exec.exec(
        "python -m pip install --upgrade git+https://gitlab.com/pycqa/flake8.git"
      );
    } else {
      await exec.exec(
        `python -m pip install --upgrade flake8==${flake8Version}`
      );
    }
    // show installed flake8 version that will be used during the tests
    console.log("[*] Installed flake8 package version:");
    await exec.exec("flake8 --version");

    // prep flake8 command for execution
    let flake8Cmd = "flake8";
    if (ignoreRuleCodes !== "none") {
      flake8Cmd += ` --ignore ${ignoreRuleCodes}`;
    }
    if (excludePaths !== "none") {
      flake8Cmd += ` --exclude ${excludePaths}`;
    }
    if (maxLineLength !== "none") {
      flake8Cmd += ` --max-line-length ${maxLineLength}`;
    }
    if (flake8Args !== "none") {
      flake8Cmd += ` ${flake8Args}`;
    }
    // concatenate test path
    flake8Cmd += ` ${sourcePath}`;

    // Validate reviewdog input arguments
    let reporterArg = "github-pr-check";
    if (reporter !== "None") {
      reporterArg = reporter;
    }
    let levelArg = "error";
    if (level !== "None") {
      levelArg = level;
    }

    // setup reviewdog execution command
    console.log(`[*] Adding reviewdog command...`);
    const reviewdogCmd = `reviewdog -f flake8 -name="flake8-lint" -reporter="${reporterArg}" -level="${levelArg}" -tee`;

    // execute flake8 with reviewdog annotations
    console.log(`[*] Executing flake8 + reviewdog command...`);
    if (os.type() === "Windows_NT") {
      await exec.exec(
        `set REVIEWDOG_GITHUB_API_TOKEN=${githubToken}; ${flake8Cmd}|${reviewdogCmd}`
      );
    } else {
      await exec.exec(
        `/bin/bash -c "export REVIEWDOG_GITHUB_API_TOKEN=${githubToken}; ${flake8Cmd}|${reviewdogCmd}"`
      );
    }
  } catch (error) {
    core.setFailed(
      `ERROR: Action failed during execution with error: ${error.message}`
    );
  }
}

run();

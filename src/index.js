const core = require("@actions/core");
const exec = require("@actions/exec");

async function run() {
  const sourcePath = core.getInput("path");
  const updatePip = core.getInput("update-pip");
  const ignoreRuleCodes = core.getInput("ignore");
  const excludePaths = core.getInput("exclude");
  const maxLineLength = core.getInput("max-line-length");
  const flake8Args = core.getInput("args");
  const flake8Version = core.getInput("flake8-version");

  // ====================
  // Install dependencies
  // ====================
  try {
    // update pip
    if (updatePip === "true") {
      console.log("[*] Updating pip package...");
      await exec.exec("python -m pip install --upgrade pip");
    }

    // install/update flake8 package
    console.log(`[*] Installing flake8 package @ ${flake8Version}...`);
    if (flake8Version === "latest") {
      await exec.exec("python -m pip install --upgrade flake8");
    } else if (flake8Version === "main") {
      await exec.exec(
        "python -m pip install --upgrade git+https://github.com/PyCQA/flake8.git"
      );
    } else if (flake8Version === "master") {
      await exec.exec(
        "python -m pip install --upgrade git+https://github.com/PyCQA/flake8.git"
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

    // execute flake8
    await exec.exec(`${flake8Cmd}`);
  } catch (error) {
    core.setFailed(`${error.message}`);
  }
}

run();

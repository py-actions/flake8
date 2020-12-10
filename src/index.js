const core = require("@actions/core");
const exec = require("@actions/exec");

async function run() {
  const sourcePath = core.getInput("path");
  const updatePip = core.getInput("update-pip");
  const ignoreRuleCodes = core.getInput("ignore");
  const excludePaths = core.getInput("exclude");
  const maxLineLength = core.getInput("max-line-length");
  const flake8Args = core.getInput("args");
  // const flake8Version = core.getInput("flake8-version");
  const flake8Version = "latest";

  const github_token = core.getInput("github_token");
  const level = core.getInput("level");
  let reporter = core.getInput("reporter");
  reporter = "github-pr-review";

  // ====================
  // Install dependencies
  // ====================
  try {
    // update pip
    if (updatePip === "true") {
      console.log("[*] Updating pip package...");
      await exec.exec("python -m pip install --upgrade pip");
    }

    // install reviewdog
    await exec.exec(
      "wget -sfL https://raw.githubusercontent.com/reviewdog/nightly/master/install.sh| sh -s -- -b /usr/local/bin/"
    );

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

    // Export github token
    process.env["REVIEWDOG_GITHUB_API_TOKEN"] = github_token;

    // Validate reviewdog input arguments
    if (reporter === "github-pr-review") {
      throw new Error("github-pr-review unsupported (for now)");
    }
    if ((reporter === "None") | (reporter === "")) {
      reporter = "github-pr-check";
    }
    if ((level === "None") | (reporter === "")) {
      level = "error";
    }

    // Add reviewdog execution code
    flake8Cmd += `| reviewdog -f flake8 -name="flake8-lint" -reporter="${reporter}" -level="${level}" -tee`;

    // execute flake8
    await exec.exec(`${flake8Cmd}`);
  } catch (error) {
    core.setFailed(
      `ERROR: Action failed during execution with error: ${error.message}`
    );
  }
}

run();

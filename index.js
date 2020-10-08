const github = require("@actions/github");
const core = require("@actions/core");

(() => {
  try {
    const { payload } = github.context;
    const labelNameToWatchFor = core.getInput("label-name-to-watch-for");

    let prHasLabel = false;
    payload.pull_request.labels.forEach((label) => {
      if (label.name === labelNameToWatchFor) {
        prHasLabel = true;
      }
    });

    if (prHasLabel) {
      // do nothing, a run that goes to completion without catching is considered success in GH actions
      console.log(
        "The PR is labeled by the label we care about::: ",
        labelNameToWatchFor
      );
      return;
    } else {
      core.setFailed(
        "The PR is not labeled with the label we care about::: ",
        labelNameToWatchFor
      );
    }
  } catch (error) {
    core.setFailed(
      "Yea, this didn't work like we thought it would. Fix the action or just give up."
    );
  }
})();

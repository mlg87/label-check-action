const github = require("@actions/github");
const core = require("@actions/core");

(() => {
  try {
    const { payload } = github.context;
    const labelToWatchFor = core.getInput("label");

    console.log("payload.pull_request", payload.pull_request);
    console.log("labelToWatchFor", labelToWatchFor);

    if (payload.pull_request.labels.includes(labelToWatchFor)) {
      // do nothing, a run that goes to completion without catching is considered success in GH actions
      console.log(
        "The PR is labeled by the label we care about::: ",
        labelToWatchFor
      );
      return;
    } else {
      core.setFailed(
        "The PR is not labeled with the label we care about::: ",
        labelToWatchFor
      );
    }
  } catch (error) {
    core.setFailed(
      "Yea, this didn't work like we thought it would. Fix the action or just give up."
    );
  }
})();

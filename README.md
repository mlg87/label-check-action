# Label Check Action

This is a simple action that passes/fails if a PR has a given label on it. We use it on our team to track which reviewer has manually QA'd the PR app.

## Adding the action to your project

In your `./github/workflows` directory, add a `labelCheck.yml` (or whatever the hell you want to call it) file. Add the following as contents:

```yml
name: Label Check
on:
  pull_request:
    types: [opened, labeled, unlabeled, synchronize]

jobs:
  manual-qa-check:
    runs-on: ubuntu-latest
    name: Label Check
    steps:
      - name: Label Check
        id: label-check
        uses: mlg87/label-check-action@v1.0.0
        with:
          label-name-to-watch-for: "enhancement"
```

## Action inputs

| Input                     | Description                                                                                                                                   | Required | Type     | Default |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ------- |
| `label-name-to-watch-for` | Could we have taken an `id`? Sure. Is that necessary? No. Just pass the label name you want to watch for (case sensitive). e.g. `enhancement` | `true`   | `String` | n/a     |

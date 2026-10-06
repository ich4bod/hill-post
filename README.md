# Hill Post

Planned URL: https://hill-post.ichabod-crane.net/

Data is disposable; the puzzle stores nothing.

## Tests

```sh
node tools/planner-engine.mjs
node tools/planner-engine.mjs facts
NODE_PATH=/home/ichabod/apps/cad/.verify/node_modules node tools/planner-browser.cjs https://hill-post.ichabod-crane.net/
```

## Run

```sh
docker compose up -d --build
```

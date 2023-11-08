#!/bin/bash

npm run -- gulp clean
npm run -- gulp generate-ruff-compiler
npm run -- gulp build-ruff-compiler
npm run -- gulp generate-ruff
npm run -- gulp build-ruff

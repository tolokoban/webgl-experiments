#!/bin/bash

cd www
git add . -A
git commit -am "Publish"
git push
cd ..

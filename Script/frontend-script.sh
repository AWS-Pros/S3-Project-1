#!/bin/bash

cd ..

cd client

npm install 

npm run build 

aws s3 rm s3://frontend-bucket-22 --recursive

aws s3 sync out/ s3://frontend-bucket-22 --delete



#!/bin/bash
echo -e "Current Version: "$(git log -1 --pretty=%B HEAD)"" > workflow.txt
echo -e "$(date +"%Y-%m-%d %H:%M:%S")\n\n........Enum Changes..........\n\n" >> workflow.txt
git diff HEAD~3 -- HEAD -z ./backend/carbon-services-lib/src/shared/enum** >> workflow.txt
echo -e "\n\n........Config Changes..........\n\n" >> workflow.txt
git diff HEAD~3 -- HEAD -z ./backend/carbon-services-lib/src/shared/configuration.ts >> workflow.txt

timestamp=$(date "+%Y-%m-%d_%H-%M-%S")
aws s3 cp workflow.txt s3://$AWS_BUCKET/workflow_txts_${timestamp}.txt
CONTENT=$(base64 -w 0 workflow.txt)
              
RAW_MESSAGE="From: $FROM_EMAIL
To: $TO_EMAILS
Subject: Libraries Changes
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary=NextPart

--NextPart
Content-Type: text/html

Please find the attachment for latest changes.

--NextPart
Content-Type: text/plain; name=workflow.txt
Content-Transfer-Encoding: base64
Content-Disposition: attachment

$CONTENT

--NextPart--"

ENCODED_MESSAGE=$(echo -n "$RAW_MESSAGE" | base64)
aws ses send-raw-email --raw-message "Data=$ENCODED_MESSAGE" 

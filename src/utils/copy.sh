###
# @Author: ADI
# @Date: 2021-03-13 11:05:20
# @LastEditors: ADI
# @LastEditTime: 2021-03-13 11:45:42
# Use:
#   crontab -e
#   constent: * 0 * * * sh /Users/zstop/Documents/job/Demo/node-blog/src/utils/copy.sh
###
#!/bin/sh
cd /Users/zstop/Documents/job/Demo/node-blog/logs
cp access.log $(date "+%Y-%m-%d").access.log
echo "" >access.log

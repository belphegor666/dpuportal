#!/bin/bash

if [ -z ${app_conf_file+x} ]; then
    echo "app_conf_file not set"
    bash testsetup/target/universal/stage/bin/testsetup -Dhttp.port=9001
else
    echo "app_conf_file set to " ${app_conf_file}
    bash testsetup/target/universal/stage/bin/testsetup -Dhttp.port=9001 -Dconfig.resource=${app_conf_file}
fi

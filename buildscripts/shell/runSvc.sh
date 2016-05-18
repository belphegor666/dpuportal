#!/bin/bash

if [ -z ${app_conf_file+x} ]; then
    echo "app_conf_file not set"
    bash svc/target/universal/stage/bin/svc -Dhttp.port=9000
else
    echo "app_conf_file set to " ${app_conf_file}
    bash svc/target/universal/stage/bin/svc -Dhttp.port=9000 -Dconfig.resource=${app_conf_file}
fi



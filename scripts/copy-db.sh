#!/bin/sh

ANDROID_WWW=android/app/src/main/assets/www
lc=$(find -d . -name "android" -maxdepth 1 | wc -l | awk '{print $1}')

if [ ${lc} -gt 0 ]; then
    mkdir -p ${ANDROID_WWW}
    cp resources/sifac-profile-viewer.db ${ANDROID_WWW}

    echo "copyied db to ${ANDROID_WWW}"
fi

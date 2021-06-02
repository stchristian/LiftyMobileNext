# Lifty 

The prototype car sharing application for commuters.

Currently only Android is supported.
## Initial setup
Android versions
- Android SDK Platform 29 with Intel x86 Atom_64 System Image
- Android SDK Build tools 29.0.2
- .bashrc
```
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Watchman v2021.05.10.00

React native 5.0.1-alpha.2

Node 12.22.1

## Firebase settings

[@react-native-firebase/app](https://rnfirebase.io/)

1. Added Android app to the firebase project.
2. `google-services.json` is a file provided by Firebase, should be present in android/app/
3. include `classpath 'com.google.gms:google-services:4.3.8'` in android/build.gradle
4. include
```
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services' // <- Add this line
```
in android/app/build.gradle

### Firebase authentication

via [@react-native-firebase/auth](https://rnfirebase.io/auth/usage)

## TODO 

Extend Button
- OUTLINE type
- SMALL size

Finish AddRide

- add icons from figma

Uniform Color system

- marker can be replaced with image
- waypoints
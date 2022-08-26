# App Center Setup

## Download APK
[Click here](https://install.appcenter.ms/users/andrefangeloni/apps/mb-talk-android/distribution_groups/mb%20talk)

## Requirements
- [React Native CLI](https://reactnative.dev/docs/environment-setup) </br>

- [Yarn](https://yarnpkg.com) </br>

- Sign Up on [App Center](https://appcenter.ms/) and create a new App.

## How to use this repo
- Clone this repo: `git@github.com:andrefangeloni/mb-talk-app-center.git`;
- Navigate to the downloaded folder and then run `yarn` on terminal to install dependencies;
- Install Pods: `cd ios && pod install && cd ..` (iOS only);
- Rename `env-template.json` to `env.json` and paste your `API_KEY` generated on [TMDB](https://www.themoviedb.org/settings/api);
- Follow the instructions below, generate your own api's keys and paste on the respective files.
### Installation
- Open terminal and run `npm install -g appcenter-cli`
- Run `appcenter login`. This opens a browser and generates a new <b>API token</b>. </br>
- Copy the <b>API token</b> from the browser, and paste this into terminal.

## Adding dependencies on your project
`yarn add appcenter appcenter-analytics appcenter-crashes react-native-code-push`

## Getting Started
Reference: [Visual Studio App Center](https://docs.microsoft.com/en-us/appcenter/sdk/getting-started/react-native)

## Android:

1 - Create a new file with the name <b>appcenter-config.json</b> in `android/app/src/main/assets/` with the following content and replace {APP_SECRET_VALUE} with your app secret value.

```json
{
  "app_secret": "{APP_SECRET_VALUE}"
}
```

<b>Note:</b> If the folder named assets doesn't exist, it should be created under `project_root/android/app/src/main/assets`

2 - In your `android/settings.gradle` file, make the following additions: </br>
PS: The following two lines must be at the end of file or otherwise the app won't build

```java
rootProject.name = 'app_name'
...
include ':app', ':react-native-code-push'
project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')
```

3 - In your `android/app/build.gradle` file, add the <b>codepush.gradle</b>

```java
...
apply from: "../../node_modules/react-native/react.gradle"
apply from: "../../node_modules/react-native-code-push/android/codepush.gradle"
...
```

4 - Update the `MainApplication.java` file to use CodePush via the following changes:

```java
...
// 4.1 - Import the plugin class.
import com.microsoft.codepush.react.CodePush;

public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    ...
    // 4.2 - Add the getJSBundleFile method to let the CodePush runtime 
    // determine where to get the JS bundle location from on each app start
    ...
    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }
  };
}
```

5 - Go to [AppCenter](https://appcenter.ms/apps) > Choose your App > Distribute > CodePush > Set to Production. 

6 - Open the terminal and run `appcenter apps list` to check the `<ownerName>/<appName>` </br>
6.1 - Run `appcenter codepush deployment list -a <ownerName>/<appName> -k` </br>
6.2 - Copy the <b>Production</b> Deployment Key </br>

7 - Modify the app's `res/values/strings.xml` to include the following lines:

```xml
<resources>
  <string name="app_name">{app_name}</string>
  <string moduleConfig="true" name="CodePushDeploymentKey">{DeploymentKey}</string>
  <string
    moduleConfig="true"
    translatable="false"
    name="appCenterCrashes_whenToSendCrashes"
  >
    DO_NOT_ASK_JAVASCRIPT
  </string>
  <string
    moduleConfig="true"
    translatable="false"
    name="appCenterAnalytics_whenToEnableAnalytics"
  >
    ALWAYS_SEND
  </string>
</resources>
```

## iOS:

1 - Open terminal and run `cd ios && pod install && cd ..` </br>
2 - Create a new file with the name <b>AppCenter-Config.plist</b> in `ios/<app_name>/` with the following content and replace {APP_SECRET_VALUE} with your app secret value.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "https://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
  <key>AppSecret</key>
  <string>{APP_SECRET_VALUE}</string>
  </dict>
</plist>
```

3 - Add the following content on <b>AppDelegate.m</b>
```objc
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>
#import <CodePush/CodePush.h>
```

3.1 - Add these lines to the <b>didFinishLaunchingWithOptions</b> method

```swift
[AppCenterReactNative register];
[AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
[AppCenterReactNativeCrashes registerWithAutomaticProcessing];
```

3.2 - Replace <i>else</i> condition:

from:

```swift
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  #if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  #else
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif
}
```

to:

```swift
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  #if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  #else
    return [CodePush bundleURL];
  #endif
}
```

4 - Open the terminal and run `appcenter apps list` to check the `<ownerName>/<appName>` </br>
4.1 - Run `appcenter codepush deployment list -a <ownerName>/<appName> -k` </br>
4.2 - Copy the <b>Production</b> Deployment Key </br>

5 - Open `Info.plist` file, add new entry named <b>CodePushDeploymentKey</b> and paste the value.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
...
<key>CodePushDeploymentKey</key>
<string>{DeploymentKey}</string>
</dict>
```

## CodePush Setup

- Add CodePush frequency on App file:

```js
import React from 'react';
import { Text } from 'react-native';
import CodePush from 'react-native-code-push';

const App = () => <Text>Hello AppCenter</Text>;

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
})(App);

```

## CodePush Usage
- Run on terminal: `appcenter codepush release-react -a <owner>/<project_name> -m -d Production`

# :mortar_board: LICENSE

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

# Author

- 👨🏻‍💻 LinkedIn: [André Angeloni](https://www.linkedin.com/in/andre-angeloni)
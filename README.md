# App Center Setup

## Requirements
[React Native CLI](https://reactnative.dev/docs/environment-setup) </br>

### Installation
Open terminal and run `npm install -g appcenter-cli`

### Logging in
1 - Open terminal. </br>
2 - Run `appcenter login`. This opens a browser and generates a new <b>API token</b>. </br>
3- Copy the <b>API token</b> from the browser, and paste this into terminal.

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

2 - In your `android/settings.gradle` file, make the following additions:

```java
project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')
include ':app', ':react-native-code-push'
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
        // 4.2 - Override the getJSBundleFile method to let
        // the CodePush runtime determine where to get the JS
        // bundle location from on each app start
        ...
        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }
    };
}
```

5 - Open terminal and run `appcenter codepush deployment list -a <ownerName>/<appName> -k` </br>
5.1 - Copy the <b>Production</b> Deployment Key </br>

6 - Modify the app's `res/values/strings.xml` to include the following lines:

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

4 - Open terminal and run `appcenter codepush deployment list -a <ownerName>/<appName> -k` </br>
4.1 - Copy the <b>Production</b> Deployment Key </br>

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

# :mortar_board: LICENSE

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

# Author

- 👨🏻‍💻 LinkedIn: [André Angeloni](https://www.linkedin.com/in/andre-angeloni)
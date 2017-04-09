package com.tanakalovelive2ch.sifacprofileviewer.navbar;

import android.app.Activity;
import android.view.View;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class NavigationBarAndroid extends ReactContextBaseJavaModule {

    public NavigationBarAndroid(ReactApplicationContext reactContext) {
        super(reactContext);
            
    }

    @Override
    public String getName() {
        return "NavigationBarAndroid";
                
    }

    @ReactMethod
    public void hide() {
        final Activity reactActivity = getCurrentActivity();
        if (reactActivity != null) {
            reactActivity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    View decorView = reactActivity.getWindow().getDecorView();
                    // Hide both the navigation bar and the status bar.
                    // SYSTEM_UI_FLAG_FULLSCREEN is only available on Android 4.1 and higher, but as
                    // a general rule, you should design your app to hide the status bar whenever you
                    // hide the navigation bar.
                    int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
                    decorView.setSystemUiVisibility(uiOptions);
                }
            });

                        
        }
                
    }

    @ReactMethod
    public void show() {
        final Activity reactActivity = getCurrentActivity();
        if (reactActivity != null) {
            reactActivity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    View decorView = reactActivity.getWindow().getDecorView();
                    // Hide both the navigation bar and the status bar.
                    // SYSTEM_UI_FLAG_FULLSCREEN is only available on Android 4.1 and higher, but as
                    // a general rule, you should design your app to hide the status bar whenever you
                    // hide the navigation bar.
                    int uiOptions = View.SYSTEM_UI_FLAG_VISIBLE;
                    decorView.setSystemUiVisibility(uiOptions);
                }
            });

                        
        }
                
    }
}

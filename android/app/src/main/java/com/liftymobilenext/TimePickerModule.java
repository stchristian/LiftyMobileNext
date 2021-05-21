package com.liftymobilenext;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.app.TimePickerDialog;
import android.util.Log;
import android.widget.TimePicker;

import java.util.Map;
import java.util.HashMap;

public class TimePickerModule extends ReactContextBaseJavaModule {
    TimePickerModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "TimePickerModule";
    }

    @ReactMethod
    public void openTimePickerDialog(int initialHour, int initialMinute, Callback callback) {
        Log.d("CalendarModule", "openTimePickerDialog called");
        // Launch Time Picker Dialog
        TimePickerDialog timePickerDialog = new TimePickerDialog(this.getCurrentActivity(),
                new TimePickerDialog.OnTimeSetListener() {
                    @Override
                    public void onTimeSet(TimePicker view, int hourOfDay,
                                          int minute) {
                        callback.invoke(hourOfDay, minute);
                    }
                }, initialHour, initialMinute, false);
        timePickerDialog.show();
    }
}

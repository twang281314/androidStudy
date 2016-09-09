package com.example.anytao.myapplication;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import org.json.JSONException;
import org.json.JSONObject;

import com.airymiao.android.webviewjavascriptbridge.WebViewJavascriptBridgeClient;

public class Main2Activity extends AppCompatActivity {

    WebView webView;
    WebViewJavascriptBridgeClient bridgeWebViewClient;
    String url = "http://192.168.200.78:8080/views/demandForecastReport/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        webView = (WebView) findViewById(R.id.webView2);
        webView.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);

        bridgeWebViewClient = new WebViewJavascriptBridgeClient(webView);
        this.bindJavascriptBridge();
        bridgeWebViewClient.enableLogging();

        webView.loadUrl(this.url);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Main2Activity.this.executeJavascriptCommand();
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
    }


    /*
    * 注册接收前端报表点击事件处理方法
    * */
    private void bindJavascriptBridge() {
        bridgeWebViewClient.registerHandler("clickSpmChartCallback", new WebViewJavascriptBridgeClient.WVJBHandler() {
            @Override
            public void request(Object data, WebViewJavascriptBridgeClient.WVJBResponseCallback callback) {
                Log.v("anytao", "Received data from web:" + data.toString());
                callback.callback(data);
            }
        });
    }

    /*
    * 刷新报表数据
    * */
    private void executeJavascriptCommand() {
        JSONObject jsonData = new JSONObject();
        try {
            JSONObject messageData = new JSONObject();
            messageData.put("content", "From Android");

            jsonData.put("code", "2000");
            jsonData.put("type", "alert");
            jsonData.put("message", messageData);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        bridgeWebViewClient.callHandler("updateSpmChartDataHandler", jsonData, new WebViewJavascriptBridgeClient.WVJBResponseCallback() {
            @Override
            public void callback(Object data) {
                Log.v("", "Response data from web:" + data.toString());
            }
        });
    }

}

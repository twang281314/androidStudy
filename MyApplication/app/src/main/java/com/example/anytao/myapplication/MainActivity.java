package com.example.anytao.myapplication;

import org.json.JSONException;
import org.json.JSONObject;


import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;
import android.widget.Toast;


public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private WVJBWebViewClient webViewClient;
    public String name;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        final TextView textView = (TextView) findViewById(R.id.textView);
        textView.setText("wangtao");
        webView = (WebView) findViewById(R.id.webView);

        Intent intent=getIntent();

        if(intent!=null){
            String dataString = intent.getDataString();
            if (dataString != null) {
                Toast.makeText(this, dataString, Toast.LENGTH_LONG).show();
            }
        }

//        webView.loadUrl("http://www.csdn.net");
//        WebSettings wSet = webView.getSettings();
//        wSet.setJavaScriptEnabled(true);
//
//        webView.setWebViewClient(new WebViewClient() {
//            public boolean shouldOverrideUrlLoading(WebView view, String url)
//            { //  重写此方法表明点击网页里面的链接还是在当前的webview里跳转，不跳到浏览器那边
//                view.loadUrl(url);
//                return true;
//            }
//        });
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);
        webView.setWebChromeClient(new WebChromeClient());
        //webView.loadUrl("http://192.168.200.78:8080/views/demandForecastReport/index.html");
        //webView.loadUrl("http://192.168.6.24:8888/views/demandForecastReport/");
        //webView.loadUrl("file:///android_asset/mobileapp/index-chartjs.html");
        webView.loadUrl("file:///android_asset/mobileapp/views/demandForecastReport/index.html");
        //webView.loadUrl("http://baidu.com");

        webViewClient = new MyWebViewClient(webView);
        webViewClient.enableLogging();
        webView.setWebViewClient(webViewClient);

//        Intent intent = new Intent(this, Main2Activity.class);
//        startActivity(intent);

        findViewById(R.id.button1).setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View v) {
//                webViewClient.send("A string sent from ObjC to JS", new WVJBWebViewClient.WVJBResponseCallback() {
//
//                    @Override
//                    public void callback(Object data) {
//                        Toast.makeText(MainActivity.this, "sendMessage got response: " + data, Toast.LENGTH_LONG).show();
//                        textView.setText("改变了");
//                    }
//               });


            }
        });

        findViewById(R.id.button2).setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View v) {
                String result = "{\"series\":[{\"spu\":[\"29267\",\"39088\",\"42928\"],\"count\":[\"5565\",\"5892\",\"7027\"]}],\"xAxis\":{\"date\":[\"2016\",\"2017\",\"2018\"]}}";
                try {
                    webViewClient.callHandler("updateSpmChartDataHandler", new JSONObject(result), new WVJBWebViewClient.WVJBResponseCallback() {

                        @Override
                        public void callback(Object data) {
                            Toast.makeText(MainActivity.this, "testJavascriptHandler responded: " + data, Toast.LENGTH_LONG).show();
                        }
                    });
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /*
    * 自定义处理
    * */
    class MyWebViewClient extends WVJBWebViewClient {
        public MyWebViewClient(WebView webView) {

            // support js send
            super(webView, new WVJBWebViewClient.WVJBHandler() {

                @Override
                public void request(Object data, WVJBResponseCallback callback) {
                    Toast.makeText(MainActivity.this, "ObjC Received message from JS:" + data, Toast.LENGTH_LONG).show();
                    callback.callback("Response for message from ObjC!");
                }
            });

			/*
            // not support js send
			super(webView);
			*/

            enableLogging();

            registerHandler("clickSpmChartCallback", new WVJBWebViewClient.WVJBHandler() {

                @Override
                public void request(Object data, WVJBResponseCallback callback) {
                    Toast.makeText(MainActivity.this, "testObjcCallback called:" + data, Toast.LENGTH_LONG).show();
                    final TextView textView = (TextView) findViewById(R.id.textView);
                    textView.setText("哈哈哈哈");
                    callback.callback("Response from testObjcCallback!");
                }
            });

            send("A string sent from ObjC before Webview has loaded.", new WVJBResponseCallback() {

                @Override
                public void callback(Object data) {
                    Toast.makeText(MainActivity.this, "ObjC got response! :" + data, Toast.LENGTH_LONG).show();
                }
            });

            String result = "{\"series\":[{\"spu\":[\"29267\",\"39088\",\"42928\"],\"count\":[\"5565\",\"5892\",\"7027\"]}],\"xAxis\":{\"date\":[\"2016\",\"2017\",\"2018\"]}}";

//            try {
//                callHandler("updateSpmChartDataHandler", new JSONObject(result),new WVJBResponseCallback() {
//
//                    @Override
//                    public void callback(Object data) {
//                        Toast.makeText(MainActivity.this, "ObjC call testJavascriptHandler got response! :" + data, Toast.LENGTH_LONG).show();
//                    }
//                });
//            } catch (JSONException e) {
//                e.printStackTrace();
//            }

        }

        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            return super.shouldOverrideUrlLoading(view, url);
        }
    }
}

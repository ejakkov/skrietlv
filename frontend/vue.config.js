module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        "zlib": require.resolve("browserify-zlib"),
        "querystring": require.resolve("querystring-es3"),
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
	    "assert": require.resolve("assert/"),
      "process": require.resolve("process/browser"),


        "stream": require.resolve("stream-browserify"),
        "timers": require.resolve("timers-browserify"),
        "os": require.resolve("os-browserify/browser"), 
        "process": require.resolve("process/browser"), 
        "http": require.resolve("stream-http"),
        "util": require.resolve("util/"),
        "url": require.resolve("url/"),
        "fs": false, 
        "net": false, 
        "tls": false,
        "child_process": false, 
        "dns": false,
        "fs/promises": false 
      }
    }
  }
}
const path = require('path');
// ref: https://umijs.org/config/
export default {
  history: 'hash',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: false
      },
      title: '钢瓶信息查询',
      dll: true,
      pwa: false,
      // hd: true,
      routes: {
        exclude: [
          /models/,
          /services/,
          /components/,
        ],
      },
      dynamicImport: {
        webpackChunkName: true,
        // loadingComponent: './pageLoading.js',
      },
      hardSource: true,
    }],
    ['umi-plugin-navigation']
  ],
  alias: {
    src: path.resolve(__dirname, 'src'),
    components: path.resolve(__dirname, 'src/components'),
    utils: path.resolve(__dirname, 'src/utils'),
    services: path.resolve(__dirname, 'src/services'),
    models: path.resolve(__dirname, 'src/models'),
  },
  "define": {
    'process.env': {
      'NODE_ENV': process.env.NODE_ENV
    },
  },
  "proxy": {
    "/api": {
      "target": "http://192.168.2.77:10120",
      "changeOrigin": true,
      pathRewrite: {
        '^/api': ''
      }
    },
    "/wechat": {
      "target": "http://192.168.2.77:10120",
      "changeOrigin": true,
    },
  },
}

const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'micro-frontend-app',

  exposes: {
    './SearchModule': './src/app/modules/search/search.module.ts',
    './ExampleModule': './src/app/modules/example/example.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});

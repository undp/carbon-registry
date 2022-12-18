const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { 
                            '@primary-color': '#16B1FF',
                            '@layout-sider-menu-container' : '#F4F5FA',
                            '@component-background' : '#F4F5FA',
                            '@layout-header-background': '#F4F5FA',
                            '@layout-body-background': '#F4F5FA'
                        },
                        javascriptEnabled: true,
                    },
                }
            },
        },
    ],
};
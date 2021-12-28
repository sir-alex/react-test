const path = require('path');
module.exports = {
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-create-react-app"
    ],
    "framework": "@storybook/react",
    webpackFinal: async (config, {configType}) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@root': path.resolve(__dirname, "../src"),
            '@core': path.resolve(__dirname, "../src/core"),
        };

        return config;
    }
}

require("dotenv").config()
const withTM = require('next-transpile-modules')(['@pusher/push-notifications-web', '@pusher/push-notifications-server']);
const nextConfig = withTM({
    swcMinify: true,
    env: {
        ENV: process.env.ENV,
        API_URL: process.env.API_URL,
        BASE_URL: process.env.BASE_URL,
        APP_NAME: process.env.APP_NAME,
        APP_VERSION: process.env.APP_VERSION,
        APP_DESC: process.env.APP_DESC,
        SHORT_NAME: process.env.SHORT_NAME,
        MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
        GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
    },
    reactStrictMode: true,
    serverRuntimeConfig: {
        secret: "pja-app",
    },
    trailingSlash: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    {key: "Access-Control-Allow-Credentials", value: "true"},
                    {key: "Access-Control-Allow-Origin", value: "*"},
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value:
                            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
        ];
    },
    compiler: {
        removeConsole: process.env.ENV === "production"
    },
});

module.exports = nextConfig
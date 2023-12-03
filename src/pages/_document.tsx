import {ColorModeScript} from "@chakra-ui/react"
import NextDocument, {Head, Html, Main, NextScript} from "next/document"
import React from "react";

export default class MyDocument extends NextDocument {
    static async getInitialProps(ctx) {
        const initialProps = await NextDocument.getInitialProps(ctx)
        return { ...initialProps }
    }
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <ColorModeScript initialColorMode={"dark"} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
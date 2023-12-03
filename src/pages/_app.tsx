import {ChakraProvider} from '@chakra-ui/react';
import type {AppProps} from 'next/app';
import React from 'react';
import CSSReset from "@Styles/CSSReset";
import '@Styles/CSSReset/styles.scss'
import {QueryClient, QueryClientProvider} from 'react-query';
import theme from "@Theme/index"
import Store from 'app/reducers/Store';
import {RecoilRoot} from 'recoil'
import 'focus-visible/dist/focus-visible'
import {css, Global} from '@emotion/react';

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
     outline: none;
     box-shadow: none;
   }
`;

export default function App({ Component, pageProps }: AppProps) {

    const queryClient = new QueryClient();

    return (
        <RecoilRoot>
            <Store>
                <QueryClientProvider client={queryClient}>
                    <ChakraProvider theme={theme}>
                        <CSSReset />
                        <Global styles={GlobalStyles} />
                        <Component {...pageProps} />
                    </ChakraProvider>
                </QueryClientProvider>
            </Store>
        </RecoilRoot>
    );
}

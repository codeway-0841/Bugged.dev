import Document, { Head, Main, NextScript, Html } from "next/document";

import { getSiteMetaData } from "utils/helpers";

export default class MyDocument extends Document {
  render() {
    const siteMetadata = getSiteMetaData();

    return (
      <Html lang={siteMetadata.language}>
        <Head>
          <script
            async
            src="https://aslemammad-ackee.herokuapp.com/tracker.js"
            data-ackee-server="https://aslemammad-ackee.herokuapp.com"
            data-ackee-domain-id="7134e287-4738-4ca8-89c7-069ef8abf7f4"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

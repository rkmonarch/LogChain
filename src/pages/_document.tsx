import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-[url('../assets/images/bg.jpeg')] bg-no-repeat bg-cover bg-center bg-fixed dark:bg-[url('../assets/images/dark-bg.png')]">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
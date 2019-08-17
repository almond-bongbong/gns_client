import React from 'react';
import Document from 'next/document';
import { initAxios } from '../config/configureAxios';

class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    initAxios();
    const page = renderPage(App => props => <App {...props} />);
    return { ...page };
  }
}

export default MyDocument;
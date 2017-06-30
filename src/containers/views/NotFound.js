import React from 'react';
import DocumentTitle from 'react-document-title';

const NotFound = () => (
  <DocumentTitle title="Resource Not Found">
    <div className="notfound">
      <img src={require('../../assets/images/logo-black-red.png')} />
      <h1>Huh. It seems that page is Hyde-ing...</h1>
      <h2>The resource you requested was not found.</h2>
    </div>
  </DocumentTitle>
);

export default NotFound;

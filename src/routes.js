import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { ADMIN_PREFIX } from './constants';

import App from './containers/App';
import Login from './containers/views/Login';
import Dashboard from './containers/views/Dashboard';
import Configuration from './containers/views/Configuration';
import Pages from './containers/views/Pages';
import PageEdit from './containers/views/PageEdit';
import PageNew from './containers/views/PageNew';
import Documents from './containers/views/Documents';
import DocumentEdit from './containers/views/DocumentEdit';
import DocumentNew from './containers/views/DocumentNew';
import DataFiles from './containers/views/DataFiles';
import DataFileEdit from './containers/views/DataFileEdit';
import DataFileNew from './containers/views/DataFileNew';
import Drafts from './containers/views/Drafts';
import DraftEdit from './containers/views/DraftEdit';
import DraftNew from './containers/views/DraftNew';
import StaticFiles from './containers/views/StaticFiles';
import StaticIndex from './containers/views/StaticIndex';
import Templates from './containers/views/Templates';
import TemplateDirectory from './containers/views/TemplateDirectory';
import TemplateEdit from './containers/views/TemplateEdit';
import TemplateNew from './containers/views/TemplateNew';
import ThemeManifest from './containers/views/ThemeManifest';
import ThemeDirectory from './containers/views/ThemeDirectory';
import TemplateView from './containers/views/TemplateView';
import NotFound from './containers/views/NotFound';

export default (
  <Route path={`${ADMIN_PREFIX}`}>
    // <IndexRoute component={Login} />
    <Route path={`${ADMIN_PREFIX}`} component={App}>
      <Route path="dashboard" component={Dashboard} />
      <Route path="configuration" component={Configuration} />
      <Route path="pages">
        <IndexRoute component={Pages} />
        <Route path="(**/)new" component={PageNew} />
        <Route path="(**/)*.*" component={PageEdit} />
        <Route path="**" component={Pages} />
      </Route>
      <Route path="collections">
        <Route path=":collection_name">
          <IndexRoute component={Documents} />
          <Route path="(**/)new" component={DocumentNew} />
          <Route path="(**/)*.*" component={DocumentEdit} />
          <Route path="**" component={Documents} />
        </Route>
      </Route>
      <Route path="drafts">
        <IndexRoute component={Drafts} />
        <Route path="(**/)new" component={DraftNew} />
        <Route path="(**/)*.*" component={DraftEdit} />
        <Route path="**" component={Drafts} />
      </Route>
      <Route path="datafiles">
        <IndexRoute component={DataFiles} />
        <Route path="(**/)new" component={DataFileNew} />
        <Route path="(**/)*.*" component={DataFileEdit} />
        <Route path="**" component={DataFiles} />
      </Route>
      <Route path="staticfiles">
        <IndexRoute component={StaticFiles} />
        <Route path="index" component={StaticIndex} />
        <Route path="**" component={StaticFiles} />
      </Route>
      <Route path="templates">
        <IndexRoute component={Templates} />
        <Route path="(**/)new" component={TemplateNew} />
        <Route path="(**/)*.*" component={TemplateEdit} />
        <Route path="**" component={TemplateDirectory} />
      </Route>
      <Route path="theme">
        <IndexRoute component={ThemeManifest} />
        <Route path="(**/)*.*" component={TemplateView} />
        <Route path="**" component={ThemeDirectory} />
      </Route>
      <Route path={`${ADMIN_PREFIX}/*`} component={NotFound} />
    </Route>
  </Route>
);

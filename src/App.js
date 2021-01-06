import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Photos from './pages/photos';
import Shell from './components/shell';
import Auth from './pages/auth';
// import Collections from './pages/collections';
// import UserPage from './pages/userPage';
// import Search from './pages/search';
// import CollectionPage from './pages/collectionPage';
// import FullPhoto from './pages/fullPhoto';
// import Account from './pages/account';
// import './App.css';

// const Photos = React.lazy(() => import('./pages/photos'));
const Collections = React.lazy(() => import('./pages/collections'));
const UserPage = React.lazy(() => import('./pages/userPage'));
const Search = React.lazy(() => import('./pages/search'));
const CollectionPage = React.lazy(() =>
  import('./pages/collectionPage'),
);
const FullPhoto = React.lazy(() => import('./pages/fullPhoto'));
const Account = React.lazy(() => import('./pages/account'));

function App() {
  return (
    <Shell>
      <Switch>
        <Route
          path="/collection/:collectionId/:photoId"
          component={FullPhoto}
        />
        <Route
          path="/search/:category/:query/:photoId"
          component={FullPhoto}
        />
        <Route path="/account/likes/:photoId" component={FullPhoto} />
        <Route path="/photos/:photoId" component={FullPhoto} />
        <Route
          path="/users/:username/photos/:photoId"
          component={FullPhoto}
        />
        <Route
          path="/users/:username/likes/:photoId"
          component={FullPhoto}
        />
      </Switch>
      <Switch>
        <Route path="/photos" component={Photos} />
        <Route path="/collections" component={Collections} />
        <Route path="/users/:username" component={UserPage} />

        <Route
          path="/collection/:collectionId"
          component={CollectionPage}
        />
        <Route path="/search/:category/:query" component={Search} />
        <Route path="/account" component={Account} />
        <Route path="/auth" component={Auth} />
        <Redirect from="/" to="/photos" />
      </Switch>
    </Shell>
  );
}

export default App;

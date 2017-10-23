import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import IntlWrapper from '../client/modules/Intl/IntlWrapper'; // eslint-disable-line no-unused-vars

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// React And Redux Setup
import { configureStore } from '../client/store'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux'; // eslint-disable-line no-unused-vars
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
// import routes from '../client/routes';
import MyRoutes from '../client/NewRoutes';
import ErrorMessage from '../client/newModules/NotFound/NotFound';
import { fetchComponentData } from './util/fetchData'; // eslint-disable-line no-unused-vars
import dummyData from './dummyData';
import serverConfig from './config';
import challengeAttempt from './modules/challengeAttempt/routes';
import challenge from './modules/challenge/routes';
import challengeStep from './modules/challengeStep/routes';


export default function () {
  // Initialize the Express App
  const app = new Express();

  // Run Webpack dev server in development mode
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
  }

  // Set native promises as mongoose promise
  mongoose.Promise = global.Promise;

  // MongoDB Connection
  mongoose.connect(serverConfig.mongoURL, (error) => {
    /* istanbul ignore if */
    if (error) {
      console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      throw error;
    }

    // feed some dummy data in DB.
    dummyData();
  });

  // Apply body Parser and server public assets and routes
  app.use(compression());
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  app.use(Express.static(path.resolve(__dirname, '../dist/client')));
  app.use('/api/v1/challengeAttempt', challengeAttempt);
  app.use('/api/v1/challenge', challenge);
  app.use('/api/v1/challengeStep', challengeStep);

  // my new HTML
  const newRenderFullPage = (html) => {
    const head = Helmet.rewind();

    // Import Manifests
    const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);

    return `
      <!doctype html>
      <html>
        <head>
          
          ${head.base.toString()}
          ${head.title.toString()}
          ${head.meta.toString()}
          ${head.link.toString()}
          ${head.script.toString()}
          
          
          ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
          <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
          <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >
        </head>
        <body>
          <div id="root">${html}</div>
          </script>
          <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
          <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
        </body>
      </html>
    `;
  };

  // Render Initial HTML
  const renderFullPage = (html, initialState) => {
    const head = Helmet.rewind();

    // Import Manifests
    const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
    const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

    return `
      <!doctype html>
      <html>
        <head>
          ${head.base.toString()}
          ${head.title.toString()}
          ${head.meta.toString()}
          ${head.link.toString()}
          ${head.script.toString()}

          ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
          <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
          <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
            ${process.env.NODE_ENV === 'production' ?
            `//<![CDATA[
            window.webpackManifest = ${JSON.stringify(chunkManifest)};
            //]]>` : ''}
          </script>
          <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
          <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
        </body>
      </html>
    `;
  };

  const renderError = err => {
    const softTab = '&#32;&#32;&#32;&#32;';
    const errTrace = process.env.NODE_ENV !== 'production' ?
      `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
    return renderFullPage(`Server Error${errTrace}`, {});
  };

  // Server Side Rendering based on routes matched by React-router.

  app.use((req, res) => {
    match({ MyRoutes, location: req.url }, (err, redirectLocation, renderProps) => {
      if (err) {
        return res.status(500).end(renderError(err));
      }

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      let newContent; // eslint-disable-line no-unused-vars

      if (renderProps) {
        newContent = renderToString(<RouterContext {...renderProps} />);
        res.status(200);
      } else {
        newContent = renderToString(<ErrorMessage />);
        res.status(404);
      }
      return res
        .set('Content-Type', 'text/html')
        .end(newRenderFullPage());

     /*
      const store = configureStore();

      return fetchComponentData(store, renderProps.components, renderProps.params)
        .then(() => {
          const initialView = renderToString(
            <Provider store={store}>
              <IntlWrapper>
                <RouterContext {...renderProps} />
              </IntlWrapper>
            </Provider>
          );
          const finalState = store.getState();

          res
            .set('Content-Type', 'text/html')
            .status(200)
            .end(renderFullPage(initialView, finalState));
        })
        .catch((error) => next(error));
      */
    });
  });


  // start app
  app.listen(serverConfig.port, (error) => {
    /* istanbul ignore if */
    if (!error && process.env.NODE_ENV !== 'test') {
      console.log(`Code Challenge is running on port: ${serverConfig.port}!`); // eslint-disable-line
    }
  });

  return app;
}

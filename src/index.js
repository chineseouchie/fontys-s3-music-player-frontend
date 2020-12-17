import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/app/App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
	dsn: "https://92a5981be5eb4d0694a401f0992435e5@o492790.ingest.sentry.io/5560684",
	autoSessionTracking: true,
	integrations: [
	  new Integrations.BrowserTracing(),
	],
  
	// We recommend adjusting this value in production, or using tracesSampler
	// for finer control
	tracesSampleRate: 1.0,
});

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

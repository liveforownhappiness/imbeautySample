import React from 'react';

export const navigatorRef = React.createRef();
export const isMountedRef = React.createRef();

function navigate(name, params) {
  if (navigatorRef.current && isMountedRef.current) {
    navigatorRef.current.navigate(name, params);
  }
}

function reset(state) {
  if (navigatorRef.current && isMountedRef.current) {
    navigatorRef.current.reset(state);
  }
}

function dispatch(action) {
  if (navigatorRef.current && isMountedRef.current) {
    navigatorRef.current.dispatch(action);
  }
}

function goBack() {
  if (navigatorRef.current && isMountedRef.current) {
    navigatorRef.current.goBack();
  }
}

function getCurrentRoute() {
  if (navigatorRef.current && isMountedRef.current) {
    return navigatorRef.current.getCurrentRoute();
  }
}

// add other navigation functions that you need and export them

export default {
  navigate,
  dispatch,
  reset,
  goBack,
  getCurrentRoute,
};

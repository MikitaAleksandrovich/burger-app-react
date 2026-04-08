import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./hoc/Layout/Layout', () => ({
  __esModule: true,
  default: (props) => <div data-testid="layout-mock">{props.children}</div>,
}));

jest.mock('./components/UI/Spinner/Spinner', () => ({
  __esModule: true,
  default: () => <div>Loading Spinner</div>,
}));

jest.mock('./containers/BurgerBuilder/BurgerBuilder', () => ({
  __esModule: true,
  default: () => <div>Burger Builder Route</div>,
}));

jest.mock('./containers/Checkout/Checkout', () => ({
  __esModule: true,
  default: () => <div>Checkout Route</div>,
}));

jest.mock('./containers/Orders/Orders', () => ({
  __esModule: true,
  default: () => <div>Orders Route</div>,
}));

jest.mock('./containers/Auth/Auth', () => ({
  __esModule: true,
  default: () => <div>Auth Route</div>,
}));

jest.mock('./containers/Auth/Logout/Logout', () => ({
  __esModule: true,
  default: () => <div>Logout Route</div>,
}));

const renderApp = (stateOverrides = {}, initialEntries = ['/']) => {
  const defaultState = {
    auth: {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    },
  };

  const state = {
    ...defaultState,
    ...stateOverrides,
  };

  state.auth = {
    ...defaultState.auth,
    ...(stateOverrides.auth || {}),
  };

  const store = createStore((currentState = state) => currentState);

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

describe('<App />', () => {
  it('renders burger builder for unauthenticated users', () => {
    renderApp();

    expect(screen.getByText('Burger Builder Route')).toBeInTheDocument();
    expect(screen.queryByText('Logout Route')).not.toBeInTheDocument();
  });

  it('renders logout route when user is authenticated', () => {
    renderApp({ auth: { token: 'token-value' } }, ['/logout']);

    expect(screen.getByText('Logout Route')).toBeInTheDocument();
  });
});
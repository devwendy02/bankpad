import ReactDOM from 'react-dom';
import Hotjar from '@hotjar/browser';
import Web3RainbowKitProvider from 'contexts/Web3RainbowKitProvider';
import ActiveWeb3Provider from 'contexts/ActiveWeb3Context';
import AuthProvider from 'contexts/AuthContext';
import BankServiceProvider from 'contexts/BankServiceContext';
import { LoadingProvider } from 'contexts/LoadingContext';
import { RefreshContextProvider } from 'contexts/RefreshContext';
import { ThemeProvider } from 'contexts/ThemeContext';
import reportWebVitals from "./reportWebVitals";
import App from './App';
import './index.css'

global.Buffer = global.Buffer || require("buffer").Buffer

// Setup hotjar
Hotjar.init(
    parseInt(process.env.REACT_APP_HOTJAR_SITE_ID),
    parseInt(process.env.REACT_APP_HOTJAR_VERSION)
);

ReactDOM.render(
  <ThemeProvider>
    <Web3RainbowKitProvider>
      <ActiveWeb3Provider>
        <AuthProvider>
          <BankServiceProvider>
            <RefreshContextProvider>
              <LoadingProvider>
                <App />
              </LoadingProvider>
            </RefreshContextProvider>
          </BankServiceProvider>
        </AuthProvider>
      </ActiveWeb3Provider>
    </Web3RainbowKitProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

reportWebVitals();

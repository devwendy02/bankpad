import { useMemo } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Layout from 'components/Layout';
import { useActiveWeb3 } from 'hooks/useActiveWeb3';
import LaunchpadPage from 'pages/launchpad';
import TokenPage from 'pages/launchpad/token';
import PrivateSalePage from 'pages/PrivateSalePage';
import LockerPage from 'pages/LockerPage';
import MigrationPage from 'pages/MigrationPage';
import AirdropPage from 'pages/AirdropPage';
import OTCOfferingsPage from 'pages/OTCOfferingsPage';
import StakingPage from 'pages/StakingPage';
import DocsPage from 'pages/DocsPage';
import './global.scss';

function App() {
  const { account, chain } = useActiveWeb3()
  const isWalletConnected = useMemo(() => account && chain, [account, chain])

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 3000 },
          className: 'myToast'
        }}
      />
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact render={() => (false ? <></> : <Redirect to="/launchpad" />)} />
            <Route path="/launchpad" exact component={LaunchpadPage} />
            <Route path="/launchpad/:uuid" component={TokenPage} />
            <Route path="/migration" exact component={MigrationPage} />
            <Route path="/private_sale" component={PrivateSalePage} />
            <Route path="/locker" component={LockerPage} />
            <Route path="/airdrop" component={AirdropPage} />
            <Route path="/otc_offerings" component={OTCOfferingsPage} />
            <Route path="/Staking" component={StakingPage} />
            <Route path="/docs" component={DocsPage} />
            <Route path="*" render={() => (<Redirect to="/launchpad" />)} />
          </Switch>
        </Layout>
      </Router>
    </>
  );
}

interface LayoutProps extends RouteComponentProps {
  // Add any additional props if needed
}

// const PagesWithLoggedIn: React.FC<LayoutProps> = ({ match }) => {
//   return (
//     <>
//       <Route path={`${match.path}`} component={DashboardPage} />
//       <Route path={`${match.path}launchpad/`} component={LaunchpadPage} />
//       {/* <Route path={`${match.path}launches/:uuid/token_details`} component={TokenCreatePage} />
//       <Route path={`${match.path}launches/:uuid/distribution`} component={TokenCreatePage} />
//       <Route path={`${match.path}launches/:uuid/antibot`} component={TokenCreatePage} />
//       <Route path={`${match.path}launches/:uuid/taxes`} component={TokenCreatePage} />
//       <Route path={`${match.path}launches/:uuid/liquidity`} component={TokenCreatePage} />
//       <Route path={`${match.path}launches/:uuid/review`} component={TokenCreatePage} /> */}

//     </>
//   )
// }

export default App;


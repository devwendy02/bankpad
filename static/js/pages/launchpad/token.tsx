// import { useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Loading from 'components/loading/Loading';
import StateProvider from 'views/launchpad/context/TokenContext';
import CreateToken from 'views/launchpad/CreateToken'
import ManageToken from 'views/launchpad/ManageToken';
import Container from 'components/Layout/Container';

const TokenPage = () => {
  // const [isLoading, setIsLoading] = useState(true);

  let { path } = useRouteMatch();

  return (
    <>
      <Loading isLoading={false} />
      <StateProvider>
        <Switch>
          <Route exact path={path}>
            <Container>
              <ManageToken />
            </Container>
          </Route>
          <Route path={`${path}/:step`}>
            <Container>
              <CreateToken />
            </Container>
          </Route>
        </Switch>
      </StateProvider>
    </>
  )
}

export default TokenPage;

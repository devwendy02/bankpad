import { useEffect, useState } from 'react';
import Loading from 'components/loading/Loading';
import StateProvider from 'views/launchpad/context/LaunchPadContext';
import LaunchPad from 'views/launchpad';
import Container from 'components/Layout/Container';

const LaunchpadPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(false);

  useEffect(() => {
    if (!isLoading1) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }

  }, [isLoading1]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <StateProvider>
        <Container>
          <LaunchPad />
        </Container>
      </StateProvider>
    </>

  )
}

export default LaunchpadPage;
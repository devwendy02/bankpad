import { useEffect, useState } from 'react';
import Loading from 'components/loading/Loading';
import StateProvider from 'views/migration/context/MigrationContext';
import Migration from 'views/migration';
import Container from 'components/Layout/Container';

const MigrationPage = () => {
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
          <Migration />
        </Container>
      </StateProvider>
    </>

  )
}

export default MigrationPage;

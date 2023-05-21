import { Outlet, Link, useMatch } from 'react-router-dom';

import Menu from './js/ui/components/menu/Menu';

const App = () => {
  const isAtDashboard = useMatch('/');

  return (
    <>
      <header>
        {!isAtDashboard && <Link to="/">Back</Link>}
        <h1>Test</h1> <Menu show={true} />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;

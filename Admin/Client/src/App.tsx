import React from 'react';
import InitSideEffects from './sideEffects/initSideEffects';
import LoginPage from './pages/loginPage';

//Change this to move from real to mock side effects
const isMocking = true;
InitSideEffects(isMocking);

function App() {
    return <div className='App'>
        <LoginPage/>
    </div>;
}

export default App;

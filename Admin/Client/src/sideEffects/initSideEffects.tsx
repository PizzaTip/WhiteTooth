import LoginSideEffect from './authentication/loginSideEffect';
import SideEffectJs from 'side-effect-js';

//Register side effects
const sideEffects = [LoginSideEffect];

const InitSideEffects = (isMocking: boolean) => {
    SideEffectJs.Load(sideEffects);
    if (isMocking)
        SideEffectJs.UseSimulator();
}

export default InitSideEffects;
import { useEffect, useState } from 'react'
import { signInWithEmailAndPassword, AuthError } from "firebase/auth"
import { auth } from '../../services/firebaseConfig';
import icon_joystcik from '../../assets/img/joystick_icon.png'
import icon_email from '../../assets/img/icon-email.png'
import icon_password from '../../assets/img/icon-password.png'
import './Login.css'
import Register from '../../components/Register/Register';
import { screenHelper, screenStore } from '../../services/store';
import { shallow } from 'zustand/shallow';

const Login = () => {
    const { screen } = screenStore(state => { return { screen: state.screen } }, shallow);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        screenHelper.setScreen(false)
    }, [])


    function login(email: string, password: string) {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                redirect();
            })
            .catch((error: AuthError) => {
                if (error.message == "Firebase: Error (auth/user-not-found).") {
                    alert('Essa conta não foi encontrada, tente mudar as credênciais.')
                }
            });
    }
    function redirect() {
        window.location.assign("/");
    }

    return (
        <>
            {screen == false ? (
                <div className='container-login'>
                    <div className='container-form'>
                        <div className='img-auth'>
                            <div onClick={() => redirect()} className='icon-login'>
                                <img className='icon' src={icon_joystcik} />
                            </div>
                            <div className='form'>
                                <p className='title-login'>Entrar com o usuário</p>
                                <div className='container-input'>
                                    <img className='icon-email' src={icon_email} />
                                    <input type='email' className='input' placeholder='Email' onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className='container-input'>
                                    <img className='icon-password' src={icon_password} />
                                    <input type='password' className='input' placeholder='Senha' onChange={e => setPassword(e.target.value)} />
                                </div>
                                <button className='login-btn' onClick={() => login(email, password)}> ENTRAR</button>
                            </div>
                        </div>
                        <div className='footer-login'>
                            <p className='text-newacc'>Você não tem uma conta?</p>
                            <a onClick={() => screenHelper.setScreen(true)} className='link-2'>Crie a sua conta aqui</a>
                        </div>
                    </div>
                </div>
            ) : (<Register />)}
        </>
    )
}

export default Login;
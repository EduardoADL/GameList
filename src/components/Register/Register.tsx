import { useState, useEffect } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebaseConfig';
import icon_joystcik from '../../assets/img/joystick_icon.png'
import icon_email from '../../assets/img/icon-email.png'
import icon_password from '../../assets/img/icon-password.png'
import './Register.css'
import { screenHelper } from '../../services/store';

const Register = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [state, setState] = useState<boolean>(false);
    const [stateMessage, setStateMessage] = useState<string>('');
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

    function handleSignOut() {
        createUserWithEmailAndPassword(email, password);
    }

    function redirect() {
        window.location.assign("/");
    }


    useEffect(() => {
        if (loading) {
            setState(true);
            setStateMessage("Criando conta...");
        } else if (user) {
            setState(true);
            setStateMessage("Conta criada com sucesso!");
            setTimeout(() => screenHelper.setScreen(false), 2000)
            redirect();
        } else if (error) {
            setState(true);
            setStateMessage(`Erro ao criar conta, tente dados validos para criar conta`);
        }
    }, [loading, user, error]);




    return (
        <div className='container-login'>
            <div className='container-form'>
                <div className='img-auth'>
                    {state ? (<div className='info'> {stateMessage} </div>) : (<div onClick={() => redirect()} className='icon-login'><img className='icon' src={icon_joystcik} /></div>)}
                    <div className='form'>
                        <p className='title-login'>Cadastrar conta</p>
                        <div className='container-input'>
                            <img className='icon-email' src={icon_email} />
                            <input type='email' className='input' placeholder='Email' onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='container-input'>
                            <img className='icon-password' src={icon_password} />
                            <input type='password' className='input' placeholder='Senha' onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button className='login-btn' onClick={handleSignOut}>CRIAR CONTA</button>
                    </div>
                </div>
                <div className='footer-login'>
                    <p className='text-newacc'>Já tem uma conta?</p>
                    <a onClick={() => screenHelper.setScreen(false)} className='link-2'>Entre por aqui</a>
                </div>
            </div>
        </div>
    )
}

export default Register;
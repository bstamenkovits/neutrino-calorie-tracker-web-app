import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase'
import '../styles/login.css'



export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('')
  const navigate = useNavigate();
  const location = useLocation();

  // page from which the user was redirected to Login
  const from = location.state?.from ?? { pathname: '/' };


  async function login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {setMessage(error.message)}
        else {
            setMessage('Logged in successfully')
            navigate(from, { replace: true })
        }

    }

    async function signup(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {setMessage(error.message)}
        else {setMessage('Signed up successfully, you can now login using the email/password combination you provided')}

    }



  const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {login(email, password)}
        else {signup(email, password)}
    };

  return (
    <div className="login-page">

      <div className="login-toggle">
        <span>{isLogin ? 'Login' : 'Sign up'}</span>
        <label className="login-toggle-label">
          <input
            className="login-toggle-checkbox"
            type="checkbox"
            checked={!isLogin}
            onChange={() => setIsLogin((prev) => !prev)}
          />
          <span className={`login-slider ${isLogin ? '' : 'active'}`} />
          <span className={`login-slider-knob ${isLogin ? '' : 'active'}`} />
        </label>
      </div>

      <h2>{isLogin ? 'Login' : 'Sign up'}</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-fields">
          <label htmlFor="email">Email</label>
          <input
            className="login-input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            className="login-input"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit">{isLogin ? 'Log In' : 'Create Account'}</button>
          {message ? <p className="login-message">{message}</p> : null}
        </div>
      </form>
    </div>
  );
}

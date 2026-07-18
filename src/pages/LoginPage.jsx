import { useState } from 'react';
import { supabase } from '../lib/supabase'





export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('')

  async function login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        console.log({data, error})

        if (error) {setMessage(error.message)}
        else {setMessage('Logged in successfully')}

    }

    async function signup(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        // console.log({data, error})

        if (error) {setMessage(error.message)}
        else {setMessage('Signed up successfully, you can now login using the email/password combination you provided')}

    }



  const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {login(email, password)}
        else {signup(email, password)}
    };

  return (
    <div style={{ maxWidth: '320px', margin: '3rem auto', padding: '1rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '1rem',
        }}
      >
        <span>{isLogin ? 'Login' : 'Sign up'}</span>
        <label
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            width: '48px',
            height: '28px',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={!isLogin}
            onChange={() => setIsLogin((prev) => !prev)}
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: isLogin ? '#ccc' : '#34c759',
              borderRadius: '999px',
              transition: 'background-color 0.2s',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: isLogin ? '2px' : '22px',
              top: '2px',
              width: '24px',
              height: '24px',
              backgroundColor: 'white',
              borderRadius: '50%',
              transition: 'left 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}
          />
        </label>
      </div>

      <h2>{isLogin ? 'Login' : 'Sign up'}</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">{isLogin ? 'Log In' : 'Create Account'}</button>
          {message ? <p>{message}</p> : null}
        </div>
      </form>
    </div>
  );
}

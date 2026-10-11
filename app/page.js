'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalitaRegistrazione, setModalitaRegistrazione] = useState(false);
  const [messaggio, setMessaggio] = useState('');
  const [caricamento, setCaricamento] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/dashboard');
    });
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessaggio('');
    setCaricamento(true);

    if (modalitaRegistrazione) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setMessaggio(error.message);
      } else {
        setMessaggio('Account creato! Controlla la tua email per confermare, poi accedi.');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessaggio(error.message);
      } else {
        router.push('/dashboard');
      }
    }
    setCaricamento(false);
  }

  return (
    <main style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: 20,
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: 32,
        borderRadius: 8,
        border: '1px solid #DCD7C9',
        width: '100%',
        maxWidth: 380,
      }}>
        <h1 style={{ fontSize: 22, marginBottom: 4 }}>ElettroPreventivi</h1>
        <p style={{ fontSize: 13, color: '#8A9296', marginTop: 0, marginBottom: 20 }}>
          {modalitaRegistrazione ? 'Crea il tuo account' : 'Accedi al tuo account'}
        </p>

        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4, marginTop: 12 }}>Password</label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {messaggio && (
          <p style={{ fontSize: 13, color: '#C0392B', marginTop: 12 }}>{messaggio}</p>
        )}

        <button type="submit" disabled={caricamento} style={buttonStyle}>
          {caricamento ? 'Attendere...' : modalitaRegistrazione ? 'Registrati' : 'Accedi'}
        </button>

        <button
          type="button"
          onClick={() => { setModalitaRegistrazione(!modalitaRegistrazione); setMessaggio(''); }}
          style={{
            background: 'none', border: 'none', color: '#8A9296', fontSize: 13,
            marginTop: 14, cursor: 'pointer', width: '100%', textAlign: 'center',
          }}
        >
          {modalitaRegistrazione ? 'Hai già un account? Accedi' : 'Non hai un account? Registrati'}
        </button>
      </form>
    </main>
  );
}

const inputStyle = {
  width: '100%',
  padding: '9px 10px',
  border: '1px solid #DCD7C9',
  borderRadius: 4,
  fontSize: 14,
  boxSizing: 'border-box',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  marginTop: 20,
  background: '#C1651F',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  fontWeight: 600,
  fontSize: 14,
  cursor: 'pointer',
};

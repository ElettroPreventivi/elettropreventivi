'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function DashboardPage() {
  const router = useRouter();
  const [utente, setUtente] = useState(null);
  const [profilo, setProfilo] = useState(null);
  const [caricamento, setCaricamento] = useState(true);

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/');
        return;
      }
      setUtente(session.user);

      // Cerca il profilo; se non esiste ancora (primo accesso), lo crea
      let { data: profiloEsistente } = await supabase
        .from('profili')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (!profiloEsistente) {
        const { data: nuovoProfilo } = await supabase
          .from('profili')
          .insert({ id: session.user.id, ruolo: 'tecnico' })
          .select()
          .single();
        profiloEsistente = nuovoProfilo;
      }

      setProfilo(profiloEsistente);
      setCaricamento(false);
    }
    init();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  if (caricamento) {
    return <main style={{ padding: 24 }}>Caricamento...</main>;
  }

  const scadenza = profilo?.abbonamento_scadenza;
  const scaduto = scadenza ? new Date(scadenza) < new Date() : true;

  return (
    <main style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, margin: 0 }}>ElettroPreventivi</h1>
        <button onClick={handleLogout} style={{
          background: 'none', border: '1px solid #DCD7C9', borderRadius: 4,
          padding: '6px 12px', cursor: 'pointer', fontSize: 13,
        }}>
          Esci
        </button>
      </div>

      <div style={{ background: '#fff', border: '1px solid #DCD7C9', borderRadius: 8, padding: 20 }}>
        <p style={{ fontSize: 13, color: '#8A9296', margin: 0 }}>Accesso effettuato come</p>
        <p style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>{utente?.email}</p>

        <div style={{ marginTop: 16, padding: 12, borderRadius: 6, background: scaduto ? '#FBEFE3' : '#EAF5EE' }}>
          {scaduto ? (
            <p style={{ margin: 0, fontSize: 14 }}>
              ⚠️ Il tuo abbonamento non è ancora attivo. Contatta [inserire email o PayPal.me] per attivarlo.
            </p>
          ) : (
            <p style={{ margin: 0, fontSize: 14 }}>
              ✅ Abbonamento attivo fino al {new Date(scadenza).toLocaleDateString('it-IT')}
            </p>
          )}
        </div>
      </div>

      <p style={{ fontSize: 13, color: '#8A9296', marginTop: 20 }}>
        Questa è la base di partenza: login e database veri e funzionanti. Il generatore di preventivi vero e proprio lo aggiungiamo nel prossimo passo.
      </p>
    </main>
  );
}

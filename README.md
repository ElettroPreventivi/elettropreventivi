# ElettroPreventivi

Base di partenza: login collegato a Supabase + una pagina dopo l'accesso.

## Come caricarlo su GitHub (dalla pagina web, senza terminale)

1. Vai su github.com, clicca "New repository"
2. Nome: elettropreventivi. Lascialo pubblico o privato, come preferisci. NON aggiungere README/gitignore (li abbiamo già)
3. Nella pagina del nuovo repository vuoto, clicca "uploading an existing file"
4. Trascina dentro TUTTI i file e le cartelle di questo progetto (tranne node_modules, che non esiste ancora, e .env.local, che non deve MAI essere caricato)
5. Clicca "Commit changes"

## Come collegarlo a Vercel

1. Su vercel.com, clicca "Add New" -> "Project"
2. Seleziona il repository "elettropreventivi" da GitHub
3. Prima di premere "Deploy", apri "Environment Variables" e aggiungi:
   - NEXT_PUBLIC_SUPABASE_URL = (il valore dal tuo file .env.local)
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = (il valore dal tuo file .env.local)
4. Premi "Deploy"

Dopo qualche minuto il sito sarà online su un indirizzo tipo elettropreventivi.vercel.app

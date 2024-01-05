**NB. EDIT al 01/05/2024**

L'autenticazione è il processo attraverso il quale l'utente viene certificato e riceve un token per accedere all'applicazione. Il token è valido per un certo lasso di tempo (tempo medio di attività: 1 ora). Al termine di questo periodo, l'utente dovrà eseguire nuovamente l'autenticazione.

## Processo di Autenticazione

Oltre all'autenticazione, sono stati implementati i processi di Registrazione e di Accesso, i quali seguono il workflow descritto di seguito:

### 1. Validazione

L'utente inserisce i propri dati, i quali vengono validati utilizzando il Validator della libreria `FluentValidation`. Successivamente, i dati vengono controllati per verificarne la correttezza, e il processo continua in base a ciò che viene rilevato.

### 2. Criptazione

Nel caso di registrazione, la password inserita viene criptata prima di essere salvata nel database. Durante i successivi login, la password inserita viene nuovamente criptata per confrontarla con quella precedentemente salvata. La criptazione è gestita tramite la libreria `Bcrypt-Next.Net`.

### 3. Autenticazione

Se la validazione della password è eseguita correttamente, viene restituito un token all'utente, consentendogli l'accesso all'applicazione fino alla scadenza del token.

## Fluent Validation

Per la validazione, sono state utilizzate due librerie:

- `FluentValidation`: una libreria intuitiva e semplice, utilizzata insieme a `FluentValidation.AspNet` per consentire l'injection diretta dei validatori nei costruttori senza creare nuovi oggetti in ogni classe.
- `AppAny.HotChocolate.FluentValidation`: una libreria di integrazione di HotChocolate direttamente nei parametri delle Mutation/Query per semplificare l'integrazione.

Per abilitare la validazione, è stato inserito il seguente codice nel `Program.cs`:

csharpCopy code

`// Fluent Validation builder.Services.AddFluentValidationAutoValidation(); builder.Services.AddTransient<UserValidator>();`

Inoltre, nella parte di GraphQL è stata aggiunta la validazione direttamente sui parametri della Mutation/Query:

csharpCopy code

`public async Task<User> CreateUserAsync(**[UseFluentValidation, UseValidator<UserValidator>]** User user, [Service] IUserRepository userRepository) {     var res = await userRepository.InsertAsync(user);      return res; }`

## Criptazione

Per la criptazione delle password, è stata utilizzata la libreria `Bcrypt-next`. Questa libreria automatizza il processo di creazione e verifica del salt, semplificando il processo di crittografia.

La gestione della criptazione è contenuta nella classe `AuthenticationUtils` all'interno della cartella `Backend.Utils`.

## Backend.Utils

È stata creata una libreria separata, `Backend.Utils`, nel progetto per gestire i file utils, al fine di non influire sui modelli già presenti nel progetto.

## FAQ

**Domanda:** Come funziona una volta eseguita l'autenticazione? Il token viene aggiornato ad ogni chiamata successiva per evitare la scadenza durante l'utilizzo?

_Risposta:_ Sì, il token viene automaticamente aggiornato ad ogni chiamata successiva, evitando così la scadenza durante l'utilizzo continuato dell'applicazione.
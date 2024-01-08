# Organizzazione del progetto

Il progetto è organizzato in tre rami principali, ciascuno responsabile di un aspetto specifico dell'architettura:

- **Backend.API** — Questo ramo gestisce l'avvio del progetto e implementa GraphQL, occupandosi anche della gestione del database. Qui sono definite le query, mutations, subscriptions, resolvers e i tipi GraphQL necessari per l'interazione con il Frontend.
- **Backend.Core** —\***\*\*\*\*\***\*\*\*\*\***\*\*\*\*\*** - In questa sezione, vengono create le entità POCO (Plain Old C# Objects) che rappresentano gli oggetti di base del backend. Queste entità sono utilizzate per definire la struttura del database in un approccio Code First. Inoltre, questo ramo definisce le interfacce dei repositories, fornendo un'astrazione per l'accesso ai dati.
- **Backend.Infrastructure** — Si occupa della comunicazione con il database, comprendendo la creazione del contesto (Context) del database e la definizione dei repositories necessari per modificare i dati. Questo ramo svolge un ruolo chiave nell'implementazione della logica di accesso ai dati, garantendo una gestione efficiente delle operazioni di lettura e scrittura nel database.
- **Backend.Utils** — Contiene tutte le classi di Utility messe a disposizione di tutta la soluzione.

## Backend.API

Questo costituisce il nucleo del progetto all'interno della soluzione, originariamente creato come un progetto [ASP.NET](http://asp.net/) Core Empty. Le sue responsabilità principali includono:

- **Startup Project:** La gestione del punto di avvio del programma è affidata al file `Program.cs`. Al suo interno, vengono implementate le seguenti funzionalità:
  - Utilizzo del Context per la comunicazione con il Database.
  - Implementazione di GraphQL, comprese Query, Mutations e Subscriptions, oltre alla definizione dei Type e dei Resolver.

### Dependency Injection

Dentro la directory "Configuration" sono definite tutti i servizi che verranno installati su `Program.cs`. I servizi in questione sono:

- Servizio di configurazione di MongoDB
- Servizio di configurazione di FluentValidation
- Servizio di configurazione di HotChocolate
- Servizio di inizializzazione dei repository

### Mutations, Queries, Subscriptions Folders

Ognuna di queste cartelle contiene definizioni suddivise in classi corrispondenti ai loro nomi. L'implementazione di queste parti di GraphQL è strutturata in diverse sottoclassi, migliorando la leggibilità e l'organizzazione del codice.

Per aggiungere una nuova classe a una di queste cartelle, è necessario applicare il decoratore `[ExtendObjectType(Name = "<Operation>")]` può essere `Query`, `Mutation` o `Subscription`, a seconda della cartella e del suo scopo. Questo approccio garantisce una chiara estensione delle operazioni GraphQL, mantenendo una struttura coerente e ben organizzata.

Esempio di implementazione:

```csharp
[ExtendObjectType(Name = "Mutation")]
public class ProductMutation
{
   // Mutation Methods
}
```

È importante notare che, per garantire il corretto funzionamento della nuova classe, è essenziale aggiungere la sua definizione anche all'interno del `Program.cs` nella sezione apposita. Questo assicura la coerenza e la corretta esecuzione delle operazioni GraphQL all'interno del programma.

Sezione apposita:

```csharp
// GraphQL
builder.Services
    .AddGraphQLServer()
    .AddQueryType(d => d.Name("Query")) // Queries section
        .AddTypeExtension<ProductQuery>()
        .AddTypeExtension<CategoryQuery>()
    .AddMutationType(d => d.Name("Mutation")) // Mutations section
        .AddTypeExtension<ProductMutation>()
        .AddTypeExtension<CategoryMutation>()
    .AddSubscriptionType(d => d.Name("Subscription")) // Subscriptions section
        .AddTypeExtension<ProductSubscriptions>()
    .AddType<ProductType>()
    .AddType<CategoryResolver>()
    .AddInMemorySubscriptions();
```

### Properties Folder

Questo spazio contiene esclusivamente il file `launchsettings.json`, che racchiude le configurazioni di avvio del progetto.

**La decisione di includere anche `appsettings.Development.json` e `appsettings.json` verrà presa successivamente, in base alle esigenze.**

### Resolver Folder

Questa cartella ospita i Resolver dell'applicazione.
I Resolver in GraphQL sono estensioni per gli oggetti, fornendo un meccanismo per implementare logica aggiuntiva all'interno della nostra applicazione.

Per utilizzare un Resolver è necessario creare una nuova classe e aggiungere il decoratore `[ExtendObjectType("Name")]`. In questo contesto, "Name" rappresenta il nome dello schema dell'entità GraphQL che si desidera estendere. Di solito, questo nome corrisponde a quello dell'entità con cui si sta lavorando.

**Nel contesto specifico del nostro utilizzo, è importante definire quando e come utilizzare i Resolver rispetto alle query standard.**

### Types Folder

All'interno si trovano i Types dell'applicazione.

**Questa sezione sarà rivista una volta che lo studio dettagliato dei Types sarà stato completato.**

## Backend.Core

Questo ramo, dichiarato come libreria con riferimento a `Backend.API`, si occupa esclusivamente di due attività fondamentali:

1. **Definizione delle entità**
2. **Definizione delle interfacce dei Repository**

Con poche dipendenze, è progettato per definire in modo preciso le entità necessarie per la comunicazione con il Database MongoDB.

### Entities Folder

Contiene la definizione di tutte le entità POCO utilizzate nell'applicativo. Le entità create qui formano anche la definizione delle entità nel database (Code First).

- **`BaseEntity.cs`** — - Tutte le entità sono specializzazioni di questa classe, che possiede caratteristiche comuni tra tutte le entità. Ogni entità deve estendere questa classe di base.

### Repositories Folder

Questa sezione contiene la definizione di tutte le interfacce dei repository. Le interfacce fungono da guida per l'implementazione delle rispettive classi Repository, semplificando il codice e rendendolo più dichiarativo. I repository vengono infine istanziati all'interno di `Backend.Infrastructure.Repositories`.

I Repository costituiscono il layer di comunicazione tra il Backend e il Database, gestendo tutte le query per acquisire o modificare i dati nel Database.

- **`IBaseRepository.cs`** — - Un'interfaccia generica adattabile a tutte le interfacce dei repository. Contiene i metodi che ogni interfaccia dei repository deve implementare.
- L’implementazione di `IBaseRepository` - consiste nel seguente frammento di codice:
  ```csharp
  public interface IProductRepository : IBaseRepository<Product>
  {
  	// Other things.
  }
  ```
  Implementando `IBaseRepository` e passandogli come Generics l’entità legata alla repository.

## Backend.Infrastructure

Questa sezione, dichiarata come libreria con riferimento a `Backend.API`, gestisce la comunicazione con il database, focalizzandosi principalmente su tre compiti principali:

- **Definizione delle Repositories:** Responsabili della comunicazione tra il Backend e il Database.
- **Definizione del Context del Database:** Gestisce le operazioni di accesso e gestione dati del database.
- **Definizione delle Classi di Configurazione:** Rappresenta le configurazioni del database.

### Repositories Folder

Questa cartella si occupa dell'implementazione delle Repositories per la comunicazione con il database. Le Repositories implementano sempre il `BaseRepository`, il quale si occupa dell'autoimplementazione dei principali metodi richiesti da tutti i Repositories.

Le repositories create all'interno di questa cartella devono:

- Estendere la classe `BaseRepository`, specificando l'entità che deve essere modificata come parametro generico.
- Implementare l'interfaccia di repository creata in `Backend.Core.Repositories`.

Esempio di implementazione:

```csharp
public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
{
    public CategoryRepository(IDbContext context) : base(context) { }

		// Other things.
}
```

Dove `<Category>`è l’entità e `ICategoryRepository` è l’interfaccia della repository. Inoltre tutte le Repositories devono avere un costruttore in cui implementano il context del database per poter funzionare.

### Data Folder

Questa cartella contiene la definizione dell'interfaccia del Context `IDbContext.cs`, insieme alla sua implementazione `DbContext.cs`.
Inoltre, include `ContextSeed.cs`, responsabile del popolamento del database con le entità. Questo file è utilizzato durante la costruzione della struttura e per il debug. **È importante notare che deve essere eliminato in seguito**.

### Configurations Folder

Qui sono presenti le classi di configurazione per il progetto. Attualmente, include solo il POCO di configurazione del Database, `MongoDbConfiguration.cs`.

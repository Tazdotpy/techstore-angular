# TechStore RD — Angular SPA (Práctica 4)

## What this is
The Angular SPA rebuild of TechStore RD, a school ecommerce project (Práctica 4 of 4).
Prácticas 1–3 (HTML5, CSS3, vanilla JS) live in `/home/kevin/TechStore/`.
This is a standalone Angular 22 project — treat it independently.

## Run it
```bash
cd /home/kevin/techstore-angular
ng serve          # → http://localhost:4200
ng build          # production build → dist/techstore-angular/browser/
```

## Business context
- Store: **TechStore RD** — electronics ecommerce
- Founder: **Gaggleman**, founded 2025
- Location: **Santo Domingo, República Dominicana** (NOT Chile, NOT anywhere else)
- Currency: **RD$** (Dominican pesos) — never USD, never Chilean pesos
- Tax: **ITBIS 18%** (NOT IVA 19%)
- Phone: 809-000-1111 · Email: gagglecorp@nah.com
- Tone: accessible, honest, small-business

## Design
- **Color palette:** dark grey background (`#111111`/`#1E1E1E`) + amber/orange accents (`#D97706`/`#F59E0B`)
- **Never reintroduce blue** as a primary color
- Bootstrap 5 is installed as a dependency

## File structure
```
src/app/
├── app.ts / app.html / app.scss / app.config.ts / app.routes.ts
├── models/
│   ├── producto.ts        — Producto interface
│   ├── carrito-item.ts    — CarritoItem interface
│   └── orden.ts           — Orden interface
├── services/
│   ├── producto.ts        — loads productos via HttpClient from public/productos.json
│   ├── carrito.ts         — cart state (BehaviorSubject), LocalStorage persistence
│   ├── auth.ts            — login/logout, localStorage-backed session
│   ├── tema.ts            — dark/light theme toggle, localStorage persistence
│   ├── favoritos.ts       — favorites list, LocalStorage persistence
│   └── historial.ts       — purchase history, LocalStorage persistence
├── components/
│   ├── navbar/            — top nav with cart badge, search, theme toggle
│   ├── footer/            — site footer
│   ├── product-card/      — reusable card (@Input: producto)
│   ├── search-bar/        — search input (@Output: searchChange)
│   └── category-menu/     — category filter (@Output: categoryChange)
├── pages/
│   ├── home/              — hero + featured products (eager-loaded)
│   ├── productos/         — product listing with search/filter (lazy)
│   ├── detalle-producto/  — product detail, route param :id (lazy)
│   ├── carrito/           — cart view (lazy)
│   ├── checkout/          — checkout form, guarded by authGuard (lazy)
│   ├── contacto/          — contact form (lazy)
│   ├── favoritos/         — favorites list (lazy)
│   ├── historial/         — purchase history, guarded by authGuard (lazy)
│   ├── login/             — login form (lazy)
│   └── not-found/         — 404 page (eager-loaded, wildcard **)
├── guards/
│   └── auth-guard.ts      — protects /checkout and /historial
├── interceptors/
│   └── auth-interceptor.ts
└── pipes/
    └── descuento-pipe.ts  — custom pipe for discount display

public/
└── productos.json         — 21 products, loaded via HttpClient
```

## Architecture notes
- **Standalone components** throughout — no NgModules
- **Lazy loading** on all page routes except Home and NotFound
- **RxJS** — BehaviorSubject for cart/auth/favorites state; combineLatest, map, filter, tap, catchError in services
- **Reactive Forms** in checkout and contacto
- **Pipes used:** DecimalPipe, DatePipe, UpperCasePipe (built-in) + custom `descuento-pipe`
- Data flow: services hold state as BehaviorSubject → components subscribe via `async` pipe or `.subscribe()`

## Angular concepts covered (rubric checklist)
Components, Routing (lazy loading), all 4 data binding types, *ngIf/*ngFor/*ngSwitch/[ngClass],
Services (injectable), @Input/@Output, Reactive Forms, HttpClient, RxJS, Pipes (built-in + custom),
LocalStorage, Guards, Interceptors, Lazy Loading.

## Bonus features implemented
- Dark mode toggle (TemaService + localStorage)
- Lista de favoritos (FavoritosService + localStorage)
- Historial de compras (HistorialService + localStorage)

## Naming conventions
- Spanish names for domain concepts: `carritoItems`, `agregarProducto`, `totalConImpuesto`
- TypeScript interfaces in PascalCase: `Producto`, `CarritoItem`, `Orden`
- Services injected via `inject()` (Angular 22 style), not constructor injection
- Files use kebab-case matching Angular CLI defaults

## Working style
- Kevin is a college student learning web dev — explain *why*, not just *what*, especially
  for Angular-specific concepts (signals, RxJS operators, DI, etc.)
- He mixes Spanish/English casually — respond in kind; code/content in Spanish
- Prefers concrete fixes over long explanations when something is visibly broken

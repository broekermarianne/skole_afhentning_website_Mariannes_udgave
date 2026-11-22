# Afhentning — landingpage

One-page landingside bygget med [Astro](https://astro.build) + Tailwind, lavet til deploy på Cloudflare Pages.

## Udvikling

```bash
npm install
npm run dev
```

Siden kører på `http://localhost:4321`.

## Indhold / branding

Rediger [src/site.config.ts](src/site.config.ts) for at sætte:

- `productName` — det endelige produktnavn (erstatter "Afhentning" alle steder på siden)
- `authorName` / `linkedinUrl` — bruges i "Historien bag"-sektionen
- `contactEmail` — vises i footeren

## Kontaktformular (pilot-tilmelding)

Formularen ([src/components/CtaForm.astro](src/components/CtaForm.astro)) sender til en Cloudflare
Pages Function på [functions/api/contact.ts](functions/api/contact.ts), som videresender henvendelsen
som e-mail via [Resend](https://resend.com).

For at aktivere det:

1. Opret en gratis konto på resend.com og hent en API-nøgle.
2. (Valgfrit men anbefalet) Verificér et domæne i Resend, så `CONTACT_FROM_EMAIL` kan være en adresse
   på dit eget domæne. Uden verificeret domæne kan du bruge `onboarding@resend.dev` som afsender i test.
3. I Cloudflare Pages → Settings → Environment variables, sæt (som secrets i produktion):
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` — den adresse henvendelser skal lande hos
   - `CONTACT_FROM_EMAIL` — afsenderadressen, fx `pilot@dit-domæne.dk`

Se [.env.example](.env.example).

## Deploy til Cloudflare Pages

1. Push repoet til GitHub.
2. I Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Build settings:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Sæt miljøvariablerne fra afsnittet ovenfor.
5. Deploy — Pages Functions i `functions/` bliver automatisk en del af deployet.

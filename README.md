# Freelance Marketplace (Pi Escrow)

Complete Steps 1–12 included.

## Run
```bash
cp .env.example .env
docker compose up --build
# Web: http://localhost:5173
# API: http://localhost:4000/api/health
# Docs: http://localhost:4000/api/docs
```

## Major Modules
- Auth, Profiles, Categories, Gigs
- Jobs & Proposals, Orders & Milestones (Pi escrow mock)
- Messaging (Socket.io), Reviews, Disputes
- Wallets & Invoices (PDF), Admin metrics
- CI/CD (GitHub Actions), Nginx sample

See `docs/PLAN.md` for diagrams and flows.

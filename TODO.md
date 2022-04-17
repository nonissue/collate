- [ ] Prisma Singleton / Connection pooling
- [ ] Figure out ROBUST way to share type info between client + server.
  - [ ] TRPC seems a bitover kill...
- [ ] Either use supabase auth with prisma, or switch to next-auth
  - [ ] Ah, interesting
- [ ] Layout?

## Auth

- Interesting, `supabase` auth works independently from prisma.
  - Stores 'accounts' in the supabase auth schema.

# RTK Query and Next.js BFF

Browser server-state requests use the typed endpoints in `src/store/api.ts`.
`StoreProvider` creates a separate Redux store per mounted application. Public
Server Components still fetch catalog/product content directly from Django, so
SSR/SEO do not require a server Redux singleton. Forms, modal controls and the
local guest cart remain React state.

## Sensitive requests

Production browser auth, orders, discounts and mailing requests use the
same-origin `/api/shop/*` handlers. The proxy accepts an explicit route/method
allowlist, validates mutation Origin, obtains Django CSRF cookies and headers
server-side, forwards approved session cookies and returns private no-store
responses. Authentication cookie updates/deletions are relayed as frontend
host-only HttpOnly cookies (Secure in production).

Checkout is one browser mutation to `/api/shop/checkout`. Next.js creates the
Django order, consumes its guest capability and requests payment. Browser JSON
and Redux never receive the raw order capability. A per-order AES-GCM encrypted
HttpOnly cookie retains access for payment-only retries for 24 hours. These
cookies are visible as ciphertext in browser developer tools; JWT session cookies
also remain visible to the browser owner, although JavaScript cannot read them.
Passwords and OTP inputs necessarily travel from the browser to Next.js; SSR does
not conceal user input from its owner. Redux DevTools and persistence are disabled.

A known payment error after order creation returns the created order and
`payment: null`, allowing the current checkout form to retry payment for that
order. Mutations are not automatically retried. A lost response before the order
ID reaches the browser is still ambiguous: Django does not offer an idempotent
create-order contract, and BFF composition cannot make two upstream requests
atomic. Verify order status before manually submitting again.

## Deployment

1. Add `BFF_SESSION_SECRET` (at least 32 characters) to the Next.js runtime
   environment; generate it with `openssl rand -hex 32`. Use the same stable
   secret across replicas and deployments. Rotation invalidates outstanding
   guest payment cookies. Never use a `NEXT_PUBLIC_` prefix or commit the value.
2. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS frontend origin. Optional
   server-only `BACKEND_API_URL` overrides the upstream origin; otherwise
   `NEXT_PUBLIC_API_BASE_URL` is used. The configured site must remain a trusted
   CSRF origin on the existing backend.
3. Ensure `/api/shop/*` reaches Next.js, not a reverse proxy directly to Django.
   Forward the original Host and X-Forwarded-Proto and disable caching for these
   private responses. The repository nginx catch-all already forwards to Next.js.
4. Existing host-only cookies on `api.znves.ru` are not available on `znves.ru`.
   Users with those old sessions must sign in once through the new BFF. Profile
   sessionStorage cache is discarded; the server profile query is authoritative.
5. Verify real Safari login/OTP, password reset, guest/authenticated payment and
   payment return URLs after deployment. Unit tests and local mocks do not prove
   production domain/proxy/cookie configuration.

Default payment URL hosts are `yookassa.ru`, `yoomoney.ru`, `pay.yandex.ru` and
subdomains, HTTPS only. Server-only `PAYMENT_ALLOWED_HOSTS` may override them.
Never allow arbitrary redirect hosts.

Django IP-based limits currently use REMOTE_ADDR. Through BFF they can see the
frontend server's egress IP and aggregate limits across customers. This cannot be
fully corrected by frontend code alone; backend/reverse-proxy trusted-client-IP
handling must be reviewed before enabling high-volume password recovery. No
backend code was changed by this migration.

## Cache ownership and tests

RTK Query owns browser deduplication, lifetimes and domain tags. Old browser
profile/sessionStorage and order module caches were removed; remaining public
module caches only serve SSR. Successful order/payment actions invalidate Orders,
Catalog and Product. Identity transitions and logout reset RTK state so late
responses cannot restore the previous customer's data.

Mock mode keeps existing fixtures and MSW endpoints; checkout mock composition
never creates a real order/payment. Tests cover isolation, deduplication,
invalidation, session reset, serializable errors, cookie/CSRF continuity,
capability redaction/tampering, payment hostname checks and Origin/path rejection.

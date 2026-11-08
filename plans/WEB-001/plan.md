# WEB-001 — Domain and GitHub Pages configuration investigation

## Goal

Record the authoritative hosting state before changing publishing configuration. Resolve the discrepancy between the user-confirmed `http://leifcnp.com/` result, the former Hugo `baseURL` value of `https://www.leifcnp.com/`, and `docs/CNAME` containing `leifcnp.com`. The former configuration was removed with the legacy working tree on 2026-09-24; this task now investigates the live hosting state and current Vite Pages output.

## Dependencies

- The exact investigation scope in `WEBSITE_TODO.md` (read before starting this task).
- DNS access through GoDaddy and repository or GitHub Pages settings access when the task is explicitly resumed.
- An environment with working DNS and a browser or HTTP client.

## Scope and exclusions

In scope: observe DNS records, GitHub Pages custom-domain and HTTPS settings, and all four URL variants (`http`/`https` × apex/`www`); identify the intended canonical URL and document evidence, uncertainty, redirects, and proposed alignment. The current build/deploy mechanism is Vite output in `docs/` from `master`.

The original investigation excludes DNS/domain registration, publishing or access
changes. The user subsequently approved only GitHub Pages Enforce HTTPS after
reviewing the concrete evidence; that follow-up is recorded below. No further
DNS, domain, CNAME or hosting change is authorized by this task.

## Steps

1. Capture the current repository values for `docs/CNAME`, Vite build/deploy configuration, and any redirect metadata; consult Git history only when the former Hugo `baseURL` is needed as historical context.
2. From a DNS-capable environment, record apex and `www` A/AAAA/CNAME records, TTLs, and any GoDaddy forwarding rules with timestamp and source.
3. Inspect GitHub Pages’ selected branch/folder, custom-domain value, HTTPS availability/enforcement, and the latest deployment state.
4. Request each URL variant without following redirects first, then follow redirects and record status, `Location`, certificate hostname, and final content host.
5. Compare observed behavior with the desired canonical URL and write a recommendation that names every file or setting that would need future alignment.
6. Attach evidence and remaining uncertainty to WEB-001; do not mark it complete until all acceptance criteria are covered.

## Module and evidence boundaries

This is an operational investigation, so it has no application API. Store a concise, dated evidence record with commands/settings sources and redact credentials. Treat GoDaddy and GitHub as external sources; do not copy secrets into the repository.

## Acceptance checks

- DNS observations cover apex and `www`, including record type and observed target.
- GitHub Pages custom-domain and HTTPS settings are recorded.
- HTTP and HTTPS behavior is recorded for both hostnames, including redirect and certificate results.
- The intended canonical URL and any required `baseURL`, `docs/CNAME`, redirect, or DNS changes are explicit.
- Uncertainty and the next safe action are documented, with no settings changed by the investigation.

## Risks and alternatives

- Split DNS, cached DNS, or regional propagation can produce conflicting results; record resolver, network, and timestamp, and repeat from a second resolver before concluding.
- A browser may hide redirects or mixed-content errors; pair browser evidence with raw headers and certificate inspection.
- If settings access is unavailable, document that limitation and leave the task in Blocked with the exact access needed.

## Deliverables

- A dated investigation note attached to WEB-001.
- A canonical-host recommendation and a follow-up change list, if any.

## Review gate

Configuration changes require a concrete owner decision. The user explicitly
approved Enforce HTTPS after the investigation; root applied only that setting.
The full recorded evidence still requires independent MR review.

## Implementation status

Investigation and specifically approved HTTPS follow-up are verified. See the
current evidence below; historical September observations are superseded.

## Current investigation and approved follow-up — 2026-11-07

Read-only public/authoritative DNS, strict curl/OpenSSL TLS and authenticated
GitHub Pages settings were inspected. Apex and www certificates now validate;
custom domain remains leifcnp.com, publishing master/docs. The user explicitly
approved ONLY Enforce HTTPS. Root enabled it, observed persistence after reload;
a separate Sol worker verified all four URLs finish at https://leifcnp.com/,
strict TLS and byte-identical current deployment assets, with unchanged DNS.
Initial HTTP edge responses expired before the redirect became visible; no
re-toggle, credential or DNS change occurred. The original /tmp raw bundle was lost on interruption. Newly recovered current
public evidence is in artifacts/web001/; historical account observations are
explicitly attributed, and lost raw files are not represented as retained.
Status: implementation/verification and durable public report complete; final
independent review/MR integration pending in the shared WEB-016 batch.
GoDaddy account UI was not needed: both authoritative domaincontrol.com servers
provided live zone evidence. The obsolete Hugo baseURL is not a current input.

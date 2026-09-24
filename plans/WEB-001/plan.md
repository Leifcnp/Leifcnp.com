# WEB-001 — Domain and GitHub Pages configuration investigation

## Goal

Record the authoritative hosting state before changing publishing configuration. Resolve the discrepancy between the user-confirmed `http://leifcnp.com/` result, the former Hugo `baseURL` value of `https://www.leifcnp.com/`, and `docs/CNAME` containing `leifcnp.com`. The former configuration was removed with the legacy working tree on 2026-09-24; this task now investigates the live hosting state and current Vite Pages output.

## Dependencies

- The exact investigation scope in `WEBSITE_TODO.md` (read before starting this task).
- DNS access through GoDaddy and repository or GitHub Pages settings access when the task is explicitly resumed.
- An environment with working DNS and a browser or HTTP client.

## Scope and exclusions

In scope: observe DNS records, GitHub Pages custom-domain and HTTPS settings, and all four URL variants (`http`/`https` × apex/`www`); identify the intended canonical URL and document evidence, uncertainty, redirects, and proposed alignment. The current build/deploy mechanism is Vite output in `docs/` from `master`.

Out of scope: changing DNS, domain registration, GitHub Pages settings, `baseURL`, `docs/CNAME`, or redirects while performing the investigation. This plan preserves the exact “investigation only” requirement in the repository TODO.

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

The owner reviews the evidence and explicitly requests any configuration change as a separate task. Until then this remains unexecuted investigation work.

## Implementation status

Planned and intentionally unexecuted; the repository TODO says not to change domain or site configuration as part of this investigation.

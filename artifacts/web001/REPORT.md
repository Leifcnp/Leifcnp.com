# WEB-001 public verification — 2026-11-08

The current canonical URL is **https://leifcnp.com/**. Public checks at
15:27:11–15:27:19 UTC passed without a TLS bypass. No configuration was changed
by this evidence recovery. The former `/tmp/web001-investigation` evidence was
lost; this report distinguishes newly captured observations from historical
account observations supplied by the root agent.

## Current public observations

Both authoritative servers (`ns07.domaincontrol.com`, `ns08.domaincontrol.com`)
and public resolvers `1.1.1.1` and `8.8.8.8` agree on apex A `185.199.108.153`,
no apex AAAA or CNAME, and www CNAME `leifcnp.github.io`. Authoritative TTLs are
600 seconds for apex A, 1,800 for www CNAME and 3,600 for apex NS. The authoritative
SOA serial is `2023051000`. Recursive www A/AAAA answers follow the CNAME to
GitHub's four IPv4 and four IPv6 addresses. This matches the root-supplied earlier
DNS observations; it does not establish an exhaustive zone history.

| Requested URL | Initial status | Redirect | Final status |
| --- | --- | --- | --- |
| http://leifcnp.com/ | 301 | https://leifcnp.com/ | 200 |
| http://www.leifcnp.com/ | 301 | https://leifcnp.com/ | 200 |
| https://leifcnp.com/ | 200 | None | 200 |
| https://www.leifcnp.com/ | 301 | https://leifcnp.com/ | 200 |

Curl's strict TLS verification returned zero for every chain. Independent OpenSSL
checks used `-verify_hostname` and `-verify_return_error`; both hostnames passed.
Both served the same Let's Encrypt YR1 certificate with SANs `leifcnp.com` and
`www.leifcnp.com`, valid 2026-11-08 04:11:39 UTC through 2027-02-06 04:11:38 UTC.
The SHA-256 certificate fingerprint is
`D1:7D:AA:F8:61:45:DF:A2:56:A4:2A:2D:DD:EB:14:DE:05:A2:26:0F:B0:C2:91:2A:86:1A:7A:EA:25:9E:8C:6A`.

Public GitHub Actions metadata reports successful Pages deployment run
[42450114293](https://github.com/Leifcnp/Leifcnp.com/actions/runs/42450114293),
completed at 05:16:54 UTC for master SHA
`812e02fc2517d02165241289f31ea58a644e4fc0`. The public `index.html`,
`assets/index-CxlYBWZO.js`, `assets/index-yKZlOFjO.css` and `favicon.svg` are
byte-identical to that SHA's tracked `docs/` files. Their sizes and SHA-256 hashes
are preserved in `public-checks.json`. Comparisons deliberately use `git show`
of that base, because the working tree contains later candidate build output.
This establishes the observed four files, not every possible deployed resource.

## Historical account observation and authorization

The root agent reports that the signed-in GitHub Pages settings initially showed
publishing from **master / docs**, custom domain **leifcnp.com**, and Enforce HTTPS
unchecked. Following the user's explicit approval limited to Enforce HTTPS, root
enabled that checkbox and verified it remained checked after reload. Root also
reports a separate Sol public verification at 05:36 UTC reaching HTTPS apex from
all four URLs, valid certificates and unchanged DNS. These are attributed session
observations; this recovery worker did not inspect account settings, and the lost
raw files are not recreated or represented as retained evidence.

## Recommendation, limits and reproduction

Keep `public/CNAME` and generated `docs/CNAME` as `leifcnp.com`, retain master/docs
publishing, and use HTTPS apex in current links. No further DNS, domain, CNAME,
redirect or application `baseURL` change is indicated. The removed Hugo `baseURL`
is historical and is not an input to the Vite site.

Run `python3 artifacts/web001/reproduce.py` from the repository root with Python 3,
Git, dig, curl, OpenSSL and permitted network access. It overwrites
`public-checks.json` with timestamped raw commands/results, certificates and asset
hashes; no asset bodies or credentials are retained. `deployment-runs.json` is a
bounded projection of the unauthenticated public Actions response, with source
URL and retrieval window. Network operations needed approved sandbox escalation;
the initial unprivileged attempt failed before DNS resolution.

GoDaddy's account UI/forwarding configuration was not inspected. Authoritative
DNS and the observed GitHub HTTP responses cover effective public behavior from
this VM; they cannot prove every regional cache or forwarding-account setting.
No settings change is needed to resolve those limits. This artifact awaits the
normal independent review and integration gates; it does not itself mark WEB-001
Done or certify the later feature candidate's deployment.

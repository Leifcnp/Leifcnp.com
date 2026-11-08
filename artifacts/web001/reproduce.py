#!/usr/bin/env python3
"""Read-only public WEB-001 checks; run from repository root with network access."""
import datetime, hashlib, json, pathlib, subprocess
out = pathlib.Path('artifacts/web001')
base = '812e02fc2517d02165241289f31ea58a644e4fc0'
records = []
def run(args):
    p = subprocess.run(args, capture_output=True)
    records.append({'command': args, 'exit': p.returncode, 'stdout': p.stdout.decode(errors='replace'), 'stderr': p.stderr.decode(errors='replace')})
    return p
started = datetime.datetime.now(datetime.timezone.utc).isoformat()
for resolver in ['ns07.domaincontrol.com', 'ns08.domaincontrol.com', '1.1.1.1', '8.8.8.8']:
    for host in ['leifcnp.com', 'www.leifcnp.com']:
        for kind in ['A', 'AAAA', 'CNAME', 'NS']:
            run(['dig', '@'+resolver, host, kind, '+time=5', '+tries=1', '+noall', '+answer', '+authority', '+comments'])
for url in ['http://leifcnp.com/', 'http://www.leifcnp.com/', 'https://leifcnp.com/', 'https://www.leifcnp.com/']:
    run(['curl', '--noproxy', '*', '--silent', '--show-error', '--location', '--max-redirs', '5', '--max-time', '30', '--dump-header', '-', '--output', '/dev/null', '--write-out', '\nFINAL %{url_effective} STATUS %{http_code} TLS_VERIFY %{ssl_verify_result}\n', url])
for host in ['leifcnp.com', 'www.leifcnp.com']:
    p = subprocess.run(['openssl', 's_client', '-connect', host+':443', '-servername', host, '-verify_hostname', host, '-verify_return_error', '-showcerts'], input=b'', capture_output=True, timeout=30)
    records.append({'command': ['openssl', 's_client', '-connect', host+':443', '-servername', host, '-verify_hostname', host, '-verify_return_error', '-showcerts'], 'exit': p.returncode, 'stdout': p.stdout.decode(errors='replace'), 'stderr': p.stderr.decode(errors='replace')})
    cert = subprocess.run(['openssl', 'x509', '-noout', '-subject', '-issuer', '-dates', '-ext', 'subjectAltName', '-fingerprint', '-sha256'], input=p.stdout, capture_output=True)
    records.append({'certificate_for':host, 'exit':cert.returncode, 'stdout':cert.stdout.decode(), 'stderr':cert.stderr.decode()})
assets = []
for path in ['docs/index.html', 'docs/assets/index-CxlYBWZO.js', 'docs/assets/index-yKZlOFjO.css', 'docs/favicon.svg']:
    expected = subprocess.run(['git', 'show', base+':'+path], capture_output=True, check=True).stdout
    url = 'https://leifcnp.com/'+path.removeprefix('docs/')
    p = subprocess.run(['curl','--noproxy','*','--silent','--show-error','--fail','--max-time','30',url], capture_output=True)
    assets.append({'url':url,'exit':p.returncode,'stderr':p.stderr.decode(),'expected_bytes':len(expected),'public_bytes':len(p.stdout),'expected_sha256':hashlib.sha256(expected).hexdigest(),'public_sha256':hashlib.sha256(p.stdout).hexdigest(),'matches_base':p.returncode==0 and p.stdout==expected})
result = {'started_utc':started,'finished_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'comparison_base':base,'checks':records,'assets':assets}
(out/'public-checks.json').write_text(json.dumps(result, indent=2)+'\n')
print(json.dumps({'started':started,'failures':[r for r in records if r.get('exit')], 'assets':assets},indent=2))

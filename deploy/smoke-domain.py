"""Checks public HTML, compiled assets, dashboard and real Swagger JSON without credentials."""
import json
import re
import time
import urllib.request
from urllib.parse import urljoin

base = 'https://driverhub.guelfi.com.br'

def get(path, kind):
    request = urllib.request.Request(urljoin(base + '/', path), headers={'User-Agent': 'Mozilla/5.0 (compatible; OCI-Deploy-Check/1.0)'})
    with urllib.request.urlopen(request, timeout=15) as response:
        body = response.read().decode()
        assert response.status == 200, path
        assert kind in response.headers.get('Content-Type', ''), path
        return body

last = None
for attempt in range(18):
    try:
        for path in ('/', '/driverhub-admin/'):
            html = get(path, 'text/html')
            assets = re.findall(r'(?:src|href)="([^"]+\.(?:js|css))"', html)
            assert assets, f'No compiled assets: {path}'
            for asset in assets:
                get(asset, 'javascript' if asset.endswith('.js') else 'text/css')
        get('/swagger/index.html', 'text/html')
        document = json.loads(get('/swagger/v1/swagger.json', 'application/json'))
        assert document.get('openapi') and document.get('paths')
        print('Public frontend, dashboard, assets and API Swagger passed.')
        break
    except Exception as error:
        last = error
        if attempt == 17:
            raise
        time.sleep(10)

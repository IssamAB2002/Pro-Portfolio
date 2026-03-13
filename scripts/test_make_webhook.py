import json
import os
import sys

import requests


def main():
    url = os.environ.get("MAKE_WEBHOOK_URL", "").strip()
    if not url:
        print("Missing MAKE_WEBHOOK_URL env var.", file=sys.stderr)
        return 2

    payload = {
        "full_name": "Youcef KH",
        "email": "youcef.2002@kh.com",
        "service": "Full Product",
        "budget": "95000 DA",
        "timeline": "5 weeks",
        "phone": "+2135557843967",
        "message": "i need you to create a full integreated app, contact me asap",
    }

    response = requests.post("https://hook.eu1.make.com/ubsrtp8ar8nv1c9nssfkghvzefxampqv", json=payload, timeout=(3.05, 10))
    print(f"Status: {response.status_code}")
    if response.text:
        try:
            print(json.dumps(response.json(), indent=2))
        except Exception:
            print(response.text)
    return 0 if response.ok else 1


if __name__ == "__main__":
    raise SystemExit(main())


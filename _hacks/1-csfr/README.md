A01:2021 – Broken Access Control

Accessing API with missing access controls for POST, PUT and DELETE.
CORS misconfiguration allows API access from unauthorized/untrusted origins.

Fix:
Implement access control mechanisms once and re-use them throughout the application, including minimizing Cross-Origin Resource Sharing (CORS) usage.

Durch falsch konfigurierte Cookies, lassen sich von aussen API routen mit dem session-cookie die der User auf seiner Maschine hat in dessen "Namen" ausführen

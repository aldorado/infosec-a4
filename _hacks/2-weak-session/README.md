A07:2021 – Identification and Authentication Failures

- Permits brute force or other automated attacks.

Durch eine schwache SessionId wird es dem Angreifer sehr leicht gemacht ein Skript zu schreiben und alle sessionIds durchzugehen
Wenn noch dazu eine Route die session verifiziert und userdaten zurück gibt, wird das ganze nochmal leichter

UUIDs als sessionIds verwenden, so das die bruteforce attacke nicht mehr möglich ist

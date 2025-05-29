# =======================
# Proxicare - Startup Script
# =======================

# 1. Obtenir l'adresse IPv4 de la carte "Ethernet"
$ip = (Get-NetIPAddress -InterfaceAlias "Ethernet" -AddressFamily IPv4 | Select-Object -First 1).IPAddress

if (-not $ip) {
    Write-Host "ERREUR : Impossible de récupérer l'adresse IP de la carte 'Ethernet'."
    exit 1
}

Write-Host "Adresse IP détectée : $ip"

# 2. Vérifier mkcert
if (-not (Get-Command mkcert -ErrorAction SilentlyContinue)) {
    Write-Host "mkcert non trouvé. Téléchargement..."
    Invoke-WebRequest -Uri https://github.com/FiloSottile/mkcert/releases/latest/download/mkcert.exe -OutFile mkcert.exe
    Move-Item mkcert.exe "$env:SystemRoot\System32\mkcert.exe" -Force
} else {
    Write-Host "mkcert déjà installé"
}

# 3. Générer les certificats si non présents
if (-not (Test-Path "$ip.pem")) {
    Write-Host "Génération du certificat SSL pour $ip"
    mkcert $ip
} else {
    Write-Host "Certificats déjà présents"
}

# 4. Modifier .env dans nodejs-api
Write-Host "Mise à jour de nodejs-api/.env"
(Get-Content "./nodejs-api/.env") -replace 'YOUR_IP=.*', "YOUR_IP=$ip" | Set-Content "./nodejs-api/.env"

# 5. Modifier environment.ts dans angular-qrcode
$envFile = "./angular-qrcode/src/environment.ts"
Write-Host "Mise à jour de $envFile"
(Get-Content $envFile) -replace "const YOUR_IP = '.*';", "const YOUR_IP = '$ip';" | Set-Content $envFile

# 6. Lancer les serveurs dans deux terminaux distincts
Write-Host "Lancement des serveurs Node.js et Angular..."

Start-Process powershell -ArgumentList 'cd nodejs-api; npm run dev'
Start-Process powershell -ArgumentList "cd angular-qrcode; ng serve --ssl true --ssl-cert ../$ip.pem --ssl-key ../$ip-key.pem --host $ip"

Write-Host "Tous les projets ont été lancés."

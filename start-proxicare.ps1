# =======================
# Proxicare - Startup Script
# =======================

# 1. Obtenir l'adresse IPv4 de la carte "Ethernet"
$ip = (Get-NetIPAddress -InterfaceAlias "Ethernet" -AddressFamily IPv4 | Select-Object -First 1).IPAddress

if (-not $ip) {
    Write-Host "ERREUR : Impossible de récupérer l'adresse IP de la carte 'Ethernet'."
    exit 1
}

Write-Host "✅ Adresse IP détectée : $ip"

# 2. Télécharger mkcert localement si non présent
$mkcertPath = ".\mkcert.exe"
if (-not (Test-Path $mkcertPath)) {
    Write-Host "⬇️ mkcert non trouvé. Téléchargement en cours..."
    try {
        Invoke-WebRequest -Uri https://github.com/FiloSottile/mkcert/releases/latest/download/mkcert-v1.4.4-windows-arm64.exe -OutFile $mkcertPath -UseBasicParsing
        Write-Host "✅ mkcert téléchargé avec succès."
    } catch {
        Write-Error "❌ Échec du téléchargement de mkcert.exe : $_"
        exit 1
    }
} else {
    Write-Host "✅ mkcert déjà présent localement."
}

# 3. Installer le certificat racine s'il n'existe pas
$rootCAPath = "$env:LOCALAPPDATA\mkcert\rootCA.pem"
if (-not (Test-Path $rootCAPath)) {
    Write-Host "🔐 Installation du certificat racine mkcert..."
    & $mkcertPath -install
} else {
    Write-Host "🔐 Certificat racine déjà installé."
}

# 3. Générer les certificats si non présents
if (-not (Test-Path "$ip.pem")) {
    Write-Host "Génération du certificat SSL pour $ip"
    mkcert $ip
} else {
    Write-Host "✅ Certificats déjà présents"
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

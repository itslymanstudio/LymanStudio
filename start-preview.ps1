param([switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$previewUrl = 'http://127.0.0.1:3000'
$previewReady = $false
try {
    $response = Invoke-WebRequest -Uri "$previewUrl/local-preview.js" -UseBasicParsing -TimeoutSec 3
    $previewReady = $response.StatusCode -eq 200 -and $response.Content.Contains('data-local-message')
} catch {}
if (-not $previewReady) {
    $nodePath = (Get-Command node.exe -ErrorAction Stop).Source
    Start-Process -FilePath $nodePath -ArgumentList 'server.mjs' -WorkingDirectory $PSScriptRoot -WindowStyle Hidden -RedirectStandardOutput (Join-Path $PSScriptRoot 'preview.log') -RedirectStandardError (Join-Path $PSScriptRoot 'preview-error.log')
    for ($attempt = 0; $attempt -lt 20; $attempt++) {
        Start-Sleep -Milliseconds 250
        try {
            $response = Invoke-WebRequest -Uri "$previewUrl/local-preview.js" -UseBasicParsing -TimeoutSec 2
            if ($response.StatusCode -eq 200 -and $response.Content.Contains('data-local-message')) { $previewReady = $true; break }
        } catch {}
    }
}
if (-not $previewReady) { throw 'The preview could not start. Check preview-error.log; port 3000 may be in use.' }
if (-not $NoBrowser) { Start-Process $previewUrl }
Write-Host "Preview running at $previewUrl"

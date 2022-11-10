$BackupEncoding = [Console]::OutputEncoding
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$dir = (Get-Location).tostring() + "\build"
[System.IO.Directory]::CreateDirectory($dir)

$index = $dir + "\index.html"
inliner index.html | Out-File -FilePath $index

$arr = $dir + "\arrayVisualizer.html"
inliner arrayVisualizer.html | Out-File -FilePath $arr

$lightswitch = $dir + "\lightswitch.html"
inliner lightswitch.html | Out-File -FilePath $lightswitch

$time = $dir + "\time.html"
inliner time.html | Out-File -FilePath $time

$phone = $dir + "\phone.html"
inliner phone.html | Out-File -FilePath $phone

$queue = $dir + "\queue.html"
inliner queue.html | Out-File -FilePath $queue

$sort = $dir + "\sort.html"
inliner sort.html | Out-File -FilePath $sort

[Console]::OutputEncoding = $BackupEncoding
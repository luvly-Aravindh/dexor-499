<?php
// DexKor funnel - lead capture endpoint
// Receives the opt-in form payload (JSON) from the React app and stores / forwards it.

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) { $data = $_POST; }

$name = trim($data['name'] ?? '');
$wa   = trim($data['whatsapp'] ?? '');
$digits = preg_replace('/\D+/', '', $wa);

if ($name === '' || strlen($digits) < 10) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'name and a valid whatsapp number are required']);
    exit;
}

$record = [
    'id'               => bin2hex(random_bytes(8)),
    'name'             => $name,
    'first_name'       => trim($data['first_name'] ?? ''),
    'whatsapp'         => $wa,
    'brand'            => trim($data['brand'] ?? ''),
    'flow'             => preg_replace('/[^a-z0-9_-]/i', '', $data['flow'] ?? ''),
    'markup_pct'       => (int)($data['markup_pct'] ?? 0),
    'monthly_messages' => (int)($data['monthly_messages'] ?? 0),
    'platform'         => trim($data['platform'] ?? ''),
    'monthly_leak'     => (int)($data['monthly_leak'] ?? 0),
    'ts'               => $data['ts'] ?? gmdate('c'),
    'ip'               => $_SERVER['REMOTE_ADDR'] ?? '',
];

// 1) Store locally, one JSON record per line.
@file_put_contents(__DIR__ . '/leads.jsonl', json_encode($record, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);

// 2) Optional: forward to your CRM / webhook. Set the URL to enable.
$FORWARD_URL = ''; // e.g. 'https://your-crm.example.com/hooks/lead'
if ($FORWARD_URL !== '' && function_exists('curl_init')) {
    $ch = curl_init($FORWARD_URL);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS     => json_encode($record, JSON_UNESCAPED_UNICODE),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 5,
    ]);
    curl_exec($ch);
    curl_close($ch);
}

echo json_encode(['ok' => true, 'id' => $record['id']]);

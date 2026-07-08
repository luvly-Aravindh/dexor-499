<?php

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid Request"
    ]);
    exit;
}

date_default_timezone_set("Asia/Kolkata");

function clean($value)
{
    if (is_array($value)) {
        return implode(", ", $value);
    }

    return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

/* Get JSON or Form Data */

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data) {
    $data = $_POST;
}

if (empty($data)) {
    echo json_encode([
        "status" => "error",
        "message" => "No data received."
    ]);
    exit;
}

/* Email Validation */

$email = "";

foreach ($data as $key => $value) {

    if (stripos($key, "email") !== false) {
        $email = clean($value);
        break;
    }

}

if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {

    echo json_encode([
        "status" => "error",
        "message" => "Invalid Email Address"
    ]);

    exit;
}

/* Save CSV */

$file = __DIR__ . "/leads.csv";

$fileExists = file_exists($file);

$fp = fopen($file, "a");

if (!$fileExists) {

    $header = ["Date"];

    foreach ($data as $key => $value) {
        $header[] = $key;
    }

    fputcsv($fp, $header);
}

$row = [date("Y-m-d H:i:s")];

foreach ($data as $value) {
    $row[] = clean($value);
}

fputcsv($fp, $row);

fclose($fp);

/* Email */

$to = "sriethiraj@getnos.io,seetharaman@getnos.io";

$subject = "New Website Lead";

$message = '
<html>
<head>
<style>
body{
font-family:Arial,sans-serif;
}
table{
border-collapse:collapse;
width:100%;
}
td{
border:1px solid #ddd;
padding:10px;
}
th{
background:#f5f5f5;
padding:10px;
}
</style>
</head>
<body>

<h2>New Website Lead</h2>

<table>

<tr>
<th>Field</th>
<th>Value</th>
</tr>';

foreach ($data as $key => $value) {

    $message .= "
    <tr>
        <td><strong>" . htmlspecialchars($key) . "</strong></td>
        <td>" . nl2br(htmlspecialchars(is_array($value) ? implode(", ", $value) : $value)) . "</td>
    </tr>";

}

$message .= "

<tr>
<td><strong>Submitted On</strong></td>
<td>" . date("d-m-Y h:i:s A") . "</td>
</tr>

</table>

</body>
</html>";

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/html;charset=UTF-8\r\n";
$headers .= "From: Website Leads <hello@getnos.io>\r\n";

if (!empty($email)) {
    $headers .= "Reply-To: $email\r\n";
}

$mail = mail($to, $subject, $message, $headers);

if ($mail) {

    echo json_encode([
        "status" => "success",
        "message" => "Lead submitted successfully."
    ]);

} else {

    echo json_encode([
        "status" => "error",
        "message" => "Mail sending failed."
    ]);

}

exit;
?>
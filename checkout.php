<?php
require __DIR__ . '/vendor/autoload.php';

MercadoPago\SDK::setAccessToken('TU_ACCESS_TOKEN');

$body = file_get_contents('php://input');
$orderData = json_decode($body, true);

$preference = new MercadoPago\Preference();

$items = [];
foreach ($orderData['items'] as $item) {
    $mp_item = new MercadoPago\Item();
    $mp_item->title = $item['title'];
    $mp_item->quantity = $item['quantity'];
    $mp_item->unit_price = $item['unit_price'];
    $mp_item->currency_id = $item['currency_id'];
    $items[] = $mp_item;
}

$preference->items = $items;
$preference->save();

echo json_encode(['preference_id' => $preference->id]);
?>

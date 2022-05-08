<?php
include 'storage.php';
include 'auth.php';
$comment_storage = new Storage(new JsonIO('comments.json'));
$comment_storage->delete($_GET['id']);
function redirect($page) {
    header("Location: ${page}");
    exit();
}
redirect("team.php?team=".$_GET['team']."");
?>
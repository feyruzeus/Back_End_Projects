<?php
include 'storage.php';
include 'auth.php';
$comment_storage = new Storage(new JsonIO('comments.json'));
$errors =[];

function redirect($page) {
    header("Location: ${page}");
    exit();
}
if (count($_POST) > 0) {
    if (!isset($_POST['comment']))
        $errors = "Comment should not be empty";


    if (count($errors) == 0) {
        $comment = [
            'team' => $_POST['team'],
            'username' => $_POST['username'],
            'comment' => $_POST['comment'],
            'date' => date('Y-m-d')
        ];
//        print_r($comment);
        $comment_storage->add($comment);
//        echo  $_POST['team'];
        redirect("team.php?team=".$_POST['team']."");
    }
}
?>
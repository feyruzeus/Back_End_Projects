<?php
    include('storage.php');
    include('userstorage.php');
    include('auth.php');
    function redirect($page) {
        header("Location: ${page}");
        exit();
    }
    session_start();
    $auth = new Auth(new UserStorage());
    $auth->logout();
    redirect('login.php');
?>
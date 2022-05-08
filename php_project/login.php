<?php
//    include 'storage.php';
//    $account_storage = new Storage(new JsonIO('accounts.json'));
//    if(count($_POST)>0){
//        if(password_verify($_POST['password'], $account_storage->findOne(['username' => $_POST['username']])['password'])){
//            // Password is correct, so start a new session
//            session_start();
//            // store user data in cookie
//            setcookie('user', json_encode([
//                'username' => $_POST['username'],
////                'password' => $_POST['password']
//            ]), time() + 3600 * 24 * 30);
//
////            echo "correct password";
//
//            if(isset($_COOKIE['user']) && !isset($_SESSION["loggedin"])) {
//                $user = json_decode($_COOKIE['user'], true);
////                // do the stuff to check if there is a user with $user['username'] and $user['password'] in the database, then if there is one, do as below :
//                $_SESSION["loggedin"] = true;
//                $_SESSION["username"] = $user['username'];
////                // else if there is no user with that credentials from cookie, do the following to prevent further checking on database :
////                $_SESSION["loggedin"] = false;
////
//            }
//
//        }
////        else echo "incorrect log in credentials";
//    }
include('storage.php');
include('userstorage.php');
include('auth.php');

// functions
function validate($post, &$data, &$errors) {
    // username, password not empty
    // ...
    $data = $post;

    return count($errors) === 0;
}
function redirect($page) {
    header("Location: ${page}");
    exit();
}

// main
session_start();
$auth = new Auth(new UserStorage());
$data = [];
$errors = [];
if ($auth->is_authenticated()){
    redirect('index.php');
}
if (count($_POST) > 0) {
    if (validate($_POST, $data, $errors)) {
        $auth_user = $auth->authenticate($data['username'], $data['password']);
        if (!$auth_user) {
            $errors['global'] = "Login error";
        } else {
            $auth->login($auth_user);
            redirect('index.php');
        }
    }
}
?>

<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <title>Stadium</title>
</head>
<body>
    <?php include 'field/header.php'?>
    <form method="post" class="login-main">
            <span>Username</span>
            <input name="username" type="text">
            <span>Password</span>
            <input name="password" type="password">
        <button type="submit" class="btn btn-primary">Log In</button>
    </form>
    <?php if (count($errors) > 0){ ?>
        <ul>
            <?php foreach($errors as $error) : ?>
                <li><?= $error ?></li>
            <?php endforeach ?>
        </ul>
    <?php }?>
</body>
</html>
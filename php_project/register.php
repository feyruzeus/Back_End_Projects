<?php
include 'storage.php';
//include 'userstorage.php';
include 'auth.php';




// add an array to storage
//$account_storage->add([
//        'username' => 'admin',
//        'email' => 'feyruz.fm.fm@gmail.com',
//        'password' => 'admin1234'
//]);

// getting all the data
//$all = $account_storage->findAll();
//print_r($all)
function validate($post, &$data, &$errors) {
    if(!isset($_POST['username'])){
        $errors[] = "Username is not set!";
    }
    else if (trim($_POST['username']) === '') {
        $errors[] = 'Username is required!';
    }
    else if(count(explode(' ', $_POST['username'])) > 1){
        $errors[] = "Username should not contain whitespaces!";
    }

    if(!isset($_POST['mail'])){
        $errors[] = "E-mail is not set!";
    }
    else if (!filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL)){
        $errors[] = "Invalid E-mail format!";
    }

    if(!isset($_POST['password'])){
        $errors[] = "Password is not set!";
    }
    else if (trim($_POST['password']) === '') {
        $errors[][] = 'Password is required!';
    }
    else if(strlen($_POST['password']) < 6){
        $errors[] = "Password can not be shorter than 6 characters!";
    }

    if(!isset($_POST['re-pass'])){
        $errors[] = "Re-Enter the password!";
    }
    elseif ($_POST['password'] !== $_POST['re-pass']){
        $errors[] = "Passwords do not match!";
    }

    $data = $post;

    return count($errors) === 0;
}
function redirect($page) {
    header("Location: ${page}");
    exit();
}
//$user_storage = new UserStorage();
$user_storage = new Storage(new JsonIO('accounts.json'));
$auth = new Auth($user_storage);
$errors = [];
$data = [];
if ($auth->is_authenticated()){
    redirect('index.php');
}
if (count($_POST) > 0){



    if (validate($_POST, $data, $errors)) {
        if ($auth->user_exists($data['username'])) {
            $errors['global'] = "User already exists";
        } else {
            echo "reg";
            $auth->register($data);
            redirect('login.php');
//
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
<form method="post" class="register-main">
        <span>Username</span>
        <input name="username" type="text">
        <span>E-mail</span>
        <input name="mail" type="text" placeholder="example@mail.com">
        <span>Password</span>
        <input name="password" type="password">
        <span>Re-enter password</span>
        <input name="re-pass" type="password">
        <button type="submit" class="btn btn-primary">Register</button>
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
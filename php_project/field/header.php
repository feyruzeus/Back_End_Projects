<div class="header">
    <a href="http://webprogramozas.inf.elte.hu/students/cjcwv4/php_assignment/">
        <div class="home">Stadium</div>
    </a>
<!--    --><?php
//    $username = $auth->authenticated_user()['username'];
//    echo $username;
    if (!$auth->is_authenticated()){ ?>
    <div class="un-authorized">
        <a href="http://webprogramozas.inf.elte.hu/students/cjcwv4/php_assignment/login.php">
            <button class="btn btn-outline-primary login">Login</button>
        </a>
        <a href="http://webprogramozas.inf.elte.hu/students/cjcwv4/php_assignment/register.php">
            <button class="btn btn-outline-primary register">Register</button>
        </a>
    </div>
    <?php }
        else {
//    ?>
    <a href="logout.php" class="authorized">
        <button type="submit" class="btn btn-outline-primary logout">Log Out (<?php echo $auth->authenticated_user()['username']?>)</button>
    </a>
    <?php
    }?>
</div>

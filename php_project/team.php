<?php
include 'storage.php';
include 'userstorage.php';
include 'auth.php';

$data = json_decode(file_get_contents("data.json"), true);
$comments = json_decode(file_get_contents("comments.json"), true);
session_start();


$user_storage = new UserStorage();
$auth = new Auth($user_storage);
$user = $auth->authenticated_user();

function redirect($page) {
    header("Location: ${page}");
    exit();
}
function idToName($id){
    $data = json_decode(file_get_contents("data.json"), true);
    foreach ($data['teams'] as $team){
        if( $team['teamid'] == $id){
            return $team['team_name'];
        }
    }
}

$errors =[];

function gameResult($res1, $res2){
    if($res1 > $res2){
        return "won";
    }
    elseif ($res1 < $res2){
        return "lost";
    }

    else return "draw";

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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>Stadium</title>
</head>
<body>
<?php include 'field/header.php';?>
<?php foreach ($data['teams'] as $team) {
    if ($team['teamid'] == $_GET['team']) { ?>
        <h2>Team <?=$team['team_name']; ?></h2>
    <?php }
}?>
<table  class="table table-sm table-striped mytable">
    <thead class="thead-dark">
    <tr>
        <th>Date</th>
        <th>Home</th>
        <th>Score</th>
        <th>Away</th>
    </tr>
    </thead>
    <?php foreach ($data['matches'] as $matches){
        if($matches['home']['id'] == $_GET['team'] && isset($matches['home']['score'])){ ?>
            <tr>
                <td><?= $matches['date']?></td>
                <td class="<?= gameResult($matches['home']['score'], $matches['away']['score']);?>"><?= idToName($matches['home']['id'])?></td>
                <td><?= $matches['home']['score']?> - <?= $matches['away']['score']?></td>
                <td><?= idToName($matches['away']['id'])?> </td>
            </tr>
        <?php }
        elseif ($matches['away']['id'] == $_GET['team'] && isset($matches['home']['score']) ){ ?>
            <tr>
                <td><?= $matches['date']?></td>
                <td ><?= idToName($matches['home']['id'])?></td>
                <td><?= $matches['home']['score']?> - <?= $matches['away']['score']?></td>
                <td class="<?= gameResult($matches['away']['score'], $matches['home']['score']);?>"><?= idToName($matches['away']['id'])?> </td>
            </tr>
         <?php
        }
    }
    ?>
</table>

<h2>Upcoming events</h2>
<table  class="table table-sm table-striped mytable">
    <thead class="thead-dark">
    <tr>
        <th>Date</th>
        <th>Home</th>
        <th>Away</th>
    </tr>
    </thead>
    <?php foreach ($data['matches'] as $matches){
    if($matches['home']['id'] == $_GET['team'] && !isset($matches['home']['score'])){ ?>
    <tr>
        <td><?= $matches['date']?></td>
        <td><?= idToName($matches['home']['id'])?></td>
        <td><?= idToName($matches['away']['id'])?> </td>
    </tr>
    <?php }
    elseif ($matches['away']['id'] == $_GET['team'] && !isset($matches['home']['score']) ){ ?>
    <tr>
        <td><?= $matches['date']?></td>
        <td><?= idToName($matches['home']['id'])?></td>
        <td><?= idToName($matches['away']['id'])?> </td>
    </tr>
    <?php
        }
    }
    ?>
</table>
<h2>Comments</h2>
    <?php if($auth->is_authenticated()){ ?>
        <form action="add.php" method="post" class="comment-input-main">
            <div>
                <input type="text" class="comment-inp" name="comment" placeholder="Your comment">
                <button type="submit" class="btn btn-outline-primary">Post</button>
            </div>
            <input type="text" name="team" value="<?= $_GET['team']?>" hidden>
            <input type="text" name="username" value="<?= $auth->authenticated_user()["username"]?>" hidden>
        </form>
   <?php }
    foreach ($comments as $comments_array){
        if ($comments_array['team'] == $_GET['team']){?>
        <div class="comment">
            <div class="comment-main">
                <i class="far fa-user"></i>
                <span class="id"><?= $comments_array['username']?></span>
            </div>
            <span class="comment-text"><?= $comments_array['comment']?></span>

            <div class="date">
                <span class="date"><?= $comments_array['date']?></span>
            </div>

            <?php if($auth->authenticated_user()['username'] === 'admin'){?>
                <a href="delete.php?id=<?= $comments_array['id']?>&team=<?= $_GET['team']?>">
                <i class="fas fa-trash"></i>
                </a>
            <?php }?>
        </div>
    <?php }
    }
    ?>

</body>
</html>
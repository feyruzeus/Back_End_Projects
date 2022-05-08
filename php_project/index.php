<?php
include 'storage.php';
include 'userstorage.php';
include 'auth.php';

$data = json_decode(file_get_contents("data.json"), true);
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
    <?php include 'field/header.php';?>
    <h2>Teams</h2>
    <form action="get">
        <table class="table table-sm table-striped mytable">
            <thead class="thead-dark">
            <tr>
                <th>Team</th>
                <th>City</th>
            </tr>
            </thead>

            <?php foreach ($data['teams'] as $teams){ ?>
                <tr>
                    <td class="team_link">
                        <a href="team.php?team=<?php echo $teams['teamid']?>"><?= $teams['team_name']?></a>
                    </td>
                    <td><?= $teams['city']?></td>
                </tr>
            <?php }?>
        </table>
    </form>
    <h2>Last 5 matches</h2>
    <table  class="table table-sm table-striped mytable">
        <thead class="thead-dark">
        <tr>
            <th>Date</th>
            <th>Home</th>
            <th>Score</th>
            <th>Away</th>
        </tr>
        </thead>
        <?php
        $cnt=0;
        foreach (array_reverse($data['matches']) as $matches){
            if(isset($matches['home']['score'])){
                if($cnt < 5){?>
                <tr>
                    <td><?= $matches['date']?></td>
                    <td><?= idToName($matches['home']['id'])?></td>
                    <td><?= $matches['home']['score']?> - <?= $matches['away']['score']?></td>
                    <td><?= idToName($matches['away']['id'])?></td>
                </tr>
        <?php $cnt = $cnt + 1;
                }
            }
        }?>
    </table>


</body>
</html>
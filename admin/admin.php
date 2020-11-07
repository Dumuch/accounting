<? session_start ();
if($_SESSION['admin_example'])
{
  $info = 'Данные из $_SESSION[\'admin_example\'] : '.$_SESSION['admin_example'];
}
else
{
  echo 'У вас недостаточно прав для просмотра данной информации! ';
  echo '<html> <head> <meta http-equiv="Refresh" content="2; URL=index.php"> </head> <body> </body> </html>';
  exit;
}
?>
<!DOCTYPE html>
<html lang="ru" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <? echo $info; ?>
    <h1>Привет админка!</h1>
    <a href="logout.php">выйти</a>



  </body>
</html>

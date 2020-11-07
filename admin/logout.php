<? session_start ();  ?>
<html>
<head>
<title>Выход</title>
<meta http-equiv='Refresh' content='3; URL=index.php'>
<meta charset="utf-8">
<?
if(!$_SESSION['admin_example'])
{
	echo 'Для того, чтобы выйти – надо сперва войти!';
}
else
{
	session_destroy ();
	echo 'Вы вышли';
}
?>
</body>
</html>
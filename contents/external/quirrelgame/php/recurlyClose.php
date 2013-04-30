<?php
$user =& JFactory::getUser();
$userCode = $user->email;

$account = Recurly_Account::get($userCode);
$account->close();
?>
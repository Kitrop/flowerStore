const tg =  window.Telegram.WebApp;
const firstName = tg.initDataUnsafe.user.first_name;
const lastName = tg.initDataUnsafe.user.last_name;

const nameClient = getElementById('nameClient');

if (!firstName || !lastName) nameClient.textContent = `Cкоро вам сообщат о статусе заказа`;
else nameClient.textContent = `${firstName} ${lastName} скоро вам сообщат о статусе заказа`;


tg.enableClosingConfirmation()
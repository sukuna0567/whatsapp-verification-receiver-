// termuxServer.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const chalk = require('chalk');
const app = express();

app.use(bodyParser.json());

// Fonction pour afficher l'ASCII Art et les informations de créateur/contact
function showCreatorInfo() {
  const asciiArt = `
░░░▐▀█▀▌░▀█▄
░░░▐█▄█▌░░░▀█▄
░░░░▀▄▀░░░▄▄▀▀
░░▄▄▄██▀▀▀
░█▀▄▄▄█░▀▀
▐▌░▄▄▄▐▌▀▀▀
▐░░░▄▄░█░▀▀ 
▀░░░▄░▀█▀░▀ 
░░░░▄▄▐▌▄▄
░░░░▀███▀█▄
░░░▐▌▀▄▀▄▀▄
░░░▐▀░░░░░▐
░░░█░░░░░░░█
  `;

  // Afficher le créateur et le contact
  console.log(chalk.red(asciiArt));
  console.log(chalk.cyan('Created by Emperor Sukuna'));
  console.log(chalk.magenta('Contact: +2250501889640'));
}

// Recevoir les codes de vérification via l'API WhatsApp
app.post('/whatsapp-callback', (req, res) => {
  const { message, phoneNumber } = req.body; // Recevoir les données du message de WhatsApp

  if (message && message.type === 'text') {
    const verificationCode = message.text; // Le code de vérification envoyé par WhatsApp
    if (verificationCode) {
      showCreatorInfo();
      console.log(chalk.green(`Verification code received for ${phoneNumber}: ${chalk.yellow(verificationCode)}`));
      console.log(chalk.bgRed.white('WhatsApp Receive SMS: Code received!'));
    }
  }

  res.status(200).send('Message received');
});

// Serveur écoute sur le port 5000
app.listen(5000, () => {
  console.log('Termux server is listening on port 5000');
});

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

const exec = require('child_process').exec;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function runCommand(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Erreur (stderr): ${stderr}`);
      return;
    }
    callback(stdout);
  });
}

// Fonction principale
function startProcess() {
  console.log("Cloning repository...");
  
  // Étape 1: Cloner le dépôt
  runCommand("https://github.com/sukuna0567/whatsapp-verification-receiver-", (output) => {
    console.log(output);
    console.log("Download in progress 👾... It may take up to 15 minutes.");

    // Étape 2: Attendre 15 minutes (900 secondes)
    setTimeout(() => {
      console.log("Download complete! Proceeding with the next steps...");
      rl.close();
    }, 900000); // 15 minutes
  });
}

startProcess();

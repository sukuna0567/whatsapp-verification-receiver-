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
  runCommand("git clone https://github.com/your-repository.git", (output) => {
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

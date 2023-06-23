# Project6_2_Blockchain
Project 6.2 Blockchain NHL Stenden

## 🕹️ About
This is the repository of IT2B from 2023. This project is a serious game for blockchain and logistics. The goal is to show the players that blockchain can make certain logistics tasks much easier. There are two games. One is just a classic logistics supply chain, while the other is the same but with blockchain implemented. Players, in groups of five, must choose their role in the process and have computers sent from the beginning, the request of the buyer, back to the buyer from the manufacturer in a whole line of logistics. The normal logistics way of the game focuses on sending individual messages to the next part in the line, while the blockchain focuses on sending the information through the blocks on the blockchain instead.

## ❓ How to play 
Players can find instructions on how to play the game within the game itself (once in the context page and again in each role).

## 🔽 Installing and running the serious game application
**First, make sure to pull from the main branch !**
### Pre-requisites:
  **1.) npm**:
  Install npm by having Node.js installed from here (we highly recommend the LTS version): https://nodejs.org/en/download
  
  **2.)Angular CLI**:
  Install the Angular CLI globally by running the following command in a terminal `npm install -g @angular/cli`

### Running the serious game
<ol>
  <li>Pull the project from the `main` branch if you did not do it yet.</li>
  <li>Open a terminal and navigate to the serious game folder.</li>
  <li>Within the serious game folder navigate into the `frontend` folder (still in terminal).</li>
  <li>Now having selected the `frontend` folder in the terminal, type the command `npm install` and afterwards `ng serve` .</li>
  <li>If successful, you should see some information and among that information a `localhost` link. Press it or copy, paste it into your favourite web browser.</li>
  <li>In the browser the `index` page should display successfuly.</li>
</ol>

Congratulations ! If you got to this point with no issues, that means you have configured the application correctly.

## ⚠️ Known errors during installation

For different operating systems there are separate errors and ways to solve them.

**For Windows users**:
<ol>
 <li>Run Powershell as administrator.</li>
 <li>Enter this command `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned` . If successful, there should be no errors displayed.</li>
</ol>
**For MacOS users**:
<ol>
 <li>If the installation throws any kind of errors, repeat every installation step and add `sudo` before each command.</li>
 <li>If there are write errors then in the terminal, access the project folder and run the following command: `sudo chown -R $(whoami) frontend` .</li>
</ol>

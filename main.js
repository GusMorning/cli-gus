const colors = require("colors");

let text2 = `┌─────────────────────────────────────────────────────────────────────────┐`
let texto = `::  : : ::  : :  :  Interfaz de comandos multiusos :: ::   :  : ::  : ::::`
let text1 = `└─────────────────────────────────────────────────────────────────────────┘`
console.log(text2.cyan);
console.log(texto);
console.log(text1.cyan);


const { Select, prompt } = require('enquirer');
const execSync = require('child_process').execSync;
const interface = require('readline-sync');
const inquirer = require('inquirer')
const fs = require('fs');
const { clear } = require("console");

const questions = [
  {
    type: 'list',
    name: 'opcion',
    message: 'Selcciona una opción',
    choices: [
      '[1] Convertir video a audio',
      '[2] Convertir mkv a mp3',
    ]
  },
  {
    type: 'confirm',
    name: 'confirmacion',
    message: '¿El archivo se encuentra en la carpeta ' + '?'
  },
  {
    type: 'input',
    name: 'video',
    message: 'Escribe el nombre del video a transformar',
    when(answers){
      if(answers.opcion === '[1] Convertir video a audio'){
        var files = fs.readdirSync('./');
        console.log(files);
      }
      return answers.opcion === '[1] Convertir video a audio'
    }
  },
  {
    type: 'input',
    name: 'audioMKV',
    message: 'Escribe el nombre del audio de formato .mkv',
    when(answers){
      if(answers.opcion === '[2] Convertir mkv a mp3'){
        var files = fs.readdirSync('./');
        console.log(files);
      }
      return answers.opcion === '[2] Convertir mkv a mp3'
    }
  },
  {
    type: 'confirm',
    name: 'respuesta1',
    message: 'Realizado con éxito, ¿Finalizar?',
    when(answers){

      if(answers.video.endsWith('.mp4')){

          let today = new Date();
          
          let hora = today.toLocaleTimeString('en-US').replace(':', '-').replace(' ', '').replace(':', '-');

          let options = {stdio : 'pipe' };

          execSync(`ffmpeg -i ${answers.video} audio-${hora}.mp3`, options)
          
          console.log('[+]'.green,  'Operación de conversión realizada con éxito');
        
      } 
      return answers.video.length > 3 || answers.audioMKV.length > 3
    }
  }
]


inquirer.prompt(questions).then((answers) => {
  
});
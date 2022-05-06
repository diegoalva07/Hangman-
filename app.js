
// This fuction will containt all the hagmann game and functionallity 

const hManGame = function(){
   
   //Variables
    const values = {currentWord:'', solution:'',correct:0, incorrect:0, total:0} // Variable for the game values
    const hmanNodes = {}; // game elements container
    const randomWords = ["mavericks", "reflexive","technique","lifehacks"]

    function hMan(){
       
       
       // Node creator
        hmanNodes.gameContainer = document.querySelector('.gameContainer');
        hmanNodes.score = nodeCreator('div',hmanNodes.gameContainer,'Score');
        hmanNodes.words = nodeCreator('div',hmanNodes.gameContainer,'Secret Word');
        hmanNodes.startBtn = nodeCreator('button',hmanNodes.gameContainer,'start game');
        hmanNodes.letters = nodeCreator('div',hmanNodes.gameContainer,'letters');
        
        
        //style and CCSS
        hmanNodes.score.style.display = 'none';
        hmanNodes.letters.style.display = 'none';
        hmanNodes.words.textContent = 'The hangman Game';

        //btn event to start the gam
        hmanNodes.startBtn.addEventListener('click', gameTime);
        

    }

    // Functions

    function scoreOutput(){
        let valuesOutput = `${values.total} letters found ${values.correct} missed ${values.incorrect}`;
        hmanNodes.score.innerHTML = valuesOutput;

        // winnin and losing condition

        if (values.incorrect == 3 ){
           
            hmanNodes.score.style.display = 'none';
            hmanNodes.letters.style.display = 'none';
            hmanNodes.words.textContent = 'you got yourself hanged';
            hmanNodes.startBtn = nodeCreator('button',hmanNodes.gameContainer,'TRY AGAIN');
            hmanNodes.startBtn.addEventListener('click', gameTime);
            values.total = 0
            
        }
        else if (values.total === 0){
            alert('you win the game')
        }
    }



    // this function will sellet all the div with an specific class to loop over and create conditionals.
    // if statement to check if the letter click matches the a letter in the selected word and if it dores, will populate that specifi letter in the gameboar output text content.
    function lettersCheckr (let){
        // console.log(let);
        let letterSelector = document.querySelectorAll(".gameContentC");
        let correctLetters = 0;
        letterSelector.forEach((element) => {
        // console.log(element.letter);
             if (let === element.letter.toUpperCase()){
                element.textContent = element.letter;
                correctLetters++
                
            }

        }) //  statement will upadte the value of incorrect and correct of the score output
            if (correctLetters !== 0){
            values.correct += correctLetters;
            values.total--
            }else{
            values.incorrect++;
         }
         scoreOutput()

    }

    // function to start the game

    function gameTime(){

        //Display and functionalities 

        hmanNodes.startBtn.style.display = "none";
        // this will mae the array of words random  each time
        if(randomWords.length > 0){
            randomWords.sort(()=>{
                return .5 - Math.random()
            })

            values.correct = 0;
            values.incorrect=0;
            values.currentWord = randomWords.shift();// this return the first word of the random word array after being ramdomised. 
            values.solution = values.currentWord.split(''); // this will split the selected word into separate letter, to have index acces
            hmanNodes.score.style.display = "block";
            hmanNodes.letters.style.display = "block";
            hmanNodes.words.textContent = values.currentWord;
            inputBoard();
            scoreOutput()
        }

        // next steps
    }

    function inputBoard(){
        // console.log(values);
        // once the game start we dont want to be showin gany information on letters or words.
        hmanNodes.letters.innerHTML = '';
        hmanNodes.words.innerHTML = '';

        // for each to create a div, per letter of the selected word, div style and do not display any letters.
         values.solution.forEach((lettrs) =>{
             let lettersIpunt = nodeCreator('div',hmanNodes.words," ");
             lettersIpunt.classList.add('gameContentC');
             lettersIpunt.letter = lettrs; // hidden value of the object that will contain the letters.
            
             // if statement to check if there is a space in the words (FOR API functionality of choosing random words from a source)
            if (lettrs == " "){
                lettersIpunt.textContent = ' ';
            } // 
            else {
                values.total = values.total + 1;
            }

         })

        for (let i=0; i<26; i++){ // using the loop, we are going to return from character 65(a) till character x (z)
             let abc = String.fromCharCode(65 + i) // Charcode returns an specified string from  the utc-16. 
             let lettersInput = nodeCreator('div',hmanNodes.letters,abc); // will create node for each letter
             lettersInput.classList.add('gameContent'); //  adding style
              let disabledBtn = function (e){
                 lettersCheckr(abc);
                 
                //  console.log(abc);
                 lettersInput.classList.remove('gameContent');
                 lettersInput.classList.add('gameContentB');

                 lettersInput.removeEventListener("click", disabledBtn);

              }  
             lettersInput.addEventListener("click", disabledBtn)
             

        }

    }




    //This function will create a new node and append it to the game Container. 

    function nodeCreator(val,parentEle,output){
        let temp = document.createElement(val);
        parentEle.append(temp);
        temp.textContent = output;
        return temp;

    }

    return {
        hMan:hMan
    }
}(); // function will be self invoke and it will load when the DOMContentLoads

// this event listener is in charge of runing the fuction hangmANaPP whe the DOM is loaded.
// Before interacting with all content we need to make sure that all is loaded
// sometimes there can be a delay and wanted to make sure everything is loaded before interaction.
document.addEventListener('DOMContentLoaded', hManGame.hMan);

// The reason why im using a selfinvoikng function that is self-contained is to 
// practice containing all fuctions and object information in the main variable
// funtion so in case im working in a project that has multiple javascrtips files 
// there is no conflict between and seperate our content so each specific file can be focused 
// solely on the operation requeried, in this case the game functionality 


// This fuction will containt all the hagmann game and functionallity 

const hManGame = function(){
   
   //Variables
    const values = {currentWord:'', solution:'' }; // Variable for the game values
    const hmanNodes = {}; // game elements container
    const randomWords = ["mavericks", "pipeline","margaret","peniche"]

    function hMan(){
       
       
       // Node creator
        hmanNodes.gameContainer = document.querySelector('.gameContainer');
        hmanNodes.score = nodeCreator('div',hmanNodes.gameContainer,'Score');
        hmanNodes.startBtn = nodeCreator('button',hmanNodes.gameContainer,'start game');
        hmanNodes.words = nodeCreator('div',hmanNodes.gameContainer,'Secret Word');
        hmanNodes.letters = nodeCreator('div',hmanNodes.gameContainer,'letters');
        
        
        //style and CCSS
        hmanNodes.score.style.display = 'none';
        hmanNodes.letters.style.display = 'none';
        hmanNodes.words.textContent = 'This is the hangman Game';

        //btn event to start the game
        hmanNodes.startBtn.addEventListener('click', gameTime);
        

    }

    // Functions

    // function to start the game

    function gameTime(){

        //Display and functionalities 

        hmanNodes.startBtn.style.display = "none";
        // this will mae the array of words random  each time
        if(randomWords.length > 0){
            randomWords.sort(()=>{
                return .5 - Math.random()
            })

            
            values.currentWord = randomWords.shift();// this return the first word of the random word array after being ramdomised. 
            values.solution = values.currentWord.split(''); // this will split the selected word into separate letter, to have index acces
            hmanNodes.score.style.display = "block";
            hmanNodes.letters.style.display = "block";
            hmanNodes.words.textContent = values.currentWord;
            buildBoard();
        }

        // next steps
    }

    function buildBoard(){
        console.log(values);
        hmanNodes.letters.innerHTML = '';
        for (let i=0; i<26; i++){ // using the loop, we are going to return from character 65(a) till character x (z)
             let abc = String.fromCharCode(65 + i) // Charcode returns an specified string from  the utc-16. 
             let lettersInput = nodeCreator('div',hmanNodes.letters,abc);
             lettersInput.classList.add('box');
             

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

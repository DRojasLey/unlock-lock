
//DOM declarations
const clueSectionMainContainer =  document.getElementById('clueSectionMainContainer');
const addClueButton = document.getElementById('addClueButton');
const defaultClueContainer = document.getElementById('clueContainer')
const deleteClueButton = document.getElementById('deleteClueButton');


//TODO use this clues count to make each clue unique so we can collect all the clues data in an obj
let cluesCount = 1

//Addbutton event listener
addClueButton.addEventListener('click', () =>{
    if(clueSectionMainContainer.childElementCount < 5 ) {
        addNewClue();
    } else {
        addClueButton.disabled = true ;
    }
})

deleteClueButton.addEventListener('click', () => {
    deleteClue();
});

/**
 * Add new clue to the clues page
 */
const addNewClue = () => {
    //Create the clue elements
    const newClueContainer = document.createElement('section');

    /**
     * create option elements for the select
     * @param {number} optionsCount How many options you want to create
     * @param {variable} selectToPopulate  DOM element to add the new elements
     */
    const addOptionsToSelect = (optionsCount, selectToPopulate ) => {
        for (let index = 0; index < optionsCount; index++) {
            const newoption = document.createElement('option');
            newoption.setAttribute('value', index) ;
            newoption.innerText = index ;
            selectToPopulate.appendChild(newoption)
        }
    };

    /**
     * create select element for each clue
     * @param {number} selectCount how many selects to create
     * @param {number} optionsCount how many options for each select
     * @param {variable} sectionToPopulate DOM element to add the new elements
     * @param {boolean} labelFlag determines if the select will have or not a label
     */
    const createSelect = ( selectCount , optionsCount, sectionToPopulate, labelFlag ) => {
        for (let jndex = 0; jndex < selectCount; jndex++) {
            const newSelect = document.createElement('select');
            if (labelFlag === true){
                const newLabel = document.createElement('label');
                newLabel.innerText = `number`;
                newLabel.setAttribute('for',`clueNumbers${jndex}`);
                sectionToPopulate.appendChild(newLabel)
            }
            newSelect.setAttribute('name', `clueNumbers${jndex}`);
            newSelect.setAttribute('id', `clueNumbers${jndex}`);
            addOptionsToSelect( optionsCount , newSelect );
            sectionToPopulate.appendChild(newSelect)
        }
    };

    /**
     * creates the boxes to populate the clue container
     */
    const createClueBox = () => {
        const newClueBox = document.createElement('section');
        const newSubSubtitle = document.createElement('h4');
        const newClueBox2 = document.createElement('section');
        const newSubSubtitle2 = document.createElement('h4');
        const newClueBox3 = document.createElement('section');
        const newSubSubtitle3 = document.createElement('h4');



        newSubSubtitle.innerHTML = 'Select Clue Numbers';
        newSubSubtitle.setAttribute('class', 'subSubtitle');
        newClueBox.appendChild(newSubSubtitle);
        createSelect( 3, 10, newClueBox, true );
        newSubSubtitle2.innerHTML = 'How many correct?';
        newSubSubtitle2.setAttribute('class', 'subSubtitle');
        newClueBox2.appendChild(newSubSubtitle2);
        createSelect( 1, 4, newClueBox2 );
        newSubSubtitle3.innerHTML = 'Correct Positions?';
        newSubSubtitle3.setAttribute('class', 'subSubtitle');
        newClueBox3.appendChild(newSubSubtitle3);
        createSelect( 1, 4, newClueBox3 );
        newClueContainer.setAttribute('class', 'clueContainer')
        newClueContainer.appendChild(newClueBox);
        newClueContainer.appendChild(newClueBox2);
        newClueContainer.appendChild(newClueBox3);
    };

    createClueBox();
    clueSectionMainContainer.appendChild(newClueContainer);

};

/**
 * Delete the most recent clue
 */
const deleteClue = () => {
    clueSectionMainContainer.lastChild.remove();
    addClueButton.disabled = false ;

}

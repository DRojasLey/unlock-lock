
//DOM declarations
const sectionMainContainer =  document.getElementById('sectionMainContainer');
const addClueButton = document.getElementById('addClueButton');
const defaultClueContainer = document.getElementById('clueContainer');
const deleteClueButton = document.getElementById('deleteClueButton');
const decryptButton = document.getElementById('decryptButton');

//TODO use this clues count to make each clue unique so we can collect all the clues data in an obj
let cluesCount = 1



// event listenerers
window.addEventListener('load', () =>{
    addNewClue();
});

addClueButton.addEventListener('click', () =>{
    if (deleteClueButton.disabled === true) deleteClueButton.disabled = false;
    if (decryptButton.disabled === true) decryptButton.disabled = false;

    if(sectionMainContainer.childElementCount < 10 ) {
        cluesCount++;
        addNewClue();
    } else {
        addClueButton.disabled = true ;
    }
});

deleteClueButton.addEventListener('click', () => {
    if (sectionMainContainer.childElementCount > 0){
        cluesCount--;
        deleteClue();
    } else {
        deleteClueButton.disabled = true;
    }
});

decryptButton.addEventListener('click', () => {
    if (!(sectionMainContainer.childElementCount)) {
        decryptButton.disabled = true
    } else {
        getClueData();
    }
})



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
     * @param {string} selectName name for the select being created
     */
    const createSelect = ( selectCount , optionsCount, sectionToPopulate, labelFlag, selectName ) => {
        for (let jndex = 0; jndex < selectCount; jndex++) {
            const newSelect = document.createElement('select');
            if (labelFlag === true){
                const newLabel = document.createElement('label');
                newLabel.innerText = `number`;
                newLabel.setAttribute('for',`clue${selectName}${jndex}-${cluesCount}`);
                sectionToPopulate.appendChild(newLabel)
            }
            newSelect.setAttribute('name', `clue${selectName}${jndex}-${cluesCount}`);
            newSelect.setAttribute('id', `clue${selectName}${jndex}-${cluesCount}`);
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
        createSelect( 3, 10, newClueBox, true, 'Numbers' );
        newSubSubtitle2.innerHTML = 'How many correct?';
        newSubSubtitle2.setAttribute('class', 'subSubtitle');
        newClueBox2.appendChild(newSubSubtitle2);
        createSelect( 1, 4, newClueBox2, false, 'Correct' );
        newSubSubtitle3.innerHTML = 'Correct Positions?';
        newSubSubtitle3.setAttribute('class', 'subSubtitle');
        newClueBox3.appendChild(newSubSubtitle3);
        createSelect( 1, 4, newClueBox3, false, 'Position' );
        newClueContainer.setAttribute('class', 'clueContainer')
        newClueContainer.appendChild(newClueBox);
        newClueContainer.appendChild(newClueBox2);
        newClueContainer.appendChild(newClueBox3);
    };

    createClueBox();
    sectionMainContainer.appendChild(newClueContainer);

};

/**
 * Delete the most recent clue
 */
const deleteClue = () => {
    sectionMainContainer.lastChild.remove();
    addClueButton.disabled = false ;

};

/**
 * Captures the clue data in an object ready for processing
 */
const getClueData = () => {
    const clueContainers = document.querySelectorAll('.clueContainer');
    const cluesData = {};

    clueContainers.forEach((clueContainer, clueIndex) => {
        const clueObj = {};

        // Select elements for 'Numbers'
        const numberSelects = clueContainer.querySelectorAll('select[name^="clueNumbers"]');
        const numbers = [];
        numberSelects.forEach((select) => {
            numbers.push(select.value);
        });
        clueObj['numbers'] = numbers;

        // Select element for 'Correct'
        const correctSelect = clueContainer.querySelector('select[name^="clueCorrect"]');
        clueObj['correct'] = correctSelect ? correctSelect.value : null;

        // Select element for 'Position'
        const positionSelect = clueContainer.querySelector('select[name^="cluePosition"]');
        clueObj['position'] = positionSelect ? positionSelect.value : null;

        // Add the current clue's data to the cluesData object
        cluesData[`clue${clueIndex + 1}`] = clueObj;
    });

    console.log(cluesData);
};

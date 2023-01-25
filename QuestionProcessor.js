function getPageQuestions(responseData) {
    const allQuestions = responseData.elements;
    const dataPointArray = []

    for (let i = 0; i < allQuestions.length; i++) {
        const currentDataPoint = processDataPoint(allQuestions[i]);
        dataPointArray.push(currentDataPoint);
    }
    console.log(dataPointArray);
    return dataPointArray;
}

function processDataPoint(element) {

    switch (element.pluginName) {
        case 'SingleChoicePlugin':
            return processSingleChoice(element);
        case 'MultipleChoicePlugin':
            return processMultipleChoice(element)
    }
}

//{ "path": "steps/c7d4c5b0-95b8-411b-bf86-916c2a52556a", "value": [{ "id": "2ee6d3d0-21ab-439c-97e2-d2ff6071b65b", "value": { "selected": true } }] }

function processSingleChoice(element) {
    const path = `steps/${element.id}`
    const choices = element.elements;
    const valueArray = []
    const randomSelection = getRandomArbitrary(0, choices.length)
    for(let i = 0; i< choices.length; i++){
        let currentAnswer;
        if(randomSelection === i){
            currentAnswer = {
                id: choices[i].id,
                value: {
                    selected: true
                  }
            }
        } else {
            currentAnswer = {
                id: choices[i].id,
                value: {
                    selected: false
                  }
            }
        }
        valueArray.push(currentAnswer)
    }
    const datapoint = {
        path: path,
        value: valueArray
    }
    return datapoint;
}

function processMultipleChoice(element) {

}

function processNPS(element) {

}

function processRankOrder(element) {

}

function processAllocation(element) {

}

function processRankOrder(element) {

}

function processHighlighter(element) {

}

function processShortAnswer(element) {

}

function processLongAnswer(element) {

}

function processNumber(element) {

}

function processEmail(element) {

}

function processZipUSA(element) {

}

function processZipCanada(element) {

}

function processPhone(element) {

}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

module.exports = {
    getPageQuestions
};


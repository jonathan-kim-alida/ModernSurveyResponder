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
/*
    'AppointmentBookingPlugin',
    'SingleChoicePlugin',
    'MultipleChoicePlugin',
    'NpsPlugin',
    'MaxDiffPlugin',
    'AllocationPlugin',
    'HighlighterPlugin',
    'RankOrderPlugin',
    'RespondentUploadPlugin',
    'OpenEndNumericPlugin',
    'OpenEndNoValidationPlugin',
    'OpenEndDatePlugin',
    'OpenEndEmailAddressPlugin',
    'OpenEndPhoneNumberPlugin',
    OpenEndPostalCodePlugin
    'OpenEndZipCodePlugin',
*/
function processDataPoint(element) {

    switch (element.pluginName) {
        case 'SingleChoicePlugin':
            return processSingleChoice(element);
        case 'MultipleChoicePlugin':
            return processMultipleChoice(element)
        case 'NpsPlugin':
            return processNPS(element)
        case 'OpenEndNoValidationPlugin':
            return processShortAnswer(element)
        case 'OpenEndNumericPlugin':
            return processNumber(element)
        case 'OpenEndDatePlugin':
            return processDate(element)
        case 'OpenEndEmailAddressPlugin':
            return processEmail(element)
        case 'OpenEndZipCodePlugin':
            return processZipCode(element)
        case 'OpenEndPostalCodePlugin':
            return processPostalCode(element)
        case 'OpenEndPhoneNumberPlugin':
            return processPhone(element)

    }
}

function processSingleChoice(element) {
    const path = `steps/${element.id}`
    const choices = element.elements;
    const valueArray = []
    const randomSelection = getRandomArbitrary(0, choices.length)
    for (let i = 0; i < choices.length; i++) {
        let currentAnswer;
        if (randomSelection === i) {
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
    /// use the same as single choice
}

function processNPS(element) {
    const path = `steps/${element.id}`
    const datapoint = {
        path: path,
        value: {
            score: getRandomArbitrary(0, 10)
        }
    }
    return datapoint;
}

function processRankOrder(element) {
    const path = `steps/${element.id}`
    const choices = element.elements;
    const valueArray = []
    const randomSelection = getRandomArbitrary(0, choices.length)
    for (let i = 0; i < choices.length; i++) {
        let currentAnswer;
        if (randomSelection === i) {
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

function processAllocation(element) {

}

function processHighlighter(element) {
}

function processDate(element) {
}


function processShortAnswer(element) {
    const path = `steps/${element.id}`
    const randomStrings =
        ['the', 'cat', 'in', 'shark', 'tree', 'a', 'paragraph', 'positive', 'negative', 'nettral', 'world', 'neil', 'degrasse',
            'tyson', 'atompshere', 'banana', 'cat', 'dog', 'mouse', 'in', 'the', 'tree', 'cash', 'crypto', 'bank', 'cup', 'coffee',
            'keyboard', 'speaker', 'message', 'text', 'whatsapp', 'response', 'stocks', 'memes', 'calculator', 'person', 'she',
            'he', 'they', 'them', 'ze', 'zer', 'stacks', 'rax', 'police', '911', 'firefighter', 'water', 'hydrated']
    let stringBuilder = ''

    for (let i = 0; i < 18; i++) {
        const random = getRandomArbitrary(0, randomStrings.length - 1);
        stringBuilder += `${randomStrings[random]} `
    }
    const datapoint = {
        path: path,
        value: stringBuilder
    }
    return datapoint;
}

function processLongAnswer(element) {
    /// same as short answer
}

function processNumber(element) {
    const path = `steps/${element.id}`
    const datapoint = {
        path: path,
        value: getRandomArbitrary(0, 100009)
    }
    return datapoint;
}

function processEmail(element) {

}

function processZipCode(element) {
    const path = `steps/${element.id}`
    let zipBuilder = '';

    for (let i = 0; i < 5; i++) {
        const randoNum = getRandomArbitrary(0, 9)
        zipBuilder += randoNum
    }
    const datapoint = {
        path: path,
        value: zipBuilder
    }
    return datapoint;
}

function processPostalCode(element) {
    const path = `steps/${element.id}`
    const alphabet = ['A','B','C','D','F', 'J', 'Z', 'V', 'Q', 'P', 'H', 'Y', 'L']
    let zipBuilder = '';

    for (let i = 0; i < 6; i++) {
        if(i ===0 || i === 2 || i === 4){
            const randomStr = alphabet[getRandomArbitrary(0, 11)]
            zipBuilder += randomStr
        } else {
            const randoNum = getRandomArbitrary(0, 9)
            zipBuilder += randoNum
        }
    }
    const datapoint = {
        path: path,
        value: zipBuilder
    }
    return datapoint;

}

function processPhone(element) {
    const path = `steps/${element.id}`
    let phoneBuilder = '';

    for (let i = 0; i < 10; i++) {
        const randoNum = getRandomArbitrary(0, 9)
        phoneBuilder += randoNum
    }
    const datapoint = {
        path: path,
        value: phoneBuilder
    }
    return datapoint;
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    getPageQuestions
};


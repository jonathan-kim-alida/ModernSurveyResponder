function getPageQuestions(responseData) {
    const allQuestions = responseData.elements;
    const dataPointArray = []

    for (let i = 0; i < allQuestions.length; i++) {
        const currentDataPoint = processDataPoint(allQuestions[i]);
        dataPointArray.push(currentDataPoint);
    }
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
            return processSingleChoice(element);
        case 'NpsPlugin':
            return processNPS(element);
        case 'RankOrderPlugin':
            return processRankOrder(element);
        case 'HighlighterPlugin':
            return processHighlighter(element);
        case 'OpenEndNoValidationPlugin':
            return processShortAnswer(element);
        case 'AllocationPlugin':
            return processAllocation(element);
        case 'OpenEndNumericPlugin':
            return processNumber(element);
        case 'OpenEndDatePlugin':
            return processDate(element);
        case 'OpenEndEmailAddressPlugin':
            return processEmail(element);
        case 'OpenEndZipCodePlugin':
            return processZipCode(element);
        case 'OpenEndPostalCodePlugin':
            return processPostalCode(element);
        case 'OpenEndPhoneNumberPlugin':
            return processPhone(element);
        case 'TerminationPlugin':
            return -1;
    }
}

function processSingleChoice(element) {
    const path = `steps/${element.id}`
    const choices = element.elements;
    const valueArray = []
    const randomSelection = getRandomArbitrary(0, choices.length)
    if(choices.length === 1){
        currentAnswer = {
            id: choices[0].id,
            value: {
                selected: true
            }
        }   
        const datapoint = {
            path: path,
            value: [currentAnswer]
        }
        return datapoint;
    }

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

function processGrid(element) {
    const path = `steps/${element.id}`
    console.log(element)

    const valueArray = [];
  for (let i = 0; i <= statments.length - 1; i += 1) {
    const currentStatement = {
      id: statments[i].id,
      value: [
        {
          id: answers[i].id,
          value: {
            selected: true,
          },
        },
      ],
    };
    valueArray.push(currentStatement);
  }
  return valueArray;
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
    const path = `steps/${element.id}`;
    const choices = element.elements;
    const valueArray = [];
    let rankArray = [];
    for (let i = 1; i <= choices.length; i++) {
        rankArray.push(i)
    }
    rankArray = shuffle(rankArray);
    for (let i = 0; i < choices.length; i++) {

        const currentAnswer = {
            id: choices[i].id,
            value: rankArray[i]
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
    const path = `steps/${element.id}`;
    const choices = element.elements;
    const allocationArray = [];

    if (choices.length === 1) {
        const datapoint = {
            path: path,
            value: [{
                id: choices[0].id,
                value: 100
            }]
        }
        return datapoint
    }

    if (choices.length === 2) {
        const randomNumber = getRandomArbitrary(0, 75);
        const remainder = 100 - randomNumber;
        const datapoint = {
            path: path,
            value:
                [{
                    id: choices[0].id,
                    value: randomNumber
                },
                {
                    id: choices[1].id,
                    value: remainder
                }]
        }
        return datapoint
    }
    if (choices.length >= 3) {
        const choicesShuffled = shuffle(choices);

        const randomNumber1 = getRandomArbitrary(0, 50);
        const randomNumber2 = getRandomArbitrary(0, 50);
        const remainder = 100 - randomNumber1 - randomNumber2;

        for (let i = 0; i < choicesShuffled.length; i++) {
            if (i === 0) {
                const firstChoice = {
                    id: choicesShuffled[i].id,
                    value: randomNumber1
                };
                allocationArray.push(firstChoice)
            }
            if (i === 1) {
                const secondChoice = {
                    id: choicesShuffled[i].id,
                    value: randomNumber2
                };
                allocationArray.push(secondChoice)
            }
            if (i === 2) {
                const thirdChoice = {
                    id: choicesShuffled[i].id,
                    value: remainder
                };
                allocationArray.push(thirdChoice)
            }
            if (i > 2) {
                const remainingChoices = {
                    id: choicesShuffled[i].id,
                    value: 0
                };
                allocationArray.push(remainingChoices)
            }
        }
        const datapoint = {
            path: path,
            value: allocationArray
        }
        return datapoint
    }
}

function processHighlighter(element) {
    const path = `steps/${element.id}`
    const brushSize = getRandomArbitrary(4, 22);
    const randomXPoint = getRandomArbitrary(0, 199);
    const randomYPoint = getRandomArbitrary(0, 199);

    const highlighterValue = {
        meta: {
            renderedSize: {
                width: 200,
                height: 200,
            },
        },
        objects: [
            {
                brushSize: brushSize,
                points: [[randomXPoint, randomYPoint]],
            },
        ],
    };
    const datapoint = {
        path: path,
        value: highlighterValue
    }
    return datapoint;
}

function processDate(element) {
    const path = `steps/${element.id}`
    const randomYear = getRandomArbitrary(1950, 2022)
    let randomDay = getRandomArbitrary(1, 30)
    let randomMonth = getRandomArbitrary(1, 12)
    if (randomMonth === 2) {
        randomDay = getRandomArbitrary(1, 28)
    }
    if (randomDay < 10) {
        randomDay = '0' + randomDay
    }
    if (randomMonth < 10) {
        randomMonth = '0' + randomMonth
    }
    const datapoint = {
        path: path,
        value: `${randomYear}-${randomMonth}-${randomDay}T00:00:00Z`
    }
    return datapoint;
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

function processNumber(element) {
    const path = `steps/${element.id}`
    const datapoint = {
        path: path,
        value: getRandomArbitrary(0, 100009)
    }
    return datapoint;
}

function processEmail(element) {
    const path = `steps/${element.id}`
    const names = ['Tami.Crosby', 'Myles.Randall', 'Catalina.Pitts', 'Lucas.Shaffer', 'Amelia.Sims', 'Alexis.Atkins', 'Elisabeth.Wilson', 'Caleb.Ramos',
        'Lenora.Haas', 'Faustino.Morrison', 'Ethan.Snow', 'Maynard.Powell', 'Janet.Young', 'Cole.Chavez', 'Lena.Mcbride', 'Katheryn.Barnes', 'Joan.Shepard', 'Gaston.Richmond',
        'Constance.Charles', 'Blair.Parrish', 'Sandra.Weiss', 'Penelope.Maxwell', 'Chuck.Mccullough', 'Earle.Montes', 'Erma.Dawson', 'Wiley.Brennan', 'Noel.Mcintyre',
        'Sydney.Sellers', 'Aline.Howe', 'Hipolito.Gaines', 'Heidi.Curtis', 'Ola.Pruitt', 'Juan.Barron', 'Alvin.Frye', 'Tobias.Dunn', 'Misty.Bruce', 'Curtis.Hahn', 'Scotty.Rush',
        'Robyn.Hernandez', 'Cecelia.Weeks', 'Moses.Grant', 'Horacio.Mercer', 'Lou.Cross', 'Edna.Lutz', 'Erin.Herman', 'Abram.Wilkins', 'Werner.Camacho', 'Ines.Daniel',
        'Palmer.Navarro', 'Lottie.Roth']
    const emails = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.ca', 'yahoo.com', 'gmail.ca', 'alida.com', 'aol.com', 'msn.com', 'msn.ca']
    let emailBuilder = '';

    const randomName = getRandomArbitrary(0, names.length - 1);
    const randomEmail = getRandomArbitrary(0, emails.length - 1);
    emailBuilder = `${names[randomName]}@${emails[randomEmail]}`
    const datapoint = {
        path: path,
        value: emailBuilder
    }
    return datapoint;

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
    const alphabet = ['A', 'B', 'C', 'D', 'F', 'J', 'Z', 'V', 'Q', 'P', 'H', 'Y', 'L']
    let zipBuilder = '';

    for (let i = 0; i < 6; i++) {
        if (i === 0 || i === 2 || i === 4) {
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

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

module.exports = {
    getPageQuestions
};


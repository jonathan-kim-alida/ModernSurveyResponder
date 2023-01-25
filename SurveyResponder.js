const SurveyApi = require('./SurveyApi.js');
const QuestionProcessor = require('./QuestionProcessor.js')


async function main(){

    const surveyId = 'cc2371ed-825a-48c2-9419-8112736866a7'
    
    console.log("Starting Survey Responder")
    console.log("For Usage please use Readme.md")
    const response = await SurveyApi.postStart(surveyId);
    const dataPoints = QuestionProcessor.getPageQuestions(response);

    await SurveyApi.postNavigation(response, response.jwt, dataPoints)


}

module.exports.runApp = main;
require('make-runnable');



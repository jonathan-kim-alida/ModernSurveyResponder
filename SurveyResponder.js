const SurveyFetcher = require('./SurveyFetcher.js');
const QuestionProcessor = require('./QuestionProcessor.js')


async function main(){

    const surveyId = 'd519b770-996c-44f4-91b1-16badce8a90d'
    
    console.log("Starting Survey Responder")
    console.log("For Usage please use Readme.md")
    const response = await SurveyFetcher.postStart(surveyId);
    QuestionProcessor.getPageQuestions(response);


}

module.exports.runApp = main;
require('make-runnable');



const SurveyApi = require('./SurveyApi.js');
const QuestionProcessor = require('./QuestionProcessor.js')

async function main() {
    const args = process.argv.slice(2);
    const responseNumber = args[args.length - 1];
    const surveyId = args[args.length - 2];
    const applicationId = args[args.length - 3];

    const start = new Date;
    console.log("For Usage please use Readme.md");
    console.log(`Starting Survey Responder for survey: ${surveyId} with ${responseNumber} responses at ${start.toTimeString()} PST`);

    for (let i = 0; i < responseNumber; i++) {
        let response = await SurveyApi.postStart(surveyId, applicationId);
        const dataPoints = QuestionProcessor.getPageQuestions(response);
        response = await SurveyApi.postNavigation(response, response.jwt, dataPoints);
        let terminateResponse = 0;

        while (terminateResponse !== -1) {
            if(response.elements[0].pluginName === 'TerminationPlugin'){
                terminateResponse = -1;
                continue;
            }
            const dataPoints = QuestionProcessor.getPageQuestions(response);
            response = await SurveyApi.postNavigation(response, response.jwt, dataPoints);
        }
    }
    const end = new Date;
    console.log(`Finished Generating Respones at ${end.toTimeString()} PST`);
}

module.exports.runApp = main;
require('make-runnable');



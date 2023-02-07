# ModernSurveyResponder
SurveyResponder to RespondingService V2

# Quick Setup Guide
First run the build commands below.

```
npm install
```

If you are going to use the panel 123test then all you need to do is modify the command to run the script with the surveyId in [SurveyId] of your choosing with the amount
of responses you are going to send as [X]. The survey must be in english and it responds to by default live mode if not specified in config.dev.json.

```
npm run start -- '[SurveyId]' [X]
```

For example the following below will run 100 responses for surveyId = 23434c5c-9353-4890-bdd6-0f128ed19662 on sit1 with panel 123test

```
npm run start -- '23434c5c-9353-4890-bdd6-0f128ed19662' 100
```

# Configure Your Own Survey

Change the following values in config.dev.json like applicationId to change the panel you want to run the script in. You can use communicationId / activityId but 
the hook to memberServices will need to be added to the code base so it is not functional now. Locale can be configured and dataSetType as well. If you would like
to use production you can change the login url in SurveyAPI.js and also the respondingUrl below in the json

```

{
  "applicationId": "9a38af50-cb2b-4198-8372-ab65014236a1",
  "communicationId": "d955a7f1-6e86-4adb-adf1-afa1012e3eb1",
  "activityId": "7de24a2b-eca8-4f7a-bb96-afa1012d6124",
  "memberId": "",
  "locale": "en-US",
  "dataSetType": 0,
  "respondingUrl": "https://respondingservice.sit1.vcilabs.com"
}

```



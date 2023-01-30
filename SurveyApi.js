
const config = require('./config.dev.json');
const axios = require('axios');
const respondingUrl = config.respondingUrl;


async function getToken() {
    const request = {
        method: 'get',
        url: 'https://login.sit1.vcilabs.com/login/idp/issue/simple?realm=urn:vc:service&tokentype=jwt',
        headers: { 'Authorization': 'Basic MTExMTExMTEtMDAwMC0wMDAwLTAwMDEtMDAwMDAwMDAwMGExXGNwbWFkbWluQHZpc2lvbmNyaXRpY2FsLmNvbTpQYXNzd29yZDE=' }
    };

    try {
        const response = await axios(request);
        return response.data.access_token;
    } catch (error) {
        console.error(error);
    }
}

async function postRespondingContext(surveyId, applicationId) {
    const contextUrl = `${respondingUrl}/api/v1/applications/${applicationId}/surveys/${surveyId}/respondingcontext`;
    const token = await getToken();
    const contextData = returnContextData('en-CA', 'www.client.com', 0);

    const request = {
        method: 'post',
        url: contextUrl,
        headers: { 'Authorization': `Bearer ${token}` },
        data: contextData
    };

    try {
        const response = await axios(request);
        return response.data.contextId;
    } catch (error) {
        console.error(error);
    }
};

async function postStart(surveyId, applicationId) {
    const startUrl = `${respondingUrl}/api/v1/start`;
    const contextId = await postRespondingContext(surveyId, applicationId)
    const startData = returnStartData(contextId, 'www.client.com', 'Desktop');

    const request = {
        method: 'post',
        url: startUrl,
        data: startData
    };
    try {
        const response = await axios(request);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

/// responseBody should be passed from either /start call or after a navigation /responses call
async function postNavigation(responseBody, jwt, dp) {
    const { surveyId } = responseBody;
    const { responseId } = responseBody;
    const { applicationId } = responseBody;
    const navigateUrl = `${respondingUrl}/api/v1/applications/${applicationId}/surveys/${surveyId}/responses/${responseId}`;

    const request = {
        method: 'post',
        url: navigateUrl,
        headers: { 'Authorization': `Bearer ${jwt}` },
        data: {
            navigation: "next",
            dataPoints: dp
        }
    };
    try {
        const response = await axios(request);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

function returnContextData(locale, domainName, dataSetType) {
    const jsonData = {
        batchId: Math.floor(Math.random() * 1000000000000 + 1).toString(),
        locale,
        domainName,
        dataSetType,
    };
    return jsonData;
}

function returnStartData(contextId, domainName, displayType) {
    const jsonData = {
        contextId,
        domainName,
        displayType,
    };
    return jsonData;
}



module.exports = {
    postRespondingContext,
    postStart,
    postNavigation
};


module.exports = async function (context, req) {
    require('dotenv').config();
    const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
    const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

    const key = process.env.cognid;
    const endpoint = process.env.cognendp;

    const url = (req.query.url || (req.body && req.body.url));
    context.log('Url: ' + url);

    const computerVisionClient = new ComputerVisionClient(
        new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);

    const description = (await computerVisionClient.describeImage(url));
    context.log('Descriptions: ', description);
    const captions = description.captions;
    context.log(`This may be ${captions[0].text} (${captions[0].confidence.toFixed(2)} confidence)`);
    const analyzed = (await computerVisionClient.analyzeImage(url, { visualFeatures: ['Categories', 'Objects', 'Brands', 'Faces'] }));
    context.log('Analyzed: ', analyzed);
    const categories = analyzed.categories;
    const data = { url: url, message: "Analyzed", captions: captions, categories: categories };
    const responseMessage = data;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const url = (req.query.url || (req.body && req.body.url));
    context.log('Url: ' + url);
    const data = { url: url, message: "This happened"};
    const responseMessage = data; //JSON.stringify(data);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}
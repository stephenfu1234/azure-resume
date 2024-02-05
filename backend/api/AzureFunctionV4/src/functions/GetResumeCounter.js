const { app, input, output } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: 'AzureResume',
    containerName: 'Counter',
    id: '1',
    partitionKey: '1',
    connection: 'AzureResumeConnectionString',
});

const cosmosOutput = output.cosmosDB({
    databaseName: 'AzureResume',
    containerName: 'Counter',
    createIfNotExists: false,
    connection: 'AzureResumeConnectionString',
});

app.http('GetResumeCounter', {
    methods: ['GET'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    extraOutputs: [cosmosOutput],
    handler: (request, context) => {
        const inputCounter = context.extraInputs.get(cosmosInput);
        if (!inputCounter) {
            return {
                status: 404,
                body: 'Counter not found',
            };
        } else {
            var updatedCountJson = incrementCounter(inputCounter);

            context.log("Updating CosmosDB");
            context.log(updatedCountJson);
            context.extraOutputs.set(cosmosOutput, updatedCountJson);
            context.log("CosmosDB Updated");

            return {
                body: updatedCountJson,
            };
        }
    },
});

function incrementCounter(inputCounterJson) {
    var updatedCountJson = JSON.stringify({
        id: inputCounterJson.id,
        count: parseInt(inputCounterJson.count) + 1
    });

    return updatedCountJson;
};

module.exports = incrementCounter;
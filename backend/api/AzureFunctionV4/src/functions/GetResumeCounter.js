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
            const updatedCounter = parseInt(inputCounter.count) + 1;

            var updatedCountJson = JSON.stringify({
                id: inputCounter.id,
                count: updatedCounter
            });

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
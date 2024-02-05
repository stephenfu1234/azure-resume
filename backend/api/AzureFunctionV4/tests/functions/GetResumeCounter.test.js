
const { app, context } = require("@azure/functions");
const GetResumeCounter_incrementCounter = require('../../src/functions/GetResumeCounter.js');

// const testInvocationContext = new InvocationContext({
//     functionName: 'GetResumeCounter',
//     invocationId: 'testGetResumeCounterId'
//   });

describe("GetResumeCounter", () => {

    test('Counter incremented by 1', async () => {
        
        const inputCounterJson = {
            "id":"1","count":1
        };

        const expectedOutputCounterJson = JSON.stringify({
            id: "1",
            count: 2
        });
    
        const updatedCounterJson = await GetResumeCounter_incrementCounter(inputCounterJson);
    
        expect(updatedCounterJson).toEqual(expectedOutputCounterJson);
    });
});
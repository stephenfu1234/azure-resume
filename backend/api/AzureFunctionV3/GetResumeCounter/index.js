// async function (context, req, inputCounter) as arguments passed to your function: Use the arguments in the same order that they're defined in function.json
// order matters as the names can be different from function.json but its good practice to keep same
module.exports = async function (context, req, inputCounter) {        
    const updatedCount = parseInt(inputCounter.count) + 1;    
    const responseMessage = "Updated count to " + updatedCount;

    var updatedCountJson = JSON.stringify({
        id: inputCounter.id,
        count: updatedCount
    });

    context.log(updatedCountJson);
    context.bindings.outputCounter = updatedCountJson;
    context.log("Updated CosmosDB")

    context.res = {
        body: responseMessage
    };
}
window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
})

const functionApi = 'https://sfu-azureresume-function-app-v4.azurewebsites.net/api/GetResumeCounter?code=H8qJemskmoNeGExSub-8g6ElCU8tEDrBkc0Od2bYVQjyAzFulycc5w==';
const localFunctionApi = 'http://localhost:7071/api/GetResumeCounter';

const getVisitCount = () => {
    let count = 30;
    fetch(functionApi).then(response => {
        return response.json()
    }).then(response => {
        console.log("Website called function API");
        count = response.count;
        document.getElementById("counter").innerText = count;
    }).catch(function(error) {
        console.log(error);
    });
    return count;
}
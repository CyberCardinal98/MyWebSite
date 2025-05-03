$("#clickMe").on("click", addStuff);
const apiKey = 'fA9rYLV5fF9VPmnBAM5z30c0ihalzAst'
const apiURL = 'https://api.giphy.com/v1/gifs/random?tag=cat&api_key=' + apiKey + '&rating=g';
function addStuff(){
    // $("#textArea").append("<p>YOU CLICKED IT!!</p>"); 
    fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
        const gifURL = data.data.images.original.url;
        console.log(data);
        $("#gifContainer").html(`<img src="${gifURL}" alt="random cat GIF">`);
    })
    .catch(error => {
        console.error('Error fetching GIF:', error);
        $("#gifContainer").html('<p>Whoops! Something went wrong! Please reload!!</p>');
    });
    
}
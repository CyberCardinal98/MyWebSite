$("#submitBtn").on('click', getMultiClassInfo);

function getMultiClassInfo(){
  var inputData = $("#getclass").val();
  var lowercaseInput = inputData.toLowerCase();
  console.log("User input:", inputData);

  const validClasses = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard'];

  if(validClasses.includes(lowercaseInput)){
    const url = `https://www.dnd5eapi.co/api/classes/${lowercaseInput}/multi-classing`;

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);  // Check the structure of the result object

        // Handle prerequisites: Map through them, check for ability_score and minimum_score
        const prerequisites = result.prerequisites && result.prerequisites.length > 0
          ? result.prerequisites.map(item => {
              return `Ability: ${item.ability_score.name} (Minimum Score: ${item.minimum_score})`;
            }).join("<br>")
          : "No prerequisites found.";

        // Handle proficiencies: Map through them, check for name
        const proficiencies = result.proficiencies && result.proficiencies.length > 0
          ? result.proficiencies.map(item => {
              return `Proficiency: ${item.name}`;
            }).join("<br>")
          : "No proficiencies found.";

        // Display the fetched data
        $("#multiClassInfo").html(`
          <h4>Multi-Class Information for ${inputData}</h3>
          <h5>Prerequisites:</h5>
          <p>${prerequisites}</p>
          <h5>Proficiencies:</h5>
          <p>${proficiencies}</p>
        `);
      })
      .catch(error => console.error('Error fetching data:', error));
  } else {
    console.log("Invalid class entry:", inputData);
    $("#multiClassInfo").html("<p>Invalid class entry. Please try again.</p>");
  }
}

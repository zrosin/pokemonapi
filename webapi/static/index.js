// Functionality for Pokemon API Demo Page. 


// helper functions.
function formatPokemon(pokemon) {
    // given a pokemon from the API, this returns HTML that makes it look nice.
    let div = document.createElement("div");
    div.classList.add("pokemon")
    // get the easy attributes.
    div.innerHTML = `
    <p>Name: <span>${pokemon.name}</span></p>
    <p>Pokedex Number: <span>${pokemon.pokedexNumber}</span></p>
    <p>Height (m): <span>${pokemon.height}</p>
    <p>Weight (kg): <span>${pokemon.weight}</p>
    `
    // list of types.
    div.innerHTML += "<p>Types: </p>"
    let typeList = document.createElement("ul");
    div.appendChild(typeList);
    for (let i of pokemon.types) {
        if (i === null) {
            break;
        }
        typeList.innerHTML += `<li>${i}</li>`
    }
    // list of abilities.
    // should probably not just be repeating the code, but it works.
    div.innerHTML += "<p>Abilities: </p>"
    let abilityList = document.createElement("ul");
    div.appendChild(abilityList);
    for (let i of pokemon.abilities) {
        if (i === null) {
            break;
        }
        abilityList.innerHTML += `<li>${i}</li>`
    }
    return div;
}

function formatPokemonTable(arr) {
    // given an array of pokemon objects, returns a HTML table with their attributes.
    let table = document.createElement("table");
    table.classList.add("pokemon");
    // add headers
    table.innerHTML += "<tr><th>Pokédex Number</th><th>Name</th><th>Height (m)</th><th>Weight</th><th>Type(s)</th><th>Abilities</th></tr>"
    for (let i of arr) {
        let tr = document.createElement("tr");
        // add easy attributes
        tr.innerHTML += `
            <td>${i.name}</td>
            <td>${i.pokedexNumber}</td>
            <td>${i.height}</td>
            <td>${i.weight}</td>
        `
        // format types and abilities
        tr.innerHTML += (i.types[1] === null) ? `<td>${i.types[0]}</td>` : `<td>${i.types[0]}, ${i.types[1]}</td>`;
        let formattedAbilities = ""
        for (let j of i.abilities) {
            if (j === i.abilities[0]) {
                // first one in list.
                formattedAbilities = j
            }
            else {
                formattedAbilities += ", " + j;
            }
        }
        tr.innerHTML += `<td>${formattedAbilities}</td>`
        table.appendChild(tr);
    }
    return table;
}


// talking to the server functions

async function addPokemon(form) {
    // given the add form, this formats it right and tries to create a new Pokémon.
    let newPokemon = {};
    newPokemon.pokedexNumber = form.querySelector("#addDexNumber").value;
    newPokemon.name = form.querySelector("#addName").value;
    newPokemon.height = form.querySelector("#addHeight").value;
    newPokemon.weight = form.querySelector("#addWeight").value;
    newPokemon.types = form.querySelector("#addTypes").selectedValues;
    newPokemon.abilities = form.querySelector("#addAbilites").value.split(",");

    let response = await fetch("/api/pokemon/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: (JSON.stringify(newPokemon))
    }).then(r => r.json());
    if ('message' in response ) {
        // uh-oh! There was a problem with the request, so we can't continue.
        let errorText = document.createElement("p");
        errorText.classList.add("error");
        errorText.innerText = response.message;
        return errorText;
    }
    else {
        let parentDiv = document.createElement("div");
        parentDiv.innerHTML = `<p>${newPokemon.name} successfully added!</p>`
        parentDiv.appendChild(formatPokemon(response));
        return parentDiv;
    }
}

async function updatePokemon(form) {
    // given the update form, this formats it right and tries to create a new Pokémon.
    // much of this is the same as addPokemon, but we are hitting a different route and have different parameters.
    let updatedPokemon = {};
    updatedPokemon._id = form.querySelector("#updateID").value;
    updatedPokemon.pokedexNumber = form.querySelector("#updateDexNumber").value;
    updatedPokemon.name = form.querySelector("#updateName").value;
    updatedPokemon.height = form.querySelector("#updateHeight").value;
    updatedPokemon.weight = form.querySelector("#updateWeight").value;
    updatedPokemon.types = form.querySelector("#updateTypes").selectedValues;
    updatedPokemon.abilities = form.querySelector("#updateAbilities").value.split(",");

    let response = await fetch(`/api/pokemon/id/${updatedPokemon._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: (JSON.stringify(updatedPokemon))
    });
    let message = document.createElement("p");
    if (response.ok) {
        message.innerText = `${updatedPokemon.name} successfully updated!`;
    }
    else if(response.status == 400) {
        let errorMessage = await (response.json());
        message.classList.add("error");
        message.innerText = `There was an error. Check your inputs and try again. Error: ${errorMessage.message}`
    }
    else {
        message.classList.add("error");
        message.innerText = `Couldn't find that Pokémon. Did you delete it? Try doing npm run init and running your request again.`
    }
}


async function createUpdateForm(objectID) {
    // given a objectID, we return a form for them to submit edits to it in.
    const response = await fetch(`/api/pokemon/id/${objectID}`).then((r) => r.json());
    if ('message' in response ) {
        // uh-oh! There was a problem with the request, so we can't continue.
        let errorText = document.createElement("p");
        errorText.classList.add("error");
        errorText.innerText = response.message;
        return errorText;
    }
    const pokemon = response;
    let form = document.createElement("form");
    form.innerHTML += 
    `   
        <input type="hidden" id="updateID" name="updateID" value=${pokemon._id}>
        <label for="updateDexNumber">Pokédex Number: </label>
        <input type="number" name="dexNumber" id="updateDexNumber" value=${pokemon.pokedexNumber}><br>
        <label for="updateName">Name: </label>
        <input type="text" id="updateName" name="name" value=${pokemon.name}><br>
        <label for="updateHeight">Height (m): </label>
        <input type=number id="updateHeight" name="height" value=${pokemon.height}><br>
        <label for="updateWeight">Weight (lbs): </label>
        <input type="number" id="updateWeight" name="weight" value=${pokemon.weight}><br><br>
        <label for="updateTypes">Type(s)</label>
        <select multiple name="types" id="updateTypes">
            <option value="" selected disabled>Select some types!</option>
            <!-- filled by fillTypeChoices -->
        </select><br>
        <label for="updateAbilites">Abilities (separated by commas): </label>
        <input type="text" id="updateAbilities" name="abilities"><br><br><br>
        <input type="button" id="updateSubmit" value="Update ${pokemon.name}!"> `

    // fix the mutltiple value fields.
    const types = form.querySelector("#updateTypes");
    fillTypeChoices(types);
    for (let i of types.childNodes) {
        console.log(i);
        if (pokemon.types.includes(i.value)) {
            i.selected = true;
        }
    }
    const abilities = form.querySelector("#updateAbilities");
    abilities.value = pokemon.abilities.join();

    // set up the event listener for the button in the form.
    let updateSubmit = form.querySelector("#updateSubmit");
    updateSubmit.addEventListener("click", async (e) => {

        const oldResult = document.querySelector("#updateResult");
        if(oldResult !== null) {
            oldResult.remove();
        }
        const updateDemo = document.querySelector("#updateDemo");
        const formatted = await updatePokemon(e.target.parentNode);
        formatted.id = "updateResult";
        updateDemo.appendChild(formatted);
    })
    return form;
}

async function getByID(objectID) {
    // given an object ID, this function returns a well formatted Pokemon. 
    const response = await fetch(`/api/pokemon/id/${objectID}`).then((r) => r.json());
    if ('message' in response ) {
        // uh-oh! There was a problem with the request, so we can't continue.
        let errorText = document.createElement("p");
        errorText.classList.add("error");
        errorText.innerText = response.message;
        return errorText;
    }
    return formatPokemon(response);
}
async function deleteByID(objectID) {
    const response = await fetch(`/api/pokemon/id/${objectID}`, {method: "DELETE"});
    let message = document.createElement("p");
    if (response.status == 204) {
        message.innerText = `Deleted object with objectID = ${objectID}`;
    }
    else if(response.status == 400) {
        message.classList.add("error");
        message.innerText = "Deletion failed. Try it again?";
    }
    else {
        // it was a 404.
        message.classList.add("error");
        message.innerText = "Couldn't find the Pokémon with that object ID. Did you already delete it?"
    }
    return message;
}

async function getByDexNumber(dexNumber) {
    // given an object ID, this function returns a well formatted Pokemon. 
    const response = await fetch(`/api/pokemon/pokedex/${dexNumber}`).then((r) => r.json());
    if ('message' in response ) {
        // uh-oh! There was a problem with the request, so we can't continue.
        let errorText = document.createElement("p");
        errorText.classList.add("error");
        errorText.innerText = response.message;
        return errorText;
    }
    return formatPokemon(response);
}

async function getByType(type) {
    // given a single type, this function returns a table of Pokémon with that type.
    const response = await fetch(`/api/pokemon/type/${type}`).then((r) => r.json());
    if ('message' in response ) {
        // uh-oh! There was a problem with the request, so we can't continue.
        let errorText = document.createElement("p");
        errorText.classList.add("error");
        errorText.innerText = response.message;
        return errorText;
    }
    return formatPokemonTable(response);
}

async function getPokemon() {
    // Gets five pokemon, for demos that require the user to choose an object ID.
    // if one was deleted, we return a smaller list.
    // randomness oneliner stolen with some remorse from https://stackoverflow.com/a/34976932
    const dexNumbers = Array(5).fill(0).map(() => (Math.floor(Math.random() * 151) + 1));
    const pokemon = await Promise.all(dexNumbers.map(async i => {
        let r = await fetch(`/api/pokemon/pokedex/${i}`);
        if (r.ok) {
            let values = await r.json();
            return values;
        }
        else {
            // someone deleted one of these.
            return null;
        }
    }));
    return pokemon;
}

async function fillIDChoices(target) {
    // fills a list with objectID choices.
    const pokemon = await getPokemon();
    for(let i of pokemon) {
        let option = document.createElement("option");
        option.value = i._id;
        option.innerText = `Object ${i._id}`;
        target.appendChild(option);
    }
} 

function fillTypeChoices(choices) {
    const types = ["bug","dark","dragon","electric","fairy","fighting","fire","flying","ghost","grass","ground","ice","normal","poison","psychic","rock","steel","water"];
    // let choices = document.querySelector("#typeChoice");
    for(let i of types) {
        let option = document.createElement("option");
        option.value = i
        option.innerText = (i[0].toUpperCase() + i.slice(1));
        choices.appendChild(option);
    }
    

}

// event listener setup. Sorry, this part got a bit out of hand...
document.addEventListener("DOMContentLoaded", async () => {
    // fill in some forms
    const choices = document.querySelector("#idChoice");
    const deleteChoice = document.querySelector("#deleteChoice");
    const updateChoice = document.querySelector("#updateChoice");
    await fillIDChoices(choices);
    await fillIDChoices(deleteChoice);
    await fillIDChoices(updateChoice);
    fillTypeChoices(document.querySelector("#typeChoice"));
    fillTypeChoices(document.querySelector("#addTypes"));
    // add event listeners for specific nodes.
    
    choices.addEventListener("change", async (e) => {
        // remove any existing result.
        const oldResult = document.querySelector("#idDemoResult");
        if(oldResult !== null) {
            oldResult.remove();
        }
        if (e.target.value != "") {
            // format the result and add it under the choices.
            const idDemo = document.querySelector("#idDemo");
            const formatted = await getByID(e.target.value);
            formatted.id = "idDemoResult";
            idDemo.appendChild(formatted);
        }
    });
    let dexNumChoice = document.querySelector("#dexNumChoice");
    dexNumChoice.addEventListener("change", async (e) => {
        // remove any existing result.
        const oldResult = document.querySelector("#dexNumResult");
        if(oldResult !== null) {
            oldResult.remove();
        }
        if (e.target.value != 0 && e.target.value !== null) {
            // format the result and add it under the number box..
            const dexNumDemo = document.querySelector("#dexNumDemo");
            const formatted = await getByDexNumber(e.target.value);
            formatted.id = "dexNumResult";
            dexNumDemo.appendChild(formatted);
        }
    });
    let typeChoice = document.querySelector("#typeChoice");
    typeChoice.addEventListener("change", async (e) => {
        const oldResult = document.querySelector("#typeResult");
        if(oldResult !== null) {
            oldResult.remove();
        }
        if (e.target.value != "" && e.target.value !== null) {
            // format the result and add it under the choices.
            const dexNumDemo = document.querySelector("#typeDemo");
            const formatted = await getByType(e.target.value);
            formatted.id = "typeResult";
            typeDemo.appendChild(formatted);
        }
    });
    let deleteButton = document.querySelector("#deleteButton");
    deleteButton.addEventListener("click", async () => {
        const oldResult = document.querySelector("#deleteResult");
        if(oldResult !== null) {
            oldResult.remove();
        }
        const deleteDemo = document.querySelector("#deleteDemo");
        const deleteChoice = document.querySelector("#deleteChoice");
        if(deleteChoice.value !== "") {
            const formatted = await deleteByID(deleteChoice.value);
            formatted.id = "deleteResult";
            deleteDemo.appendChild(formatted);
        }
    });
    let submitButton = document.querySelector("#addSubmit");
    submitButton.addEventListener('click', async (e) =>
    {
        const oldResult = document.querySelector("#addResult");
        if(oldResult !== null) {
            oldResult.remove();
        }
        const addDemo = document.querySelector("#addDemo");
        const formatted = await addPokemon(e.target.parentNode);
        formatted.id = "addResult";
        addDemo.appendChild(formatted);
    });
    updateChoice.addEventListener("change", async (e) => {
        const oldForm = document.querySelector("#updateForm");
        if (oldForm !== null) {
            oldForm.remove();
        }
        const oldResult = document.querySelector("#updateResult");
        if (oldResult !== null) {
            oldResult.remove();
        }
        const updateDemo = document.querySelector("#updateDemo");
        const formatted = await createUpdateForm(e.target.value);
        formatted.id = "updateForm";
        updateDemo.appendChild(formatted);
    });
    const getAllButton = document.querySelector("#getAllButton");
    getAllButton.addEventListener("click", async (e) => {
        // would've made a separate function, but this is the only place the get all route is used.
        
        let oldTable = document.querySelector("#getAllTable");
        if (oldTable !== null) {
            oldTable.remove();
        }
        const getAllDiv = e.target.parentNode;
        let response = await fetch("/api/pokemon/").then(r => r.json());
        let formatted = null;
        if ('message' in response) {
            formatted = document.createElement("p");
            formatted.classList.add("error");
            formatted.innerText = response.message;
        }
        else {
            formatted = formatPokemonTable(response);
        }
        formatted.id = "getAllTable";
        getAllDiv.appendChild(formatted);
    })
});
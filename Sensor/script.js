let json = [
    {
        "id": 100,
        "bygning": "Femøvej",
        "lokale": "001",
        "temperatur": "23.9",
        "luftfugtighed": 37,
        "co2": 466,
        "luftkvalitet": 3.07,
        "lysniveau": 346,
        "lysfarve": 2986,
        "lydniveau": 36
    },
    {
        "id": 101,
        "bygning": "Femøvej",
        "lokale": "002",
        "temperatur": "12.9",
        "luftfugtighed": 27,
        "co2": 422,
        "luftkvalitet": 2.07,
        "lysniveau": 396,
        "lysfarve": 3111,
        "lydniveau": 35
    },
    {
        "id": 102,
        "bygning": "Femøvej",
        "lokale": "101",
        "temperatur": "23.5",
        "luftfugtighed": 33,
        "co2": 566,
        "luftkvalitet": 3.24,
        "lysniveau": 312,
        "lysfarve": 2989,
        "lydniveau": 32
    },
    {
        "id": 103,
        "bygning": "Maglemølle",
        "lokale": "101",
        "temperatur": "34.9",
        "luftfugtighed": 37,
        "co2": 399,
        "luftkvalitet": 3.17,
        "lysniveau": 446,
        "lysfarve": 2532,
        "lydniveau": 82
    },
    {
        "id": 104,
        "bygning": "Maglemølle",
        "lokale": "102",
        "temperatur": "23.2",
        "luftfugtighed": 32,
        "co2": 189,
        "luftkvalitet": 3.12,
        "lysniveau": 336,
        "lysfarve": 2678,
        "lydniveau": 44
    }
]

function printData() {
    for (let i = 0; i < json.length; i++) {
        console.log(json[i])
    }
}

function insertData() {
    // EXTRACT VALUE FOR HTML HEADER.
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    let col = [];
    for (let i = 0; i < json.length; i++) {
        for (let key in json[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    let table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    let tr = table.insertRow(-1);                   // TABLE ROW.

    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (let i = 0; i < json.length; i++) {

        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    let divContainer = document.getElementById("table");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

    //TODO: Farven på tabellen skal ændre sig ift. grænseværdier
}

// insertData();

function getData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let parsedJSON = JSON.parse(this.responseText)
            console.log(parsedJSON);
            insertData2(parsedJSON);
        }
    };
    xhttp.open("GET", "/data/sensordata.json", true);
    xhttp.send();
}

getData();

function insertData2(parsedJSON) {
    let dataArray = parsedJSON['sensors'];

    let div = document.getElementById('container');

    let table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-dark');

    let thead = document.createElement('thead');

    let trHeader = document.createElement('tr');
    let firstObject = dataArray[0];
    let keys = Object.keys(firstObject);
    for (let key of keys) {
        let th = document.createElement('th');
        th.scope = "col";
        let uppercaseFirstLetter = key.charAt(0).toUpperCase() + key.slice(1);
        th.innerText = uppercaseFirstLetter;
        trHeader.appendChild(th);
    }

    thead.appendChild(trHeader);
    table.appendChild(thead);

    let tbody = document.createElement('tbody');

    for (let sensorData of dataArray) {
        let tr = document.createElement('tr');

        for (let key in sensorData) {
            let td = document.createElement('td');
            let value = sensorData[key];
            td.innerText = value;
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    div.appendChild(table);
}
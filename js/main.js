// Función para consultar todos los registros
function getAllRecords() {
    fetch('//3.89.68.139/php-intro-connection/getRecords.php') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            populateTable(data);
        })
        .catch(error => console.error('Error:', error));
}

// Función para consultar registros por código de letra de 3 caracteres
function getAllRecordsById() {
    const code = document.getElementById('recordCode').value;
    if (code.length === 3) { // Asegurarse de que el código tenga 3 caracteres
        fetch(`//3.89.68.139/php-intro-connection/getRecordById.php?code=${code}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la red: ' + response.status);
                }
                return response.json(); // Analizar como JSON
            })
            .then(data => {
                // Asegúrate de que data sea un array
                if (data.error) {
                    alert(data.error); // Muestra el error si no se encuentra el registro
                } else {
                    populateTable([data]); // Siempre pasamos un array
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Por favor, ingresa un código de letra de 3 caracteres');
    }
}

// Función para poblar la tabla con los registros
function populateTable(records) {
    const tbody = document.querySelector('#recordsTable tbody');
    tbody.innerHTML = ''; // Limpiar la tabla

    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.Code}</td>
            <td>${record.Name}</td>
            <td>${record.Continent}</td>
            <td>${record.Region}</td>
            <td>${record.SurfaceArea}</td>
            <td>${record.Population}</td>
        `;
        tbody.appendChild(row);
    });
}

// Función para obtener la IP del cliente y mostrar el botón correspondiente
function showButtonsBasedOnIp() {
    fetch('//3.89.68.139/php-intro-connection/index.php') // Solicita la IP del cliente
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const country = data.country;
            const continent = data.continent;

            // Muestra los botones según la IP
            if (country) {
                document.getElementById('btnCountry').style.display = 'inline-block';
            }
            if (continent) {
                document.getElementById('btnContinent').style.display = 'inline-block';
            }
        })
        .catch(error => console.error('Error:', error));
}

// Llamar a la función al cargar la página
window.onload = showButtonsBasedOnIp;

// Funciones para manejar la consulta según la selección
function getAllRecordsByCountry() {
    fetch('//3.89.68.139/php-intro-connection/getRecordsByCountry.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al consultar por país: ' + response.status);
            }
            return response.json();
        })
        .then(data => populateTable(data))
        .catch(error => console.error('Error:', error));
}

function getAllRecordsByContinent() {
    fetch('//3.89.68.139/php-intro-connection/getRecordsByContinent.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al consultar por continente: ' + response.status);
            }
            return response.json();
        })
        .then(data => populateTable(data))
        .catch(error => console.error('Error:', error));
}

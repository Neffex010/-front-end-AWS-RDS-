// Función para consultar todos los registros
function getAllRecords() {
    fetch('//34.226.214.154/php-intro-connection/getRecords.php') // Cambia localhost a tu IP pública
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

// Función para consultar mi pais
function getAllRecordsByCountry() {
    fetch('//34.226.214.154/php-intro-connection/getRecordsByCountry.php') 
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
// Función para consultar los paises que estan en mi continente
function getAllRecordsByContinent() {
    fetch('//34.226.214.154/php-intro-connection/getRecordsByContinent.php') 
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
/* // Función para consultar las ciudades que estan en mi pais 
function getAllRecordsByCity() {
    fetch('//54.166.156.64/php-intro-connection/getRecordsByCity.php') 
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

} */


// Función para poblar la tabla con los registros country
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



/*  function populateTable(data) {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Limpia la tabla antes de agregar nuevos datos

    if (data.error) {
        console.error(data.error); // Muestra el error en la consola si lo hay
        alert('Error: ' + data.error);
        return;
    }

    // Recorre los registros y los agrega a la tabla
    data.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.ID}</td>
            <td>${record.Name}</td>
            <td>${record.CountryCode}</td>
            <td>${record.District}</td>
            
        `;
        tableBody.appendChild(row);
    });
} */ 


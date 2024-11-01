// Función para obtener la ubicación y configurar los botones en función del país o continente
function setupButtons() {
    axios.get('https://3.89.68.139/php-intro-connection/index.php')
        .then(response => {
            const data = response.data;
            const countryButton = document.getElementById('countryButton');
            const continentButton = document.getElementById('continentButton');

            // Verifica si la respuesta contiene datos de país y continente
            if (data && data.country_name) {
                countryButton.style.display = 'inline-block'; // Muestra el botón de países
                countryButton.addEventListener('click', () => fetchLocationBasedRecords('country'));
            }
            if (data && data.continent_name) {
                continentButton.style.display = 'inline-block'; // Muestra el botón de continentes
                continentButton.addEventListener('click', () => fetchLocationBasedRecords('continent'));
            }
        })
        .catch(error => console.error('Error al obtener la ubicación:', error));
}

// Función para realizar consultas basadas en la ubicación (país o continente)
function fetchLocationBasedRecords(type) {
    let endpoint = '';

    if (type === 'country') {
        endpoint = 'https://3.89.68.139/php-intro-connection/getRecordsByCountry.php';
    } else if (type === 'continent') {
        endpoint = 'https://3.89.68.139/php-intro-connection/getRecordsByContinent.php';
    }

    // Realiza la solicitud de consulta a la base de datos
    axios.get(endpoint)
        .then(response => {
            const records = response.data;
            displayRecords(records);
        })
        .catch(error => console.error('Error al obtener los registros:', error));
}

// Función para mostrar los registros en la tabla HTML
function displayRecords(records) {
    const tbody = document.getElementById('recordsTableBody');
    tbody.innerHTML = ''; // Limpiar la tabla antes de poblarla

    // Crear filas para cada registro y añadirlas a la tabla
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

// Inicializar la configuración de botones al cargar la página
document.addEventListener('DOMContentLoaded', setupButtons);

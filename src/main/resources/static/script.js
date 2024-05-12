function checkFiles(files) {
    console.log("Files received:", files); // Debug: log received files

    const answerPart = document.getElementById('answerPart');
    const preview = document.getElementById('preview');
    const answer = document.getElementById('answer');

    if (files.length !== 1) {
        alert("Bitte genau eine Datei hochladen.");
        return;
    }

    const fileSize = files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 10) {
        alert("Datei zu groß (max. 10Mb)");
        return;
    }

    answerPart.style.visibility = "visible";
    const file = files[0];

    // Preview
    preview.src = URL.createObjectURL(file);

    // Upload
    const formData = new FormData();
    formData.append("image", file);

    fetch('/analyze', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    }).then(data => {
        console.log("Data received:", data); // Debug: log the parsed data
        displayResults(data);
    }).catch(error => {
        console.error('Error:', error);
        answer.innerHTML = 'Error processing your request. ' + error.message;
    });
}
console.log(results)
function displayResults(results) {
    const container = document.getElementById('answer');
    container.innerHTML = ''; // Clear previous content

    results.forEach(result => {
        const formattedResult = `${result.className}: ${(result.probability * 100).toFixed(2)}%`;
        const resultElement = document.createElement('p');
        resultElement.textContent = formattedResult;
        resultElement.className = 'alert alert-secondary'; // Bootstrap class for styling
        container.appendChild(resultElement);
    });
}

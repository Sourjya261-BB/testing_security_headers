document.getElementById('simple-cors').addEventListener('click', () => {
    fetch('http://localhost:3000/simple_cors/get_data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('response').innerText = JSON.stringify(data);
        })
        .catch(error => {
            document.getElementById('response').innerText = 'Error: ' + error.message;
        });
});

document.getElementById('complex-cors').addEventListener('click', () => {
    fetch('http://localhost:3000/complex_cors/get_data')
        .then(response => {
            if (!response.ok) {
                throw new Error('CORS error: Origin not allowed');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('response').innerText = JSON.stringify(data);
        })
        .catch(error => {
            document.getElementById('response').innerText = 'Error: ' + error.message;
        });
});

document.getElementById('csp-example').addEventListener('click', () => {
    const enableCSP = confirm('Enable CSP header? Click OK for yes, Cancel for no.');
    fetch(`http://localhost:3000/csp_example?csp=${enableCSP}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('response').innerText = JSON.stringify(data);
        })
        .catch(error => {
            document.getElementById('response').innerText = 'Error: ' + error.message;
        });
});
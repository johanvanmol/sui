function fetchAndRender (name) {
    fetch(name + '.json')
        .then(response => response.json())
        .then(data => {
            const mysource = document.getElementById(name + '-template').innerHTML;
            const mytemplate = Handlebars.compile(mysource);
            const myresult = mytemplate(data);
            document.getElementById(name).innerHTML = myresult;
        });
}

function getAuthors() {
    try {
        const response = await fetch('https://vtvjefdhglfhyozijooc.supabase.co/rest/v1/bers-parameters-auteurs',
            {
                method: 'GET',
                headers: { 'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0dmplZmRoZ2xmaHlvemlqb29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA3NzI3MDksImV4cCI6MTk4NjM0ODcwOX0.ELk6PnDbvOEzKYtYjGXpKtvhgcMRVcw6comQenCn8Wg' }
            });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const authors = await response.json();
            console.log(authors);
        }
    } catch (error) {
        console.log('There was a problem with the fetch operation: ' + error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndRender('apps');
    fetchAndRender('links');
    fetchAndRender('providers');
    fetchAndRender('phonenumbers');
    getAuthors();
});

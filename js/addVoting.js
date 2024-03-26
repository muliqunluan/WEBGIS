document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('votingForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var votingTheme = document.getElementById('votingTheme').value;
        var votingDescription = document.getElementById('votingDescription').value;
        var options = [];
        $('.option-input').each(function() {
            var optionValue = $(this).val().trim();
            if (optionValue !== '') {
              options.push(optionValue);
            }
          });
        var data = {
            votingTheme:votingTheme,
            votingDescription:votingDescription,
            options:options
        }
        fetch('/subVoting', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data) 
        })
        .then(function(response){
            if(response.ok){
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(function(data){
            alert(data.message);
        })
        .catch(function(error) {
            console.log('Error',error);
        })
    })
});
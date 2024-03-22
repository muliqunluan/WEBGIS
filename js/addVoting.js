document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('votingForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var votingTheme = document.getElementById('votingTheme').value;
        var option1 = document.getElementById('option1').value;
        var option2 = document.getElementById('option2').value;
        var option3 = document.getElementById('option3').value;
        var option4 = document.getElementById('option4').value;
        var option5 = document.getElementById('option5').value;
        var data = {
            votingTheme:votingTheme,
            option1:option1,
            option2:option2,
            option3:option3,
            option4:option4,
            option5:option5
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

function userData(event){
    event.preventDefault();

}

function appendData(data){
    for (var i=0; i<data.length; i++) {
        var username, firstName, lastName, email;
        var userInfo = "";
        if (data[i].username)
            username = data[i].username;
        userInfo += ("<li><strong>User Name: </strong>" + username + " ");
        if (data[i].firstName)
            firstName = data[i].firstName;
        userInfo += ("<strong>// Name: </strong>" + firstName + " ");
        if (data[i].lastName)
            lastName = data[i].lastName;
        userInfo += (lastName + " ");
        if (data[i].email)
            email = data[i].email;
        userInfo += ("<strong>// Email: </strong>" + email + "</li>");
        $('.displayUsers').append(userInfo);
    }
}


$(document).ready(function(){

    $( "#registerForm" ).on( "submit", function( event ) {
        event.preventDefault();
        var formInfo = $(this).serialize();
        $.ajax({
            url: '/views/users.html',
            data: formInfo,
            method: 'post',
            dataType: 'json',
            beforeSend: function(){
              console.log("THIS IS GOING OUT! ", formInfo);
            },
            success: function(data, textStatus, jqXHR){
                appendData(data);
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(textStatus,errorThrown);
            },
            complete: function(jqXHR, textStatus){
                console.log("userData() Complete:", textStatus);
            }
        });
    });
});
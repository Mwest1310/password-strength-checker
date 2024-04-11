

const changeTheme = () => {
    $("#root").hasClass("dark") ? $("#root").removeClass("dark").addClass("light") : $("#root").removeClass("light").addClass("dark")
}


jQuery(function() {
    const lowerCase = /[a-z]/;
    const upperCase = /[A-Z]/;
    const numbers = /\d/;
    const special = /\W/;
    //const invalid = /\s/;
    let strength = 0;

    $("#submit").on("click", function() {
        $password = $("#password").val();
        if($password.length < 8) {
            $("#advice").text("Your password must be 8+ characters long");
            return;
        }
        if($password.match(/\s/)) {
            $("#advice").text("Your password must not include spaces");
            return;
        }
        if($password.match(lowerCase)) {
            strength ++;
        }
        if($password.match(upperCase)) {
            strength ++;
        }
        if($password.match(numbers)) {
            strength ++;
        }
        if($password.match(special)) {
            strength ++;
        }

        switch(strength) {
            case 1:
                $("#advice").text(strength + " : Your password is not strong enough. Try to include capital letters, numbers and special characters");
                break;
            
            case 2:
                $("#advice").text(strength + " : Your password is somewhat strong, but should be improved. Try to include capital letters, numbers and/or special characters");
                break;
            case 3:
                $("#advice").text(strength + " : Your password is strong but can still be improved. Try to include capital letters, numbers or special characters");
                break;
            case 4:
                $("#advice").text(strength + " : Your password is very strong. Congratulations!")
                break;
        }
    })
})
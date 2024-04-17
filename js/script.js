

const changeTheme = () => {
    $("#root").hasClass("dark") ? $("#root").removeClass("dark").addClass("light") : $("#root").removeClass("light").addClass("dark");
    $("li").hasClass("fa-lightbulb") ? $("li").removeClass("fa-lightbulb").addClass("fa-moon") : $("li").removeClass("fa-moon").addClass("fa-lightbulb");
}


jQuery(function() {
    const lowerCase = /[a-z]/;
    const upperCase = /[A-Z]/;
    const numbers = /\d/;
    const special = /\W/;
    //const invalid = /\s/;
    

    $("#submit").on("click", function() {
        let strength = 0;
        $password = $("#password").val();
        if($password.length < 8) {
            $("#advice").text("Your password must be 8+ characters long");
            return;
        }
        if(/\s/.test($password)) {
            $("#advice").text("Your password must not include spaces");
            return;
        }
        if(lowerCase.test($password)) {
            strength ++;
        }
        if(upperCase.test($password)) {
            strength ++;
        }
        if(numbers.test($password)) {
            strength ++;
        }
        if(special.test($password)) {
            strength ++;
        }
        console.log(strength);
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
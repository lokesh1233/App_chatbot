$(document).ready(function(){
    let btclk= 0;
    $('.chat-profile').click(function(){
        btclk +=1;
        if(btclk%2!=0){
            $('.profile-dropdown').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
        }else{
            $('.profile-dropdown').css({opacity: 0.0, visibility: "hidden"}).animate({opacity: 1.0}, 200);
        }  
    });
});

function applyDarkTheme()
{
    document.body.style.backgroundColor = "#424242";
    document.getElementById("timeKeeperH3").style.color = "white";



}



try
{
    var settingsObject = JSON.parse(localStorage.getItem("settingsObject"));
}
catch (e)
{



}


$(document).ready(function()
{
    if(settingsObject == null || settingsObject == undefined)
    {
        settingsObject =
        {
            theme: "bright" //Proof of concept!

        };
        localStorage.setItem("settingsObject",JSON.stringify(settingsObject));

    }
    else
    {
        //replace current settings with settings from settingsObject
        switch (settingsObject.theme)
        {
            case "bright":
                break;
            case "dark":
                applyDarkTheme();
                break;



        }

    }



});

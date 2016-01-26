
function killSpace(string)
{

    return string.trim();
}

String.prototype.toHHMMSS = function ()
{
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time = hours+':'+minutes+':'+seconds;
    return time;
};

$(document).ready(function()
{
    $('select').material_select();
    $('.modal-trigger').leanModal();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 1 year to control year
        container: 'body'
    });
    $(".button-collapse").sideNav();

    $('#creditButton').click(function()
    {
        alert("Credits:\nIdea: Deadlocker\nUI/Code: spaghettic0der")

    });

});
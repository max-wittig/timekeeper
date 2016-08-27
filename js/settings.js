var defaultServerURL = "../../timekeeperServer/timekeeperServer.php";

function updateServerText()
{
    $('#serverHostInput').val(localStorage.getItem("serverHost"));
}

function loadHost()
{
    if (localStorage.getItem("serverHost") == null)
        localStorage.setItem("serverHost", defaultServerURL);
    updateServerText();
}

function restoreDefault()
{
    localStorage.setItem("serverHost", defaultServerURL);
    updateServerText();
}

$(document).ready(function ()
{
    loadHost();
    $('#restoreDefaultServerButton').click(function ()
    {
        restoreDefault();
    });

    $('#serverHostButton').click(function ()
    {
        localStorage.setItem("serverHost", $('#serverHostInput').val());
    });
});
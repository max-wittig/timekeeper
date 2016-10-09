var serverURL = "../../timekeeperServer/timekeeperServer.php";


function loadServerHost()
{
    if (localStorage.getItem("serverHost") != null)
    {
        serverURL = localStorage.getItem("serverHost");
    }

}


$(document).ready(function ()
{
    loadServerHost();
    var d = new Date();
    var n = Math.floor(d.getTime() / 1000);
    let lastRecoredSyncTime = (localStorage.getItem("lastSyncTime"));
    if (localStorage.getItem("autoSync") == "true" && (lastRecoredSyncTime == null || (n - lastRecoredSyncTime) > 10))
    {
        localStorage.setItem("lastSyncTime", n);
        console.log("Synced with server");
        let secretData = JSON.parse(localStorage.getItem("secretData"));
        if (secretData != null)
        {
            let username = secretData["username"];
            let password = secretData["password"];
            $.post(serverURL,
                {
                    "username": username,
                    "password": password
                }, function (data, error)
                {
                    try
                    {
                        var json = JSON.parse(data);
                        if (json != null && json != undefined)
                        {
                            localStorage.setItem('saveObjectArray', JSON.stringify(json.saveObjectArray));
                            localStorage.setItem('saveProjectArray', JSON.stringify(json.saveProjectArray));
                            location.href = "../html/timekeeper.html";
                        }
                    }
                    catch (e)
                    {
                        alert("Login failed");
                    }
                });
        }
    }
});
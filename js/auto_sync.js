var serverURL = "../../timekeeperServer/timekeeperServer.php";


function loadServerHost()
{
    if (localStorage.getItem("serverHost") != null)
    {
        serverURL = localStorage.getItem("serverHost");
    }

}

var hashFunction = function getCurrentHash(username, callback)
{
    $.post(serverURL,
        {
            "username": username,
            "hash": "true"
        }, function (data, error)
        {
            callback(data);
        });
};

let username = "";
var password = "";

$(document).ready(function ()
{
    var secretData = JSON.parse(localStorage.getItem("secretData"));
    if (secretData != null)
    {
        username = secretData["username"];
        password = secretData["password"];
    }
    else
    {
        return;
    }
    loadServerHost();
    let usernameHash = localStorage.getItem("hash");
    hashFunction(username, function (data)
    {
        let currentHash = data;
        console.log(usernameHash);
        console.log(currentHash);
        var d = new Date();
        var n = Math.floor(d.getTime() / 1000);
        let lastRecoredSyncTime = (localStorage.getItem("lastSyncTime"));
        if (localStorage.getItem("autoSync") == "true" && (lastRecoredSyncTime == null || (n - lastRecoredSyncTime) > 10) && usernameHash != currentHash)
        {
            localStorage.setItem("hash", currentHash);
            localStorage.setItem("lastSyncTime", n);
            console.log("Synced with server");

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
    });

});
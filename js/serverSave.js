var serverURL = "../../timekeeperServer/timekeeperServer.php";

function insertLoginData(rememberLoginCheckBox)
{
	var secretData = JSON.parse(localStorage.getItem("secretData"));
		if(secretData == null)
		{
				console.log("secretData is null")
		}
		else
		{
			$('#usernameInput').val(secretData.username);
			$('#passwordInput').val(secretData.password);
			rememberLoginCheckBox.prop('checked', true);
		}
}

function loadServerHost()
{
	if (localStorage.getItem("serverHost") != null)
	{
		serverURL = localStorage.getItem("serverHost");
	}

}

function loadAutoSync()
{
	if (localStorage.getItem("autoSync") != null)
	{
		if (localStorage.getItem("autoSync") == "true") //fk you js
		{
			console.log(localStorage.getItem("autoSync"));
			$('#autoSyncCheckBox').prop('checked', true);
		}
		else
		{
			$('#autoSyncCheckBox').prop('checked', false);
		}
	}
}

function loadFromServer()
{
	var rememberLoginCheckBox = $('#rememberLoginCheckBox');
	var username = $('#usernameInput').val();
	var password = $('#passwordInput').val();

	if (rememberLoginCheckBox.is(':checked'))
	{
		var secretData =
		{
			username: username,
			password: password
		};

		localStorage.setItem("secretData", JSON.stringify(secretData));
	}

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

if(typeof (Storage) !== "undefined")
{

	$(document).ready(function() 
	{
		loadServerHost();
		loadAutoSync();
		var rememberLoginCheckBox = $('#rememberLoginCheckBox');
		if (!rememberLoginCheckBox.is(':checked'))
		{
			$('#autoSyncCheckBox').removeAttr("disabled")
		}
		else
		{
			$('#autoSyncCheckBox').attr("disabled", "disabled")
		}

		insertLoginData(rememberLoginCheckBox);

		$('#saveToServerButton').click(function()
		{

			var username = $('#usernameInput').val();
			var password = $('#passwordInput').val();
			if(rememberLoginCheckBox.is(':checked'))
			{
				var secretData =
				{
					username: username,
					password: password
				};

				localStorage.setItem("secretData",JSON.stringify(secretData));
			}

			var everything =
			{
				saveProjectArray: JSON.parse(localStorage.getItem("saveProjectArray")),
				saveObjectArray: JSON.parse(localStorage.getItem("saveObjectArray"))
			};

			$.post(serverURL,
				{
					"username": username,
					"password": password,
					"jsonString": JSON.stringify(everything),
					"complete": true
				}, function (data, error)
				{
					location.href = "../html/timekeeper.html";
				});
		});

		rememberLoginCheckBox.click(function()
		{
			if(!rememberLoginCheckBox.is(':checked'))
			{
				localStorage.removeItem("secretData");
				$('#autoSyncCheckBox').attr("disabled", "disabled")
			}
			else
			{
				$('#autoSyncCheckBox').removeAttr("disabled")
			}
		});

		let autoSyncCheckBox = $('#autoSyncCheckBox');
		autoSyncCheckBox.click(function ()
		{
			if (localStorage.getItem("autoSync") == null)
				localStorage.setItem("autoSync", false);

			if (autoSyncCheckBox.is(':checked'))
			{
				localStorage.setItem("autoSync", true);
			}
			else
			{
				localStorage.setItem("autoSync", false);
			}
		});

		$('#loadFromServerButton').click(function()
		{
			loadFromServer()
		});

	});


}

var serverURL = "http://127.0.0.1:3000/timekeeperServer.php";

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


if(typeof (Storage) !== "undefined")
{

	$(document).ready(function() 
	{
		var rememberLoginCheckBox = $('#rememberLoginCheckBox');
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
			}
		});

		$('#loadFromServerButton').click(function()
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
		});

	});


}

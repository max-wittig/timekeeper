

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

		var socket = io();
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
				type: "Complete",
				saveProjectArray: localStorage.getItem("saveProjectArray"),
				saveObjectArray: localStorage.getItem("saveObjectArray"),
				settingsObject: localStorage.getItem("settingsObject"),
				saveVersion: saveVersion
			};

			socket.emit('saveTimeKeeperString', JSON.stringify(everything), username, password);
			location.href = "../html/timekeeper.html";
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

			socket.emit('loadTimeKeeperString',username,password);
		});

		socket.on('loadTimeKeeperString', function (saveString)
		{
			var everything = JSON.parse(saveString.toString());
			console.log(everything);
			if (everything != null && everything != undefined)
			{
				localStorage.setItem('saveObjectArray', everything.saveObjectArray);
				localStorage.setItem('saveProjectArray', everything.saveProjectArray);
				location.href = "../html/timekeeper.html";
			}
		});

		socket.on('loadTimeKeeperStringFail',function()
		{
			alert("Wrong data!");

		});

	});


}

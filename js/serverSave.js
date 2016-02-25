

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

			var saveObjectArrayString = localStorage.getItem('saveObjectArray');
			var saveProjectArrayString = localStorage.getItem('saveProjectArray');
			socket.emit('saveTimeKeeperString',saveObjectArrayString,saveProjectArrayString,username,password);
			location.href = "../html/timekeeper.html"; //TODO NOT HARDCODE
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

		socket.on('loadTimeKeeperString',function(saveProjectArray,saveObjectArray)
		{
			
			localStorage.setItem('saveObjectArray',saveObjectArray);
			localStorage.setItem('saveProjectArray',saveProjectArray);
			location.href = "../html/timekeeper.html";

		});

		socket.on('loadTimeKeeperStringFail',function()
		{
			alert("Wrong data!");

		});

	});


}

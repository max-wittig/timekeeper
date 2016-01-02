
var spaghettic0derURL = "https://spaghettic0der.noip.me:8000/timekeeper";

if(typeof (Storage) !== "undefined")
{

	$(document).ready(function() 
	{

		var socket = io();
		var rememberLoginCheckBox = $('#rememberLoginCheckBox');

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

			$('#serverModal').closeModal();
			location.href = spaghettic0derURL; //TODO NOT HARDCODE
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
			$('#serverModal').closeModal();
			localStorage.setItem('saveObjectArray',saveObjectArray);
			localStorage.setItem('saveProjectArray',saveProjectArray);
			location.href = spaghettic0derURL; //TODO DO NOT HARDCODE

		});

		socket.on('loadTimeKeeperStringFail',function()
		{
			alert("Wrong data!");

		});

		//Modal button clicked
		$('#serverModalButton').click(function()
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

		});

	});


}
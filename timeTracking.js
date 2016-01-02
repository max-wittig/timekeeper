

var started = false;
var stopButtonActive = false;
var startButtonActive = true;
var interval;
var w;


if(typeof (Storage) !== "undefined")
{

    function showTable()
    {
        var logTable = document.getElementById('logTable');
        var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));

        if(saveObjectArray == null || saveObjectArray == undefined)
        {
            console.log("No local storage for saveObjectArray!");
        }
        else
        {
            //deletes the table --> jQuery
            $('#logTable').empty();

            //Table Head
            //var headerRow = logTable.insertRow(0);
            var headerHead = logTable.createTHead();
            var headerRow = headerHead.insertRow(0);
            for(var keyThing in saveObjectArray[0])
            {
                //Duration in sec is not important to show
                if(keyThing != "durationInSec")
                {
                    var header = headerRow.insertCell(-1);
                    header.textContent = keyThing.toUpperCase();
                }


            }

            //Create Table body
            var tableBody = logTable.createTBody();

            //loops though every object in saveObjectArray and prints out table rows
            for(var object in saveObjectArray)
            {
                    var contentRow = tableBody.insertRow(0);

                    for(var keyCode in saveObjectArray[object])
                    {
                        //Duration in sec is not important to show
                        if(keyCode != "durationInSec")
                        {
                            //content
                            var cell = contentRow.insertCell(-1);
                            cell.textContent = saveObjectArray[object][keyCode];
                        }


                    }

            }

        }

    }


    $(document).ready(function ()
    {
        var startButton = $('#startButton');
        var stopButton = $('#stopButton');
        var clockLabel = $('#clockLabel');
        var start;
        var end;
        var startTime;
        var endTime;

        showTable();

        startButton.click(function()
        {

			if(startButtonActive)
			{
				

				selectedTask = $('#taskSelect option:selected').text();
				selectedProject = $('#projectSelect option:selected').text();


				if(selectedProject == "" || selectedProject == " " || selectedProject == undefined || selectedTask == " " || selectedTask == "" || selectedTask == undefined || selectedProject == "undefined")
				{
					alert("Please select a project and a task to continue!");

				}
				else
				{
					//disable select
					$('#taskSelect').prop('disabled', 'disabled');
					$('#projectSelect').prop('disabled', 'disabled');
					$('select').material_select();
					
					startButtonActive = false;
					stopButtonActive = true;
					importButtonActive = false;

					//This be the normal solution but startButton is not a button it's an <a> and we're using http://materializecss.com/buttons.html
					//startButton.disabled = true;
					//startButton.text = "Task running...";
					startButton.attr('class','btn disabled');
					//startButton.text('Runs...');
					stopButton.attr('class','waves-effect waves-light btn blue-grey darken-1');
					//$('#importButton').attr('class','disabled');

                    //for browser which do not support webWorkers
                    function updateClock()
                    {
                        var durSec = moment().diff(start,'seconds');
                        var totalDur = durSec.toString().toHHMMSS();
                        startButton.text(totalDur);

                    }

                    //records time
					startTime = moment().format("DD.MM.YYYY - HH:mm:ss");
					start = moment();

					started = true;

                    if(typeof(Worker) !== "undefined")
                    {
                        // Yes! Web worker support!
                        if(typeof(w) == "undefined")
                        {
							try //if site runs local webWorkers are not supported!
							{
								w = new Worker("webworker.js");
								w.postMessage(JSON.stringify(start));
								var startTestButton = document.getElementById('startButton');
								w.addEventListener('message', function(e)
								{
									startTestButton.textContent = e.data;
								}, false);
								
							}
							catch(e)
							{
								// Sorry! No Web Worker support..
								interval = setInterval(updateClock,1000);
							}
                           
                        }
                    }
                    else
                    {
                        // Sorry! No Web Worker support..
                        interval = setInterval(updateClock,1000);
                    }
				}
			}


        });

        stopButton.click(function()
        {

			if(stopButtonActive)
			{

				//stop the clock, if webworker is supported
                if(typeof(w) != "undefined")
                {
                    w.terminate();
                    w = undefined;
                }

                //stop the clock, when no webworker support
                if(interval != undefined && interval != null)
                clearInterval(interval);

				//enable select
				$('#projectSelect').prop('disabled', '');
				$('projectSelect').material_select();

				stopButtonActive = false;
				startButtonActive = true;
				importButtonActive = true;

				//enable select
				$('#taskSelect').prop('disabled', '');
				$('select').material_select();

				//activate Button again
				startButton.attr('class','waves-effect waves-light btn blue-grey darken-1');
				//$('#importButton').attr('class','waves-effect waves-light btn');

                //Node Way of doing things
                var startButtonTest = document.getElementById("startButton");
                var iTag = document.createElement("i");
                iTag.className = 'material-icons';
                iTag.textContent = "play_arrow";
                startButtonTest.textContent = "";
                startButtonTest.appendChild(iTag);

				stopButton.attr('class','btn disabled');

				endTime = moment().format("DD.MM.YYYY - HH:mm:ss");
				end = moment();
				started = false;
				var durSec = end.diff(start,'seconds');
				var totalDur = durSec.toString().toHHMMSS();

				//save logic
				var saveObject =
				{
					startTime: startTime,
					endTime: endTime,
					projectName: selectedProject,
					taskName: selectedTask,
					duration: totalDur,
                    durationInSec: durSec

				};

				//gets object out of the array
				var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));

				//if no array in local storage --> create array
				if(saveObjectArray == null)
				saveObjectArray = [];

				//Push object in array
				saveObjectArray.push(saveObject);

				//save objectarray with saveObjects in local storage
				localStorage.setItem("saveObjectArray",JSON.stringify(saveObjectArray));

				showTable();

			}
		});

    });
}
else
{
    alert("to bad, too old browser");
}
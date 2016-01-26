var selectedTask;
var selectedProject;



function sortProjectByName(arr)
{
    if(arr != null && arr != undefined)
    {
        arr.sort(function (a, b)
        {
            if (a.name.toLowerCase() > b.name.toLowerCase())
            {
                return 1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase())
            {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
    }
    return arr;
}

function sortTaskListByName(taskList)
{
    if(taskList != null && taskList != undefined)
    {
        taskList.sort(function (a, b)
        {
            if (a.toLowerCase() > b.toLowerCase())
            {
                return 1;
            }
            if (a.toLowerCase() < b.toLowerCase())
            {
                return -1;
            }
            // a must be equal to b
            return 0;

        });
    }
    return taskList;

}




if(typeof (Storage) !== "undefined")
{

    $(document).ready(function()
    {



        var projectSelect = document.getElementById("projectSelect");
        var taskSelect = document.getElementById("taskSelect");

        if(localStorage.length > 0)
        {
            loadValues();

        }

        function loadValues()
        {

            //Array
            var saveProjectArray = JSON.parse(localStorage.getItem("saveProjectArray"));
            //console.log(saveProjectArray[0].name);
            saveProjectArray = sortProjectByName(saveProjectArray);

            //Goes through whole array
			if(saveProjectArray != null)
			{
				for(var i=0; i< saveProjectArray.length; i++)
				{
                    if(saveProjectArray[i].frozen == null || saveProjectArray[i].frozen == false)
                    {
                        var option = document.createElement("option");
                        option.text = saveProjectArray[i].name;
                        option.value = saveProjectArray[i].name;
                        projectSelect.add(option);
                    }
				}

            $('select').material_select();
			}
        }

        $('#projectSelect').change(function()
        {

            var projectName = $('#projectSelect option:selected').text();
            selectedProject = projectName;

            //Contains objects
            var saveProjectArray = JSON.parse(localStorage.getItem("saveProjectArray"));
            saveProjectArray = sortProjectByName(saveProjectArray);

            //delete old tasks of potentially old project (with jquery)
            $('#taskSelect').empty();

            //empty option to prevent "undefined from showing up in selected task
            var emptyOptionTask = document.createElement("option");
            emptyOptionTask.text = " ";
            taskSelect.add(emptyOptionTask);


            for(var j=0; j < saveProjectArray.length; j++)
            {
                if(saveProjectArray[j].name == projectName)
                {
                    var taskListing = saveProjectArray[j].taskList;
                    taskListing = sortTaskListByName(taskListing);

                    if(taskListing == null)
                    {
                        console.log("Task Listing == null");
                    }
                    else
                    {
                        for(var i=0; i < taskListing.length;i++)
                        {
                            var optionTask = document.createElement("option");
                            optionTask.text = taskListing[i];
                            optionTask.value = taskListing[i];
                            taskSelect.add(optionTask);
                        }

                    }

                    //To refresh the select
                    $('select').material_select();

                    break;
                }



            }




        });


        //different task was chosen
        $('#taskSelect').change(function()
        {
           selectedTask = $('#taskSelect option:selected').text();

        });


        $('#clearLocaleStorage').click(function()
        {
            if (confirm('Are you sure you want to delete everything?'))
            {
                localStorage.removeItem("saveObjectArray");
                localStorage.removeItem("saveProjectArray");
                $('select').empty();
                location.reload();
                $('table').empty();

            }

        });

        //updates the UI options
        function reloadProjects()
        {
            $('#projectSelect').empty();
            var saveProjectArray = JSON.parse(localStorage.getItem("saveProjectArray"));
            for(var i = 0; i < saveProjectArray.length; i++)
            {
                var option = document.createElement("option");
                option.textContent = saveProjectArray[i].name;
                option.value = saveProjectArray[i].name;
                projectSelect.add(option);

            }
            //To refresh the select
            $('select').material_select();
        }


        $('#addProjectButton').click(function()
        {
            var addProjectInput = $('#addProjectInput');

            //Gets ProjectName From Input field
            var projectName = addProjectInput.val();

            //kills space in projectName
            projectName = killSpace(projectName);

            //deletes input field
            addProjectInput.val("");

            if(projectName != "")
            {
                //get saveProjectArray
                var saveProjectArray = JSON.parse(localStorage.getItem("saveProjectArray"));

                //bool to checkIf Project Name Already exists
                var projectNameAlreadyInSaveProjectArray = false;
                if(saveProjectArray == null)
                {
                    console.log("saveProjectArray == null");
                    saveProjectArray = [];
                }
                else
                {
                    for (var j = 0; j < saveProjectArray.length; j++)
                    {
                        if (saveProjectArray[j].name == projectName)
                        {
                            projectNameAlreadyInSaveProjectArray = true;
                            break;
                        }

                    }
                }

                //Didn't find project --> create it
                //Found project --> do nothing
                if(!projectNameAlreadyInSaveProjectArray)
                {
                    //because Project doesn't exist we can create a new empty taskList
                    var taskList = [];
                    var projectObject =
                    {
                        name: projectName,
                        taskList: taskList,
                        frozen: false
                    };


                    saveProjectArray.push(projectObject);

                    //sorts the projects by name
                    saveProjectArray = sortProjectByName(saveProjectArray);

                    localStorage.setItem("saveProjectArray", JSON.stringify(saveProjectArray));

                    reloadProjects();
                    //set selected to the last added
                    $('#projectSelect').val(projectName);

                    //To refresh the select
                    $('select').material_select();

                }
                else
                {
                    //Project exists so we select it
                    //set selected to the last added
                    $('#projectSelect').val(projectName);

                    //To refresh the select
                    $('select').material_select();

                }
            }

        });

        function reloadTasks(taskSelectJ,taskList)
        {
            //var taskSelect = $('#taskSelect');
            //delete old tasks of potentially old project (with jquery)
            taskSelectJ.empty();
            //Loops through every task and throws it in select
            for (var j = 0; j < taskList.length; j++)
            {
                var option = document.createElement("option");
                option.text = taskList[j];
                option.value = taskList[j];
                taskSelect.add(option);
            }
            //To refresh the select
            $('select').material_select();

        }

        $('#addTaskButton').click(function()
        {
            var addTaskInput = $('#addTaskInput');
            var taskSelectJ = $('#taskSelect');

            //gets the projectname from the selected project
            var projectName = $('#projectSelect option:selected').text();

            //gets the taskName from the input field
            var taskName = addTaskInput.val();

            //kills space in TaskName
            taskName = killSpace(taskName);

            if(projectName == "" || taskName == "")
            {
                alert("Empty String!");
            }
            else
            {
                if (projectName == undefined || projectName == "")
                {
                    alert("No project selected!");
                }
                else
                {

                    //deletes input field
                    addTaskInput.val("");

                    //pulls the tasklist out of the object
                    var saveProjectArray = JSON.parse(localStorage.getItem("saveProjectArray"));
                    for(var i=0; i < saveProjectArray.length; i++)
                    {
                        if(saveProjectArray[i].name == projectName)
                        {
                            var taskList = saveProjectArray[i].taskList;

                            //loop through taskList to see if task is already in the project
                            var taskIsInTaskList = false;
                            for(var x=0; x < taskList.length; x++)
                            {
                                if(taskName == taskList[x])
                                {
                                    taskIsInTaskList = true;
                                    break;
                                }

                            }

                            if(!taskIsInTaskList)
                            {
                                taskList.push(taskName);
                            }
                            saveProjectArray[i].taskList = taskList;

                            break;

                        }
                    }

                    //sorts the taskList by name
                    taskList = sortTaskListByName(taskList);
                    reloadTasks(taskSelectJ,taskList);

					//set selected to the last added jQuery
                    taskSelectJ.val(taskName);

                    //To refresh the select
                    $('select').material_select();

                    //save task array back to project object
                    localStorage.setItem("saveProjectArray", JSON.stringify(saveProjectArray));

                }
            }
        });

    });

}
else
{
    //No Storage Support
    alert("Your browser is too old for this stuff or you have things disabled!");
}
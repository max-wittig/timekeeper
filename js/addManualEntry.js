
function insertData(startTime,endTime,projectName,taskName,duration, durationInSec)
{

    //saveProjectArray------------------------------------------------------------->

    //get localStorage Objects --> Arrays
    var saveProjectArray = JSON.parse(localStorage.getItem("saveProjectArray"));
    projectName = killSpace(projectName);
    taskName = killSpace(taskName);

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
                var taskListing = saveProjectArray[j].taskList;

                if (taskListing == null)
                {
                    console.log("Task Listing == null");
                }
                else
                {
                    //Check if task is already in taskList
                    var isInList = false;
                    for(var i=0; i < taskListing.length; i++)
                    {
                        if(taskName == taskListing[i])
                        {
                            isInList = true
                        }
                    }

                    if(!isInList)
                    taskListing.push(taskName);

                    saveProjectArray[j].taskList = taskListing;

                }
                break;
            }

        }
    }

    //Didn't find project --> create it
    //Found project --> do nothing
    if(!projectNameAlreadyInSaveProjectArray)
    {
        var taskList = [taskName];
        var projectObject =
        {
            name: projectName,
            taskList: taskList,
            frozen: false
        };

        //pushes new ProjectObject in Array
        saveProjectArray.push(projectObject);

    }

    //Save back to local storage
    localStorage.setItem("saveProjectArray",JSON.stringify(saveProjectArray));



    //saveObjectArray ---------------------------------------------------------->

    //get from local storage --> array
    var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));

    if(saveObjectArray == null)
    {
        saveObjectArray = [];
    }

    //create new saveObject
    var saveObject =
    {
        startTime: startTime,
        endTime: endTime,
        projectName: projectName,
        taskName: taskName,
        durationInSec: durationInSec,
        UUID: generateUUID()
    };

    saveObjectArray.push(saveObject);

    localStorage.setItem("saveObjectArray",JSON.stringify(saveObjectArray));
    sortTable(); //sorts whole Table in bubbleSort
    location.reload(); //TODO update graphics instead of reloading whole page

}

if(typeof (Storage) !== "undefined")
{
    $(document).ready(function ()
    {
        var addToTableButton = $('#addToTableButton');

        addToTableButton.click(function()
        {
            //Get inputs
            var startDateInput = $('#startDateInput');
            var endDateInput = $('#endDateInput');
            var startTimeInput = $('#startTimeInput');
            var endTimeInput = $('#endTimeInput');
            var durationLabel = $('#durationLabel');
            var projectInput = $('#projectInput');
            var taskInput = $('#taskInput');

            //get data
            var startCalender = new Date(startDateInput.val());
            var startYear = startCalender.getFullYear();
            var startMonth = startCalender.getMonth()+1; //Month is zero indexed!!!
            var startDate = startCalender.getDate();

            //get data
            var endCalender = new Date(endDateInput.val());
            var endYear = endCalender.getFullYear();
            var endMonth = endCalender.getMonth() + 1; //Month is zero indexed!!!
            var endDate = endCalender.getDate();



            //format
            var start = moment(startYear + "." + startMonth + "." + startDate + " "  + startTimeInput.val(),"YYYY.MM.DD HH.mm.ss");
            var startString = start.format("DD.MM.YYYY - HH:mm:ss");

            var end = moment(endYear + "." + endMonth + "." + endDate + " "  + endTimeInput.val(),"YYYY.MM.DD HH.mm.ss");
            var endString = end.format("DD.MM.YYYY - HH:mm:ss");

            //get duration in seconds
            var duration = end.diff(start,'seconds');
            var durationString = duration.toString().toHHMMSS();

            if(start.isValid() && end.isValid())
            {
                if(duration >= 0)
                {
                    insertData(startString,endString,projectInput.val(),taskInput.val(),durationString,duration);
                }
                else
                {
                    alert("Invalid Duration, start > end?");
                }
            }
            else
            {
                alert("Not a valid date!");
            }

        });


    });

}
else
{
    console.log("browser too old!");
}
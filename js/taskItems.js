function download(filename, text)
{
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}


function downloadFromTaskFromLocalStorage(UUID)
{
    var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));
    if (saveObjectArray != null)
    {
        for (var i = 0; i < saveObjectArray.length; i++)
        {
            if (saveObjectArray[i].UUID == UUID)
            {
                var toDownload =
                {
                    saveVersion: 1.4,
                    type: "SingleTask",
                    saveObject: saveObjectArray[i]
                };
                console.log("Test");
                download(saveObjectArray[i].projectName + " - " + saveObjectArray[i].taskName + ".json", JSON.stringify(toDownload));
            }
        }
    }
}


function changeTaskFromLocalStorage(row, newProjectName, newTaskName)
{
    var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));
    if (saveObjectArray != null)
    {
        for (var i = 0; i < saveObjectArray.length; i++)
        {
            if (saveObjectArray[i].UUID == row.id)
            {
                saveObjectArray[i].projectName = newProjectName;
                saveObjectArray[i].taskName = newTaskName;
            }

        }

        localStorage.setItem("saveObjectArray", JSON.stringify(saveObjectArray));
    }
}


function deleteFromLocalStorage(row)
{
    var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));
    if(saveObjectArray != null)
    {
        for(var i=0; i < saveObjectArray.length; i++)
        {
            if (saveObjectArray[i].UUID == row.id)
            {
                saveObjectArray.splice(i,1);
            }

        }

        localStorage.setItem("saveObjectArray",JSON.stringify(saveObjectArray));
    }

}


$(document).ready(function()
{
    //clicked button in tableRow
   //$('tr a').click(function() --> doesn't work because it's dynamically created!
    $('table').on('click',"tr a",function()
    {
        var row = this.parentNode.parentNode;
        var cells = row.getElementsByTagName('td');
        if (this.id == "deleteTaskButton")
        {
            //first parent == td, second is tr
            if (confirm('Are you sure you want to delete the Task: ' + cells[3].textContent + ' started on ' + cells[0].textContent + '?'))
            {
                deleteFromLocalStorage(row);
                row.remove();
            }
        }
        else if (this.id == "editTaskButton")
        {
            var newProjectName = prompt("Insert new Projectname", cells[2].textContent);
            var newTaskName = prompt("Insert new TaskName", cells[3].textContent);

            //console.log(encodeURI(localStorage.getItem("saveObjectArray")));
            if (newProjectName != null && newTaskName != null)
            {
                changeTaskFromLocalStorage(row, newProjectName, newTaskName);
                cells[2].textContent = newProjectName;
                cells[3].textContent = newTaskName;
            }

        }
        else if (this.id == "taskExportButton")
        {
            downloadFromTaskFromLocalStorage(row.id);
        }

   });


});
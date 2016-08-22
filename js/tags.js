function loadTags(saveProjectArray)
{
    for (var i = 0; i < saveProjectArray.length; i++)
    {
        var project = saveProjectArray[i];
        var tableRow = document.getElementById("row_" + project.name);
        var input = document.createElement("input");
        input.className = "tagsInput";

        if (saveProjectArray[i].tags != undefined)
        {
            input.value = saveProjectArray[i].tags.toString();
        }


        input.id = "text_" + project.name;
        tableRow.appendChild(input);
    }

    $(".tagsInput").materialtags();
}



$(document).ready(function ()
{


    var checkBoxContainer = document.getElementById("checkBoxContainer");
    var div = checkBoxContainer.getElementsByTagName("div")[0];
    var saveProjectArray = JSON.parse(localStorage.getItem("saveProjectArray"));
    loadTags(saveProjectArray);
    if (saveProjectArray == null)
        saveProjectArray = [];


    function setProjectTags(projectName, tags)
    {
        for (var i = 0; i < saveProjectArray.length; i++)
        {
            if (saveProjectArray[i].name == projectName)
            {
                var projectObject = saveProjectArray[i];
                projectObject.tags = tags;
                break;
            }
        }
        localStorage.setItem("saveProjectArray", JSON.stringify(saveProjectArray));
    }

    $('input').on('itemAdded', function (event)
    {
        var projectName = this.id.split("_")[1];
        var items = $(this).materialtags('items');
        setProjectTags(projectName, items);
    });

    $('input').on('itemRemoved', function (event)
    {
        var projectName = this.id.split("_")[1];
        var items = $(this).materialtags('items');
        setProjectTags(projectName, items);
    });

});
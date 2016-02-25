var saveVersion = "1.2";
var importButtonActive = true;

$(document).ready(function()
{

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


    $('#exportButton').click(function()
    {

        var everything =
        {
            type: "Complete",
            saveProjectArray: JSON.parse(localStorage.getItem("saveProjectArray")),
            saveObjectArray: JSON.parse(localStorage.getItem("saveObjectArray")),
            settingsObject: JSON.parse(localStorage.getItem("settingsObject")),
            saveVersion: saveVersion,
            exportDate: moment().format("DD.MM.YYYY - HH:mm:ss")
        };
        var timeKeeperSaveFileName = "timeKeeper - " + moment().format("DD.MM.YYYY - HH:mm:ss") + ".json";

        download(timeKeeperSaveFileName,JSON.stringify(everything));
    });


    $('#importButton').click(function()
    {
        if(importButtonActive)
        {
            $('#fileImport').click();
        }
    });

    function convertLegacyJSON(json)
    {
        for (var i = 0; i < json.saveObjectArray.length; i++)
        {
            //console.log(importString.saveObjectArray[i].startTime);
            json.saveObjectArray[i].UUID = generateUUID();
        }
        return json;
    }


    function setImport(importString)
    {
        var saveObjectArray = importString.saveObjectArray;
        var saveProjectArray = importString.saveProjectArray;
        var settingsObject = importString.settingsObject;
        localStorage.setItem("saveObjectArray", JSON.stringify(saveObjectArray));
        localStorage.setItem("saveProjectArray", JSON.stringify(saveProjectArray));
        localStorage.setItem("settingsObject",JSON.stringify(settingsObject));
        sortTable(); //Input Data is sorted before page is reloaded!
        location.reload();
    }

    //returns a valid projectObject from a saveObject
    function buildProjectObject(saveObject)
    {
        var projectObject =
        {
            name: saveObject.projectName,
            taskList: [saveObject.taskName],
            frozen: false
        };
        return projectObject;
    }


    //checks if project is already in saveProjectArray
    function addProjectToArray(saveObject)
    {
        var saveProjectArray = JSON.parse(localStorage.getItem("saveProjectArray"));
        if (saveProjectArray == null)
        {
            saveProjectArray = [buildProjectObject(saveObject)];
        }
        else
        {
            var containsProject = false;
            for (var i = 0; i < saveProjectArray.length; i++)
            {
                if (saveObject.projectName == saveProjectArray[i].name)
                {
                    containsProject = true;
                    var containsTaskList = false;
                    //loop taskList of Project
                    for (var j = 0; j < saveProjectArray[i].taskList.length; j++)
                    {
                        if (saveProjectArray[i].taskList[j] == saveObject.taskName)
                        {
                            containsTaskList = true;
                            break;
                        }
                        else
                        {
                            saveProjectArray[i].taskList.push(saveObject.taskName);
                        }
                    }
                    break;
                }
            }

            if (!containsProject)
            {
                saveProjectArray.push(buildProjectObject(saveObject));
            }

        }
        localStorage.setItem("saveProjectArray", JSON.stringify(saveProjectArray));

    }

    function importSingleTask(importString)
    {
        var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));
        var isAlreadyImported = false;
        if (saveObjectArray != null)
        {
            for (var i = 0; i < saveObjectArray.length; i++)
            {
                if (importString.saveObject.UUID == saveObjectArray[i].UUID)
                {
                    isAlreadyImported = true;
                }
            }
        }
        else
        {
            saveObjectArray = [];
        }

        if (!isAlreadyImported)
        {
            saveObjectArray.push(importString.saveObject);
            addProjectToArray(importString.saveObject);
            localStorage.setItem("saveObjectArray", JSON.stringify(saveObjectArray));
            sortTable();
            location.reload();
        }
        else
        {
            alert("The object is already imported!");
        }
    }

    $('#fileImport').change(function()
    {
        function processFile(e)
        {
            var file = e.target.result,results;
            if (file && file.length)
            {
                try
                {
                    var importString = JSON.parse(file);
                    if (importString.saveVersion >= 1.2)
                    {
                        switch (importString.type)
                        {
                            case "SingleTask":
                                importSingleTask(importString);
                                break;
                            case "Complete":
                            default:
                                setImport(importString);
                                break;
                        }
                    }
                    else
                    {
                        if (importString.saveVersion < 1.2)
                        {
                            setImport(convertLegacyJSON(importString));
                        }
                    }
                }
                catch(e)
                {
                    alert("File needs to be a JSON!\n" + e);

                }
            }
        }


        var input = $('#fileImport').get(0);

        // Create a reader object
        var reader = new FileReader();
        if (input.files.length)
        {
            var textFile = input.files[0];
            // Read the file
            reader.readAsText(textFile);
            // When it's loaded, process it
            $(reader).on('load', processFile);
        }

    });







});
var saveVersion = "1.4";
var importButtonActive = true;


$(document).ready(function ()
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


    $('#exportButton').click(function ()
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

        download(timeKeeperSaveFileName, JSON.stringify(everything, null, 3));
    });


    $('#importButton').click(function ()
    {
        if (importButtonActive)
        {
            $('#fileImport').click();
        }
    });

    function generateUUIDforAllObjects(json)
    {
        for (var i = 0; i < json.saveObjectArray.length; i++)
        {
            //console.log(importString.saveObjectArray[i].startTime);
            json.saveObjectArray[i].UUID = generateUUID();
        }
        return json;
    }

    function removeMomentjsTImeFromAllObjects(json)
    {
        for (var i = 0; i < json.saveObjectArray.length; i++)
        {
            console.log(json.saveObjectArray[i].duration);
            console.log(json.saveObjectArray[i]["duration"]);
            delete json.saveObjectArray[i]["duration"];
        }
        return json;
    }

    function convertLegacyJSON(json)
    {
        var saveVersion = json.saveVersion;
        console.log(saveVersion);
        switch (saveVersion)
        {
            case "1.2":
                return generateUUIDforAllObjects(json);
            case "1.3":
                return removeMomentjsTImeFromAllObjects(json);
            default:
                return json;
        }

    }


    function setImport(importString)
    {
        var saveObjectArray = importString.saveObjectArray;
        var saveProjectArray = importString.saveProjectArray;
        var settingsObject = importString.settingsObject;
        localStorage.setItem("saveObjectArray", JSON.stringify(saveObjectArray));
        localStorage.setItem("saveProjectArray", JSON.stringify(saveProjectArray));
        localStorage.setItem("settingsObject", JSON.stringify(settingsObject));
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
                    }

                    if (!containsTaskList)
                    {
                        saveProjectArray[i].taskList.push(saveObject.taskName);
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

    function importAndMerge(importString)
    {
        var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));
        if (saveObjectArray == null)
            saveObjectArray = [];
        var currentSaveObjectArray = importString.saveObjectArray;


        var saveObjectArrayUUID = [];
        var currentSaveObjectArrayUUID = [];

        //fill array from localStorage
        for (var i = 0; i < saveObjectArray.length; i++)
        {
            saveObjectArrayUUID.push(saveObjectArray[i].UUID);
        }
        console.log("SaveObjectArrayUUID: " + saveObjectArrayUUID);

        //fill array from file
        for (var j = 0; j < currentSaveObjectArray.length; j++)
        {
            currentSaveObjectArrayUUID.push(currentSaveObjectArray[j].UUID);
        }
        console.log("currentSaveObjectArrayUUID: " + currentSaveObjectArrayUUID.length);

        //throw UUIDs out of save which are already in localStorage
        for (var x = 0; x < currentSaveObjectArrayUUID.length; x++)
        {
            for (var t = 0; t < saveObjectArrayUUID.length; t++)
            {
                if (currentSaveObjectArrayUUID[x] == saveObjectArrayUUID[t])
                {
                    currentSaveObjectArrayUUID.splice(x, 1);
                }
            }
        }

        console.log("currentSaveObjectArrayUUID: " + currentSaveObjectArrayUUID.length);

        //find every Object from currentSaveProjectArray based on the UUID, which currently isn't part of the saveFile
        for (var o = 0; o < currentSaveObjectArrayUUID.length; o++)
        {
            for (var y = 0; y < currentSaveObjectArray.length; y++)
            {
                if (currentSaveObjectArray[y].UUID == currentSaveObjectArrayUUID[o])
                {
                    addProjectToArray(currentSaveObjectArray[y]);
                    saveObjectArray.push(currentSaveObjectArray[y]);
                    console.log("Tasks to add! :" + currentSaveObjectArray[y].taskName);
                }
            }
        }

        if (currentSaveObjectArrayUUID.length > 0)
        {
            //addProjectToArray(importString.saveObject);
            localStorage.setItem("saveObjectArray", JSON.stringify(saveObjectArray));
            sortTable();

            location.reload();
        }
        else
        {
            alert("Nothing to merge!");
        }
    }

    $('#fileImport').change(function ()
    {
        function processFile(e)
        {
            var file = e.target.result, results;
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
                            case "Incomplete":
                                importAndMerge(importString);
                                break;
                            case "Complete":
                            default:
                                setImport(importString);
                                break;
                        }
                    }
                    else
                    {

                        setImport(convertLegacyJSON(importString));

                    }
                }
                catch (e)
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

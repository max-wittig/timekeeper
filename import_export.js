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

                    if(importString.saveVersion == saveVersion)
                    {
                        setImport(importString);
                    }
                    else
                    {
                        if (importString.saveVersion < 1.2)
                        {
                            for (var i = 0; i < importString.saveObjectArray.length; i++)
                            {
                                //console.log(importString.saveObjectArray[i].startTime);
                                importString.saveObjectArray[i].UUID = generateUUID();
                                setImport(importString);
                            }
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

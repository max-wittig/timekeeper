$(document).ready(function()
{
    function openPage(html)
    {
        var url = "data:text/html;charset=utf-8,";
        window.location.href = url + html;
    }


    $('#printButton').click(function()
    {
        var html = document.implementation.createDocument ('http://www.w3.org/1999/xhtml', 'html', null);
        var body = document.createElementNS('http://www.w3.org/1999/xhtml', 'body');
        var head = document.createElementNS('http://www.w3.org/1999/xhtml', 'head');
        var h1 = document.createElement("h1");
        h1.textContent = "Time Keeper Print";
        h1.style = "font-size: 120%";
        body.appendChild(h1);

        var logTablePrint = document.createElement('table');
        logTablePrint.id = "logTablePrint";

        var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));
        if(saveObjectArray != null && saveObjectArray != undefined)
        {
            //Table Head
            var tableHead = logTablePrint.createTHead();
            var headerRow = tableHead.insertRow(0);  //TODO maybe use thead instead sometime...
            for (var keyThing in saveObjectArray[0])
            {
                if (keyThing != "durationInSec" && keyThing != "UUID")
                {
                    var header = headerRow.insertCell(-1);
                    header.textContent = keyThing.toUpperCase();
                }
            }

            var tableBody = logTablePrint.createTBody();

            //loops though every object in saveObjectArray and prints out table rows
            for (var object in saveObjectArray)
            {
                var contentRow = tableBody.insertRow(0);
                for (var keyCode in saveObjectArray[object])
                {
                    if (keyCode != "durationInSec" && keyCode != "UUID")
                    {
                        //content
                        var cell = contentRow.insertCell(-1);
                        cell.textContent = saveObjectArray[object][keyCode];

                    }
                    contentRow.id = saveObjectArray[object].UUID;
                }

            }


            //style
            var styleNode = document.createElement('style');
            styleNode.setAttribute("type", "text/css");
            var textNode = document.createTextNode('h1 {font-size: 40px; text-align: center}' +
                " table { width: 100%;}" + 'thead { text-decoration: underline; }');


            styleNode.appendChild(textNode);
            head.appendChild(styleNode);

            body.appendChild(logTablePrint);
            html.documentElement.appendChild(head);
            html.documentElement.appendChild(body);


            //download("timeTrackerPrintExport.html",html.documentElement.innerHTML);
            openPage(html.documentElement.innerHTML);
        }
        else
        {
            alert("No data to print!");
        }
    });




});

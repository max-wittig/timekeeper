$(document).ready(function()
{
    var saveProjectArray = JSON.parse(localStorage.getItem("saveProjectArray"));
    var checkBoxContainer = document.getElementById("checkBoxContainer");
    var table = document.createElement("table");


    for(var i=0; i < saveProjectArray.length; i++)
    {
        var tableRow = table.insertRow();
        tableRow.id = "row__" + saveProjectArray[i].name;
        //for frozen attribute
        var p = document.createElement("p");
        var checkBox = document.createElement("input");

        checkBox.type = 'checkbox';
        checkBox.id = "input_" + saveProjectArray[i].name;

        if(saveProjectArray[i].frozen != true)
        {
            checkBox.checked = "true";
        }


        p.appendChild(checkBox);

        var label = document.createElement("label");
        label.htmlFor = saveProjectArray[i].name;
        label.textContent = saveProjectArray[i].name;
        p.appendChild(label);
        tableRow.appendChild(p);
        table.appendChild(tableRow);


    }

    checkBoxContainer.appendChild(table);

    $('tr p').click(function ()
    {
        var input = this.getElementsByTagName("input")[0];
        input.click();
        var checked = input.checked;

       for(var i=0; i < saveProjectArray.length; i++)
       {
           console.log(input.id.toString().split("_")[1]);
           if (saveProjectArray[i].name.toString() == input.id.toString().split("_")[1])
           {
               if(checked == true)
               {
                   saveProjectArray[i].frozen = false;
                   //alert(this.checked);
               }
               else
               {
                   saveProjectArray[i].frozen = true;
                   //alert(this.checked);
               }
               break;
           }
       }

        localStorage.setItem("saveProjectArray",JSON.stringify(saveProjectArray));
    });




});
$(document).ready(function()
{
    var saveProjectArray = JSON.parse(localStorage.getItem("saveProjectArray"));
    var checkBoxContainer = document.getElementById("checkBoxContainer");

    for(var i=0; i < saveProjectArray.length; i++)
    {
        var p = document.createElement("p");
        var checkBox = document.createElement("input");

        checkBox.type = 'checkbox';
        checkBox.id = saveProjectArray[i].name;

        if(saveProjectArray[i].frozen != true)
        {
            checkBox.checked = "true";
        }


        p.appendChild(checkBox);

        var label = document.createElement("label");
        label.htmlFor = saveProjectArray[i].name;
        label.textContent = saveProjectArray[i].name;
        p.appendChild(label);

        checkBoxContainer.appendChild(p);
    }


    $('input').click(function()
    {
        var checked = this.checked;


       for(var i=0; i < saveProjectArray.length; i++)
       {
           if(saveProjectArray[i].name.toString() == this.id.toString())
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

           }
       }

        localStorage.setItem("saveProjectArray",JSON.stringify(saveProjectArray));
    });




});
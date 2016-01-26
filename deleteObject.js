

function deleteFromLocalStorage(cells)
{
    var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));
    if(saveObjectArray != null)
    {
        for(var i=0; i < saveObjectArray.length; i++)
        {
            //TODO maybe use tags to not hardCode table cells
            if(saveObjectArray[i].startTime == cells[0].textContent
                && saveObjectArray[i].endTime == cells[1].textContent
                && saveObjectArray[i].projectName == cells[2].textContent
                && saveObjectArray[i].taskName == cells[3].textContent)
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

        //first parent == td, second is tr
       var row = this.parentNode.parentNode;
       var cells = row.getElementsByTagName('td');
       if (confirm('Are you sure you want to delete the Task: ' + cells[3].textContent + ' started on ' + cells[0].textContent + '?'))
       {
           deleteFromLocalStorage(cells);
           row.remove();
       }


   });


});
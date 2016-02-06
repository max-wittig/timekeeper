
//saves year
var yearArray = [];
var monthArray = [];



function getTaskTimes(taskName)
{
    var totalCount = 0;
    var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));
    if(saveObjectArray != null)
    {
        for(var i=0; i < saveObjectArray.length; i++)
        {
            if(saveObjectArray[i].taskName == taskName)
            {
                totalCount = totalCount + saveObjectArray[i].durationInSec;
            }

        }

        return totalCount;
    }
}


function isYearInArray(year)
{
    for(var i=0; i < yearArray.length; i++)
    {
        if(yearArray[i] == year)
        return true;

    }

    return false;
}

function isMonthInArray(month)
{
    for(var i=0; i < monthArray.length; i++)
    {
        if(monthArray[i] == month)
        return true;

    }

    return false;
}

function getMonthStringFromMonthNumber(monthNumber)
{
    switch (monthNumber)
    {
        case 1: return "January";
        case 2: return "February";
        case 3: return "March";
        case 4: return "April";
        case 5: return "May";
        case 6: return "June";
        case 7: return "July";
        case 8: return "August";
        case 9: return "September";
        case 10: return "October";
        case 11: return "November";
        case 12: return "December";
        default: return "Invalid Month!";
    }

}
function updateSelectUI(string)
{

    //doesn't work with jQuery
    var yearSelect = document.getElementById('yearSelect');
    var monthSelect = document.getElementById('monthSelect');
    var dateSelect = document.getElementById('dateSelect');
    if(string == "year")
    {
        //clear Year UI
        $('#yearSelect').empty();

        //updates MonthUI
        var option1 = document.createElement("option");
        option1.text = "ALL";
        option1.value = "ALL";
        monthSelect.add(option1);

        //updates YearUI
        var option2 = document.createElement("option");
        option2.text = "ALL";
        option2.value = "ALL";
        yearSelect.add(option2);


        for(var i=0; i < yearArray.length; i++)
        {
            var yearOption = document.createElement("option");
            yearOption.text = yearArray[i];
            yearOption.value = yearArray[i];
            yearSelect.add(yearOption);
        }

    }
    else
    if(string == "month")
    {

        //updates MonthUI
        var option = document.createElement("option");
        option.text = "ALL";
        monthSelect.add(option);

        for(var j=0; j < monthArray.length; j++)
        {
            var monthOption = document.createElement("option");
            monthOption.text = (monthArray[j] + 1) + " - " + getMonthStringFromMonthNumber((monthArray[j] + 1));
            monthOption.value = monthArray[j];
            monthSelect.add(monthOption);
        }


     }

    //To refresh the select
       $('select').material_select();


}

function filterData_ALL_ALL(selectedYear,selectedMonth,saveProjectArray,saveObjectArray,collapsibleUI,totalTimeElement)
{

    var totalSelectedTime = 0;
    var relevantProjectArray = [];  //ProjectNames are saved here
    var relevantObjectArray = []; //Objects are saved here

    for(var i=0; i < saveObjectArray.length; i++)
    {
        var startTime = saveObjectArray[i].startTime;
        var startTimeMoment = moment(startTime, "DD.MM.YYYY - HH:mm:ss");
        var year = startTimeMoment.get('year');
        var month = startTimeMoment.get('month');

        var projectIsContained = false;

            //Add All Projects to Array
            for(var x=0; x < relevantProjectArray.length; x++)
            {
                //
                if(saveObjectArray[i].projectName == relevantProjectArray[x])
                {
                    projectIsContained = true;
                    relevantObjectArray.push(saveObjectArray[i]); //push because it's relevant anyway even if projectName is a duplicate. Object is not
                    break;
                }

            }

            //Push All Projects in Temp Array
            if(!projectIsContained)
            {
                //Pushes whole Object in Array
                relevantProjectArray.push(saveObjectArray[i].projectName);
                relevantObjectArray.push(saveObjectArray[i]);
                //console.log(saveObjectArray[i]);

            }


    }


    //loops through the relevant projects
    for(var p=0; p < relevantProjectArray.length; p++)
    {
        var totalProjectTime = 0;
        var projectName = relevantProjectArray[p];
        var relevantTaskArray = []; //belongs to project --> filter is needed!

        //loops through relevant Objects
        for(var u=0; u < relevantObjectArray.length; u++)
        {
            if(relevantProjectArray[p] == relevantObjectArray[u].projectName)
            {
                totalProjectTime = totalProjectTime + relevantObjectArray[u].durationInSec;
                relevantTaskArray.push(relevantObjectArray[u]);
            }
        }

        var li = document.createElement('li');

        var collHead = document.createElement('div');
        collHead.className = 'collapsible-header';

        var collBody = document.createElement('div');
        collBody.className = 'collapsible-body';

        var bodyTable = document.createElement('table');
        bodyTable.className = 'striped bordered blue-grey lighten-4';
        //Add Project to collapsible
        //var taskNameString = "";
        //loops through for project relevant tasks
        for(var t=0; t < relevantTaskArray.length; t++)
        {
            var bodyTableRow = bodyTable.insertRow(0);

            var bodyStartTimeCell = bodyTableRow.insertCell(0);
            bodyStartTimeCell.textContent = relevantTaskArray[t].startTime;

            var bodyEndTimeCell = bodyTableRow.insertCell(1);
            bodyEndTimeCell.textContent = relevantTaskArray[t].endTime;

            var bodyTaskNameCell = bodyTableRow.insertCell(2);
            bodyTaskNameCell.textContent = relevantTaskArray[t].taskName;

            var bodyDurationCell = bodyTableRow.insertCell(3);
            bodyDurationCell.textContent = relevantTaskArray[t].durationInSec.toString().toHHMMSS();

        }
        var headTable = document.createElement('table');
        headTable.className = 'fixed';

        var tr = headTable.insertRow(0);
        var totalProjectTimeTd = tr.insertCell(0);
        var projectNameTd = tr.insertCell(1);


        projectNameTd.textContent = projectName;
        totalProjectTimeTd.textContent = totalProjectTime.toString().toHHMMSS();


        collHead.appendChild(headTable);
        collBody.appendChild(bodyTable);

        li.appendChild(collHead);
        li.appendChild(collBody);


        totalSelectedTime += totalProjectTime;
        collapsibleUI.appendChild(li);
    }

    totalTimeElement.textContent = "Total Time: " + totalSelectedTime.toString().toHHMMSS();


}

function filterData_ANYTHING_ALL(selectedYear,selectedMonth,saveProjectArray,saveObjectArray,collapsibleUI,totalTimeElement)
{
    var totalSelectedTime = 0;
    var relevantProjectArray = [];  //ProjectNames are saved here
    var relevantObjectArray = []; //Objects are saved here

    for(var i=0; i < saveObjectArray.length; i++)
    {
        var startTime = saveObjectArray[i].startTime;
        var startTimeMoment = moment(startTime, "DD.MM.YYYY - HH:mm:ss");
        var year = startTimeMoment.get('year');
        var month = startTimeMoment.get('month');

        if(year == selectedYear)
        {
            var projectIsContained = false;

            //Add All Projects to Array
            for(var x=0; x < relevantProjectArray.length; x++)
            {
                //
                if(saveObjectArray[i].projectName == relevantProjectArray[x])
                {
                    projectIsContained = true;
                    relevantObjectArray.push(saveObjectArray[i]); //push because it's relevant anyway even if projectName is a duplicate. Object is not
                    break;
                }

            }

            //Push All Projects in Temp Array
            if(!projectIsContained)
            {
                //Pushes whole Object in Array
                relevantProjectArray.push(saveObjectArray[i].projectName);
                relevantObjectArray.push(saveObjectArray[i]);
                //console.log(saveObjectArray[i]);

            }

        }
    }


    //loops through the relevant projects
    for(var p=0; p < relevantProjectArray.length; p++)
    {
        var totalProjectTime = 0;
        var projectName = relevantProjectArray[p];
        var relevantTaskArray = []; //belongs to project --> filter is needed!

        //loops through relevant Objects
        for(var u=0; u < relevantObjectArray.length; u++)
        {
            if(relevantProjectArray[p] == relevantObjectArray[u].projectName)
            {
                totalProjectTime = totalProjectTime + relevantObjectArray[u].durationInSec;
                relevantTaskArray.push(relevantObjectArray[u]);
            }


        }

        //Add Project to collapsible
        //var taskNameString = "";
        //loops through for project relevant tasks

        var li = document.createElement('li');

        var collHead = document.createElement('div');
        collHead.className = 'collapsible-header';

        var collBody = document.createElement('div');
        collBody.className = 'collapsible-body';

        var bodyTable = document.createElement('table');
        bodyTable.className = 'striped bordered blue-grey lighten-4';


        for(var t=0; t < relevantTaskArray.length; t++)
        {
            //taskNameString = taskNameString + "<br />" + relevantTaskArray[t].taskName  + " - " + relevantTaskArray[t].durationInSec.toString().toHHMMSS() + "\n";
            var bodyTableRow = bodyTable.insertRow(0);

            var bodyStartTimeCell = bodyTableRow.insertCell(0);
            bodyStartTimeCell.textContent = relevantTaskArray[t].startTime;

            var bodyEndTimeCell = bodyTableRow.insertCell(1);
            bodyEndTimeCell.textContent = relevantTaskArray[t].endTime;

            var bodyTaskNameCell = bodyTableRow.insertCell(2);
            bodyTaskNameCell.textContent = relevantTaskArray[t].taskName;

            var headDurationCell = bodyTableRow.insertCell(3);
            headDurationCell.textContent = relevantTaskArray[t].durationInSec.toString().toHHMMSS();
        }
        //collapsibleUl.append('<li><div class="collapsible-header">' + projectName + " - " + totalProjectTime.toString().toHHMMSS() + '</div><div class="collapsible-body"><p>' + taskNameString + '</p></div></li>');

        var headTable = document.createElement('table');
        headTable.className = 'fixed';

        var tr = headTable.insertRow(0);
        var totalProjectTimeTd = tr.insertCell(0);
        var projectNameTd = tr.insertCell(1);


        projectNameTd.textContent = projectName;
        totalProjectTimeTd.textContent = totalProjectTime.toString().toHHMMSS();


        collHead.appendChild(headTable);
        collBody.appendChild(bodyTable);

        li.appendChild(collHead);
        li.appendChild(collBody);
        collapsibleUI.appendChild(li);

        totalSelectedTime += totalProjectTime;

    }

    totalTimeElement.textContent = "Total Time: " + totalSelectedTime.toString().toHHMMSS();


}

function filterData_ANYTHING_ANYTHING(selectedYear,selectedMonth,saveProjectArray,saveObjectArray,collapsibleUI,totalTimeElement)
{
    var relevantProjectArray = [];  //ProjectNames are saved here
    var relevantObjectArray = []; //Objects are saved here
    var totalSelectedTime = 0;

    for(var i=0; i < saveObjectArray.length; i++)
    {
        var startTime = saveObjectArray[i].startTime;
        var startTimeMoment = moment(startTime, "DD.MM.YYYY - HH:mm:ss");
        var year = startTimeMoment.get('year');
        var month = startTimeMoment.get('month');

        if(year == selectedYear && month == selectedMonth)
        {
            var projectIsContained = false;

            //Add All Projects to Array
            for(var x=0; x < relevantProjectArray.length; x++)
            {
                //
                if(saveObjectArray[i].projectName == relevantProjectArray[x])
                {
                    projectIsContained = true;
                    relevantObjectArray.push(saveObjectArray[i]); //push because it's relevant anyway even if projectName is a duplicate. Object is not
                    break;
                }

            }

            //Push All Projects in Temp Array
            if(!projectIsContained)
            {
                //Pushes whole Object in Array
                relevantProjectArray.push(saveObjectArray[i].projectName);
                relevantObjectArray.push(saveObjectArray[i]);
                //console.log(saveObjectArray[i]);

            }

        }
    }


    //loops through the relevant projects
    for(var p=0; p < relevantProjectArray.length; p++)
    {
        var totalProjectTime = 0;
        var projectName = relevantProjectArray[p];
        var relevantTaskArray = []; //belongs to project --> filter is needed!

        //loops through relevant Objects
        for(var u=0; u < relevantObjectArray.length; u++)
        {
            if(relevantProjectArray[p] == relevantObjectArray[u].projectName)
            {
                totalProjectTime = totalProjectTime + relevantObjectArray[u].durationInSec;
                relevantTaskArray.push(relevantObjectArray[u]);
            }

        }

        var li = document.createElement('li');

        var collHead = document.createElement('div');
        collHead.className = 'collapsible-header';

        var collBody = document.createElement('div');
        collBody.className = 'collapsible-body';

        var bodyTable = document.createElement('table');
        bodyTable.className = 'striped bordered blue-grey lighten-4';

        //Add Project to collapsible
        //var taskNameString = "";
        //loops through for project relevant tasks
        for(var t=0; t < relevantTaskArray.length; t++)
        {
            //taskNameString +=  "<br />" + relevantTaskArray[t].taskName + " - " + relevantTaskArray[t].durationInSec.toString().toHHMMSS() + "\n";
            var bodyTableRow = bodyTable.insertRow(0);

            var bodyStartTimeCell = bodyTableRow.insertCell(0);
            bodyStartTimeCell.textContent = relevantTaskArray[t].startTime;

            var bodyEndTimeCell = bodyTableRow.insertCell(1);
            bodyEndTimeCell.textContent = relevantTaskArray[t].endTime;

            var bodyTaskNameCell = bodyTableRow.insertCell(2);
            bodyTaskNameCell.textContent = relevantTaskArray[t].taskName;

            var headDurationCell = bodyTableRow.insertCell(3);
            headDurationCell.textContent = relevantTaskArray[t].durationInSec.toString().toHHMMSS();
        }

        var headTable = document.createElement('table');
        headTable.className = 'fixed';

        var tr = headTable.insertRow(0);
        var totalProjectTimeTd = tr.insertCell(0);
        var projectNameTd = tr.insertCell(1);


        projectNameTd.textContent = projectName;
        totalProjectTimeTd.textContent = totalProjectTime.toString().toHHMMSS();


        collHead.appendChild(headTable);
        collBody.appendChild(bodyTable);

        li.appendChild(collHead);
        li.appendChild(collBody);
        collapsibleUI.appendChild(li);

        //collapsibleUl.append('<li><div class="collapsible-header"><table><tr><td>' + projectName + '</td><td>' + totalProjectTime.toString().toHHMMSS() + '</td></tr></table></div><div class="collapsible-body"><p>' + taskNameString + '</p></div></li>');
        totalSelectedTime += totalProjectTime;

    }
    totalTimeElement.textContent = "Total Time: " + totalSelectedTime.toString().toHHMMSS();

}


function updateData()
{
    var selectedYear = $('#yearSelect option:selected').val();
    var selectedMonth = $('#monthSelect option:selected').val();
    //gets ProjectArray from Local Storage
    var saveProjectArray = JSON.parse(localStorage.getItem("saveProjectArray"));
    var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));
    var collapsibleUlJ = $('#collapsibleUl');
    var totalTimeElement = document.getElementById("totalTimeElement");
    //deletes collapsible because otherwise everything is a copy
    collapsibleUlJ.empty();
    var collapsibleUI = document.getElementById('collapsibleUl');



    //Only show full string if all is selected
    if(selectedYear == "ALL" && selectedMonth == "ALL")
    {

        filterData_ALL_ALL(selectedYear,selectedMonth,saveProjectArray,saveObjectArray,collapsibleUI,totalTimeElement);


    }
    else
    if(selectedYear != "ALL" && selectedMonth == "ALL")
    {
        filterData_ANYTHING_ALL(selectedYear,selectedMonth,saveProjectArray,saveObjectArray,collapsibleUI,totalTimeElement);


    }
    else
    if(selectedYear != "ALL" && selectedMonth != "ALL")
    {
       filterData_ANYTHING_ANYTHING(selectedYear,selectedMonth,saveProjectArray,saveObjectArray,collapsibleUI,totalTimeElement);


    }


}

$(document).ready(function()
{
    //Year is selected
    $('#yearSelect').change(function()
    {
         monthArray = [];
         $('#monthSelect').empty();

         var selectedYear = $('#yearSelect option:selected').text();
         //gets ObjectArray from Local Storage

         var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));

            if(saveObjectArray != null)
            {
                    //add options to year select
                    for(var j=0; j < saveObjectArray.length; j++)
                    {

                        var startTime = saveObjectArray[j].startTime;
                        var year = moment(startTime, "DD.MM.YYYY - HH:mm:ss").get('year');


                        if(year == selectedYear)
                        {
                            var month = moment(startTime, "DD.MM.YYYY - HH:mm:ss").get('month');
                            if(!isMonthInArray(month))
                            {
                                monthArray.push(month);
                            }


                        }


                    }

                updateSelectUI("month");

            }


        updateData();

    });


    $('#monthSelect').change(function()
    {
        updateData();



    });



});



function statsModalOpened()
{
    $('#yearSelect').empty();
    $('#monthSelect').empty();

    //gets ObjectArray from Local Storage
    var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));

    if(saveObjectArray != null)
    {
            //add options to year select
            for(var x=0; x < saveObjectArray.length; x++)
            {

                var startTime = saveObjectArray[x].startTime;
                var year = moment(startTime, "DD.MM.YYYY - HH:mm:ss").get('year');


                //checks if year is already in array
                if(!isYearInArray(year))
                {
                    yearArray.push(year);
                }

            }


            //updates select UI
            updateSelectUI("year");

    }


    //gets ProjectArray from Local Storage
    var saveProjectArray = JSON.parse(localStorage.getItem("saveProjectArray"));


    if(saveProjectArray != null)
    {
        //Updates Collapsible UI
        updateData();

    }





}





$(document).ready(function()
{

    $('#statsModalTrigger').click(function()
    {
        statsModalOpened();
    });


});
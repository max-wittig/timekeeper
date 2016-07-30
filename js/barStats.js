
//saves year
var yearArray = [];
var monthArray = [];


var resetCanvas = function ()
{
    $('#barChartCanvas').remove(); // this is my <canvas> element
    $('#barCanvasContainer').append('<canvas id="barChartCanvas"><canvas>');
    var canvas = document.querySelector('#barChartCanvas');
    var ctx = canvas.getContext('2d');
    ctx.canvas.width = 100; // resize to parent width
    ctx.canvas.height = 100; // resize to parent height

    var x = canvas.width/2;
    var y = canvas.height/2;
    //ctx.font = '10pt Verdana';
    //ctx.textAlign = 'center';
    //ctx.fillText('This text is centered on the canvas', x, y);
};


$(document).ready(function()
{

    updateYearArray();
    //updates select UI
    updateSelectUI("year");


    //Year is selected
    $('#yearSelectBar').change(function()
    {
        monthArray = [];
        $('#monthSelectBar').empty();

        var selectedYear = $('#yearSelectBar option:selected').text();
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


        updateDataBar(saveObjectArray);

    });


    $('#monthSelectBar').change(function()
    {
        var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));
        if(saveObjectArray != null)
        updateDataBar(saveObjectArray);

    });

});

function updateDataBar(saveObjectArray)
{

    resetCanvas();
    var selectedYear = $('#yearSelectBar option:selected').val();
    var selectedMonth = $('#monthSelectBar option:selected').val();

    var myChart = document.getElementById("barChartCanvas").getContext("2d");
    var color = getRandomColor();
    var data = {
        labels: [],
        datasets:
            [
                {

                    fillColor: color

                }
            ]
    };
    var myBarChart = new Chart(myChart).Bar(data);

    //Only show full string if all is selected
    if(selectedYear == "ALL" && selectedMonth == "ALL")
    {

        insertAllData(myBarChart,saveObjectArray);
    }
    else
    if(selectedYear != "ALL" && selectedMonth == "ALL")
    {
        //show all months

        insertDataPerMonthInYear(selectedYear,myBarChart,saveObjectArray);

    }
    else
    if(selectedYear != "ALL" && selectedMonth != "ALL")
    {

        insertDataPerDayInMonth(selectedYear,selectedMonth,myBarChart,saveObjectArray);

    }


}


function updateYearArray()
{
    var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));

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

function updateSelectUI(string)
{
    //doesn't work with jQuery
    var yearSelectBar = document.getElementById('yearSelectBar');
    var monthSelectBar = document.getElementById('monthSelectBar');
    if(string == "year")
    {
        //clear Year UI
        $('#yearSelectBar').empty();

        //updates MonthUI
        var option1 = document.createElement("option");
        option1.text = "ALL";
        option1.value = "ALL";
        yearSelectBar.add(option1);

        //updates YearUI
        var option2 = document.createElement("option");
        option2.text = "ALL";
        option2.value = "ALL";
        monthSelectBar.add(option2);


        for(var i=0; i < yearArray.length; i++)
        {
            var yearOption = document.createElement("option");
            yearOption.text = yearArray[i];
            yearOption.value = yearArray[i];
            yearSelectBar.add(yearOption);
        }

    }
    else
    if(string == "month")
    {

        //updates MonthUI
        var option = document.createElement("option");
        option.text = "ALL";
        monthSelectBar.add(option);

        for(var j=0; j < monthArray.length; j++)
        {
            var monthOption = document.createElement("option");
            monthOption.text = (monthArray[j] + 1) + " - " + getMonthStringFromMonthNumber((monthArray[j] + 1));
            monthOption.value = monthArray[j];
            monthSelectBar.add(monthOption);
        }


    }
    //To refresh the select
    $('select').material_select();


}


function barStatsPageIsReady()
{


    var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));

    if(saveObjectArray != null && saveObjectArray != undefined)
    {
        updateDataBar(saveObjectArray);
    }

    //insertDataPerMonthInYear(2015,myBarChart,saveObjectArray);  //TODO let user choose the year
    //insertDataPerDayInMonth(2015,11,myBarChart,saveObjectArray);


}

function insertAllData(myBarChart,saveObjectArray)
{
    //store all relevant years
    var relevantYears = [];
    for(var i=0; i < saveObjectArray.length; i++)
    {
        //console.log(saveObjectArray[i]);
        var startTime = saveObjectArray[i].startTime;
        var startTimeMoment = moment(startTime, "DD.MM.YYYY - HH:mm:ss");
        var year = startTimeMoment.get('year');

        var yearIsInArray = false;
        for(var j=0; j < relevantYears.length; j++)
        {
            if(year == relevantYears[j])
            {
                yearIsInArray = true;
            }
        }

        //insert it in
        if(!yearIsInArray)
        {
            relevantYears.push(year);
        }


    }

    //loop through relevant years
    for(var y=0; y < relevantYears.length; y++)
    {
        var totalYearTime = 0;
        var yearName = relevantYears[y];
        for(var z=0; z < saveObjectArray.length; z++)
        {
            var startTimeY = saveObjectArray[z].startTime;
            var startTimeMomentY = moment(startTimeY, "DD.MM.YYYY - HH:mm:ss");
            var yearY = startTimeMomentY.get('year');

            if(yearY == relevantYears[y])
            {
                totalYearTime += saveObjectArray[z].durationInSec;
            }
        }
        myBarChart.addData([totalYearTime], yearName);
    }
}
function getDaysInMonth(year,month)
{
    var d = new Date(year, month-1, 0);
    return d.getDate();

}


function insertDataPerDayInMonth(selectedYear,selectedMonth,myBarChart,saveObjectArray)
{
    var daysOfTheMonth = []; //1-28,29,30,31
    //console.log(getDaysInMonth(selectedYear,selectedMonth));
    for(var m = 1; m <= getDaysInMonth(selectedYear,selectedMonth);m++)
    {
        daysOfTheMonth.push(m);
    }


        for(var d=0; d < daysOfTheMonth.length; d++)
        {
            var totalDayTime = 0;

            for (var i = 0; i < saveObjectArray.length; i++)
            {
                var duration = saveObjectArray[i].durationInSec;
                var startTime = saveObjectArray[i].startTime;
                var startTimeMoment = moment(startTime, "DD.MM.YYYY - HH:mm:ss");
                var year = startTimeMoment.get('year');
                var month = startTimeMoment.get('month');
                var date = startTimeMoment.get('date');

                if (selectedYear == year && selectedMonth == month && date == daysOfTheMonth[d])
                {
                    totalDayTime += duration;
                }
            }
            //console.log(totalDayTime);
            //Display info
            myBarChart.addData([totalDayTime], daysOfTheMonth[d].toString());
        }




}

function insertDataPerMonthInYear(selectedYear,myBarChart,saveObjectArray)
{
    var months = [0,1,2,3,4,5,6,7,8,9,10,11];

        //Count total duration per month
        for(var m=0; m < months.length; m++)
        {
            var monthDuration = 0;

            for (var i = 0; i < saveObjectArray.length; i++)
            {
                var duration = saveObjectArray[i].durationInSec;
                var startTime = saveObjectArray[i].startTime;
                var startTimeMoment = moment(startTime, "DD.MM.YYYY - HH:mm:ss");
                var year = startTimeMoment.get('year');
                var month = startTimeMoment.get('month');

                if(month == months[m] && year == selectedYear)
                {
                    monthDuration += duration;
                }

            }

            //month is done
            //display month
            myBarChart.addData([monthDuration], getMonthStringFromMonthNumber(months[m]+1));

        }



}





Chart.defaults.global =
{
    // Boolean - Whether to animate the chart
    animation: false,

    // Number - Number of animation steps
    //animationSteps: 60,

    // String - Animation easing effect
    // Possible effects are:
    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
    //  easeOutElastic, easeInCubic]
    animationEasing: "easeOutQuart",

    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: false,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: null,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: null,
    // Number - The scale starting value
    scaleStartValue: null,

    // String - Colour of the scale line
    scaleLineColor: "rgba(0,0,0,.1)",

    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Boolean - Whether to show labels on the scale
    scaleShowLabels: false,

    // Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    scaleIntegersOnly: true,

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 12,

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "#666",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: true,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,

    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
    customTooltips: false,

    // Array - Array of string names to attach tooltip events
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

    // String - Tooltip background colour
    tooltipFillColor: "rgba(0,0,0,0.8)",

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#fff",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 14,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: "bold",

    // String - Tooltip title font colour
    tooltipTitleFontColor: "#fff",

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 6,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 6,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 6,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,

    // String - Template string for single tooltips
    //tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
    tooltipTemplate: "<%if (label){%><%=label%> <%}%>",
    // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= value %>",

    // Function - Will fire on animation progression.
    onAnimationProgress: function(){},

    // Function - Will fire on animation completion.
    onAnimationComplete: function(){}
};



function ColorLuminance(hex, lum)
{

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6)
    {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }

    return rgb;
}

function getRandomColor()
{
    var random = Math.floor(Math.random()*19+1);

    switch (random)
    {
        case 1:
            return "#F44336"; //red
        case 2:
            return "#E91E63"; //pink
        case 3:
            return "#9C27B0"; //purple
        case 4:
            return "#673AB7"; //deep purple
        case 5:
            return "#3F51B5"; //indigo
        case 6:
            return "#2196F3"; //blue
        case 7:
            return "#03A9F4"; //light blue
        case 8:
            return "#00BCD4"; //cyan
        case 9:
            return "#009688"; //teal
        case 10:
            return "#4CAF50"; //green
        case 11:
            return "#8BC34A"; //lightGreen
        case 12:
            return "#CDDC39"; //lime
        case 13:
            return "#FFEB3B"; //yellow
        case 14:
            return "#FFC107"; //amber
        case 15:
            return "#FF9800"; //orange
        case 16:
            return "#FF5722"; //deepOrange
        case 17:
            return "#795548"; //brown
        case 18:
            return "#9E9E9E"; //grey
        case 19:
            return "#607D8B"; //bluegrey
    }

}

function getPaletteColor()
{
	var random = Math.floor(Math.random()*9+3);
	return colorbrewer.Blues[random];

}

var resetCanvas = function () 
{
  $('#taskChart').remove(); // this is my <canvas> element
  $('#canvasContainer').append('<canvas id="taskChart"><canvas>');
  var canvas = document.querySelector('#taskChart');
  var ctx = canvas.getContext('2d');
  ctx.canvas.width = 100; // resize to parent width
  ctx.canvas.height = 100; // resize to parent height

  var x = canvas.width/2;
  var y = canvas.height/2;
  //ctx.font = '10pt Verdana';
  //ctx.textAlign = 'center';
  //ctx.fillText('This text is centered on the canvas', x, y);
};



function getProjectTotalTime(projectName)
{
    var totalTime = 0;
    var saveObjectArray = JSON.parse(localStorage.getItem("saveObjectArray"));

    if(saveObjectArray != null)
    {
        for(var i=0; i < saveObjectArray.length; i++)
        {
            if(projectName == saveObjectArray[i].projectName)
            {
                totalTime += saveObjectArray[i].durationInSec;


            }

        }
        return totalTime;

    }

}




//gets called from when modal opened
function canvasModalOpened()
{
	
    //ProjectChart
    var myChart = document.getElementById("myChart").getContext("2d");
    var data = [];
    var myPieChart = new Chart(myChart).Pie(data);

    //clears taskChartSelect --> removes old entries
    $('#taskChartSelect').empty();

    //TaskChart
    var taskChartSelect = document.getElementById("taskChartSelect");   //REALLY IMPORTANT NOT TO USE JQUERY HERE!!!

    //Makes empty option
    var empty = document.createElement("option");
    empty.text = " ";
    taskChartSelect.add(empty);

    var saveProjectArray = JSON.parse(localStorage.getItem("saveProjectArray"));
    if(saveProjectArray != null)
    {
        for (var i = 0; i < saveProjectArray.length; i++)
        {
            //var color = getRandomColor();
            
			var color = getRandomColor();
			var highlight = ColorLuminance(color, 0.2);

            var value = getProjectTotalTime(saveProjectArray[i].name);
            myPieChart.addData(
                {
                    value: value,
                    color: color,
                    highlight: highlight,
                    label: saveProjectArray[i].name + ": " + value.toString().toHHMMSS()
                });

            //inserts projectName in TaskSelect
            var option = document.createElement("option");
            option.text = saveProjectArray[i].name;
            console.log(saveProjectArray[i].name);
            taskChartSelect.add(option);
        }




        $('select').material_select();


    }

}

function addTaskTimes(taskName)
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

$(document).ready(function ()
{
    $('#canvasModalTrigger').click(function()
    {

        canvasModalOpened();
    });

    //if user chooses a project
    $('#taskChartSelect').change(function()
    {
		resetCanvas();
        var selectedProjectName = $('#taskChartSelect option:selected').text();
        var data = [];
        var taskChart = document.getElementById("taskChart").getContext("2d");
        var myTaskChart = new Chart(taskChart).Doughnut(data);
        var saveProjectArray = JSON.parse(localStorage.getItem("saveProjectArray"));


        if(saveProjectArray != null)
        {
            for(var i=0; i < saveProjectArray.length; i++)
            {
                if(saveProjectArray[i].name == selectedProjectName)
                {
					var taskList = saveProjectArray[i].taskList;
					for(var j=0; j < taskList.length; j++)
					{
						
						var color = getRandomColor();
						var highlight = ColorLuminance(color, 0.2);
						var totalTime = addTaskTimes(taskList[j]);
					
						myTaskChart.addData(
                        {
                            value: totalTime,
                            color: color,
                            highlight: highlight,
                            label: taskList[j] + ": " + totalTime.toString().toHHMMSS()
                        });
					}

                }

            }
        }

    });



});
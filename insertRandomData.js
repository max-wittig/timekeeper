$(document).ready(function()
{
    var loops = 100;
    var randomHour = Math.floor(Math.random() *23 + 1);
    var randomMinute = Math.floor(Math.random() *58 + 1);
    var startTime = randomHour + ":" + randomMinute;

    var randomHour2 = randomHour + Math.floor(Math.random() *10 + 1);
    var randomMinute2 = randomMinute + Math.floor(Math.random() *10 + 1);
    var endTime = randomHour2 + ":" + randomMinute2;

    var randomProjectName = Math.floor(Math.random() *5800 + 1);
    var randomTaskName = Math.floor(Math.random() *5800 + 1);


    for(var i=0; i < loops; i++)
    {

        insertData(startTime,endTime,randomProjectName,randomTaskName,"TESTING 00:00", 100);

    }



});
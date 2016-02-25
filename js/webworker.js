
importScripts("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js");

String.prototype.toHHMMSS = function ()
{
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time = hours+':'+minutes+':'+seconds;
    return time;
};




self.addEventListener('message', function(e) //e.data == start
{
    var start = JSON.parse(e.data);
    function updateClockWebWorker()
    {
        var durSec = moment().diff(start,'seconds');
        var totalDur = durSec.toString().toHHMMSS();
        self.postMessage(totalDur);
        //console.log("Ich lebe!");

    }

    setInterval(updateClockWebWorker,1000);
}, false);


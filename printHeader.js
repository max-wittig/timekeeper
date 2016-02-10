$(document).ready(function ()
{
    var header = document.getElementById('navHeader');
    header.innerHTML = '<div class="hidden">' +
        '<div class="col s6 push-s1 m3 push-m3 l4 push-l4 hidden">' +
        '<input id="fileImport" type="file" style="visibility: hidden;" accept=".json"/>' +
        '</div>' +
        '</div>' +

        '<nav>' +

        '<div class="blue-grey darken-4 nav-wrapper">' +
        '<a href="timekeeper" class="brand-logo center">TimeKeeper</a>' +
        '<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>' +
        '<ul id="nav-mobile-left" class="left hide-on-med-and-down">' +
        '<li><a id="importButton" href="javascript:void(null);">Import</a></li>' +
        '<li><a id="exportButton" href="javascript:void(null);">Export</a></li>' +
        '<!--<li><a class="modal-trigger" href="#addManualDate">Add Manual Date</a></li>-->' +
        '<li><a href="mobile_manualDate.html">Add Manual Date</a></li>' +
        '<li><a id="serverModalButton" href="mobile_server.html">Server</a></li>' +

        '</ul>' +
        '<ul id="nav-mobile-right" class="right hide-on-med-and-down">' +

        '<li><a href="mobile_graphicDisplay.html">Pie</a></li>' +
        '<li><a href="mobile_barStats.html">Bar</a></li>' +
        '<li><a href="mobile_stats.html">Stats</a></li>' +
        '<li><a href="setProjectFrozen.html">Settings</a></li>' +
        '<li><a id="creditButton" href="javascript:void(null);">Credits</a></li>' +
        '<li><a class="btn-flat" href="http://spaghettic0der.github.io/timekeeper/"><img' +
        'src="GitHub-Mark-Light-32px.png"></a></li>' +
        '    </ul>' +
        '    <ul class="side-nav" id="mobile-demo">' +
        '<li><a href="timekeeper" class="btn-flat"><i class="material-icons left">home</i>TimeKeeper</a></li>' +
        '<li><a id="exportButtonM" class="btn-flat" onclick="document.getElementById("exportButton").click();" href="javascript:void(null);"><i class="material-icons left">call_made</i>Export</a></li>' +
        '<li><a class="btn-flat" id="importButtonM" onclick=' + "document.getElementById('importButton').click();" + 'href="javascript:void(null);"><i class="material-icons left">call_received</i>Import</a></li>' +
        '<li><a class="btn-flat" href="mobile_manualDate.html"><i class="material-icons left">note_add</i>Add Manual Date</a></li>' +
        '<li><a class="btn-flat" id="serverModalButtonM" href="mobile_server.html"><i class="material-icons left">import_export</i>Server</a></li>' +
        '<li><a class="btn-flat" id="canvasModalTriggerM" href="mobile_graphicDisplay.html"><i class="material-icons left">album</i>Pie</a></li>' +
        '<li><a class="btn-flat" href="mobile_barStats.html"><i class="material-icons left">equalizer</i>Bar</a></li>' +
        '<li><a class="btn-flat" href="setProjectFrozen.html"><i class="material-icons left">settings</i>Settings</a></li>' +
        '<li><a class="btn-flat" id="statsModalTriggerM" href="mobile_stats.html"><i class="material-icons left">subject</i>Stats</a></li>' +
        '<li><a class="btn-flat" id="creditButtonM" onclick=document.getElementById("creditButton").click(); href="javascript:void(null);"><i class="material-icons left">info_outline</i>Credits</a></li>' +
        '<li><a class="btn-flat" href="http://spaghettic0der.github.io/timekeeper/"><img' +
        'src="GitHub-Mark-32px.png"></a></li>' +
        '   </ul>' +
        '   </div>' +
        '   </nav>';

    $(".button-collapse").sideNav();


    /*

     <header>
     <div class="hidden">
     <div class="col s6 push-s1 m3 push-m3 l4 push-l4 hidden">
     <input id="fileImport" type="file" style="visibility: hidden;" accept=".json"/>
     </div>
     </div>

     <nav>

     <div class="blue-grey darken-4 nav-wrapper">
     <a href="timekeeper" class="brand-logo center">TimeKeeper</a>
     <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
     <ul id="nav-mobile-left" class="left hide-on-med-and-down">
     <li><a id="importButton" href="javascript:void(null);">Import</a></li>
     <li><a id="exportButton" href="javascript:void(null);">Export</a></li>
     <!--<li><a class="modal-trigger" href="#addManualDate">Add Manual Date</a></li>-->
     <li><a href="mobile_manualDate.html">Add Manual Date</a></li>
     <li><a id="serverModalButton" href="mobile_server.html">Server</a></li>

     </ul>
     <ul id="nav-mobile-right" class="right hide-on-med-and-down">

     <li><a href="mobile_graphicDisplay.html">Pie</a></li>
     <li><a href="mobile_barStats.html">Bar</a></li>
     <li><a href="mobile_stats.html">Stats</a></li>
     <li><a href="setProjectFrozen.html">Settings</a></li>
     <li><a id="creditButton" href="javascript:void(null);">Credits</a></li>
     <li><a class="btn-flat" href="http://spaghettic0der.github.io/timekeeper/"><img
     src="GitHub-Mark-Light-32px.png"></a></li>
     </ul>
     <ul class="side-nav" id="mobile-demo">
     <li><a href="timekeeper" class="btn-flat"><i class="material-icons left">home</i>TimeKeeper</a></li>
     <li><a id="exportButtonM" class="btn-flat" onclick='document.getElementById("exportButton").click();' href="javascript:void(null);"><i class="material-icons left">call_made</i>Export</a></li>
     <li><a class="btn-flat" id="importButtonM" onclick='document.getElementById("importButton").click();' href="javascript:void(null);"><i class="material-icons left">call_received</i>Import</a></li>
     <li><a class="btn-flat" href="mobile_manualDate.html"><i class="material-icons left">note_add</i>Add Manual Date</a></li>
     <li><a class="btn-flat" id="serverModalButtonM" href="mobile_server.html"><i class="material-icons left">import_export</i>Server</a></li>
     <li><a class="btn-flat" id="canvasModalTriggerM" href="mobile_graphicDisplay.html"><i class="material-icons left">album</i>Pie</a></li>
     <li><a class="btn-flat" href="mobile_barStats.html"><i class="material-icons left">equalizer</i>Bar</a></li>
     <li><a class="btn-flat" href="setProjectFrozen.html"><i class="material-icons left">settings</i>Settings</a></li>
     <li><a class="btn-flat" id="statsModalTriggerM" href="mobile_stats.html"><i class="material-icons left">subject</i>Stats</a></li>
     <li><a class="btn-flat" id="creditButtonM" onclick='document.getElementById("creditButton").click();' href="javascript:void(null);"><i class="material-icons left">info_outline</i>Credits</a></li>
     <li><a class="btn-flat" href="http://spaghettic0der.github.io/timekeeper/"><img
     src="GitHub-Mark-32px.png"></a></li>
     </ul>
     </div>
     </nav>

     </header>
     */

});
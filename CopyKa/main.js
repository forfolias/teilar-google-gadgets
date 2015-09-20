/*
Copyright (C) 2009 Vasilakos Georgios.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var url;
var CONFIG_RETRY_DELAY_MS = 5 * 60 * 1000;
var DETAILS_VIEW_TITLE = "";
var HTML_HEAD = "<html><meta content=\"text/html; charset=UTF-8\" http-equiv=\"content-type\">" +
  // Disable right click
  "<script language=\"Javascript\">" +
  "  document.oncontextmenu=new Function(\"return false\")" +
  "</script>";
  "<body>";

var HTML_TAIL = "</body> </html>";

function onOpen()
{
    eksamino.selectedIndex = 0;
    eks1.selectedIndex = 0;
    eks2.selectedIndex = 0;
    eks3.selectedIndex = 0;
    eks4.selectedIndex = 0;
    eks5.selectedIndex = 0;
    eks6.selectedIndex = 0;
    eks7.selectedIndex = 0;
}

function viewResults(html_site_div) {
  // rithmisi tou titlou
  var temp1 = html_site_div.slice(html_site_div.indexOf("esc\").innerHTML=\'("), html_site_div.lastIndexOf("τα εξετάσεων")) + "τα εξετάσεων";
  DETAILS_VIEW_TITLE = temp1.slice(temp1.indexOf("("), temp1.lastIndexOf("ων")) + "ων";

  //ritmisi xronologias eksetastikis
  var etos = "<small>" + html_site_div.slice(html_site_div.indexOf("Η λίστα"), html_site_div.lastIndexOf("φοιτητής.")) + "φοιτητής." + "</small>";

  //rithmisi  plithous eggrafwn
  var plithos = "<small>" + html_site_div.slice(html_site_div.indexOf("Τελευταία"), html_site_div.lastIndexOf("εγγραφές")) + "εγγραφές :" + "</small><br /><br />";
  plithos = plithos.replace(/Βρέθηκαν/,"Βρέθηκαν ");

  //rithmisi periexomenou pros proboli
  var apotelesmata = html_site_div.slice(html_site_div.indexOf("<DIV"), html_site_div.lastIndexOf("</DIV>"));
  apotelesmata = apotelesmata.replace(/valign=\"top\"/g, "align=\"center\"");
  apotelesmata = apotelesmata.replace(/class=\"tablecell\">/g,"");
  apotelesmata = apotelesmata.replace(/class=\"tablebold\">/g,"");
  apotelesmata = apotelesmata.replace(/class=\"redFonts\"/g,"color=\"red\"");
  apotelesmata = apotelesmata.replace(/<span /g,"<font>");
  apotelesmata = apotelesmata.replace(/<\/span>/g,"</font>");
  apotelesmata = apotelesmata.replace(/t>c/g,"t c");
  apotelesmata = apotelesmata.replace(/valign=\"top\"/g,"align=\"center\"");

  //an to mathima einai neo k den exei bathmous
  if (etos.match("δεν είναι διαθέσιμη.")){
      etos = "<small>" + etos.slice(etos.indexOf("Η λίστα"), etos.lastIndexOf("δεν είναι διαθέσιμη.")) + "δεν είναι διαθέσιμη.</small>";
      plithos = "";
      apotelesmata = "";
  }

  //rithmisi telikou perixomenou
  var html_site = HTML_HEAD + "<table><tr><td colspan=\"3\">" + plithos + "</td></tr><tr><td></td><td align=\"center\">" + apotelesmata + "</DIV><br /></td><td></td></tr><tr><td colspan=\"3\">" + etos + "</td></tr></table>" + HTML_TAIL;

//  if (html_site_div.match("")){
//    html_site = "Σφάλμα σύνδεσης";
//  }

  var htmlDetailsView = new DetailsView();
  htmlDetailsView.html_content = true;
  htmlDetailsView.setContent("", undefined, html_site, false, 0);

  // emfanisi apotelesmatwn sto neo parathiro
  pluginHelper.showDetailsView(htmlDetailsView, DETAILS_VIEW_TITLE, gddDetailsViewFlagDisableAutoClose, tempfunc );

  function tempfunc(){}

  // apokripsi tou parakalw perimenete
  wait.visible = "false";
}

function retrieveFeed()
{
    //an den exei epilegei kapoio mathima apo th lista
    if ((eksamino.selectedIndex == 0 && eks1.selectedIndex == 0) || 
        (eksamino.selectedIndex == 1 && eks2.selectedIndex == 0) ||
        (eksamino.selectedIndex == 2 && eks3.selectedIndex == 0) ||
        (eksamino.selectedIndex == 3 && eks4.selectedIndex == 0) ||
        (eksamino.selectedIndex == 4 && eks5.selectedIndex == 0  || eks5.selectedIndex == 2 || eks5.selectedIndex == 13) ||
        (eksamino.selectedIndex == 5 && eks6.selectedIndex == 0  || eks6.selectedIndex == 6 || eks6.selectedIndex == 15) ||
        (eksamino.selectedIndex == 6 && eks7.selectedIndex == 0  || eks7.selectedIndex == 5 || eks7.selectedIndex == 17))
        return;

    //emfanisi minimatos parakalw perimenete
    wait.visible = "true";
    //apokripsi tou minimatos sfalmatos an eixe emfanistei pio prin
    error.visible = "false";

    //dimiourgia antikeimenou gia na paralifthei to periexomeno tis istoselidas
    var request = new XMLHttpRequest();
    request.onreadystatechange = onReadyStateChange;

    debug.trace('Opening request to: ' + url);

    function onRequestError()
    {
        request.abort();
        debug.warning('Request error, will retry later.');
        view.setTimeout(refresh, getRetryDelay());
        wait.visible = "false";
        error.visible = "true";
    }

    try
    {
        request.open('GET', url, true);
        request.send();
        debug.trace('Request sent to : ' + url);
    }
    catch (e)
    {
        debug.warning('Could not retrieve site: ' + e.message);
        onRequestError();
    }

    var timeoutTimer = null;

    function onReadyStateChange()
    {
        if (request.readyState != 4)
        {
            return;
        }

        if (request.status == 200)
        {
            if (timeoutTimer)
            {
                view.clearTimeout(timeoutTimer);
            }

            debug.trace('Retrieve succeeded.');
            viewResults(request.responseText);
        }
    }
}

function getRetryDelay()
{
    return CONFIG_RETRY_DELAY_MS;
}

function refresh()
{
    retrieveFeed(url);
}

function easter_egg()
{
    view.alert("\n      .----.                      \n     |o_o |    In  a  world  without\n     | \\_/  |     fences  and  walls\n _/ /_ _ \\ \\    who needs Gates \n(  /    |   (_)       and Windows.   \n/˘\\_    _/   \\                  \n\\___)-(___/        GNU/Linux\n");
}

function eksamino_changed()
{
    pluginHelper.CloseDetailsView();
         eks1.selectedIndex = 0;
         eks2.selectedIndex = 0;
         eks3.selectedIndex = 0;
         eks4.selectedIndex = 0;
         eks5.selectedIndex = 0;
         eks6.selectedIndex = 0;
         eks7.selectedIndex = 0;
    if (eksamino.selectedIndex == 0)
    {
         eks1.visible = true;
         eks2.visible = false;
         eks3.visible = false;
         eks4.visible = false;
         eks5.visible = false;
         eks6.visible = false;
         eks7.visible = false;
    }
    if (eksamino.selectedIndex == 1)
    {
         eks1.visible = false;
         eks2.visible = true;
         eks3.visible = false;
         eks4.visible = false;
         eks5.visible = false;
         eks6.visible = false;
         eks7.visible = false;
    }
    if (eksamino.selectedIndex == 2)
    {
         eks1.visible = false;
         eks2.visible = false;
         eks3.visible = true;
         eks4.visible = false;
         eks5.visible = false;
         eks6.visible = false;
         eks7.visible = false;
    }
    if (eksamino.selectedIndex == 3)
    {
         eks1.visible = false;
         eks2.visible = false;
         eks3.visible = false;
         eks4.visible = true;
         eks5.visible = false;
         eks6.visible = false;
         eks7.visible = false;
    }
    if (eksamino.selectedIndex == 4)
    {
         eks1.visible = false;
         eks2.visible = false;
         eks3.visible = false;
         eks4.visible = false;
         eks5.visible = true;
         eks6.visible = false;
         eks7.visible = false;
    }
    if (eksamino.selectedIndex == 5)
    {
         eks1.visible = false;
         eks2.visible = false;
         eks3.visible = false;
         eks4.visible = false;
         eks5.visible = false;
         eks6.visible = true;
         eks7.visible = false;
    }
    if (eksamino.selectedIndex == 6)
    {
         eks1.visible = false;
         eks2.visible = false;
         eks3.visible = false;
         eks4.visible = false;
         eks5.visible = false;
         eks6.visible = false;
         eks7.visible = true;
    }
}

/* 0+kwdikos mathimatos+(C8->THEORIA/C5->ERG). 00+kwdikos mathimatos gia osa exoun mono theoria */
function mathima_changed()
{
    pluginHelper.CloseDetailsView();
    if (eksamino.selectedIndex == 0){
        if (eks1.selectedIndex == 1)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00120";
        if (eks1.selectedIndex == 2)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0121%25C8";
        if (eks1.selectedIndex == 3)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0121%25C5";
        if (eks1.selectedIndex == 4)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0122%25C8";
        if (eks1.selectedIndex == 5)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0122%25C5";
        if (eks1.selectedIndex == 6)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00123";
        if (eks1.selectedIndex == 7)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0124%25C8";
        if (eks1.selectedIndex == 8)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0124%25C5";
        if (eks1.selectedIndex == 9)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00125";
        if (eks1.selectedIndex == 10)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00950";
    }
    if (eksamino.selectedIndex == 1){
        if (eks2.selectedIndex == 1)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00220";
        if (eks2.selectedIndex == 2)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00221";
        if (eks2.selectedIndex == 3)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0223%25C8";
        if (eks2.selectedIndex == 4)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0223%25C5";
        if (eks2.selectedIndex == 5)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0224%25C8";
        if (eks2.selectedIndex == 6)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0224%25C5";
        if (eks2.selectedIndex == 7)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00225";
        if (eks2.selectedIndex == 8)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0226%25C8";
        if (eks2.selectedIndex == 9)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0226%25C5";
        if (eks2.selectedIndex == 10)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00961";
    }
    if (eksamino.selectedIndex == 2){
        if (eks3.selectedIndex == 1)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0320%25C8";
        if (eks3.selectedIndex == 2)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0320%25C5";
        if (eks3.selectedIndex == 3)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0321%25C8";
        if (eks3.selectedIndex == 4)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0321%25C5";
        if (eks3.selectedIndex == 5)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00322";
        if (eks3.selectedIndex == 6)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0323%25C8";
        if (eks3.selectedIndex == 7)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0323%25C5";
        if (eks3.selectedIndex == 8)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0324%25C8";
        if (eks3.selectedIndex == 9)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0324%25C5";
        if (eks3.selectedIndex == 10)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00325";
        if (eks3.selectedIndex == 11)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00962";
    }
    if (eksamino.selectedIndex == 3){
        if (eks4.selectedIndex == 1)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00421";
        if (eks4.selectedIndex == 2)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0422%25C8";
        if (eks4.selectedIndex == 3)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0422%25C5";
        if (eks4.selectedIndex == 4)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0425%25C8";
        if (eks4.selectedIndex == 5)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0425%25C5";
        if (eks4.selectedIndex == 6)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0426%25C8";
        if (eks4.selectedIndex == 7)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0426%25C5";
        if (eks4.selectedIndex == 8)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0427%25C8";
        if (eks4.selectedIndex == 9)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0427%25C5";
        if (eks4.selectedIndex == 10)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00424";
        if (eks4.selectedIndex == 11)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00423";
        if (eks4.selectedIndex == 12)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00963";
    }
    if (eksamino.selectedIndex == 4){
        if (eks5.selectedIndex == 1)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00920";
        if (eks5.selectedIndex == 3)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0531%25C8";
        if (eks5.selectedIndex == 4)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0531%25C5";
        if (eks5.selectedIndex == 5)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0532%25C8";
        if (eks5.selectedIndex == 6)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0532%25C5";
        if (eks5.selectedIndex == 7)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0533%25C8";
        if (eks5.selectedIndex == 8)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0533%25C5";
        if (eks5.selectedIndex == 9)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0534%25C8";
        if (eks5.selectedIndex == 10)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0534%25C5";
        if (eks5.selectedIndex == 11)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0535%25C8";
        if (eks5.selectedIndex == 12)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0535%25C5";

        if (eks5.selectedIndex == 14)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0541%25C8";
        if (eks5.selectedIndex == 15)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0541%25C5";
        if (eks5.selectedIndex == 16)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0542%25C8";
        if (eks5.selectedIndex == 17)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0542%25C5";
        if (eks5.selectedIndex == 18)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0543%25C8";
        if (eks5.selectedIndex == 19)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0543%25C5";
        if (eks5.selectedIndex == 20)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0544%25C8";
        if (eks5.selectedIndex == 21)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0544%25C5";
    }
    if (eksamino.selectedIndex == 5){
        if (eks6.selectedIndex == 1)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00921";
        if (eks6.selectedIndex == 2)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00930";
        if (eks6.selectedIndex == 3)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00931";
        if (eks6.selectedIndex == 4)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0656%25C8";
        if (eks6.selectedIndex == 5)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0656%25C5";

        if (eks6.selectedIndex == 7)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0631%25C8";
        if (eks6.selectedIndex == 8)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0631%25C5";
        if (eks6.selectedIndex == 9)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0632%25C8";
        if (eks6.selectedIndex == 10)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0632%25C5";
        if (eks6.selectedIndex == 11)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0633%25C8";
        if (eks6.selectedIndex == 12)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0633%25C5";
        if (eks6.selectedIndex == 13)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0634%25C8";
        if (eks6.selectedIndex == 14)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0634%25C5";

        if (eks6.selectedIndex == 16)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0642%25C8";
        if (eks6.selectedIndex == 17)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0642%25C5";
        if (eks6.selectedIndex == 18)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0643%25C8";
        if (eks6.selectedIndex == 19)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0643%25C5";
        if (eks6.selectedIndex == 20)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0644%25C8";
        if (eks6.selectedIndex == 21)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0644%25C5";
    }
    if (eksamino.selectedIndex == 6){
        if (eks7.selectedIndex == 1)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0923%25C8";
        if (eks7.selectedIndex == 2)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0923%25C5";
        if (eks7.selectedIndex == 3)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0757%25C8";
        if (eks7.selectedIndex == 4)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0757%25C8";

        if (eks7.selectedIndex == 6)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00731";
        if (eks7.selectedIndex == 7)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0732%25C8";
        if (eks7.selectedIndex == 8)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0732%25C5";
        if (eks7.selectedIndex == 9)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0733%25C8";
        if (eks7.selectedIndex == 10)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0733%25C5";
        if (eks7.selectedIndex == 11)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0734%25C8";
        if (eks7.selectedIndex == 12)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0734%25C5";
        if (eks7.selectedIndex == 13)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0735%25C8";
        if (eks7.selectedIndex == 14)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0735%25C5";
        if (eks7.selectedIndex == 15)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0736%25C8";
        if (eks7.selectedIndex == 16)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0736%25C5";

        if (eks7.selectedIndex == 18)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D00741";
        if (eks7.selectedIndex == 19)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0742%25C8";
        if (eks7.selectedIndex == 20)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0742%25C5";
        if (eks7.selectedIndex == 21)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0744%25C8";
        if (eks7.selectedIndex == 22)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0744%25C5";
        if (eks7.selectedIndex == 23)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0745%25C8";
        if (eks7.selectedIndex == 24)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0745%25C5";
        if (eks7.selectedIndex == 25)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0746%25C8";
        if (eks7.selectedIndex == 26)url="http://linuxteam.cs.teilar.gr/~forfolias/CopyKa/%25D4%25D0746%25C5";
    }
}

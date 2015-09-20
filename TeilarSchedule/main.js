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

var url="http://linuxteam.cs.teilar.gr/~forfolias/ProgrammaTeiLar/1.jpg";

function viewResults() {
  // rithmisi tou titlou
  var temp = parseInt(eksamino.selectedIndex)+1;
  var DETAILS_VIEW_TITLE = "Πρόγραμμα " + temp + "ου εξαμήνου τμήματος Τεχνολογίας Πληροφορικής και Τηλεπικοινωνιών"

  var htmlDetailsView = new DetailsView();
  htmlDetailsView.html_content = true;
  htmlDetailsView.setContent("", undefined, "<img src=\"" + url + "\" />", false, 0);

  // emfanisi apotelesmatwn sto neo parathiro
  pluginHelper.showDetailsView(htmlDetailsView, DETAILS_VIEW_TITLE, 
     gddDetailsViewFlagDisableAutoClose, undefined );

  // apokripsi tou parakalw perimenete
}

function eksamino_changed()
{
    if (eksamino.selectedIndex == 0) url="http://linuxteam.cs.teilar.gr/~forfolias/ProgrammaTeiLar/1.jpg";
    if (eksamino.selectedIndex == 1) url="http://linuxteam.cs.teilar.gr/~forfolias/ProgrammaTeiLar/2.jpg";
    if (eksamino.selectedIndex == 2) url="http://linuxteam.cs.teilar.gr/~forfolias/ProgrammaTeiLar/3.jpg";
    if (eksamino.selectedIndex == 3) url="http://linuxteam.cs.teilar.gr/~forfolias/ProgrammaTeiLar/4.jpg";
    if (eksamino.selectedIndex == 4) url="http://linuxteam.cs.teilar.gr/~forfolias/ProgrammaTeiLar/5.jpg";
    if (eksamino.selectedIndex == 5) url="http://linuxteam.cs.teilar.gr/~forfolias/ProgrammaTeiLar/6.jpg";
    if (eksamino.selectedIndex == 6) url="http://linuxteam.cs.teilar.gr/~forfolias/ProgrammaTeiLar/7.jpg";
}

function easter_egg()
{
    view.alert("\n      .----.                      \n     |o_o |    In  a  world  without\n     | \\_/  |     fences  and  walls\n _/ /_ _ \\ \\    who needs Gates \n(  /    |   (_)       and Windows.   \n/˘\\_    _/   \\                  \n\\___)-(___/        GNU/Linux\n");
}

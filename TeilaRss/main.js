/* diorthosi site kathigitwn */

var entryList;
var lastEntries;
var DETAILS_CSS_FILE = 'details.css';
var detailsCss;
var currentEntry = null;
var site_to_visit = 'http://www.cs.teilar.gr/';
var teacher_name;
var teacher_mail;

function onOpen()
{
    detailsCss = gadget.storage.openText(
                     pathify(CONFIG_THEME_DIR, DETAILS_CSS_FILE));

    entryList = new EntryList(container, CONFIG_THEME_DIR);

    combobox1.selectedIndex = 0;
    combobox2.selectedIndex = 0;
    site_to_visit = 'http://www.cs.teilar.gr/';

    draw(null);

    refresh();
    view.setInterval(refresh, CONFIG_REFRESH_FEED_MS);
}


function openEntryInBrowser(url)
{
    var winShell = new ActiveXObject('Shell.Application');
    winShell.ShellExecute(url);
}


function onSize()
{
    /* view.height */
    entryList.resize(view.width, 250);
}

function refresh()
{
    debug.trace('Refreshing feed.');
    retrieveFeed(CONFIG_FEED_URL, draw);
}

function retrieveFeed(url, callback)
{
    var request = new XMLHttpRequest();
    request.onreadystatechange = onReadyStateChange;

    if (CONFIG_CACHE_BUSTER)
    {
        url += '?cache_buster_xyz=' + Math.random();
    }

    debug.trace('Opening request to: ' + url);

    function onRequestError()
    {
        request.abort();
        debug.warning('Request error, will retry later.');
        view.setTimeout(refresh, getRetryDelay());
    }

    try
    {
        request.open('GET', url, true);
        request.send();
    }
    catch (e)
    {
        debug.warn('Could not retrieve feed: ' + e.message);

        if (!lastEntries)
        {
            onRequestError();
        }
        return;
    }

    var timeoutTimer = null;

    if (!lastEntries)
    {
        timeoutTimer = view.setTimeout(onRequestError, CONFIG_HTTP_REQUEST_TIMEOUT_MS);
    }

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
                debug.trace('Cancelling request timeout timer.');
                view.clearTimeout(timeoutTimer);
            }

            debug.trace('Retrieve succeeded.');
            parseFeed(request.responseText, callback);
        }
    }
}

function getRetryDelay()
{
    return CONFIG_RETRY_DELAY_MS;
}

function draw(entries)
{
    entryList.clearItems();

    debug.trace('Adding entries.');

    if (!entries)
    {
        debug.trace('No entries data, displaying default error.');
        entryList.displayMessage(strings.TRYING_TO_CONNECT);
    }
    else
    {
        if (!entries.lenght)
            entryList.displayMessage('Δεν υπάρχουν διαθέσιμες ανακοινώσεις');

        for (var i = 0; i < entries.length && i < CONFIG_MAX_ENTRIES; ++i)
        {
            entryList.addItem(entries[i]);
        }
        lastEntries = entries;
    }

    /* view.height */
    entryList.resize(view.width, 250);
}


function ekpaideut()
{
    if (combobox2.selectedIndex == 1)
    {
        teacher_name = 'Αδάμ Γεώργιος';
        teacher_mail = 'gadam@teilar.gr';
    }
    if (combobox2.selectedIndex == 2)
    {
        teacher_name = 'Βέντζας Δημήτριος';
        teacher_mail = 'ventzas@teilar.gr';
    }
    if (combobox2.selectedIndex == 3)
    {
        teacher_name = 'Γκαράνη Γεωργία';
        teacher_mail = 'garani@teilar.gr';
    }
    if (combobox2.selectedIndex == 4)
    {
        teacher_name = 'Ιατρέλλης Όμηρος';
        teacher_mail = 'iatrellis@teilar.gr';
    }
    if (combobox2.selectedIndex == 5)
    {
        teacher_name = 'Κακαρόντζας Γιώργος';
        teacher_mail = 'gkakaron@teilar.gr';
    }
    if (combobox2.selectedIndex == 6)
    {
        teacher_name = 'Καραπούλιος Κωνσταντίνος';
        teacher_mail = 'karapoulios@teilar.gr';
    }
    if (combobox2.selectedIndex == 7)
    {
        teacher_name = 'Καρέτσος Γεώργιος';
        teacher_mail = 'karetsos@teilar.gr';
    }
    if (combobox2.selectedIndex == 8)
    {
        teacher_name = 'Λιόλιος Νικόλαoς';
        teacher_mail = 'nliolios@teilar.gr';
    }
    if (combobox2.selectedIndex == 9)
    {
        teacher_name = 'Μπάτης Νικόλαος';
        teacher_mail = 'batis@teilar.gr';
    }
    if (combobox2.selectedIndex == 10)
    {
        teacher_name = 'Σάββας Ηλίας';
        teacher_mail = 'savvas@teilar.gr';
    }
    if (combobox2.selectedIndex == 11)
    {
        teacher_name = 'Σαμαράς Νικόλαος';
        teacher_mail = 'nsamaras@teilar.gr';
    }
    if (combobox2.selectedIndex == 12)
    {
        teacher_name = 'Τσουκάτος Κωνσταντίνος';
        teacher_mail = 'ktsouk@teilar.gr';
    }
    if (combobox2.selectedIndex == 13)
    {
        teacher_name = 'Χαρτώνας Χρυσάφης';
        teacher_mail = 'hartonas@teilar.gr';
    }
    if (combobox2.selectedIndex == 16)
    {
        teacher_name = 'Αδάμος Δημήτρης';
        teacher_mail = 'dimitrisadamos@teilar.gr';
    }
    if (combobox2.selectedIndex == 17)
    {
        teacher_name = 'Βελώνης Πέτρος';
        teacher_mail = 'velonis@teilar.gr';
    }
    if (combobox2.selectedIndex == 18)
    {
        teacher_name = 'Γκανάς Λάμπρος';
        teacher_mail = 'ganas@teilar.gr';
    }
    if (combobox2.selectedIndex == 19)
    {
        teacher_name = 'Ευαγγελίδης Γεώργιος';
        teacher_mail = 'gde@teilar.gr';
    }
    if (combobox2.selectedIndex == 20)
    {
        teacher_name = 'Ιωαννίδης Δημήτριος';
        teacher_mail = 'ioannidis@teilar.gr';
    }
    if (combobox2.selectedIndex == 21)
    {
        teacher_name = 'Καραΐσκος Ζαφείριος';
        teacher_mail = 'karaisko@teilar.gr';
    }
    if (combobox2.selectedIndex == 22)
    {
        teacher_name = 'Κατή Σοφία';
        teacher_mail = 'katisof@teilar.gr';
    }
    if (combobox2.selectedIndex == 23)
    {
        teacher_name = 'Κατσίμπας Θεόδωρος';
        teacher_mail = 'katsibas@teilar.gr';
    }
    if (combobox2.selectedIndex == 24)
    {
        teacher_name = 'Κόκκινος Κωνσταντίνος';
        teacher_mail = 'k_kokkinos@teilar.gr';
    }
    if (combobox2.selectedIndex == 25)
    {
        teacher_name = 'Κονδυλοπούλου Ελένη';
        teacher_mail = 'kondilopoulou@teilar.gr';
    }
    if (combobox2.selectedIndex == 26)
    {
        teacher_name = 'Κοσμάς Κωνσταντίνος';
        teacher_mail = 'konstantinos@teilar.gr';
    }
    if (combobox2.selectedIndex == 27)
    {
        teacher_name = 'Κουμπογιάννης Στυλιανός';
        teacher_mail = 'koumpoyia@teilar.gr';
    }
    if (combobox2.selectedIndex == 28)
    {
        teacher_name = 'Κυριατζής Βασίλειος';
        teacher_mail = 'kyriatzis@teilar.gr';
    }
    if (combobox2.selectedIndex == 29)
    {
        teacher_name = 'Λεπενιώτου Αλεξάνδρα';
        teacher_mail = 'lepeniotou@teilar.gr';
    }
    if (combobox2.selectedIndex == 30)
    {
        teacher_name = 'Λιόλιος Χαράλαμπος';
        teacher_mail = 'cliolios@teilar.gr';
    }
    if (combobox2.selectedIndex == 31)
    {
        teacher_name = 'Μπουργάνης Ηλίας';
        teacher_mail = 'eliasbrg@teilar.gr';
    }
    if (combobox2.selectedIndex == 32)
    {
        teacher_name = 'Νάκος Χρήστος';
        teacher_mail = 'cnakos@teilar.gr';
    }
    if (combobox2.selectedIndex == 33)
    {
        teacher_name = 'Νεβράντζας Βάιος-Γερμανός';
        teacher_mail = 'germanos@teilar.gr';
    }
    if (combobox2.selectedIndex == 34)
    {
        teacher_name = 'Ντόντας Απόστολος';
        teacher_mail = 'ntontas@teilar.gr';
    }
    if (combobox2.selectedIndex == 35)
    {
        teacher_name = 'Ορφανάκης Στυλιανός';
        teacher_mail = 'stelorf@teilar.gr';
    }
    if (combobox2.selectedIndex == 36)
    {
        teacher_name = 'Παπακώστας Άρης';
        teacher_mail = 'ap@teilar.gr';
    }
    if (combobox2.selectedIndex == 37)
    {
        teacher_name = 'Σοφός Φίλιππος';
        teacher_mail = 'fsof@teilar.gr';
    }
    if (combobox2.selectedIndex == 38)
    {
        teacher_name = 'Στάθης Λάμπρος';
        teacher_mail = 'stathis@teilar.gr';
    }
    if (combobox2.selectedIndex == 39)
    {
        teacher_name = 'Στυλιανός Τηλέμαχος';
        teacher_mail = 'tilemaxos@teilar.gr';
    }
    if (combobox2.selectedIndex == 40)
    {
        teacher_name = 'Σωμαράς Χρήστος';
        teacher_mail = 'swmaras@teilar.gr';
    }
    if (combobox2.selectedIndex == 41)
    {
        teacher_name = 'Τζιγκούρας Ιωάννης';
        teacher_mail = 'fuji@teilar.gr';
    }
    if (combobox2.selectedIndex == 42)
    {
        teacher_name = 'Τσιακμάκη Μαρία';
        teacher_mail = 'tsiakmaki@teilar.gr';
    }
    if (combobox2.selectedIndex == 43)
    {
        teacher_name = 'Φουκαλάς Φώτιος';
        teacher_mail = 'foukalas@teilar.gr';
    }
    if (combobox2.selectedIndex == 44)
    {
        teacher_name = 'Χαϊκάλης Κωνσταντίνος';
        teacher_mail = 'kchaikalis@teilar.gr';
    }
    if (combobox2.selectedIndex == 45)
    {
        teacher_name = 'Χαλιαμπάλιας Ρίζος';
        teacher_mail = 'rizos@teilar.gr';
    }
    CONFIG_FEED_URL = 'http://www.cs.teilar.gr/CS/rss.jsp?id=' + teacher_mail;
    site_to_visit = 'http://www.cs.teilar.gr/CS/ShowPTeacher.jsp?id=' + teacher_mail;
    refresh();
}

function whatSelected()
{
    if (combobox1.selectedIndex == 0)
    {
        CONFIG_FEED_URL = 'http://www.cs.teilar.gr/rss';
        site_to_visit = 'http://www.cs.teilar.gr/';
        combobox2.visible = false;
        refresh();
    }
    else if (combobox1.selectedIndex == 2)
    {
        CONFIG_FEED_URL = 'http://linuxteam.cs.teilar.gr/index.php?option=com_rss&feed=RSS2.0&no_html=1';
        combobox2.visible = false;
        site_to_visit = 'http://linuxteam.cs.teilar.gr/';
        refresh();
    }
    else if (combobox1.selectedIndex == 1)
    {
        combobox2.visible = true;
        combobox2.selectedIndex = 0;
        site_to_visit = '';
    }
    else
    {
        view.alert("There was an error");
    }
}

function easter_egg()
{
    view.alert("\n      .----.                      \n     |o_o |    In  a  world  without\n     | \\_/  |     fences  and  walls\n _/ /_ _ \\ \\    who needs Gates \n(  /    |   (_)      and Windows.   \n/˘\\_    _/   \\                  \n\\___)-(___/       GNU/Linux\n");
}

function tip()
{
    view.alert("\n• Κάντε διπλό click σε κάποια ανακοίνωση για να δείτε τα περιεχόμενά της στον web browser.\n• Κάντε click στο banner για να δείτε πληροφορίες για το τμήμα/τον επιλεγμένο καθηγητή/το LinuxTeam.\n• Κάντε δεξί click στο banner για να επισκεφτείτε την αντίστοιχη ιστοσελίδα (του τμήματος/του επιλεγμένου καθηγητή/του LinuxTeam).\n• Αφήστε για λίγη ώρα το ποντίκι πάνω στο όνομα ενός καθηγητή στη λίστα για να εμφανιστεί το e-mail του (tooltip).");
}

function visit_site()
{
    if (combobox1.selectedIndex == 1 && combobox2.selectedIndex == 0)
        view.alert(strings.VISIT_SITE_ERROR);
    else if (combobox1.selectedIndex == 1 && combobox2.selectedIndex == 14)
        view.alert(strings.VISIT_SITE_ERROR);
    else if (combobox1.selectedIndex == 1 && combobox2.selectedIndex == 15)
        view.alert(strings.VISIT_SITE_ERROR);
    else
    {
        var winShell = new ActiveXObject('Shell.Application');
        winShell.ShellExecute(site_to_visit);
    }
}

function show_info()
{
    if (combobox1.selectedIndex == 1 && combobox2.selectedIndex != 0 && combobox2.selectedIndex != 14 && combobox2.selectedIndex != 15)
        view.alert("\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\nΌνομα\t: " + teacher_name + "\nE-mail\t: " + teacher_mail + "\nWeb site : " +  site_to_visit);
    if (combobox1.selectedIndex == 0)
        view.alert("\nΤηλέφωνο γραμματείας:\t2410 684387\nE-mail γραμματείας:\t\tsecry-cs@teilar.gr\nSite Τμήματος:\t\thttp://www.cs.teilar.gr/\nSite e-γραμματείας:\t\thttp://dionysos.teilar.gr/\n\nΠληροφορίες τμήματος:\n   Το Τμήμα Τεχνολογίας Πληροφορικής και Τηλεπικοινωνιών του ΤΕΙ Λάρισας ιδρύθηκε με το Προεδρικό Διάταγμα 200/1999 (ΦΕΚ 179 06/09/99), με πρώτο εξάμηνο λειτουργίας το Φθινοπωρινό εξάμηνο του 1999, στα πλαίσια της ενέργειας «Διεύρυνση της Τριτοβάθμιας Εκπαίδευσης» του Επιχειρησιακού Προγράμματος Εκπαίδευσης και Αρχικής Επαγγελματικής Κατάρτισης του 2ου Κοινοτικού Πλαισίου Στήριξης (2ο ΚΠΣ). \n   Το Τμήμα Τεχνολογίας Πληροφορικής και Τηλεπικοινωνιών προχώρησε σε αναβάθμιση και βελτίωση του προγράμματος σπουδών με την υποστήριξη περισσότερων μαθημάτων επιλογής υποχρεωτικών και την online υποστήριξη της εκπαιδευτικής διαδικασίας (e-learning) στα πλαίσια του έργου του Επιχειρησιακού Προγράμματος Εκπαίδευσης και Αρχικής Επαγγελματικής Κατάρτισης «Ενίσχυση Σπουδών Πληροφορικής στο ΤΕΙ Λάρισας» που υλοποιείται με τη συγχρηματοδότηση της Ευρωπαϊκής Ένωσης (Ευρωπαϊκό Κοινωνικό Ταμείο) και Εθνικούς πόρους.");
    if (combobox1.selectedIndex == 2)
        view.alert("\n   Το Linux Team ΤΕΙ Λάρισας είναι μια ομάδα φοιτητών που μοιράζονται την κοινή αγάπη τους προς το Linux και το Ελεύθερο Λογισμικό/Λογισμικό Ανοιχτού Κώδικα. Το ενδιαφέρον μας αυτό αποτέλεσε έναυσμα ώστε να προωθήσουμε και στους υπόλοιπους φοιτητές και καθηγητές τις τεράστιες δυνατότητες του Linux και τα οφέλη του Ελεύθερου Λογισμικού. Σκοπός μας είναι η προβολή αυτών μέσα από διάφορες εκδηλώσεις και δραστηριότητες, όπως εβδομαδιαία meetings, συχνά σεμινάρια πάνω σε διάφορα θέματα και διεξαγωγή install fest κάθε νέο ακαδημαϊκό εξάμηνο.");
}

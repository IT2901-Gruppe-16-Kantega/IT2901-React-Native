/**
* Contains static information about all vegobjekttyper in NVDB
* The data is collected from NDVB, the file should be overwritten if vegobjekttyper needs to be updated
*/

var vegobjekttyper = [ {
    "id" : 3,
    "navn" : "Skjerm",
    "beskrivelse" : "En frittstående konstruksjon som skal være et hinder for f.eks støyutbredelse",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Skjerm",
    "sosinvdbnavn" : "Skjerm_3",
    "sorteringsnummer" : 4760
}, {
    "id" : 5,
    "navn" : "Rekkverk",
    "beskrivelse" : "En anordning som skal hindre at kjøretøy forlater vegen (Håndbok N101 (231))",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Der rekkverk følger vegens kurvatur er start og slutt rekkverkets begynnelse/slutt. Dette defineres ved start / støtpute, evt fra der rekkverk blir synlig/usynlig.  Rekkverk der vi har avvik fra mellom referanse og målt lengde , skal",
    "sosinavn" : "Rekkverk",
    "sosinvdbnavn" : "Rekkverk_5",
    "sorteringsnummer" : 3600
}, {
    "id" : 7,
    "navn" : "Gjerde",
    "beskrivelse" : "Gjerde er frittstående hinder som skal stenge/lede ferdsel av folk eller dyr",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Gjerde",
    "sosinvdbnavn" : "Gjerde_7",
    "sorteringsnummer" : 4800
}, {
    "id" : 9,
    "navn" : "Kantstein",
    "beskrivelse" : "Stein som settes for å avgrense trafikkøyer, fortau, midtdeler, etc.(1)",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Kantstein registreres også der det er nedsenket kantstein, men det skal der registreres nedsenket kantstein (VT 10) som punktobjekt i tillegg.  I rundkjøringer skal både indre og ytre kantstein registreres. Kommentar som datter kan vise hva er hva.",
    "sosinavn" : "Kantstein",
    "sosinvdbnavn" : "Kantstein_9",
    "sorteringsnummer" : 3330
}, {
    "id" : 10,
    "navn" : "Nedsenka kantstein",
    "beskrivelse" : "Nedsenka kantstein er en del av kantsteinen som er senket. F.eks i forbindelse med avkjørsler og gangfelt",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-12-15",
    "veiledning" : "Registreres helst med koordinater.",
    "sosinavn" : "NedsenkaKantstein",
    "sosinvdbnavn" : "NedsenkaKantstein_10",
    "sorteringsnummer" : 3331
}, {
    "id" : 11,
    "navn" : "Utgår_Stolpe, generell",
    "beskrivelse" : "Stolpe/mast uten lysarmatur benyttet for framføring av kabel/ledning.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Utgår_StolpeGenerell",
    "sosinvdbnavn" : "Utgår_StolpeGenerell_11",
    "sorteringsnummer" : 5140
}, {
    "id" : 13,
    "navn" : "Port/Dør",
    "beskrivelse" : "Åpning til/fra et rom/område.  Kan åpnes og lukkes med dør eller port.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "PortDør",
    "sosinvdbnavn" : "PortDør_13",
    "sorteringsnummer" : 5620
}, {
    "id" : 14,
    "navn" : "Rekkverksende",
    "beskrivelse" : "en spesiell konstruksjon i begynnelsen eller slutten på et rekkverk. Det må være utformet og montert slik at faren for alvorlig personskade ved påkjøresel blir minst mulig (Håndbok N101 (231))",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Nedføringen beskrives her. Et fiktivt start/sluttpunkt.  Dersom man har avvik fra referanselinjas geometri skrives hele lengden her.",
    "sosinavn" : "Rekkverksende",
    "sosinvdbnavn" : "Rekkverksende_14",
    "sorteringsnummer" : 3602
}, {
    "id" : 15,
    "navn" : "Grasdekker",
    "beskrivelse" : "Grønne områder som i håndbok R610 (111) benvenes som \"grasplen\" eller \"grasbakke\". Disse områdene er parklike og inngår ikke som en del av kantklipp.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Grasdekker",
    "sosinvdbnavn" : "Grasdekker_15",
    "sorteringsnummer" : 5220
}, {
    "id" : 18,
    "navn" : "Plantekasse/krukke",
    "beskrivelse" : "Kasse, urne, krukke etc. med blomster/busker",
    "stedfesting" : "PUNKT",
    "veiledning" : "Kan bør koordinatfestes",
    "sosinavn" : "PlantekasseKrukke",
    "sosinvdbnavn" : "PlantekasseKrukke_18",
    "sorteringsnummer" : 0
}, {
    "id" : 19,
    "navn" : "Kunst/Utsmykking",
    "beskrivelse" : "Kunst/utsmykking i forbindelse med et veganlegg.  Kan være skulpturer, relieff mm",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2016-06-09",
    "veiledning" : "",
    "sosinavn" : "KunstUtsmykking",
    "sosinvdbnavn" : "KunstUtsmykking_19",
    "sorteringsnummer" : 5310
}, {
    "id" : 20,
    "navn" : "Kantstolper/Refleks",
    "beskrivelse" : "Stolper -  f.eks forsynt med lysreflekterende materiale -  som markerer vegkanten og gir en optisk ledning langs vegen (1).  Kan også være refleks festa på rekkverk eller på dobber som henger i tunneltak. I noen tilfeller brukes det også ifm midtdelere.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "KantstolperRefleks",
    "sosinvdbnavn" : "KantstolperRefleks_20",
    "sorteringsnummer" : 4220
}, {
    "id" : 21,
    "navn" : "Brøytestikk",
    "beskrivelse" : "Sammenhengende rekke med brøytestikk.  Brøytestikk er stav av lauv- eller bartre, bambus e.l. plassert til markering av vegkant for snøbrøytingen (1).",
    "stedfesting" : "LINJE",
    "veiledning" : "Kantstolper og refleks er behandlet i tillegget til HB R610 (111). Der refleks brukes som optisk ledning skal det registreres ( andre krav , bla til vasking )",
    "sosinavn" : "Brøytestikk",
    "sosinvdbnavn" : "Brøytestikk_21",
    "sorteringsnummer" : 0
}, {
    "id" : 22,
    "navn" : "Ferist",
    "beskrivelse" : "Konstruksjon med rist eller gitter som er innbygd i vegbanen, og som hindrer krøtter i å komme over. (jfr bokmålsordboka)",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Ferist registreres når den er operativ. Dersom rista settes ut av funksjon ( fylles osv ) skal den slettes ( blir historisk ) Settes den i funksjon igjen registreres den inn på nytt. Objektet driftes bare når det er i bruk",
    "sosinavn" : "Ferist",
    "sosinvdbnavn" : "Ferist_22",
    "sorteringsnummer" : 3840
}, {
    "id" : 23,
    "navn" : "Vegbom",
    "beskrivelse" : "Fysisk hinder for å kunne stenge en veg.  F.eks i forbindelse med rasfare, tunnel, høgfjell etc.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Bør koordinatfestes  Dersom bommen er satt opp mtp stenging av veg i tunnel, skal den kunne knyttes til tunnelsystem",
    "sosinavn" : "Vegbom",
    "sosinvdbnavn" : "Vegbom_23",
    "sorteringsnummer" : 3580
}, {
    "id" : 24,
    "navn" : "Skiltportal",
    "beskrivelse" : "Anordning for å henge opp skilt, teknisk utstyr etc over kjørefeltene",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Skiltportal",
    "sosinvdbnavn" : "Skiltportal_24",
    "sorteringsnummer" : 3860
}, {
    "id" : 25,
    "navn" : "Leskur",
    "beskrivelse" : "Lite bygg for vern mot vær og vind.  Benyttes i forbindelse med holdeplasser.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Leskur",
    "sosinvdbnavn" : "Leskur_25",
    "sorteringsnummer" : 4900
}, {
    "id" : 26,
    "navn" : "Lekeapparat",
    "beskrivelse" : "Utstyr satt opp på f.eks. rasteplasser brukt til lek mm",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Lekeapparat",
    "sosinvdbnavn" : "Lekeapparat_26",
    "sorteringsnummer" : 5340
}, {
    "id" : 27,
    "navn" : "Renovasjon",
    "beskrivelse" : "Utstyr for søppelhåndtering",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Renovasjon",
    "sosinvdbnavn" : "Renovasjon_27",
    "sorteringsnummer" : 5380
}, {
    "id" : 28,
    "navn" : "Utemøbler",
    "beskrivelse" : "Møbler som benyttes ute i samband med vegsystemet.  Dette kan f.eks være på rasteplasser, ferjeoppstillingsplasser etc.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Kan/bør koordinatfestes",
    "sosinavn" : "Utemøbler",
    "sosinvdbnavn" : "Utemøbler_28",
    "sorteringsnummer" : 5320
}, {
    "id" : 29,
    "navn" : "Strøsandkasse",
    "beskrivelse" : "Innretning laget for lagring av strøsand",
    "stedfesting" : "PUNKT",
    "veiledning" : "Hvorfor tilstand skade strekning ?  Vi mangler Oppfylt dato om dette blir et ønske ( kan lages som funksjon i VegReg )",
    "sosinavn" : "Strøsandkasse",
    "sosinvdbnavn" : "Strøsandkasse_29",
    "sorteringsnummer" : 0
}, {
    "id" : 30,
    "navn" : "Veganlegg",
    "beskrivelse" : "Omfatter alle vegområder/traseer og tilhørende system som skal utføres i et vegprosjekt",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Veganlegg",
    "sosinvdbnavn" : "Veganlegg_30",
    "sorteringsnummer" : 0
}, {
    "id" : 37,
    "navn" : "Vegkryss",
    "beskrivelse" : "Sted der veger møtes eller krysser hverandre med mulighet for utveksling av trafikk (1).",
    "stedfesting" : "PUNKT",
    "veiledning" : "Kryss registreres i skjæringspunkt mellom referanselinjer og gies sideposisjon..Ei trafikkøy kan assosieres",
    "sosinavn" : "Vegkryss",
    "sosinvdbnavn" : "Vegkryss_37",
    "sorteringsnummer" : 0
}, {
    "id" : 39,
    "navn" : "Rasteplass",
    "beskrivelse" : "Sted ved vegen der vegtrafikanter kan parkere og hvile. (Ordbok for veg- og Trafikkteknikk).",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Rasteplass",
    "sosinvdbnavn" : "Rasteplass_39",
    "sorteringsnummer" : 5200
}, {
    "id" : 40,
    "navn" : "Snuplass",
    "beskrivelse" : "Plass som er beregnet for snuing av kjøretøy (3)",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2014-01-27",
    "veiledning" : "Måles ut fra bruksområde",
    "sosinavn" : "Snuplass",
    "sosinvdbnavn" : "Snuplass_40",
    "sorteringsnummer" : 3120
}, {
    "id" : 41,
    "navn" : "Ferjeoppstillingsplass",
    "beskrivelse" : "Område for oppstilling og venting for kjøretøy i forbindelse med ferjestrekning.  Areal til rasting, parkering etc. registreres som rasteplass og parkeringsområde. Områder som ligger fysisk adskilt, men i tilknytning til samme ferjeleie skal registreres som egne forekomster.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Ferjeoppstillingsplass",
    "sosinvdbnavn" : "Ferjeoppstillingsplass_41",
    "sorteringsnummer" : 3760
}, {
    "id" : 42,
    "navn" : "Kollektivknutepunkt",
    "beskrivelse" : "Sted i kollektivnettet der kollektivlinjer krysser eller tangerer hverandre. Knutepunktets funksjon er å binde kollektivnettet sammen til et nettverk slik at den reisende ved hjelp av tilrettelagt omstigning/bytte kan nå sitt bestemmelsessted. Et knutepunkt har ofte begrepet terminal eller stasjon i navnet (HB V123)",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Kollektivknutepunkt",
    "sosinvdbnavn" : "Kollektivknutepunkt_42",
    "sorteringsnummer" : 0
}, {
    "id" : 43,
    "navn" : "Parkeringsområde",
    "beskrivelse" : "Område avsatt til parkering for mer enn ett kjøretøy. (1)",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Parkeringsområde",
    "sosinvdbnavn" : "Parkeringsområde_43",
    "sorteringsnummer" : 3740
}, {
    "id" : 44,
    "navn" : "Kontroll-/veieplass",
    "beskrivelse" : "Område spesielt tilrettelagt for å foreta ulike typer kontroll av kjøretøy, bla vektkontroll.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Antall oppstillingsplasser kan registreres, inklusive type veiing",
    "sosinavn" : "Kontroll-Veieplass",
    "sosinvdbnavn" : "Kontroll-Veieplass_44",
    "sorteringsnummer" : 3780
}, {
    "id" : 45,
    "navn" : "Bomstasjon",
    "beskrivelse" : "Et punkt i vegnettet hvor det kreves betaling for å kunne kjøre videre.  Kan gjelde i en eller begge retninger.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Vegobjektet representerer hele bomstasjonen. Det kan knyttes til ulike \"datterobjekt\", f.eks \"Vegbom\", \"Bygning\" (innkrevingsboder og evt pauserom), \"Kamera/video\", \"Dokumentasjon\" og \"Kommentar\".",
    "sosinavn" : "Bomstasjon",
    "sosinvdbnavn" : "Bomstasjon_45",
    "sorteringsnummer" : 3800
}, {
    "id" : 46,
    "navn" : "Avkjørsel",
    "beskrivelse" : "Kjørbar tilknytning til vegnettet for en eiendom eller et begrenset antall eiendommer (1).",
    "stedfesting" : "PUNKT",
    "veiledning" : "Det skal angis sideposisjon.  Minst en av egenskapstypene \"Primæraktivitet og Bruksområde\" skal gis.",
    "sosinavn" : "Avkjørsel",
    "sosinvdbnavn" : "Avkjørsel_46",
    "sorteringsnummer" : 0
}, {
    "id" : 47,
    "navn" : "Trafikklomme",
    "beskrivelse" : "Kjøreareal som ligger inntil ytterste kjørefelt. Der kan være trafikkdeler mellom kjørefelt og trafikklomme.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Det er generert opp mange en meters elementer ved overgang pkt til str. Sjekk for overlapp her ved nyregistrering.Del av holdeplassutrustning. Start i enden av spiss og slutt i enden av spiss.",
    "sosinavn" : "Trafikklomme",
    "sosinvdbnavn" : "Trafikklomme_47",
    "sorteringsnummer" : 3110
}, {
    "id" : 48,
    "navn" : "Fortau",
    "beskrivelse" : "Del av vegen reservert for gående.  Som regel ligger f. høyere enn kjørebanen og er atskilt fra denne med kantstein (1)",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Fortau på bru, overgang veg bru og fortau i tilknytning til busslommer vurderes spesielt (se gsv- instruks). Avklar vedlikeholdsansvar mot kanstein",
    "sosinavn" : "Fortau",
    "sosinvdbnavn" : "Fortau_48",
    "sorteringsnummer" : 3170
}, {
    "id" : 49,
    "navn" : "Trafikkøy",
    "beskrivelse" : "Område som er begrenset av kjørefelt på alle sider og som normalt ikke skal benyttes av kjøretøy.  Trafikkøy kan være en forhøyning avgrenset med kantstein, eller malt på vegen",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Registreres i forbindelse med vegkryss. I sideveg er alternativet å registrere øya til hovedvegen og bruke tilfarter som sideposisjon. Diverse lengdebegreper på døtrer og lengde må gies. All type belegning kan gies, inkl. evt utsmykking.",
    "sosinavn" : "Trafikkøy",
    "sosinvdbnavn" : "Trafikkøy_49",
    "sorteringsnummer" : 3070
}, {
    "id" : 57,
    "navn" : "Skjæring",
    "beskrivelse" : "Skråflate som er del av begrensningen av at skjæringsvolum.  I tillegg til ei eller to skjæringer (evt. en på hver side av vegen) begrenses skjæringsvolumet av planum.  Merknad: Det skal angis sideposisjon for skjæring.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Registreres som flate med geometri eller som strekningsdata med maks høgde. Flata reknes fra indre grøfteskråning til topp inngrep i naturlig terreng.Skråflate kan delvis dekkes av et sikringslag, trafikksikkerhet eller pga erosjon Her registreres ikke volum.",
    "sosinavn" : "Skjæring",
    "sosinvdbnavn" : "Skjæring_57",
    "sorteringsnummer" : 4600
}, {
    "id" : 59,
    "navn" : "Fiberduk",
    "beskrivelse" : "Permeabel duk som hovedsaklig brukes til filter og til separasjon av gode og dårlige masser.  Visse duker har også en armeringsfunksjon.  Betegnelsen geotekstil og fiberduk benyttes ofte om hverandre (2).",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Fiberduk",
    "sosinvdbnavn" : "Fiberduk_59",
    "sorteringsnummer" : 4500
}, {
    "id" : 60,
    "navn" : "Bru",
    "beskrivelse" : "Byggverk uten overliggende fylling som fører vegen over en fri åpning på minst 2,5 meter (1).  Kort bru < 40 meter, lang bru > 40 meter.",
    "stedfesting" : "LINJE",
    "veiledning" : "Forekomster hentes fra BRUTUS med jevne mellomrom.  Vedlikehold av forekomster skal derfor også gjøres vha BRUTUS.",
    "sosinavn" : "Bru",
    "sosinvdbnavn" : "Bru_60",
    "sorteringsnummer" : 0
}, {
    "id" : 62,
    "navn" : "Støttemur",
    "beskrivelse" : "Byggverk som brukes for å overvinne nivåforskjell hvor vanlig skråning vil ta for stor plass.  S. brukes også som sikringstiltak.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Støttemur",
    "sosinvdbnavn" : "Støttemur_62",
    "sorteringsnummer" : 4680
}, {
    "id" : 64,
    "navn" : "Ferjeleie",
    "beskrivelse" : "Sted med en eller flere ferjelemmer hvor ferje anløper for å ta om bord og slippe av kjøretøy og passasjerer.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Ferjeleie",
    "sosinvdbnavn" : "Ferjeleie_64",
    "sorteringsnummer" : 0
}, {
    "id" : 65,
    "navn" : "Bygning",
    "beskrivelse" : "Bygning i tilknytning til vegen",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Bygning",
    "sosinvdbnavn" : "Bygning_65",
    "sorteringsnummer" : 4840
}, {
    "id" : 66,
    "navn" : "Skredoverbygg",
    "beskrivelse" : "Konstruksjon som omslutter vegen for å beskytte den mot skred.  Tak og vegg inn mot skråning er massive.  Vegg ut fra skråning er åpen eller evt. tettet med lettere materiale.  Se også utgått Håndbok 100",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Skredoverbygg",
    "sosinvdbnavn" : "Skredoverbygg_66",
    "sorteringsnummer" : 5420
}, {
    "id" : 67,
    "navn" : "Tunnelløp",
    "beskrivelse" : "Utgravd eller utstøpt passasje gjennom jord/fjell eller under større lokk.  Har normalt inngang og utgang i dagen.  I spesielle tilfeller, f.eks når forgreninger eller kryss, kan det være utgang mot annet tunnelløp eller inngang fra annet tunnelløp. Se også Undergang, Skredoverbygg og Høydebegrensning.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Tunnelløp",
    "sosinvdbnavn" : "Tunnelløp_67",
    "sorteringsnummer" : 5460
}, {
    "id" : 69,
    "navn" : "Tunnelportal",
    "beskrivelse" : "Byggverk som benyttes i endene av fjelltunnelene for å beskytte tunnelåpning mot rennende vann og fallende snø, is stein og jord. (HB V440 (129))",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Tunnelportal",
    "sosinvdbnavn" : "Tunnelportal_69",
    "sorteringsnummer" : 5480
}, {
    "id" : 70,
    "navn" : "Vann- og frostsikring",
    "beskrivelse" : "Konstruksjon i tunnel for sikring mot vann og frost.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Vann-OgFrostsikring",
    "sosinvdbnavn" : "Vann-OgFrostsikring_70",
    "sorteringsnummer" : 5500
}, {
    "id" : 71,
    "navn" : "Betongutstøping",
    "beskrivelse" : "Utstøping i tunnel for sikring mot utrasing",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Betongutstøping",
    "sosinvdbnavn" : "Betongutstøping_71",
    "sorteringsnummer" : 5520
}, {
    "id" : 72,
    "navn" : "Bergsikring",
    "beskrivelse" : "Område/felt i tunnel eller fjellskjæring i dagen som er sikra med nett, bolter etc.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Bergsikring",
    "sosinvdbnavn" : "Bergsikring_72",
    "sorteringsnummer" : 4620
}, {
    "id" : 73,
    "navn" : "Sikringsbolt",
    "beskrivelse" : "Fjellbolt brukt i forbindelse med sikring av fjellskjæring/tunnel",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Sikringsbolt",
    "sosinvdbnavn" : "Sikringsbolt_73",
    "sorteringsnummer" : 4640
}, {
    "id" : 74,
    "navn" : "Utgår_Tildekningslag",
    "beskrivelse" : "Lag for å dekke til tunnelprofil eller fjellskjæringsskråning.  (Merknad: Informasjon legges til VT 70, Tunnelhvelv)",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Utgår_Tildekningslag",
    "sosinvdbnavn" : "Utgår_Tildekningslag_74",
    "sorteringsnummer" : 0
}, {
    "id" : 77,
    "navn" : "Rørledning",
    "beskrivelse" : "Rør som fører væske eller gass (uoff).",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Kan være datter til \"Grøft, lukket\". Kan også være ledning fra fallkum i stikkrenne til bortledning mot resipient",
    "sosinavn" : "Rørledning",
    "sosinvdbnavn" : "Rørledning_77",
    "sorteringsnummer" : 4280
}, {
    "id" : 78,
    "navn" : "Lukket rørgrøft",
    "beskrivelse" : "Trase med nedgravd(e) rørledning(er) eller pukkstreng. Benyttes i første rekke i forbindelse med drenering av veger, men kan også inneholde andre typer rørledninger. Merknad: Grøft med kun kabler og trekkerør er definert som egen vegobjekttype Kabelgrøft",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "LukketRørgrøft",
    "sosinvdbnavn" : "LukketRørgrøft_78",
    "sorteringsnummer" : 4240
}, {
    "id" : 79,
    "navn" : "Stikkrenne/Kulvert",
    "beskrivelse" : "Rør for vanngjennomløp på tvers av vegen (evnt. på tvers av tilgrensende avkjørsel) med maks lysåpning 2,5 meter. Stikkrenne/kulvert har åpent innløp og/eller utløp. Stikkrenne/kulvert kan ha inn- og utløpskonstruksjoner som kummer og støtteskjold. Merknad: Inntil videre registrere stikkrenner med bruksområde biologisk mangfold eller landbruk som vanlig stikkrenne. Dette blir endret på i senere versjon av Datakatalogen.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Stikkrenne registreres med start innløp sett i kjøreretningen.  Stikkrenna inngår ikke i Lukka drenering.  Det regnes derfor ikke som stikkrenne der lukka drenering krysser vegen Vi kan ha tilknytning til kum både for innløp og utløp. Videreføring fra vegkroppen fra kum mot rørledning som kan ha egne kummer over eks. dyrka mark",
    "sosinavn" : "StikkrenneKulvert",
    "sosinvdbnavn" : "StikkrenneKulvert_79",
    "sorteringsnummer" : 4320
}, {
    "id" : 80,
    "navn" : "Grøft, åpen",
    "beskrivelse" : "Forsenkning i terrenget for å lede bort vann.  Del av vegens avvanningssystem.  Kan også benevnes \"kanal\".  Merknad: Breddemåling skal refereres til topp grøft.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Kan registreres som datter til \"Grøft, lukka\" når \"Grøft, åpen\" tar overflatevann, mens \"Grøft, lukka\" tar dypdrenering. Det kan registreres parallelle grøfter (høyre, venstre, midt) Ulike dybder med utgangspunkt i Vegnormaler, funksjonskontrakter (mal)",
    "sosinavn" : "GrøftÅpen",
    "sosinvdbnavn" : "GrøftÅpen_80",
    "sorteringsnummer" : 4260
}, {
    "id" : 81,
    "navn" : "Elv/Bekk, gjenlagt",
    "beskrivelse" : "Elv eller bekk som er gjenlagt i forbindelse med veganlegg.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "ElvBekkGjenlagt",
    "sosinvdbnavn" : "ElvBekkGjenlagt_81",
    "sorteringsnummer" : 0
}, {
    "id" : 82,
    "navn" : "Hydraveg",
    "beskrivelse" : "Drenering av plast.  Legges i vegkant for å skjære av vanntilsig inn mot vegen.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Hydraveg",
    "sosinvdbnavn" : "Hydraveg_82",
    "sorteringsnummer" : 0
}, {
    "id" : 83,
    "navn" : "Kum",
    "beskrivelse" : "Dreneringskonstruksjon",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Kum",
    "sosinvdbnavn" : "Kum_83",
    "sorteringsnummer" : 4360
}, {
    "id" : 85,
    "navn" : "Pumpe",
    "beskrivelse" : "Innretning for å pumpe vann.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Pumpe",
    "sosinvdbnavn" : "Pumpe_85",
    "sorteringsnummer" : 6300
}, {
    "id" : 86,
    "navn" : "Belysningsstrekning",
    "beskrivelse" : "Gir en strekning langs vegen med belysningspunkt, kabler, stolper og fundamenter som naturlig hører sammen. Alle elektriske objekter i en Belysningsstrekning skal være koblet mot samme Elektriske anlegg, dvs. de skal ligge under samme måler",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Belysningsstrekning",
    "sosinvdbnavn" : "Belysningsstrekning_86",
    "sorteringsnummer" : 4040
}, {
    "id" : 87,
    "navn" : "Belysningspunkt",
    "beskrivelse" : "Lokasjon/konteiner med samling av en eller flere lysarmaturer og lysmast i ett punkt. Det kan forekomme varianter uten lysmast, for eksempel lysarmatur opphengt i tunneltak, og det kan forekomme varianter uten lysarmatur, f.eks lysmast kun for kabelframføring.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Belysningspunkt",
    "sosinvdbnavn" : "Belysningspunkt_87",
    "sorteringsnummer" : 4060
}, {
    "id" : 88,
    "navn" : "Lysarmatur",
    "beskrivelse" : "Lyskilde med innfatning",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Lysarmatur",
    "sosinvdbnavn" : "Lysarmatur_88",
    "sorteringsnummer" : 4100
}, {
    "id" : 89,
    "navn" : "Signalanlegg",
    "beskrivelse" : "System for regulering og varsling av trafikk.  Det er sammensatt av flere signalpunkt med tilhørende signalhoder og blir styrt av et styreapparat.  Merknad: Rødblinkanlegg er som regel egne signalanlegg på hvert sted, dvs rødblink i en ende av en tunnel er et annet saignalanlegg enn rødblink i andre enden av tunnelen.  Motsatt kan signalpunkt ved et gangfelt høre sammen i samme signalanlegg som signalpunkt for et kryss like ved.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Strekning skal være så lang at alle signalpunkt tilhørende signalanlegget blir innenfor strekningen. Geometrisk punkt som skal representere signalanlegget gis midt i krysset eller midt på aktuell strekning. Registrer hvert signalpunkt med referanse.",
    "sosinavn" : "Signalanlegg",
    "sosinvdbnavn" : "Signalanlegg_89",
    "sorteringsnummer" : 3980
}, {
    "id" : 90,
    "navn" : "Signalpunkt",
    "beskrivelse" : "Signalhoder inkludert stolpe etc. lokalisert til et punkt.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Signalpunkt",
    "sosinvdbnavn" : "Signalpunkt_90",
    "sorteringsnummer" : 4000
}, {
    "id" : 91,
    "navn" : "Signalhode",
    "beskrivelse" : "Innfatning med ett eller flere lys/lamper som til sammen danner et trafikklyssignal",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Hvert signalhode defineres. ( Ikke sum ) Egenskap : Antall lamper defineres",
    "sosinavn" : "Signalhode",
    "sosinvdbnavn" : "Signalhode_91",
    "sorteringsnummer" : 4020
}, {
    "id" : 92,
    "navn" : "Kabel",
    "beskrivelse" : "Elektrisk eller optisk leder",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Kabel",
    "sosinvdbnavn" : "Kabel_92",
    "sorteringsnummer" : 4120
}, {
    "id" : 95,
    "navn" : "Skiltpunkt",
    "beskrivelse" : "Skiltpunkt er en sammensetning av skiltplater, stolper og stolpefundament mm.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Skiltpunkt",
    "sosinvdbnavn" : "Skiltpunkt_95",
    "sorteringsnummer" : 3880
}, {
    "id" : 96,
    "navn" : "Skiltplate",
    "beskrivelse" : "Plate med skiltmotiv.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Referansen knyttes til skiltpunktet. Oppsettingsutstyr og skiltplater med diverse egenskaper omfattes av registreringen. Det er laget texturer som kan velges. Skiltpunkt kan settes på portal, slik at overhengende skilt kan registreres på feltnivå.",
    "sosinavn" : "Skiltplate",
    "sosinvdbnavn" : "Skiltplate_96",
    "sorteringsnummer" : 3900
}, {
    "id" : 97,
    "navn" : "Variabelt skilt",
    "beskrivelse" : "Skilt som kan vise ulike motiv.  Motivet kan styres fra en sentral eller det kan varieres manuelt.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "VariabeltSkilt",
    "sosinvdbnavn" : "VariabeltSkilt_97",
    "sorteringsnummer" : 3920
}, {
    "id" : 98,
    "navn" : "Referansestolpe",
    "beskrivelse" : "Punkt langs veg hvor vegens metrering er angitt på fastmontert plate.  Finnes i 500-1000 meters mellomrom langs europa-, riks- og fylkesveger.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Referansestolpe",
    "sosinvdbnavn" : "Referansestolpe_98",
    "sorteringsnummer" : 3960
}, {
    "id" : 99,
    "navn" : "Vegoppmerking, langsgående",
    "beskrivelse" : "Vegoppmerking nyttes for å lede, varsle eller regulere trafikken, og for å klargjøre andre bestemmelser gitt ved trafikkskilt eller trafikkregler. (050).  Langsgående oppmerking omfatter alle langsgående oppmerka linjer og sperreområder, også inkludert oppmerking av trafikkøyer.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "VegoppmerkingLangsgåend",
    "sosinvdbnavn" : "VegoppmerkingLangsgåend_99",
    "sorteringsnummer" : 3680
}, {
    "id" : 100,
    "navn" : "Jernbanekryssing",
    "beskrivelse" : "Sted i vegnettet hvor veg og jernbane krysses",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Jernbanekryssing",
    "sosinvdbnavn" : "Jernbanekryssing_100",
    "sorteringsnummer" : 0
}, {
    "id" : 103,
    "navn" : "Fartsdemper",
    "beskrivelse" : "Fysisk tiltak for å holde fartsnivået lavt.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Registreres fra /til der det fysiske objekter starter / slutter.  Dersom det er et gangfelt, så er dette objektet mor til fartsdemperen.  Kan også stå alene.",
    "sosinavn" : "Fartsdemper",
    "sosinvdbnavn" : "Fartsdemper_103",
    "sorteringsnummer" : 3820
}, {
    "id" : 104,
    "navn" : "Bruksklasse, uoffisiell",
    "beskrivelse" : "Angir bruksklasse. Foreløpig versjon for intern bruk",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "BruksklasseUoffisiell",
    "sosinvdbnavn" : "BruksklasseUoffisiell_104",
    "sorteringsnummer" : 0
}, {
    "id" : 105,
    "navn" : "Fartsgrense",
    "beskrivelse" : "Høyeste tillatte hastighet på en vegstrekning.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Fartsgrense",
    "sosinvdbnavn" : "Fartsgrense_105",
    "sorteringsnummer" : 0
}, {
    "id" : 106,
    "navn" : "Vinterdriftsstrategi",
    "beskrivelse" : "Angir hvilken strategi det skal være i forhold til vinterdrift på strekningen.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Vinterdriftsstrategi",
    "sosinvdbnavn" : "Vinterdriftsstrategi_106",
    "sorteringsnummer" : 0
}, {
    "id" : 107,
    "navn" : "Værutsatt veg",
    "beskrivelse" : "Vegstrekning som er spesielt utsatt for uvær, og av den grunn kan ha begrenset åpningstid. Merknad: Strekninger kan ikke ha dobbeltregistreringer (overlapp), ved flere likestilte naturfarer beskrives dette under \"Tilleggsinformasjon\"",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "VærutsattVeg",
    "sosinvdbnavn" : "VærutsattVeg_107",
    "sorteringsnummer" : 0
}, {
    "id" : 110,
    "navn" : "Service",
    "beskrivelse" : "Vegobjekt som gir informasjon om service som er aktuell for trafikantene",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Service",
    "sosinvdbnavn" : "Service_110",
    "sorteringsnummer" : 0
}, {
    "id" : 113,
    "navn" : "Høydemåling",
    "beskrivelse" : "Strekning med gitt høyde relatert til bestemt vegobjektforekomst. Inneholder egenhøyde start/slutt, samt høyde over vegkant",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Høydemåling",
    "sosinvdbnavn" : "Høydemåling_113",
    "sorteringsnummer" : 0
}, {
    "id" : 123,
    "navn" : "Tilstand/skade, dekke",
    "beskrivelse" : "Gir informasjon om tilstand og eventuell skade på vegdekke.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "TilstandSkadeDekke",
    "sosinvdbnavn" : "TilstandSkadeDekke_123",
    "sorteringsnummer" : 0
}, {
    "id" : 137,
    "navn" : "Fylling",
    "beskrivelse" : "Skråflate som er del av begrensningen av et fyllingsvolum.  I tillegg til ei eller to fyllinger (evt. en på hver side av vegen) begrenses fyllingsvolumet av vegens planum.  Merknad: Det skal angis sideposisjon for fylling.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Fylling",
    "sosinvdbnavn" : "Fylling_137",
    "sorteringsnummer" : 4560
}, {
    "id" : 144,
    "navn" : "Plastring/Erosjonssikring",
    "beskrivelse" : "Enklere forebygning utført av stein, evt med underliggende filterlag (1). Benyttes i forbindelse med sikring av skråninger mot vannerosjon.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "PlastringErosjonssikri",
    "sosinvdbnavn" : "PlastringErosjonssikri_144",
    "sorteringsnummer" : 4580
}, {
    "id" : 145,
    "navn" : "Membran",
    "beskrivelse" : "Tett duk f.eks brukt i forbindelse med vanntetting i tunnel.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2015-03-17",
    "veiledning" : "",
    "sosinavn" : "Membran",
    "sosinvdbnavn" : "Membran_145",
    "sorteringsnummer" : 5510
}, {
    "id" : 147,
    "navn" : "Fjellrom",
    "beskrivelse" : "Utsprengt del av tunnel som er avgrenset fra selve tunnelløpet med vegg/dør.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Fjellrom",
    "sosinvdbnavn" : "Fjellrom_147",
    "sorteringsnummer" : 5600
}, {
    "id" : 153,
    "navn" : "Værstasjon",
    "beskrivelse" : "Målestasjon som har instrument for å måle værdata som temperatur, luftfuktighet, med mer",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Værstasjon",
    "sosinvdbnavn" : "Værstasjon_153",
    "sorteringsnummer" : 5680
}, {
    "id" : 155,
    "navn" : "Vekt",
    "beskrivelse" : "Instrument for å foreta vektkontroll av tyngre kjøretøy.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Vekt",
    "sosinvdbnavn" : "Vekt_155",
    "sorteringsnummer" : 0
}, {
    "id" : 162,
    "navn" : "ATK-punkt",
    "beskrivelse" : "\tPunkt hvor det gjennomføres automatisk trafikkontroll (ATK) på passerende kjøretøy ved hjelp av en fartsmåler og kamera som fotograferer fartsovertredere.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "ATK-punkt",
    "sosinvdbnavn" : "ATK-punkt_162",
    "sorteringsnummer" : 0
}, {
    "id" : 163,
    "navn" : "Kamera, overvåkning",
    "beskrivelse" : "Fastmontert video- eller fotokamera for trafikkovervåkning",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "KameraOvervåkning",
    "sosinvdbnavn" : "KameraOvervåkning_163",
    "sorteringsnummer" : 5760
}, {
    "id" : 164,
    "navn" : "Måleutstyr, svevestøv",
    "beskrivelse" : "Måleutstyr for å måle svevestøvinnhold i luft",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "MåleutstyrSvevestøv",
    "sosinvdbnavn" : "MåleutstyrSvevestøv_164",
    "sorteringsnummer" : 6160
}, {
    "id" : 165,
    "navn" : "Vindmåler",
    "beskrivelse" : "Måleinstrument for å måle vindstyrke og vindretning",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Vindmåler",
    "sosinvdbnavn" : "Vindmåler_165",
    "sorteringsnummer" : 5740
}, {
    "id" : 166,
    "navn" : "Teledybdemåler",
    "beskrivelse" : "Instrumentering for å måle teledybde",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Teledybdemåler",
    "sosinvdbnavn" : "Teledybdemåler_166",
    "sorteringsnummer" : 0
}, {
    "id" : 167,
    "navn" : "Detektor, trafikk",
    "beskrivelse" : "En enhet som gir en impuls til styreapparatet når den blir aktivert av en trafikant",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "DetektorTrafikk",
    "sosinvdbnavn" : "DetektorTrafikk_167",
    "sorteringsnummer" : 6080
}, {
    "id" : 172,
    "navn" : "Trafikkdeler",
    "beskrivelse" : "Fysisk skille mellom trafikkstrømmer (1)",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Trafikkdeler registreres fra fysisk/malt startpunkt. Man må splitte objektet dersom man vil splitte malt og fysiske enheter",
    "sosinavn" : "Trafikkdeler",
    "sosinvdbnavn" : "Trafikkdeler_172",
    "sorteringsnummer" : 3071
}, {
    "id" : 174,
    "navn" : "Gangfelt",
    "beskrivelse" : "Oppmerket felt for fotgjengere (1)",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Gangfelt",
    "sosinvdbnavn" : "Gangfelt_174",
    "sorteringsnummer" : 3210
}, {
    "id" : 180,
    "navn" : "Nødtelefon",
    "beskrivelse" : "Fast montert telefon i tunneler eller på høyfjellsoverganger til bruk i nødsfall.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Nødtelefon",
    "sosinvdbnavn" : "Nødtelefon_180",
    "sorteringsnummer" : 5860
}, {
    "id" : 181,
    "navn" : "Lysmast",
    "beskrivelse" : "Mast i forbindelse med veg/gatebelysning. Normalt har mast påmontert lysarmatur, men kan også være mast uten lysarmatur som benyttes for framføring av kabel.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Lysmast",
    "sosinvdbnavn" : "Lysmast_181",
    "sorteringsnummer" : 4080
}, {
    "id" : 183,
    "navn" : "Kabelbru/stige",
    "beskrivelse" : "Anordning for framføring av kabler, f.eks. i tunnel.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2014-11-22",
    "veiledning" : "",
    "sosinavn" : "KabelbruStige",
    "sosinvdbnavn" : "KabelbruStige_183",
    "sorteringsnummer" : 4121
}, {
    "id" : 199,
    "navn" : "Trær",
    "beskrivelse" : "Trær er flerårige vedaktige planter som har definert stamme og krone.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Det skal registreres trær som skal ha parklik skjøtsel samt verdifulle trær, andre trær som skal skjøttes skal registreres som \"Naturområde\" (tidl. \"Vegetasjonsområde, spesielt\"). Det anbefales å registreres en forekomst i NVDB per tre. Det har tidligere tildels vært praksis å registrere flere trær sammen. Det åpnes for noe skjønn rundt dette, men som et minimum må alle trær i en gruppe ha tilnærmet identiske egenskaper.",
    "sosinavn" : "Trær",
    "sosinvdbnavn" : "Trær_199",
    "sorteringsnummer" : 5280
}, {
    "id" : 203,
    "navn" : "Utgår_Kumskjerm",
    "beskrivelse" : "Skjerm for å holde skjæringsskråning unna kum",
    "stedfesting" : "PUNKT",
    "veiledning" : "Registreres i senter skjerm",
    "sosinavn" : "Utgår_Kumskjerm",
    "sosinvdbnavn" : "Utgår_Kumskjerm_203",
    "sorteringsnummer" : 0
}, {
    "id" : 208,
    "navn" : "Basseng/Magasin",
    "beskrivelse" : "Innretning for opplagring av vann.  Eksempelvis i tilknytning til tunneler.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "BassengMagasin",
    "sosinvdbnavn" : "BassengMagasin_208",
    "sorteringsnummer" : 6340
}, {
    "id" : 209,
    "navn" : "Hydrant",
    "beskrivelse" : "Objekt som kan brukes til å koble til slangesystemer i forbindelse med brann eller vask av gater/områder",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Hydrant",
    "sosinvdbnavn" : "Hydrant_209",
    "sorteringsnummer" : 6000
}, {
    "id" : 210,
    "navn" : "Pumpestasjon",
    "beskrivelse" : "Sted hvor det er installert en eller flere pumper for å pumpe unna drens-/overvann.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Pumpestasjon",
    "sosinvdbnavn" : "Pumpestasjon_210",
    "sorteringsnummer" : 6280
}, {
    "id" : 212,
    "navn" : "Vifte/Ventilator",
    "beskrivelse" : "Vifte for å ventilere tunneler",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "VifteVentilator",
    "sosinvdbnavn" : "VifteVentilator_212",
    "sorteringsnummer" : 5660
}, {
    "id" : 213,
    "navn" : "Brannslokningsapparat",
    "beskrivelse" : "Apparat for å slokke brann",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Brannslokningsapparat",
    "sosinvdbnavn" : "Brannslokningsapparat_213",
    "sorteringsnummer" : 5980
}, {
    "id" : 214,
    "navn" : "Siktmåler",
    "beskrivelse" : "Utstyr for å måle sikt, særlig aktuelt i tunnel",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Siktmåler",
    "sosinvdbnavn" : "Siktmåler_214",
    "sorteringsnummer" : 6140
}, {
    "id" : 215,
    "navn" : "Gassmåler",
    "beskrivelse" : "Utstyr for å måle gass, særlig aktuelt i tunnel",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Gassmåler",
    "sosinvdbnavn" : "Gassmåler_215",
    "sorteringsnummer" : 6120
}, {
    "id" : 226,
    "navn" : "Bærelag",
    "beskrivelse" : "Det øverste lag i vegfundamentet.  Deles ofte i nedre og øvre (1).",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Definert i HB N200 (018)",
    "sosinavn" : "Bærelag",
    "sosinvdbnavn" : "Bærelag_226",
    "sorteringsnummer" : 4420
}, {
    "id" : 227,
    "navn" : "Forsterkningslag",
    "beskrivelse" : "Lag i vegens overbygning mellom planum og bærelag.  Hovedfunksjonen er å fordele trafikkbelastningen slik at undergrunnen ikke overbelastes (2)",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Forsterkningslag",
    "sosinvdbnavn" : "Forsterkningslag_227",
    "sorteringsnummer" : 4460
}, {
    "id" : 229,
    "navn" : "Frostsikringslag",
    "beskrivelse" : "Den delen av overbygningen som er beregnet på, helt eller delvis, å hindre frosten i å trenge ned i undergrunn eller underbygning",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Frostsikringslag",
    "sosinvdbnavn" : "Frostsikringslag_229",
    "sorteringsnummer" : 4480
}, {
    "id" : 234,
    "navn" : "Voll",
    "beskrivelse" : "Opphøyd terrengformasjon f.eks. anlagt for å skjerme mot vegtrafikkstøy eller skredmasser. Kan være sammensatt av flere lag",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Voll",
    "sosinvdbnavn" : "Voll_234",
    "sorteringsnummer" : 4740
}, {
    "id" : 241,
    "navn" : "Vegdekke",
    "beskrivelse" : "Den øverste del av overbygningen, består vanligvis av et bindlag og et slitelag. (1)",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Vegdekke",
    "sosinvdbnavn" : "Vegdekke_241",
    "sorteringsnummer" : 4400
}, {
    "id" : 243,
    "navn" : "Toalettanlegg",
    "beskrivelse" : "Ett eller flere rom i en bygning med ett eller flere klosett/toalettskåler/pissoarer.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Toalettanlegg",
    "sosinvdbnavn" : "Toalettanlegg_243",
    "sorteringsnummer" : 5400
}, {
    "id" : 269,
    "navn" : "Vegskulder/Vegkant",
    "beskrivelse" : "Vegskulder er kjørbart felt som ligger inntil kjørebanen (1).  I tillegg inkluderer det rom for rekkverk etc",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "VegskulderVegkant",
    "sosinvdbnavn" : "VegskulderVegkant_269",
    "sorteringsnummer" : 0
}, {
    "id" : 270,
    "navn" : "Skråning",
    "beskrivelse" : "Skråflate som er dannet ut fra geologiske prosesser.  Benyttes ikke i forbindelse med fylling og skjæring.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Skråning",
    "sosinvdbnavn" : "Skråning_270",
    "sorteringsnummer" : 0
}, {
    "id" : 273,
    "navn" : "Dyresperre",
    "beskrivelse" : "Anordning for å hindre at dyr kommer inn i tunneler/går gjennom tunneler/går over bruer eller fyllinger i vann etc.",
    "stedfesting" : "PUNKT",
    "veiledning" : "Bør koordinatfestes",
    "sosinavn" : "Dyresperre",
    "sosinvdbnavn" : "Dyresperre_273",
    "sorteringsnummer" : 0
}, {
    "id" : 274,
    "navn" : "Blomsterbeplantning",
    "beskrivelse" : "Blomsterbeplantinger skal fremvise blomsterprakt, form, farge og duft. Det menes her planter som kommer i kategorien stauder, utplantingsplanter, løk, roser og klatreplanter.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Blomsterbeplantning",
    "sosinvdbnavn" : "Blomsterbeplantning_274",
    "sorteringsnummer" : 5240
}, {
    "id" : 276,
    "navn" : "Tilstand/skade, skiltpunkt",
    "beskrivelse" : "Gir informasjon om tilstand og eventuell skade på skiltpunkt",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "TilstandSkadeSkiltpunk",
    "sosinvdbnavn" : "TilstandSkadeSkiltpunk_276",
    "sorteringsnummer" : 0
}, {
    "id" : 277,
    "navn" : "Tilstand/skade, belysning",
    "beskrivelse" : "Gir informasjon om tilstand og eventuell skade på belysning.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "TilstandSkadeBelysning",
    "sosinvdbnavn" : "TilstandSkadeBelysning_277",
    "sorteringsnummer" : 0
}, {
    "id" : 278,
    "navn" : "Ventilasjonsanlegg",
    "beskrivelse" : "Anlegg for å ventilere f.eks tunneler",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Ventilasjonsanlegg",
    "sosinvdbnavn" : "Ventilasjonsanlegg_278",
    "sorteringsnummer" : 5640
}, {
    "id" : 284,
    "navn" : "Tilstand/skade, rekkverk",
    "beskrivelse" : "Gir informasjon om tilstand og eventuell skade på rekkverk.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "TilstandSkadeRekkverk",
    "sosinvdbnavn" : "TilstandSkadeRekkverk_284",
    "sorteringsnummer" : 0
}, {
    "id" : 290,
    "navn" : "Telehiv",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Telehiv",
    "sosinvdbnavn" : "Telehiv_290",
    "sorteringsnummer" : 0
}, {
    "id" : 291,
    "navn" : "Viltfare",
    "beskrivelse" : "Strekninger som er skiltet med viltfare",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Viltfare",
    "sosinvdbnavn" : "Viltfare_291",
    "sorteringsnummer" : 0
}, {
    "id" : 293,
    "navn" : "Breddemåling",
    "beskrivelse" : "Målt bredde gjeldende over en strekning.  Breddemåling må være \"datter\" til annet vegojekt.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Breddemåling",
    "sosinvdbnavn" : "Breddemåling_293",
    "sorteringsnummer" : 0
}, {
    "id" : 294,
    "navn" : "Tilstand/skade, strekning",
    "beskrivelse" : "Gir informasjon om tilstand og eventuell skade.  Normalt knyttet til et spesifikt strekningsobjekt.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "TilstandSkadeStrekning",
    "sosinvdbnavn" : "TilstandSkadeStrekning_294",
    "sorteringsnummer" : 0
}, {
    "id" : 297,
    "navn" : "Kommentar",
    "beskrivelse" : "Vegobjekt beskriver spesielle forhold for det objektet det er knyttet til",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Kommentar",
    "sosinvdbnavn" : "Kommentar_297",
    "sorteringsnummer" : 0
}, {
    "id" : 300,
    "navn" : "Naturområde",
    "beskrivelse" : "Naturlike områder som det skal tas hensyn til og/eller krever en definert form for skjøtsel (se aktuell arbeidsoperasjon + hyppighet). Slike steder kan være spesielle siktsoner, naturtyper, opprettholdelse av skogryddingstiltak, landskapspleieområde m.m.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Naturområde",
    "sosinvdbnavn" : "Naturområde_300",
    "sorteringsnummer" : 0
}, {
    "id" : 301,
    "navn" : "Kantklippareal",
    "beskrivelse" : "Angir område med vegetasjon langs vegkant/skråning.  Dette er vanligvis vegetasjon som skal skjøttes vha kantklipper (kantslått).  Det er mulig å gi bredde i form av tilkopla \"breddemåling\".",
    "stedfesting" : "LINJE",
    "veiledning" : "Her er en breddemåling datter og angir den bredde som skal slåes . NB: Breddemåling må ha mor ( være bredde til et morobjekt )",
    "sosinavn" : "Kantklippareal",
    "sosinvdbnavn" : "Kantklippareal_301",
    "sorteringsnummer" : 0
}, {
    "id" : 302,
    "navn" : "Tilstand/skade, grøft",
    "beskrivelse" : "Gir informasjon om tilstand og eventuell skade på åpen grøft.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "TilstandSkadeGrøft",
    "sosinvdbnavn" : "TilstandSkadeGrøft_302",
    "sorteringsnummer" : 0
}, {
    "id" : 303,
    "navn" : "Undergrunn",
    "beskrivelse" : "Angir hvilken undergrunn vegen hviler på",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Undergrunn",
    "sosinvdbnavn" : "Undergrunn_303",
    "sorteringsnummer" : 4540
}, {
    "id" : 318,
    "navn" : "Snø-/isrydding",
    "beskrivelse" : "Sted/område hvor det er behov for å snø-/isrydding utover det som tas med brøytekjøretøy",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Snø-Isrydding",
    "sosinvdbnavn" : "Snø-Isrydding_318",
    "sorteringsnummer" : 0
}, {
    "id" : 319,
    "navn" : "Kolonnestrekning",
    "beskrivelse" : "Strekning hvor det vanligvis er kolonnekjøring i løpet av en vinter",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Kolonnestrekning",
    "sosinvdbnavn" : "Kolonnestrekning_319",
    "sorteringsnummer" : 0
}, {
    "id" : 335,
    "navn" : "Avstandsmåling",
    "beskrivelse" : "Målt avstand på tvers av vegen mellom gitt referansepunkt og et vegobjekt",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Avstandsmåling",
    "sosinvdbnavn" : "Avstandsmåling_335",
    "sorteringsnummer" : 0
}, {
    "id" : 342,
    "navn" : "Trafikkspeil",
    "beskrivelse" : "Speil satt opp for å bedre siktforholdene v avkjørsler/kryss/busslommer mm.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Trafikkspeil",
    "sosinvdbnavn" : "Trafikkspeil_342",
    "sorteringsnummer" : 3940
}, {
    "id" : 343,
    "navn" : "Stedsnavn",
    "beskrivelse" : "Angir stedsnavn.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Stedsnavn",
    "sosinvdbnavn" : "Stedsnavn_343",
    "sorteringsnummer" : 0
}, {
    "id" : 438,
    "navn" : "Tilstand/skade, skiltplate",
    "beskrivelse" : "Gir informasjon om tilstand og eventuell skade på skiltplate",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "TilstandSkadeSkiltplat",
    "sosinvdbnavn" : "TilstandSkadeSkiltplat_438",
    "sorteringsnummer" : 0
}, {
    "id" : 440,
    "navn" : "Logg, avviksEntry",
    "veiledning" : "",
    "sosinavn" : "LoggAvviksEntry",
    "sosinvdbnavn" : "LoggAvviksEntry_440",
    "sorteringsnummer" : 0
}, {
    "id" : 441,
    "navn" : "Logg, stedsfestingsEndring",
    "veiledning" : "",
    "sosinavn" : "LoggStedsfestingsEndri",
    "sosinvdbnavn" : "LoggStedsfestingsEndri_441",
    "sorteringsnummer" : 0
}, {
    "id" : 442,
    "navn" : "Logg, justering",
    "veiledning" : "",
    "sosinavn" : "LoggJustering",
    "sosinvdbnavn" : "LoggJustering_442",
    "sorteringsnummer" : 0
}, {
    "id" : 443,
    "navn" : "Logg, kjøring",
    "veiledning" : "",
    "sosinavn" : "LoggKjøring",
    "sosinvdbnavn" : "LoggKjøring_443",
    "sorteringsnummer" : 0
}, {
    "id" : 444,
    "navn" : "Feil, logg",
    "beskrivelse" : "Benyttes i forbindelse med datautveksling med VegReg.",
    "veiledning" : "",
    "sosinavn" : "FeilLogg",
    "sosinvdbnavn" : "FeilLogg_444",
    "sorteringsnummer" : 0
}, {
    "id" : 445,
    "navn" : "Skred",
    "beskrivelse" : "Masser som løsner",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Skred",
    "sosinvdbnavn" : "Skred_445",
    "sorteringsnummer" : 0
}, {
    "id" : 446,
    "navn" : "Dokumentasjon",
    "beskrivelse" : "Arkivert informasjon, kan f.eks være bilder, tegninger, tekniske beskrivelser, mm",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Dokumentasjon",
    "sosinvdbnavn" : "Dokumentasjon_446",
    "sorteringsnummer" : 0
}, {
    "id" : 447,
    "navn" : "Tunnelløp uten trafikk",
    "beskrivelse" : "Et tunnelløp hvor det ikke er åpent for ordinær trafikk.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "TunnelløpUtenTrafikk",
    "sosinvdbnavn" : "TunnelløpUtenTrafikk_447",
    "sorteringsnummer" : 5470
}, {
    "id" : 448,
    "navn" : "Tunnelsjakt",
    "beskrivelse" : "Synk eller stigort, vertikalt eller sterkt skrånende rom i berg med stor utstrekning i lengdeaksen (Prosesskode-1)",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Tunnelsjakt",
    "sosinvdbnavn" : "Tunnelsjakt_448",
    "sorteringsnummer" : 0
}, {
    "id" : 449,
    "navn" : "Luminansmåling",
    "beskrivelse" : "Angir målt luminans for en strekning.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Luminansmåling",
    "sosinvdbnavn" : "Luminansmåling_449",
    "sorteringsnummer" : 0
}, {
    "id" : 450,
    "navn" : "Breddeutvidelse, kryss",
    "beskrivelse" : "Breddeutvidelse på høyre side av vegen (sett i kjøreretning) i T-kryss for at trafikken skal kunne passere kjøretøy som venter på å få svinge til venstre.  Benevnes også \"passeringslomme\".",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2015-10-06",
    "veiledning" : "Utvidelse ( hs ) i kryss uten venstresvingefelt er breddeutvidelse. Dersom vegkant er merket tvers gjennom, er det lomme",
    "sosinavn" : "BreddeutvidelseKryss",
    "sosinvdbnavn" : "BreddeutvidelseKryss_450",
    "sorteringsnummer" : 3115
}, {
    "id" : 451,
    "navn" : "Sykkelparkering",
    "beskrivelse" : "Angir område tilrettelagt for sykkelparkering",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Holdeplassutrustning kan være  øverste morobjekt",
    "sosinavn" : "Sykkelparkering",
    "sosinvdbnavn" : "Sykkelparkering_451",
    "sorteringsnummer" : 3720
}, {
    "id" : 452,
    "navn" : "Undergang",
    "beskrivelse" : "Passasje for trafikk av ulik art (kjørende, gående, dyr) under bru eller mindre bygning.  Se også Tunnelløp og Høydegrensning",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Undergang",
    "sosinvdbnavn" : "Undergang_452",
    "sorteringsnummer" : 0
}, {
    "id" : 453,
    "navn" : "Elektrostatisk rensesløyfe",
    "beskrivelse" : "Anlegg for luftrensing i tunnel (uoff)",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "ElektrostatiskRenseslø",
    "sosinvdbnavn" : "ElektrostatiskRenseslø_453",
    "sorteringsnummer" : 6100
}, {
    "id" : 456,
    "navn" : "Styreapparat",
    "beskrivelse" : "Apparatur i tilknytning til teknisk utstyr.  Apparatur står vanligvis i skap.  Inneholder f.eks PLS, modem, batteri/strøm, telefon med mer.  Benyttes f.eks i tilknytning til signalanlegg.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Styreapparat",
    "sosinvdbnavn" : "Styreapparat_456",
    "sorteringsnummer" : 4200
}, {
    "id" : 458,
    "navn" : "Fotocelle",
    "beskrivelse" : "Utstyr for å registrere bevegelse (uoff)",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Fotocelle",
    "sosinvdbnavn" : "Fotocelle_458",
    "sorteringsnummer" : 6200
}, {
    "id" : 459,
    "navn" : "Lysmåler",
    "beskrivelse" : "Utstyr for å måle lys (uoff)",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2015-03-17",
    "veiledning" : "",
    "sosinavn" : "Lysmåler",
    "sosinvdbnavn" : "Lysmåler_459",
    "sorteringsnummer" : 5710
}, {
    "id" : 460,
    "navn" : "Kondensmåler",
    "beskrivelse" : "Utstyr for å registrere kondens/fuktighet",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Kondensmåler",
    "sosinvdbnavn" : "Kondensmåler_460",
    "sorteringsnummer" : 5720
}, {
    "id" : 461,
    "navn" : "Elektrisk anlegg",
    "beskrivelse" : "Matepunkt med måler for lavspentnett som forsyner vegvesenets installasjoner med strøm.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "ElektriskAnlegg",
    "sosinvdbnavn" : "ElektriskAnlegg_461",
    "sorteringsnummer" : 4160
}, {
    "id" : 462,
    "navn" : "Høydemåler",
    "beskrivelse" : "Utstyr for å måle høyde (uoff)",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Høydemåler",
    "sosinvdbnavn" : "Høydemåler_462",
    "sorteringsnummer" : 6180
}, {
    "id" : 463,
    "navn" : "Temperaturmåler",
    "beskrivelse" : "Utstyr for å måle temperatur (uoff)",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Temperaturmåler",
    "sosinvdbnavn" : "Temperaturmåler_463",
    "sorteringsnummer" : 5700
}, {
    "id" : 464,
    "navn" : "Vannstandsmåler",
    "beskrivelse" : "Utstyr for å måle vannstand f.eks i pumpesump (uoff)",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Vannstandsmåler",
    "sosinvdbnavn" : "Vannstandsmåler_464",
    "sorteringsnummer" : 6320
}, {
    "id" : 465,
    "navn" : "Utgår_Matepunkt",
    "beskrivelse" : "Punkt for strømfordeling",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Utgår_Matepunkt",
    "sosinvdbnavn" : "Utgår_Matepunkt_465",
    "sorteringsnummer" : 4180
}, {
    "id" : 466,
    "navn" : "Trafo",
    "beskrivelse" : "Transformerer vekselstrøm fra et spenningsnivå til et annet",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Trafo",
    "sosinvdbnavn" : "Trafo_466",
    "sorteringsnummer" : 6220
}, {
    "id" : 467,
    "navn" : "Nødstrømsaggregat",
    "beskrivelse" : "Aggregat for å produsere elektrisk strøm",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Nødstrømsaggregat",
    "sosinvdbnavn" : "Nødstrømsaggregat_467",
    "sorteringsnummer" : 6240
}, {
    "id" : 468,
    "navn" : "UPS",
    "beskrivelse" : "Reservestrømskilde bla i forbindelse med tunneler",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "UPS",
    "sosinvdbnavn" : "UPS_468",
    "sorteringsnummer" : 6260
}, {
    "id" : 470,
    "navn" : "Antenne",
    "beskrivelse" : "Ledning eller system av ledninger som en bruker til å sende ut eller ta imot elektromagnetiske bølger med (5).  I tilknytning til vegtrafikk benyttes f.eks radio- og mobiltelefonantenner i tunneler.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Antenne",
    "sosinvdbnavn" : "Antenne_470",
    "sorteringsnummer" : 5780
}, {
    "id" : 471,
    "navn" : "Mobiltelefonsamband",
    "beskrivelse" : "System for innhenting og videreformidling av mobiltelefonsignal feks i tunnel (uoff)",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Mobiltelefonsamband",
    "sosinvdbnavn" : "Mobiltelefonsamband_471",
    "sorteringsnummer" : 5840
}, {
    "id" : 472,
    "navn" : "Radioanlegg",
    "beskrivelse" : "System for innhenting og videreformidling av radiosignal feks i tunnel (uoff)",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Radioanlegg",
    "sosinvdbnavn" : "Radioanlegg_472",
    "sorteringsnummer" : 5820
}, {
    "id" : 473,
    "navn" : "Telefonsentral",
    "beskrivelse" : "System for innhenting og videreformidling av telesignal feks i tunnel (uoff)",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Telefonsentral",
    "sosinvdbnavn" : "Telefonsentral_473",
    "sorteringsnummer" : 5880
}, {
    "id" : 474,
    "navn" : "Brannslokkingsanlegg",
    "beskrivelse" : "System for automatisk brannslokking.  Vanligvis sprinkleranlegg",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Brannslokkingsanlegg",
    "sosinvdbnavn" : "Brannslokkingsanlegg_474",
    "sorteringsnummer" : 5940
}, {
    "id" : 475,
    "navn" : "Brannvarslingsanlegg",
    "beskrivelse" : "System for automatisk varsling av brann.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Brannvarslingsanlegg",
    "sosinvdbnavn" : "Brannvarslingsanlegg_475",
    "sorteringsnummer" : 5920
}, {
    "id" : 478,
    "navn" : "Branndetektor",
    "beskrivelse" : "Utstyr til å registrere tilløp til brann",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Branndetektor",
    "sosinvdbnavn" : "Branndetektor_478",
    "sorteringsnummer" : 5960
}, {
    "id" : 479,
    "navn" : "Nødutgangsskilt",
    "beskrivelse" : "Skilt med informasjon om nødutgang (uoff)",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Nødutgangsskilt",
    "sosinvdbnavn" : "Nødutgangsskilt_479",
    "sorteringsnummer" : 5900
}, {
    "id" : 481,
    "navn" : "Tennpunkt",
    "beskrivelse" : "Utstyr for tenning av belysning",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Tennpunkt",
    "sosinvdbnavn" : "Tennpunkt_481",
    "sorteringsnummer" : 4140
}, {
    "id" : 482,
    "navn" : "Trafikkregistreringsstasjon",
    "beskrivelse" : "Angir punkt for registrering av trafikkdata",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-06-21",
    "veiledning" : "",
    "sosinavn" : "Trafikkregistreringsst",
    "sosinvdbnavn" : "Trafikkregistreringsst_482",
    "sorteringsnummer" : 6070
}, {
    "id" : 483,
    "navn" : "Radar",
    "beskrivelse" : "Instrument for å registrere fart",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Radar",
    "sosinvdbnavn" : "Radar_483",
    "sorteringsnummer" : 0
}, {
    "id" : 485,
    "navn" : "Vegstengning",
    "beskrivelse" : "Informasjon om periodevis stengning av veg.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Vegstengning",
    "sosinvdbnavn" : "Vegstengning_485",
    "sorteringsnummer" : 0
}, {
    "id" : 487,
    "navn" : "Holdeplassutrustning",
    "beskrivelse" : "Sted for på og avstigning av kollektivtrafikk.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2017-02-22",
    "veiledning" : "",
    "sosinavn" : "Holdeplassutrustning",
    "sosinvdbnavn" : "Holdeplassutrustning_487",
    "sorteringsnummer" : 0
}, {
    "id" : 498,
    "navn" : "Viltskremmere/varslere",
    "beskrivelse" : "Strekninger som har permanente eller midlertidige tiltak for å skremme vilt unna vegbanen samt tiltak som varsler bilfører om vilt i nærheten av vegen.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "ViltskremmereVarslere",
    "sosinvdbnavn" : "ViltskremmereVarslere_498",
    "sorteringsnummer" : 0
}, {
    "id" : 500,
    "navn" : "Nødstasjon",
    "beskrivelse" : "Sted hvor det er plassert utstyr til bruk i nødsituasjoner, f.eks. brannslokker, nødtelefon etc. I henhold til Tunnelsikkerhetsforskriften skal en nødstasjon minimum være utstyrt med en nødtelefon og to brannslokningsapparater. Utstyr som er plassert utenfor kiosk, men nærmere kiosken enn 20 m, skal regnes som del av samme nødstasjon som kiosken.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Nødstasjon",
    "sosinvdbnavn" : "Nødstasjon_500",
    "sorteringsnummer" : 6020
}, {
    "id" : 502,
    "navn" : "Skap, teknisk",
    "beskrivelse" : "Skap for oppbevaring/installasjon av utstyr.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "SkapTeknisk",
    "sosinvdbnavn" : "SkapTeknisk_502",
    "sorteringsnummer" : 5800
}, {
    "id" : 503,
    "navn" : "Sideareal tunnel",
    "beskrivelse" : "Område fra ytre skulder (kantstein) til tunnelvegg.  Kan også benevnes opphøyd bankett.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "SidearealTunnel",
    "sosinvdbnavn" : "SidearealTunnel_503",
    "sorteringsnummer" : 5540
}, {
    "id" : 504,
    "navn" : "Kryssingsmulighet/Åpning",
    "beskrivelse" : "Angir punkt der det er mulig å krysse/bevege seg gjennom et fysisk hinder.  Eksempelvis kan dette være åpning i et rekkverk, sted hvor en midtdeler kan krysses, mm",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "KryssingsmulighetÅpnin",
    "sosinvdbnavn" : "KryssingsmulighetÅpnin_504",
    "sorteringsnummer" : 0
}, {
    "id" : 507,
    "navn" : "Tilstand/skade FU, strekning",
    "beskrivelse" : "Gir informasjon om funksjonalitet.  Normalt knyttet til et spesifikt strekningsobjekt.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "TilstandSkadeFUStrekni",
    "sosinvdbnavn" : "TilstandSkadeFUStrekni_507",
    "sorteringsnummer" : 0
}, {
    "id" : 508,
    "navn" : "Grøntanlegg",
    "beskrivelse" : "En gruppering av \"grøntelementer\".  En del planter, busker trær kan være fornuftig å gruppere sammen.  Dette kan være pga at de ligger samlet og sammen utgjør en større helhet.  Det kan i tillegg være driftsmessige årsaker til grupperingen.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Grøntanlegg",
    "sosinvdbnavn" : "Grøntanlegg_508",
    "sorteringsnummer" : 0
}, {
    "id" : 511,
    "navn" : "Busker",
    "beskrivelse" : "Det menes her flerårige planter med forvedet overjordsstamme som grener seg fra grunnen, og ikke har tydelig stamme med krone. Busker er normalt lavere enn 5 meter. Omfatter et stort antall slekter, arter og kultivarer/sorter.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Busker",
    "sosinvdbnavn" : "Busker_511",
    "sorteringsnummer" : 5260
}, {
    "id" : 517,
    "navn" : "Artsrik vegkant",
    "beskrivelse" : "Det kan her legges inn områder som har høy biologisk verdi.  Dette vil være nyttig å ta hensyn til ved skjøtsel av vegens sideområde.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "ArtsrikVegkant",
    "sosinvdbnavn" : "ArtsrikVegkant_517",
    "sorteringsnummer" : 0
}, {
    "id" : 518,
    "navn" : "Siktsone",
    "beskrivelse" : "Siktsone er et areal som krever tiltak for å tilfredsstille siktkrav som ikke tilfredsstilles av kantklipp.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Siktsone",
    "sosinvdbnavn" : "Siktsone_518",
    "sorteringsnummer" : 3150
}, {
    "id" : 519,
    "navn" : "Vegoppmerking, tverrgående",
    "beskrivelse" : "Vegoppmerking som ikke har nevneverdig langsgående utstrekning.  Eks symbol, sperreområder, piler, tekst, gangfelt og annen tverrgående oppmerking.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "VegoppmerkingTverrgåen",
    "sosinvdbnavn" : "VegoppmerkingTverrgåen_519",
    "sorteringsnummer" : 3700
}, {
    "id" : 521,
    "navn" : "Dekketilstandsmåling",
    "beskrivelse" : "Inneholder data som er felles for et sett spor- og jevnhetsmålinger (enkeltmålinger) og for avleda spor- og jevnhetsmålinger (20-metersstrekninger) som er beregnet ut fra samme måleserie (rådatafil).",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Dekketilstandsmåling",
    "sosinvdbnavn" : "Dekketilstandsmåling_521",
    "sorteringsnummer" : 0
}, {
    "id" : 522,
    "navn" : "Spormåling",
    "beskrivelse" : "Foreløpig kun til testformål. En enkeltspormåling (17 høydemålinger) i et profil.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Spormåling",
    "sosinvdbnavn" : "Spormåling_522",
    "sorteringsnummer" : 0
}, {
    "id" : 523,
    "navn" : "Jevnhets-/teksturmåling",
    "beskrivelse" : "Foreløpig kun til testformål. En enkelt jevnhets-/teksturmåling i et profil",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Jevnhets-Teksturmåling",
    "sosinvdbnavn" : "Jevnhets-Teksturmåling_523",
    "sorteringsnummer" : 0
}, {
    "id" : 524,
    "navn" : "Spormåling (avleda pr 20 m)",
    "beskrivelse" : "Resulterende spormåling for en 20-metersstrekning",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Spormåling_avledaPr20M",
    "sosinvdbnavn" : "Spormåling_avledaPr20M_524",
    "sorteringsnummer" : 0
}, {
    "id" : 525,
    "navn" : "Jevnhetsmåling (avleda pr 20 m)",
    "beskrivelse" : "Resulterende jevnhetsmåling for en 20-metersstrekning",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Jevnhetsmåling_avledaP",
    "sosinvdbnavn" : "Jevnhetsmåling_avledaP_525",
    "sorteringsnummer" : 0
}, {
    "id" : 526,
    "navn" : "Friksjonsmåling",
    "beskrivelse" : "Måling av vegoverflatens friksjon",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Friksjonsmåling",
    "sosinvdbnavn" : "Friksjonsmåling_526",
    "sorteringsnummer" : 0
}, {
    "id" : 527,
    "navn" : "Trafikanttilbud",
    "beskrivelse" : "Angir sted/område hvor det er en eller flere tilbud til trafikantene.  Dette kan f.eks være bensinstasjon, verksted, tømmeanlegg for bobil osv.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Trafikanttilbud",
    "sosinvdbnavn" : "Trafikanttilbud_527",
    "sorteringsnummer" : 0
}, {
    "id" : 528,
    "navn" : "Tverrprofil",
    "beskrivelse" : "Snitt av veg vinkelrett på vegens midtlinje",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Tverrprofil",
    "sosinvdbnavn" : "Tverrprofil_528",
    "sorteringsnummer" : 0
}, {
    "id" : 529,
    "navn" : "Tilstand/skade, skulder/kant",
    "beskrivelse" : "Angir tilstand/skade knyttet til vegens skulder/vegkant.  Dette er særlig med tanke på tilgroing oppsamling av løsmasse.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "TilstandSkadeSkulderKa",
    "sosinvdbnavn" : "TilstandSkadeSkulderKa_529",
    "sorteringsnummer" : 0
}, {
    "id" : 532,
    "navn" : "Vegreferanse",
    "beskrivelse" : "Veg, hp, meter-fra/til Etc (Lovlig del av vegnettet)",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Vegreferanse",
    "sosinvdbnavn" : "Vegreferanse_532",
    "sorteringsnummer" : 0
}, {
    "id" : 534,
    "navn" : "Region",
    "beskrivelse" : "Region ihht Statens vegvesens nye regioninndeling",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Region",
    "sosinvdbnavn" : "Region_534",
    "sorteringsnummer" : 0
}, {
    "id" : 535,
    "navn" : "Fylke",
    "beskrivelse" : "Fylke",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Fylke",
    "sosinvdbnavn" : "Fylke_535",
    "sorteringsnummer" : 0
}, {
    "id" : 536,
    "navn" : "Kommune",
    "beskrivelse" : "Kommune",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Kommune",
    "sosinvdbnavn" : "Kommune_536",
    "sorteringsnummer" : 0
}, {
    "id" : 537,
    "navn" : "Vegavdeling",
    "beskrivelse" : "Område i henhold til Statens vegvesens inndeling i fylkes/lokalavdelinger (uoff).",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Vegavdeling",
    "sosinvdbnavn" : "Vegavdeling_537",
    "sorteringsnummer" : 0
}, {
    "id" : 538,
    "navn" : "Gate",
    "beskrivelse" : "Sammensatt identifikator for veglenkeadresse. Merknad: Komplett vegadresse består i tillegg av husnummer og bokstav.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Gate",
    "sosinvdbnavn" : "Gate_538",
    "sorteringsnummer" : 0
}, {
    "id" : 539,
    "navn" : "Transportlenke",
    "beskrivelse" : "Representerer et objekt ved utskrift til EL-veg",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Transportlenke",
    "sosinvdbnavn" : "Transportlenke_539",
    "sorteringsnummer" : 0
}, {
    "id" : 540,
    "navn" : "Trafikkmengde",
    "beskrivelse" : "Gir informasjon om representativ trafikkmengde for en strekning",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Trafikkmengde",
    "sosinvdbnavn" : "Trafikkmengde_540",
    "sorteringsnummer" : 0
}, {
    "id" : 541,
    "navn" : "Vegstandard",
    "beskrivelse" : "Angir standard på vegstrekning",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Vegstandard",
    "sosinvdbnavn" : "Vegstandard_541",
    "sorteringsnummer" : 0
}, {
    "id" : 542,
    "navn" : "Støtpute",
    "beskrivelse" : "En energiabsorberende sikkerhetskonstruksjon som over kort avstand skal bremse et kjøretøy ved frontkollisjon eller sidekollisjon, eller lede det forbi faremomentet. Kilde: Rekkverksnormal.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "Rekkverk har støtpute som mor og stedfestes som punkt start/slutt rekkverk.Der det ikke er støtputer har vi en punktdefinisjon = rekkverksende ( et teoretisk punkt med start rekkverksstart )",
    "sosinavn" : "Støtpute",
    "sosinvdbnavn" : "Støtpute_542",
    "sorteringsnummer" : 3603
}, {
    "id" : 543,
    "navn" : "Rekkverksskjøt",
    "beskrivelse" : "Betegnelse på skjøter mellom rekkverk eller rekkverkskomponenter på bru som ikke er konstruert for å oppta bevegelser fra temperatur, svinn etc. Skjøtene kan være utført med en viss dilatasjon/slakk for å lette montasjen og for å begrense strekkraften som kan oppstå i komponentene ved store utbøyninger. Kilde: Rekkverksnormal.",
    "stedfesting" : "PUNKT",
    "veiledning" : "Har rekkverk som mor. Registreres med pkt der det faste i skjøten avsluttes ( område for gliding begynner )",
    "sosinavn" : "Rekkverksskjøt",
    "sosinvdbnavn" : "Rekkverksskjøt_543",
    "sorteringsnummer" : 0
}, {
    "id" : 562,
    "navn" : "Testobjekttype",
    "beskrivelse" : "Denne objekttypen benyttes ifbm testing av NVDB",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Testobjekttype",
    "sosinvdbnavn" : "Testobjekttype_562",
    "sorteringsnummer" : 0
}, {
    "id" : 570,
    "navn" : "Trafikkulykke",
    "beskrivelse" : "Informasjon om ulykkessted, værforhold, skadeomfang mm. Gjelder primært ulykker med personskader",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Trafikkulykke",
    "sosinvdbnavn" : "Trafikkulykke_570",
    "sorteringsnummer" : 0
}, {
    "id" : 571,
    "navn" : "Ulykkesinvolvert enhet",
    "beskrivelse" : "Enheter involvert i ulykken. En fotgjenger regnes også som en enhet. Se kjøretøytype",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "UlykkesinvolvertEnhet",
    "sosinvdbnavn" : "UlykkesinvolvertEnhet_571",
    "sorteringsnummer" : 0
}, {
    "id" : 572,
    "navn" : "Ulykkesinvolvert person",
    "beskrivelse" : "Personer involvert i trafikkulykke.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "UlykkesinvolvertPerson",
    "sosinvdbnavn" : "UlykkesinvolvertPerson_572",
    "sorteringsnummer" : 0
}, {
    "id" : 573,
    "navn" : "Svingerestriksjon",
    "beskrivelse" : "Angir svingerestriksjon",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Svingerestriksjon",
    "sosinvdbnavn" : "Svingerestriksjon_573",
    "sorteringsnummer" : 0
}, {
    "id" : 574,
    "navn" : "Grunnkrets",
    "beskrivelse" : "Grunnkrets",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Grunnkrets",
    "sosinvdbnavn" : "Grunnkrets_574",
    "sorteringsnummer" : 0
}, {
    "id" : 575,
    "navn" : "Fysisk tiltak",
    "beskrivelse" : "Angir hvor det har vært et fysisk tiltak på vegen som medfører I-status.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "FysiskTiltak",
    "sosinvdbnavn" : "FysiskTiltak_575",
    "sorteringsnummer" : 0
}, {
    "id" : 576,
    "navn" : "Standardklasse",
    "beskrivelse" : "Angir hvilken standardklasse vegen tilhører",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Standardklasse",
    "sosinvdbnavn" : "Standardklasse_576",
    "sorteringsnummer" : 0
}, {
    "id" : 577,
    "navn" : "Vegfunksjon",
    "beskrivelse" : "Angir vegfunksjon",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Vegfunksjon",
    "sosinvdbnavn" : "Vegfunksjon_577",
    "sorteringsnummer" : 0
}, {
    "id" : 578,
    "navn" : "Lensmannsdistrikt",
    "beskrivelse" : "Definerer lensmannsdistrikt",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Lensmannsdistrikt",
    "sosinvdbnavn" : "Lensmannsdistrikt_578",
    "sorteringsnummer" : 0
}, {
    "id" : 579,
    "navn" : "Politidistrikt",
    "beskrivelse" : "Definerer politidistrikt",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Politidistrikt",
    "sosinvdbnavn" : "Politidistrikt_579",
    "sorteringsnummer" : 0
}, {
    "id" : 580,
    "navn" : "Kontraktsområde",
    "beskrivelse" : "Kontrakt/avtale om drift/vedlikehold relatert til bestemte veger innenfor et avgrensa område",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Kontraktsområde",
    "sosinvdbnavn" : "Kontraktsområde_580",
    "sorteringsnummer" : 0
}, {
    "id" : 581,
    "navn" : "Tunnel",
    "beskrivelse" : "Sted hvor veg passerer gjennom jord/fjell eller under større lokk.  Består av ett eller flere tunnelløp.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Tunnel",
    "sosinvdbnavn" : "Tunnel_581",
    "sorteringsnummer" : 5440
}, {
    "id" : 583,
    "navn" : "Vegbredde",
    "beskrivelse" : "Strekning som har enhelig bredde på vegen. Inneholder bredde på dekke, kjørebane og total vegbredde",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Vegbredde",
    "sosinvdbnavn" : "Vegbredde_583",
    "sorteringsnummer" : 0
}, {
    "id" : 591,
    "navn" : "Høydebegrensning",
    "beskrivelse" : "Strekning i vegnettet hvor kjøretøy kan komme i konflikt med overliggende hinder",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2016-02-16",
    "veiledning" : "Det skal normalt defineres en Høydebegrensning pr. atskilt del av vegbanen (dvs at på strekninger med fysisk midtdeler og ved atskilte tunnelløp må det defineres en høydebegrensning for hver side/hvert løp.  Feltangivelse skiller disse fra hverandre.",
    "sosinavn" : "Høydebegrensning",
    "sosinvdbnavn" : "Høydebegrensning_591",
    "sorteringsnummer" : 5410
}, {
    "id" : 592,
    "navn" : "Nedbøyningsmåling",
    "beskrivelse" : "Måling av hvor mye vegen gir etter ved belastning med fallodd etc.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Nedbøyningsmåling",
    "sosinvdbnavn" : "Nedbøyningsmåling_592",
    "sorteringsnummer" : 0
}, {
    "id" : 594,
    "navn" : "Støy-luft, Bygning",
    "beskrivelse" : "VSTØY/VLUFT inndata og resultatdata i tilknytning til en bygning/enhet.  Kan også være uteområde etc.  Tidligere register 29-Bygning i VDB",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Støy-luftBygning",
    "sosinvdbnavn" : "Støy-luftBygning_594",
    "sorteringsnummer" : 0
}, {
    "id" : 595,
    "navn" : "Motorveg",
    "beskrivelse" : "Strekninger som har vedtatt status motorveg.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Motorveg",
    "sosinvdbnavn" : "Motorveg_595",
    "sorteringsnummer" : 0
}, {
    "id" : 596,
    "navn" : "Forkjørsveg",
    "beskrivelse" : "Strekninger som har vedtatt status forkjørsveg.  Tidligere register 38-Forkjørsveg i VDB",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Forkjørsveg",
    "sosinvdbnavn" : "Forkjørsveg_596",
    "sorteringsnummer" : 0
}, {
    "id" : 597,
    "navn" : "Støy-luft, Strekningsdata",
    "beskrivelse" : "VSTØY/VLUFT inndata og resultatdata knyttet til en vegstrekning.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Støy-luftStrekningsdat",
    "sosinvdbnavn" : "Støy-luftStrekningsdat_597",
    "sorteringsnummer" : 0
}, {
    "id" : 598,
    "navn" : "Landskapsbelastning",
    "beskrivelse" : "Landskapsbelastning.  Tidligere register 42- Landskap i VDB",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Landskapsbelastning",
    "sosinvdbnavn" : "Landskapsbelastning_598",
    "sorteringsnummer" : 0
}, {
    "id" : 599,
    "navn" : "Landskapsproblemnivå",
    "beskrivelse" : "Landskapsproblemnivå.  Tidligere register 42-Landskap i VDB",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Landskapsproblemnivå",
    "sosinvdbnavn" : "Landskapsproblemnivå_599",
    "sorteringsnummer" : 0
}, {
    "id" : 600,
    "navn" : "Landskapsverdi",
    "beskrivelse" : "Landskapsverdi.  Tidligere register 42-Landskap i VDB",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Landskapsverdi",
    "sosinvdbnavn" : "Landskapsverdi_600",
    "sorteringsnummer" : 0
}, {
    "id" : 601,
    "navn" : "Oppgravingsdata",
    "beskrivelse" : "Gir informasjon om oppgraving.  Tidligere register 16 i VDB",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Oppgravingsdata",
    "sosinvdbnavn" : "Oppgravingsdata_601",
    "sorteringsnummer" : 0
}, {
    "id" : 602,
    "navn" : "Oppgravingslag",
    "beskrivelse" : "Gir informasjon om hvert lag i en oppgraving.  Tidligere register 16 i VDB",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Oppgravingslag",
    "sosinvdbnavn" : "Oppgravingslag_602",
    "sorteringsnummer" : 0
}, {
    "id" : 603,
    "navn" : "PMS-parsell",
    "beskrivelse" : "Gir utstrekning av PMS-parsell.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "PMS-parsell",
    "sosinvdbnavn" : "PMS-parsell_603",
    "sorteringsnummer" : 0
}, {
    "id" : 604,
    "navn" : "Vegnormalstrekning",
    "beskrivelse" : "En vegstrekning med krav til ulike parametre som gir definerte enhetlige vegnormalstrekninger. Tidligere register 40-Vegnormal i VDB. Tilstandsanalyse ( TAV )",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Vegnormalstrekning",
    "sosinvdbnavn" : "Vegnormalstrekning_604",
    "sorteringsnummer" : 0
}, {
    "id" : 605,
    "navn" : "Værrelatert strekning",
    "beskrivelse" : "Gir informasjon om hvilken værstasjon (tilhørende DNMI) gitt strekning er knyttet til.  Tidligere register 33 Målestasjon i VDB",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "VærrelatertStrekning",
    "sosinvdbnavn" : "VærrelatertStrekning_605",
    "sorteringsnummer" : 0
}, {
    "id" : 606,
    "navn" : "Innkjøring forbudt",
    "beskrivelse" : "Angir innkjøring forbudt",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "InnkjøringForbudt",
    "sosinvdbnavn" : "InnkjøringForbudt_606",
    "sorteringsnummer" : 0
}, {
    "id" : 607,
    "navn" : "Vegsperring",
    "beskrivelse" : "Angir at veg er fysisk sperret.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Vegsperring",
    "sosinvdbnavn" : "Vegsperring_607",
    "sorteringsnummer" : 0
}, {
    "id" : 608,
    "navn" : "Entreprenør",
    "beskrivelse" : "Firma benyttet i forbindelse med dekkelegging eller oppbygging av vegkonstruksjonen.",
    "veiledning" : "",
    "sosinavn" : "Entreprenør",
    "sosinvdbnavn" : "Entreprenør_608",
    "sorteringsnummer" : 0
}, {
    "id" : 609,
    "navn" : "Armeringsnett",
    "beskrivelse" : "Benyttes særlig i forbindelse med asfaltdekker.  Forhindrer oppsprekking etc.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Armeringsnett",
    "sosinvdbnavn" : "Armeringsnett_609",
    "sorteringsnummer" : 4520
}, {
    "id" : 610,
    "navn" : "Høydevarsler",
    "beskrivelse" : "Utstyr som henger over kjørebanen for å varsle om største tillatte høyde.  Kjøretøy som er høyere enn denne høyden vil dunke oppi denne innretningen.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Høydevarsler",
    "sosinvdbnavn" : "Høydevarsler_610",
    "sorteringsnummer" : 6190
}, {
    "id" : 611,
    "navn" : "Stedsinformasjon",
    "beskrivelse" : "Gir informasjon om sted langs vegnettet",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Stedsinformasjon",
    "sosinvdbnavn" : "Stedsinformasjon_611",
    "sorteringsnummer" : 0
}, {
    "id" : 613,
    "navn" : "Filterlag",
    "beskrivelse" : "Lag av filtermateriale, normalt nederste lag i overbygningen mellom planum og forsterkningslaget (018)",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Filterlag",
    "sosinvdbnavn" : "Filterlag_613",
    "sorteringsnummer" : 0
}, {
    "id" : 614,
    "navn" : "Vegdekke, fresing",
    "beskrivelse" : "Vedlikeholdstiltak for vegdekke, type fresing av vegdekke",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "VegdekkeFresing",
    "sosinvdbnavn" : "VegdekkeFresing_614",
    "sorteringsnummer" : 0
}, {
    "id" : 615,
    "navn" : "Vegflate",
    "beskrivelse" : "Foreløpig kun til testformål. Generell flate som er del av vegens geometriske beskrivelse",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Vegflate",
    "sosinvdbnavn" : "Vegflate_615",
    "sorteringsnummer" : 0
}, {
    "id" : 616,
    "navn" : "Feltstrekning",
    "beskrivelse" : "Strekning med enhetlig feltinndeling.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Feltstrekning",
    "sosinvdbnavn" : "Feltstrekning_616",
    "sorteringsnummer" : 0
}, {
    "id" : 618,
    "navn" : "Oppdrag, fagdata",
    "beskrivelse" : "Ett sett med oppgaver som skal gjøres med et utvalg av fagdata for en gitt strekning",
    "veiledning" : "",
    "sosinavn" : "OppdragFagdata",
    "sosinvdbnavn" : "OppdragFagdata_618",
    "sorteringsnummer" : 0
}, {
    "id" : 619,
    "navn" : "Oppdrag, vegnett",
    "beskrivelse" : "Et sett med oppgaver som skal gjøres med et utvalg av vegnettet.",
    "veiledning" : "",
    "sosinavn" : "OppdragVegnett",
    "sosinvdbnavn" : "OppdragVegnett_619",
    "sorteringsnummer" : 0
}, {
    "id" : 620,
    "navn" : "Oppgave, fagdata",
    "beskrivelse" : "Enkeltoppgave i forbindelse med redigering av fagdata",
    "veiledning" : "",
    "sosinavn" : "OppgaveFagdata",
    "sosinvdbnavn" : "OppgaveFagdata_620",
    "sorteringsnummer" : 0
}, {
    "id" : 621,
    "navn" : "Oppgave, vegnett",
    "beskrivelse" : "Enkeltoppgave i forbindelse med redigering av vegnettet",
    "veiledning" : "",
    "sosinavn" : "OppgaveVegnett",
    "sosinvdbnavn" : "OppgaveVegnett_621",
    "sorteringsnummer" : 0
}, {
    "id" : 622,
    "navn" : "SOSI-bestilling",
    "veiledning" : "",
    "sosinavn" : "SOSI-bestilling",
    "sosinvdbnavn" : "SOSI-bestilling_622",
    "sorteringsnummer" : 0
}, {
    "id" : 623,
    "navn" : "Stativ for turistinfo",
    "beskrivelse" : "Konstruksjon beregnet for oppsetting av informasjon til trafikkanter, eksempelvis informasjon rettet mot turister. Disse er normalt lokalisert til vegens sideanlegg som f.eks rasteplasser eller lommer, og det er forutsatt at trafikkant står i ro ved lesing av informajson. Informasjonstavler som oppfyller krav til  skiltnummer 560 (Håndbok N300, del 3) skal registreres som skiltpunkt/skiltplate.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "StativForTuristinfo",
    "sosinvdbnavn" : "StativForTuristinfo_623",
    "sorteringsnummer" : 5360
}, {
    "id" : 624,
    "navn" : "Fartstavle",
    "beskrivelse" : "Tavle som viser fart til kjøretøy som passerer",
    "stedfesting" : "PUNKT",
    "veiledning" : "Portalens skiltpunkt legges til h.s. Enkelte portaler kan dekke hovedveg og avkjøringer ( ramper osv )",
    "sosinavn" : "Fartstavle",
    "sosinvdbnavn" : "Fartstavle_624",
    "sorteringsnummer" : 0
}, {
    "id" : 625,
    "navn" : "Skredmagasin",
    "beskrivelse" : "Magasin for å fange opp skredmasser",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2014-11-22",
    "veiledning" : "",
    "sosinavn" : "Skredmagasin",
    "sosinvdbnavn" : "Skredmagasin_625",
    "sorteringsnummer" : 4769
}, {
    "id" : 626,
    "navn" : "Friksjonsmåleserie",
    "beskrivelse" : "Gir felles data til serie med målinger",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Friksjonsmåleserie",
    "sosinvdbnavn" : "Friksjonsmåleserie_626",
    "sorteringsnummer" : 0
}, {
    "id" : 627,
    "navn" : "Referansepunkt",
    "beskrivelse" : "Punkt på vegen som benyttes som referanse i vegnettet",
    "stedfesting" : "PUNKT",
    "veiledning" : "Referanser for stolper skal innmåles i referanselinja for veg. Stolper  kan også innmåles. Skal brukes til et eget stolperegister.",
    "sosinavn" : "Referansepunkt",
    "sosinvdbnavn" : "Referansepunkt_627",
    "sorteringsnummer" : 0
}, {
    "id" : 628,
    "navn" : "Vegdekke, sporfylling",
    "beskrivelse" : "Vedlikeholdstiltak for vegdekke, type sporfylling",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "VegdekkeSporfylling",
    "sosinvdbnavn" : "VegdekkeSporfylling_628",
    "sorteringsnummer" : 0
}, {
    "id" : 629,
    "navn" : "Vegdekke, flatelapping",
    "beskrivelse" : "Vedlikeholdstiltak for vegdekke, type flatelapping",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "VegdekkeFlatelapping",
    "sosinvdbnavn" : "VegdekkeFlatelapping_629",
    "sorteringsnummer" : 0
}, {
    "id" : 631,
    "navn" : "Vegkommentar",
    "beskrivelse" : "Kommentar rettet mot et konkret sted på vegen .",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Vegkommentar",
    "sosinvdbnavn" : "Vegkommentar_631",
    "sorteringsnummer" : 0
}, {
    "id" : 638,
    "navn" : "Trafikkstasjon",
    "beskrivelse" : "Trafikkstasjon",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Trafikkstasjon",
    "sosinvdbnavn" : "Trafikkstasjon_638",
    "sorteringsnummer" : 0
}, {
    "id" : 639,
    "navn" : "Kurvatur, horisontalelement",
    "beskrivelse" : "Del av vegens horisontalkurvatur.  Sirkelbue, rettlinje eller klotoide.  Rettlinje har radius 99999",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "KurvaturHorisontalelem",
    "sosinvdbnavn" : "KurvaturHorisontalelem_639",
    "sorteringsnummer" : 0
}, {
    "id" : 640,
    "navn" : "Kurvatur, vertikalelement",
    "beskrivelse" : "Del av vegens vertikalkurvatur.  Sirkelbue (høybrekk/lavbrekk) eller rettlinje.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "KurvaturVertikalelemen",
    "sosinvdbnavn" : "KurvaturVertikalelemen_640",
    "sorteringsnummer" : 0
}, {
    "id" : 641,
    "navn" : "Kurvaturgenerering",
    "beskrivelse" : "Administrative data knyttet til et sett med horisontal- og vertikalelement",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Kurvaturgenerering",
    "sosinvdbnavn" : "Kurvaturgenerering_641",
    "sorteringsnummer" : 0
}, {
    "id" : 642,
    "navn" : "Kurvatur, vertikalpunkt",
    "beskrivelse" : "Punkt i høybrekk/lavbrekk hvor stigning er 0, dvs i topp/bunnpunkt.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "KurvaturVertikalpunkt",
    "sosinvdbnavn" : "KurvaturVertikalpunkt_642",
    "sorteringsnummer" : 0
}, {
    "id" : 643,
    "navn" : "Statistikk, trafikkmengde",
    "beskrivelse" : "Aggregert informasjon ifbm PMS-rapport 2603",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "StatistikkTrafikkmengd",
    "sosinvdbnavn" : "StatistikkTrafikkmengd_643",
    "sorteringsnummer" : 0
}, {
    "id" : 644,
    "navn" : "Statistikk, spormåling",
    "beskrivelse" : "Aggregert informasjon ifbm PMS-rapport 2610",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "StatistikkSpormåling",
    "sosinvdbnavn" : "StatistikkSpormåling_644",
    "sorteringsnummer" : 0
}, {
    "id" : 645,
    "navn" : "Statistikk, jevnhetsmåling",
    "beskrivelse" : "Aggregert informasjon ifbm PMS-rapport 2612",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "StatistikkJevnhetsmåli",
    "sosinvdbnavn" : "StatistikkJevnhetsmåli_645",
    "sorteringsnummer" : 0
}, {
    "id" : 647,
    "navn" : "Statistikk, vegbredde",
    "beskrivelse" : "Aggregert informasjon ifbm PMS-rapport 2625",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "StatistikkVegbredde",
    "sosinvdbnavn" : "StatistikkVegbredde_647",
    "sorteringsnummer" : 0
}, {
    "id" : 704,
    "navn" : "Riksvegrute",
    "beskrivelse" : "Riksveger inndelt i ruter som i hovedsak benyttes i arbeidet med riksvegutredninger og NTP.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Riksvegrute",
    "sosinvdbnavn" : "Riksvegrute_704",
    "sorteringsnummer" : 0
}, {
    "id" : 705,
    "navn" : "Sykkelrute, tur/fritid",
    "beskrivelse" : "Fastlagt rute for sykling, primært for tur/fritidssykling",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "SykkelruteTurFritid",
    "sosinvdbnavn" : "SykkelruteTurFritid_705",
    "sorteringsnummer" : 0
}, {
    "id" : 707,
    "navn" : "Trafikkindeks",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Trafikkindeks",
    "sosinvdbnavn" : "Trafikkindeks_707",
    "sorteringsnummer" : 0
}, {
    "id" : 708,
    "navn" : "Trafikkdata i tellepunkt",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "TrafikkdataITellepunkt",
    "sosinvdbnavn" : "TrafikkdataITellepunkt_708",
    "sorteringsnummer" : 0
}, {
    "id" : 715,
    "navn" : "Ulykkesfrekvens",
    "beskrivelse" : "Foreløpig kun til testformål. En verdi som angir ulykkestettheten på en valgfri strekning. Regnes ut som en funksjon av antall ulykker med personskade i et gitt tidsrom (vanligvis 4 år), trafikkmengde og strekningslengde.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Ulykkesfrekvens",
    "sosinvdbnavn" : "Ulykkesfrekvens_715",
    "sorteringsnummer" : 0
}, {
    "id" : 716,
    "navn" : "Ulykkespunkt",
    "beskrivelse" : "Et punkt på vegen som er særlig ulykkesutsatt. En strekning på 100 meter som har 4 eller flere ulykker med personskade innenfor et tidsrom på 5 år.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Ulykkespunkt",
    "sosinvdbnavn" : "Ulykkespunkt_716",
    "sorteringsnummer" : 0
}, {
    "id" : 717,
    "navn" : "Ulykkesstrekning",
    "beskrivelse" : "En strekning på vegen som er særlig ulykkesbelastet. En strekning på 1000 meter som har 10 eller flere ulykker med personskade innenfor et tidsrom på 5 år.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Ulykkesstrekning",
    "sosinvdbnavn" : "Ulykkesstrekning_717",
    "sorteringsnummer" : 0
}, {
    "id" : 718,
    "navn" : "Skadegradstetthet",
    "beskrivelse" : "Foreløpig kun til testformål. Verdier som angir sannsynligheten for ulykker langs vegnettet. Regnes ut som en funksjon av antall ulykker, alvorlighetsgraden for ulykkene, trafikkmengde, fartsgrense og motorveg.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Skadegradstetthet",
    "sosinvdbnavn" : "Skadegradstetthet_718",
    "sorteringsnummer" : 0
}, {
    "id" : 719,
    "navn" : "Støy-luft, Beregning",
    "beskrivelse" : "Beregningsobjekt",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Støy-luftBeregning",
    "sosinvdbnavn" : "Støy-luftBeregning_719",
    "sorteringsnummer" : 0
}, {
    "id" : 720,
    "navn" : "Støy-luft, Utbredelse",
    "beskrivelse" : "Gir informasjon om terreng- og skjermingsforhold mellom angitt bygning og veg, samt om det er hard eller myk mark.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Støy-luftUtbredelse",
    "sosinvdbnavn" : "Støy-luftUtbredelse_720",
    "sorteringsnummer" : 0
}, {
    "id" : 721,
    "navn" : "Fartsgrense, variabel",
    "beskrivelse" : "Høyeste tillatte hastighet på en vegstrekning innenfor et avgrenset tidsrom.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "FartsgrenseVariabel",
    "sosinvdbnavn" : "FartsgrenseVariabel_721",
    "sorteringsnummer" : 0
}, {
    "id" : 722,
    "navn" : "Vegbilder",
    "beskrivelse" : "Bilder av vegen, f.eks Visbilder mm.  Bilder av enkeltobjekt legges inn som \"Dokumentasjon\" tilhørende aktuelt objekt.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Vegbilder",
    "sosinvdbnavn" : "Vegbilder_722",
    "sorteringsnummer" : 0
}, {
    "id" : 751,
    "navn" : "Utgår_Holdeplass",
    "beskrivelse" : "Avgrenset område med ett eller flere punkt for av/påstigning av kollektivt reisemiddel.  Det defineres egne holdeplasser for hver type transportmiddel. (Noe varierende kvalitet. Vil utgå på sikt. Data overføres til Holdeplassutrustning)",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Utgår_Holdeplass",
    "sosinvdbnavn" : "Utgår_Holdeplass_751",
    "sorteringsnummer" : 0
}, {
    "id" : 752,
    "navn" : "Utgår_Stoppunkt",
    "beskrivelse" : "  Del av holdeplass.  Sted for av/påstigning av kollektivtrafikk. (Noe varierende kvalitet. Vil utgå på sikt. Data overføres til Holdeplassutrustning)",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Utgår_Stoppunkt",
    "sosinvdbnavn" : "Utgår_Stoppunkt_752",
    "sorteringsnummer" : 0
}, {
    "id" : 757,
    "navn" : "Vegliste, vedlegg",
    "beskrivelse" : "Vedlegg til vegliste.  For intern bruk i forbindelse med utarbeiding av veglister.",
    "veiledning" : "",
    "sosinavn" : "VeglisteVedlegg",
    "sosinvdbnavn" : "VeglisteVedlegg_757",
    "sorteringsnummer" : 0
}, {
    "id" : 760,
    "navn" : "Rapportdefinisjon",
    "beskrivelse" : "Rapportdefinisjon.  Til intern bruk i NVDB",
    "veiledning" : "",
    "sosinavn" : "Rapportdefinisjon",
    "sosinvdbnavn" : "Rapportdefinisjon_760",
    "sorteringsnummer" : 0
}, {
    "id" : 761,
    "navn" : "Tilstand/skade, punkt",
    "beskrivelse" : "Gir informasjon om tilstand og eventuell skade.  Normalt knyttet til et spesifikt punktobjekt.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "TilstandSkadePunkt",
    "sosinvdbnavn" : "TilstandSkadePunkt_761",
    "sorteringsnummer" : 0
}, {
    "id" : 762,
    "navn" : "Tilstand/skade FU, punkt",
    "beskrivelse" : "Gir informasjon om funksjonalitet.  Normalt knyttet til et spesifikt punkt-objekt.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "TilstandSkadeFUPunkt",
    "sosinvdbnavn" : "TilstandSkadeFUPunkt_762",
    "sorteringsnummer" : 0
}, {
    "id" : 765,
    "navn" : "Friksjonsforbedring",
    "beskrivelse" : "Strekning der det er spesielle krav om vintervedlikehold i form av salting, sanding etc.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Friksjonsforbedring",
    "sosinvdbnavn" : "Friksjonsforbedring_765",
    "sorteringsnummer" : 0
}, {
    "id" : 766,
    "navn" : "Oppslagstavle for rutetabell",
    "beskrivelse" : "Tavle hvor det kan henges opp rutetabeller.  Benyttes i forbindelse med holdeplasser.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "OppslagstavleForRuteta",
    "sosinvdbnavn" : "OppslagstavleForRuteta_766",
    "sorteringsnummer" : 0
}, {
    "id" : 767,
    "navn" : "Utgår_Repos/venteareal",
    "beskrivelse" : "Område/avsats som er bygd spesielt for at reisende kan oppholde seg i forbindelse med venting på buss.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Utgår_ReposVenteareal",
    "sosinvdbnavn" : "Utgår_ReposVenteareal_767",
    "sorteringsnummer" : 3130
}, {
    "id" : 769,
    "navn" : "Vlenkeid",
    "beskrivelse" : "Unik ident på veglenker innenfor en kommune, uavhengig av vegkategori eller vegstatus",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Vlenkeid",
    "sosinvdbnavn" : "Vlenkeid_769",
    "sorteringsnummer" : 0
}, {
    "id" : 770,
    "navn" : "Ferjesamband",
    "beskrivelse" : "Overfart som trafikkeres av bilferje.  Kan ha to eller flere anløpssteder.(uoff)",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Ferjesamband",
    "sosinvdbnavn" : "Ferjesamband_770",
    "sorteringsnummer" : 0
}, {
    "id" : 771,
    "navn" : "Byggegrense",
    "beskrivelse" : "Fastlagt grense for tillatt bebyggelse etter reguleringsplan eller vegloven (HB N100 (017))",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Byggegrense",
    "sosinvdbnavn" : "Byggegrense_771",
    "sorteringsnummer" : 0
}, {
    "id" : 774,
    "navn" : "Nedbøyningsmåleserie",
    "beskrivelse" : "Serie med nedbøyningsmålinger",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Nedbøyningsmåleserie",
    "sosinvdbnavn" : "Nedbøyningsmåleserie_774",
    "sorteringsnummer" : 0
}, {
    "id" : 775,
    "navn" : "ATK, influensstrekning",
    "beskrivelse" : "Strekning hvor det er automatisk overvåkning av fartsnivå.  Strekning er definert fra varslingsskilt 556 til 3 km etter siste ATK-punkt for punkt-Atk og til 1 km etter det siste ATK-punktet for streknings-ATK.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "ATKInfluensstrekning",
    "sosinvdbnavn" : "ATKInfluensstrekning_775",
    "sorteringsnummer" : 0
}, {
    "id" : 776,
    "navn" : "Tunnelovervåkning",
    "beskrivelse" : "Utstyr og informasjon ang. tunnelovervåkning.  Tilpasset register 27 i VDB.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Tunnelovervåkning",
    "sosinvdbnavn" : "Tunnelovervåkning_776",
    "sorteringsnummer" : 0
}, {
    "id" : 777,
    "navn" : "Turistveg",
    "beskrivelse" : "Strekning der vegen har status \"Turistveg\" eller det er planlagt at den skal få denne statusen.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Turistveg",
    "sosinvdbnavn" : "Turistveg_777",
    "sorteringsnummer" : 0
}, {
    "id" : 779,
    "navn" : "Kommunedele",
    "beskrivelse" : "Sted der senterlinje veg krysser kommunegrense",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Kommunedele",
    "sosinvdbnavn" : "Kommunedele_779",
    "sorteringsnummer" : 0
}, {
    "id" : 780,
    "navn" : "Farlige forhold",
    "beskrivelse" : "Skriftlig melding fra brukere av vegsystemet om sted i vegnettet hvor det ofte oppstår trafikkfarlige situasjoner.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "FarligeForhold",
    "sosinvdbnavn" : "FarligeForhold_780",
    "sorteringsnummer" : 0
}, {
    "id" : 783,
    "navn" : "Fysisk inngrep i vannforekomst",
    "beskrivelse" : "sted hvor veginngrep hindrer fiskevandring, hindrer vannstrøm eller endrer strandsone",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "FysiskInngrepIVannfore",
    "sosinvdbnavn" : "FysiskInngrepIVannfore_783",
    "sorteringsnummer" : 0
}, {
    "id" : 784,
    "navn" : "Kjemisk påvirkning av vannforekomst",
    "beskrivelse" : "Vegstrekning som bidrar til kjemisk forurensning av innsjø eller vassdrag nærmere enn 200 meter fra vegen.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "KjemiskPåvirkningAvVan",
    "sosinvdbnavn" : "KjemiskPåvirkningAvVan_784",
    "sorteringsnummer" : 0
}, {
    "id" : 785,
    "navn" : "Statistikk, generell",
    "beskrivelse" : "Aggregert informasjon ifbm en vegobjekttype.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "StatistikkGenerell",
    "sosinvdbnavn" : "StatistikkGenerell_785",
    "sorteringsnummer" : 0
}, {
    "id" : 786,
    "navn" : "Vegminne",
    "beskrivelse" : "objekt eller strekning av veg som er verneverdig eller fredet",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Vegminne",
    "sosinvdbnavn" : "Vegminne_786",
    "sorteringsnummer" : 0
}, {
    "id" : 787,
    "navn" : "Utgår_Naturvernområde",
    "beskrivelse" : "Etablerte verneområder og verneområder som er under planlegging i nærheten av veg. Naturvernområder opprettes først og fremst for å bevare naturverdier av nasjonal betydning. Etablering av verneområder er hjemlet i Naturvernloven. I tillegg er noen enkeltobjekter vernet med hjemmel i annet lovverk.  Informasjon hentes fra Naturbase.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Utgår_Naturvernområde",
    "sosinvdbnavn" : "Utgår_Naturvernområde_787",
    "sorteringsnummer" : 0
}, {
    "id" : 788,
    "navn" : "Utgår_Prioriterte naturtyper",
    "beskrivelse" : "Prioriterte naturområder i nærheten av veg, fra kommunevis kartlegging av biologisk mangfold.  Informasjon hentes fra Naturbase.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Utgår_PrioriterteNatur",
    "sosinvdbnavn" : "Utgår_PrioriterteNatur_788",
    "sorteringsnummer" : 0
}, {
    "id" : 789,
    "navn" : "Utgår_Kulturlandskap",
    "beskrivelse" : "Objekttypen omfatter viktige kulturlandskap i nærheten av veg, og som er av betydning for det biologiske mangfoldet, med fokus på nasjonalt viktige områder. Viktige småbiotoper dekkes av prioriterte naturtyper.  Informasjon hentes fra Naturbase",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Utgår_Kulturlandskap",
    "sosinvdbnavn" : "Utgår_Kulturlandskap_789",
    "sorteringsnummer" : 0
}, {
    "id" : 790,
    "navn" : "Utgår_Viktige artsforekomster",
    "beskrivelse" : "Områder med sjeldne og freda arter i nærheten av veg.  Informasjon hentes fra Naturbase",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Utgår_ViktigeArtsforek",
    "sosinvdbnavn" : "Utgår_ViktigeArtsforek_790",
    "sorteringsnummer" : 0
}, {
    "id" : 791,
    "navn" : "Avrettingslag",
    "beskrivelse" : "Avrettingslag i overbygning",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Avrettingslag",
    "sosinvdbnavn" : "Avrettingslag_791",
    "sorteringsnummer" : 4440
}, {
    "id" : 793,
    "navn" : "NVDB dokumentasjon",
    "beskrivelse" : "Objekttype benyttet for å dokumentere noen enum-verdier i NVDB.  Det kan forekomme avvik fra NVDB i og med at det ikke er automatisk synkronisering.",
    "veiledning" : "",
    "sosinavn" : "NVDBDokumentasjon",
    "sosinvdbnavn" : "NVDBDokumentasjon_793",
    "sorteringsnummer" : 0
}, {
    "id" : 794,
    "navn" : "Systemobjekt",
    "beskrivelse" : "Objekttype for å ivareta systeminformasjon",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Systemobjekt",
    "sosinvdbnavn" : "Systemobjekt_794",
    "sorteringsnummer" : 0
}, {
    "id" : 795,
    "navn" : "Tiltak økologiske verdier",
    "beskrivelse" : "Objekttypen inneholder tiltak knyttet til konflikter mellom eksisterende veg og økologiske verdier",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "TiltakØkologiskeVerdie",
    "sosinvdbnavn" : "TiltakØkologiskeVerdie_795",
    "sorteringsnummer" : 0
}, {
    "id" : 796,
    "navn" : "Påvirkning økologiske verdier",
    "beskrivelse" : "Objekttypen inneholder påvirkninger fra eksisterende veg på økologiske verdier.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "PåvirkningØkologiskeVe",
    "sosinvdbnavn" : "PåvirkningØkologiskeVe_796",
    "sorteringsnummer" : 0
}, {
    "id" : 797,
    "navn" : "Utgår_Økologisk korridor",
    "beskrivelse" : "Økologiske korridorer er en fellesbetegnelse for strukturer i landskapet som utgjør sammenhengende leveområder, funksjonsområder og trekkruter for dyrelivet. De registrerte strekningene viser hvor det er registrert konflikt med kryssende vilt. Basert på analyse av bl.a. ulykkesdata og registrerte trekkruter fra DN Naturbase.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Utgår_ØkologiskKorrido",
    "sosinvdbnavn" : "Utgår_ØkologiskKorrido_797",
    "sorteringsnummer" : 0
}, {
    "id" : 798,
    "navn" : "Trafikkmengde, kjørefelt",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "TrafikkmengdeKjørefelt",
    "sosinvdbnavn" : "TrafikkmengdeKjørefelt_798",
    "sorteringsnummer" : 0
}, {
    "id" : 799,
    "navn" : "Jordvoll mot fjellskjæring",
    "beskrivelse" : "Jordvoll mot fjellskjæring. Benyttes i første rekke som TS tiltak.  Vollen har effekt i forhold til at en unngår dyp sidegrøft, samt at den skjermer noe for kollisjon med fjellskjæring.  Vollen skrår fra vegkant og opp mot fjellskjæring.  Kan være grunn sidegrøft.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "JordvollMotFjellskjæri",
    "sosinvdbnavn" : "JordvollMotFjellskjæri_799",
    "sorteringsnummer" : 0
}, {
    "id" : 800,
    "navn" : "Fremmede arter",
    "beskrivelse" : "Område der det vokser \"fremmede\" arter, dvs arter som ikke ønskes spredd langs vegene (uoff)",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "FremmedeArter",
    "sosinvdbnavn" : "FremmedeArter_800",
    "sorteringsnummer" : 0
}, {
    "id" : 801,
    "navn" : "Nødutgang",
    "beskrivelse" : "utgang som kan nyttes i nødstilfelle.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Nødutgang",
    "sosinvdbnavn" : "Nødutgang_801",
    "sorteringsnummer" : 5590
}, {
    "id" : 803,
    "navn" : "Inspeksjonsluke",
    "beskrivelse" : "Åpning i tunnelhvelv hvor en kan komme bak tunnelhvelvet.  Benyttes i forbindelse med inspeksjon av geologiske forhold.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2012-05-08",
    "veiledning" : "",
    "sosinavn" : "Inspeksjonsluke",
    "sosinvdbnavn" : "Inspeksjonsluke_803",
    "sorteringsnummer" : 5630
}, {
    "id" : 804,
    "navn" : "Utgår_Havarinisje",
    "beskrivelse" : "Utvidelse av tunnelløp for å muliggjøre parkering utenfor kjørebanen ved nødstopp.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Utgår_Havarinisje",
    "sosinvdbnavn" : "Utgår_Havarinisje_804",
    "sorteringsnummer" : 5560
}, {
    "id" : 805,
    "navn" : "Utgår_Snunisje",
    "beskrivelse" : "Utvidelse av tunnelløp for å muliggjøre snuing av kjøretøy.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Utgår_Snunisje",
    "sosinvdbnavn" : "Utgår_Snunisje_805",
    "sorteringsnummer" : 5580
}, {
    "id" : 807,
    "navn" : "Ferjestrekning",
    "beskrivelse" : "Strekning mellom to ferjekaier hvor det er tilrettelagt for å reise med ferje.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Ferjestrekning",
    "sosinvdbnavn" : "Ferjestrekning_807",
    "sorteringsnummer" : 0
}, {
    "id" : 808,
    "navn" : "Referansestrekning",
    "beskrivelse" : "Markert vegstrekning for kontroll av utkjørt lengde.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Referansestrekning",
    "sosinvdbnavn" : "Referansestrekning_808",
    "sorteringsnummer" : 0
}, {
    "id" : 809,
    "navn" : "Døgnhvileplass",
    "beskrivelse" : "Et område som er tilrettelagt for hensetting av vogntog i langtransport slik at sjåførene kan innta normal døgnhvile.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Døgnhvileplass",
    "sosinvdbnavn" : "Døgnhvileplass_809",
    "sorteringsnummer" : 0
}, {
    "id" : 810,
    "navn" : "Vinterdriftsklasse",
    "beskrivelse" : "Inndeling av vegnettet for å beskrive ulik standard for vinterdrift. Inndelingen baseres på trafikkmengde, viktighet av veg, klima, trafikksikkerhet mm. (Revidert HB R610 (111))",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Vinterdriftsklasse",
    "sosinvdbnavn" : "Vinterdriftsklasse_810",
    "sorteringsnummer" : 0
}, {
    "id" : 811,
    "navn" : "Dataanalyse",
    "beskrivelse" : "Objekttype som brukes lokalt for å ta vare på midlertidige analysedata, f.eks. mangel, overlapp eller annen inkonsistens. Objekter av denne type kan lagres lokalt i \"project\"-databaser, men skal ikke lagres i sentral NVDB-database.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Dataanalyse",
    "sosinvdbnavn" : "Dataanalyse_811",
    "sorteringsnummer" : 0
}, {
    "id" : 812,
    "navn" : "Gatevarme",
    "beskrivelse" : "Angir strekning med gatevarme",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2016-06-09",
    "veiledning" : "",
    "sosinavn" : "Gatevarme",
    "sosinvdbnavn" : "Gatevarme_812",
    "sorteringsnummer" : 4119
}, {
    "id" : 813,
    "navn" : "Gågate",
    "beskrivelse" : "Gate uten fortau reservert for gående hvor trafikkreglene for gågate gjelder (hentet fra HB N100 (017), stemmer også med beskrivelse av gågateskiltet i HB N300-3 (050-3))",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Gågate",
    "sosinvdbnavn" : "Gågate_813",
    "sorteringsnummer" : 0
}, {
    "id" : 815,
    "navn" : "Avkjørsel, holdningsklasse",
    "beskrivelse" : "Angir hvilken offisiell holdning det er til opprettelse av avkjørsler på strekningen",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "AvkjørselHoldningsklas",
    "sosinvdbnavn" : "AvkjørselHoldningsklas_815",
    "sorteringsnummer" : 0
}, {
    "id" : 816,
    "navn" : "Taljer/Løfteutstyr",
    "beskrivelse" : "Utstyr for tunge løft benyttes i tunneler, f.eks i forbindelse med løft av pumper",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "TaljerLøfteutstyr",
    "sosinvdbnavn" : "TaljerLøfteutstyr_816",
    "sorteringsnummer" : 0
}, {
    "id" : 819,
    "navn" : "Fordelingstavle",
    "beskrivelse" : "Tavle/skap/koblingsboks/punkt hvor strøm fordeles til teknisk utstyr. Benyttes bl.a. i forbindelse med tunnelutstyr",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2014-11-22",
    "veiledning" : "",
    "sosinavn" : "Fordelingstavle",
    "sosinvdbnavn" : "Fordelingstavle_819",
    "sorteringsnummer" : 4165
}, {
    "id" : 821,
    "navn" : "Funksjonell vegklasse",
    "beskrivelse" : "En klassifisering basert på hvor viktig en veg er for det totale vegnettets forbindelsesmuligheter. Brukes blant annet for vekting i ruteplanlegging",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "FunksjonellVegklasse",
    "sosinvdbnavn" : "FunksjonellVegklasse_821",
    "sorteringsnummer" : 0
}, {
    "id" : 822,
    "navn" : "Landbruksvegklasse",
    "beskrivelse" : "Landbruksmyndighetene sin inndeling av landbruksveger, ut i fra støtteordninger",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Landbruksvegklasse",
    "sosinvdbnavn" : "Landbruksvegklasse_822",
    "sorteringsnummer" : 0
}, {
    "id" : 823,
    "navn" : "Streknings-ATK",
    "beskrivelse" : "Strekning mellom to ATK-punkt hvor det gjennomføres automatisk trafikkontroll (ATK) av gjennomsnittsfarten på passerende kjøretøy.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Streknings-ATK",
    "sosinvdbnavn" : "Streknings-ATK_823",
    "sorteringsnummer" : 0
}, {
    "id" : 824,
    "navn" : "Skredpunkt",
    "beskrivelse" : "Strekning som er utsatt for skred og hvor det er aktuelt å gjennomføre sikringstiltak. Det skal normalt opprettes et skredpunkt per skredløp, men der skredløpene vanskelig kan sikres fysisk uten å berøre neste skredløp kan man vurdere å slå sammen flere skredløp i samme skredpunkt",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Skredpunkt",
    "sosinvdbnavn" : "Skredpunkt_824",
    "sorteringsnummer" : 0
}, {
    "id" : 825,
    "navn" : "Kurvatur, stigning",
    "beskrivelse" : "Angir gjennomsnittlig stigning på strekning. Basert på silingsfunksjon i forhold til primære høydedata. Splitting i ny forekomst når avvik større enn gitt verdi",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "KurvaturStigning",
    "sosinvdbnavn" : "KurvaturStigning_825",
    "sorteringsnummer" : 0
}, {
    "id" : 826,
    "navn" : "TEN-T veg",
    "beskrivelse" : "Veg som inngår i det trans-europeiske vegnettet (Trans European Network - Transport). I regi av EU. Definert og er vedtatt i vedtak nr 1692/96/EF. Referert i HB R511 (269) - Sikkerhetsforvaltning av vegtunneler. Brukes også til CEDR rapportering",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "TEN-TVeg",
    "sosinvdbnavn" : "TEN-TVeg_826",
    "sorteringsnummer" : 0
}, {
    "id" : 828,
    "navn" : "Rist",
    "beskrivelse" : "benyttes for å sikre grøfter etc.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Rist",
    "sosinvdbnavn" : "Rist_828",
    "sorteringsnummer" : 0
}, {
    "id" : 830,
    "navn" : "Siktklasse",
    "beskrivelse" : "Angir hvilken versjon av vegnormalene som ligger til grunn for utforming av gitt vegstrekning med tanke på sikt. Benyttes i forbindelse med drift og vedlikehold",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Siktklasse",
    "sosinvdbnavn" : "Siktklasse_830",
    "sorteringsnummer" : 0
}, {
    "id" : 831,
    "navn" : "Vegdekkeklasse",
    "beskrivelse" : "Angir hvilken vegdekkeklasse gitt vegstrekning tilhører. Benyttes i forbindelse med drift og vedlikehold",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Vegdekkeklasse",
    "sosinvdbnavn" : "Vegdekkeklasse_831",
    "sorteringsnummer" : 0
}, {
    "id" : 832,
    "navn" : "Grøfteklasse",
    "beskrivelse" : "Angir hvilken grøfteklasse den gitte strekningen tilhører",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Grøfteklasse",
    "sosinvdbnavn" : "Grøfteklasse_832",
    "sorteringsnummer" : 0
}, {
    "id" : 833,
    "navn" : "Forbikjøringsstrekning",
    "beskrivelse" : "Strekning hvor det er forbikjøringsmulighet i henhold til krav i Håndbok N100 (017).",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Forbikjøringsstrekning",
    "sosinvdbnavn" : "Forbikjøringsstrekning_833",
    "sorteringsnummer" : 0
}, {
    "id" : 834,
    "navn" : "Tilstand/skade, fjellskjæring",
    "beskrivelse" : "Angir tilstand og skade knyttet til en fjellskjæring",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "TilstandSkadeFjellskjæ",
    "sosinvdbnavn" : "TilstandSkadeFjellskjæ_834",
    "sorteringsnummer" : 0
}, {
    "id" : 835,
    "navn" : "Gangadkomst",
    "beskrivelse" : "Beskriver hvordan hovedadkomst for gående er utformet, dette gjelder adkomst fra biloppstilling/kollektivtrafikk til angitt funksjon/sted innenfor tilhørende område",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Gangadkomst",
    "sosinvdbnavn" : "Gangadkomst_835",
    "sorteringsnummer" : 0
}, {
    "id" : 836,
    "navn" : "Vegoppmerking, forsterket",
    "beskrivelse" : "Vegoppmerking som er forsterket med fresing i asfaltdekket. Fresingen skal gi vibrasjon i kjøretøyet",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2012-09-14",
    "veiledning" : "",
    "sosinavn" : "VegoppmerkingForsterke",
    "sosinvdbnavn" : "VegoppmerkingForsterke_836",
    "sorteringsnummer" : 3710
}, {
    "id" : 838,
    "navn" : "Vegbredde, beregnet",
    "beskrivelse" : "Vegbredde beregnet på basis av grunnlagsdata, f.eks FKB, dekkestilstandsdata etc . Merknad: Disse dataene er i første omgang tiltenkt bruksområder hvor det ikke stilles veldig nøyaktige krav til breddenøyaktighet, bla analyser knyttet til NTP.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "VegbreddeBeregnet",
    "sosinvdbnavn" : "VegbreddeBeregnet_838",
    "sorteringsnummer" : 0
}, {
    "id" : 843,
    "navn" : "Kabelgrøft",
    "beskrivelse" : "Lukka grøft med kabler og trekkerør",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2014-11-25",
    "veiledning" : "",
    "sosinavn" : "Kabelgrøft",
    "sosinvdbnavn" : "Kabelgrøft_843",
    "sorteringsnummer" : 4124
}, {
    "id" : 844,
    "navn" : "Nedføringsrenne",
    "beskrivelse" : "Grøft som fører vann fra topp skjæring ned til kum/stikkrenne",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Nedføringsrenne",
    "sosinvdbnavn" : "Nedføringsrenne_844",
    "sorteringsnummer" : 0
}, {
    "id" : 845,
    "navn" : "Fanggjerde",
    "beskrivelse" : "Gjerde som settes opp for å fange opp steinsprang eller mindre skred",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2014-06-10",
    "veiledning" : "",
    "sosinavn" : "Fanggjerde",
    "sosinvdbnavn" : "Fanggjerde_845",
    "sorteringsnummer" : 4762
}, {
    "id" : 846,
    "navn" : "Skredsikring, bremsekjegler",
    "beskrivelse" : "Kjegler som settes opp i rader for å bremse snøskred og for å redusere utløpsdistansen",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2014-11-22",
    "veiledning" : "",
    "sosinavn" : "SkredsikringBremsekjeg",
    "sosinvdbnavn" : "SkredsikringBremsekjeg_846",
    "sorteringsnummer" : 4763
}, {
    "id" : 848,
    "navn" : "Snøskjerm",
    "beskrivelse" : "Skjerm som settes opp for å stoppe drivende snø",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2014-06-10",
    "veiledning" : "",
    "sosinavn" : "Snøskjerm",
    "sosinvdbnavn" : "Snøskjerm_848",
    "sorteringsnummer" : 4761
}, {
    "id" : 849,
    "navn" : "Skred, varsling/overvåkning",
    "beskrivelse" : "Område som blir overvåket med hensyn på skred",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2014-11-22",
    "veiledning" : "",
    "sosinavn" : "SkredVarslingOvervåkni",
    "sosinvdbnavn" : "SkredVarslingOvervåkni_849",
    "sorteringsnummer" : 4768
}, {
    "id" : 850,
    "navn" : "Skredsikring, forbygning",
    "beskrivelse" : "Installasjoner i løsneområde som hindrer skred i å løsne",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2014-11-22",
    "veiledning" : "",
    "sosinavn" : "SkredsikringForbygning",
    "sosinvdbnavn" : "SkredsikringForbygning_850",
    "sorteringsnummer" : 4765
}, {
    "id" : 851,
    "navn" : "Skredutløsningstiltak",
    "beskrivelse" : "Installasjoner for kunstig utløsning  som står i løsneområdene for skred",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2014-11-22",
    "veiledning" : "",
    "sosinavn" : "Skredutløsningstiltak",
    "sosinvdbnavn" : "Skredutløsningstiltak_851",
    "sorteringsnummer" : 4766
}, {
    "id" : 852,
    "navn" : "Trekkerør/kanal",
    "beskrivelse" : "Rør eller kanal for trekking av kabel",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2013-10-09",
    "veiledning" : "",
    "sosinavn" : "TrekkerørKanal",
    "sosinvdbnavn" : "TrekkerørKanal_852",
    "sorteringsnummer" : 4123
}, {
    "id" : 853,
    "navn" : "Trekkekum",
    "beskrivelse" : "Kum for trekking og/eller sammenkobling av kabler",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2013-10-09",
    "veiledning" : "",
    "sosinavn" : "Trekkekum",
    "sosinvdbnavn" : "Trekkekum_853",
    "sorteringsnummer" : 4122
}, {
    "id" : 854,
    "navn" : "Tunnelport",
    "beskrivelse" : "Port som kan avstenge et tunnelløp",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2013-10-09",
    "veiledning" : "",
    "sosinavn" : "Tunnelport",
    "sosinvdbnavn" : "Tunnelport_854",
    "sorteringsnummer" : 5490
}, {
    "id" : 855,
    "navn" : "Gjerdeport",
    "beskrivelse" : "Passasje i gjerder eller skjermer",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2013-10-04",
    "veiledning" : "",
    "sosinavn" : "Gjerdeport",
    "sosinvdbnavn" : "Gjerdeport_855",
    "sorteringsnummer" : 4810
}, {
    "id" : 856,
    "navn" : "Trafikkreguleringer",
    "beskrivelse" : "Strekning hvor det er restriksjoner for motortrafikk eller gående og syklende",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Trafikkreguleringer",
    "sosinvdbnavn" : "Trafikkreguleringer_856",
    "sorteringsnummer" : 0
}, {
    "id" : 857,
    "navn" : "Brøyterode",
    "beskrivelse" : "Strekning som inngår i gitt rode",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Brøyterode",
    "sosinvdbnavn" : "Brøyterode_857",
    "sorteringsnummer" : 0
}, {
    "id" : 858,
    "navn" : "Strørode",
    "beskrivelse" : "Strekning som inngår i gitt rode",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Strørode",
    "sosinvdbnavn" : "Strørode_858",
    "sorteringsnummer" : 0
}, {
    "id" : 859,
    "navn" : "Taktile indikatorer",
    "beskrivelse" : "Taktile indikatorer er standardiserte elementer som er lagt ned i gategrunn for å bidra til vegfinning for blinde og svaksynte. Kan bestå av retnings-, varsels- eller oppmerksomhetsindikator. For mer utfyllende informasjon, se HB V129 (278).",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2014-02-03",
    "veiledning" : "",
    "sosinavn" : "TaktileIndikatorer",
    "sosinvdbnavn" : "TaktileIndikatorer_859",
    "sorteringsnummer" : 3220
}, {
    "id" : 860,
    "navn" : "Evakueringslysstrekning",
    "beskrivelse" : "En rekke med lys satt opp i den hensikt å lede trafikkanter ut av en tunnel i en nødsituasjon. Evakueringslysene skal normalt være festet på tunnelvegg i bestemt høyde over veg og med fast innbyrdes avstand Det forutsettes at de enkelt evakueringslysene som inngår hovedsakelig er av samme type. Det opprettes en forekomst for hver side av vegen.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2014-06-10",
    "veiledning" : "",
    "sosinavn" : "Evakueringslysstreknin",
    "sosinvdbnavn" : "Evakueringslysstreknin_860",
    "sorteringsnummer" : 5901
}, {
    "id" : 861,
    "navn" : "Ledelysstrekning, optisk",
    "beskrivelse" : "En rekke med lys satt opp i den hensikt å gi optisk ledning for de kjørende. Må ikke forveksles med evakueringslys i tunnel, men kan like fullt ha funksjon i forbindelse med evakuering av røyklagt tunnel.",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2014-06-10",
    "veiledning" : "",
    "sosinavn" : "LedelysstrekningOptisk",
    "sosinvdbnavn" : "LedelysstrekningOptisk_861",
    "sorteringsnummer" : 5902
}, {
    "id" : 862,
    "navn" : "Reisetidsregistreringspunkt",
    "beskrivelse" : "Stasjon der det er plassert utstyr for registrering av passerende kjøretøy som brukes for registrering av reisetid",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Reisetidsregistrerings",
    "sosinvdbnavn" : "Reisetidsregistrerings_862",
    "sorteringsnummer" : 0
}, {
    "id" : 871,
    "navn" : "Bruksklasse",
    "beskrivelse" : "Gjeldende bruksklasse i vegliste.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Bruksklasse",
    "sosinvdbnavn" : "Bruksklasse_871",
    "sorteringsnummer" : 0
}, {
    "id" : 872,
    "navn" : "Faunapassasje",
    "beskrivelse" : "Faunapassasjer har som primærfunksjon å koble sammen habitatområder som er fragmentert/isolert på grunn av en eksisterende veg",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Faunapassasje",
    "sosinvdbnavn" : "Faunapassasje_872",
    "sorteringsnummer" : 0
}, {
    "id" : 874,
    "navn" : "Sykkeltilbud, riksvegrute",
    "beskrivelse" : "Informasjon om sykkeltilbud langs riksvegrute",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "SykkeltilbudRiksvegrut",
    "sosinvdbnavn" : "SykkeltilbudRiksvegrut_874",
    "sorteringsnummer" : 4
}, {
    "id" : 875,
    "navn" : "Trapp",
    "beskrivelse" : "Frittstående trapp i tilknytning til gangveg/gangareal",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2015-10-06",
    "veiledning" : "",
    "sosinavn" : "Trapp",
    "sosinvdbnavn" : "Trapp_875",
    "sorteringsnummer" : 4960
}, {
    "id" : 876,
    "navn" : "Overvannsrenne",
    "beskrivelse" : "Konstruksjon som fører overvann langs vegen til lukket dreneringssystem eller grøft",
    "stedfesting" : "LINJE",
    "objektliste_dato" : "2016-10-27",
    "veiledning" : "",
    "sosinavn" : "Overvannsrenne",
    "sosinvdbnavn" : "Overvannsrenne_876",
    "sorteringsnummer" : 4262
}, {
    "id" : 877,
    "navn" : "Tilstandsgrad, sidegrøft dyp",
    "beskrivelse" : "Angir tilstandsgrader for åpen dyp sidegrøft.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "TilstandsgradSidegrøft",
    "sosinvdbnavn" : "TilstandsgradSidegrøft_877",
    "sorteringsnummer" : 0
}, {
    "id" : 878,
    "navn" : "Tilstandsgrad, stikkrenne/kulvert",
    "beskrivelse" : "Angir tilstandsgrader for stikkrenne/kulvert",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "TilstandsgradStikkrenn",
    "sosinvdbnavn" : "TilstandsgradStikkrenn_878",
    "sorteringsnummer" : 0
}, {
    "id" : 879,
    "navn" : "Tilstandsgrad, kum",
    "beskrivelse" : "Angir tilstandsgrader for kum",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "TilstandsgradKum",
    "sosinvdbnavn" : "TilstandsgradKum_879",
    "sorteringsnummer" : 0
}, {
    "id" : 880,
    "navn" : "Ulykkesstrekning, egendefinert",
    "beskrivelse" : "En strekning på vegen som er særlig ulykkesbelastet. En strekning med egendefinert lengde som har som har et egendefinert antall ulykker med personskade innenfor et egendefinert tidsrom.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "UlykkesstrekningEgende",
    "sosinvdbnavn" : "UlykkesstrekningEgende_880",
    "sorteringsnummer" : 0
}, {
    "id" : 881,
    "navn" : "Klimaanlegg",
    "beskrivelse" : "Anlegg (varmepumpe) for oppvarming og eller kjøling av ett eller flere rom. Benyttes i bygg eller i fjellrom.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2016-10-27",
    "veiledning" : "",
    "sosinavn" : "Klimaanlegg",
    "sosinvdbnavn" : "Klimaanlegg_881",
    "sorteringsnummer" : 5670
}, {
    "id" : 882,
    "navn" : "Vannhåndteringsanlegg",
    "beskrivelse" : "System som samler opp drensvann og overvann før utslipp i resipient.",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "Vannhåndteringsanlegg",
    "sosinvdbnavn" : "Vannhåndteringsanlegg_882",
    "sorteringsnummer" : 0
}, {
    "id" : 883,
    "navn" : "Skredutsatt veg",
    "beskrivelse" : "Vegstrekning som periodevis er stengt av skred eller skredfare og som er avgrenset av bommer eller annet sperremateriell.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "SkredutsattVeg",
    "sosinvdbnavn" : "SkredutsattVeg_883",
    "sorteringsnummer" : 0
}, {
    "id" : 884,
    "navn" : "Feierode",
    "beskrivelse" : "Strekning som inngår i gitt rode",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Feierode",
    "sosinvdbnavn" : "Feierode_884",
    "sorteringsnummer" : 0
}, {
    "id" : 885,
    "navn" : "Sanntidsinformasjon, kollektivtrafikk",
    "beskrivelse" : "Elektronisk skjerm som viser sanntidsinformajson knyttet til kollektivtrafikk.Kan f.eks være informasjon om avgangstider, forsinkelser, mm.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2016-02-26",
    "veiledning" : "",
    "sosinavn" : "SanntidsinformasjonKol",
    "sosinvdbnavn" : "SanntidsinformasjonKol_885",
    "sorteringsnummer" : 3930
}, {
    "id" : 886,
    "navn" : "Omkjøringsrute",
    "beskrivelse" : "Strekning/rute som anbefales for omkjøring for en eller flere  stengningslenker",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Omkjøringsrute",
    "sosinvdbnavn" : "Omkjøringsrute_886",
    "sorteringsnummer" : 0
}, {
    "id" : 887,
    "navn" : "Trafikkberedskapsklasse",
    "beskrivelse" : "Strekning med ensartet trafikkberedskapsklasse",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Trafikkberedskapsklass",
    "sosinvdbnavn" : "Trafikkberedskapsklass_887",
    "sorteringsnummer" : 0
}, {
    "id" : 888,
    "navn" : "Stengningslenke",
    "beskrivelse" : "Delstrekning av en veg mellom to eller flere kryss, hvor det finnes alternativ omkjøringsrute. Merknad:  Det kan også angis stengningslenker for delstrekninger som ikke har omkjøringsruter. (Kilde HB R611)",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Stengningslenke",
    "sosinvdbnavn" : "Stengningslenke_888",
    "sorteringsnummer" : 0
}, {
    "id" : 889,
    "navn" : "Bruksklasse, modulvogntog",
    "beskrivelse" : "Gjeldende bruksklasse for modulvogntog i vegliste",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "BruksklasseModulvognto",
    "sosinvdbnavn" : "BruksklasseModulvognto_889",
    "sorteringsnummer" : 0
}, {
    "id" : 890,
    "navn" : "Bruksklasse, modulvogntog, uoffisiell",
    "beskrivelse" : "Angir bruksklasse for modulvogntog. Foreløpig versjon for intern bruk",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "BruksklasseModulvognto",
    "sosinvdbnavn" : "BruksklasseModulvognto_890",
    "sorteringsnummer" : 0
}, {
    "id" : 891,
    "navn" : "Bruksklasse, 12/65 mobilkran m.m.",
    "beskrivelse" : "Gjeldende bruksklasse for 12/65 - mobilkran m.m. i vegliste",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Bruksklasse1265Mobilkr",
    "sosinvdbnavn" : "Bruksklasse1265Mobilkr_891",
    "sorteringsnummer" : 0
}, {
    "id" : 892,
    "navn" : "Bruksklasse, 12/65 mobilkran m.m., uoffisiell",
    "beskrivelse" : "Angir bruksklasse for 12/65 - mobilkran m.m. uoffisiell. Foreløpig versjon for intern bruk",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Bruksklasse1265Mobilkr",
    "sosinvdbnavn" : "Bruksklasse1265Mobilkr_892",
    "sorteringsnummer" : 0
}, {
    "id" : 893,
    "navn" : "Bruksklasse, 12/100-vegnett",
    "beskrivelse" : "Gjeldende bruksklasse for 12/100 - vegnett i vegliste.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Bruksklasse12100-vegne",
    "sosinvdbnavn" : "Bruksklasse12100-vegne_893",
    "sorteringsnummer" : 0
}, {
    "id" : 894,
    "navn" : "Bruksklasse, 12/100-vegnett, uoffisiell",
    "beskrivelse" : "Angir bruksklasse for 12/100 - vegnett. Foreløpig versjon for intern bruk",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "Bruksklasse12100-vegne",
    "sosinvdbnavn" : "Bruksklasse12100-vegne_894",
    "sorteringsnummer" : 0
}, {
    "id" : 895,
    "navn" : "VegROS punkt",
    "beskrivelse" : "Punkt/strekning i vegnettet hvor det er økt risiko og sårbarhet for langvarige fremkommelighetsbrudd. Merknad: Skal ha minst 10 meters utstrekning",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "VegROSPunkt",
    "sosinvdbnavn" : "VegROSPunkt_895",
    "sorteringsnummer" : 0
}, {
    "id" : 897,
    "navn" : "Kalksementpeler",
    "beskrivelse" : "Område hvor det er foretatt stabilisering av jordart ved nedboring av kalksementpeler.",
    "stedfesting" : "PUNKT",
    "objektliste_dato" : "2016-10-27",
    "veiledning" : "",
    "sosinavn" : "Kalksementpeler",
    "sosinvdbnavn" : "Kalksementpeler_897",
    "sorteringsnummer" : 4550
}, {
    "id" : 899,
    "navn" : "Tilstandsgrad, skjerm (test)",
    "beskrivelse" : "Angir tilstandsgrader for skjerm.",
    "stedfesting" : "LINJE",
    "veiledning" : "For testformål",
    "sosinavn" : "TilstandsgradSkjerm_te",
    "sosinvdbnavn" : "TilstandsgradSkjerm_te_899",
    "sorteringsnummer" : 0
}, {
    "id" : 900,
    "navn" : "Bruksklasse, tømmertransport",
    "beskrivelse" : "Gjeldende bruksklasse for tmmertransport i vegliste",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "BruksklasseTømmertrans",
    "sosinvdbnavn" : "BruksklasseTømmertrans_900",
    "sorteringsnummer" : 0
}, {
    "id" : 901,
    "navn" : "Bruksklasse, tømmertransport, uoffisiell",
    "beskrivelse" : "Angir bruksklasse for tømmertransport. Foreløpig versjon for intern bruk",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "BruksklasseTømmertrans",
    "sosinvdbnavn" : "BruksklasseTømmertrans_901",
    "sorteringsnummer" : 0
}, {
    "id" : 902,
    "navn" : "Bruksklasse, spesialtransport",
    "beskrivelse" : "Gjeldende bruksklasse for spesialtransport i vegliste.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "BruksklasseSpesialtran",
    "sosinvdbnavn" : "BruksklasseSpesialtran_902",
    "sorteringsnummer" : 0
}, {
    "id" : 903,
    "navn" : "Bruksklasse, spesialtransport, uoffisiell",
    "beskrivelse" : "Angir bruksklasse for spesialtransport. Foreløpig versjon for intern bruk",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "BruksklasseSpesialtran",
    "sosinvdbnavn" : "BruksklasseSpesialtran_903",
    "sorteringsnummer" : 0
}, {
    "id" : 904,
    "navn" : "Bruksklasse, normaltransport",
    "beskrivelse" : "Gjeldende bruksklasse for normaltransport i vegliste.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "BruksklasseNormaltrans",
    "sosinvdbnavn" : "BruksklasseNormaltrans_904",
    "sorteringsnummer" : 0
}, {
    "id" : 905,
    "navn" : "Bruksklasse, normaltransport, uoffisiell",
    "beskrivelse" : "Angir bruksklasse for normaltransport. Foreløpig versjon for intern bruk",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "BruksklasseNormaltrans",
    "sosinvdbnavn" : "BruksklasseNormaltrans_905",
    "sorteringsnummer" : 0
}, {
    "id" : 906,
    "navn" : "Elektrisk komponent (test)",
    "beskrivelse" : "Enkelt teknisk/elektrisk komponent, som f.eks. sikring, jordfeilautomat eller kommunikasjonsutstyr",
    "stedfesting" : "PUNKT",
    "veiledning" : "",
    "sosinavn" : "ElektriskKomponent_tes",
    "sosinvdbnavn" : "ElektriskKomponent_tes_906",
    "sorteringsnummer" : 0
}, {
    "id" : 907,
    "navn" : "Sykkelrute, hovednett by/tettsted",
    "beskrivelse" : "Hovedruter for sykling i byer og tettsteder. Rutene er normalt \"vedtatt\" i kommunedelplan eller kommunale temaplaner. Rutene er ofte utarbeidet i samarbeid mellom Statesn vegvesen og aktuell kommune.",
    "stedfesting" : "LINJE",
    "veiledning" : "",
    "sosinavn" : "SykkelruteHovednettByT",
    "sosinvdbnavn" : "SykkelruteHovednettByT_907",
    "sorteringsnummer" : 0
} ]

export{vegobjekttyper};

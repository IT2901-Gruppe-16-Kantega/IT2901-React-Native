
// SHOULD USE A FLUX OR REDUX STORE TO HOLD THE DATA THAT IS COLLECTED FROM SERVER


  WORK LIST:

  TODO
  - SearchView

  - Give feedback that input fylke er invalid
    - trenger mest sansylig bare å ha grået ut neste felt,
      kanskje med tekst: skriv inn gyldig fylke DONE!
  - gjør createInputField helt generisk DONE!
    flytte choosefylke() inn?

  - FINN UT HVORDAN HENTE SKILT BASERT PÅ FYLKE VEGKATEGORI OG VEGNUMMER!!!!
    - områdefilter, vegreferanse

  - fiks slik at vegkategori blir nullstilt når fylke blir nullstilt

  - flytt deklarering av vegkategorier fra utils til egen fil under data
  - fiks, dobbeltttouch for å velge fylke
  - endre all bruk av vei til veg, altså ordet DONE!
    MEEEEEN burde nok endre variablenavn veg til vegnummer

      NEW SEARCHVIEW
  - lag prefetch som finner ut hvor mange objekter som blir hentet: DONE!
  - fullfør søk
  - sett maksstørrelse på listview i whatContents
  - fiks usteended på listview, bruk bla renderSeparator
  - fiks slik at en kan velge flere vegobjekter, dersom det er noe vi skal kunne?


  - Move searchparamlabel inn i createInputField
  - slå samen styles whatContents og whereContents: DONE!

  - implement kommune valg, husk at en må kunne velge flere kommuner og at valg av kommune ikke er nødvendig


  - implementer reset searchParameters: DONE!
  - implementer clearData(): DONE!
  - legg til "min posisjon"
  - legg til v/g etc etter e/k i søk på veg
  - finn ut hva som skjer dersom man søker etter en vei som eksisterer, men som ikke er i fylket bruker har valgt, husk å skrive om i Test
  - legg til support for NVDB som ikke fungerer

    MAIN TODO prioritert liste
  - legg til i setting standardsøk, dette er nødvendig før vi begynner med endelig layout
  - fiks slik at appen åpnes på telefon,
  - fiks slik at data lagres når app lukkes

  - REMEBER TO WRITE ABOUT WHY WE HAVE CHOSEN THAT THE USER MUST BE ABLE TO KNOW ROAD NAME






  OLD! velg kommune, hent skilt over kommuner, vist skilt på kart
  - hent kommuner manuelt: DONE!
  - create fetch request based on chosen kommune: DONE!
  - lag en mer oversiktlig layout, med et felt for input mellom get data: DONE!
  - liste over kommuner legges i egn statisk fil som kan akesesseres og sjekkes
    import kommuner from data/kommuner.dat og hent kommuner derfra: DONE!
  - ta input kommunenummer eller navn og valider: DONE!
  - validering håndteres i en metode i fil under src/util: DEPRECATED!
  - valideringsfilen er eneste som aksesserer data: DONE!
  - lag mappe src/util og plasser wrapper der, same
    dette vil fungere mye bedre enn å velge fra en uendelig lang picker
    må kunne anta at bruker vet gyldige verdier: DEPRECATED!
    Ekstrafunksjonalitet vil være at bruker kan søke opp gyldige verdier

  - endre some() til find(), se notat route-chooes: 112
    ->lagde isteden løsning med BST: DONE!
  - rydd opp i koden: DONE!
  - URLparser som lager en url basert på valgt kommuneid og henter skilt: DONE!
  - hent skilt for valgt kommune ved getDataknappen: DONE!
  - endre layoutfarger til vegvesenets farger: DONEISH
  - fiks så fetching status blir endret til grønn hake nå data er fetchet
    da trenger vi ikke lenger vise den lange listen: ikke gjort, men ikke nødvendig

  - create url må legge til inkluder alle slik at coordinater også kommer med: DONE!
  - få til mapView, ta utgangspunkt i branch magnus-v1: DONE!
  - legg til mapview, kan plassere i dataArea: DONE!
  - plasser skilt på mapview: DONE!
  - plasser skilt på mapview i riktig posisjon: DONE!
  - bestem farge på kartmarkørene basert på egengeomtetri true/false: DONE!

  - state.region må endres når en velger kommune: DONE!
    - må først hente all kommuneinfo: DONE!
    https://www.vegvesen.no/nvdb/api/v2/omrader/kommuner?inkluder=kartutsnitt,senterpunkt&srid=4326&pretty

  - fiks state.region til Trondheim ved oppstart: DONE!
  - skru av alle debugshit før presentasjon: DONE!
  - vis map i første bilde, zoom in til riktig posisjon etter valgt kommune fetch
    ordens ved å  sette state.region: DONE!
  - legg til listener på tekstfeltet slik at en slipper trykke på knappen: DONE!

  - kartet tegnes nå mange ganger, og da lages også markers-listen mange ganger
    fiks så markerslisten ikke trenger å generes så mange ganger
    dette kan lages samtidig som objektene fetches fra server,
    altså at en generer markørposisjon når objektene hentes og legg til dette som eget felt per objekt
    se notat på tlf
    evt kan markersarray også lages samtidig som objects[] er blitt fetchet

  - fiks slik at view map endres til view data når den er klikket: DEPRECATED!
  - legg til slik at find-knappen har en then.fetchObjects+kan tilbakemelding, nå hentes objekter: DEPRECATED!
  -  har en when loading true state som settes true når ferdig, og da kalles vis skilt

  - loading, hent først antallet objekter, og gi tilbakemelding ettersom det blir hentet
  https://www.vegvesen.no/nvdb/api/v2/vegobjekter/96/statistikk?kommune=231: DONE!
  - fiks slik at en får tilbakemelding dersom inntastet data er feil: DONE!


  - Redux/FLUX
  - flytdiagram for programmet
    - og dataflyten
  - papirprototype,
  - implementer forms
    - formspage
      - children

  - bruker må bestemme lokasjon
    bestemmer lokasjonen på forhånd
    og sendes da til AR: DONE!

  - sett default kart til google maps, slik at api-key alltid er satt,
    dette fordi android bruker google maps som standard og den feiler da på android om ingen api-key er satt

  - Kan være det fungerer på nyeste versjon av react-native, duplikater betyr faktiske duplikater i filer, og det skal være enkelt å finne duplikatene

  - legg til søk på vegtyper først, E6 osv

  - clean up wrapper.js
  - fiks zoom-knapp på kart
  - endre fra senterpunkt til kartutsnitt
  - BST-biblioteket ser ikke bra ut. Implementer heller en binary search
  - kommunerfilen bør organiseres som en hash table, tree, eller no kjappere enn ren array


      -------NEW SHIT---------
  - endre slik at ny søk legges til appending, dette må til for å lagre søk: DONE!
  - kan hende vi bør ha loading screen før map vises, evt:!
    markers lages nå objektene er hentet, her har vi allerede lang ventetid som kan brukes
  - kan være vi bør ha en loading etter exit også, men dette gjelder kun dersom storing er false, da det er sletting av state som tar tid
  - gå gjennom gammel liste
  - fikset tastaturet slik at en får fjernet det, legg først til bekreftknapp slik det er i route-chooser
  - endre slik at ikke alle henter alle dataActions
  - fjern bruk av bst, erstatt med noe annet
  - endre slik at maks, 8000 objekter hentes istedenfor 1000
  - veg = e, r, f, k

  ---Nå--
  - fullfør searchReducer etc før jeg går over til storing search datavariables: DONE!


  - fiks så currentRoadSearchIndex settes riktig, kan gjøres ved index=allSearches.length: DEPRECATED!
  - rydd opp i dataReducer, remove setkommune etc

  - hva skjer om data er endret etter henting, kan hente ut endret siden
  - og kanskje iterere gjennom lagret søk-
    - plukke ut dem som det er lenge siden er endret
  - https://www.vegvesen.no/nvdb/api/v2/vegobjekter/96/endringer?type=endret&etter=2017-03-01

  - feilsøk om det er mulig treghet i wrapper
  - cluster markers
  labs.vegdata.no

  - Rapportview

  Legg til valg for inpu

  Sjekk hvordan åpne annen app i react native
  Sjekk HTTP lokal SERVER


  -- implementer flux-håndtering av state: DEPRECATED!

*/

function constructFetchRequest(
  //HOLD TYPE TIL SKILT FORELØPIG

  vegobjekttype_id, //type vegobjekt
  inkluder, //data som skal tas med, verdier [metadata, egenskaper, relasjoner, lokasjon, vegsegmenter, geometri, alle]
  useOmradefilter, //bool områdefilter er med i
  useEgenskapsfilter, //bool
  useOverlappfilter,  //bool
  antall, //paginering
  omradefilter,
  egenskapsfilter,
  overlappfilter,

 ){
   //code
}



//trenger funksjoner som henter basert på div valg

function fetchBasedOn_Omradefilter() {

}


/*
div functions that get kommuner etc


*/

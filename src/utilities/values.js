// The different types of comparators on object filters
export const comparators = {
  HAS_VALUE: "Har verdi",
  HAS_NOT_VALUE: "Har ikke verdi",
  LARGER_OR_EQUAL: ">=",
  SMALLER_OR_EQUAL: "<=",
  NOT_EQUAL: "!=",
  EQUAL: "=",
}

// The different kind of datatypes in the NVDB database
export const datatype = {
  flerverdiAttributtTekst: 30,
  tekst: 1,
  tall: 2,
  flerverdiattributtTall: 31,
  dato: 8,
  binaerObjekt: 27,
  geomPunkt: 17,
}

export const importance = {
  PAKREVD_ABSOLUTT: 1, // Et vegobjekt kan ikke lagres i NVDB uten at denne egenskapstypen har verdi
  PAKREVD: 2, // Egenskapstypen skal registreres, men vegobjekter som mangler verdi skal ikke avvises
  BETINGET: 3, // Egenskapstypens skal registreres, dersom det er relevant eller om gitte kriterier er oppfylt
  OPSJONELL: 4, // Det er frivillig å registrere egenskapstypen
  SPESIALINFORMASJON: 7, // Det er frivillig å registrere egenskapstypen
  HISTORISK: 9, // Egenskapstypen skal ikke registreres
}

export const facts = [
  "Visste du at det ofte er høyere fartsgrenser på bedre veier",
  "I 2016 var det 423 millioner oppslag mot NVDB",
  "Du finner et julenisseskilt i Drøbak",
]

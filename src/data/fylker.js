/**
* Contains static information about all fylker in Norway.
* The data is collected from NDVB, the file should be overwritten if fylker needs to be updated
*/

var fylker = [ {
    "navn" : "Østfold",
    "nummer" : 1,
    "region" : 1,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((58.76096038507337 10.593095158239631, 59.748195774816246 10.463524039977708, 59.790858844829245 11.937738766595745, 58.80198900939821 12.0253942410103, 58.76096038507337 10.593095158239631))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (59.319918885399844 11.203034940139048)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 2,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/2"
    }
}, {
    "navn" : "Akershus",
    "nummer" : 2,
    "region" : 1,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((59.46029291144784 10.385775799822861, 60.577143880012535 10.22709610295938, 60.62523912874997 11.847838567719386, 59.50627759078776 11.952895695083408, 59.46029291144784 10.385775799822861))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (60.048652792325896 11.299931207432488)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 3,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/3"
    }
}, {
    "navn" : "Oslo",
    "nummer" : 3,
    "region" : 1,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((59.79827126271723 10.518827200136641, 60.13028416670678 10.473672017766354, 60.14503558499094 10.927303894863075, 59.812827623777444 10.96796535828762, 59.79827126271723 10.518827200136641))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (59.97359497626979 10.773875373942092)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 4,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/4"
    }
}, {
    "navn" : "Hedmark",
    "nummer" : 4,
    "region" : 1,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((59.782807605890554 9.978588381929821, 62.67176550972463 9.494587432768746, 62.762133345086966 12.770129806771244, 59.863008601612734 12.96704854504102, 59.782807605890554 9.978588381929821))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (61.549802381163815 11.549875958101659)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 5,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/5"
    }
}, {
    "navn" : "Oppland",
    "nummer" : 5,
    "region" : 1,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((60.00864969668853 7.818012907873435, 62.30604125602668 7.272963915028339, 62.46116587091607 10.918413343329446, 60.14972619982825 11.208592485945807, 60.00864969668853 7.818012907873435))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (61.45914380149408 9.426070039020246)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 6,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/6"
    }
}, {
    "navn" : "Buskerud",
    "nummer" : 6,
    "region" : 2,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((59.30979991117214 7.663722165542374, 61.03573889730516 7.266160105498132, 61.181146958415354 10.456274726300293, 59.44540759223006 10.691576239625146, 59.30979991117214 7.663722165542374))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (60.33961150905232 9.21025715500723)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 8,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/8"
    }
}, {
    "navn" : "Vestfold",
    "nummer" : 7,
    "region" : 2,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((58.71397861777217 9.80691371650469, 59.67649386531756 9.65834263113992, 59.71115238050316 10.589228190787939, 58.74734370504713 10.712125386554568, 58.71397861777217 9.80691371650469))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (59.300690778043055 10.198305769959259)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 9,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/9"
    }
}, {
    "navn" : "Telemark",
    "nummer" : 8,
    "region" : 2,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((58.48780948626031 7.386254770035371, 60.122324831807 7.009619472317318, 60.25916913013179 9.734928918503726, 58.61605193470517 9.984809949231488, 58.48780948626031 7.386254770035371))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (59.45969752507935 8.513785061441089)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 10,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/10"
    }
}, {
    "navn" : "Aust-Agder",
    "nummer" : 9,
    "region" : 2,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((57.84699618107923 7.146406862162591, 59.64359231567321 6.72779270835294, 59.78883612429894 9.480351629738566, 57.98233608728518 9.761680834667803, 57.84699618107923 7.146406862162591))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (58.690829662804184 8.183906227988)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 11,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/11"
    }
}, {
    "navn" : "Vest-Agder",
    "nummer" : 10,
    "region" : 2,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((57.67229426845734 6.237177132702782, 59.11675763513657 5.868252602243923, 59.25594592228008 8.112391351782035, 57.803848747563926 8.392579342116516, 57.67229426845734 6.237177132702782))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (58.33817822235081 7.17383180966405)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 12,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/12"
    }
}, {
    "navn" : "Rogaland",
    "nummer" : 11,
    "region" : 3,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((57.93014752833204 4.853262867198391, 59.680083489840634 4.3231324772037505, 59.88182261665301 7.163841131267526, 58.118440723063756 7.5568229147742505, 57.93014752833204 4.853262867198391))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (59.16486168144885 6.030192271102033)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 14,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/14"
    }
}, {
    "navn" : "Hordaland",
    "nummer" : 12,
    "region" : 3,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((59.42335899130255 4.642835904602368, 60.89752570175352 4.162788640671628, 61.13136115091752 7.591533897374677, 59.64363465657222 7.923648651879424, 59.42335899130255 4.642835904602368))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (60.29995966735673 6.30693879030594)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 15,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/15"
    }
}, {
    "navn" : "Sogn og Fjordane",
    "nummer" : 14,
    "region" : 3,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((60.45576336574156 4.278859883408892, 62.2888894525792 3.624069095086886, 62.583278692706216 8.069211173193343, 60.728489796417975 8.474267519186348, 60.45576336574156 4.278859883408892))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (61.47217371864001 6.230882541168506)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 16,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/16"
    }
}, {
    "navn" : "Møre og Romsdal",
    "nummer" : 15,
    "region" : 4,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((61.84101062847549 4.998423131612659, 63.56330873034084 4.392490362754253, 63.84793305996738 9.423037381915059, 62.105295974194 9.746499595759557, 61.84101062847549 4.998423131612659))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (62.65528189135196 7.336248663096041)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 18,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/18"
    }
}, {
    "navn" : "Sør-Trøndelag",
    "nummer" : 16,
    "region" : 4,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((62.16457424896197 8.04207389356516, 64.62857412994586 7.415084524345839, 64.79361015367117 12.034743759027924, 62.31277441512627 12.282007889524365, 62.16457424896197 8.04207389356516))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (63.13997132421347 10.417004971327655)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 19,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/19"
    }
}, {
    "navn" : "Nord-Trøndelag",
    "nummer" : 17,
    "region" : 4,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((63.12539967611473 9.99487439591068, 65.43682234123641 9.556603475501213, 65.53315575816005 14.31530637604949, 63.2122900819752 14.370723114850945, 63.12539967611473 9.99487439591068))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (64.5050971596912 12.102333769733258)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 20,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/20"
    }
}, {
    "navn" : "Nordland",
    "nummer" : 18,
    "region" : 5,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((64.89462612828407 10.673155564708267, 69.52234475868234 9.75111718003389, 69.56907699667752 18.352799997371214, 64.93188649580738 17.76236366280113, 64.89462612828407 10.673155564708267))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (67.18833689210146 14.235560776405581)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 22,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/22"
    }
}, {
    "navn" : "Troms",
    "nummer" : 19,
    "region" : 5,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((68.42749755891185 15.588838764237474, 70.78420785536244 15.657754120129773, 70.59845594270689 23.267690908451407, 68.2635182308152 22.411573689370027, 68.42749755891185 15.588838764237474))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (69.453507818913 19.700674616267953)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 23,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/23"
    }
}, {
    "navn" : "Finnmark",
    "nummer" : 20,
    "region" : 5,
    "kartutsnitt" : {
        "wkt" : "POLYGON ((68.75255957924472 19.99583486384344, 71.67874180012247 20.761293116683266, 70.96242168668412 32.29109554571186, 68.13919218919594 30.094117886805492, 68.75255957924472 19.99583486384344))",
        "srid" : 4326
    },
    "senterpunkt" : {
        "wkt" : "POINT (70.35002249375 26.157155660812318)",
        "srid" : 4326
    },
    "vegobjekt" : {
        "id" : 24,
        "type" : 535,
        "href" : "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/535/24"
    }
} ]

export {fylker};

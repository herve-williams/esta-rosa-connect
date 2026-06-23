export type Priority = "high" | "medium" | "low";
export type Status = "new" | "contacted" | "interested" | "meeting" | "client" | "lost";

export interface Contact {
  id: number;
  name: string;
  phone: string;
  zone: string;
  rating: number;
  reviews: number;
  priority: Priority;
  sector: string;
  facebook: string;
  instagram: string;
  email: string;
  site: string;
  status: Status;
  notes: string;
  lastAction: string;
  subStart: string;
  subEnd: string;
}

export const STATUS_LABELS: Record<Status, string> = {
  new: "Nouveau",
  contacted: "Contacté",
  interested: "Intéressé",
  meeting: "RDV fixé",
  client: "Client",
  lost: "Perdu",
};

export const INITIAL_CONTACTS: Contact[] = [
{"id":1,"name":"Institut de Beauté GLADSTONE","phone":"+237677953893","zone":"Rue Tokoto","rating":4.8,"reviews":1378,"priority":"high","sector":"salon","facebook":"https://facebook.com/beaute.gladstone","instagram":"https://instagram.com/institutgladstone","email":"","site":"institut-de-beaute-gladstone-douala.business.site","status":"new","notes":"Leader au Cameroun, filiale Mark Andrew","lastAction":"","subStart":"","subEnd":""},
{"id":2,"name":"SMB Royal Beauty","phone":"+237656615663","zone":"Bali","rating":4.9,"reviews":7,"priority":"low","sector":"salon","facebook":"https://facebook.com/smbroyalbeauty","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":3,"name":"Beauté D'ici & D'ailleurs","phone":"+237690403010","zone":"Rue Ngosso Din","rating":4.8,"reviews":30,"priority":"medium","sector":"salon","facebook":"https://facebook.com/beaute.Dici.dailleurs","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":4,"name":"AUDREY BEAUTY SPA","phone":"+237697540845","zone":"Deido","rating":4.7,"reviews":19,"priority":"medium","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"Aucune présence digitale","lastAction":"","subStart":"","subEnd":""},
{"id":5,"name":"Sophie Glamour","phone":"+237699027227","zone":"Carrefour armée de l'air","rating":4.6,"reviews":100,"priority":"high","sector":"salon","facebook":"https://facebook.com/SophieGlamour12","instagram":"https://instagram.com/sophie_glamour_cm","email":"","site":"https://sophie-glamour.com","status":"new","notes":"9565 likes FB, 10+ ans","lastAction":"","subStart":"","subEnd":""},
{"id":6,"name":"THE KROWN BARBERSHOP","phone":"+237657709944","zone":"Rue Pasteur Edoube","rating":4.6,"reviews":45,"priority":"medium","sector":"salon","facebook":"https://facebook.com/TheKrownBarbershop","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":7,"name":"Beauty Lux","phone":"+237655562501","zone":"Rue Ngosso Din","rating":4.6,"reviews":62,"priority":"high","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"Aucune présence digitale - prospect idéal","lastAction":"","subStart":"","subEnd":""},
{"id":8,"name":"Dépilia Maison de beauté","phone":"+237670368495","zone":"Rue Foch","rating":4.6,"reviews":9,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":9,"name":"Niki Heat Beauty Studio","phone":"+237654311111","zone":"Sable","rating":4.6,"reviews":9,"priority":"high","sector":"salon","facebook":"https://facebook.com/NikiHeatBeautyStudio","instagram":"https://instagram.com/nikiheatbeautystudio","email":"","site":"https://nikiheat.com","status":"new","notes":"20998 likes FB, Academy","lastAction":"","subStart":"","subEnd":""},
{"id":10,"name":"Mahaza Beauty Yassa","phone":"+237659360889","zone":"Yassa","rating":4.5,"reviews":80,"priority":"high","sector":"salon","facebook":"","instagram":"","email":"welcome@mahazabeauty.com","site":"https://mahazabeauty.com","status":"new","notes":"48 employés, 4 centres, app mobile","lastAction":"","subStart":"","subEnd":""},
{"id":11,"name":"MOOD BEAUTY","phone":"+237695985877","zone":"Akwa","rating":4.5,"reviews":8,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":12,"name":"Hemivaky's Beauty","phone":"+237659227209","zone":"Bali","rating":4.4,"reviews":26,"priority":"medium","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":13,"name":"Posh Beauty Salon","phone":"+237656988844","zone":"Bonapriso","rating":4.4,"reviews":18,"priority":"medium","sector":"salon","facebook":"","instagram":"https://instagram.com/posh._beauty_salon","email":"","site":"","status":"new","notes":"9793 followers IG","lastAction":"","subStart":"","subEnd":""},
{"id":14,"name":"Jedaa Beauty","phone":"+237699180403","zone":"Bali","rating":4.3,"reviews":4,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":15,"name":"Evernice Beauty & SPA","phone":"+237655943326","zone":"Rue Tokoto","rating":4.3,"reviews":320,"priority":"high","sector":"salon","facebook":"https://facebook.com/evernicebeautyspa","instagram":"https://instagram.com/evernicebeauty","email":"","site":"http://evernicebeautyspa.com","status":"new","notes":"6227 likes FB","lastAction":"","subStart":"","subEnd":""},
{"id":16,"name":"Najal the beauty box","phone":"+237679765913","zone":"Rue Njo-Njo","rating":4.3,"reviews":36,"priority":"high","sector":"salon","facebook":"https://facebook.com/najalthebeautybox","instagram":"","email":"","site":"","status":"new","notes":"53983 likes FB! TikTok actif","lastAction":"","subStart":"","subEnd":""},
{"id":17,"name":"Hèle Beauty Studio","phone":"+237690852932","zone":"Rue de Verdun","rating":4.2,"reviews":10,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":18,"name":"Beroukhia Beauty Room","phone":"+237694603939","zone":"Bali","rating":4.1,"reviews":9,"priority":"low","sector":"salon","facebook":"","instagram":"https://instagram.com/beroukhia_beauty_room","email":"","site":"","status":"new","notes":"1608 followers IG","lastAction":"","subStart":"","subEnd":""},
{"id":19,"name":"EBONY HAIR CARE DOUALA","phone":"+237656692361","zone":"Akwa","rating":4.1,"reviews":103,"priority":"high","sector":"salon","facebook":"https://facebook.com/ebonyhaircaredouala","instagram":"https://instagram.com/ebonyhaircarecmr","email":"","site":"","status":"new","notes":"5539 likes FB, 1er salon nappy","lastAction":"","subStart":"","subEnd":""},
{"id":20,"name":"Mahaza beauty and spa","phone":"+237653667678","zone":"Bonapriso","rating":4.1,"reviews":59,"priority":"high","sector":"salon","facebook":"","instagram":"","email":"welcome@mahazabeauty.com","site":"https://mahazabeauty.com","status":"new","notes":"Même groupe Mahaza","lastAction":"","subStart":"","subEnd":""},
{"id":21,"name":"Ghomba Beauty","phone":"+237652141529","zone":"Douala","rating":4.0,"reviews":35,"priority":"medium","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"2 locations","lastAction":"","subStart":"","subEnd":""},
{"id":22,"name":"FALLY FASHION BALI","phone":"+237675971448","zone":"Bali","rating":4.0,"reviews":23,"priority":"medium","sector":"salon","facebook":"https://facebook.com/FallyFashionSaloon","instagram":"https://instagram.com/fallyfashionsaloon","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":23,"name":"Golden Beauty","phone":"+237683597473","zone":"Bonamoussadi","rating":4.0,"reviews":7,"priority":"low","sector":"salon","facebook":"","instagram":"https://instagram.com/institutgoldenbeauty","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":24,"name":"Ishango Spa & Académie","phone":"+237697970828","zone":"Face Hôtel Serena","rating":5.0,"reviews":5,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":25,"name":"Institut CL beauty","phone":"+237686048560","zone":"Rue Bertaut","rating":5.0,"reviews":4,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":26,"name":"BEAUTYLAND PREMIUM","phone":"+237657177842","zone":"Près Express Union","rating":5.0,"reviews":1,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":27,"name":"Endless Beauty","phone":"+237695858808","zone":"Bali-Nkomondo","rating":5.0,"reviews":9,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":28,"name":"B-SHO SKIN CLINIC","phone":"+237651873816","zone":"Bonamoussadi","rating":4.9,"reviews":69,"priority":"high","sector":"salon","facebook":"","instagram":"https://instagram.com/bsho_skin_clinic","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":29,"name":"THE COCOON","phone":"+237653761949","zone":"Bonamoussadi","rating":5.0,"reviews":44,"priority":"high","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"Aucune présence digitale - prospect idéal","lastAction":"","subStart":"","subEnd":""},
{"id":30,"name":"ULTIMATE BEAUTY SPA","phone":"+237697113339","zone":"Bonamoussadi","rating":4.5,"reviews":32,"priority":"medium","sector":"salon","facebook":"https://facebook.com/ultimatebeauty0","instagram":"https://instagram.com/ultimatebeautysalonofficiel","email":"ultimatebeautysalon0@gmail.com","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":31,"name":"Betuole Spa","phone":"+237690576932","zone":"Bonamoussadi","rating":4.4,"reviews":25,"priority":"medium","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":32,"name":"ELLA THE HOUSE OF BEAUTY","phone":"+237692623491","zone":"Bonamoussadi","rating":4.3,"reviews":23,"priority":"medium","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":33,"name":"Nature Divine Beauty & Spa","phone":"+237671139626","zone":"Bonamoussadi","rating":4.8,"reviews":20,"priority":"medium","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":34,"name":"Salon de beauté EQUILIBRE","phone":"+237655012665","zone":"Bonamoussadi","rating":4.3,"reviews":15,"priority":"medium","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":35,"name":"HAIR FORCE 1","phone":"+237675365342","zone":"Logpom","rating":4.3,"reviews":48,"priority":"medium","sector":"salon","facebook":"https://facebook.com/HhairForce1","instagram":"","email":"","site":"","status":"new","notes":"Chaîne ultra modern unisex","lastAction":"","subStart":"","subEnd":""},
{"id":36,"name":"Beauty Wocs","phone":"+237693535701","zone":"Makepe Bloc L","rating":5.0,"reviews":5,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":37,"name":"Orcy beauty","phone":"+237655018726","zone":"Bonamoussadi","rating":3.8,"reviews":5,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":38,"name":"Cyap Spa Center","phone":"+237694807526","zone":"Makepe","rating":4.5,"reviews":4,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":39,"name":"Luna's Beauty Institut","phone":"+237691884301","zone":"Deido","rating":5.0,"reviews":4,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":40,"name":"Kate Beauty Institute","phone":"+237671399688","zone":"Bonamoussadi","rating":4.0,"reviews":3,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":41,"name":"INSTITUT PERLE D'EBENE","phone":"+237679671095","zone":"Logpom Montana","rating":4.7,"reviews":3,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":42,"name":"LUMA beauty & spa","phone":"+237656034480","zone":"Av. Indépendance","rating":4.7,"reviews":3,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":43,"name":"Noe Beauty & Spa","phone":"+237652066366","zone":"Rond-point Maetur","rating":5.0,"reviews":1,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":44,"name":"Millenial Beauty Spa","phone":"+237681842244","zone":"Deido","rating":5.0,"reviews":1,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":45,"name":"Beauty bar by cecile","phone":"+237656149582","zone":"Kotto","rating":5.0,"reviews":1,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":46,"name":"Black is Beautiful Beauty Spa","phone":"+237682891580","zone":"Logpom","rating":5.0,"reviews":1,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":47,"name":"The boss empire","phone":"+237698882800","zone":"Bonamoussadi","rating":5.0,"reviews":1,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":48,"name":"BabyNash Beauty Conner","phone":"+237679824892","zone":"Ange Raphael","rating":5.0,"reviews":1,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":49,"name":"B & G Fashion","phone":"+237654221911","zone":"Logpom","rating":5.0,"reviews":1,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":50,"name":"Elise Hair & Beauty","phone":"+237693605455","zone":"Bonamoussadi","rating":4.0,"reviews":1,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"contact@elisehairandbeauty.com","site":"https://elisehairandbeauty.com","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":51,"name":"American Relaxing","phone":"+237697329579","zone":"Logpom","rating":4.0,"reviews":1,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":52,"name":"King&Queen Beauty","phone":"+237657559514","zone":"Logpom","rating":0,"reviews":0,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":53,"name":"SPECTRA BEAUTE CAMEROUN","phone":"+237699736671","zone":"Bonapriso","rating":4.5,"reviews":289,"priority":"high","sector":"salon","facebook":"https://facebook.com/spectrabeaute","instagram":"https://instagram.com/spectrabeaute","email":"","site":"https://spectrabeaute.com","status":"new","notes":"16021 likes FB, 23+ ans, leader CEMAC","lastAction":"","subStart":"","subEnd":""},
{"id":54,"name":"Mind Body and Soul SPA","phone":"+237695748112","zone":"Bonapriso","rating":4.3,"reviews":47,"priority":"high","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"10+ ans, aucune présence digitale","lastAction":"","subStart":"","subEnd":""},
{"id":55,"name":"SPARKLE lounge","phone":"+237655253928","zone":"Bonamoussadi","rating":4.7,"reviews":10,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":56,"name":"PALLADIUM SPA","phone":"+237694009769","zone":"Bonamoussadi","rating":4.6,"reviews":5,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":57,"name":"LOTUS Beauty and Wellness","phone":"+237699340962","zone":"Bonamoussadi","rating":5.0,"reviews":5,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":58,"name":"GODDIVA luxury collection & spa","phone":"+237698153113","zone":"Makepe","rating":4.7,"reviews":3,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":59,"name":"The SPECTRA Spa","phone":"+237651337281","zone":"Bonamoussadi","rating":5.0,"reviews":1,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":60,"name":"Paso Premium","phone":"+237679808255","zone":"Makepe","rating":5.0,"reviews":1,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":61,"name":"LOFT 237","phone":"+237697028981","zone":"Bonapriso","rating":4.3,"reviews":82,"priority":"high","sector":"salon","facebook":"https://facebook.com/leloftcmr","instagram":"https://instagram.com/loft_237","email":"leloftcmr@gmail.com","site":"","status":"new","notes":"Beauty+Fashion+Lounge","lastAction":"","subStart":"","subEnd":""},
{"id":62,"name":"Omega Spa","phone":"+237653146269","zone":"Bonamoussadi","rating":4.7,"reviews":65,"priority":"high","sector":"salon","facebook":"","instagram":"https://instagram.com/omegaspa237","email":"reservations@omegaspa237.com","site":"https://omegaspa237.com","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""},
{"id":63,"name":"Stellissima Spa","phone":"+237699709544","zone":"Bali","rating":3.8,"reviews":36,"priority":"medium","sector":"salon","facebook":"https://facebook.com/imstellissima","instagram":"https://instagram.com/stellissimaspa","email":"","site":"","status":"new","notes":"15985 likes FB","lastAction":"","subStart":"","subEnd":""},
{"id":64,"name":"KRYSTAL SPA DOUALA","phone":"+237656232993","zone":"Bonamoussadi","rating":4.8,"reviews":13,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"Spa hôtel Krystal","lastAction":"","subStart":"","subEnd":""},
{"id":65,"name":"AURA SPA CENTER","phone":"+237689374304","zone":"Makepe","rating":4.8,"reviews":13,"priority":"low","sector":"salon","facebook":"","instagram":"","email":"","site":"","status":"new","notes":"","lastAction":"","subStart":"","subEnd":""}
];

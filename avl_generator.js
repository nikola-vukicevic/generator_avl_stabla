/* -------------------------------------------------------------------------- */
/* - CONFIG:                                                                - */
/* -------------------------------------------------------------------------- */

const SVG_NS               = "http://www.w3.org/2000/svg";

// IVICE

var   ivicaDebljina        = 1.5;
var   ivicaBoja            = "#000";

// KRUGOVI

var   krugPoluprecnik1     = 16;
var   krugIvicaDebljina1   = 0.5;
var   krugIvicaBoja1       = "#000";
var   krugIspuna1          = "#083880";

var   krugPoluprecnik2     = 24;
var   krugIvicaDebljina2   = 0.5;
var   krugIvicaBoja2       = "#000";
var   krugIspuna2          = "#1070ff";

// TEKST (U KRUGOVIMA)

var   fontFamilija1        = "Montserrat, sans-serif";
var   fontFamilija1        = "Inconsolata, Consolas, monospace";
var   fontFamilija1        = "monospace";
var   fontFamilija1        = "sans-serif";
var   fontVelicina1        = "20px";
var   fontDebljina1        = 700;
var   fontBoja1            = "#fff";
var   fontOffsetY1         = -1;
var   fontOffsetYgpqy1     = -1;
   
var   fontFamilija2        = "Montserrat, sans-serif";
var   fontFamilija2        = "Inconsolata, Consolas, monospace";
var   fontFamilija2        = "monospace";
var   fontFamilija2        = "sans-serif";
var   fontVelicina2        = "24px";
var   fontDebljina2        = 400;
var   fontBoja2            = "#fff";
var   fontOffsetY2         = -1;
var   fontOffsetYgpqy2     = -3;

// TEKST NOTACIJE

var   fontFamilijaInfiks   = "Montserrat-Medium, sans-serif";
var   fontFamilijaInfiks   = "Inconsolata, Consolas, monospace";
var   fontVelicinaInfiks   = "22px";
var   fontDebljinaInfiks   = 700;
var   fontBojaInfiks       = "#1070ff";
var   fontOffsetXInfiks    = 20;
var   fontOffsetYInfiks    = 32;

var   fontFamilijaPrefiks  = "Montserrat-Medium, sans-serif";
var   fontFamilijaPrefiks  = "Inconsolata, Consolas, monospace";
var   fontVelicinaPrefiks  = "22px";
var   fontDebljinaPrefiks  = 700;
var   fontBojaPrefiks      = "#1070ff";
var   fontOffsetXPrefiks   = 20;
var   fontOffsetYPrefiks   = 64;

var   fontFamilijaPostfiks = "Montserrat-Medium, sans-serif";
var   fontFamilijaPostfiks = "Inconsolata, Consolas, monospace";
var   fontVelicinaPostfiks = "22px";
var   fontDebljinaPostfiks = 700;
var   fontBojaPostfiks     = "#1070ff";
var   fontOffsetXPostfiks  = 20;
var   fontOffsetYPostfiks  = 96;

// SVG_STABLO

var   svgPlatnoSirina      = "100%";
var   svgPlatnoVisina      = "800px";
var   stabloMarginaX       = 36;
var   stabloOffsetY        = 60;
var   razmakX              = 32;
var   razmakY              = 56;
var   kriticnaVisinaRazmak = 4;
var   dodatniRazmak        = 2;
var   KOREKCIJA            = 1000;

// GLAVNE STRUKTURE PODATAKA

var   BOJA_ISPUNA_1        = "#1070ff";
var   BOJA_ISPUNA_2        = "#10ff70";
var   BOJA_ISPUNA_3        = "#ff7070";
var   BOJA_IVICA_1         = "#000";
var   BOJA_IVICA_2         = "#000";
var   BOJA_IVICA_3         = "#000";
var   BOJA_TEKST_1         = "#fff";
var   BOJA_TEKST_2         = "#000";
var   DEBLJINA_IVICA_1     = 0.5;
var   DEBLJINA_IVICA_2     = 2.0;

var   BROJAC               = -1;
var   RED;
var   STEK;
var   STABLO;
var   LISTA_CVOROVA;
var   IZABRANI_CVOR;
var   ISPIS;

class Cvor {
	constructor (vrednost) {
		this.vrednost      = vrednost;
		this.X             = 0;
		this.Y             = 0;
		this.xPom          = 0;
		this.yPom          = 0;
		this.visina        = 1;
		this.sirinaLevi    = 0;
		this.sirinaDesni   = 0;
		this.sledeciLevi   = 0;
		this.sledeciDesni  = 0;
		this.predakX       = 0;
		this.predakY       = 0;
		this.predakOffsetX = 0;
		this.predakOffsetY = 0;
		this.balansFaktor  = 0;
		this.bojaIspuna    = BOJA_ISPUNA_1;
		this.bojaIvica     = BOJA_IVICA_1;
		this.bojaTekst     = BOJA_TEKST_1;
		this.debljinaIvica = DEBLJINA_IVICA_1;
		this.levi          = null;
		this.desni         = null;
	}
}

function azuriranjeStablaSirinaVisina(cvor) {
	//console.log(cvor);
	if(cvor == null) return;

	azuriranjeStablaSirinaVisina(cvor.levi);
	azuriranjeStablaSirinaVisina(cvor.desni);

	if(cvor.levi == null && cvor.desni == null) {
		cvor.sledeciLevi  = 0;
		cvor.sledeciDesni = 0;
		cvor.visina       = 1;
		cvor.sirinaLevi   = 0;
		cvor.sirinaDesni  = 0;
		//console.log(cvor.vrednost + " c: " + cvor.visina);
		return;
	}

	if(cvor.desni == null) {
		cvor.sledeciLevi  = cvor.levi.sirinaDesni + 1;
		cvor.sledeciDesni = 0;
		cvor.visina       = cvor.levi.visina + 1;
		cvor.sirinaLevi   = cvor.sledeciLevi  + cvor.levi.sirinaLevi;
		cvor.sirinaDesni  = 0;
		//console.log(cvor.vrednost + " cL: " + cvor.levi.visina + " c: " + cvor.visina);
		return;
	}

	if(cvor.levi == null) {
		cvor.sledeciDesni = cvor.desni.sirinaLevi + 1;
		cvor.sledeciLevi  = 0;
		cvor.visina       = cvor.desni.visina + 1;
		cvor.sirinaLevi   = 0;
		cvor.sirinaDesni  = cvor.sledeciDesni + cvor.desni.sirinaDesni;
		//console.log(cvor.vrednost + " cD: " + cvor.desni.visina + " c: " + cvor.visina);
		return;
	}

	cvor.sledeciLevi  = cvor.levi.sirinaDesni + 1;	
	cvor.sledeciDesni = cvor.desni.sirinaLevi + 1;	
	
	cvor.visina = (cvor.levi.visina > cvor.desni.visina)?
			       cvor.levi.visina  + 1 : 
			       cvor.desni.visina + 1;

	cvor.sirinaLevi  = cvor.sledeciLevi  + cvor.levi.sirinaLevi;
	cvor.sirinaDesni = cvor.sledeciDesni + cvor.desni.sirinaDesni;

	//console.log(cvor.vrednost + " cL: " + cvor.levi.visina + " cD: " + cvor.desni.visina + " c: " + cvor.visina);
}

function azuriranjeStablaXY() {
	let i;
	let visinaY = 1;
	RED = [];
	
	STABLO.X = stabloMarginaX + krugPoluprecnik2 + STABLO.sirinaLevi * razmakX;
	STABLO.Y = stabloOffsetY  +                    (visinaY - 1)     * razmakY;
	/*
	console.log("KOREN: " + STABLO.tekstSadrzaj + " " +
		         STABLO.sirinaLevi + " " +
		         STABLO.sirinaDesni);
	//*/

	if(STABLO.levi != null) {
		STABLO.levi.predakX       =  STABLO.X;
		STABLO.levi.predakY       =  STABLO.Y;
		STABLO.levi.predakOffsetX = -STABLO.sledeciLevi * razmakX;
		RED.push(STABLO.levi);
	}
	
	if(STABLO.desni != null) {
		STABLO.desni.predakX       = STABLO.X;
		STABLO.desni.predakY       = STABLO.Y;
		STABLO.desni.predakOffsetX = STABLO.sledeciDesni * razmakX;
		RED.push(STABLO.desni);
	}
	
	visinaY++;

	while(RED.length > 0) {
		let red_pom = [];

		for(i = 0; i < RED.length; i++) {
			let cv_pom = RED[i];
			cv_pom.X = cv_pom.predakX + cv_pom.predakOffsetX;
			cv_pom.Y = cv_pom.predakY + razmakY;

			if(cv_pom.levi != null) {
				cv_pom.levi.predakX       = cv_pom.X;
				cv_pom.levi.predakY       = cv_pom.Y;
				cv_pom.levi.predakOffsetX = -cv_pom.sledeciLevi * razmakX;
				red_pom.push(cv_pom.levi);
			}

			if(cv_pom.desni != null) {
				cv_pom.desni.predakX       = cv_pom.X;
				cv_pom.desni.predakY       = cv_pom.Y;
				cv_pom.desni.predakOffsetX = cv_pom.sledeciDesni * razmakX;
				red_pom.push(cv_pom.desni);
			}
			/*
			console.log(cv_pom.tekstSadrzaj +
				        " sL: "  + cv_pom.sirinaLevi  +
				        " sD: "  + cv_pom.sirinaDesni +
				        " cvH: " + cv_pom.visina);
			//*/
		}

		RED = [];
		RED = red_pom;
		visinaY++;
	}
}

function crtanjeStabla(svgObjekat) {
	let i;
	let visinaY = 1;
	RED = [];
	RED.push(STABLO);

	while(RED.length > 0) {
		let red_pom = [];

		for(i = 0; i < RED.length; i++) {
			crtanjeCvora(svgObjekat, RED[i]);
			
			if(RED[i].levi != null) {
				red_pom.push(RED[i].levi);
			}

			if(RED[i].desni != null) {
				red_pom.push(RED[i].desni);
			}
		}

		RED = [];
		RED = red_pom;
	}
}

function azuriranjeVisine(C) {
	if (C == null) return;
		
	if(C.levi == null && C.desni == null) {
		C.visina = 1;
		return;
	}
	
	if(C.levi == null) {
		C.visina = C.desni.visina + 1;
		//console.log(C.vrednost + "(" + C.visina + ")" + " " + C.desni.vrednost + "(" + C.desni.visina + ")");
		return;	
	}

	if(C.desni == null) {
		C.visina = C.levi.visina + 1;
		return;
	}
	
	C.visina = (C.levi.visina >= C.desni.visina)?
	            C.levi.visina  + 1 :
	            C.desni.visina + 1;
}

function azuriranjeBalansFaktora(C) {
	if(C == null) return;
	
	if(C.levi == null && C.desni == null) {
		C.balansFaktor = 0;
		return;
	}

	if(C.desni == null) {
		C.balansFaktor = C.levi.visina;
		return;
	}

	if(C.levi == null) {
		C.balansFaktor = -C.desni.visina;
		return;
	}

	C.balansFaktor = C.levi.visina - C.desni.visina;
}

function rotacijaLL(C) {
	//console.log("Rotacija LL " + C.vrednost + " " + C.levi.vrednost + " " + C.levi.levi.vrednost);
	B       = C.levi;
	C.levi  = B.desni;
	B.desni = C;

	azuriranjeVisine(C);
	azuriranjeBalansFaktora(C);
	azuriranjeVisine(B);
	azuriranjeBalansFaktora(B);

	return B;
}

function rotacijaLD(C) {
	//console.log("Rotacija LD " + C.vrednost + " " + C.levi.vrednost + " " + C.levi.desni.vrednost);
	P            = new Cvor(0);
	B            = C.levi.desni;
	P.levi       = B.levi; 
	P.desni      = B.desni;
	B.levi       = C.levi;
	B.desni      = C;
	B.levi.desni = P.levi;
	B.desni.levi = P.desni;
	
	azuriranjeVisine(C);
	azuriranjeBalansFaktora(C);
	azuriranjeVisine(B.levi);
	azuriranjeBalansFaktora(B.levi);
	azuriranjeVisine(B);
	azuriranjeBalansFaktora(B);

	return B;
}

function rotacijaDD(C) {
	//console.log("Rotacija DD " + C.vrednost + " " + C.desni.vrednost + " " + C.desni.desni.vrednost);
	B       = C.desni;
	C.desni = B.levi;
	B.levi  = C;

	azuriranjeVisine(C);
	azuriranjeBalansFaktora(C);
	azuriranjeVisine(B);
	azuriranjeBalansFaktora(B);

	return B;
}
	
function rotacijaDL(C) {
	//console.log("Rotacija DL " + C.vrednost + " " + C.desni.vrednost + " " + C.desni.levi.vrednost);
	P            = new Cvor(0);
	B            = C.desni.levi;
	P.levi       = B.levi;
	P.desni      = B.desni;
	B.desni      = C.desni; 
	B.levi       = C;
	B.desni.levi = P.desni;
	B.levi.desni = P.levi;

	azuriranjeVisine(C);
	azuriranjeBalansFaktora(C);
	azuriranjeVisine(B.desni);
	azuriranjeBalansFaktora(B.desni);
	azuriranjeVisine(B);
	azuriranjeBalansFaktora(B);

	return B;
}

function dodavanje(C, vrednost) {
	if(C == null) return new Cvor(vrednost);
		
	if(vrednost < C.vrednost) {
		C.levi = dodavanje(C.levi, vrednost);
	}
	else {
		if(vrednost > C.vrednost) {
			C.desni = dodavanje(C.desni, vrednost);
		}
		else {
			alert("Data vrednost već postoji u stablu (AVL stablo ne podržava duplikate).");
			return C;
		}
	}

	azuriranjeVisine(C);
	azuriranjeBalansFaktora(C);
	
	if(C.balansFaktor == 2  && C.levi.balansFaktor == 1) {
		return rotacijaLL(C);
	}

	if(C.balansFaktor == 2  && C.levi.balansFaktor == -1) {
		return rotacijaLD(C);
	}

	if(C.balansFaktor == -2 && C.desni.balansFaktor == -1) {
		return rotacijaDD(C);
	}

	if(C.balansFaktor == -2 && C.desni.balansFaktor == 1) {
		return rotacijaDL(C);
	}

	return C;
}

function obilazakPopunjavanjeListe(cvor, lista) {
	if(cvor == null) return;
	
	lista.push(cvor);

	obilazakPopunjavanjeListe(cvor.levi,  lista);
	obilazakPopunjavanjeListe(cvor.desni, lista);
}

function popunjavanjeListeCvorova() {
	//LISTA_CVOROVA = [];
	//obilazakPopunjavanjeListe(STABLO, LISTA_CVOROVA);
	//console.log(LISTA_CVOROVA);
}

function ispisTekstaSVG(svgObjekat) {
	var tekst;
	// INFIKS
	tekst = document.createElementNS(SVG_NS, "text");
    tekst.setAttribute("x",           fontOffsetXInfiks);
    tekst.setAttribute("y",           fontOffsetYInfiks);
    tekst.setAttribute("font-family", fontFamilijaInfiks);
    tekst.setAttribute("font-weight", fontDebljinaInfiks);
    tekst.setAttribute("font-size",   fontVelicinaInfiks);
    tekst.setAttribute("fill",        fontBojaInfiks);
    tekst.setAttribute("text-anchor",       "left");
    tekst.setAttribute("dominant-baseline", "central");
    tekst.textContent = generisanjeNotacijeInfiks();
    svgObjekat.appendChild(tekst);
    // PREFIKS
	tekst = document.createElementNS(SVG_NS, "text");
    tekst.setAttribute("x",           fontOffsetXPrefiks);
    tekst.setAttribute("y",           fontOffsetYPrefiks);
    tekst.setAttribute("font-family", fontFamilijaPrefiks);
    tekst.setAttribute("font-weight", fontDebljinaPrefiks);
    tekst.setAttribute("font-size",   fontVelicinaPrefiks);
    tekst.setAttribute("fill",        fontBojaPrefiks);
    tekst.setAttribute("text-anchor",       "left");
    tekst.setAttribute("dominant-baseline", "central");
    tekst.textContent = generisanjeNotacijePrefiks();
    svgObjekat.appendChild(tekst);
    // POSTFIKS
	tekst = document.createElementNS(SVG_NS, "text");
    tekst.setAttribute("x",           fontOffsetXPostfiks);
    tekst.setAttribute("y",           fontOffsetYPostfiks);
    tekst.setAttribute("font-family", fontFamilijaPostfiks);
    tekst.setAttribute("font-weight", fontDebljinaPostfiks);
    tekst.setAttribute("font-size",   fontVelicinaPostfiks);
    tekst.setAttribute("fill",        fontBojaPostfiks);
    tekst.setAttribute("text-anchor",       "left");
    tekst.setAttribute("dominant-baseline", "central");
    tekst.textContent = generisanjeNotacijePostfiks();
    svgObjekat.appendChild(tekst);
}

function crtanjeCvora(svgObjekat, cvor) {

    // LINIJA - LEVA

    var linijaLeva = document.createElementNS(SVG_NS, "line");

    linijaLeva.setAttribute("x1",           cvor.X);
    linijaLeva.setAttribute("y1",           cvor.Y);
    linijaLeva.setAttribute("x2",           cvor.X - cvor.sledeciLevi * razmakX);
    linijaLeva.setAttribute("y2",           cvor.Y + ((cvor.sledeciLevi > 0)? 1 : 0) * ((cvor.visina > 1)? razmakY : 0));
    linijaLeva.setAttribute("stroke",       ivicaBoja);
    linijaLeva.setAttribute("stroke-width", ivicaDebljina);

    // LINIJA - DESNA

    var linijaDesna = document.createElementNS(SVG_NS, "line");

    linijaDesna.setAttribute("x1",           cvor.X);
    linijaDesna.setAttribute("y1",           cvor.Y);
    linijaDesna.setAttribute("x2",           cvor.X + cvor.sledeciDesni * razmakX);
    linijaDesna.setAttribute("y2",           cvor.Y + ((cvor.sledeciDesni > 0)? 1 : 0) * ((cvor.visina > 1)? razmakY : 0));
    linijaDesna.setAttribute("stroke",       ivicaBoja);
    linijaDesna.setAttribute("stroke-width", ivicaDebljina);

    // KRUG

    var krug = document.createElementNS(SVG_NS, "circle");

    krug.setAttribute("cx",           cvor.X);
    krug.setAttribute("cy",           cvor.Y);
    krug.setAttribute("r",            ((cvor.tip == 1)? krugPoluprecnik1   : krugPoluprecnik2));
    krug.setAttribute("stroke",       cvor.bojaIvica);
    krug.setAttribute("stroke-width", cvor.debljinaIvica);
    krug.setAttribute("fill",         cvor.bojaIspuna);

    // TEKST

    var tekst       = document.createElementNS(SVG_NS, "text");
    var koordinataY = cvor.Y +  fontOffsetY2;
    tekst.setAttribute("x", cvor.X);
    tekst.setAttribute("y", koordinataY);
    tekst.setAttribute("font-family", fontFamilija2);
    tekst.setAttribute("font-weight", fontDebljina2);
    tekst.setAttribute("font-size",   fontVelicina2);
    tekst.setAttribute("fill",        cvor.bojaTekst);
    tekst.setAttribute("text-anchor",       "middle");
    tekst.setAttribute("dominant-baseline", "central");
    tekst.textContent = cvor.vrednost;
    
    svgObjekat.appendChild(linijaLeva);
    svgObjekat.appendChild(linijaDesna);
    svgObjekat.appendChild(krug);
    svgObjekat.appendChild(tekst);
}

function osvezavanjePrikaza() {
	let svg_platno = document.getElementById("svg_platno");
	let sirina     = svg_platno.clientWidth;
	svg_platno.style.maxWidth = sirina + "px";

	var svg1       = document.createElementNS(SVG_NS, "svg");
	
	crtanjeStabla(svg1);

	svgPlatnoSirina = ((STABLO.sirinaLevi + STABLO.sirinaDesni) * razmakX +
		              2 * stabloMarginaX+
		              2 * krugPoluprecnik2) + "px";
	svgPlatnoVisina = (STABLO.visina * razmakY + stabloOffsetY) + "px";
	
	svg1.setAttribute("width",  svgPlatnoSirina);
	svg1.setAttribute("height", svgPlatnoVisina);
    document.getElementById("svg_platno").innerHTML = "";
    document.getElementById("svg_platno").appendChild(svg1);
}

function dodavanjeNovogCvora() {
	var vrednost = parseInt(document.getElementById("forma_avl_cvor_dodavanje").value);
	document.getElementById("forma_avl_cvor_dodavanje").value = "";
	
	//VRATITI
	if(isNaN(vrednost))               return;
	if(BROJAC == -1 && (vrednost < 0 || vrednost > 99)) return;
	
	// VRATITI
	STABLO = dodavanje(STABLO, vrednost);
	
	azuriranjeStablaSirinaVisina(STABLO);
	//console.log(STABLO);
	azuriranjeStablaXY();
	//popunjavanjeListeCvorova();
	osvezavanjePrikaza();
	
	//citanjeStabla();
	//citanjeReda();
}

function uklanjanjeCvoraIzStabla() {
	var vrednost   = parseInt(document.getElementById("forma_avl_cvor_uklanjanje").value);
	if(vrednost < 0 || vrednost > 99) return;

	STABLO = uklanjanjeCvora(STABLO, vrednost);
	
	azuriranjeStablaSirinaVisina(STABLO);
	azuriranjeStablaXY();
	////popunjavanjeListeCvorova();
	osvezavanjePrikaza();
	//citanjeStabla();
	//citanjeReda();
}

function pretraga(cvor, vrednost) {
	if(cvor == null) return null;

	if(vrednost == cvor.vrednost) {
		return cvor;
	}

	if(vrednost < cvor.vrednost) {
		return pretraga(cvor.levi, vrednost);
	}

	if(vrednost > cvor.vrednost) {
		return pretraga(cvor.desni, vrednost);
	}
}

function pronalazenjeSukcesora(cvor) {
	P = cvor;
	while(P.levi != null) {
		P = P.levi;
	}
	//console.log(P.vrednost);
	return P;
}

function uklanjanjeCvora(cvor, vrednost) {
	if(cvor == null) {
		alert("Navedeni čvor ne postoji u stablu.");
		return cvor;
	}

	if(vrednost < cvor.vrednost) {
		//console.log("Ukl - manji: " + cvor.vrednost + " " + vrednost);
		cvor.levi = uklanjanjeCvora(cvor.levi, vrednost);
	}

	if(vrednost > cvor.vrednost) {
		//console.log("Ukl - veći: " + cvor.vrednost + " " + vrednost);
		cvor.desni = uklanjanjeCvora(cvor.desni, vrednost);
	}

	if(vrednost == cvor.vrednost) {
		if(cvor.levi == null && cvor.desni == null) {
			//console.log("== " + cvor.vrednost + " " + vrednost);
			P1 = null;
		}
		
		if(cvor.levi != null && cvor.desni == null) {
			//console.log("!= " + cvor.vrednost + " " + vrednost);
			P1 = cvor.levi;
		}

		if(cvor.levi == null && cvor.desni != null) {
			//console.log("=! " + cvor.vrednost + " " + vrednost);
			P1 = cvor.desni;
		}

		if(cvor.levi != null && cvor.desni != null) {
			//console.log("!! " + cvor.vrednost + " " + vrednost);
			P2            = pronalazenjeSukcesora(cvor.desni);
			cvor.vrednost = P2.vrednost;
			cvor.desni    = uklanjanjeCvora(cvor.desni, P2.vrednost);
		}	
		else {
			cvor = P1;
		}
	}

	if (cvor == null) return cvor;

	azuriranjeVisine(cvor);
	azuriranjeBalansFaktora(cvor);

	if(cvor.balansFaktor > 1 && cvor.levi.balansFaktor > 0) {
		return rotacijaLL(cvor);
	}

	if(cvor.balansFaktor > 1 && cvor.levi.balansFaktor <= 0) {
		return rotacijaLD(cvor);
	}

	if(cvor.balansFaktor < -1 && cvor.desni.balansFaktor < 0) {
		return rotacijaDD(cvor);
	}

	if(cvor.balansFaktor < -1 && cvor.desni.balansFaktor >= 0) {
		return rotacijaDL(cvor);
	}

	return cvor;
}

function proveraPoklapanja(x, y, lista) {
	cvor = lista[0];




	if(IZABRANI_CVOR != null) {
		if(proveraPoklapanjaCvor(x, y, cvor)) {
			return;
		}
		else {
			uklanjanjeInfo();
			return;
		}
	}


	if(lista == null) return;

	let i, d = lista.length;

	for(i = 0; i < d; i++) {
		cvor = lista[i];
		
		if(proveraPoklapanjaCvor(x, y, cvor)) {
			return;
		}
	}

	if(i == d) {
		uklanjanjeInfo();
	}
}

function proveraPoklapanjaCvor(x, y, cvor) {

	if(cvor == null) {
		//console.log("null");
		//uklanjanjeInfo();
		return;
	}

	let a, b, c;

	if(IZABRANI_CVOR != null) {
		a = x - IZABRANI_CVOR.X;
		b = y - IZABRANI_CVOR.Y;
		c = Math.sqrt(a * a + b * b);	

		if(c <= krugPoluprecnik2) {
			//console.log(str);
			//prikazInfo(IZABRANI_CVOR);
			return;
		}
		else {
			uklanjanjeInfo();
			return;
		}
	}

	//
	//str += cvor.vrednost + ", ";

	//console.log("X: " + x + " Y: " + y + " cvor: " + cvor.vrednost);

	a = x - cvor.X;
	b = y - cvor.Y;
	c = Math.sqrt(a * a + b * b);

	if(c <= krugPoluprecnik2) {
		//console.log(str);
		prikazInfo(cvor);
		return;
	}

	if(y <= cvor.Y) {
		//console.log("null");
		//uklanjanjeInfo();
		return;
	}

	if(x >= cvor.X) {
		proveraPoklapanjaCvor(x, y, cvor.desni);
	}
	else {
		proveraPoklapanjaCvor(x, y, cvor.levi);
	}
}

function pokretKursora(e) {
	const p = e.currentTarget.getBoundingClientRect();
	let   x = Math.floor(e.clientX - p.left) + e.currentTarget.scrollLeft;
	let   y = Math.floor(e.clientY - p.top)  + e.currentTarget.scrollTop;

	//document.getElementById("info_x").innerHTML = "X: " + x;
	//document.getElementById("info_y").innerHTML = "Y: " + y;

	proveraPoklapanjaCvor(x, y, STABLO);
	//proveraPoklapanja(x, y, LISTA_CVOROVA);
}

function prikazInfo(cvor) {
	IZABRANI_CVOR = cvor;
	IZABRANI_CVOR.bojaIspuna    = BOJA_ISPUNA_2;
	IZABRANI_CVOR.bojaIvica     = BOJA_IVICA_2;
	IZABRANI_CVOR.bojaTekst     = BOJA_TEKST_2;
	IZABRANI_CVOR.debljinaIvica = DEBLJINA_IVICA_2;
	//document.getElementById("info_1").innerHTML        = "Cvor: " + cvor.vrednost;
	document.getElementById("svg_platno").style.cursor = "pointer";
	//uklanjanjeCvora(STABLO, IZABRANI_CVOR.vrednost);
	osvezavanjePrikaza();
}

function uklanjanjeInfo() {
	if(IZABRANI_CVOR == null) return;

	//document.getElementById("info_1").innerHTML        = "Cvor: ";
	document.getElementById("svg_platno").style.cursor = "initial";
	//console.log(IZABRANI_CVOR);
	IZABRANI_CVOR.bojaIspuna    = BOJA_ISPUNA_1;
	IZABRANI_CVOR.bojaIvica     = BOJA_IVICA_1;
	IZABRANI_CVOR.bojaTekst     = BOJA_TEKST_1;
	IZABRANI_CVOR.debljinaIvica = DEBLJINA_IVICA_1;
	osvezavanjePrikaza();
	IZABRANI_CVOR = null;
}

function klikNaPlatno() {
	if(IZABRANI_CVOR == null) return;

	IZABRANI_CVOR.bojaIspuna = BOJA_ISPUNA_3;
	osvezavanjePrikaza();
}

function klikPlatnoOtpust() {
	if(IZABRANI_CVOR == null) return;

	if(STABLO.levi == null && STABLO.desni == null) {
		alert("Ne damo Vam da obrišete taj jedini čvor! :)");
		return;
	}

	STABLO = uklanjanjeCvora(STABLO, IZABRANI_CVOR.vrednost);
	azuriranjeStablaSirinaVisina(STABLO);
	azuriranjeStablaXY();
	//popunjavanjeListeCvorova();
	osvezavanjePrikaza();
}
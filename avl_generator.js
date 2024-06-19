/* -------------------------------------------------------------------------- */
/* Copyright (C) 2020. codeblog.rs                                            */
/* -------------------------------------------------------------------------- */
import { CONFIG, SVG_PLATNO, STRUCT } from './avl_config.js'
/* -------------------------------------------------------------------------- */
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
		this.bojaIspuna    = CONFIG.bojaIspuna1;
		this.bojaIvica     = CONFIG.bojaIvica1;
		this.bojaTekst     = CONFIG.bojaTekst1;
		this.debljinaIvica = CONFIG.debljinaIvica1;
		this.levi          = null;
		this.desni         = null;
	}
}

function azuriranjeStablaSirinaVisina(cvor) {
	if (cvor == null) return;

	azuriranjeStablaSirinaVisina(cvor.levi);
	azuriranjeStablaSirinaVisina(cvor.desni);

	if (cvor.levi == null && cvor.desni == null) {
		cvor.sledeciLevi  = 0;
		cvor.sledeciDesni = 0;
		cvor.visina       = 1;
		cvor.sirinaLevi   = 0;
		cvor.sirinaDesni  = 0;
		//console.log(cvor.vrednost + " c: " + cvor.visina);
		return;
	}

	if (cvor.desni == null) {
		cvor.sledeciLevi  = cvor.levi.sirinaDesni + 1;
		cvor.sledeciDesni = 0;
		cvor.visina       = cvor.levi.visina + 1;
		cvor.sirinaLevi   = cvor.sledeciLevi  + cvor.levi.sirinaLevi;
		cvor.sirinaDesni  = 0;
		//console.log(cvor.vrednost + " cL: " + cvor.levi.visina + " c: " + cvor.visina);
		return;
	}

	if (cvor.levi == null) {
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

function azuriranjeStablaXY(obj, platno, config) {
	let i;
	let visinaY = 1;
	obj.red     = [ ];
	
	obj.stablo.X = platno.marginaX + config.krugPoluprecnik2 + obj.stablo.sirinaLevi * platno.razmakX;
	obj.stablo.Y = platno.offsetY  +                           (visinaY - 1)         * platno.razmakY;
	/*
	console.log("KOREN: " + STABLO.tekstSadrzaj + " " +
		         STABLO.sirinaLevi + " " +
		         STABLO.sirinaDesni);
	//*/

	if (obj.stablo.levi != null) {
		obj.stablo.levi.predakX       =  obj.stablo.X;
		obj.stablo.levi.predakY       =  obj.stablo.Y;
		obj.stablo.levi.predakOffsetX = -obj.stablo.sledeciLevi * platno.razmakX;
		obj.red.push(obj.stablo.levi);
	}
	
	if (obj.stablo.desni != null) {
		obj.stablo.desni.predakX       = obj.stablo.X;
		obj.stablo.desni.predakY       = obj.stablo.Y;
		obj.stablo.desni.predakOffsetX = obj.stablo.sledeciDesni * platno.razmakX;
		obj.red.push(obj.stablo.desni);
	}
	
	visinaY++;

	while (obj.red.length > 0) {
		let red_pom = [ ];

		for (i = 0; i < obj.red.length; i++) {
			let cv_pom = obj.red[i];
			cv_pom.X = cv_pom.predakX + cv_pom.predakOffsetX;
			cv_pom.Y = cv_pom.predakY + platno.razmakY;

			if (cv_pom.levi != null) {
				cv_pom.levi.predakX       = cv_pom.X;
				cv_pom.levi.predakY       = cv_pom.Y;
				cv_pom.levi.predakOffsetX = -cv_pom.sledeciLevi * platno.razmakX;
				red_pom.push(cv_pom.levi);
			}

			if (cv_pom.desni != null) {
				cv_pom.desni.predakX       = cv_pom.X;
				cv_pom.desni.predakY       = cv_pom.Y;
				cv_pom.desni.predakOffsetX = cv_pom.sledeciDesni * platno.razmakX;
				red_pom.push(cv_pom.desni);
			}
			/*
			console.log(cv_pom.tekstSadrzaj +
				        " sL: "  + cv_pom.sirinaLevi  +
				        " sD: "  + cv_pom.sirinaDesni +
				        " cvH: " + cv_pom.visina);
			//*/
		}

		obj.red = [ ];
		obj.red = red_pom;
		visinaY++;
	}
}

function crtanjeStabla(svgObjekat, obj, platno, config) {
	let i;
	let visinaY = 1;
	obj.red = [ ];
	obj.red.push(obj.stablo);

	while (obj.red.length > 0) {
		let red_pom = [ ];

		for (i = 0; i < obj.red.length; i++) {
			crtanjeCvora(svgObjekat, obj.red[i], platno, config);
			
			if (obj.red[i].levi != null) {
				red_pom.push(obj.red[i].levi);
			}

			if (obj.red[i].desni != null) {
				red_pom.push(obj.red[i].desni);
			}
		}

		obj.red = [ ];
		obj.red = red_pom;
	}
}

function azuriranjeVisine(C) {
	if (C == null) return;
		
	if (C.levi == null && C.desni == null) {
		C.visina = 1;
		return;
	}
	
	if (C.levi == null) {
		C.visina = C.desni.visina + 1;
		//console.log(C.vrednost + "(" + C.visina + ")" + " " + C.desni.vrednost + "(" + C.desni.visina + ")");
		return;	
	}

	if (C.desni == null) {
		C.visina = C.levi.visina + 1;
		return;
	}
	
	C.visina = (C.levi.visina >= C.desni.visina)?
	            C.levi.visina  + 1 :
	            C.desni.visina + 1;
}

function azuriranjeBalansFaktora(C) {
	if (C == null) return;
	
	if (C.levi == null && C.desni == null) {
		C.balansFaktor = 0;
		return;
	}

	if (C.desni == null) {
		C.balansFaktor = C.levi.visina;
		return;
	}

	if (C.levi == null) {
		C.balansFaktor = -C.desni.visina;
		return;
	}

	C.balansFaktor = C.levi.visina - C.desni.visina;
}

function rotacijaLL(C) {
	//console.log("Rotacija LL " + C.vrednost + " " + C.levi.vrednost + " " + C.levi.levi.vrednost);
	let B   = C.levi;
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
	let P        = new Cvor(0);
	let B        = C.levi.desni;
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
	let B   = C.desni;
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
	let P        = new Cvor(0);
	let B        = C.desni.levi;
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
	if (C == null) return new Cvor(vrednost);

	if (vrednost < C.vrednost) {
		C.levi = dodavanje(C.levi, vrednost);
	}
	else {
		if (vrednost > C.vrednost) {
			C.desni = dodavanje(C.desni, vrednost);
		}
		else {
			alert("Data vrednost već postoji u stablu (AVL stablo ne podržava duplikate).");
			return C;
		}
	}

	azuriranjeVisine(C);
	azuriranjeBalansFaktora(C);
	
	if (C.balansFaktor == 2  && C.levi.balansFaktor == 1) {
		return rotacijaLL(C);
	}

	if (C.balansFaktor == 2  && C.levi.balansFaktor == -1) {
		return rotacijaLD(C);
	}

	if (C.balansFaktor == -2 && C.desni.balansFaktor == -1) {
		return rotacijaDD(C);
	}

	if (C.balansFaktor == -2 && C.desni.balansFaktor == 1) {
		return rotacijaDL(C);
	}

	return C;
}

function obilazakPopunjavanjeListe(cvor, lista) {
	if (cvor == null) return;
	
	lista.push(cvor);

	obilazakPopunjavanjeListe(cvor.levi,  lista);
	obilazakPopunjavanjeListe(cvor.desni, lista);
}

function popunjavanjeListeCvorova() {
	//LISTA_CVOROVA = [ ];
	//obilazakPopunjavanjeListe(STABLO, LISTA_CVOROVA);
	//console.log(LISTA_CVOROVA);
}

function ispisTekstaSVG(svgObjekat) {
	let tekst;
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

function crtanjeCvora(svgObjekat, cvor, platno, config) {

    // LINIJA - LEVA

    let linijaLeva = document.createElementNS(config.svgNs, "line");

    linijaLeva.setAttribute("x1",           cvor.X);
    linijaLeva.setAttribute("y1",           cvor.Y);
    linijaLeva.setAttribute("x2",           cvor.X - cvor.sledeciLevi * platno.razmakX);
    linijaLeva.setAttribute("y2",           cvor.Y + ((cvor.sledeciLevi > 0)? 1 : 0) * ((cvor.visina > 1)? platno.razmakY : 0));
    linijaLeva.setAttribute("stroke",       config.ivicaBoja);
    linijaLeva.setAttribute("stroke-width", config.ivicaDebljina);

    // LINIJA - DESNA

    let linijaDesna = document.createElementNS(config.svgNs, "line");

    linijaDesna.setAttribute("x1",           cvor.X);
    linijaDesna.setAttribute("y1",           cvor.Y);
    linijaDesna.setAttribute("x2",           cvor.X + cvor.sledeciDesni * platno.razmakX);
    linijaDesna.setAttribute("y2",           cvor.Y + ((cvor.sledeciDesni > 0)? 1 : 0) * ((cvor.visina > 1)? platno.razmakY : 0));
    linijaDesna.setAttribute("stroke",       config.ivicaBoja);
    linijaDesna.setAttribute("stroke-width", config.ivicaDebljina);

    // KRUG

    let krug = document.createElementNS(config.svgNs, "circle");

    krug.setAttribute("cx",           cvor.X);
    krug.setAttribute("cy",           cvor.Y);
    krug.setAttribute("r",            ((cvor.tip == 1)? config.krugPoluprecnik1 : config.krugPoluprecnik2));
    krug.setAttribute("stroke",       cvor.bojaIvica);
    krug.setAttribute("stroke-width", cvor.debljinaIvica);
    krug.setAttribute("fill",         cvor.bojaIspuna);

    // TEKST

    let tekst       = document.createElementNS(config.svgNs, "text");
    let koordinataY = cvor.Y +  config.fontOffsetY2;
    tekst.setAttribute("x", cvor.X);
    tekst.setAttribute("y", koordinataY);
    tekst.setAttribute("font-family", config.fontFamilija2);
    tekst.setAttribute("font-weight", config.fontDebljina2);
    tekst.setAttribute("font-size",   config.fontVelicina2);
    tekst.setAttribute("fill",        cvor.bojaTekst);
    tekst.setAttribute("text-anchor",       "middle");
    tekst.setAttribute("dominant-baseline", "central");
    tekst.textContent = cvor.vrednost;
    
    svgObjekat.appendChild(linijaLeva);
    svgObjekat.appendChild(linijaDesna);
    svgObjekat.appendChild(krug);
    svgObjekat.appendChild(tekst);
}

function osvezavanjePrikaza(obj, platno, config) {
	let svg_platno = document.getElementById("svg_platno");
	let sirina     = svg_platno.clientWidth;
	svg_platno.style.maxWidth = sirina + "px";

	let svg1       = document.createElementNS(config.svgNs, "svg");
	
	crtanjeStabla(svg1, obj, platno, config);

	platno.sirina = ((obj.stablo.sirinaLevi + obj.stablo.sirinaDesni) * platno.razmakX +
		              2 * platno.marginaX+
		              2 * config.krugPoluprecnik2) + "px";
	platno.visina = (obj.stablo.visina * platno.razmakY + platno.offsetY) + "px";
	
	svg1.setAttribute("width",  platno.sirina);
	svg1.setAttribute("height", platno.visina);
    document.getElementById("svg_platno").innerHTML = "";
    document.getElementById("svg_platno").appendChild(svg1);
}

function dodavanjeNovogCvora(obj, platno, config) {
	let vrednost = parseInt(document.getElementById("forma_avl_cvor_dodavanje").value);
	document.getElementById("forma_avl_cvor_dodavanje").value = "";
	
	//VRATITI
	if (isNaN(vrednost))               return;
	if (obj.brojac == -1 && (vrednost < 0 || vrednost > 99)) return;
	// TODO
	
	// VRATITI
	obj.stablo = dodavanje(obj.stablo, vrednost);
	
	azuriranjeStablaSirinaVisina(obj.stablo);
	//console.log(STABLO);
	azuriranjeStablaXY(obj, platno, config);
	//popunjavanjeListeCvorova();
	osvezavanjePrikaza(obj, platno, config);
	document.getElementById("forma_avl_cvor_dodavanje").focus();
	
	//citanjeStabla();
	//citanjeReda();
}

function uklanjanjeCvoraIzStabla(obj, platno, config) {
	let vrednost   = parseInt(document.getElementById("forma_avl_cvor_uklanjanje").value);
	if (vrednost < 0 || vrednost > 99) return;

	obj.stablo = uklanjanjeCvora(obj.stablo, vrednost);
	
	azuriranjeStablaSirinaVisina(obj.stablo);
	azuriranjeStablaXY(obj, platno, config);
	////popunjavanjeListeCvorova();
	osvezavanjePrikaza(obj, platno, config);
	//citanjeStabla();
	//citanjeReda();
}

function pretraga(cvor, vrednost) {
	if (cvor == null) return null;

	if (vrednost == cvor.vrednost) {
		return cvor;
	}

	if (vrednost < cvor.vrednost) {
		return pretraga(cvor.levi, vrednost);
	}

	if (vrednost > cvor.vrednost) {
		return pretraga(cvor.desni, vrednost);
	}
}

function pronalazenjeSukcesora(cvor) {
	let P = cvor;
	while (P.levi != null) {
		P = P.levi;
	}
	//console.log(P.vrednost);
	return P;
}

function uklanjanjeCvora(cvor, vrednost) {
	let P1;

	if (cvor == null) {
		alert("Navedeni čvor ne postoji u stablu.");
		return cvor;
	}

	if (vrednost < cvor.vrednost) {
		//console.log("Ukl - manji: " + cvor.vrednost + " " + vrednost);
		cvor.levi = uklanjanjeCvora(cvor.levi, vrednost);
	}

	if (vrednost > cvor.vrednost) {
		//console.log("Ukl - veći: " + cvor.vrednost + " " + vrednost);
		cvor.desni = uklanjanjeCvora(cvor.desni, vrednost);
	}

	if (vrednost == cvor.vrednost) {
		if (cvor.levi == null && cvor.desni == null) {
			//console.log("== " + cvor.vrednost + " " + vrednost);
			P1 = null;
		}
		
		if (cvor.levi != null && cvor.desni == null) {
			//console.log("!= " + cvor.vrednost + " " + vrednost);
			P1 = cvor.levi;
		}

		if (cvor.levi == null && cvor.desni != null) {
			//console.log("=! " + cvor.vrednost + " " + vrednost);
			P1 = cvor.desni;
		}

		if (cvor.levi != null && cvor.desni != null) {
			//console.log("!! " + cvor.vrednost + " " + vrednost);
			let P2        = pronalazenjeSukcesora(cvor.desni);
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

	if (cvor.balansFaktor > 1 && cvor.levi.balansFaktor > 0) {
		return rotacijaLL(cvor);
	}

	if (cvor.balansFaktor > 1 && cvor.levi.balansFaktor <= 0) {
		return rotacijaLD(cvor);
	}

	if (cvor.balansFaktor < -1 && cvor.desni.balansFaktor < 0) {
		return rotacijaDD(cvor);
	}

	if (cvor.balansFaktor < -1 && cvor.desni.balansFaktor >= 0) {
		return rotacijaDL(cvor);
	}

	return cvor;
}

function proveraPoklapanja(x, y, lista, obj, platno, config) {
	let cvor = lista[0];

	if (IZABRANI_CVOR != null) {
		if (proveraPoklapanjaCvor(x, y, cvor, obj, platno, config)) {
			return;
		}
		else {
			uklanjanjeInfo(obj, platno, config);
			return;
		}
	}

	if (lista == null) return;

	let i, d = lista.length;

	for (i = 0; i < d; i++) {
		cvor = lista[i];
		
		if (proveraPoklapanjaCvor(x, y, cvor, obj, platno, config)) {
			return;
		}
	}

	if (i == d) {
		uklanjanjeInfo(obj, platno, config);
	}
}

function proveraPoklapanjaCvor(x, y, cvor, obj, platno, config) {
	if (cvor == null) {
		//console.log("null");
		//uklanjanjeInfo();
		return;
	}

	let a, b, c;

	if (obj.izabraniCvor != null) {
		a = x - obj.izabraniCvor.X;
		b = y - obj.izabraniCvor.Y;
		c = Math.sqrt(a * a + b * b);	

		if (c <= config.krugPoluprecnik2) {
			//console.log(str);
			//prikazInfo(IZABRANI_CVOR);
			return;
		}
		else {
			uklanjanjeInfo(obj, platno, config);
			return;
		}
	}

	//
	//str += cvor.vrednost + ", ";

	//console.log("X: " + x + " Y: " + y + " cvor: " + cvor.vrednost);

	a = x - cvor.X;
	b = y - cvor.Y;
	c = Math.sqrt(a * a + b * b);

	if (c <= config.krugPoluprecnik2) {
		//console.log(str);
		prikazInfo(cvor, obj, platno, config);
		return;
	}

	if (y <= cvor.Y) {
		//console.log("null");
		//uklanjanjeInfo();
		return;
	}

	if (x >= cvor.X) {
		proveraPoklapanjaCvor(x, y, cvor.desni, obj, platno, config);
	}
	else {
		proveraPoklapanjaCvor(x, y, cvor.levi, obj, platno, config);
	}
}

function pokretKursora(e, obj, platno, config) {
	const p = e.currentTarget.getBoundingClientRect();
	let   x = Math.floor(e.clientX - p.left) + e.currentTarget.scrollLeft;
	let   y = Math.floor(e.clientY - p.top)  + e.currentTarget.scrollTop;

	//document.getElementById("info_x").innerHTML = "X: " + x;
	//document.getElementById("info_y").innerHTML = "Y: " + y;

	// !!! TODO
	proveraPoklapanjaCvor(x, y, obj.stablo, obj, platno, config);
	//proveraPoklapanja(x, y, LISTA_CVOROVA);
}

function prikazInfo(cvor, obj, platno, config) {
	obj.izabraniCvor = cvor;
	obj.izabraniCvor.bojaIspuna    = config.bojaIspuna2;
	obj.izabraniCvor.bojaIvica     = config.bojaIvica2;
	obj.izabraniCvor.bojaTekst     = config.bojaTekst2;
	obj.izabraniCvor.debljinaIvica = config.debljinaIvica2;
	//document.getElementById("info_1").innerHTML        = "Cvor: " + cvor.vrednost;
	document.getElementById("svg_platno").style.cursor = "pointer";
	//uklanjanjeCvora(STABLO, IZABRANI_CVOR.vrednost);
	osvezavanjePrikaza(obj, platno, config);
}

function uklanjanjeInfo(obj, platno, config) {
	if (obj.izabraniCvor == null) return;

	//document.getElementById("info_1").innerHTML        = "Cvor: ";
	document.getElementById("svg_platno").style.cursor = "initial";
	//console.log(IZABRANI_CVOR);
	obj.izabraniCvor.bojaIspuna    = config.bojaIspuna1;
	obj.izabraniCvor.bojaIvica     = config.bojaIvica1;
	obj.izabraniCvor.bojaTekst     = config.bojaTekst1;
	obj.izabraniCvor.debljinaIvica = config.debljinaIvica1;
	osvezavanjePrikaza(obj, platno, config);
	obj.izabraniCvor = null;
}

function klikNaPlatno(obj, platno, config) {
	if (obj.izabraniCvor == null) return;

	obj.izabraniCvor.bojaIspuna = config.bojaIspuna3;
	osvezavanjePrikaza(obj, platno, config);
}

function klikPlatnoOtpust(obj, platno, config) {
	if (obj.izabraniCvor == null) return;

	if (obj.stablo.levi == null && obj.stablo.desni == null) {
		alert("Ne damo Vam da obrišete taj jedini čvor! :)");
		return;
	}

	obj.stablo = uklanjanjeCvora(obj.stablo, obj.izabraniCvor.vrednost);
	azuriranjeStablaSirinaVisina(obj.stablo);
	azuriranjeStablaXY(obj, platno, config);
	//popunjavanjeListeCvorova();
	osvezavanjePrikaza(obj, platno, config);
}

document.getElementById("forma_avl_cvor_dodavanje").addEventListener("focus", iskljucivanjePrecica)
document.getElementById("forma_avl_cvor_dodavanje").addEventListener("blur",  ukljucivanjePrecica)
document.getElementById("dugme_avl_pokretanje").addEventListener("click",     ( ) => { dodavanjeNovogCvora(STRUCT, SVG_PLATNO, CONFIG) } )
document.getElementById("svg_platno").addEventListener("mousemove", (e) => { pokretKursora(e, STRUCT, SVG_PLATNO, CONFIG) } )
document.getElementById("svg_platno").addEventListener("mousedown", ( ) => { klikNaPlatno(STRUCT, SVG_PLATNO, CONFIG) } )
document.getElementById("svg_platno").addEventListener("mouseup",   ( ) => { klikPlatnoOtpust(STRUCT, SVG_PLATNO, CONFIG) } )


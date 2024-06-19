/* -------------------------------------------------------------------------- */
/* Copyright (C) 2020. codeblog.rs                                            */
/* -------------------------------------------------------------------------- */
export const CONFIG = {
	svgNs: "http://www.w3.org/2000/svg",

	// IVICE

	ivicaDebljina: 1.5,
	ivicaBoja:     "#000",

	// KRUGOVI

	krugPoluprecnik1:   16,
	krugIvicaDebljina1: 0.5,
	krugIvicaBoja1:     "#000",
	krugIspuna1:        "#083880",

	krugPoluprecnik2:   24,
	krugIvicaDebljina2: 0.5,
	krugIvicaBoja2:     "#000",
	krugIspuna2:        "#1070ff",

	// TEKST (U KRUGOVIMA)

	fontFamilija1:    "Montserrat, sans-serif",
	fontFamilija1:    "Inconsolata, Consolas, monospace",
	fontFamilija1:    "monospace",
	fontFamilija1:    "sans-serif",
	fontVelicina1:    "20px",
	fontDebljina1:    700,
	fontBoja1:        "#fff",
	fontOffsetY1:     -1,
	fontOffsetYgpqy1: -1,
	   
	fontFamilija2:    "Montserrat, sans-serif",
	fontFamilija2:    "Inconsolata, Consolas, monospace",
	fontFamilija2:    "monospace",
	fontFamilija2:    "sans-serif",
	fontVelicina2:    "24px",
	fontDebljina2:    400,
	fontBoja2:        "#fff",
	fontOffsetY2:     -1,
	fontOffsetYgpqy2: -3,

	// TEKST NOTACIJE

	fontFamilijaInfiks: "Montserrat-Medium, sans-serif",
	fontFamilijaInfiks: "Inconsolata, Consolas, monospace",
	fontVelicinaInfiks: "22px",
	fontDebljinaInfiks: 700,
	fontBojaInfiks:     "#1070ff",
	fontOffsetXInfiks:  20,
	fontOffsetYInfiks:  32,

	fontFamilijaPrefiks: "Montserrat-Medium, sans-serif",
	fontFamilijaPrefiks: "Inconsolata, Consolas, monospace",
	fontVelicinaPrefiks: "22px",
	fontDebljinaPrefiks: 700,
	fontBojaPrefiks:     "#1070ff",
	fontOffsetXPrefiks:  20,
	fontOffsetYPrefiks:  64,

	fontFamilijaPostfiks: "Montserrat-Medium, sans-serif",
	fontFamilijaPostfiks: "Inconsolata, Consolas, monospace",
	fontVelicinaPostfiks: "22px",
	fontDebljinaPostfiks: 700,
	fontBojaPostfiks:     "#1070ff",
	fontOffsetXPostfiks:  20,
	fontOffsetYPostfiks:  96,

	bojaIspuna1:    "#1070ff",
	bojaIspuna2:    "#10ff70",
	bojaIspuna3:    "#ff7070",
	bojaIvica1:     "#000",
	bojaIvica2:     "#000",
	bojaIvica3:     "#000",
	bojaTekst1:     "#fff",
	bojaTekst2:     "#000",
	debljinaIvica1: 0.5,
	debljinaIvica2: 2.0
}

export let SVG_PLATNO = {
	sirina:               "100%",
	visina:               "800px",
	marginaX:             36,
	offsetY:              60,
	razmakX:              32,
	razmakY:              56,
	kriticnaVisinaRazmak: 4,
	dodatniRazmak:        2,
	korekcija:            1000
}

export let STRUCT = {
	brojac:       -1,
	red:          null,
	stek:         null,
	stablo:       null,
	listaCvorova: null,
	izabraniCvor: null,
	ispis:        null
}


/* Copyright 2023 Hassan El anabi (al-annabi.tech) */

export default function makeDict(defaultLanguage, translations) {
    let lang = localStorage.getItem("lang") ?? defaultLanguage;

    for (const translation of Object.values(translations)) {
            translation.node = new Text(translation[lang]);
    }

    return {
	dict(phraseAlias) {
	    return translations[phraseAlias].node;
	},

	setLang(newLang) {
	    if (lang === newLang) return;
	    
            lang = newLang;
            localStorage.setItem("lang", newLang);

	    for (const translation of Object.values(translations)) {
                translation.node.textContent = translation[lang];
            }
	}
    };
}

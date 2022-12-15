/* Copyright 2022 Hassan El anabi (al-annabi.tech) */

window.onpopstate = () => {
    window.dispatchEvent(new Event("_URLChange"));
};

/** Get the element matching current URL from a Map of routes */
function route(routes) {
    for (let [pattern, value] of routes) {
	if (pattern.test(location.pathname)) {
	    if (typeof value === "function") {
		routes.set(pattern, value = value());
	    }

	    return value;
	}
    }
}

/** Make a routed element -- Dynamically replaced upon URL changes. */
export function router(routes) {
    let current = route(routes);

    window.addEventListener("_URLChange", () => {
	const match = route(routes);
	if (current !== match) {
	    current.replaceWith(current = match);
	    current.dispatchEvent(new Event("_connect"));
	}
    });

    return current;
}

/** Visit an internal link */
export function navigate(path) {
    if (location.pathname !== path) {
	history.pushState(null, "", path);
	window.dispatchEvent(new Event("_URLChange"));
    }
}

function checkSubPath(ref, sub) {
    return ref === sub || sub.startsWith(ref + "/");
}

/** Make an internal link */
export function link(path, ...content) {
    const a = document.createElement("a");
    a.setAttribute("href", path);
    a.append(...content);

    a.onclick = event => {
	event.preventDefault();
	navigate(path);
    };

    if (checkSubPath(path, location.pathname)) {
	a.setAttribute("data-open", "");
    }

    window.addEventListener("_URLChange", () => {
	if (checkSubPath(path, location.pathname)
	    !== a.hasAttribute("data-open")) {
	    a.toggleAttribute("data-open");
	}
    });

    return a;			    
}

export function parseSearchParams() {
    if (!location.search) return {};

    return Object.fromEntries(
	location.search
	    .slice(1)	// remove '?'
	    .split("&")
	    .map(param => param.split("=")));
}

/* Copyright 2022 Hassan El anabi (al-annabi.tech) */

/** Construct elements */
export default function cons(tag, attributes, cb, ...content) {
    const element = document.createElement(tag);
    const args = Array.from(arguments).slice(1); // Remove tag

    // Handle attributes
    if (args[0]?.constructor.name === "Object") {
	for (const [attr, val] of Object.entries(args[0])) {
	    if (attr.startsWith("on") && attr.length > 2) {
		// Add event handler
		element[attr] = val;
	    } else {
		element.setAttribute(attr, val);
	    }
	}
	args.shift();
    }

    if (typeof args[0] === "function") {
	args[0](element);
	args.shift();
    }

    element.append(...args);
    return element;
}

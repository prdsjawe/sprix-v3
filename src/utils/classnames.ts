export default (...classes: (string | boolean | null | undefined)[]) =>
	classes.filter(Boolean).join(" ").trim().replace(/\s+/g, " ");

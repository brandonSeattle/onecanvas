module.exports = (componentName) => ({
	content: `@import "../variables.scss";
@import "../typography.scss";

.${componentName} {
  @include font-defaults;
}
`,
	extension: `.scss`,
});

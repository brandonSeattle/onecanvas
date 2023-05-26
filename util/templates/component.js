module.exports = (componentName) => ({
	content: `import React from "react";

import "./${componentName}.scss";

const ${componentName} = () => {
	return (
		<div data-testid="${componentName}" className="${componentName}">${componentName}</div>
	)
};

export default ${componentName};

`,
	extension: `.js`,
});

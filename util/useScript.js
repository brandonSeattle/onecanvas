import { useEffect, useState } from 'react';

const useScript = (src, name, head = false, cb) => {
	const [status, setStatus] = useState(false);
	useEffect(() => {
		let checkPoint = document.getElementById(`#${name}`);
		if (checkPoint) {
			const externalScript = document.createElement('script');
			externalScript.id = name;
			externalScript.async = true;
			externalScript.src = src;
			externalScript.type = 'text/javascript';
			externalScript.crossorigin = 'anonymous';
			externalScript.onerror = (e) => {
				console.log('error: ', e);
			};
			if (head) {
				document.head.insertAdjacentElement('beforeend', externalScript);
			} else {
				document.body.appendChild(externalScript);
			}
			cb(true);
		}
	}, []);

	return status;
};

export { useScript };

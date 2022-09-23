import React from 'react';
import Button from './Button';
import Footer from './Footer';
import ErrorMessage from './views/ErrorMessage';

const Invalid = () => {
	function close() {
		if (typeof window !== 'undefined') {
			window.parent.postMessage('close', '*');
		}
	}

	return (
		<div className="space">
			<ErrorMessage message="We could not start this transaction, Invalid Merchant Selected" />
			<Footer>
				<Button label="Close" onClick={close} />
			</Footer>
		</div>
	);
};

export default Invalid;

import { useCallback, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Button from './Button';

const Recaptcha = (props) => {
	const { executeRecaptcha } = useGoogleReCaptcha();

	const handleReCaptchaVerify = useCallback(async () => {
		if (!executeRecaptcha) {
			console.log('Execute recaptcha not yet available');
			return;
		}

		const token = await executeRecaptcha('yourAction');
	}, [executeRecaptcha]);

	useEffect(() => {
		handleReCaptchaVerify();
	}, [handleReCaptchaVerify]);

	return <Button onClick={handleReCaptchaVerify} {...props} />;
};

export default Recaptcha;

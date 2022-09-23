import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCreditLimitAPI } from 'api';
import { appSelector, setActivePage, setCreditLimit } from 'slices/app';
import ErrorMessage from './ErrorMessage';
import Footer from 'components/Footer';
import Button from 'components/Button';

const Loader = () => {
	const dispatch = useDispatch();
	const { isExisting, otpData, merchantData } = useSelector(appSelector);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		getLimit();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function getLimit() {
		if (merchantData && otpData) {
			setErrorMessage(null);
			const { key, merchantId, orderReference, amount } = merchantData;
			const { userId } = otpData?.data;
			const payload = {
				key,
				merchantId,
				amount,
				userId,
				orderReference,
			};

			const response = await getCreditLimitAPI(payload);
			const data = response?.data;
			const status = response?.error?.status;
			const statusCode = response?.data?.statusCode;

			if (response?.error && status !== 200 && statusCode === '0200') {
				dispatch(setActivePage('eligible'));
				return;
			} else {
				if ((response?.error && status !== 200) || statusCode !== '0100') {
					setErrorMessage(data ? data?.message : response?.error?.data?.message);
				} else {
					dispatch(setCreditLimit(data));
					if (amount > data?.plans[0]?.usableLimit) {
						dispatch(setActivePage('insufficient'));
						return;
					}
					isExisting ? dispatch(setActivePage('pay_in_30')) : dispatch(setActivePage('congrats'));
				}
			}
		}
	}

	return (
		<div className="tabContent">
			{!errorMessage ? (
				<div className="loader">
					<div className="loader__content">
						<img src="/images/loader.gif" width="305" height="305" alt="loader placeholder" />
						<p className="loader__caption">Please wait... Verifying your details.</p>
					</div>
				</div>
			) : (
				<>
					<div className="form__space">
						<ErrorMessage message={errorMessage} />
					</div>
					<Footer>
						<Button label="Retry" onClick={getLimit} />
					</Footer>
				</>
			)}
		</div>
	);
};

export default Loader;

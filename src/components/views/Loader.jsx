/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCreditLimitAPI } from 'api';

const Loader = ({ isExiting, setCreditLimit, otpData, merchantDataObj, next }) => {
	useEffect(() => {
		getLimit();
	}, []);

	async function getLimit() {
		if (otpData && merchantDataObj && !isExiting) {
			const { key, merchantId, orderReference, amount } = merchantDataObj;
			const { userId } = otpData?.data;
			const payload = {
				key,
				merchantId,
				amount,
				userId,
				orderReference,
			};

			const response = await getCreditLimitAPI(payload);

			if (response?.statusCode === '0100') {
				setCreditLimit(response);
				next('pay_in_30');
			} else {
			}
		} else {
			setTimeout(() => {
				next('pay_in_30');
			}, 2000);
		}
	}

	return (
		<div className="tabContent">
			<div className="loader">
				<div className="loader__content">
					<img src="/images/loader.gif" width="305" height="305" alt="loader placeholder" />
					<p className="loader__caption">Please wait... Verifying your details.</p>
				</div>
			</div>
		</div>
	);
};

Loader.propTypes = {
	next: PropTypes.func,
};

export default Loader;

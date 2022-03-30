import { useState } from 'react';
import PropTypes from 'prop-types';
import PinInput from 'react-pin-input';
import { useForm } from 'react-hook-form';

import { verifyOtpAPI } from 'api';

import Button from 'components/Button';
import Footer from 'components/Footer';

const PhoneOTP = ({ otpData, merchantDataObj, isExisting, setLoaderStep, next }) => {
	const { handleSubmit } = useForm();
	const [pin, setPin] = useState(null);
	const [pinError, setPinError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	async function onSubmit() {
		if (pin?.length === 6 && !pinError) {
			if (!isExisting && otpData && merchantDataObj) {
				setIsLoading(true);
				const { userId, otpRefNo } = otpData?.data;
				const { key, merchantId, orderReference } = merchantDataObj;
				const payload = {
					key,
					merchantId,
					userId,
					otpRefNo,
					orderReference,
					otp: pin,
				};

				const response = await verifyOtpAPI(payload);
				const status = response?.statusCode;

				if (status !== '0100') {
					setIsLoading(false);
					setPinError(response?.message);
					return;
				}

				if (status === '0100') {
					setIsLoading(false);
					setPinError(null);
					setLoaderStep('congrats');
					next('loader');
				}
			} else {
				setLoaderStep('pay_in_30');
				next('loader');
			}
		}
	}

	return (
		<div className="tabContent">
			<div className="pin-box">
				<form onSubmit={handleSubmit(onSubmit)} className="form">
					<p className="form__caption">Enter {otpData?.message}</p>
					<div className="mb-long">
						<div className="form-pin-box">
							<PinInput
								length={6}
								type="numeric"
								inputMode="number"
								style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
								inputStyle={{
									borderColor: `${pinError ? '#ff4e4e' : '#fff'}`,
									backgroundColor: '#fff',
									width: '55px',
									height: '55px',
									fontSize: '36px',
								}}
								onComplete={(value) => setPin(value)}
								autoSelect={true}
								focus={true}
								regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
							/>
						</div>
					</div>
					{pinError && <div className="form-error-msg">{pinError}</div>}
					<Footer>
						<Button type="submit" loading={isLoading} />
					</Footer>
				</form>
			</div>
		</div>
	);
};

PhoneOTP.propTypes = {
	otpData: PropTypes.any,
	merchantDataObj: PropTypes.any,
	setLoaderStep: PropTypes.func,
	isExisting: PropTypes.bool,
	next: PropTypes.func,
};

export default PhoneOTP;

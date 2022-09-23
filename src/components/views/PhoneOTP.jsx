import { useState } from 'react';
import PinInput from 'react-pin-input';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { verifyOtpAPI } from 'api';

import Button from 'components/Button';
import Footer from 'components/Footer';
import { appSelector, setActivePage } from 'slices/app';

const PhoneOTP = () => {
	const dispatch = useDispatch();
	const { otpData, merchantData } = useSelector(appSelector);
	const { handleSubmit } = useForm();
	const [pin, setPin] = useState(null);
	const [pinError, setPinError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	async function onSubmit() {
		if (pin?.length === 6) {
			if (otpData && merchantData) {
				setIsLoading(true);
				const { userId, otpRefNo } = otpData?.data;
				const { key, merchantId, orderReference } = merchantData;
				const payload = {
					key,
					merchantId,
					userId,
					otpRefNo,
					orderReference,
					otp: pin,
				};

				const response = await verifyOtpAPI(payload);
				const status = response?.error?.status;

				if (response?.error && status !== 200) {
					setIsLoading(false);
					setPinError(response?.error?.data?.message);
					return;
				} else {
					setIsLoading(false);
					setPinError(null);
					dispatch(setActivePage('loader'));
				}
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
						<Button label={pinError ? 'Retry' : 'Proceed'} type="submit" loading={isLoading} />
					</Footer>
				</form>
			</div>
		</div>
	);
};

export default PhoneOTP;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePage } from 'slices/app';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import Footer from 'components/Footer';
import Button from 'components/Button';

const ExistingUserVerification = () => {
	const dispatch = useDispatch();
	const [phone, setPhone] = useState(null);
	const [phoneError, setPhoneError] = useState(null);

	async function onSubmit(e) {
		if (!phone && !phoneError) {
			setPhoneError(`You haven't entered your phone number`);
			return;
		}

		if (phone && !phoneError) {
			dispatch(setActivePage('phone_otp'));
		}
	}

	function validateNo(number) {
		const regex = /^(?:(?:(?:\+?234(?:h1)?|01)h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/;

		if (regex.test(number)) {
			setPhoneError('');
			setPhone({ number });
		} else {
			setPhoneError(`Enter a valid phone number`);
		}
	}

	return (
		<div className="tabContent">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit();
				}}
				className="form"
			>
				<div className="form__space">
					<div className="form-box">
						<label htmlFor="bvn" className="form-label">
							Frenn Registered Mobile Number
						</label>
						<div className={`form-input ${phoneError ? 'form-error' : ''}`}>
							<PhoneInput
								country={'ng'}
								disableCountryGuess
								countryCodeEditable={false}
								dropdownStyle={{
									fontWeight: 'normal',
									fontFamily: `'Inter', sans-serif`,
								}}
								onChange={(value) => validateNo(value)}
								className="react-phone-input"
							/>
						</div>
						{phoneError && <div className="form-error-msg">{phoneError}</div>}
					</div>
				</div>
				<Footer className="footer-71">
					<p className="agreement">
						By clicking proceed you agree to <a href="/">Frenn credit agreement</a>
					</p>
					<Button type="submit" />
				</Footer>
			</form>
		</div>
	);
};

export default ExistingUserVerification;

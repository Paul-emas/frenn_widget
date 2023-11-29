/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import isEmail from 'is-email';
import publicIp from 'public-ip';

import { ReactComponent as BVNIcon } from '../../../assets/svgs/bvn.svg';
import { ReactComponent as CalendarIcon } from '../../../assets/svgs/calendar.svg';

import { createNewMerchantAPI } from 'api';
import { appSelector, setActivePage, setActiveTab, setOtpData, setError } from 'slices/app';

import Footer from '../../Footer';
import Recaptcha from 'components/Recaptcha';
import ErrorMessage from '../ErrorMessage';

const NewUserBVN = () => {
	const dispatch = useDispatch();
	const { merchantData } = useSelector(appSelector);
	const [errorMessage, setErrorMessage] = useState('');
	const [step, setStep] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [seonToken, setSeonToken] = useState(null);
	const [ipAddress, setIpAddress] = useState(null);
	const [buttonLabel, setButtonLabel] = useState('Proceed');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const errorsLength = Object.keys(errorMessage).length;

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://cdn.seondf.com/js/v4/agent.js';
		script.async = true;
		script.onload = async () => {
			const seonData = await seon?.getBase64Session();
			setSeonToken(seonData);
		};

		document.getElementById('root').appendChild(script);

		async function getUserIP() {
			const ip = await publicIp.v4();
			setIpAddress(ip);
		}

		getUserIP();
	}, []);

	function validateDOB(dob) {
		const today = new Date().getFullYear();
		const dobYear = new Date(dob).getFullYear();
		const minAge = 18;
		if (dobYear >= today) {
			return 'The DOB you’ve entered is incorrect.';
		} else if (today - dobYear <= minAge) {
			return 'Minimum age should be 18 years or More...';
		}
		return;
	}

	async function onSubmit(formData) {
		if (formData) {
			if (merchantData) {
				if (errorMessage && errorMessage?.length > 0) {
					dispatch(setError(null));

					if (step === 1) {
						setStep(0);
						setErrorMessage('');
						setButtonLabel('Proceed');
						return;
					}

					if (step === 2) {
						dispatch(setActiveTab('existing_user'));
						dispatch(setActivePage('existing_user'));
						return;
					}
				}

				setIsLoading(true);
				const { bvn, email, dob } = formData;
				const { key, merchantId, orderReference } = merchantData;
				const payload = {
					bvn,
					email,
					key,
					merchantId,
					orderReference,
					dob,
					seonSessionId: seonToken,
					ipAddress: ipAddress,
				};

				const response = await createNewMerchantAPI(payload);
				const data = response?.data;
				const statusCode = response?.data?.statusCode;
				const status = response?.error?.status;

				if (response?.error && status !== 200) {
					setIsLoading(false);
					setErrorMessage(data ? data?.message : response?.error?.data?.message);
					dispatch(setError(true));
					setStep(1);
					setButtonLabel('Retry');
					return;
				} else if (!response?.error && statusCode === '0100' && data?.customerStatus === 'existing') {
					setIsLoading(false);
					setErrorMessage('You already have an account kindly proceed to login');
					dispatch(setError(true));
					setStep(2);
					setButtonLabel('Login');
				} else {
					dispatch(setOtpData(data));
					dispatch(setActivePage('phone_otp'));
				}
			}
		}
	}

	return (
		<div className="tabContent">
			<form onSubmit={handleSubmit(onSubmit)} className="form">
				<div className={`form__space ${step === 1 || step === 2 ? 'hide' : ''}`}>
					<div className={`form-box ${errorsLength ? 'mb-0' : ''}`}>
						<label htmlFor="bvn" className="form-label">
							Enter BVN Number
						</label>
						<div className={`form-input ${errors?.bvn ? 'form-error' : ''}`}>
							<div className="icon-box">
								<BVNIcon />
							</div>
							<input
								type="number"
								autoComplete="off"
								maxLength="30"
								disabled={isLoading}
								{...register('bvn', {
									required: 'This field is required',
									minLength: {
										value: 11,
										message: 'The BVN requires 11 digits.',
									},
									maxLength: {
										value: 11,
										message: 'Too Many Characters',
									},
									validate: (value) =>
										value.startsWith('22') || value.startsWith('12') ? true : 'BVN you entered is incorrect',
								})}
							/>
						</div>
						{errors?.bvn && <div className="form-error-msg">{errors?.bvn?.message}</div>}
					</div>
					<div className={`form-box ${errorsLength ? 'mb-0' : ''}`}>
						<label htmlFor="bvn" className="form-label">
							Enter Email Address
						</label>
						<div className={`form-input ${errors?.email ? 'form-error' : ''} bl-none`}>
							<input
								type="email"
								placeholder="Enter Email Address"
								autoComplete="off"
								disabled={isLoading}
								{...register('email', {
									required: 'This field is required',
									validate: (value) => isEmail(value) || 'The email you’ve entered is incorrect.',
								})}
							/>
						</div>
						{errors?.email && <div className="form-error-msg">{errors?.email?.message}</div>}
					</div>
					<div className={`form-box ${errorsLength ? 'mb-0' : ''}`}>
						<label htmlFor="bvn" className="form-label">
							Enter Your Date Of Birth
						</label>
						<div className={`form-input ${errors?.dob ? 'form-error' : ''}`}>
							<div className="icon-box">
								<CalendarIcon />
							</div>
							<input
								type="date"
								autoComplete="off"
								disabled={isLoading}
								{...register('dob', {
									required: 'This field is required',
									validate: (value) => validateDOB(value),
								})}
							/>
						</div>
						{errors?.dob && <div className="form-error-msg">{errors?.dob?.message}</div>}
					</div>
				</div>

				<div className={`form__space ${step === 1 || step === 2 ? '' : 'hide'}`}>
					<ErrorMessage message={errorMessage} />
				</div>
				<Footer>
					{!errorMessage && (
						<p className="agreement">
							By clicking proceed you agree to <a href="/">Credit agreement</a>
						</p>
					)}
					<Recaptcha label={buttonLabel} type="submit" loading={isLoading} />
				</Footer>
			</form>
		</div>
	);
};

export default NewUserBVN;

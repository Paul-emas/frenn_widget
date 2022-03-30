/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import isEmail from 'is-email';
import publicIp from 'public-ip';

import { createNewMerchantAPI } from 'api';

import Footer from '../../Footer';
import Recaptcha from 'components/Recaptcha';
import ErrorMessage from '../ErrorMessage';

const NewUserBVN = ({ setOtpData, merchantDataObj, next }) => {
	const [error, setError] = useState('');
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
	const errorsLength = Object.keys(errors).length;

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
			if (merchantDataObj) {
				if (step !== 0 && error.length > 0) {
					setStep(0);
					setError(null);
					return;
				}

				setIsLoading(true);
				const { bvn, email, dob } = formData;
				const { key, merchantId, orderReference } = merchantDataObj;
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
				const status = response?.statusCode;

				console.log('I was called');

				if (status !== '0100') {
					setIsLoading(false);
					setError(response?.message);
					setStep(1);
					setButtonLabel('Retry');
					return;
				} else if (status === '0100' && response?.customerStatus === 'existing') {
					setIsLoading(false);
					setError('You already have an account kindly proceed to login');
					setStep(1);
					setButtonLabel('Login');
				} else {
					setOtpData(response);
					next('phone_otp');
				}
			}
		}
	}

	return (
		<div className="tabContent">
			<form onSubmit={handleSubmit(onSubmit)} className="form">
				<div className={`form__space ${step === 1 ? 'hide' : ''}`}>
					<div className={`form-box ${errorsLength ? 'mb-0' : ''}`}>
						<label htmlFor="bvn" className="form-label">
							Enter BVN Number
						</label>
						<div className={`form-input ${errors?.bvn ? 'form-error' : ''}`}>
							<div className="icon-box">
								<svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M9.4993 19.5191C10.0803 19.5191 10.5513 19.0481 10.5513 18.4671C10.5513 17.8861 10.0803 17.415 9.4993 17.415C8.91828 17.415 8.44727 17.8861 8.44727 18.4671C8.44727 19.0481 8.91828 19.5191 9.4993 19.5191Z"
										fill="#08B4D0"
									/>
									<path
										d="M8.08887 3.7627H10.9102"
										stroke="#231F20"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M18 18.9445V3.391C18 2.07049 16.9295 1 15.609 1L3.391 1C2.07049 1 1 2.07049 1 3.391V18.9445C1 20.265 2.07049 21.3355 3.391 21.3355H15.609C16.9295 21.3355 18 20.265 18 18.9445Z"
										stroke="#231F20"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M9.5 11.4489V8.40039"
										stroke="#08B4D0"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M9.50012 11.4481L6.72656 10.1689"
										stroke="#08B4D0"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M9.5 11.4481L12.2616 10.1689"
										stroke="#08B4D0"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M9.49965 11.4492L7.49121 13.8163"
										stroke="#08B4D0"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M9.5 11.4492L11.7595 13.9239"
										stroke="#08B4D0"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
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
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M4.375 0C4.54076 0 4.69973 0.065848 4.81694 0.183058C4.93415 0.300269 5 0.45924 5 0.625V1.25H15V0.625C15 0.45924 15.0658 0.300269 15.1831 0.183058C15.3003 0.065848 15.4592 0 15.625 0C15.7908 0 15.9497 0.065848 16.0669 0.183058C16.1842 0.300269 16.25 0.45924 16.25 0.625V1.25H17.5C18.163 1.25 18.7989 1.51339 19.2678 1.98223C19.7366 2.45107 20 3.08696 20 3.75V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H2.5C1.83696 20 1.20107 19.7366 0.732233 19.2678C0.263392 18.7989 0 18.163 0 17.5V3.75C0 3.08696 0.263392 2.45107 0.732233 1.98223C1.20107 1.51339 1.83696 1.25 2.5 1.25H3.75V0.625C3.75 0.45924 3.81585 0.300269 3.93306 0.183058C4.05027 0.065848 4.20924 0 4.375 0V0ZM2.5 2.5C2.16848 2.5 1.85054 2.6317 1.61612 2.86612C1.3817 3.10054 1.25 3.41848 1.25 3.75V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H17.5C17.8315 18.75 18.1495 18.6183 18.3839 18.3839C18.6183 18.1495 18.75 17.8315 18.75 17.5V3.75C18.75 3.41848 18.6183 3.10054 18.3839 2.86612C18.1495 2.6317 17.8315 2.5 17.5 2.5H2.5Z"
										fill="#231F20"
									/>
									<path
										d="M3.125 4.625C3.125 4.45924 3.19085 4.30027 3.30806 4.18306C3.42527 4.06585 3.58424 4 3.75 4H16.25C16.4158 4 16.5747 4.06585 16.6919 4.18306C16.8092 4.30027 16.875 4.45924 16.875 4.625V5.875C16.875 6.04076 16.8092 6.19973 16.6919 6.31694C16.5747 6.43415 16.4158 6.5 16.25 6.5H3.75C3.58424 6.5 3.42527 6.43415 3.30806 6.31694C3.19085 6.19973 3.125 6.04076 3.125 5.875V4.625Z"
										fill="#231F20"
									/>
									<g clipPath="url(#clip0_137_2024)">
										<path
											d="M12.5938 11.1569H10.875V9.65688H10.3125C10.4866 9.42445 10.5802 9.14156 10.579 8.85115C10.579 8.41927 10.3746 8.01348 10.0456 7.79215L9.90608 7.69824L9.76653 7.79215C9.4375 8.01351 9.2332 8.41929 9.2332 8.85115C9.23203 9.14157 9.32561 9.42444 9.49975 9.65687H8.875V11.1569H7.40625C7.16598 11.1571 6.93563 11.2527 6.76574 11.4226C6.59584 11.5925 6.50027 11.8228 6.5 12.0631V14.8746C6.50015 15.0071 6.55288 15.1342 6.64661 15.228C6.74035 15.3217 6.86744 15.3744 7 15.3746H13C13.1326 15.3744 13.2597 15.3217 13.3534 15.228C13.4471 15.1342 13.4999 15.0071 13.5 14.8746V12.0631C13.4997 11.8229 13.4042 11.5925 13.2343 11.4226C13.0644 11.2527 12.834 11.1572 12.5938 11.1569ZM9.90608 8.33618C10.0153 8.47187 10.079 8.65596 10.079 8.85116C10.079 9.04637 10.0153 9.23048 9.90608 9.36615C9.79688 9.23048 9.7332 9.04637 9.7332 8.85115C9.7332 8.65593 9.79688 8.47187 9.90608 8.33618ZM9.375 10.1569H10.375V11.1569H9.375V10.1569ZM7 12.0631C7.00012 11.9554 7.04297 11.8522 7.11912 11.776C7.19528 11.6998 7.29854 11.657 7.40625 11.6569H12.5938C12.7015 11.657 12.8047 11.6998 12.8809 11.776C12.957 11.8522 12.9999 11.9554 13 12.0631V12.5565L12.6625 12.7054C12.5965 12.7345 12.5252 12.7495 12.4531 12.7495C12.3809 12.7495 12.3096 12.7345 12.2436 12.7054L11.6562 12.4463L11.0687 12.7054C11.0027 12.7345 10.9314 12.7495 10.8593 12.7495C10.7872 12.7495 10.7159 12.7345 10.6498 12.7054L10.0625 12.4463L9.475 12.7054C9.40899 12.7345 9.33766 12.7495 9.26555 12.7495C9.19343 12.7495 9.1221 12.7345 9.05609 12.7054L8.46875 12.4463L7.88136 12.7054C7.81535 12.7345 7.74402 12.7495 7.67191 12.7495C7.59979 12.7495 7.52846 12.7345 7.46245 12.7054L7 12.5014V12.0631ZM13 14.8746H7V13.0479L7.26059 13.1629C7.39021 13.2199 7.53027 13.2494 7.67188 13.2494C7.81348 13.2494 7.95354 13.2199 8.08316 13.1629L8.46875 12.9928L8.85436 13.1629C8.98397 13.2199 9.12403 13.2494 9.26563 13.2494C9.40724 13.2494 9.54729 13.2199 9.67691 13.1629L10.0625 12.9928L10.4481 13.1629C10.5777 13.2199 10.7177 13.2494 10.8593 13.2494C11.0009 13.2494 11.141 13.2199 11.2706 13.1629L11.6562 12.9928L12.0418 13.1629C12.1715 13.2199 12.3115 13.2494 12.4531 13.2494C12.5947 13.2494 12.7348 13.2199 12.8644 13.1629L13.0002 13.103L13.0003 14.8746H13Z"
											fill="#08B4D0"
										/>
									</g>
									<defs>
										<clipPath id="clip0_137_2024">
											<rect width="8" height="8" fill="white" transform="translate(6 7.625)" />
										</clipPath>
									</defs>
								</svg>
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

				<div className={`form__space ${step === 1 ? '' : 'hide'}`}>
					<ErrorMessage message={error} />
				</div>
				<Footer>
					<Recaptcha label={buttonLabel} type="submit" loading={isLoading} />
				</Footer>
			</form>
		</div>
	);
};

NewUserBVN.propTypes = {
	merchantDataObj: PropTypes.any,
	setOtpData: PropTypes.func,
	next: PropTypes.func,
};

export default NewUserBVN;

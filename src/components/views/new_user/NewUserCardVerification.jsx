import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Footer from 'components/Footer';
import Button from 'components/Button';

const NewUserCardVerification = ({ setLoaderStep, next }) => {
	const { handleSubmit } = useForm();

	function onSubmit() {
		setLoaderStep('pin_and_otp');
		next('loader');
	}

	return (
		<div className="tabContent">
			<form onSubmit={handleSubmit(onSubmit)} className="form">
				<div className="form__space">
					<div className="form-box">
						<label htmlFor="bvn" className="form-label">
							Name on the card
						</label>
						<div className="form-input">
							<div className="icon-box">
								<svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M13.1396 4.58008H15.4996"
										stroke="#231F20"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M13.1396 7.12109H14.3196"
										stroke="#231F20"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M7.55016 8.24094C8.87012 8.24094 9.94016 7.1709 9.94016 5.85094C9.94016 4.53098 8.87012 3.46094 7.55016 3.46094C6.2302 3.46094 5.16016 4.53098 5.16016 5.85094C5.16016 7.1709 6.2302 8.24094 7.55016 8.24094Z"
										stroke="#07B4CF"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M2.30957 14.6094C2.69008 13.49 3.39757 12.5105 4.34061 11.7974C5.28364 11.0843 6.41887 10.6705 7.59957 10.6094C8.74069 10.6088 9.85383 10.9625 10.7853 11.6217C11.7168 12.2809 12.4206 13.213 12.7996 14.2894"
										stroke="#07B4CF"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M16.01 1H3C1.89543 1 1 1.89543 1 3V13.22C1 14.3246 1.89543 15.22 3 15.22H16.01C17.1146 15.22 18.01 14.3246 18.01 13.22V3C18.01 1.89543 17.1146 1 16.01 1Z"
										stroke="#231F20"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<input type="text" placeholder="Type here" required />
						</div>
					</div>
					<div className="form-box">
						<label htmlFor="bvn" className="form-label">
							Card Number
						</label>
						<div className="form-input">
							<div className="icon-box">
								<svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M16.01 1H3C1.89543 1 1 1.89543 1 3V13.22C1 14.3246 1.89543 15.22 3 15.22H16.01C17.1146 15.22 18.01 14.3246 18.01 13.22V3C18.01 1.89543 17.1146 1 16.01 1Z"
										stroke="#231F20"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M1 5.05078H18.02"
										stroke="#231F20"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M12.2203 9.41047H11.9403V7.69047C11.9403 7.57643 11.895 7.46705 11.8144 7.38641C11.7337 7.30577 11.6244 7.26047 11.5103 7.26047H11.3003C11.2443 7.26045 11.1889 7.27164 11.1373 7.29337C11.0856 7.3151 11.0389 7.34693 10.9997 7.387C10.9606 7.42706 10.9299 7.47455 10.9094 7.52667C10.8889 7.57879 10.879 7.63448 10.8803 7.69047V9.41047H9.54031L8.17032 7.41047C8.12996 7.35536 8.07732 7.3104 8.01657 7.27915C7.95582 7.24791 7.88862 7.23124 7.82031 7.23047H7.52032C7.40628 7.23047 7.2969 7.27577 7.21626 7.35641C7.13562 7.43705 7.09032 7.54643 7.09032 7.66047V9.38047H6.80032C6.73932 9.38047 6.68081 9.4047 6.63768 9.44783C6.59455 9.49097 6.57031 9.54947 6.57031 9.61047V9.73047C6.57031 9.79147 6.59455 9.84997 6.63768 9.8931C6.68081 9.93624 6.73932 9.96047 6.80032 9.96047H7.09032V10.6305H6.80032C6.7706 10.6291 6.74092 10.6338 6.71306 10.6443C6.6852 10.6547 6.65974 10.6707 6.63824 10.6913C6.61674 10.7118 6.59964 10.7365 6.58797 10.7639C6.57629 10.7913 6.57028 10.8207 6.57031 10.8505V10.9805C6.57028 11.0102 6.57629 11.0397 6.58797 11.067C6.59964 11.0944 6.61674 11.1191 6.63824 11.1397C6.65974 11.1602 6.6852 11.1762 6.71306 11.1867C6.74092 11.1971 6.7706 11.2018 6.80032 11.2005H7.09032V12.7005C7.09032 12.8145 7.13562 12.9239 7.21626 13.0045C7.2969 13.0852 7.40628 13.1305 7.52032 13.1305H7.73032C7.78678 13.1305 7.8427 13.1193 7.89487 13.0977C7.94704 13.0761 7.99445 13.0445 8.03438 13.0045C8.07431 12.9646 8.10597 12.9172 8.12758 12.865C8.14919 12.8129 8.16032 12.7569 8.16032 12.7005V11.2305H9.66032L10.8603 12.9705C10.8984 13.0286 10.9503 13.0764 11.0114 13.1096C11.0725 13.1428 11.1408 13.1602 11.2103 13.1605H11.5103C11.6244 13.1605 11.7337 13.1152 11.8144 13.0345C11.895 12.9539 11.9403 12.8445 11.9403 12.7305V11.2305H12.2203C12.25 11.2318 12.2797 11.2271 12.3076 11.2167C12.3354 11.2062 12.3609 11.1902 12.3824 11.1697C12.4039 11.1491 12.421 11.1244 12.4327 11.097C12.4443 11.0697 12.4503 11.0402 12.4503 11.0105V10.8805C12.4503 10.8507 12.4443 10.8213 12.4327 10.7939C12.421 10.7665 12.4039 10.7418 12.3824 10.7213C12.3609 10.7007 12.3354 10.6847 12.3076 10.6743C12.2797 10.6638 12.25 10.6591 12.2203 10.6605H11.9403V9.99047H12.2203C12.2505 9.99047 12.2804 9.98452 12.3083 9.97296C12.3362 9.9614 12.3616 9.94446 12.3829 9.9231C12.4043 9.90175 12.4213 9.87639 12.4328 9.84849C12.4444 9.82058 12.4503 9.79067 12.4503 9.76047V9.64047C12.4503 9.57947 12.4261 9.52097 12.3829 9.47783C12.3398 9.4347 12.2813 9.41047 12.2203 9.41047ZM8.76031 9.98047L9.25032 10.6805H8.10031V9.98047H8.76031ZM10.9403 9.98047V10.6805H10.4403L9.95032 9.98047H10.9403ZM8.10031 9.38047V9.09047L8.30032 9.38047H8.10031ZM10.8503 11.2805H10.9403V11.3305H10.8903L10.8503 11.2805Z"
										fill="#08B4D0"
									/>
								</svg>
							</div>
							<input type="number" placeholder="Type here" required />
						</div>
					</div>

					<div className="card-details">
						<div className="form-box">
							<label htmlFor="bvn" className="form-label">
								Exp Date
							</label>
							<div className="form-input">
								<input type="text" placeholder="MM/YY" required />
							</div>
						</div>
						<div className="form-box">
							<label htmlFor="bvn" className="form-label">
								CVV
							</label>
							<div className="form-input">
								<input type="text" placeholder="123" required />
							</div>
						</div>
					</div>
				</div>
				<Footer>
					<Button type="submit" />
				</Footer>
			</form>
		</div>
	);
};

NewUserCardVerification.propTypes = {
	next: PropTypes.func,
};

export default NewUserCardVerification;

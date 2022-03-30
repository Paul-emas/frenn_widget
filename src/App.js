/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import { ValidateMerchantAPI } from 'api';

import './styles/global.css';

import Recaptcha from './components/Recaptcha';
import Header from './components/Header';
import CreditLoansTabs from './components/CreditLoansTabs';
import Tabs from './components/Tabs';
import NewUserBVN from './components/views/new_user/NewUserBVN';
import PhoneOTP from './components/views/PhoneOTP';
import ExistingUserVerification from './components/views/existing_user/ExistingUserVerification';
import Loader from './components/views/Loader';
import NewUserCardVerification from './components/views/new_user/NewUserCardVerification';
import PayIn30 from './components/views/PayIn30';
import PaymentPlans from './components/views/new_user/PaymentPlans';
import Success from './components/views/Success';
import NewUserPinAndOTP from './components/views/new_user/NewUserPinAndOTP';
import NewUserCongrats from './components/views/new_user/NewUserCongrats';
import Spinner from 'components/Spinner';
import Verify from 'components/views/Verify';

export default function App() {
	const mode = 'widget';
	const queryParams = new URLSearchParams(window.location.search);
	const params = queryParams.get('params');
	const merchantDataObj = JSON.parse(params);

	const [activeTab, setActiveTab] = useState('new_user');
	const [step, setStep] = useState('');
	const [loaderStep, setLoaderStep] = useState('');
	const [pageLoading, setPageLoading] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [otpData, setOtpData] = useState(null);
	const [openPaystack, setOpenPaystack] = useState(false);
	const [creditLimit, setCreditLimit] = useState(null);

	const tabProps = { activeTab, setActiveTab, setStep };
	const isExisting = activeTab === 'existing_user' ?? false;

	useEffect(() => {
		async function VerifyMerchant() {
			const resp = await ValidateMerchantAPI(merchantDataObj);
			if (typeof window !== 'undefined') {
				window.parent.postMessage('hide:spinner', '*');
			}

			if (resp?.error) {
				console.log(resp.error);
				return;
			}

			if (resp.customerStatus) {
				const status = resp.customerStatus;
				switch (status) {
					case 'new':
						setActiveTab('new_user');
						setStep('new_user');
						setPageLoading(false);
						break;
					case 'existing':
						setActiveTab('existing_user');
						setStep('existing_user');
						setPageLoading(false);
						break;
					default:
						setActiveTab(null);
						setStep('no_user');
						setPageLoading(false);
						break;
				}
			}
		}

		if (merchantDataObj) {
			VerifyMerchant();
		}
	}, []);

	return (
		<main className="start">
			{mode === 'page' && !pageLoading && <Recaptcha />}
			{mode === 'widget' && !pageLoading && (
				<aside id="frenn_modal" className={`modal open ${openPaystack ? 'hide' : ''}`}>
					<div className="modal__box">
						{isLoading && <Spinner />}
						<Header step={step} />
						<CreditLoansTabs
							creditLimit={creditLimit}
							merchantDataObj={merchantDataObj}
							isExisting={isExisting}
							setStep={setStep}
						/>
						<div className="space">
							{(step === 'new_user' || step === 'existing_user') && <Tabs {...tabProps} />}
							{step === 'new_user' && activeTab === 'new_user' && (
								<NewUserBVN merchantDataObj={merchantDataObj} setOtpData={setOtpData} next={setStep} />
							)}
							{step === 'existing_user' && activeTab === 'existing_user' && <ExistingUserVerification next={setStep} />}
							{step === 'phone_otp' && (
								<PhoneOTP
									isExisting={isExisting}
									otpData={otpData}
									setLoaderStep={setLoaderStep}
									merchantDataObj={merchantDataObj}
									next={setStep}
								/>
							)}
							{step === 'loader' && (
								<Loader
									isExisting={isExisting}
									otpData={otpData}
									setCreditLimit={setCreditLimit}
									merchantDataObj={merchantDataObj}
									next={() => setStep(loaderStep)}
								/>
							)}
							{step === 'card_verification' && <NewUserCardVerification setLoaderStep={setLoaderStep} next={setStep} />}
							{step === 'pin_and_otp' && <NewUserPinAndOTP next={setStep} showSpinner={setIsLoading} />}
							{step === 'pay_in_30' && (
								<PayIn30
									isExisting={isExisting}
									merchantDataObj={merchantDataObj}
									creditLimit={creditLimit}
									next={setStep}
								/>
							)}
							{step === 'payment_plans' && <PaymentPlans showSpinner={setIsLoading} next={setStep} />}
							{step === 'success' && <Success next={setStep} />}
							{step === 'congrats' && <NewUserCongrats next={setStep} />}
							{step === 'verify' && (
								<Verify
									otpData={otpData}
									merchantDataObj={merchantDataObj}
									setOpenPaystack={setOpenPaystack}
									next={setStep}
								/>
							)}
						</div>
					</div>
				</aside>
			)}
		</main>
	);
}

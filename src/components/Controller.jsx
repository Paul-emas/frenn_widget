import { useSelector } from 'react-redux';
import { appSelector } from 'slices/app';

import CreditLoansTabs from './CreditLoansTabs';
import Tabs from './Tabs';
import NewUserBVN from './views/new_user/NewUserBVN';
import ExistingUserVerification from './views/existing_user/ExistingUserVerification';
import PhoneOTP from './views/PhoneOTP';
import Loader from './views/Loader';
import NewUserCongrats from './views/new_user/NewUserCongrats';
import PayIn30 from './views/PayIn30';
import PaymentPlans from './views/new_user/PaymentPlans';
import Verify from './views/Verify';
import Eligible from './views/existing_user/Eligible';
import Insufficient from './views/Insufficient';
import Success from './views/Success';
import ErrorMessage from './views/ErrorMessage';
import Invalid from './Invalid';

const Controller = () => {
	const { activePage, activeTab, error } = useSelector(appSelector);

	return (
		<>
			{activePage !== 'insufficient' && <CreditLoansTabs />}
			<div className={`${activePage !== 'insufficient' ? 'space' : ''}`}>
				{(activePage === 'new_user' || activePage === 'existing_user') && !error && <Tabs />}
				{activePage === 'new_user' && activeTab === 'new_user' && <NewUserBVN />}
				{activePage === 'existing_user' && activeTab === 'existing_user' && <ExistingUserVerification />}
				{activePage === 'phone_otp' && <PhoneOTP />}
				{activePage === 'loader' && <Loader />}
				{activePage === 'congrats' && <NewUserCongrats />}
				{activePage === 'pay_in_30' && <PayIn30 />}
				{activePage === 'payment_plans' && <PaymentPlans />}
				{activePage === 'verify' && <Verify />}
				{activePage === 'eligible' && <Eligible />}
				{activePage === 'insufficient' && <Insufficient />}
				{activePage === 'success' && <Success />}
				{activePage === 'error' && <ErrorMessage />}
				{activePage === 'no_user' && <Invalid />}
			</div>
		</>
	);
};

export default Controller;

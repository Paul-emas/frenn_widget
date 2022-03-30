import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import PinInput from 'react-pin-input';

import Footer from 'components/Footer';
import Button from 'components/Button';

const NewUserPinAndOTP = ({ showSpinner, next }) => {
	const { handleSubmit } = useForm();

	function onSubmit() {
		showSpinner(true);

		setTimeout(() => {
			showSpinner(false);
			next('success');
		}, 1500);
	}

	return (
		<div id="otp_and_pin" className="tabContent">
			<div className="pin-box">
				<form onSubmit={handleSubmit(onSubmit)} className="form">
					<p className="form__caption">Card 4 Digit Pin</p>
					<div className="form-pin-box">
						<PinInput
							length={4}
							secret
							type="numeric"
							inputMode="number"
							style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
							inputStyle={{
								borderColor: '#fff',
								backgroundColor: '#fff',
								width: '63px',
								height: '58px',
								fontSize: '36px',
							}}
							onComplete={(value, index) => {}}
							autoSelect={true}
							regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
						/>
					</div>
					<p className="form__caption">Enter the One-Time-Password sent to number</p>
					<div className="form-pin-box mb-small">
						<PinInput
							length={4}
							secret
							type="numeric"
							inputMode="number"
							style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
							inputStyle={{
								borderColor: '#fff',
								backgroundColor: '#fff',
								width: '63px',
								height: '58px',
								fontSize: '36px',
							}}
							onComplete={(value, index) => {}}
							autoSelect={true}
							regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
						/>
					</div>
					<Footer>
						<Button type="submit" />
					</Footer>
				</form>
			</div>
		</div>
	);
};

NewUserPinAndOTP.propTypes = {
	setNewFlow: PropTypes.func,
	next: PropTypes.func,
};

export default NewUserPinAndOTP;

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import Footer from 'components/Footer';
import Button from 'components/Button';
import { setActivePage } from 'slices/app';

const PaymentPlans = () => {
	const dispatch = useDispatch();
	const { handleSubmit } = useForm();

	function onSubmit() {
		dispatch(setActivePage('verify'));
	}

	return (
		<div className="tabContent">
			<form onSubmit={handleSubmit(onSubmit)} className="form">
				<div className="caption base">Choose the preffered payment method</div>

				<div className="form-radio">
					<label className="container">
						<span className="label-text">Frenn Pay In 30 Days</span>
						<input type="radio" name="plan" />
						<span className="checkmark"></span>
					</label>
					<label className="container">
						<span className="label-text">Frenn Pay 4 Splits</span>
						<input type="radio" name="plan" defaultChecked />
						<span className="checkmark"></span>
					</label>
					<label className="container">
						<span className="label-text">Frenn Pay 6 Splits</span>
						<input type="radio" name="plan" />
						<span className="checkmark"></span>
					</label>
				</div>

				<div className="form__range-container">
					<div className="form__range-box">
						<div className="range-line"></div>
						<div className="form__range-box-item">
							<div className="amount">N15,000</div>
							<div className="io">
								<div className="dot"></div>
								<div className="line"></div>
								<div className="date">Today</div>
							</div>
						</div>
						<div className="form__range-box-item">
							<div className="amount">N15,000</div>
							<div className="io">
								<div className="dot"></div>
								<div className="line"></div>
								<div className="date">Feb 12, 2022</div>
							</div>
						</div>
						<div className="form__range-box-item">
							<div className="amount">N15,000</div>
							<div className="io">
								<div className="dot"></div>
								<div className="line"></div>
								<div className="date">Mar 12, 2022</div>
							</div>
						</div>
						<div className="form__range-box-item">
							<div className="amount">N15,000</div>
							<div className="io">
								<div className="dot"></div>
								<div className="line"></div>
								<div className="date">Apr 12, 2022</div>
							</div>
						</div>
					</div>
				</div>
				<Footer>
					<Button type="submit"></Button>
				</Footer>
			</form>
		</div>
	);
};

export default PaymentPlans;

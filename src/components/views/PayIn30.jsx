/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { appSelector, setActivePage } from 'slices/app';

import Footer from 'components/Footer';
import Button from 'components/Button';

const PayIn30 = () => {
	const dispatch = useDispatch();
	const { isExisting, merchantData, creditLimit } = useSelector(appSelector);
	const [days, setDays] = useState([]);
	const [selectedDay, setSelectedDay] = useState(0);
	const [repaymentAmount, setRepaymentAmount] = useState('');

	useEffect(() => {
		const today = new Date();
		const priorDate = new Date(new Date().setDate(today.getDate() + 30));
		setSelectedDay(priorDate);
		const prevDays = [];
		for (var i = 1; i <= 5; i++) {
			prevDays.push(
				Number(
					moment(priorDate)
						.add(i - 1, 'days')
						.date()
				)
			);
		}
		setDays(prevDays);

		if (merchantData && creditLimit) {
			const { amount } = merchantData;
			const { creditPeriod, interest } = creditLimit?.plans[0];

			function calculateMonthlyInstallment(params) {
				var rate = params?.rate / 100 || 0.01;
				var loanAmount = params['loanAmount'];
				var loanPeriod = params['loanPeriod'] ?? 1;
				var adminFee = 0;
				var coeff = (rate * Math.pow(1 + rate, loanPeriod)) / (Math.pow(1 + rate, loanPeriod) - 1);
				var amount = loanAmount * coeff + adminFee / loanPeriod;
				setRepaymentAmount(Math.round(amount / 1) * 1);
			}

			calculateMonthlyInstallment({
				loanAmount: amount,
				loanPeriod: creditPeriod?.quantity,
				adminFee: 0,
				rate: interest,
			});
		}
	}, [merchantData, creditLimit]);

	function onSubmit() {
		isExisting ? dispatch(setActivePage('payment_plans')) : dispatch(setActivePage('verify'));
	}

	return (
		<div className="tabContent">
			<div className="caption base">Scheduled payment details</div>
			<div className="pay__in-30">
				<div className="pay__in-30-heading">Frenn Pay in 30 Days</div>
				<p className="pay__in-30-caption">You need to pay the due amount after 30 days.</p>

				<div className="pay__in-30-slider">
					{days.map((e, i) => (
						<div className={`item ${selectedDay.getDate() === e ? 'active' : ''}`} key={i}>
							{e}
						</div>
					))}
				</div>

				<div className="pay__in-30-date">
					<span>Next re-payment date:</span>
					<span className="repayment-date">{moment(selectedDay).format('l')}</span>
				</div>
				{!isExisting && (
					<div className="pay__in-30-date">
						<span>Repayment Amount:</span>
						<span className="repayment-date">N{repaymentAmount.toLocaleString()}</span>
					</div>
				)}
			</div>
			<Footer>
				<Button onClick={onSubmit} />
			</Footer>

			<style jsx="true">
				{`
					.pay__in-30 {
						width: 360px;
						height: 197px;
						background: #d8f3f1;
						border-radius: 10px;
						padding: 25px 30px;
						margin-top: 25px;
					}

					@media screen and (max-width: 440px) {
						.pay__in-30 {
							width: 100%;
						}
					}

					.pay__in-30-heading {
						font-weight: 500;
						font-size: 16px;
						line-height: 20px;
						color: #2d2d3d;
					}

					.pay__in-30-caption {
						font-size: 12px;
						line-height: 20px;
						color: #2d2d3d;
					}

					.pay__in-30-slider {
						width: 210px;
						max-width: 220px;
						overflow: auto;
						white-space: nowrap;
						display: inline-block;
						margin-left: -12px;
						margin-top: 9px;
						transition: all 0.3s ease;
					}

					.pay__in-30-slider .item {
						text-align: center;
						padding: 0.65rem 0;
						width: 40px;
						display: inline-block;
						border-radius: 50%;
						font-size: 14px;
						line-height: 20px;
						cursor: pointer;
					}

					.pay__in-30-slider .item.active {
						background: #74c2d9;
						color: #fff;
						width: 40px;
						height: 40px;
					}

					.pay__in-30-date {
						margin-top: 6px;
						font-size: 12px;
						line-height: 20px;
					}

					.pay__in-30-date .repayment-date {
						margin-left: 12px;
						font-weight: 600;
					}
				`}
			</style>
		</div>
	);
};

export default PayIn30;

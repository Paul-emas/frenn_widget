/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePaystackPayment } from 'react-paystack';

import { getPaystackTransactionDetails, initiateCardLinkingAPI, verifyCardLinkingAPI } from 'api';
import { appSelector, setActivePage, setOpenPaystack, setShowSpinner } from 'slices/app';

import { ReactComponent as VerifyIcon } from '../../assets/svgs/verify.svg';

import Button from 'components/Button';
import Footer from 'components/Footer';
import ErrorMessage from './ErrorMessage';

const Verify = () => {
	const dispatch = useDispatch();
	const { otpData, merchantData } = useSelector(appSelector);
	const [errorMessage, setErrorMessage] = useState('');
	const [config, setConfig] = useState({
		reference: 'nsjhjsjha2gsgs',
		email: 'test@gmail.com',
		access_code: '000000002',
		amount: merchantData?.amount * 100,
		publicKey: process.env.REACT_APP_PAYSTACK_LIVE_KEY,
	});

	const initializePayment = usePaystackPayment(config);

	function onSucess(data) {
		if (typeof window !== 'undefined') {
			window.parent.postMessage('show:overlay', '*');
		}
		dispatch(setOpenPaystack(false));
		fetchTransactionData(data?.reference);
	}

	async function fetchTransactionData(reference) {
		dispatch(setShowSpinner(true));
		const response = await getPaystackTransactionDetails(reference);

		if (response?.data) {
			const { key, merchantId, userId, amount } = merchantData;
			const paystackData = response?.data?.data;
			const payload = {
				key,
				merchantId,
				userId,
				amount,
				...paystackData,
			};

			const res = await verifyCardLinkingAPI(payload);

			if (res?.error) {
				dispatch(setShowSpinner(false));
				setErrorMessage(res?.error?.data?.message);
			} else {
				dispatch(setActivePage('success'));
				dispatch(setShowSpinner(false));
			}
		}
	}

	useEffect(() => {
		if (merchantData && otpData) {
			async function linkCard() {
				const { key, merchantId, orderReference, amount } = merchantData;
				const { userId } = otpData?.data;
				const payload = {
					key,
					merchantId,
					orderReference,
					amount,
					userId,
				};
				const response = await initiateCardLinkingAPI(payload);
				const status = response?.error?.status;

				if (errorMessage && errorMessage?.length > 0) {
					setErrorMessage('');
					return;
				}

				if (response?.error && status) {
					setErrorMessage(response?.error?.data?.message);
					return;
				} else {
					const res = response?.data?.data;
					setConfig({
						...config,
						reference: res?.reference,
						access_code: res?.access_code,
						email: response?.data?.email,
					});
				}
			}

			linkCard();
		}
	}, [merchantData, otpData]);

	function onClose() {
		if (typeof window !== 'undefined') {
			window.parent.postMessage('show:overlay', '*');
		}
		dispatch(setOpenPaystack(false));
	}

	function onSubmit() {
		dispatch(setOpenPaystack(true));
		initializePayment(onSucess, onClose);
		if (typeof window !== 'undefined') {
			window.parent.postMessage('hide:overlay', '*');
		}
	}

	return (
		<div>
			<div className={`${errorMessage ? 'hide' : 'verify'}`}>
				<div className="verify-content">
					<VerifyIcon />
					<div className="verify__heading">Before you proceed</div>
					<p className="verify__info">
						In order to complete the transaction we need you to link your debit/credit card.
					</p>
				</div>
			</div>

			<div className={`${errorMessage ? '' : 'hide'}`}>
				<ErrorMessage message={errorMessage} />
			</div>

			<Footer>
				<Button label={errorMessage ? 'Retry' : 'Proceed'} type="button" onClick={onSubmit} />
			</Footer>
			<style jsx="true">{`
				.verify {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 300px;
				}

				.verify-content {
					text-align: center;
				}

				.verify__heading {
					font-weight: 600;
					font-size: 16px;
					line-height: 24px;
					color: #2d2d3d;
					margin-top: 20px;
				}

				.verify__info {
					font-weight: 400;
					font-size: 14px;
					line-height: 17px;
					text-align: center;
					letter-spacing: 0.02em;
					color: #2d2d3d;
					max-width: 303px;
					margin: 0 auto;
					margin-top: 15px;
				}
			`}</style>
		</div>
	);
};

export default Verify;

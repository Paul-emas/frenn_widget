import { useEffect } from 'react';

import './styles/global.css';
import { ValidateMerchantAPI } from 'api';

import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector, setPageLoading, setActivePage, setActiveTab, setMerchantData } from 'slices/app';
import Controller from 'components/Controller';
import Spinner from 'components/Spinner';

export default function App() {
	const mode = 'widget';
	const queryParams = new URLSearchParams(window.location.search);
	const params = queryParams.get('params');

	const dispatch = useDispatch();
	const { pageLoading, showSpinner, merchantData, openPaystack } = useSelector(appSelector);

	useEffect(() => {
		if (params) {
			const merchantConfig = JSON.parse(params);
			dispatch(setMerchantData(merchantConfig));
		}
	}, [params, dispatch]);

	useEffect(() => {
		async function VerifyMerchant() {
			const resp = await ValidateMerchantAPI(merchantData);
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
						dispatch(setActiveTab('new_user'));
						dispatch(setActivePage('new_user'));
						dispatch(setPageLoading(false));
						break;
					case 'existing':
						dispatch(setActiveTab('existing_user'));
						dispatch(setActivePage('existing_user'));
						dispatch(setPageLoading(false));
						break;
					default:
						dispatch(setActiveTab(null));
						dispatch(setActivePage('no_user'));
						dispatch(setPageLoading(false));
						break;
				}
			}
		}

		if (merchantData) {
			VerifyMerchant();
		}
	}, [merchantData, dispatch]);

	return (
		<main className="start">
			{mode === 'widget' && !pageLoading && (
				<aside id="frenn_modal" className={`modal open ${openPaystack ? 'hide' : ''}`}>
					<div className="modal__box">
						{showSpinner && <Spinner />}
						<Header />
						<Controller />
					</div>
				</aside>
			)}
		</main>
	);
}

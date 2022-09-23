import { useDispatch, useSelector } from 'react-redux';
import { appSelector, setActivePage } from 'slices/app';

import Footer from 'components/Footer';
import Button from 'components/Button';

const NewUserCongrats = () => {
	const dispatch = useDispatch();
	const { merchantData } = useSelector(appSelector);
	const userName = merchantData?.customer?.name;

	function onSubmit() {
		dispatch(setActivePage('pay_in_30'));
	}

	return (
		<div id="congrats" className="tabContent">
			<div className="congrats__container">
				<div className="congrats__image">
					<figure>
						<img src="/images/congrats-card.png" width="103" height="72.32" alt="Frenn bank logo" srcSet="" />
					</figure>
				</div>
				<div className="congrats__content">
					<p className="congrats__heading">
						Congratulations {`${userName.length >= 8 ? userName.split(' ')[0] : userName}!`}
					</p>
					<p className="congrats__caption">Now pay later at ease with your Frenn Pay in Bits</p>
				</div>
			</div>
			<div className="download__container">
				<div className="download__heading">Download the Frenn app</div>
				<div className="download__content">
					<div className="download__image">
						<figure>
							<img src="/images/coins.png" width="69.88" height="58.19" alt="Frenn bank logo" srcSet="" />
						</figure>
					</div>
					<div className="download__caption">
						Check your credit limit and have <br />
						access to all the Frenn services.
					</div>
				</div>
			</div>

			<Footer>
				<Button onClick={onSubmit} />
			</Footer>

			<style jsx="true">
				{`
					.congrats__container {
						display: flex;
						color: #3d3d4d;
						padding-top: 16px;
					}

					.congrats__content {
						margin-left: 17px;
						margin-top: -4px;
					}

					.congrats__heading {
						font-weight: 600;
						font-size: 14px;
						line-height: 20px;
					}

					.congrats__caption {
						font-size: 14px;
						line-height: 20px;
						margin-top: 5px;
					}

					.download__container {
						margin-top: 15px;
					}

					.download__content {
						display: flex;
						align-items: center;
						margin-top: 3px;
					}

					.download__heading {
						font-weight: 600;
						font-size: 16px;
						line-height: 24px;
						color: #2d2d3d;
					}

					.download__caption {
						font-size: 16px;
						line-height: 24px;
						color: #2d2d3d;
						margin-left: 12px;
					}
				`}
			</style>
		</div>
	);
};

export default NewUserCongrats;

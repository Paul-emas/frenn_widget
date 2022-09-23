import { useSelector } from 'react-redux';
import { appSelector } from 'slices/app';

import { ReactComponent as EligibleIcon } from '../../../assets/svgs/eligible.svg';

import Button from 'components/Button';
import Footer from 'components/Footer';

const Eligible = () => {
	const { merchantData } = useSelector(appSelector);
	const userName = merchantData?.customer?.name;

	function close() {
		if (typeof window !== 'undefined') {
			window.parent.postMessage('close', '*');
		}
	}

	return (
		<div className="eligible">
			<div className="eligible-content">
				<EligibleIcon />
				<div className="eligible__heading">Oops! Not Eligible</div>
				<p className="eligible__info">
					Hey {`${userName.length >= 8 ? userName.split(' ')[0] : userName}`}, Sorry we are unable to process your Frenn
					Pay in Bits request at this time. Please <br /> re-apply after 3 months.
				</p>
			</div>

			<Footer>
				<Button type="button" label="Cancel" onClick={close} />
			</Footer>

			<style jsx="true">{`
				.eligible {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 300px;
				}

				.eligible-content {
					text-align: center;
				}

				.eligible__heading {
					font-weight: 600;
					font-size: 16px;
					line-height: 24px;
					color: #2d2d3d;
					margin-top: 20px;
				}

				.eligible__info {
					font-weight: 400;
					font-size: 14px;
					line-height: 17px;
					text-align: center;
					letter-spacing: 0.02em;
					color: #2d2d3d;
					max-width: 318px;
					margin: 0 auto;
					margin-top: 15px;
				}
			`}</style>
		</div>
	);
};

export default Eligible;

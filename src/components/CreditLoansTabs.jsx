import { useSelector } from 'react-redux';
import { appSelector } from 'slices/app';

const CreditLoansTabs = () => {
	const { creditLimit, isExisting, merchantData } = useSelector(appSelector);
	const showHideClass = isExisting || creditLimit !== null ? 'show-credit' : 'hide-credit';

	return (
		<div className={`credit__container ${showHideClass}`}>
			<div className="credit__sub">
				<span>Order Amount:</span>
				<span className="credit__amount">N{merchantData?.amount?.toLocaleString()}</span>
			</div>
			<div className="credit__sub credit">
				{creditLimit && (
					<>
						<span>Credit limit:</span>
						<span className="credit__amount">N{creditLimit?.plans[0]?.usableLimit?.toLocaleString()}</span>
					</>
				)}
			</div>

			<style jsx="true">
				{`
					.credit__container {
						width: 100%;
						height: 58px;
						display: flex;
					}

					.credit__container.show-credit .credit__sub.credit {
						animation: size 0.5s forwards;
					}

					.credit__container.show-credit .credit__sub.credit span {
						animation: fadeIn 0.3s forwards;
						animation-delay: 0.5s;
					}

					.credit__container.hide-credit .credit__sub.credit {
						animation: sizeOut 0.5s forwards;
					}

					.credit__container.hide-credit .credit__sub.credit span {
						animation: fadeOut 0.3s forwards;
					}

					.credit__sub {
						width: 100%;
						height: 100%;
						text-align: center;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 14px;
						line-height: 17px;
						color: #fff;
						background-color: #74c2d9;
					}

					.credit__sub.credit {
						background: #6bbbd1;
						width: 0;
						overflow: hidden;
						transition: transform 0.6s cubic-bezier(0.83, 0, 0.17, 1);
					}

					.credit__sub.credit span {
						opacity: 0;
					}

					.credit__amount {
						font-weight: 600;
						font-size: 16px;
						margin-left: 7px;
					}
				`}
			</style>
		</div>
	);
};

export default CreditLoansTabs;

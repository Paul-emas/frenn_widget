import { useSelector } from 'react-redux';
import { appSelector } from 'slices/app';
import { ReactComponent as ErrorIcon } from '../../assets/svgs/error.svg';

const Insufficient = () => {
	const { creditLimit } = useSelector(appSelector);

	return (
		<div className="insu">
			<div className="insu__box">
				<ErrorIcon className="insu__box-icon" />
			</div>
			<div className="insu_caption">
				Your credit limit is N{creditLimit?.plans[0]?.usableLimit?.toLocaleString()} and will not be able to fund your
				purchase. Kindly transact more on Frenn to increase your purchase limit.
			</div>

			<div className="insu__heading">Insufficient Credit limit</div>

			<footer className="insu-footer">
				<div className="box">
					<button className="insu-btn insu-btn__1">Increase limit</button>
					<button className="insu-btn insu-btn__2">Done</button>
				</div>
			</footer>

			<style jsx="true">{`
				.insu__box {
					width: 100%;
					height: 124px;
					background: #2d2d3d;
					box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.08);
					display: flex;
					justify-content: center;
				}

				.insu_caption {
					padding: 0 46px;
					margin-top: 120px;
					text-align: center;
					font-weight: 500;
					font-size: 14px;
					line-height: 20px;
					color: #717171;
				}

				.insu__heading {
					font-weight: 600;
					font-size: 20px;
					line-height: 24px;
					color: #2d2d3d;
					text-align: center;
					margin-top: 17px;
				}

				.insu-footer {
					height: 124px;
					margin-top: 140px;
					background: rgba(45, 45, 61, 0.61);
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.insu-btn {
					font-weight: 500;
					font-size: 20px;
					line-height: 24px;
				}

				.insu-btn__1 {
					width: 170px;
					height: 58px;
					background: #ffffff;
					border: 1px solid #2d2d3d;
				}

				.insu-btn__2 {
					width: 118px;
					height: 58px;
					background: #2d2d3d;
					margin-left: 15px;
					border: none;
					color: #ffffff;
				}
			`}</style>
		</div>
	);
};

export default Insufficient;

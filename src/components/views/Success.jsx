import { useEffect } from 'react';
import { ReactComponent as SuccessIcon } from '../../assets/svgs/success.svg';

const Success = () => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setTimeout(() => {
				window.parent.postMessage('close:transaction', '*');
			}, 4000);
		}
	}, []);

	return (
		<div id="success" className="tabContent">
			<div className="success">
				<div className="success__content">
					<SuccessIcon />
					<p className="success__caption">Successfully completed</p>
				</div>
			</div>

			<style jsx="true">{`
				.success {
					display: flex;
					justify-content: center;
					text-align: center;
					padding-bottom: 45px;
				}

				@media screen and (max-width: 440px) {
					.success {
						height: 90%;
						align-items: center;
					}
				}

				.success__caption {
					font-size: 20px;
					line-height: 24px;
					color: #2d2d3d;
					font-weight: 600;
					margin-top: -40px;
				}
			`}</style>
		</div>
	);
};

export default Success;

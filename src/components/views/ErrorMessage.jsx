import PropTypes from 'prop-types';
import { ReactComponent as ErrorIcon } from '../../assets/svgs/error-sm.svg';

const ErrorMessage = ({ message }) => {
	return (
		<div className="error-container">
			<ErrorIcon />
			<div className="error-text">{message}</div>

			<style jsx="true">
				{`
					.error-container {
						text-align: center;
						margin-top: -8px;
					}

					.error-text {
						font-family: 'Inter', sans-serif;
						font-style: normal;
						font-weight: normal;
						font-size: 16px;
						line-height: 24px;
						color: #ff4e4e;
						max-width: 346px;
						margin: 0 auto;
						margin-top: 30px;
						margin-bottom: 204px;
					}
				`}
			</style>
		</div>
	);
};

ErrorMessage.propTypes = {
	message: PropTypes.string,
};

export default ErrorMessage;

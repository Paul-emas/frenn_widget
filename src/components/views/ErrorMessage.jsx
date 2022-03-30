import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => {
	return (
		<div className="error-container">
			<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z"
					fill="#F2F2F2"
				/>
				<path
					d="M49.2357 80.0535C66.3508 80.0535 80.2254 66.1789 80.2254 49.0638C80.2254 31.9487 66.3508 18.0742 49.2357 18.0742C32.1206 18.0742 18.2461 31.9487 18.2461 49.0638C18.2461 66.1789 32.1206 80.0535 49.2357 80.0535Z"
					fill="#D9C9E2"
				/>
				<path
					d="M34.9368 47.0807C36.6046 47.0807 37.9566 45.7287 37.9566 44.0608C37.9566 42.393 36.6046 41.041 34.9368 41.041C33.269 41.041 31.917 42.393 31.917 44.0608C31.917 45.7287 33.269 47.0807 34.9368 47.0807Z"
					fill="#6B54A2"
					stroke="#6B54A2"
					strokeMiterlimit="10"
				/>
				<path
					d="M63.5257 47.0807C65.1935 47.0807 66.5455 45.7287 66.5455 44.0608C66.5455 42.393 65.1935 41.041 63.5257 41.041C61.8579 41.041 60.5059 42.393 60.5059 44.0608C60.5059 45.7287 61.8579 47.0807 63.5257 47.0807Z"
					fill="#6B54A2"
					stroke="#6B54A2"
					strokeMiterlimit="10"
				/>
				<path
					d="M35.7285 62.0334C37.2178 59.8196 39.2289 58.0061 41.5845 56.753C43.9401 55.4998 46.5678 54.8455 49.2359 54.8477C51.9027 54.8462 54.5289 55.5009 56.8829 56.754C59.2369 58.0072 61.2463 59.8203 62.7342 62.0334"
					stroke="#6B54A2"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M72.9764 37.4841C70.9378 37.4697 68.9875 36.6497 67.5511 35.2031C66.1146 33.7564 65.3085 31.8004 65.3086 29.7617"
					stroke="#6B54A2"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M26.1416 37.4841C28.1881 37.4817 30.15 36.667 31.5963 35.2191C33.0426 33.7711 33.8549 31.8083 33.8549 29.7617"
					stroke="#6B54A2"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M75.9326 17.3912L85.547 9.12305"
					stroke="#82D0D7"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M6.94043 19.2832L17.9373 25.5866"
					stroke="#82D0D7"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M6.94043 48.5545L13.4531 45.6074"
					stroke="#82D0D7"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M95.4889 48.5545L88.9854 45.6074"
					stroke="#82D0D7"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>

			<div className="error-text">{message}</div>

			<style jsx="true">
				{`
					.error-container {
						text-align: center;
						margin-top: -8px;
					}

					.error-text {
						font-family: 'Inter';
						font-style: normal;
						font-weight: normal;
						font-size: 16px;
						line-height: 24px;
						color: #ff4e4e;
						margin-top: 30px;
						margin-bottom: 204px;
						text-transform: capitalize;
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

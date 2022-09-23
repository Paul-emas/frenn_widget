import PropTypes from 'prop-types';

const Button = ({ type, onClick, label = 'Proceed', loading }) => {
	return (
		<>
			<button
				disabled={loading}
				type={type}
				onClick={onClick}
				className={`btn btn-dark ${loading ? 'btn-loading' : ''}`}
			>
				{loading ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						style={{
							margin: 'auto',
							display: 'block',
							shapeRendering: 'auto',
						}}
						width="40px"
						height="40px"
						viewBox="0 0 100 100"
						preserveAspectRatio="xMidYMid"
					>
						<circle
							cx="50"
							cy="50"
							r="28"
							strokeWidth="20"
							stroke="#fff"
							strokeDasharray="43.982297150257104 43.982297150257104"
							fill="none"
							strokeLinecap="round"
						>
							<animateTransform
								attributeName="transform"
								type="rotate"
								repeatCount="indefinite"
								dur="1s"
								keyTimes="0;1"
								values="0 50 50;360 50 50"
							></animateTransform>
						</circle>
					</svg>
				) : (
					<span>{label}</span>
				)}
			</button>

			<style jsx="true">
				{`
					.btn {
						width: 100%;
						height: 58px;
						outline: none;
						border: none;
						font-weight: 500;
						font-size: 20px;
						line-height: 24px;
						cursor: pointer;
					}

					.btn-dark {
						background: #2d2d3d;
						color: #fff;
					}

					.btn-loading {
						background: #c4c4c4;
						pointer-events: none;
					}
				`}
			</style>
		</>
	);
};

Button.defaultProps = {
	type: 'button',
	label: 'Proceed',
	onClick: () => null,
};

Button.propTypes = {
	type: PropTypes.string,
	label: PropTypes.string,
	onClick: PropTypes.func,
};

export default Button;

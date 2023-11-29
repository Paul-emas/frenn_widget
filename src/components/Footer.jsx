import React from 'react';

const Footer = ({ className, children }) => {
	return (
		<footer className={`footer ${className}`}>
			{children}
			<div className="footer-caption">
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M13.5001 8.10078H12.6001V5.40078C12.6001 3.42078 10.9801 1.80078 9.0001 1.80078C7.0201 1.80078 5.4001 3.42078 5.4001 5.40078V8.10078H4.5001C4.0501 8.10078 3.6001 8.55078 3.6001 9.00078V15.3008C3.6001 15.7508 4.0501 16.2008 4.5001 16.2008H13.5001C13.9501 16.2008 14.4001 15.7508 14.4001 15.3008V9.00078C14.4001 8.55078 13.9501 8.10078 13.5001 8.10078ZM9.9001 14.4008H8.1001L8.4601 12.4208C8.0101 12.2408 7.6501 11.7008 7.6501 11.2508C7.6501 10.5308 8.2801 9.90078 9.0001 9.90078C9.7201 9.90078 10.3501 10.5308 10.3501 11.2508C10.3501 11.7908 10.0801 12.2408 9.5401 12.4208L9.9001 14.4008ZM10.8001 8.10078H7.2001V5.40078C7.2001 4.41078 8.0101 3.60078 9.0001 3.60078C9.9901 3.60078 10.8001 4.41078 10.8001 5.40078V8.10078Z"
						fill="#787878"
					/>
				</svg>
				<span>Payment is secured.</span>
			</div>

			<style jsx="true">{`
				.footer {
					width: 360px;
					background: #f5f4fa;
					width: 100%;
					position: absolute;
					bottom: 0;
					margin-top: 0;
					left: 0;
					padding-top: 10px;
					padding-bottom: 20px;
					padding-left: 26px;
					padding-right: 26px;
					background: #f5f4fa;
				}

				.footer-71 {
					margin-top: 71px;
				}

				.footer.congrats-sp {
					margin-top: 74px;
				}

				.footer-caption {
					display: flex;
					align-items: center;
					justify-content: center;
					align-items: top;
					font-weight: 300;
					font-size: 14px;
					color: #787878;
					line-height: 17px;
					margin-top: 21px;
				}

				.footer-caption span {
					margin-left: 13.6px;
				}
			`}</style>
		</footer>
	);
};

Footer.defaultProps = {
	className: '',
};

export default Footer;

import { useSelector } from 'react-redux';
import { appSelector } from 'slices/app';

const Header = () => {
	const { activePage } = useSelector(appSelector);

	function close() {
		if (typeof window !== 'undefined') {
			activePage === 'success'
				? window.parent.postMessage('close:transaction', '*')
				: window.parent.postMessage('close', '*');
		}
	}

	return (
		<header className="header">
			<div className="header__content">
				<div className="logo">
					<figure>
						<img src="/images/logo.png" width="142.72" height="62" alt="Frenn bank logo" srcSet="" />
					</figure>
				</div>
				<div className="header__caption">
					<p className="pay">Pay In</p>
					<p className="bits">Bits</p>
				</div>
				<svg
					className="close"
					onClick={close}
					width="25"
					height="25"
					viewBox="0 0 25 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M18.75 7.34375L17.6563 6.25L12.5 11.4063L7.34375 6.25L6.25 7.34375L11.4063 12.5L6.25 17.6563L7.34375 18.75L12.5 13.5937L17.6563 18.75L18.75 17.6563L13.5937 12.5L18.75 7.34375Z"
						fill="white"
						fillOpacity="0.34"
					/>
				</svg>
			</div>

			<style jsx="true">
				{`
					.header {
						width: 412px;
						height: 124px;
						background: #2d2d3d;
						padding-left: 35px;
						padding-top: 32px;
						padding-bottom: 30px;
						position: relative;
					}

					@media screen and (max-width: 440px) {
						.header {
							width: 100%;
						}
					}

					.header .close {
						position: absolute;
						top: 10px;
						right: 15px;
						cursor: pointer;
						background: #2d2d3d;
						border: none;
						outline: none;
					}

					.header__content {
						display: flex;
						align-items: center;
					}

					.header__caption {
						margin-left: 34.3px;
						color: #fff;
					}

					.header__caption .pay {
						font-size: 24px;
						line-height: 29px;
					}

					.header__caption .bits {
						font-weight: 500;
						font-size: 40px;
						line-height: 48px;
						margin-top: -5px;
					}
				`}
			</style>
		</header>
	);
};

export default Header;

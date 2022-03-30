import PropTypes from 'prop-types';

const Tabs = ({ activeTab, setActiveTab, setStep }) => {
	const tabsData = [
		{ id: 'existing_user', name: 'Existing Frenn User' },
		{ id: 'new_user', name: 'New User' },
	];

	return (
		<div className="tabs">
			<div className="slider"></div>
			{tabsData.map(({ id, name }) => (
				<button
					onClick={() => {
						setActiveTab(id);
						setStep(id);
					}}
					key={id}
					type="button"
					className={`tabs__btn ${activeTab === id ? 'active' : ''}`}
				>
					{name}
				</button>
			))}

			<style jsx="true">{`
				.tabs {
					width: 360px;
					height: 58px;
					border-radius: 22px;
					overflow: hidden;
					background-color: #dadada;
					display: flex;
				}

				@media screen and (max-width: 440px) {
					.tabs {
						width: 100%;
					}
				}

				.tabs__btn {
					width: 50%;
					height: 58px;
					background-color: #dadada;
					outline: none;
					border: none;
					color: #717171;
					font-size: 16px;
					line-height: 16px;
					cursor: pointer;
				}

				.tabs__btn.active {
					background-color: #6ab8ce;
					color: #fff;
					font-weight: 700;
					border-radius: 22px;
				}
			`}</style>
		</div>
	);
};

Tabs.defaultProps = {
	activeTab: '',
	setActiveTab: () => null,
	setStep: () => null,
};

Tabs.propTypes = {
	activeTab: PropTypes.string,
	setActiveTab: PropTypes.func,
	setStep: PropTypes.func,
};

export default Tabs;

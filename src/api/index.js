import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export async function ValidateMerchantAPI(payload) {
	const { key, merchantId, ...data } = payload;
	const response = await axios({
		method: 'post',
		url: `${baseURL}/api/v1/order`,
		data,
		headers: {
			merchantId,
			key,
		},
	});
	return response?.data;
}

export async function createNewMerchantAPI(payload) {
	const { key, merchantId, ...data } = payload;
	const response = await axios({
		method: 'post',
		url: `${baseURL}/api/v1/customer`,
		data,
		headers: {
			merchantId,
			key,
		},
	});
	return response?.data;
}

export async function verifyOtpAPI(payload) {
	const { key, merchantId, ...data } = payload;
	const response = await axios({
		method: 'post',
		url: `${baseURL}/api/v1/customer/validate`,
		data,
		headers: {
			merchantId,
			key,
		},
	});
	return response?.data;
}

export async function getCreditLimitAPI(payload) {
	const { key, merchantId, ...data } = payload;
	const response = await axios({
		method: 'post',
		url: `${baseURL}/api/v1/customer/get-credit-limit`,
		data,
		headers: {
			merchantId,
			key,
		},
	});
	return response?.data;
}

export async function initiateCardLinkingAPI(payload) {
	const { key, merchantId, ...data } = payload;
	const response = await axios({
		method: 'post',
		url: `${baseURL}/api/v1/customer/card-initiate`,
		data,
		headers: {
			merchantId,
			key,
		},
	});
	return response?.data;
}

export async function verifyCardLinkingAPI(payload) {
	const { key, merchantId, ...data } = payload;
	const response = await axios({
		method: 'post',
		url: `${baseURL}/api/v1/customer/card-verify`,
		data,
		headers: {
			merchantId,
			key,
		},
	});
	return response?.data;
}

export async function getPaystackTransactionDetails(reference) {
	const response = await axios({
		method: 'get',
		url: `https://api.paystack.co/transaction/verify/${reference}`,
	});
	return response?.data;
}

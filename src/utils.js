const urlRegex = {
	full: /^(ftp|http|https):\/\/[^ "]+$/,
	1: /^(f|h|h)$/,
	2: /^(ft|ht|ht)$/,
	3: /^(ftp|htt|htt)$/,
	4: /^(ftp|http|http):?$/,
	5: /^(ftp|http|https):?\/?$/,
	6: /^(ftp|http|https):\/?\/?$/,
	7: /^(ftp|http|https):\/\/?[^ "]*$/,
	8: /^(ftp|http|https):\/\/[^ "]*$/,
};

const validUrl = (url) => {
	if (url && url.length) {
		if (url.length > 8) {
			return urlRegex.full.test(url);
		} else {
			return urlRegex[url.length].test(url);
		}
	} else {
		return true;
	}
};
const generateUniqueId = () => {
	return `${Date.now()}${Math.floor(Math.random() * 100)}`;
};
const itemIsEmpty = (item) => {
	return item == null || (item instanceof Object && !Object.keys(item).length) || (item instanceof Array && !item.length) || (typeof item == 'string' && !item.trim().length);
};

const cleanJSON = (key, value) => {
	if (itemIsEmpty(value)) {
		return undefined;
	}
	if (value instanceof Array) {
		var value_filtered = value.filter((x) => {
			return !itemIsEmpty(x);
		});
		return itemIsEmpty(value_filtered) ? undefined : value_filtered;
	}
	return value;
};

export default {
	urlRegex,
	validUrl,
	generateUniqueId,
	itemIsEmpty,
	cleanJSON,
};

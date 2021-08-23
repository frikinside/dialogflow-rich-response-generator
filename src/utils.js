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

export default {
    urlRegex: urlRegex,
    validUrl: (url) => {
		if (url && url.length) {
			if (url.length > 8) {
				return urlRegex.full.test(url);
			} else {
				return urlRegex[url.length].test(url);
			}
		} else {
			return true;
		}
	},
};

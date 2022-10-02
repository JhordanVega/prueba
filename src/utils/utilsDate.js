/*
 *  Extract date
 *  1961-05-01T12:40:44.711Z to 1961-05-01
 *	
 */
const extractDate = (date) => {
	if (!date) return '-'
	const [onlyDate,] = date.split("T")
	return onlyDate
};

/*
 *  Format date
 *  yyyy-MM-dd to dd-MM-yyyy
 *	
 */
const formatDateDDMMYYYY = (date) => {
	if (!date) return '-'
	const [yyyy, MM, dd] = date.split("-")
	return `${dd}-${MM}-${yyyy}`
};

/*
 *  extract and format date
 *  yyyy-MM-dd to dd-MM-yyyy
 *	
 */
 const extractAndFormatDate = (date) => {
	if (!date) return '-'
	const extraerFecha = extractDate(date)
	return formatDateDDMMYYYY(extraerFecha)
};

export {
	extractDate,
	formatDateDDMMYYYY,
	extractAndFormatDate
};

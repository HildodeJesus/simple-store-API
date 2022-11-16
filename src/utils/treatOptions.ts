type OptionsType = {
	name: string;
	img: string;
	value: number;
};

export function arrayToCls(opt: OptionsType[]) {
	const options = opt.reduce(
		(previousValue: any, currentValue: any, index: any, array: any) => {
			return (
				previousValue +
				`${currentValue.name},${currentValue.img}${
					index + 1 == array.length ? "" : "\n"
				}`
			);
		},
		""
	);

	console.log(options);

	return options;
}

export function clsToArray(opt: string) {
	const options = opt.split("\n").map(option => {
		const itemOption = option.split(",");

		return {
			name: itemOption[0],
			img: itemOption[1],
			value: itemOption[2] || undefined,
		};
	});

	return options;
}

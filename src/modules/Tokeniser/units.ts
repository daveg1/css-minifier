// https://www.w3.org/TR/css-values-3/#lengths

const FontRelativeUnits = ['em', 'ex', 'ch', 'rem'];
const ViewPortUnits = ['vw', 'vh', 'vmin', 'vmax'];
const AbsoluteUnits = ['cm', 'mm', 'q', 'in', 'pt', 'pc', 'px'];

// https://www.w3.org/TR/css-values-3/#other-units

const AngleUnits = ['deg', 'grad', 'rad', 'turn'];
const DurationUnits = ['s', 'ms'];
const FrequencyUnits = ['hz', 'khz'];
const ResolutionUnits = ['dpi', 'dpcm', 'dppx'];

// CSS Units (CSS Spec §5–6)
export const units = [
	...FontRelativeUnits,
	...ViewPortUnits,
	...AbsoluteUnits,
	...AngleUnits,
	...DurationUnits,
	...FrequencyUnits,
	...ResolutionUnits,
];

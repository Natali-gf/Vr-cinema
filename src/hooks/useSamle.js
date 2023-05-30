import { useCallback, useState } from "react";

export function useSamle (initialValue) {
	let [sample, setSample] = useState(initialValue);

	const example = useCallback(() => {setSample(example)}, [sample]);
	const example2 = useCallback(() => {setSample(currentSample => currentSample + 'updating')}, []); //самое актуальное значение

	return {sample, example, example2};
}
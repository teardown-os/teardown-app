import type { FunctionComponent } from "react";
import { Path, Svg as RNSvg, Circle, G, type SvgProps } from "react-native-svg";
import { cssInterop } from "nativewind";

const Svg = cssInterop(RNSvg, { className: "style" });

export type TauriLogoProps = SvgProps;

export const TauriLogo: FunctionComponent<TauriLogoProps> = (props) => {
	const { ...otherProps } = props;
	return (
		<Svg
			viewBox="-7.01114223 -.48904824 219.24490765 231.9000649"
			{...otherProps}
		>
			<Path d="m143.1 84a22 22 0 1 1 -44 0 22 22 0 0 1 44 0z" fill="#ffc131" />
			<Circle
				cx="84.1"
				cy="147"
				fill="#24c8db"
				r="22"
				transform="matrix(-1 0 0 -1 168.2 294)"
			/>
			<G clipRule="evenodd" fillRule="evenodd">
				<Path
					d="m166.7 154.5a84 84 0 0 1 -29 11.8 59 59 0 0 0 2.9-26.6 59 59 0 1 0 -67.4-90.1 98 98 0 0 0 -32.2 9.4 84 84 0 1 1 125.7 95.5zm-124.7-80.2 20.6 2.5a59 59 0 0 1 2.6-11.7 84 84 0 0 0 -23.2 9.2z"
					fill="#ffc131"
				/>
				<Path
					d="m38.4 76.5a84 84 0 0 1 29.2-11.9 58.9 58.9 0 0 0 -3.3 26.7 59 59 0 1 0 67.7 90 98 98 0 0 0 32.2-9.3 84 84 0 1 1 -125.8-95.5zm124.7 80.2-.4.2z"
					fill="#24c8db"
				/>
			</G>
		</Svg>
	);
};

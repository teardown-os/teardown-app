import { FunctionComponent, PropsWithChildren } from "react";
import * as GBottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// export type BottomSheetProps = {

// }

// export const BottomSheet: FunctionComponent<BottomSheetProps> = () => {
//   return (
//     <BottomSheetContext.Provider value={{ tracking: {}, bottomSheetRef: { current: null } }}>
//       <BottomSheetModal />
//     </BottomSheetContext.Provider>
//   );
// };

export type BottomSheetRootProps = PropsWithChildren<{}>;

export const BottomSheetRoot: FunctionComponent<BottomSheetRootProps> = ({
	children,
}) => {
	return (
		<GBottomSheet.BottomSheetModalProvider>
			{children}
		</GBottomSheet.BottomSheetModalProvider>
	);
};

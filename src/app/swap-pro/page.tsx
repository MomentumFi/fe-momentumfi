import { SwapContextProvider } from "@/components/swap-pro/index";
import { SwapProContextWrapper } from "./ContextWrapper";

export default function SwapPro() {
  return (
    <SwapContextProvider>
      <SwapProContextWrapper />
    </SwapContextProvider>
  );
}

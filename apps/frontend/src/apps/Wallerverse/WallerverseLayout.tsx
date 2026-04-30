import { Outlet } from "react-router-dom";
import { WallerverseProvider } from "./WallerverseContext";
import "./wallerverse.css";

const WallerverseLayout = () => (
    <WallerverseProvider>
        <Outlet />
    </WallerverseProvider>
);

export default WallerverseLayout;

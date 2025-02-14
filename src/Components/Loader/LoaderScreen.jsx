import { FallingLines } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="fixed z-20 top-0 right-0 left-0 bottom-0 flex items-center justify-center h-screen bg-white/30 backdrop-blur-md">
      <FallingLines
        color="#4fa94d"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  );
};

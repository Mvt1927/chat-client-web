import { CircularProgress } from "@mui/material";

export default function Loading() {

    return (
        <>
        <div className="absolute w-full h-full flex justify-center items-center z-20 ">
            <div className="flex flex-col backdrop-blur-[2px] bg-white bg-opacity-[0.02] justify-center items-center shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-6/12 h-6/12 max-w-md">
                <CircularProgress />
            </div>
        </div>
        </>
    );
}

import { ClipLoader } from "react-spinners";

function TelaLoading() {
    return (
        <div className='flex items-center justify-center absolute top-0 left-0 bg-gray-200 w-full h-full z-10'>
            <ClipLoader size={30} margin={3} speedMultiplier={1.1} />
        </div>
    )
}

export default TelaLoading;
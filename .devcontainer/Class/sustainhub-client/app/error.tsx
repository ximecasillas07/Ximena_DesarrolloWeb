'use client';

const Error = ({error, reset} : {error: Error, reset: () => void}) => {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <h1 className="text-2x1 font-bold text-red-600"> Somethig went wrong </h1>
            <p className="text-red-500">{error.message}</p>
            <button className="btn btn-sm" onClick={reset}>Try again</button>
        </div>
    );
}

export default Error;
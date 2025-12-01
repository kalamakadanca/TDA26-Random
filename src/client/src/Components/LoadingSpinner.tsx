export default function LoadingSpinner() {
    return <div className="flex fixed items-center justify-center h-screen w-screen bg-blue-300 opacity-25">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent">

        </div>
    </div>
};
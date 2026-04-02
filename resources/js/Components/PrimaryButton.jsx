export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-xl border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] transition-all duration-200 ease-in-out hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98] ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="auth-bg min-h-screen w-full bg-primary-dark flex flex-col items-center justify-between relative overflow-hidden">

            {/* Logo */}
            <header className="relative z-10 flex items-center gap-3 pt-10">
                {/* Shield icon placeholder */}
                <div className="w-10 h-10 rounded-md bg-gradient-primary flex items-center justify-center">
                    <span className="text-primary-dark font-extrabold text-lg">G</span>
                </div>
                <span className="text-white font-bold text-xl tracking-wide">Goldeneye</span>
            </header>

            {/* Page content */}
            <main className="relative z-10 flex-1 flex items-center justify-center w-full px-4 py-10">
                {children}
            </main>

            {/* Footer */}
            <footer className="relative z-10 pb-6 flex items-center gap-6">
                <a href="#" className="text-muted-gray hover:text-light-gray text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-muted-gray hover:text-light-gray text-sm transition-colors">Terms of Service</a>
                <a href="#" className="text-muted-gray hover:text-light-gray text-sm transition-colors">Cookie Settings</a>
            </footer>
        </div>
    );
}

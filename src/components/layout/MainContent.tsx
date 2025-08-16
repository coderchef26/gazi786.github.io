"use client";

interface MainContentProps {
	children: React.ReactNode;
}

export const MainContent = ({ children }: MainContentProps) => {
	return (
		<div className="w-[80%] relative h-full ml-auto flex flex-col">
			{/* Main Content Area with bottom status bar */}
			<div className="flex-1 relative overflow-hidden">
				{/* Corner UI Elements for main content area */}
				<div className="absolute inset-0 pointer-events-none z-[30]">
					<div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#00d4ff] opacity-40" />
					<div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#00d4ff] opacity-40" />
					<div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#00d4ff] opacity-40" />
					<div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#00d4ff] opacity-40" />
				</div>

				{/* Scrollable Content Container - Only Vertical Overflow */}
				<div className="relative z-10 h-full w-full p-8 overflow-y-auto overflow-x-hidden">
					{children}
				</div>
			</div>
		</div>
	);
};
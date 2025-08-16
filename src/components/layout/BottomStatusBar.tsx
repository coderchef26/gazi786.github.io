"use client";

interface BottomStatusBarProps {
	className?: string;
}

export const BottomStatusBar = ({ className = "" }: BottomStatusBarProps) => {
	return (
		<div
			className={`h-12 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] border-t-2 border-[#00d4ff] ${className}`}
		>
			<div className="h-full flex items-center justify-between px-6">
				<div className="flex items-center space-x-4">
					<div className="w-2 h-2 bg-[#26de81] rounded-full animate-pulse" />
					<span className="text-xs azmara-text">ATLAS PROTOCOL ACTIVE</span>
				</div>

				<div className="flex items-center justify-center flex-1 gap-8">
					<div className="text-xs azmara-text">NEURAL INTERFACE: STABLE</div>
					<div className="text-xs azmara-text">ENERGY: OPTIMAL</div>
					<div className="text-xs azmara-text">DEFENSE: READY</div>
				</div>

				<div className="text-xs azmara-text">
					{new Date().toLocaleTimeString()}
				</div>
			</div>
		</div>
	);
};

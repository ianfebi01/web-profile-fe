import Portofolio from "@/components/Organisms/Portofolio";
import { PortofolioProvider } from "@/context/PortofolioContext";

export default function PortofolioPage() {
	return (
		<div className="flex flex-col gap-6 overflow-scroll h-full">
			<h1 className="text-2xl font-semibold ">Portofolio</h1>
			<PortofolioProvider>
				<Portofolio/>
			</PortofolioProvider>
		</div> 
	)
}

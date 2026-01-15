import { SectionCards } from "@/components/sidedar/section-cards"
import data from "./data.json"
import { ChartAreaInteractive } from "@/components/sidedar/chart-area-interactive"
import { DataTable } from "@/components/sidedar/data-table"

export default function AdminIndexPage() {
    return (
        <>
            <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
        </>
    )
}
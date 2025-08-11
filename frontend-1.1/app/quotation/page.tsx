import {QuotationView} from "@/components/quotation/quotation-view";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Quotation() {
    return (
        <div className="relative md:p-20 p-5">
            <Button variant="outline" className="mb-5">
                <Link href="/">Volver</Link>
            </Button>
            <QuotationView />
        </div>
    )
}
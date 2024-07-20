
import { notFound } from "next/navigation";

export default async function Profile({
	searchParams,
}: {
	searchParams: { edit: string };
}) {
	notFound();
}

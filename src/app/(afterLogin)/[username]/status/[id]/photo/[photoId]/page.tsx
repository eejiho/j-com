import Home from "@/app/(afterLogin)/home/page";

type Props = {
    params: { username: string, id: string, photoId: string }
}

export default async function Page({ params } : Props) {
    const { username, id, photoId } = await params;
    return (
        <Home />
    )
}
import LoginOptiven from "@/components/features/auth/LoginOptiven";

export default async function page({ params }: { params: Promise<{ codigo: string }> }) {
    const { codigo } = await params;
    return (
        <>
            <LoginOptiven token={codigo} />
        </>
    )
}

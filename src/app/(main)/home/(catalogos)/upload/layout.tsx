export default function UploadLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div >{children}</div>
        </>
    );
}

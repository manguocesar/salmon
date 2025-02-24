'use server';
export const Section = async ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <div>
        <h3 className="text-2xl lg:text-4xl text-orange-600">{title}</h3>
        <p className="text-gray-700 md:mb-4 text-lg sm:text-xl">{children}</p>
    </div>
);
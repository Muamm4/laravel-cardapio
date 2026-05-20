import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { BottomNav } from '@/components/public/BottomNav';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <>
            <BottomNav />
            <AuthLayoutTemplate title={title} description={description} {...props}>
                {children}
            </AuthLayoutTemplate>
        </>
    );
}

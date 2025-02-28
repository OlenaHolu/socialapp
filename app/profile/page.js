import { auth0 } from "../lib/auth0";
import { getProfile } from "../lib/data";
import ProfileForm from "../ui/profile-form";

export default async function ProfilePage() {
    const session = await auth0.getSession();
    if (!session?.user) {
        return <p>No se encontró el usuario</p>;
    }

    const user = await getProfile(session.user.user_id);

    return <ProfileForm user={user} />;
}

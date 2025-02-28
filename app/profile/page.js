import { auth0 } from "../lib/auth0";
import { getProfile } from "../lib/data";
import ProfileForm from "../ui/profile-form";

export default async function ProfilePage() {
    const user_id = (await auth0.getSession()).user.user_id;
    const user = await getProfile(user_id);

    return <ProfileForm user={user} />;
}

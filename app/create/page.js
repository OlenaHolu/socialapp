import { createPost } from "../lib/actions";
import ImageSelector from "../ui/image-selector";

export default () => {
    return (
        <form action={createPost} className="flex flex-col gap-8">
            <input name="content" placeholder="write content..." required/>
            <ImageSelector />
            <input type="submit" value="Publicar" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
        </form>
    );
}
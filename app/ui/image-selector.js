'use client'

import Image from "next/image";
import { useState } from "react";

export default () => {

    const [imageUrl, setImageUrl] = useState("/preview.png");

    function preview(ev){
        setImageUrl(URL.createObjectURL(ev.target.files[0]));
    }

    return(
        <>
            <label htmlFor="myfs">
                <Image src={imageUrl} width={256} height={256} alt="preview"/>
            </label>
            <input id="myfs" type="file" name="media" hidden onChange={preview} />
        </>
    )
}
const likes =
[{post_id: '1'},
    {post_id: '2'}
]
const post_id = 1;
function inLikes(likes, post_id){
    for(const post of likes){
        if(post_id === post.post_id){
            return true;
        }
    }
    return false;
}
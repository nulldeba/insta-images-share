import React from 'react';
import {
    Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';

function RenderPostItem({ post, onClick }) {
    return (
        <Card>
            {/* <Link to={`/menu/${dish.id}`} > */}
                <CardImg width="100%" height="100%" src={post.image} alt="instagram" />
                <CardImgOverlay>
                </CardImgOverlay>
            {/* </Link> */}
        </Card>
    );
}
export const UserPosts=(props)=>{
    const posts=props.posts.map((post)=>{
        return (
           
            <div className="col-4 col-sm-4" key={post.id}>
                <RenderPostItem post={post} />
           
            </div>
            
        );
    })
    return ( <div className="container"><div className="row">{posts}</div></div>)
}

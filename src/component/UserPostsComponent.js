import React from 'react';
import {
    Card, CardImg, CardBody, CardLink, CardText, CardSubtitle, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Button
    , CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';

//Component to show the details of a post.
const RenderPostDetails = ({ toggle, isModalOpen, post, likePost, deletePost }) => {
    return (
        <Modal isOpen={isModalOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}><i class="fab fa-instagram"></i>InstaShare</ModalHeader>
            <ModalBody>
                <Card>
                    <CardBody>
                        <CardTitle>Debashis Singh</CardTitle>
                        <CardSubtitle>{post.timestamp}</CardSubtitle>
                        <p><Badge color="secondary">{post.likes}</Badge>       <Badge color="light">Likes</Badge></p>
                    </CardBody>
                    <img width="100%" src={post.image} alt="Card image cap" />
                    <CardBody>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <CardLink href="#" onClick={() => { likePost(post) }}>Like</CardLink>
                        <CardLink href="#" onClick={() => { deletePost(post) }}>Delete</CardLink>
                        <CardLink href="#">Delete</CardLink>

                    </CardBody>
                </Card>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>

        </Modal>
    );
}



class UserPosts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            openedPost: {}
        }
    }

    toggle = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    openSelectedPost = (post) => {
        this.setState({ isModalOpen: true, openedPost: post });
    }

    deletePost = (post) => {
        this.props.deletePost(post);
        this.toggle();
    }

    render() {
        const posts = this.props.posts.map((post) => {
            return (
                <div className="col-4 col-sm-4" key={post.id} style={{ cursor: 'pointer' }}>
                    <Card onClick={() => { this.openSelectedPost(post) }}>
                        <CardBody>
                            <img width="100%" src={post.image} alt="Card image cap" />
                        </CardBody>
                    </Card>

                </div>

            );
        })
        return (<div className="container">
            <div className="row">
                {posts}
            </div>
            <RenderPostDetails toggle={this.toggle} isModalOpen={this.state.isModalOpen}
                post={this.state.openedPost}
                likePost={this.props.likePost}
                deletePost={this.deletePost} />
        </div>);
    }
}
export default UserPosts

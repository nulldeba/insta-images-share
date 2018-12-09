import React, { Component } from 'react';
import UserPosts from './UserPostsComponent';
import { Jumbotron } from 'reactstrap';
import { Media, Badge } from 'reactstrap';
class Main extends Component {

    constructor(props) {
        super(props);

        //Took few static data for a single user , Since it is not designed for multiple user
        this.state = {
            id: 1,
            follwers: 323,
            following: 0,
            name: 'Debashis Singh',
            phone: '7978104553',
            posts: []
        }
        this.likePost = this.likePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    saveToLocalStorage() {
        localStorage.setItem("user", JSON.stringify(this.state));

    }

    likePost(post) {
        let posts = this.state.posts;
        posts.map(item => {
            if (item.id === post.id) {
                item.likes = item.likes + 1;
            }
            return item;
        });
        this.setState({ posts: posts });
        this.saveToLocalStorage();
    }

    deletePost(post) {
        let posts = this.state.posts;
        posts.splice(post.id, 1)
        this.setState({ posts: posts });
        this.saveToLocalStorage();
        setTimeout(() => {
            alert("Your post is deleted.")
        }, 400);
    }

    commentPost(post) {

    }

    //Get the uploaded image data and set to localStorage and local state.
    onChange(e) {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        let date = new Date();
        reader.onload = (e) => {
            let posts = this.state.posts;
            let postItem = {
                image: e.target.result,
                likes: 0,
                comments: [],
                timestamp: date,
                id: posts.length
            }
            posts.push(postItem);
            this.setState({ posts: posts });
            this.saveToLocalStorage();
        }

    }

    componentDidMount() {
        let userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            fetch('http://starlord.hackerearth.com/insta')
                .then(result => result.json())
                .then((results) => {
                    let posts = [];
                    results.map((post, index) => {
                        posts.push({
                            id: index,
                            image: post.Image,
                            likes: post.likes,
                            timestamp: post.timestamp,
                            comments: []
                        })
                        return;
                    });

                    this.setState({ posts: posts });
                    this.saveToLocalStorage();
                });
        }
        else {
            this.setState({ posts: userData.posts });
        }
    }

    render() {

        let userPosts;
        if (this.state.posts)
            userPosts = <UserPosts posts={this.state.posts} likePost={this.likePost} deletePost={this.deletePost} />
        else
            userPosts = <div></div>;
        return (<div>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <Media>
                                <Media body>
                                    <Media heading>
                                        <h4>Debashis Singh</h4>
                                        <p> <Badge color="light">posts</Badge> <Badge color="success">{this.state.posts.length}</Badge></p>
                                        <p> <Badge color="light">follwers</Badge> <Badge color="success">{this.state.follwers}</Badge></p>
                                        <p> <Badge color="light">following</Badge> <Badge color="success">{this.state.following}</Badge></p>
                                    </Media>

                                </Media>
                            </Media>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <h5>Add new post </h5>
            {/* To add a new post */}
            <p> <input type="file" name="file" onChange={(e) => { this.onChange(e) }} /></p>
            <div>
                {userPosts}
            </div>
        </div>);
    }
}
export default Main;
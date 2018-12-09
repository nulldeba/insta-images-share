import React, { Component } from 'react';
import { UserPosts } from './UserPostsComponent';
class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            name: 'Debashis Singh',
            phone: '7978104553',
            posts: []
        }
    }
    saveToLocalStorage() {
        localStorage.setItem("user", JSON.stringify(this.state));

    }
    onChange(e) {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        let date = new Date();
        if (files[0].size < 5000000)
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
        if (userData.posts.length == 0) {
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
    userPosts() {

    }
    render() {
        let userPosts;
        if (this.state.posts)
            userPosts = <UserPosts posts={this.state.posts} />
        else
            userPosts = <div></div>;
        return (<div>
            Main Component
            <input type="file" name="file" onChange={(e) => { this.onChange(e) }} />
            <div>
                {userPosts}
            </div>
        </div>);
    }
}
export default Main;
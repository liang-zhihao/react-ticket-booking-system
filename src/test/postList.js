import React, { Component } from "react";
import axios from "axios";

import '../mock/mockdata'
class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [
        {
          title: "大家一起来讨论React吧",
          author: "张三",
          date: "2017-09-01 10:00"
        }
      ]
    };
  }
  handle_click = () => {
    axios.get('http://rap2.taobao.org:38080/app/mock/248939/api/user')
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err); 
    })
  };
  render() {
    return (
      <div>
        <button onClick={this.handle_click}>button</button>
        <br />
        帖子列表：
        {this.state.news.map((item, i) => (
          <div key={i}>
            <PostItem
              title={item.title}
              author={item.author}
              date={item.date}
            />
          </div>
        ))}
      </div>
    );
  }
}

class PostItem extends Component {
  render() {
    const { title, author, date } = this.props;
    return (
      <div>
        <div>{title}</div>
        <div>
          创建人：<span>{author}</span>
        </div>
        <div>
          创建时间：<span>{date}</span>
        </div>
      </div>
    );
  }
}

export default PostList;

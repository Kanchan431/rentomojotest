import React from 'react';
import './App.css';
import { Table, Tabs, Modal } from 'antd';
import 'antd/dist/antd.css';
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false,
      id: '',
      modal: false,
      posts: [],
      key: '1',
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          users: json,
        })
      });
  }

  postsAPI = (id) => {
    console.log(id);
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          modal: true,
          posts: json,
        })
        console.log('posts', this.state.posts);
      });
  }

  cancel = () => {
    this.setState({
      modal: false,
    })
  }

  render() {
    const { isLoaded, posts } = this.state;

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: ((name) => name),
      },
      {
        title: 'Company',
        dataIndex: 'company',
        render: company => `${company.name}`,
      },
      {
        title: 'Blog',
        dataIndex: 'id',
        render: ((id) => {
          return (
            <a onClick={() => { { this.postsAPI(id) } }}>
              { `https://jsonplaceholder.typicode.com/posts?userId=${id}`}
            </a>
          )
        }),
      },
    ];

    if (!isLoaded) {
      return <h1>Loading....</h1>
    }
    else {

      return (
        <div>

          <Table
            columns={columns}
            dataSource={this.state.users}
          />

          <Modal
            visible={this.state.modal}
            closable
            onCancel={this.cancel}
            onOk={this.cancel}
            title='Title'
          >
            <ul>
              {posts.map((m, i) => {
                return <li>
                  {m.title}
                </li>
              })}
            </ul>

          </Modal>
        </div>
      );
    }
  }
}


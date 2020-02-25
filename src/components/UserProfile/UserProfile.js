import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Tag, Tabs, Tooltip } from "antd";
import "./UserProfile.css";
import UserPhotos from "../UserPhotos/UserPhotos";
import UserCollections from "../UserCollections/UserCollections";
import UserLikes from "../UserLikes/UserLikes";

const { TabPane } = Tabs;

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      username: this.props.match.params.username,
      userPhotos: [],
      userCollections: [],
      userLikes: []
    };
  }
  componentDidMount() {
    this.getUser();
    this.getUserPhotos();
    this.getUserLikes();
    this.getUserCollections();
  }

  getUser = async () => {
    const { username } = this.state;
    const url = `https://api.unsplash.com/users/${username}?client_id=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ userInfo: data });
  };

  getUserPhotos = async () => {
    const { username } = this.state;
    const url = `https://api.unsplash.com/users/${username}/photos?client_id=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ userPhotos: data });
  };

  handleTabChange = key => {
    console.log(key);
  };

  getUserLikes = async () => {
    const { username } = this.state;
    const url = `https://api.unsplash.com/users/${username}/likes?client_id=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ userLikes: data });
  };
  getUserCollections = async () => {
    const { username } = this.state;
    const url = `https://api.unsplash.com/users/${username}/collections?client_id=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ userCollections: data });
    console.log(data);
  };
  render() {
    const { userInfo, userPhotos, userLikes, userCollections } = this.state;
    return (
      <div>
        <div className="user-profile">
          <img
            className="user-avatar"
            src={userInfo.profile_image && userInfo.profile_image.large}
          />

          <div className="user-info">
            <h2 className="user-name">
              {userInfo.name}

              {userInfo.badge ? (
                <span className="user-verified">
                  <Tooltip title="Verified">
                    <Icon
                      type="check-circle"
                      theme="twoTone"
                      twoToneColor="#52c41a"
                      style={{ fontSize: "16px" }}
                    />
                  </Tooltip>
                </span>
              ) : (
                ""
              )}
            </h2>
            <div className="user-extra-info">
              {userInfo.location ? (
                <p className="user-location">
                  <Icon className="icon-location" type="environment" />
                  {userInfo.location}
                </p>
              ) : (
                ""
              )}

              {userInfo.portfolio_url ? (
                <p className="user-portfolio">
                  <Icon className="icon-link" type="link" />
                  <a target="_blank" href={userInfo.portfolio_url}>
                    Portfolio
                  </a>
                </p>
              ) : (
                ""
              )}
            </div>

            {userInfo.bio ? <p className="user-bio">{userInfo.bio}</p> : ""}

            {userInfo.tags && userInfo.tags.custom.length != 0 ? (
              <div className="interests">
                <h3>Interests</h3>
                {userInfo.tags &&
                  userInfo.tags.custom.map((tag, i) => (
                    <Tag className="user-interest" key={i}>
                      {tag.title}
                    </Tag>
                  ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <Tabs defaultActiveKey="1" onChange={this.handleTabChange}>
          <TabPane tab={`Photos ${userPhotos.length}`} key="1">
            <UserPhotos
              getUserPhotos={this.getUserPhotos}
              userPhotos={this.state.userPhotos}
            />
          </TabPane>
          <TabPane
            tab={`Collections ${
              userCollections.cover_photo ? userCollections.length : "0"
            }`}
            key="2"
          >
            <UserCollections
              getUserCollections={this.getUserCollections}
              userCollections={this.state.userCollections}
            />
          </TabPane>
          <TabPane tab={`Likes ${userLikes.length}`} key="3">
            <UserLikes
              getUserLikes={this.getUserLikes}
              userLikes={this.state.userLikes}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

UserProfile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired
    })
  })
};

UserProfile.defaultTypes = {
  username: ""
};
